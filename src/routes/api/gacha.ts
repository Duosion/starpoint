import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerGachaCampaignSync, getPlayerGachaInfoListSync, getPlayerGachaInfoSync, getPlayerItemSync, getPlayerSync, getSession, insertPlayerGachaCampaignSync, insertPlayerGachaInfoSync, updatePlayerGachaCampaignSync, updatePlayerGachaInfoSync, updatePlayerItemSync, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { drawGachaSync, rewardPlayerGachaDrawResultSync } from "../../lib/gacha";
import { getGachaCampaignIdSync, getGachaSync } from "../../lib/assets";
import { GachaType } from "../../lib/types";
import { serializeGachaCampaign } from "../../data/utils";
import { UserGachaCampaign } from "../../data/types";
import { givePlayerCharacterSync } from "../../lib/character";
import { givePlayerEquipmentSync } from "../../lib/equipment";

interface ExecBody {
    api_count: number,
    payment_type: number,
    number_of_exec: number,
    viewer_id: number,
    gacha_id: number,
    type: number
}

interface ExchangeCharacterBody {
    character_id: number,
    api_count: number,
    gacha_id: number,
    viewer_id: number
}

interface ExchangeEquipmentBody {
    equipment_id: number,
    gacha_id: number,
    viewer_id: number,
    api_count: number
}

enum GachaPaymentType {
    EMPTY,
    FREE_VMONEY,
    VMONEY,
    TICKET,
    CAMPAIGN
}

enum GachaExecType {
    EMPTY,
    VMONEY_SINGLE,
    VMONEY_MULTI,
    UNKNOWN_1,
    UNKNOWN_2,
    DAILY_SINGLE,
    UNKNOWN_3,
    CAMPAIGN_SINGLE,
    CAMPAIGN_MULTI,
    MULTI_TICKET,
    SINGLE_TICKET,
    UNKNOWN_4,
    UNKNOWN_5,
    MULTI_WEAPON_TICKET
}

