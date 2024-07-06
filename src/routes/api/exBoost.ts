// Handles EX boosts for characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { getAccountPlayers, getPlayerCharacterSync, getPlayerItemSync, getPlayerSync, getSession, playerOwnsCharacterSync, updatePlayerCharacterSync, updatePlayerItemSync } from "../../data/wdfpData"
import { getCharacterDataSync, getExAbilityPoolsSync, getExBoostItemSync, getExStatusPoolSync } from "../../lib/assets"
import { generateDataHeaders } from "../../utils"
import { randomInt } from "crypto"
import { clientSerializeDate } from "../../data/utils"
import { characterExpCaps } from "../../lib/character"
import { characterMaxOverLimits } from "./character"

interface ExBoostDrawBody {
    character_id: number,
    viewer_id: number,
    api_count: number,
    cost_item_id: number
}

interface ExBoostSelectBody {
    viewer_id: number,
    is_confirm: boolean,
    api_count: number
}

interface ExBoostDrawResult {
    characterId: number,
    statusId: number,
    abilityIdList: number[]
}

const tierAbilityIdCounts: Record<number, [number, number]> = {
    [1]: [0, 2],
    [2]: [0, 2],
    [3]: [2, 2]
}

const tierAbilityTierRates: Record<number, [number, number, number]> = {
    [1]: [70, 20, 10],
    [2]: [0, 80, 20],
    [3]: [0, 0, 100]
}

const playerDraws: Record<number, ExBoostDrawResult> = {}

