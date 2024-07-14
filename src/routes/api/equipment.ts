// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerEquipmentSync, getPlayerItemSync, getPlayerSync, getSession, givePlayerItemSync, playerOwnsEquipmentSync, updatePlayerEquipmentSync, updatePlayerItemSync, updatePlayerPartyGroupSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface SetProtectionBody {
    protection: boolean
    equipment_ids: number[]
    viewer_id: number
    api_count: number
}

interface UpgradeBody {
    use_stack: boolean,
    upgrade_count: number,
    item_id?: number,
    viewer_id: number,
    api_count: number,
    equipment_id: number
}

const validUpgradeItems: Record<number, boolean> = {
    [12002]: true
}

const wrightpieceItemId = 100000

// wrightpiece cost for each rank of weapon
const equipmentUpgradeCost = [
    5,
    10,
    15,
    20,
    25
]

// wrightpiece reward for selling each rank of weapon
const weaponSellReward = [
    0,
    0,
    1,
    5,
    15
]

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/upgrade", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UpgradeBody

        const viewerId = body.viewer_id
        const upgradeCount = Math.max(1, body.upgrade_count ?? 1)
        const useStack = body.use_stack
        const itemId = body.item_id
        const equipmentId = body.equipment_id
        if (isNaN(viewerId) || isNaN(equipmentId) || useStack === undefined) return reply.status(400).send({
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

        // get equipment
        const equipment = getPlayerEquipmentSync(playerId, equipmentId)
        if (equipment === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Player does not own equipment."
        })

        // validate that we won't overflow the equipment's level.
        const newLevel = equipment.level + upgradeCount
        if (newLevel > 5) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Cannot upgrade weapon more than 4 times."
        })

        // check if the equipment can be upgraded
        const newStack = useStack ? equipment.stack - upgradeCount : equipment.stack
        if (0 > newStack) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough stack."
        })

        const equipmentRarity = Math.floor(equipmentId / 1000000) - 1
        const wrightPieces = getPlayerItemSync(playerId, wrightpieceItemId) ?? 0
        const upgradeCost = equipmentUpgradeCost[equipmentRarity] ?? 0
        const newWrightPieces = wrightPieces - (upgradeCost * upgradeCount)
        if (0 > newWrightPieces) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough of wrightpieces."
        })

        const itemCount = itemId ? getPlayerItemSync(playerId, itemId) ?? 0 : 0
        const newItemCount = !useStack ? itemCount - upgradeCount : itemCount
        if (0 > newItemCount) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Not enough of item."
        })

        const returnItemList: Record<string, number> = {}

        // deduct item
        if (!useStack && itemId !== undefined) {
            returnItemList[itemId] = newItemCount
            updatePlayerItemSync(playerId, itemId, newItemCount)
        }

        // deduct wrightpiece
        returnItemList[wrightpieceItemId] = newWrightPieces
        updatePlayerItemSync(playerId, wrightpieceItemId, newWrightPieces)

        // upgrade weapon
        updatePlayerEquipmentSync(playerId, equipmentId, {
            "stack": newStack,
            "level": newLevel
        })

        // give ability cores
        returnItemList[equipmentId] = givePlayerItemSync(playerId, equipmentId, upgradeCount)

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "equipment_list": [
                    {
                        "null": 1,
                        "viewer_id": viewerId,
                        "equipment_id": equipmentId,
                        "protection": equipment.protection,
                        "level": newLevel,
                        "enhancement_level": equipment.enhancementLevel,
                        "stack": newStack
                    }
                ],
                "item_list": returnItemList,
                "mail_arrived": false
            }
        })
    })

    fastify.post("/set_protection", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SetProtectionBody

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

        // update protection
        const newProtection = body.protection
        for (const equipmentId of body.equipment_ids) {
            if (playerOwnsEquipmentSync(playerId, equipmentId)) {
                updatePlayerEquipmentSync(playerId, equipmentId, {
                    protection: newProtection
                })
            }
        }
        
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                
            }
        })
    })
}

export default routes;