// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerCharacterManaNodesSync, getPlayerCharacterSync, getPlayerCharactersManaNodesSync, getPlayerItemSync, getPlayerSync, getSession, givePlayerItemSync, hasPlayerUnlockedCharacterManaNodeSync, insertPlayerCharacterManaNodesSync, updatePlayerCharacterBondTokenSync, updatePlayerCharacterSync, updatePlayerItemSync, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { getCharacterDataSync, getCharacterManaNodeSync, getCharacterManaNodesSync } from "../../lib/assets";
import { clientSerializeDate } from "../../data/utils";

interface OverLimitBody {
    viewer_id: number
    character_id: number
    api_count: number
    use_stack: boolean
    item_id: number,
    over_limit_count: number
}

interface LearnManaNodeBody {
    viewer_id: number,
    character_id: number,
    api_count: number,
    mana_node_multiplied_id_list: number[]
}

interface SetIllustrationSettingsBody {
    character_id: number,
    api_count: number,
    illustration_settings: number[],
    viewer_id: number
}

interface ReceiveBondTokenBody {
    character_id: number,
    mana_board_index: number,
    api_count: number,
    viewer_id: number
}

const characterMaxOverLimits: Record<number, number> = {
    [1]: 12, // 1* max over limit count
    [2]: 10, // 2* max over limit count
    [3]: 8,  // 3* max over limit count 
    [4]: 6,  // 4* max over limit count
    [5]: 4,  // 5* max over limit count 
}