const drawExpBoost = async (request: FastifyRequest, reply: FastifyReply, autoAccept: boolean) => {
    const body = request.body as ExBoostDrawBody

    const viewerId = body.viewer_id
    const characterId = body.character_id
    const costItemId = body.cost_item_id
    if (isNaN(viewerId) || isNaN(characterId) || isNaN(costItemId)) return reply.status(400).send({
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
        "message": "No players bound to account."
    })

    // get player character data
    const characterData = getPlayerCharacterSync(playerId, characterId)
    if (characterData === null) return reply.status(400).send({
        "error": "Bad Request",
        "message": "Player does not own character."
    })

    // get character asset data
    const characterAssetData = getCharacterDataSync(characterId)
    if (!characterAssetData) return reply.status(500).send({
        "error": "Internal Server Error",
        "message": "Character does not have data."
    })

    // get ex boost item data
    const costItemData = getExBoostItemSync(costItemId)
    if (!costItemData) return reply.status(400).send({
        "error": "Bad Request",
        "message": "Attempt to use invalid cost item."
    })

    // check if the element is correct
    if ((costItemData.element !== undefined) && (costItemData.element !== characterAssetData.element)) return reply.status(400).send({
        "error": "Bad Request",
        "message": "Attempt to use wrong item with different element from character."
    })

    // make sure that the player has enough of the item
    const costItemAmount = getPlayerItemSync(playerId, costItemId)
    if (costItemAmount === null) return reply.status(400).send({
        "error": "Bad Request",
        "message": "You do not own item."
    })
    const afterCostItemAmount = costItemAmount - costItemData.count
    if (0 > afterCostItemAmount) return reply.status(400).send({
        "error": "Bad Request",
        "message": "Not enough of item."
    })

    // ensure that the requested character is level 100
    const rarity = characterAssetData.rarity
    if (characterExpCaps[rarity][characterMaxOverLimits[rarity]] > characterData.exp) return reply.status(400).send({
        "error": "Bad Request",
        "message": "Character not level 100."
    })

    // get the status pools
    const drawTier = costItemData.tier
    const exStatusPool = getExStatusPoolSync(drawTier)
    if (exStatusPool === null) return reply.status(500).send({
        "error": "Internal Server Error",
        "message": "Pool not found."
    })

    // get the ability pools
    const abilityPools = structuredClone(getExAbilityPoolsSync());

    // deduct the item
    updatePlayerItemSync(playerId, costItemId, afterCostItemAmount)

    // decide the status pool id
    const drawStatusId = exStatusPool[randomInt(exStatusPool.length)]

    // decide the ability ids
    const drawAbilityIdRange = tierAbilityIdCounts[drawTier]
    const tierAbilityRates = tierAbilityTierRates[drawTier]
    const drawAbilityIdCount = randomInt(drawAbilityIdRange[0], drawAbilityIdRange[1] + 1)

    const drawAbilityIdList: number[] = []
    for (let i = 0; i < drawAbilityIdCount; i++) {
        const roll = randomInt(1, 101)

        let offset = 0;
        let tier = 1;
        for (const rate of tierAbilityRates) {
            if ((rate + offset) >= roll) break;
            tier += 1;
            offset += rate;
        }

        const pool = abilityPools[tier]
        const randomIndex = randomInt(pool.length)

        drawAbilityIdList.push(pool[randomIndex]);

        pool.splice(randomIndex, 1)
    }

    const drawResult: ExBoostDrawResult = {
        characterId: characterId,
        statusId: drawStatusId,
        abilityIdList: drawAbilityIdList
    }

    const headers = generateDataHeaders({
        viewer_id: viewerId
    })

    reply.header("content-type", "application/x-msgpack")
    if (autoAccept) {
        // update player character data
        updatePlayerCharacterSync(playerId, characterId, {
            exBoost: {
                statusId: drawResult.statusId,
                abilityIdList: drawResult.abilityIdList
            }
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": headers,
            "data": {
                "character_list": [
                    {
                        "character_id": characterId,
                        "viewer_id": viewerId,
                        "ex_boost": {
                            "status_id": drawResult.statusId,
                            "ability_id_list": drawResult.abilityIdList
                        },
                        "create_time": clientSerializeDate(characterData.joinTime),
                        "update_time": clientSerializeDate(characterData.updateTime),
                        "join_time": clientSerializeDate(characterData.joinTime)
                    }
                ],
                "item_list": {
                    [String(costItemId)]: afterCostItemAmount
                },
                "mail_arrived": false
            }
        })
    } else {
        // add to player draws table
        playerDraws[playerId] = drawResult
        
        return reply.status(200).send({
            "data_headers": headers,
            "data": {
                "character_id": characterId,
                "draw_result": {
                    "status_id": drawStatusId,
                    "ability_id_list": drawAbilityIdList
                },
                "item_list": {
                    [String(costItemId)]: afterCostItemAmount
                },
                "mail_arrived": false
            }
        })
    }
    
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/select", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ExBoostSelectBody

        const viewerId = body.viewer_id
        const isConfirm = body.is_confirm
        if (isNaN(viewerId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        // get viewer id session
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
            "message": "No players bound to account."
        })

        // get draw result
        const drawResult = playerDraws[playerId]
        if (drawResult === undefined) return reply.status(400).send({
            "error": "Bad Request",
            "message": "No draw result to select."
        })

        // generate response headers
        const headers = generateDataHeaders({
            viewer_id: viewerId
        })

        // remove player draws entry
        delete playerDraws[playerId];

        // return if not confirmed
        if (!isConfirm) {
            reply.header("content-type", "application/x-msgpack")
            return reply.status(200).send({
                "data_headers": headers,
                "data": {
                    "mail_arrived": false
                }
            })
        }

        // get current character data
        const characterId = drawResult.characterId
        const characterData = getPlayerCharacterSync(playerId, characterId)
        if (characterData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Player does not own character."
        })

        // update player character data
        updatePlayerCharacterSync(playerId, characterId, {
            exBoost: {
                statusId: drawResult.statusId,
                abilityIdList: drawResult.abilityIdList
            }
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": headers,
            "data": {
                "character_list": [
                    {
                        "character_id": characterId,
                        "viewer_id": viewerId,
                        "ex_boost": {
                            "status_id": drawResult.statusId,
                            "ability_id_list": drawResult.abilityIdList
                        },
                        "create_time": clientSerializeDate(characterData.joinTime),
                        "update_time": clientSerializeDate(characterData.updateTime),
                        "join_time": clientSerializeDate(characterData.joinTime)
                    }
                ],
                "mail_arrived": false
            }
        })
    })

    fastify.post("/draw", async (request: FastifyRequest, reply: FastifyReply) => drawExpBoost(request, reply, false))

    fastify.post("/first_draw", async (request: FastifyRequest, reply: FastifyReply) => drawExpBoost(request, reply, true))
}

export default routes;