// Handles the insertion of mana into characters.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerCharacterSync, getPlayerSync, getSession, updatePlayerSync } from "../../data/wdfpData";
import { givePlayerCharactersExpSync } from "../../lib/character";
import { generateDataHeaders, getServerTime } from "../../utils";
import { ShopItem, ShopItems, ShopType } from "../../lib/types";
import { getBossCoinShopItems, getEventShopItems, getGenericShopItems } from "../../lib/assets";
import { deserializeClientDate } from "../../data/utils";

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

const routes = async (fastify: FastifyInstance) => {
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
            const items = getGenericShopItems(type)
            const existing = toParseShopItems[type] ?? {}
            toParseShopItems[type] = items === null ? existing : {...existing, ...items}
        }

        // event list
        for (const event of eventList) {
            const type = event.event_type
            for (const eventId of event.event_ids) {
                const items = getEventShopItems(type, eventId)
                const existing = toParseShopItems[ShopType.EVENT_ITEM] ?? {}
                toParseShopItems[ShopType.EVENT_ITEM] = items === null ? existing : {...existing, ...items}
            }
        }

        // boss coin shop category ids
        for (const category of bossCoinShopCategoryIds) {
            const items = getBossCoinShopItems(category)
            const existing = toParseShopItems[ShopType.BOSS_COIN] ?? {}
            toParseShopItems[ShopType.BOSS_COIN] = items === null ? existing : {...existing, ...items}
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