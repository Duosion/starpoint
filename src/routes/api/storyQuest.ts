import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerSingleQuestProgressSync, getPlayerSync, getSession, insertPlayerQuestProgressSync, updatePlayerQuestProgressSync } from "../../data/wdfpData";
import { getQuestFromCategorySync } from "../../lib/assets";
import { givePlayerRewardSync } from "../../lib/quest";
import { generateDataHeaders } from "../../utils";
import { QuestCategory } from "../../lib/types";

interface FinishBody {
    party_id: number,
    quest_id: number,
    viewer_id: number,
    category: number,
    api_count: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/finish", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as FinishBody

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

        // get player
        const playerIds = await getAccountPlayers(viewerIdSession.accountId)
        const playerId = playerIds[0]
        const playerData = !isNaN(playerId) ? getPlayerSync(playerId) : null

        if (playerData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No player bound to account."
        })

        const questSection = body.category
        const questId = body.quest_id

        // get quest data & check if it is the right type
        const questData = getQuestFromCategorySync(questSection, questId)
        if (questData === null || ("sPlusReward" in questData)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid quest ID provided."
        })

        // get quest progress
        const questProgress = getPlayerSingleQuestProgressSync(playerId, questSection, questId);
        const finished = questProgress !== null ? questProgress.finished : false
        const rewardResult = !finished ? givePlayerRewardSync(playerId, questData.clearReward) : null

        if (!finished) {
            // update quest progress
            if (questProgress === null) {
                // insert if it doesn't already exist.
                insertPlayerQuestProgressSync(playerId, questSection, {
                    questId: questId,
                    finished: true
                })
            } else {
                // simply update the quest progress if it already exists.
                updatePlayerQuestProgressSync(playerId, questSection, {
                    questId: questId,
                    finished: true
                })
            }
        }
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": !finished ? {
                "user_info": {
                    "free_vmoney": playerData.freeVmoney + (rewardResult?.user_info.free_vmoney || 0),
                    "free_mana": playerData.freeMana + (rewardResult?.user_info.free_mana || 0)
                },
                "character_list": rewardResult?.character_list || [],
                "joined_character_id_list": rewardResult?.joined_character_id_list || [],
                "equipment_list": rewardResult?.equipment_list || [],
                "items": rewardResult?.items || {}
            } : [],
            
        })
    })
}

export default routes;
