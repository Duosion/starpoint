// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerBoxGachaDrawnRewardsSync, getPlayerBoxGachaSync, getPlayerItemSync, getPlayerSync, getSession, insertPlayerBoxGachaDrawnRewardSync, insertPlayerBoxGachaSync, playerOwnsEquipmentSync, updatePlayerBoxGachaDrawnRewardSync, updatePlayerBoxGachaSync, updatePlayerEquipmentSync, updatePlayerItemSync, updatePlayerPartyGroupSync } from "../../data/wdfpData";
import { generateDataHeaders, getServerTime } from "../../utils";
import { getBoxGachaSync } from "../../lib/assets";
import { drawBoxGachaSync, rewardPlayerBoxGachaResultSync } from "../../lib/gacha";

interface GetBoxListBody {
    box_gacha_id: number
    viewer_id: number
    api_count: number
}

interface ExecBody {
    stop_on_featured_rewards: boolean,
    box_gacha_id: number,
    box_id: number,
    api_count: number,
    viewer_id: number,
    number: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/exec", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ExecBody

        const viewerId = body.viewer_id
        const boxGachaId = body.box_gacha_id
        const boxId = body.box_id
        const pullCount = body.number
        const stopOnFeaturedRewards = body.stop_on_featured_rewards
        if (isNaN(viewerId) || isNaN(boxGachaId) || isNaN(boxId) || isNaN(pullCount) || stopOnFeaturedRewards === undefined) return reply.status(400).send({
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
            "message": "No players bound to account."
        })

