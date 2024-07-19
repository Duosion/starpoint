// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { deserializeClientDate } from "../../data/utils";
import { getAccountPlayers, getPlayerItemSync, getPlayerSync, getSession, updatePlayerItemSync, updatePlayerSync } from "../../data/wdfpData";
import { getBossCoinShopItemsSync, getEventShopItemsSync, getGenericShopItemsSync, getShopItemSync } from "../../lib/assets";
import { CharacterReward, CharacterShopItemReward, CurrencyReward, CurrencyShopItemReward, EquipmentItemReward, EquipmentItemShopItemReward, Reward, RewardType, ShopItemRewardType, ShopItems, ShopItemUserCostType, ShopType } from "../../lib/types";
import { generateDataHeaders, getServerTime } from "../../utils";
import { givePlayerRewardsSync } from "../../lib/quest";

interface GetSalesListBody {
    equipment_enhancement_shop_category_ids: number[],
    boss_coin_shop_category_ids: number[],
    browse_treasure_flag: boolean,
    shop_types: ShopType[],
    event_list: {
        event_type: number,
        event_ids: number[]
    }[],
    viewer_id: number
}

interface BuyBody {
    shop_type: number,
    api_count: number,
    shop_item_id: number,
    number: number,
    viewer_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/buy", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as BuyBody

