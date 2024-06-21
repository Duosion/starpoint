// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerSync, getSession, updatePlayerPartyGroupSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface EditBody {
    viewer_id: number
    api_count: number
    retry_count: number
    party_group_edit_params_list: {
        party_group_id: number,
        party_category: number,
        party_group_color_id: number
    }[]
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/edit", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as EditBody

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
        const player = !isNaN(playerId) ? getPlayerSync(playerId) : null

        if (player === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // update party groups
        for (const editParamsList of body.party_group_edit_params_list) {
            updatePlayerPartyGroupSync(playerId, editParamsList.party_group_id, editParamsList.party_group_color_id)
        }
        
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {}
        })
    })
}

export default routes;