        // get box gacha data
        const boxGachaData = getBoxGachaSync(boxGachaId)
        if (boxGachaData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid box gacha id."
        })

        // make sure the player has enough currency
        const pullCurrencyId = boxGachaData.redeemItemId
        const playerPullCurrency = getPlayerItemSync(playerId, pullCurrencyId)
        if (playerPullCurrency === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "No pull currency."
        })
        const newPullCurrency = playerPullCurrency - (Math.abs(pullCount) * boxGachaData.redeemItemCount)
        if (0 > newPullCurrency) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough pull currency."
        })

        // get the current box
        const boxRewards = boxGachaData.boxes[boxId]
        if (boxRewards === undefined) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid box ID."
        })

        const playerBoxData = getPlayerBoxGachaSync(playerId, boxGachaId, boxId)
        if (playerBoxData !== null && playerBoxData.isClosed) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Box is closed."
        })

        const playerDrawnRewards = getPlayerBoxGachaDrawnRewardsSync(playerId, boxGachaId, boxId)

        // perform the draws
        const drawResult = drawBoxGachaSync(boxRewards, playerDrawnRewards, pullCount, stopOnFeaturedRewards)
        const drawnRewards = drawResult.rewards

        // reward the player
        const rewardResult = rewardPlayerBoxGachaResultSync(playerId, drawResult)

        // calculate all drawn reward list
        const playerDrawnRewardMap: Map<number, number> = new Map()
        const allDrawResultMap: Map<number, number> = new Map()
        let totalDrawCount = 0
        for (const drawnReward of drawnRewards) {
            const number = drawnReward.number
            totalDrawCount += number
            allDrawResultMap.set(drawnReward.id, number);
        }
        for (const playerDrawnReward of playerDrawnRewards) {
            const id = playerDrawnReward.id
            const number = playerDrawnReward.number
            totalDrawCount += number
            allDrawResultMap.set(id, (allDrawResultMap.get(id) ?? 0) + number);
            playerDrawnRewardMap.set(id, number)
        }

        // update box gacha data
        const remainingDrawsNumber = (boxGachaData.availableCounts[boxId] ?? totalDrawCount) - totalDrawCount
        if (playerBoxData === null) {
            insertPlayerBoxGachaSync(playerId, boxGachaId, {
                boxId: boxId,
                isClosed: false,
                remainingNumber: remainingDrawsNumber,
                resetTimes: 0
            })
        } else {
            playerBoxData.isClosed = remainingDrawsNumber === 0,
            updatePlayerBoxGachaSync(playerId, boxGachaId, {
                boxId: boxId,
                isClosed: playerBoxData.isClosed,
                remainingNumber: remainingDrawsNumber
            })
        }

        // upsert drawn rewards
        for (const drawnReward of drawnRewards) {
            const id = drawnReward.id
            const existing = playerDrawnRewardMap.get(drawnReward.id)
            if (existing === undefined) {
                insertPlayerBoxGachaDrawnRewardSync(playerId, boxGachaId, boxId, {
                    id: id,
                    number: drawnReward.number
                })
            } else {
                updatePlayerBoxGachaDrawnRewardSync(playerId, boxGachaId, boxId, id, existing + drawnReward.number)
            }
        }

        // update currency
        updatePlayerItemSync(playerId, pullCurrencyId, newPullCurrency)

        // generate totalDrawnRewards array
        const allBoxInfo: Object[] = []
        for (const [otherBoxId, _] of Object.entries(boxGachaData.boxes)) {
            // get drawn rewards
            const parsedBoxId = Number(otherBoxId)
            if (parsedBoxId === boxId) {
                // build all drawn reward list
                const allDrawnRewardList: Object[] = []
                for (const [rewardId, number] of allDrawResultMap) {
                    allDrawnRewardList.push({
                        "reward_id": rewardId,
                        "number": number
                    })
                }

                allBoxInfo.push({
                    "box_id": parsedBoxId,
                    "reset_times": playerBoxData?.resetTimes ?? 0,
                    "all_drawn_reward_list": allDrawnRewardList,
                    "coming_next_reward_list": [],
                    "is_closed": playerBoxData?.isClosed ?? false
                })
            } else {
                const playerBoxData = getPlayerBoxGachaSync(playerId, boxGachaId, parsedBoxId)
                const isPlayerDataUnavailable = playerBoxData === null

                const playerDrawnRewards = getPlayerBoxGachaDrawnRewardsSync(playerId, boxGachaId, parsedBoxId)

                allBoxInfo.push({
                    "box_id": parsedBoxId,
                    "reset_times": isPlayerDataUnavailable ? 0 : playerBoxData.resetTimes,
                    "all_drawn_reward_list": playerDrawnRewards.map(reward => {
                        return {
                            "reward_id": reward.id,
                            "number": reward.number
                        }
                    }),
                    "coming_next_reward_list": [],
                    "is_closed": isPlayerDataUnavailable ? false : playerBoxData.isClosed
                })
            }
        }

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_info": {
                    "free_mana": player.freeMana + (rewardResult?.user_info.free_mana ?? 0),
                    "exp_pool": player.expPool + (rewardResult?.user_info.exp_pool ?? 0),
                    "exp_pooled_time": getServerTime(player.expPooledTime),
                },
                "drawn_reward_list": drawnRewards.map(reward => {
                    return {
                        "reward_id": reward.id,
                        "number": reward.number
                    }
                }),
                "all_box_info": allBoxInfo,
                "joined_character_id_list": rewardResult?.joined_character_id_list ?? [],
                "character_list": rewardResult?.character_list ?? [],
                "equipment_list": rewardResult?.equipment_list ?? [],
                "item_list": {
                    [pullCurrencyId]: newPullCurrency,
                    ...(rewardResult?.items ?? {})
                },
                "mail_arrived": false
            }
        })
    })

    fastify.post("/get_box_list", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as GetBoxListBody

        const viewerId = body.viewer_id
        const boxGachaId = body.box_gacha_id
        if (isNaN(viewerId) || isNaN(boxGachaId)) return reply.status(400).send({
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
            "message": "No players bound to account."
        })

        // get box gacha data
        const boxGachaData = getBoxGachaSync(boxGachaId)
        if (boxGachaData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid box gacha id."
        })

        // get the current box
        const boxInfo: Object[] = []
        for (const [boxId, _] of Object.entries(boxGachaData.boxes)) {
            // get drawn rewards
            const parsedBoxId = Number(boxId)
            const playerBoxData = getPlayerBoxGachaSync(playerId, boxGachaId, parsedBoxId)
            const isPlayerDataUnavailable = playerBoxData === null

            const playerDrawnRewards = getPlayerBoxGachaDrawnRewardsSync(playerId, boxGachaId, parsedBoxId)

            boxInfo.push({
                "box_id": parsedBoxId,
                "reset_times": isPlayerDataUnavailable ? 0 : playerBoxData.resetTimes,
                "all_drawn_reward_list": playerDrawnRewards.map(reward => {
                    return {
                        "reward_id": reward.id,
                        "number": reward.number
                    }
                }),
                "coming_next_reward_list": [],
                "is_closed": isPlayerDataUnavailable ? false : playerBoxData.isClosed
            })
        }

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "all_box_info": boxInfo
            }
        })
    })
}

export default routes;