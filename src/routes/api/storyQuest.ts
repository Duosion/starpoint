import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerSingleQuestProgressSync, getPlayerSync, getSession, insertPlayerQuestProgressSync, updatePlayerQuestProgressSync, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface FinishBody {
    party_id: number,
    quest_id: number,
    viewer_id: number,
    category: number,
    api_count: number
}

// how many beads the player receives for reading a story.
const storyReadBeadsReward = 15

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

        // check current quest progress
        const questSection = body.category
        const questId = body.quest_id

        const questProgress = getPlayerSingleQuestProgressSync(playerId, questSection, questId);
        const newVmoney = playerData.freeVmoney + storyReadBeadsReward
        const finished = questProgress !== null ? questProgress.finished : false

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

            // increase player beads
            updatePlayerSync({
                id: playerId,
                freeVmoney: newVmoney
            })
        }
        
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": !finished ? {
                "user_info": {
                    "free_vmoney": newVmoney
                }
            } : []
        })
    })
}

export default routes;