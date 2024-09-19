// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerCharacterSync, getPlayerSync, getSession, givePlayerItemSync, updatePlayerSync } from "../../data/wdfpData";
import { givePlayerCharactersExpSync } from "../../lib/character";
import { generateDataHeaders, getServerTime } from "../../utils";
import { getCharacterDataSync } from "../../lib/assets";
import { clientSerializeDate } from "../../data/utils";

interface InjectExpBody {
    character_id: number,
    viewer_id: number,
    exp: number,
    api_count: number
}

interface StackToExpBody {
    character_id: number,
    api_count: number,
    number: number,
    viewer_id: number
}

const rarityStackConvertItemCount: Record<number, number> = {
    [1]: 2,
    [2]: 2,
    [3]: 2,
    [4]: 10,
    [5]: 30 
}
const rewardItemId = 990008

const rarityStackConvertExp: Record<number, number> = {
    [1]: 500,
    [2]: 500,
    [3]: 500,
    [4]: 2000,
    [5]: 10000
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/stack_to_exp", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as StackToExpBody

        const viewerId = body.viewer_id
        const characterId = body.character_id
        const convertCount = body.number
        if (isNaN(viewerId) || isNaN(characterId) || isNaN(convertCount)) return reply.status(400).send({
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

        // get character asset data
        const characterAssetData = getCharacterDataSync(characterId)
        if (characterAssetData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character does not exist."
        })

        // get character
        const character = getPlayerCharacterSync(playerId, characterId)
        if (character === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Player does not own character."
        })
        
        const afterStack = character.stack - convertCount
        if (0 > afterStack) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough stack."
        })

        // get amounts to add
        const rarity = characterAssetData.rarity
        const increaseExp = rarityStackConvertExp[rarity] * convertCount
        const increaseItemCount = rarityStackConvertItemCount[rarity] * convertCount

        const afterExp = player.expPool + increaseExp

        // update player
        updatePlayerSync({
            id: playerId,
            expPool: afterExp
        })

        // add item
        const afterItemCount = givePlayerItemSync(playerId, rewardItemId, increaseItemCount)

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_info": {
                    "exp_pool": afterExp,
                    "exp_pooled_time": getServerTime(player.expPooledTime)
                },
                "character_list": [
                    {
                        "viewer_id": viewerId,
                        "character_id": characterId,
                        "stack": afterStack,
                        "exp": character.exp,
                        "exp_total": character.exp,
                        "create_time": clientSerializeDate(character.joinTime),
                        "update_time": clientSerializeDate(character.updateTime),
                        "join_time": clientSerializeDate(character.joinTime)
                    }
                ],
                "converted_exp_info": {
                    "add_exp": increaseExp
                },
                "item_list": {
                    [rewardItemId]: afterItemCount
                },
                "mail_arrived": false
            }
        })
    })

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
        const addExp = Math.abs(body.exp)
        const playerExpPool = player.expPool
        if (addExp > playerExpPool) return reply.status(400).send({
            "error": "Internal Server Error",
            "message": "Not enough exp."
        })
        
        const playerAfterExpPool = player.expPool - addExp

        // decrease player exp
        updatePlayerSync({
            id: playerId,
            expPool: playerAfterExpPool
        })

        // add exp to the character
        const rewardResult = givePlayerCharactersExpSync(playerId, [characterId], addExp, false)

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "add_exp_list": rewardResult.add_exp_list,
                "character_list": rewardResult.character_list,
                "user_info": {
                    "exp_pool": rewardResult.exp_pool,
                    "exp_pooled_time": getServerTime(player.expPooledTime)
                },
            }
        })
    })
}

export default routes;