        const viewerId = body.viewer_id
        const shopType = body.shop_type
        const rawPurchaseAmount = body.number
        const shopItemId = body.shop_item_id
        if (isNaN(viewerId) || isNaN(shopType) || isNaN(rawPurchaseAmount) || isNaN(shopItemId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const purchaseAmount = Math.max(1, rawPurchaseAmount)

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        // get player
        const playerIds = await getAccountPlayers(viewerIdSession.accountId)
        const playerId = playerIds[0]
        const player = isNaN(playerId) ? null : getPlayerSync(playerId)

        if (player === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // get the shop item's data
        const shopItemData = getShopItemSync(shopType, shopItemId)
        if (shopItemData === null) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Shop item with specified id does not exist."
        })

        // keep track of various stats
        const itemList: Record<string, number> = {}
        let freeVmoney = player.freeVmoney
        let freeMana = player.freeMana
        let bondTokens = player.bondToken

        // verify user costs
        const userCost = shopItemData.userCost
        if (userCost !== undefined) {
            switch (userCost.type) {
                case ShopItemUserCostType.MANA:
                    freeMana -= (userCost.amount * purchaseAmount)
                    break;
                case ShopItemUserCostType.BEADS:
                    freeVmoney -= (userCost.amount * purchaseAmount)
                    break;
                case ShopItemUserCostType.AMITY_SCROLL:
                    bondTokens -= (userCost.amount * purchaseAmount)
            }

            if (0 > freeVmoney) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Not enough beads to purchase shop item.`
            })
            if (0 > freeMana) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Not enough mana to purchase shop item.`
            })
            if (0 > bondTokens) return reply.status(400).send({
                "error": "Bad Request",
                "message": `Not enough amity scrolls to purchase shop item.`
            })
        }

        // verify cost items
        {
            for (const cost of shopItemData.costs) {
                const itemId = cost.id
                const itemAmount = getPlayerItemSync(playerId, itemId) ?? 0
                const newItemAmount = itemAmount - (cost.amount * purchaseAmount)
                if (0 > newItemAmount) return reply.status(400).send({
                    "error": "Bad Request",
                    "message": `Not enough of item with id ${itemId} to purchase shop item.`
                })

                itemList[itemId] = newItemAmount
            }

            // deduct cost item
            for (const [itemId, newAmount] of Object.entries(itemList)) {
                updatePlayerItemSync(playerId, itemId, newAmount)
            }
        }

        // update player
        updatePlayerSync({
            id: playerId,
            freeMana: freeMana,
            freeVmoney: freeVmoney,
            bondToken: bondTokens
        })

        // build rewards array
        const rewards: Reward[] = []
        for (const reward of shopItemData.rewards) {
            switch (reward.type) {
                case ShopItemRewardType.ITEM: {
                    const shopReward = reward as EquipmentItemShopItemReward
                    rewards.push({
                        name: "",
                        type: RewardType.ITEM,
                        id: shopReward.id,
                        count: shopReward.count * purchaseAmount
                    } as EquipmentItemReward)
                    break;
                }
                case ShopItemRewardType.EXP: {
                    const shopReward = reward as CurrencyShopItemReward
                    rewards.push({
                        name: "",
                        type: RewardType.EXP,
                        count: shopReward.count * purchaseAmount
                    } as CurrencyReward)
                    break;
                }
                case ShopItemRewardType.MANA:{
                    const shopReward = reward as CurrencyShopItemReward
                    rewards.push({
                        name: "",
                        type: RewardType.MANA,
                        count: shopReward.count * purchaseAmount
                    } as CurrencyReward)
                    break;
                }
                case ShopItemRewardType.CHARACTER: {
                    const shopReward = reward as CharacterShopItemReward
                    for (let i = 0; i < purchaseAmount; i++) {
                        rewards.push({
                            name: "",
                            type: RewardType.CHARACTER,
                            id: shopReward.id
                        } as CharacterReward)
                    }
                    break;
                }
                case ShopItemRewardType.EQUIPMENT: {
                    const shopReward = reward as EquipmentItemShopItemReward
                    rewards.push({
                        name: "",
                        type: RewardType.EQUIPMENT,
                        id: shopReward.id,
                        count: shopReward.count * purchaseAmount
                    } as EquipmentItemReward)
                    break;
                }

            }
        }
        // give rewards
        const rewardResult = givePlayerRewardsSync(playerId, rewards)

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_info": {
                    "free_mana": freeMana + (rewardResult?.user_info.free_mana ?? 0),
                    "exp_pool": player.expPool + (rewardResult?.user_info.exp_pool ?? 0),
                    "exp_pooled_time": getServerTime(player.expPooledTime),
                    "bond_token": bondTokens
                },
                "joined_character_id_list": rewardResult?.joined_character_id_list ?? [],
                "character_list": rewardResult?.character_list ?? [],
                "equipment_list": rewardResult?.equipment_list ?? [],
                "item_list": {
                    ...itemList,
                    ...(rewardResult?.items ?? {})
                },
                "mail_arrived": false
            }
        })
    })

    fastify.post("/get_sales_list", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as GetSalesListBody

        const viewerId = body.viewer_id
        const shopTypes = body.shop_types
        const bossCoinShopCategoryIds = body.boss_coin_shop_category_ids
        const eventList = body.event_list
        if (isNaN(viewerId) || shopTypes === undefined || bossCoinShopCategoryIds === undefined || eventList === undefined) return reply.status(400).send({
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

        let toParseShopItems: Record<number, ShopItems> = {}

        // shop types
        for (const type of shopTypes) {
            const items = getGenericShopItemsSync(type)
            const existing = toParseShopItems[type] ?? {}
            toParseShopItems[type] = items === null ? existing : { ...existing, ...items }
        }

        // event list
        for (const event of eventList) {
            const type = event.event_type
            for (const eventId of event.event_ids) {
                const items = getEventShopItemsSync(type, eventId)
                const existing = toParseShopItems[ShopType.EVENT_ITEM] ?? {}
                toParseShopItems[ShopType.EVENT_ITEM] = items === null ? existing : { ...existing, ...items }
            }
        }

        // boss coin shop category ids
        for (const category of bossCoinShopCategoryIds) {
            const items = getBossCoinShopItemsSync(category)
            const existing = toParseShopItems[ShopType.BOSS_COIN] ?? {}
            toParseShopItems[ShopType.BOSS_COIN] = items === null ? existing : { ...existing, ...items }
        }

        // parse shop items
        const salesList: Object[] = []

        const now = new Date().getTime()
        for (const [shopType, items] of Object.entries(toParseShopItems)) {
            for (const [itemId, item] of Object.entries(items)) {
                const from = deserializeClientDate(item.availableFrom)
                const until = item.availableUntil === null ? null : deserializeClientDate(item.availableUntil)

                if ((now >= from.getTime()) && (until === null || (until.getTime() > now))) {
                    salesList.push({
                        "shop_item_id": Number(itemId),
                        "stock_quantity": -1, // Change if you want a limited quantity of items. -1 = infinite.
                        "today_purchase_num": 0,
                        "this_month_purchase_num": 0,
                        "total_purchase_num": 0,
                        "group_info": {
                            "group_total_stock_quantity": -1,
                            "group_total_purchase_num": 0,
                            "multi_stage": false
                        },
                        "shop_type": Number(shopType)
                    })
                }
            }
        }

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "sales_list": salesList
            }
        })
    })
}

export default routes;