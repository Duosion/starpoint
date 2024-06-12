// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerCharacterSync, getPlayerSync, getSession, playerOwnsCharacterSync, playerOwnsEquipmentSync, updatePlayerCharacterSync, updatePlayerPartySync, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders, getServerTime } from "../../utils";
import { clientSerializeDate } from "../../data/utils";

interface InjectExpBody {
    character_id: number,
    viewer_id: number,
    exp: number,
    api_count: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/inject_exp", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as InjectExpBody

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

        // increase character exp
        const characterId = body.character_id
        const character = getPlayerCharacterSync(playerId, characterId)
        if (character === null) return reply.status(400).send({
            "error": "Internal Server Error",
            "message": "Player does not own character."
        })

        // make sure that the player has enough exp
        const addExp = body.exp
        const playerExpPool = player.expPool
        if (addExp > playerExpPool) return reply.status(400).send({
            "error": "Internal Server Error",
            "message": "Not enough exp."
        })
        
        const beforeExp = character.exp
        const afterExp = beforeExp + addExp
        const playerAfterExpPool = player.expPool - addExp
        
        // increase character exp
        updatePlayerCharacterSync(playerId, characterId, {
            exp: afterExp
        })

        // decrease player exp
        updatePlayerSync({
            id: playerId,
            expPool: playerAfterExpPool
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "add_exp_list": [
                    {
                        "character_id": characterId,
                        "add_exp": addExp,
                        "after_exp": afterExp,
                        "add_exp_pool": 0
                    }
                ],
                "character_list": [
                    {
                        "character_id": characterId,
                        "exp": afterExp,
                        "create_time": clientSerializeDate(character.joinTime),
                        "update_time": clientSerializeDate(character.updateTime),
                        "join_time": clientSerializeDate(character.joinTime),
                        "exp_total": afterExp
                    }
                ],
                "user_info": {
                    "exp_pool": playerAfterExpPool,
                    "exp_pooled_time": getServerTime(player.expPooledTime)
                },
            }
        })
    })
}

export default routes;