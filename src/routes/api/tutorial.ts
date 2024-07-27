import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { clientSerializeDate } from "../../data/utils";
import { getAccountPlayers, getPlayerSync, getPlayerTriggeredTutorialsSync, getSession, insertDefaultPlayerCharacterSync, insertPlayerTriggeredTutorialSync, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders, getServerTime } from "../../utils";
import { getGachaSync } from "../../lib/assets";
import { randomPoolItem, rewardPlayerGachaDrawResultSync } from "../../lib/gacha";
import { randomInt } from "crypto";

interface UpdateStepBody {
    viewer_id: number
    step: number
    api_count: number
    skip: boolean
    statistics: Object
    name?: string
    gacha_id?: number
}

interface FinishTriggerBody {
    api_count: number,
    tutorial_ids: number[],
    viewer_id: number
}

const freeTutorialCharacterId = 243001

const tutorialGachaCharacterIds = [251001, 251002, 251003, 251004, 251005, 251006, 251007, 251008]

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/finish_trigger", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as FinishTriggerBody

        const viewerId = body.viewer_id
        const tutorialIds = body.tutorial_ids
        if (!viewerId || isNaN(viewerId) || !tutorialIds || !(tutorialIds instanceof Array)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        // get player
        const playerIds = await getAccountPlayers(viewerIdSession.accountId)
        const playerId = playerIds[0]
        if (isNaN(playerId)) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // mark tutorial as having been completed
        for (const tutorialId of tutorialIds) {
            // TODO: add checking for if the tutorial is already triggered.
            insertPlayerTriggeredTutorialSync(playerId, tutorialId)
        }

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": []
        })
    })

    fastify.post("/update_step", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UpdateStepBody

        const viewerId = body.viewer_id
        const completedStep = body.step
        const skip = body.skip || false
        if (!viewerId || isNaN(completedStep) || isNaN(viewerId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        // get player
        const playerIds = await getAccountPlayers(viewerIdSession.accountId)
        const playerId = playerIds[0]
        const player = !isNaN(playerId) ? getPlayerSync(playerId) : null

        if (player === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No player bound to account."
        })

        // check if tutorial is already completed
        const completedTutorial = getPlayerTriggeredTutorialsSync(playerId)
        if (completedTutorial.find((value: number) => value === 12)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Tutorial already completed"
        })

        // update player
        const currentStep = player.tutorialStep
        let nextStep = completedStep + 1

        if ((currentStep || 0) > nextStep) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Attempt to redo previous tutorial step."
        })

        updatePlayerSync({
            id: playerId,
            tutorialStep: nextStep,
            tutorialSkipFlag: skip,
            name: body.name
        })
        
        // offset nextStep by 11 if skipped, to keep steps the same.
        nextStep += (body.skip ? 11 : 0)
        
        reply.header("content-type", "application/x-msgpack")
        const headers = generateDataHeaders({
            viewer_id: viewerId
        })
        if (nextStep === 15 && body.gacha_id !== undefined && !isNaN(body.gacha_id)) {
            
            const gachaId = body.gacha_id
            const gachaData = getGachaSync(gachaId)
            if (gachaData === null) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Gacha with id '${body.gacha_id}' does not exist.`
            })

            // perform pull
            const drawResult: Map<number, number> = new Map()
            const randomCharacterIndex = randomInt(0, tutorialGachaCharacterIds.length)
            const randomCharacterId = tutorialGachaCharacterIds[randomCharacterIndex]
            drawResult.set(randomCharacterId, 1)

            // reward pull
            const rewardResult = rewardPlayerGachaDrawResultSync(playerId, gachaData, drawResult)

            const newFreeVmoney = player.freeVmoney - gachaData.singleCost
            updatePlayerSync({
                id: playerId,
                freeVmoney: newFreeVmoney
            })

            return reply.status(200).send({
                "data_headers": headers,
                "data": {
                    "step": nextStep,
                    "user_info": {
                        "free_vmoney": newFreeVmoney,
                    },
                    "gacha": {
                        
                        "draw": rewardResult.draw,
                        "gacha_info_list": [
                            {
                                "gacha_id": gachaId,
                                "is_account_first": false,
                                "is_daily_first": false,
                            }
                        ],
                    },
                    "character_list": rewardResult.characters,
                    "item_list": rewardResult.items,
                    "encyclopedia_info": [],
                    "mail_arrived": false,
                    "start_time": getServerTime()
                }
            })
        } else if (nextStep === 16) {
            // give 1500 vmoney
            const newVMoney = player.freeVmoney + 1500
            updatePlayerSync({
                id: playerId,
                freeVmoney: newVMoney
            })

            // give free character
            const serializedDate = clientSerializeDate(new Date())

            insertDefaultPlayerCharacterSync(playerId, freeTutorialCharacterId)

            reply.status(200).send({
                "data_headers": headers,
                "data": {
                    "step": nextStep,
                    "user_info": {
                        "free_vmoney": newVMoney
                    },
                    "character_list": [
                        {
                            "viewer_id": viewerId,
                            "character_id": freeTutorialCharacterId,
                            "entry_count": 1,
                            "exp": 0,
                            "exp_total": 0,
                            "bond_token_list": [
                                {
                                    "mana_board_index": 1,
                                    "status": 0
                                },
                                {
                                    "mana_board_index": 2,
                                    "status": 0
                                }
                            ],
                            "mana_board_index": 1,
                            "create_time": serializedDate,
                            "update_time": serializedDate,
                            "join_time": serializedDate
                        }
                    ],
                    "encyclopedia_info": {
                        [`1${freeTutorialCharacterId}01`]: {
                            "read": false
                        }
                    },
                    "mail_arrived": true,
                    "start_time": getServerTime()
                }
            })
        } else {
            
            reply.status(200).send({
                "data_headers": headers,
                "data": {
                    "step": nextStep,
                    "mail_arrived": true,
                    "start_time": getServerTime()
                }
            })
        }
        
        
    })
}

export default routes;