const exchangeRequiredPoints = 250

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/exchange_equipment", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ExchangeEquipmentBody

        const equipmentId = body.equipment_id
        const gachaId = body.gacha_id
        const viewerId = body.viewer_id
        if (isNaN(viewerId) || isNaN(equipmentId) || isNaN(gachaId)) return reply.status(400).send({
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

        // get gacha info
        const gachaInfo = getPlayerGachaInfoSync(playerId, gachaId)
        if (gachaInfo === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "No data for gacha with provided id."
        })

        const newExchangePoints = (gachaInfo.gachaExchangePoint ?? 0) - exchangeRequiredPoints
        if (0 > newExchangePoints) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough exchange points."
        })

        // reward equipment
        const giveResult = givePlayerEquipmentSync(playerId, equipmentId, 1)

        // update gacha info
        updatePlayerGachaInfoSync(playerId, {
            gachaId: gachaId,
            gachaExchangePoint: newExchangePoints
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "equipment_list": [
                    giveResult
                ],
                "gacha_info_list": [
                    {
                        "gacha_id": gachaId,
                        "is_account_first": gachaInfo.isAccountFirst,
                        "is_daily_first": gachaInfo.isDailyFirst,
                        "gacha_exchange_point": newExchangePoints
                    }
                ],
                "encyclopedia_info": [],
                "mail_arrived": false
            }
        })

    })

    fastify.post("/exchange_character", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ExchangeCharacterBody

        const characterId = body.character_id
        const gachaId = body.gacha_id
        const viewerId = body.viewer_id
        if (isNaN(viewerId) || isNaN(characterId) || isNaN(gachaId)) return reply.status(400).send({
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

        // get gacha info
        const gachaInfo = getPlayerGachaInfoSync(playerId, gachaId)
        if (gachaInfo === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "No data for gacha with provided id."
        })

        const newExchangePoints = (gachaInfo.gachaExchangePoint ?? 0) - exchangeRequiredPoints
        if (0 > newExchangePoints) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough exchange points."
        })

        // reward character
        const giveResult = givePlayerCharacterSync(playerId, characterId)
        if (giveResult === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Could not give player character."
        })

        // update gacha info
        updatePlayerGachaInfoSync(playerId, {
            gachaId: gachaId,
            gachaExchangePoint: newExchangePoints
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "character_list": [
                    giveResult?.character
                ],
                "item_list": giveResult.item !== undefined ? {
                    [giveResult.item.id]: giveResult.item.count
                } : [],
                "gacha_info_list": [
                    {
                        "gacha_id": gachaId,
                        "is_account_first": gachaInfo.isAccountFirst,
                        "is_daily_first": gachaInfo.isDailyFirst,
                        "gacha_exchange_point": newExchangePoints
                    }
                ],
                "encyclopedia_info": [],
                "mail_arrived": false
            }
        })

    })

    fastify.post("/exec", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ExecBody

        const viewerId = body.viewer_id
        const gachaId = body.gacha_id
        const paymentType = body.payment_type
        const numberOfExec = body.number_of_exec
        const type = body.type
        if (isNaN(viewerId) || isNaN(gachaId) || isNaN(paymentType) || isNaN(numberOfExec) || isNaN(type)) return reply.status(400).send({
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
        const player = isNaN(playerId) ? null : getPlayerSync(playerId)
        if (player === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // get the gacha
        const gachaData = getGachaSync(gachaId)
        if (gachaData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Gacha doesn't exist."
        })
        const isCharacterGacha = gachaData.type == GachaType.CHARACTER

        // get player gacha data
        let playerGachaData = getPlayerGachaInfoSync(playerId, gachaId)
        const insertPlayerGachaData = playerGachaData === null
        playerGachaData = playerGachaData ?? {
            gachaId: gachaId,
            isAccountFirst: true,
            isDailyFirst: true,
            gachaExchangePoint: 0
        }

        // determine & validate cost
        let pullCount = 0
        let playerPaidVmoney = player.vmoney
        let playerFreeVmoney = player.freeVmoney
        let gachaCampaigns: UserGachaCampaign[] = []

        let items: Record<number, number> = {}

        switch (paymentType) {
            case GachaPaymentType.FREE_VMONEY: {
                const isMulti = type === GachaExecType.VMONEY_MULTI
                const cost = (isMulti ? gachaData.multiCost : gachaData.singleCost)
                const overflow = cost > playerFreeVmoney ? cost - playerFreeVmoney : 0
                playerFreeVmoney = overflow > 0 ? 0 : playerFreeVmoney - cost
                playerPaidVmoney = overflow > 0 ? playerPaidVmoney - overflow : playerPaidVmoney
                
                pullCount = isMulti ? 10 : 1
                break;
            }

            // paid daily summon
            case GachaPaymentType.VMONEY: {
                if (!playerGachaData.isDailyFirst) return reply.status(400).send({
                    "error": "Bad Request",
                    "message": "Already did daily paid summon."
                })

                playerPaidVmoney -= isCharacterGacha ? 50 : 25

                pullCount = 1
                break;
            }

            // tickets
            case GachaPaymentType.TICKET: {
                const isWeapon = type === GachaExecType.MULTI_WEAPON_TICKET
                const isMulti = type === GachaExecType.MULTI_TICKET || isWeapon

                const itemId = isMulti ? (isWeapon ? 999004 : 999001) : (isWeapon ? 999005 : 999003)

                const itemCount = getPlayerItemSync(playerId, itemId)
                const useTicketCount = Math.max(1, numberOfExec) 
                const newItemCount = (itemCount ?? -1) - useTicketCount
                if (0 > newItemCount) return reply.status(400).send({
                    "error": "Bad Request",
                    "message": "Not enough tickets."
                })

                pullCount = useTicketCount * (isMulti ? 10 : 1)

                items[itemId] = newItemCount
                updatePlayerItemSync(playerId, itemId, newItemCount);
                break;
            }

            // free pulls
            case GachaPaymentType.CAMPAIGN: {
                const gachaCampaignId = getGachaCampaignIdSync(gachaId)
                if (gachaCampaignId === null) return reply.status(400).send({
                    "error": "Bad Request",
                    "message": "No gacha campaign assigned to gacha."
                })

                // get player campaign data
                let playerCampaignData = getPlayerGachaCampaignSync(playerId, gachaId, gachaCampaignId)
                const insertCampaignData = playerCampaignData === null;
                playerCampaignData = playerCampaignData  ?? {
                    gachaId: gachaId,
                    campaignId: gachaCampaignId,
                    count: 1
                }

                if (0 >= playerCampaignData.count) return reply.status(400).send({
                    "error": "Bad Request",
                    "message": "Already redeemed campaign for this period."
                })

                // update campaign
                playerCampaignData.count = 0
                if (insertCampaignData) {
                    insertPlayerGachaCampaignSync(playerId, playerCampaignData)
                } else {
                    updatePlayerGachaCampaignSync(playerId, gachaId, gachaCampaignId, 0)
                }

                gachaCampaigns.push(serializeGachaCampaign(playerCampaignData))

                const isMulti = type === GachaExecType.CAMPAIGN_MULTI
                pullCount = isMulti ? 10 : 1
                break;
            }
        }

        if (pullCount === 0) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid payment type."
        })

        if ((0 > playerFreeVmoney) || (0 > playerPaidVmoney)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough beads."
        })

        const drawResult = drawGachaSync(gachaData, pullCount)
        const rewardResult = rewardPlayerGachaDrawResultSync(playerId, gachaData, drawResult)

        const newGachaExchangePoint = (playerGachaData.gachaExchangePoint ?? 0) + pullCount
        if (insertPlayerGachaData) {
            playerGachaData.isAccountFirst = false
            playerGachaData.isDailyFirst = false
            playerGachaData.gachaExchangePoint = newGachaExchangePoint
            insertPlayerGachaInfoSync(playerId, playerGachaData)
        } else {
            updatePlayerGachaInfoSync(playerId, {
                gachaId: gachaId,
                isDailyFirst: false,
                isAccountFirst: false,
                gachaExchangePoint: newGachaExchangePoint
            })
        }

        updatePlayerSync({
            id: playerId,
            vmoney: playerPaidVmoney,
            freeVmoney: playerFreeVmoney
        })

        reply.header("content-type", "application/x-msgpack")
        if (isCharacterGacha) {
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id: viewerId
                }),
                "data": {
                    "user_info": {
                        "free_vmoney": playerFreeVmoney,
                        "vmoney": playerPaidVmoney
                    },
                    "draw": rewardResult.draw,
                    "character_list": rewardResult.characters,
                    "item_list": {
                        ...items,
                        ...rewardResult.items
                    },
                    "gacha_campaign_list": gachaCampaigns,
                    "gacha_info_list": [
                        {
                            "gacha_id": gachaId,
                            "is_account_first": false,
                            "is_daily_first": false,
                            "gacha_exchange_point": newGachaExchangePoint
                        }
                    ],
                    "encyclopedia_info": [],
                    "mail_arrived": false
                }
            })
        } else {
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id: viewerId
                }),
                "data": {
                    "user_info": {
                        "free_vmoney": playerFreeVmoney,
                        "vmoney": playerPaidVmoney
                    },
                    "is_erupt": false,
                    "draw_equipment": rewardResult.draw,
                    "item_list": {
                        ...items,
                        ...rewardResult.items
                    },
                    "equipment_list": rewardResult.equipment,
                    "gacha_info_list": [
                        {
                            "gacha_id": gachaId,
                            "is_account_first": false,
                            "is_daily_first": false,
                            "gacha_exchange_point": newGachaExchangePoint
                        }
                    ],
                    "encyclopedia_info": [],
                    "mail_arrived": false
                }
            })
        }
        
    })
}

export default routes;