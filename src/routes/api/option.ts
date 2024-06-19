import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getSession, updatePlayerOptionsSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface UpdateBody {
    viewer_id: number
    api_count: number
    option_params: Record<string, boolean>
}

const updateRoute = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as UpdateBody

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

    if (isNaN(playerId)) return reply.status(500).send({
        "error": "Internal Server Error",
        "message": "No player bound to account."
    })

    // update options
    const updatedOptions = body.option_params
    updatePlayerOptionsSync(playerId, updatedOptions)
    
    reply.header("content-type", "application/x-msgpack")
    return reply.status(200).send({
        "data_headers": generateDataHeaders({
            viewer_id: viewerId
        }),
        "data": {
            "user_option": updatedOptions
        }
    })
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/update", updateRoute)

    fastify.post("/update_in_battle", updateRoute)
}

export default routes;