import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getServerTime } from "../../utils";
import { getAccountPlayers, getSession, updatePlayerSync, validateViewerId } from "../../data/wdfpData";

interface UpdateStepBody {
    viewer_id: number
    step: number
    api_count: number
    skip: boolean
    statistics: Object
    name?: string
    gacha_id?: number
}

const routes = async (fastify: FastifyInstance) => {
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

        if (isNaN(playerId)) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // update player
        const nextStep = completedStep + 1
        updatePlayerSync({
            id: playerId,
            tutorialStep: nextStep,
            tutorialSkipFlag: skip,
            name: body.name
        })

        reply.header("content-type", "application/x-msgpack")
        if (nextStep === 15 && body.gacha_id !== undefined && !isNaN(body.gacha_id)) {
            reply.status(200).send({
                "data_headers": {
                    "force_update": false,
                    "asset_update": false,
                    "short_udid": 0,
                    "viewer_id": viewerId,
                    "servertime": getServerTime(),
                    "result_code": 1
                },
                "data": {
                    "gacha": {
                        "draw": [
                            {
                                "null": 1,
                                "character_id": 261007, // 251005
                                "movie_id": "normal_guarantee", // "normal_guarantee"
                                "seed": 10007656,
                                "entry_count": 1
                            }
                        ],
                        "gacha_info_list": [
                            {
                                "gacha_id": 157,
                                "is_account_first": false
                            }
                        ]
                    },
                    "step": nextStep,
                    "user_info": {
                        "free_vmoney": 9999849
                    },
                    "character_list": [
                        {
                            "viewer_id": viewerId,
                            "character_id": 261007,
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
                            "create_time": "2024-06-06 06:37:12",
                            "update_time": "2024-06-06 06:49:28",
                            "join_time": "2024-06-06 06:49:28"
                        }
                    ],
                    "encyclopedia_info": {
                        "125100501": {
                            "read": false
                        }
                    },
                    "mail_arrived": true,
                    "start_time": getServerTime()
                }
            })
        } else {
            
            reply.status(200).send({
                "data_headers": {
                    "force_update": false,
                    "asset_update": false,
                    "short_udid": 0,
                    "viewer_id": viewerId,
                    "servertime": getServerTime(),
                    "result_code": 1
                },
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