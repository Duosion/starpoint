// Handles mail.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerQuestProgressSync, getPlayerSingleQuestProgressSync, getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { QuestCategory } from "../../lib/types";
import { PlayerQuestProgress } from "../../data/types";

interface ReceiveRewardBody {
    api_count: number,
    viewer_id: number,
    ranking_event_id: number
}

interface GetSummaryBody {
    viewer_id: number,
    ranking_event_id: number,
    quest_kind: number
}

const rankingEventIdQuestMap: Record<number, number> = {
    [1]: 1001,
    [2]: 2001,
    [3]: 3001,
    [4]: 4001,
    [5]: 5001
}

const rankingEventTopTimesMs: Record<number, number> = {
    [1]: 33830,
    [2]: 33830,
    [3]: 25143,
    [4]: 40909,
    [5]: 6987
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/get_summary", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as GetSummaryBody

        const viewerId = body.viewer_id
        const eventId = body.ranking_event_id
        if (isNaN(viewerId) || isNaN(eventId)) return reply.status(400).send({
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
            "message": "No player bound to account."
        })

        // get quest
        const questId = rankingEventIdQuestMap[eventId]
        if (questId === undefined) return reply.status(400).send({
            "error": "Bad Request",
            "message": `No quest found for ranking event with id '${eventId}'.`
        })

        const topTime = rankingEventTopTimesMs[eventId] ?? 0

        // get data for the ranking quest
        const playerQuestData = getPlayerSingleQuestProgressSync(playerId, QuestCategory.RANKING_EVENT_SINGLE, questId)
        const isAccomplished = playerQuestData !== null && playerQuestData.bestElapsedTimeMs !== undefined && playerQuestData.bestElapsedTimeMs !== null

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "best_record": {
                    "elapsed_time_ms": isAccomplished ? playerQuestData.bestElapsedTimeMs ?? 0 : 0,
                    "is_accomplished": isAccomplished,
                    "score": isAccomplished ? playerQuestData.highScore ?? 0 : 0
                },
                "leader_character_evolution_img_level": 1,
                "leader_character_id": 1,
                "rank_border_top": {
                    "elapsed_time_ms": topTime,
                    "is_accomplished": true,
                    "score": 1110111
                },
                "rank_percentage": isAccomplished ? 1 - (topTime / (playerQuestData.bestElapsedTimeMs ?? 1)) : 100
            }
        })
    })

    fastify.post("/receive_reward", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ReceiveRewardBody

        const viewerId = body.viewer_id
        if (!viewerId || isNaN(viewerId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "status": 1,
                "best_record": {
                    "elapsed_time_ms": 0,
                    "is_accomplished": false,
                    "score": 0
                },
                "leader_character_evolution_img_level": 1,
                "leader_character_id": 1,
                "rank_border_top": {
                    "elapsed_time_ms": 500.0,
                    "is_accomplished": true,
                    "score": 1.0
                },
                "rank_percentage": 100
            }
        })
    })
}

export default routes;