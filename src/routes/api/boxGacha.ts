// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerBoxGachaDrawnRewardsSync, getPlayerBoxGachaSync, getPlayerItemSync, getPlayerSync, getSession, playerOwnsEquipmentSync, updatePlayerEquipmentSync, updatePlayerPartyGroupSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { getBoxGachaSync } from "../../lib/assets";

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
    fastify.post("/get_box_list", async (request: FastifyRequest, reply: FastifyReply) => {
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
        const playerPullCurrency = getPlayerItemSync(playerId, boxGachaData.redeemItemId)
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
        const playerBoxData = getPlayerBoxGachaSync(playerId, boxGachaId, boxId)
        if (playerBoxData !== null && playerBoxData.isClosed) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Box is closed."
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
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