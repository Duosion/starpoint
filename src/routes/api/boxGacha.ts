// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerBoxGachaDrawnRewardsSync, getPlayerBoxGachaSync, getPlayerItemSync, getPlayerSync, getSession, insertPlayerBoxGachaDrawnRewardSync, insertPlayerBoxGachaSync, playerOwnsEquipmentSync, updatePlayerBoxGachaDrawnRewardSync, updatePlayerBoxGachaSync, updatePlayerEquipmentSync, updatePlayerItemSync, updatePlayerPartyGroupSync } from "../../data/wdfpData";
import { generateDataHeaders, getServerTime } from "../../utils";
import { getBoxGachaSync } from "../../lib/assets";
import { drawBoxGachaSync, rewardPlayerBoxGachaResultSync } from "../../lib/gacha";
import { BoxGachaBoxes } from "../../lib/types";

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

interface CloseBody {
    box_gacha_id: number,
    box_id: number,
    viewer_id: number,
    api_count: number
}

/**
 * Returns all of a box gacha's box statuses serialized for the client.
 * 
 * @param playerId The ID of the player.
 * @param boxGachaId The ID of the box gacha.
 * @param boxes A record of boxes to get the data of.
 * @param skipBoxId The ID of the box id to skip.
 */
function getAllBoxList(
    playerId: number,
    boxGachaId: number,
    boxes: BoxGachaBoxes,
    skipBoxId?: number
): Object[] {
    const boxInfo: Object[] = []
    for (const [boxId, _] of Object.entries(boxes)) {
        // get drawn rewards
        const parsedBoxId = Number(boxId)
        if (parsedBoxId !== skipBoxId) {
            const playerBoxData = getPlayerBoxGachaSync(playerId, boxGachaId, parsedBoxId)

            const playerDrawnRewards = getPlayerBoxGachaDrawnRewardsSync(playerId, boxGachaId, parsedBoxId)

            boxInfo.push({
                "box_id": parsedBoxId,
                "reset_times": playerBoxData?.resetTimes ?? 0,
                "all_drawn_reward_list": playerDrawnRewards.map(reward => {
                    return {
                        "reward_id": reward.id,
                        "number": reward.number
                    }
                }),
                "coming_next_reward_list": [],
                "is_closed": playerBoxData?.isClosed ?? false
            })
        }
    }
    return boxInfo
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/close", async (request: FastifyRequest, reply: FastifyReply) => {

        const body = request.body as CloseBody

        const viewerId = body.viewer_id
        const boxGachaId = body.box_gacha_id
        const boxId = body.box_id
        if (isNaN(viewerId) || isNaN(boxGachaId) || isNaN(boxId)) return reply.status(400).send({
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

        // get box asset data.
        const boxGachaData = getBoxGachaSync(boxGachaId)
        if (boxGachaData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid box gacha id."
        })

        // get the box's data.
        const playerBoxData = getPlayerBoxGachaSync(playerId, boxGachaId, boxId)
        if (playerBoxData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Box doesn't exist"
        })

        // check if the box is already closed
        if (playerBoxData.isClosed) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Box is already closed."
        })

        // set box to be closed
        updatePlayerBoxGachaSync(playerId, boxGachaId, {
            boxId: boxId,
            isClosed: true
        })

        // get all boxes
        const allBoxDataList = getAllBoxList(playerId, boxGachaId, boxGachaData.boxes, boxId);

        // add box that we just closed to all box data.
        const playerDrawnRewards = getPlayerBoxGachaDrawnRewardsSync(playerId, boxGachaId, boxId)
        allBoxDataList.push({
            "box_id": boxId,
            "reset_times": playerBoxData?.resetTimes ?? 0,
            "all_drawn_reward_list": playerDrawnRewards.map(reward => {
                return {
                    "reward_id": reward.id,
                    "number": reward.number
                }
            }),
            "coming_next_reward_list": [],
            "is_closed": true
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "all_box_info": getAllBoxList(playerId, boxGachaId, boxGachaData.boxes)
            }
        })
    })

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
        const shouldClose = remainingDrawsNumber === 0
        if (playerBoxData === null) {
            insertPlayerBoxGachaSync(playerId, boxGachaId, {
                boxId: boxId,
                isClosed: shouldClose,
                remainingNumber: remainingDrawsNumber,
                resetTimes: 0
            })
        } else {
            // auto close the box if the remaining draws are 0
            updatePlayerBoxGachaSync(playerId, boxGachaId, {
                boxId: boxId,
                isClosed: shouldClose,
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
        const allBoxInfo: Object[] = getAllBoxList(playerId, boxGachaId, boxGachaData.boxes, boxId)

        // add current box to allBoxInfo
        {
            // build all drawn reward list
            const allDrawnRewardList: Object[] = []
            for (const [rewardId, number] of allDrawResultMap) {
                allDrawnRewardList.push({
                    "reward_id": rewardId,
                    "number": number
                })
            }

            allBoxInfo.push({
                "box_id": boxId,
                "reset_times": playerBoxData?.resetTimes ?? 0,
                "all_drawn_reward_list": allDrawnRewardList,
                "coming_next_reward_list": [],
                "is_closed": shouldClose ? true : playerBoxData?.isClosed ?? false
            })
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

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "all_box_info": getAllBoxList(playerId, boxGachaId, boxGachaData.boxes)
            }
        })
    })
}

export default routes;