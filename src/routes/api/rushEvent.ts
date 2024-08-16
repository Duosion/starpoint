// Handles mail.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface SummaryBody {
    event_id: number,
    viewer_id: number
}

interface PartyBody {
    viewer_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/summary", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SummaryBody

        const viewerId = body.viewer_id
        const eventId = body.event_id
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

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "endless_battle_next_round": 1
            }
        })
    })

    fastify.post("/party", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as PartyBody

        const viewerId = body.viewer_id
        if (isNaN(viewerId)) return reply.status(400).send({
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
                "user_party_group_list": [
                    {
                        "party_group_color_id": 0,
                        "party_group_id": 0,
                        "party_list": [
                            {
                                "ability_soul_ids": [],
                                "character_ids": [],
                                "equipment_ids": [],
                                "options": {
                                    "allow_other_players_to_heal_me": false
                                },
                                "party_edited": false,
                                "party_id": 0,
                                "party_name": "",
                                "unison_character_ids": []
                            }
                        ]
                    }
                ]
            }
        })
    })
}

export default routes;