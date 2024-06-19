// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerCharacterSync, getPlayerSync, getSession, updatePlayerCharacterSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { getCharacterDataSync } from "../../lib/assets";
import { clientSerializeDate } from "../../data/utils";

interface OverLimitBody {
    viewer_id: number
    character_id: number
    api_count: number
    use_stack: boolean
    over_limit_count: number
}

const characterMaxOverLimits: Record<number, number> = {
    [1]: 12, // 1* max over limit count
    [2]: 10, // 2* max over limit count
    [3]: 8,  // 3* max over limit count 
    [4]: 6,  // 4* max over limit count
    [5]: 4,  // 5* max over limit count 
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/over_limit", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as OverLimitBody

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

        // get character data
        const characterId = body.character_id
        const playerCharacterData = getPlayerCharacterSync(playerId, characterId)
        if (playerCharacterData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character not owned."
        })

        // get character asset data
        const characterAssetData = getCharacterDataSync(characterId)
        if (characterAssetData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No character asset data found."
        })

        // ensure we're in stack mode
        // TODO: implement non-stack mode uncapping
        if (!body.use_stack) return reply.status(501).send({
            "error": "Not Implemented",
            "message": "Only duplicate uncapping is implemented."
        })

        // calculate new over limit
        const overLimitCount = body.over_limit_count
        const newOverLimit = playerCharacterData.overLimitStep + overLimitCount
        if (newOverLimit > characterMaxOverLimits[characterAssetData.rarity]) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character cannot be uncapped further."
        })

        // ensure that the character has enough stack
        const newStack = playerCharacterData.stack - overLimitCount
        if (0 > newStack) return reply.status(400).send({
            "error": "Bad Request",
            "message": "hCharacter does not have enough duplicates to uncap."
        })

        // update the character
        updatePlayerCharacterSync(playerId, characterId, {
            overLimitStep: newOverLimit,
            stack: newStack
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "character_list": [
                    {
                        "over_limit_step": newOverLimit,
                        "character_id": characterId,
                        "stack": newStack,
                        "create_time": clientSerializeDate(playerCharacterData.joinTime),
                        "update_time": clientSerializeDate(new Date()),
                        "join_time": clientSerializeDate(playerCharacterData.joinTime)
                    }
                ],
                "mail_arrived": false
            }
        })
    })
}

export default routes;