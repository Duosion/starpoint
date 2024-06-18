import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface UpdateBody {
    viewer_id: number
    option_params: {
        payment_alert: boolean
        auto_play: boolean
        attention_sound_effect: boolean
        gacha_play_no_rarity_up_movie: boolean
        attention_enable_in_battle: boolean
        number_notation_symbol: boolean
        attention_vibration: boolean
        simple_ability_description: boolean
        room_number_hidden: boolean
    }
}

const routes = async (fastify: FastifyInstance) => {
    // TODO: Implement options update persistence
    // This endpoint is only a placeholder, it currently does nothing.
    fastify.post("/update", async (request: FastifyRequest, reply: FastifyReply) => {
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
        
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_option": body.option_params
            }
        })
    })
}

export default routes;