const openManaBoardRequiredUncaps: Record<number, number> = {
    [1]: 10,
    [2]: 8,
    [3]: 6,
    [4]: 4,
    [5]: 2
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/set_illustration_settings", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SetIllustrationSettingsBody

        const viewerId = body.viewer_id
        const characterId = body.character_id
        if (!viewerId || isNaN(viewerId) || !characterId || isNaN(characterId)) return reply.status(400).send({
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
            "data": {}
        }) 
    })

    fastify.post("/receive_bond_token", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ReceiveBondTokenBody

        const viewerId = body.viewer_id
        const characterId = body.character_id
        const manaBoardIndex = body.mana_board_index
        if (isNaN(viewerId) || isNaN(characterId) || isNaN(manaBoardIndex)) return reply.status(400).send({
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
        const characterData = getPlayerCharacterSync(playerId, characterId)
        if (characterData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character not owned."
        })

        const bondTokenReceivable = characterData.bondTokenList[manaBoardIndex - 1]?.status === 1
        if (!bondTokenReceivable) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Cannot receive bond token."
        })

        // reward the bond token
        const newBondTokens = player.bondToken + 1
        updatePlayerSync({
            id: playerId,
            bondToken: newBondTokens
        })

        // update bond token status
        updatePlayerCharacterBondTokenSync(playerId, characterId, {
            manaBoardIndex: manaBoardIndex,
            status: 2
        });

        // build bond token list for response
        let bondTokenList: Object[] = []
        for (const entry of characterData.bondTokenList) {
            const entryIndex = entry.manaBoardIndex
            bondTokenList.push({
                "mana_board_index": entryIndex,
                "status": entryIndex === manaBoardIndex ? 2 : entry.status
            })
        }

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_info": {
                    "bond_token": newBondTokens
                },
                "character_list": [
                    {
                        "character_id": characterId,
                        "bond_token_list": bondTokenList,
                        "create_time": clientSerializeDate(characterData.joinTime),
                        "update_time": clientSerializeDate(characterData.updateTime),
                        "join_time": clientSerializeDate(characterData.joinTime)
                    }
                ],
                "mail_arrived": false
            }
        }) 
    })

    fastify.post("/open_mana_board", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ReceiveBondTokenBody
        
        const viewerId = body.viewer_id
        const characterId = body.character_id
        const manaBoardIndex = body.mana_board_index
        if (isNaN(viewerId) || isNaN(characterId) || isNaN(manaBoardIndex)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        const playerIds = await getAccountPlayers(viewerIdSession.accountId)
        const playerId = playerIds[0]

        if (isNaN(playerId)) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // get character data
        const characterData = getPlayerCharacterSync(playerId, characterId)
        if (characterData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character not owned."
        })

        // get character asset data
        const characterAssetData = getCharacterDataSync(characterId)
        if (characterAssetData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No character asset data found."
        })

        // make sure that the mana board index is valid
        if (!characterData.bondTokenList[manaBoardIndex - 1]) return reply.status(400).send({
            "error": "Bad Request",
            "message": `Character does not have mana board with index ${manaBoardIndex}.`
        })

        // ensure that the mana board can be opened
        // TODO: Add level check.  5*: Level 80, 4*: Level 70, 3*: Level 60.
        if (openManaBoardRequiredUncaps[characterAssetData.rarity] > characterData.overLimitStep) return reply.status(400).send({
            "error": "Bad Request",
            "message": `Character is not uncapped enough to unlock mana board.`
        })
        if (1 > characterData.bondTokenList[manaBoardIndex - 2]?.status) return reply.status(400).send({
            "error": "Bad Request",
            "message": `Must unlock all previous mana board nodes.`
        })

        updatePlayerCharacterSync(playerId, characterId, {
            manaBoardIndex: manaBoardIndex
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "character_list": [
                    {
                        "viewer_id": viewerId,
                        "character_id": characterId,
                        "mana_board_index": manaBoardIndex,
                        "create_time": clientSerializeDate(characterData.joinTime),
                        "update_time": clientSerializeDate(characterData.updateTime),
                        "join_time": clientSerializeDate(characterData.joinTime)
                    }
                ],
                "mail_arrived": false
            }
        }) 
    })

    fastify.post("/learn_mana_node", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as LearnManaNodeBody

        const viewerId = body.viewer_id
        const characterId = body.character_id
        const toUnlockNodeIds = body.mana_node_multiplied_id_list
        if (!viewerId || isNaN(viewerId) || !characterId || isNaN(characterId) || !toUnlockNodeIds) return reply.status(400).send({
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
        const characterData = getPlayerCharacterSync(playerId, characterId)
        if (characterData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character not owned."
        })

        // compute the combined cost of each node
        let manaCost = 0
        const itemsCosts: Record<string, number> = {}

        const userCharacterManaNodeListItem: Object[] = []

        // get mana node data from assets
        const currentManaNodeIndex = characterData.manaBoardIndex;
        const characterManaNodes = getCharacterManaNodesSync(characterId, currentManaNodeIndex)
        if (characterManaNodes === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": `Character does not have mana nodes of index '${currentManaNodeIndex}'.`
        })

        // get currently unlocked nodes
        const unlockedManaNodes = getPlayerCharacterManaNodesSync(playerId, characterId);
        const unlockedManaNodesRecord: Record<string, boolean> = {}
        let indexUnlockedNodesCount = 0 // the number of nodes that have been unlocked for the selected index
        for (const manaNodeId of unlockedManaNodes) {
            unlockedManaNodesRecord[manaNodeId] = true
            indexUnlockedNodesCount += characterManaNodes[manaNodeId] === undefined ? 0 : 1
        }
        
        for (const manaNodeId of toUnlockNodeIds) {
            if (unlockedManaNodesRecord[manaNodeId]) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Mana node '${manaNodeId}' already unlocked.`
            })

            const nodeData = characterManaNodes[manaNodeId];
            if (nodeData === undefined) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Mana node '${manaNodeId}' does not exist.`
            })

            if (nodeData !== null) {
                manaCost += nodeData.manaCost

                for (const [itemId, itemCost] of Object.entries(nodeData.items)) {
                    const existing = itemsCosts[itemId]
                    itemsCosts[itemId] = existing ? existing + itemCost : itemCost
                }

                userCharacterManaNodeListItem.push({
                    "mana_node_multiplied_id": manaNodeId
                })
            }
        }

        // validate that the player has enough materials to unlock these nodes
        // TODO: Allow the usage of paidMana
        const newMana = player.freeMana - manaCost
        if (0 > newMana) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough mana."
        })

        for (const [itemId, itemCost] of Object.entries(itemsCosts)) {
            const item = getPlayerItemSync(playerId, itemId)
            const newAmount = item === null ? -1 : item - itemCost
            if (0 > newAmount) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Not enough of item with id ${itemId}`
            })

            // replace the object value with the newAmount for deduction later
            itemsCosts[itemId] = newAmount
        }

        // deduct mana
        updatePlayerSync({
            id: playerId,
            freeMana: newMana
        })

        // deduct item amounts
        for (const [itemId, newAmount] of Object.entries(itemsCosts)) {
            updatePlayerItemSync(playerId, itemId, newAmount)
        }

        // increase evolution level
        let characterEvolutionLevel = characterData.evolutionLevel
        let evolutionData: Object = []
        if (characterEvolutionLevel === 0) {
            characterEvolutionLevel = 1
            updatePlayerCharacterSync(playerId, characterId, {
                evolutionLevel: characterEvolutionLevel
            })

            evolutionData = {
                "character_id": characterId,
                "level": 1,
                "img_level": 1
            }
        }

        // give bond reward, if available
        const amityScrollReceivable = characterData.bondTokenList[currentManaNodeIndex - 1]?.status === 0
        const bondTokenList: Object[] = []
        if (amityScrollReceivable && (indexUnlockedNodesCount + toUnlockNodeIds.length) === Object.keys(characterManaNodes).length) {
            updatePlayerCharacterBondTokenSync(playerId, characterId, {
                manaBoardIndex: currentManaNodeIndex,
                status: 1
            });

            for (const entry of characterData.bondTokenList) {
                const entryIndex = entry.manaBoardIndex
                bondTokenList.push({
                    "mana_board_index": entryIndex,
                    "status": entryIndex === currentManaNodeIndex ? 1 : entry.status
                })
            }
        }

        // insert new mana nodes
        insertPlayerCharacterManaNodesSync(playerId, characterId, toUnlockNodeIds)

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_info": {
                    "free_mana": newMana
                },
                "character_list": [
                    {
                        "evolution_level": characterEvolutionLevel,
                        "evolution_img_level": characterEvolutionLevel,
                        "character_id": characterId,
                        "create_time": clientSerializeDate(characterData.joinTime),
                        "update_time": clientSerializeDate(characterData.updateTime),
                        "join_time": clientSerializeDate(characterData.joinTime),
                        "bond_token_list": bondTokenList
                    }
                ],
                "evolution": evolutionData,
                "item_list": itemsCosts,
                "user_character_mana_node_list": {
                    [String(characterId)]: userCharacterManaNodeListItem
                },
                "mail_arrived": false
            }
        }) 
    })

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

        // calculate new over limit
        const overLimitCount = body.over_limit_count
        const newOverLimit = playerCharacterData.overLimitStep + overLimitCount
        const characterRarity = characterAssetData.rarity
        if (newOverLimit > characterMaxOverLimits[characterRarity]) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Character cannot be uncapped further."
        })

        let stack = playerCharacterData.stack
        const item_list: Record<number, number> = {}

        if (body.use_stack) {
            // stack uncapping
            
            // ensure that the character has enough stack
            stack = stack - overLimitCount
            if (0 > stack) return reply.status(400).send({
                "error": "Bad Request",
                "message": "Character does not have enough duplicates to uncap."
            })

            // update the character
            updatePlayerCharacterSync(playerId, characterId, {
                overLimitStep: newOverLimit,
                stack: stack
            })
        } else {
            // item uncapping
            const itemId = body.item_id

            // ensure that the item trying to be used is valid
            // 5* characters can only be uncapped by item 10003 (awaking_crystal_5)
            // 4* characters and below can only be uncapped by items 10002 (awaking_crystal_4) and 10001 (awaking_crystal_3)
            if ( (characterRarity === 5 && itemId !== 10003) 
                || ( 4 >= characterRarity && (itemId !== 10002 && itemId !== 10001)) 
            ) return reply.status(400).send({
                "error": "Bad Request",
                "message": "Attempted to use invalid item."
            })

            const itemData = getPlayerItemSync(playerId, itemId)
            if (itemData === null) return reply.status(400).send({
                "error": "Bad Request",
                "message": "Attempted to use unowned item."
            })

            // make sure that the player has enough of the item
            const newAmount = itemData - overLimitCount
            if (0 > newAmount) return reply.status(400).send({
                "error": "Bad Request",
                "message": "Not enough of item to uncap."
            })

            // update the item count
            updatePlayerItemSync(playerId, itemId, newAmount)
            item_list[itemId] = newAmount // add to items table

            // update the character
            updatePlayerCharacterSync(playerId, characterId, {
                overLimitStep: newOverLimit
            })
        }

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
                        "stack": stack,
                        "create_time": clientSerializeDate(playerCharacterData.joinTime),
                        "update_time": clientSerializeDate(new Date()),
                        "join_time": clientSerializeDate(playerCharacterData.joinTime)
                    }
                ],
                "item_list": item_list,
                "mail_arrived": false
            }
        })
    })
}

export default routes;