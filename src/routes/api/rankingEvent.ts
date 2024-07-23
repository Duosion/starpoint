// Handles mail.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface ReceiveRewardBody {
    api_count: number,
    viewer_id: number,
    ranking_event_id: number
}

const routes = async (fastify: FastifyInstance) => {
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