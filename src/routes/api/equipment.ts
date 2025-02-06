// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { deletePlayerEquipmentSync, getAccountPlayers, getPlayerEquipmentSync, getPlayerItemSync, getPlayerSync, getSession, givePlayerItemSync, playerOwnsEquipmentSync, updatePlayerEquipmentSync, updatePlayerItemSync, updatePlayerPartyGroupSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { clientSerializeEquipment } from "../../lib/equipment";
import { PlayerEquipment, UserEquipment } from "../../data/types";
import { ClientError, viewer_id_to_player_id } from "../../nya/utils";

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

interface SellEquipmentListItem {
    equipment_id: number
}

interface SellStackEquipmentListItem extends SellEquipmentListItem {
    number: number
}

interface SellBody {
    equipment_list: SellEquipmentListItem[],
    viewer_id: number,
    api_count: number
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
const equipmentSellReward = [
    0,
    0,
    1,
    5,
    15
]

const sell_equipment_stack = async (playerId: number, equipmentList: { equipmentId: number, count?: number }[]) => {
    let toAddWrightPieces = 0;
    const preProceedEquipmentList: {
        equipmentId: number,
        count: number,
        raw: PlayerEquipment,
    }[] = [];

    for (const equipment of equipmentList) {
        let { equipmentId, count } = equipment;
        const equipmentData = getPlayerEquipmentSync(playerId, equipmentId);
        if (equipmentData === null) throw new ClientError(`Player does not own equipment: ${equipmentId}.`);
        if (!count) {
            count = equipmentData.stack;
        } else if (equipmentData.stack < count)
            throw new ClientError(`Player does not own enough equipment: ${equipmentId}.`);
        if (count < 1)
            throw new ClientError(`Invalid count: ${count}.`);
        const equipmentRarity = Math.floor(equipmentId / 1000000) - 1;
        toAddWrightPieces += (equipmentSellReward[equipmentRarity] ?? 0) * count;
        preProceedEquipmentList.push({
            equipmentId,
            count,
            raw: equipmentData
        });
    }

    const returnItemList: Record<number, number> = {}
    const returnEquipmentList: Object[] = []

    for (const equipment of preProceedEquipmentList) {
        const { equipmentId, count, raw } = equipment;
        raw.stack -= count;
        updatePlayerEquipmentSync(playerId, equipmentId, { stack: raw.stack })
        returnEquipmentList.push(clientSerializeEquipment(equipmentId, raw))
        returnItemList[equipmentId] = givePlayerItemSync(playerId, equipmentId, count)
    }
    returnItemList[wrightpieceItemId] = givePlayerItemSync(playerId, wrightpieceItemId, toAddWrightPieces)

    return {
        "equipment_list": returnEquipmentList,
        "item_list": returnItemList,
    }
}

const upgrade_equipment = async (playerId: number, equipmentList: { equipmentId: number, count?: number, costStack?: boolean, costItem?: number }[]) => {
    let toCostWrightPieces = 0;
    const preProceedEquipmentList: {
        equipmentId: number,
        count: number,
        raw: PlayerEquipment,
        costStack: boolean,
    }[] = [];

    const preProceedEquipments = new Set<number>();
    const costItemNewCountList: Record<number, number> = {};

    const get_cached_item_count = (itemId: number) => {
        if (costItemNewCountList[itemId] === undefined) {
            costItemNewCountList[itemId] = getPlayerItemSync(playerId, itemId) ?? 0;
        }
        return costItemNewCountList[itemId];
    }

    const try_cost_item = (itemId: number, count: number) => {
        const currentCount = get_cached_item_count(itemId);
        if (currentCount < count) return false;
        costItemNewCountList[itemId] = currentCount - count;
        return true;
    }

    for (const equipment of equipmentList) {
        const { equipmentId, count: count_, costStack: costStack_, costItem } = equipment;
        if (preProceedEquipments.has(equipmentId)) throw new ClientError(`Duplicate equipmentId: ${equipmentId}.`);
        preProceedEquipments.add(equipmentId);
        const equipmentData = getPlayerEquipmentSync(playerId, equipmentId);
        if (equipmentData === null) throw new ClientError(`Player does not own equipment: ${equipmentId}.`);

        const costStack = costStack_ ?? false;

        if (costItem && costStack) throw new ClientError(`Cannot use both stack and item as cost: equipmentId: ${equipmentId}.`);

        let count: number;
        if (!count_) {
            count = 5 - equipmentData.level;
            if (costStack) {
                count = Math.min(count, equipmentData.stack);
            } else if (costItem) {
                const currentCount = get_cached_item_count(costItem);
                if (!currentCount)
                    throw new ClientError(`Player does not have enough item to upgrade: equipmentId: ${equipmentId} item: ${costItem}.`);
                count = Math.min(count, currentCount);
            }
        } else {
            count = count_;
            if (count < 1 || count + equipmentData.level > 5)
                throw new ClientError(`Invalid upgrade count: equipmentId: ${equipmentId}, count: ${count_}.`);
            if (costStack && count > equipmentData.stack)
                throw new ClientError(`Player does not own enough equipment: equipmentId: ${equipmentId}.`);
        }

        if (costItem && !try_cost_item(costItem, count))
            throw new ClientError(`Player does not own enough item to upgrade: equipmentId: ${equipmentId} item: ${costItem}.`);

        const equipmentRarity = Math.floor(equipmentId / 1000000) - 1;
        const upgradeCost = equipmentUpgradeCost[equipmentRarity] ?? 0;
        toCostWrightPieces += upgradeCost * count;

        preProceedEquipmentList.push({
            equipmentId,
            count,
            raw: equipmentData,
            costStack
        });
    }

    const currentWrightPieces = getPlayerItemSync(playerId, wrightpieceItemId) ?? 0;
    if (currentWrightPieces < toCostWrightPieces)
        throw new ClientError(`Player does not own enough wrightpieces, required: ${toCostWrightPieces}, owned: ${currentWrightPieces}.`);

    const returnItemList: Record<number, number> = {};
    const returnEquipmentList: Object[] = [];

    for (const equipment of preProceedEquipmentList) {
        const { equipmentId, count, raw, costStack } = equipment;
        raw.level += count;
        if (costStack)
            raw.stack -= count;
        updatePlayerEquipmentSync(playerId, equipmentId, {
            level: raw.level,
            stack: raw.stack
        });
        returnEquipmentList.push(clientSerializeEquipment(equipmentId, raw));
        returnItemList[equipmentId] = givePlayerItemSync(playerId, equipmentId, count);
    }
    for (const itemId_ in costItemNewCountList) {
        const itemId = parseInt(itemId_);
        const newCount = costItemNewCountList[itemId];
        updatePlayerItemSync(playerId, itemId, newCount);
        returnItemList[itemId] = newCount;
    }

    const newWrightPieces = currentWrightPieces - toCostWrightPieces;
    updatePlayerItemSync(playerId, wrightpieceItemId, newWrightPieces);
    returnItemList[wrightpieceItemId] = newWrightPieces;

    return {
        "equipment_list": returnEquipmentList,
        "item_list": returnItemList,
    }
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/sell_equipment", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SellBody

        const toSellEquipmentList = body.equipment_list
        const viewerId = body.viewer_id
        if (isNaN(viewerId) || toSellEquipmentList === undefined) return reply.status(400).send({
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

        // get wrightpieces
        let newWrightPieces = 0;
        const returnItemList: Record<number, number> = {}

        // sell stacks
        for (const toSell of toSellEquipmentList) {
            const equipmentId = toSell.equipment_id
            const equipmentRarity = Math.floor(equipmentId / 1000000) - 1

            // get the data for the equipment
            const playerEquipmentData = getPlayerEquipmentSync(playerId, equipmentId)
            if (playerEquipmentData === null) return reply.status(400).send({
                "error": "Bad Request",
                "message": "Player does not own equipment."
            })

            // add wright pieces
            const stack = playerEquipmentData.stack
            newWrightPieces += (equipmentSellReward[equipmentRarity] ?? 0) * stack

            // delete equipment
            deletePlayerEquipmentSync(playerId, equipmentId)

            // give ability soul
            returnItemList[equipmentId] = givePlayerItemSync(playerId, equipmentId, stack)
        }

        // give wrightpieces
        returnItemList[wrightpieceItemId] = givePlayerItemSync(playerId, wrightpieceItemId, newWrightPieces)

        // respond to client
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "item_list": returnItemList,
                "mail_arrived": false
            }
        })
    })

    fastify.post("/sell_stack", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SellBody;

        try {
            const result = await sell_equipment_stack(
                await viewer_id_to_player_id(body.viewer_id),
                body.equipment_list.map(el => ({
                    equipmentId: el.equipment_id,
                    count: (el as SellStackEquipmentListItem).number
                }))
            );

            reply.header("content-type", "application/x-msgpack")
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id: body.viewer_id
                }),
                "data": {
                    "equipment_list": result.equipment_list,
                    "item_list": result.item_list,
                    "mail_arrived": false
                }
            })
        } catch (e: any) {
            if (e instanceof ClientError) return reply.status(400).send({
                "error": "Bad Request",
                "message": e.message
            });
            throw e;
        }
    })

    fastify.post("/bulk_sell_stack", async (request: FastifyRequest, reply: FastifyReply) => {
        const { viewer_id, equipment_ids } = request.body as { viewer_id: number, equipment_ids: number[] };
        try {
            const playerId = await viewer_id_to_player_id(viewer_id);
            const result = await sell_equipment_stack(playerId, equipment_ids.map(equipmentId => ({ equipmentId })));

            reply.header("content-type", "application/x-msgpack")
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id
                }),
                "data": {
                    "equipment_list": result.equipment_list,
                    "item_list": result.item_list,
                    "mail_arrived": false
                }
            })
        } catch (e: any) {
            if (e instanceof ClientError) return reply.status(400).send({
                "error": "Bad Request",
                "message": e.message
            });
            throw e;
        }
    })

    fastify.post("/upgrade", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as UpgradeBody;

        try {
            const result = await upgrade_equipment(
                await viewer_id_to_player_id(body.viewer_id),
                [{
                    equipmentId: body.equipment_id,
                    count: body.upgrade_count,
                    costStack: body.use_stack,
                    costItem: body.item_id
                }]
            );

            reply.header("content-type", "application/x-msgpack")
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id: body.viewer_id
                }),
                "data": {
                    "equipment_list": result.equipment_list,
                    "item_list": result.item_list,
                    "mail_arrived": false
                }
            })
        } catch (e: any) {
            if (e instanceof ClientError) return reply.status(400).send({
                "error": "Bad Request",
                "message": e.message
            });
            throw e;
        }
    })

    fastify.post("/bulk_upgrade", async (request: FastifyRequest, reply: FastifyReply) => {
        const { viewer_id, equipment_ids } = request.body as { viewer_id: number, equipment_ids: number[] };
        try {
            const playerId = await viewer_id_to_player_id(viewer_id);
            const result = await upgrade_equipment(playerId, equipment_ids.map(equipmentId => ({ equipmentId, costStack:true })));

            reply.header("content-type", "application/x-msgpack")
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id
                }),
                "data": {
                    "equipment_list": result.equipment_list,
                    "item_list": result.item_list,
                    "mail_arrived": false
                }
            })
        } catch (e: any) {
            if (e instanceof ClientError) return reply.status(400).send({
                "error": "Bad Request",
                "message": e.message
            });
            throw e;
        }
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
            "data": {}
        })
    })
}

export default routes;