import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerSync, getSession, playerOwnsCharacterSync, playerOwnsEquipmentSync, updatePlayerPartySync, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { PartyCategory } from "../../data/types";

interface PartyInfoListItem {
    party_edited: boolean
    party_category: number
    party_name: string
    party_id: number
    unison_character_ids: (number | null)[]
    equipment_ids: (number | null)[]
    character_ids: (number | null)[]
    ability_soul_ids: (number | null)[]
    options: {
        allow_other_players_to_heal_me: boolean
    }
}

interface EditBody {
    use_party_group_edit: boolean,
    main_party_id: number,
    viewer_id: number,
    ignore_ngword: boolean,
    api_count: number,
    party_info_list: PartyInfoListItem[]
}

/*
{
    "api_count": 2,
    "party_name": "Party G",
    "battle_party": {
        "equipments": [
            {
                "equipment_id": 5040028,
                "level": 5
            },
            {
                "equipment_id": 5090023,
                "level": 5
            },
            {
                "equipment_id": 5040029,
                "level": 5
            }
        ],
        "ability_soul_ids": [
            5010058,
            5040029,
            5040029
        ],
        "unison_characters": [
            {
                "id": 241045,
                "ex_boost": {
                    "status_id": 5,
                    "ability_id_list": [
                        15,
                        39
                    ]
                },
                "over_limit_step": 6,
                "mana_node_ids": [
                    482090201,
                    482090202,
                    482090203,
                    482090204,
                    482090205,
                    482090206,
                    482090207,
                    482090208,
                    482090209,
                    482090210,
                    482090211,
                    482090212,
                    482090213,
                    482090214,
                    482090215,
                    482090216,
                    482090217,
                    482090218,
                    482090219,
                    482090220,
                    482090221,
                    482090222,
                    482090223,
                    482090401,
                    482090402,
                    482090403,
                    482090404,
                    482090405,
                    482090406,
                    482090407,
                    482090408,
                    482090409,
                    482090410,
                    482090411,
                    482090412,
                    482090413,
                    482090414,
                    482090415,
                    482090416,
                    482090417,
                    482090418
                ],
                "illustration_settings": null,
                "evolution_level": 1,
                "exp": 342410
            },
            {
                "id": 141063,
                "ex_boost": {
                    "status_id": 3,
                    "ability_id_list": [
                        7,
                        35
                    ]
                },
                "over_limit_step": 4,
                "mana_node_ids": [
                    282126201,
                    282126202,
                    282126203,
                    282126204,
                    282126205,
                    282126206,
                    282126207,
                    282126208,
                    282126209,
                    282126210,
                    282126211,
                    282126212,
                    282126213,
                    282126214,
                    282126215,
                    282126216,
                    282126217,
                    282126218,
                    282126219,
                    282126220,
                    282126221,
                    282126222,
                    282126223,
                    282126401,
                    282126402,
                    282126403,
                    282126404,
                    282126405,
                    282126406,
                    282126407,
                    282126408,
                    282126409,
                    282126410,
                    282126411,
                    282126412,
                    282126413,
                    282126414,
                    282126415,
                    282126416,
                    282126417,
                    282126418
                ],
                "illustration_settings": null,
                "evolution_level": 1,
                "exp": 379988
            },
            {
                "id": 341009,
                "ex_boost": {
                    "status_id": 3,
                    "ability_id_list": [
                        19,
                        52
                    ]
                },
                "over_limit_step": 8,
                "mana_node_ids": [
                    682018201,
                    682018202,
                    682018203,
                    682018204,
                    682018205,
                    682018206,
                    682018207,
                    682018208,
                    682018209,
                    682018210,
                    682018211,
                    682018212,
                    682018213,
                    682018214,
                    682018215,
                    682018216,
                    682018217,
                    682018218,
                    682018219,
                    682018220,
                    682018221,
                    682018222,
                    682018223,
                    682018401
                ],
                "illustration_settings": null,
                "evolution_level": 1,
                "exp": 308043
            }
        ],
        "characters": [
            {
                "id": 241069,
                "ex_boost": {
                    "status_id": 3,
                    "ability_id_list": [
                        9,
                        38
                    ]
                },
                "over_limit_step": 6,
                "mana_node_ids": [
                    482138201,
                    482138202,
                    482138203,
                    482138204,
                    482138205,
                    482138206,
                    482138207,
                    482138208,
                    482138209,
                    482138210,
                    482138211,
                    482138212,
                    482138213,
                    482138214,
                    482138215,
                    482138216,
                    482138217,
                    482138218,
                    482138219,
                    482138220,
                    482138221,
                    482138222,
                    482138223,
                    482138401,
                    482138402,
                    482138403,
                    482138404,
                    482138405,
                    482138406,
                    482138407,
                    482138408,
                    482138409,
                    482138410,
                    482138411,
                    482138412,
                    482138413,
                    482138414,
                    482138415,
                    482138416,
                    482138417,
                    482138418
                ],
                "illustration_settings": null,
                "evolution_level": 1,
                "exp": 342410
            },
            {
                "id": 141045,
                "ex_boost": {
                    "status_id": 3,
                    "ability_id_list": [
                        8,
                        41
                    ]
                },
                "over_limit_step": 4,
                "mana_node_ids": [
                    282090201,
                    282090202,
                    282090203,
                    282090204,
                    282090205,
                    282090206,
                    282090207,
                    282090208,
                    282090209,
                    282090210,
                    282090211,
                    282090212,
                    282090213,
                    282090214,
                    282090215,
                    282090216,
                    282090217,
                    282090218,
                    282090219,
                    282090220,
                    282090221,
                    282090222,
                    282090223,
                    282090401,
                    282090402,
                    282090403,
                    282090404,
                    282090405,
                    282090406,
                    282090407,
                    282090408,
                    282090409,
                    282090410,
                    282090411,
                    282090412,
                    282090413,
                    282090414,
                    282090415,
                    282090416,
                    282090417,
                    282090418
                ],
                "illustration_settings": null,
                "evolution_level": 1,
                "exp": 379988
            },
            {
                "id": 141141,
                "ex_boost": null,
                "over_limit_step": 4,
                "mana_node_ids": [
                    282282201,
                    282282202,
                    282282203,
                    282282204,
                    282282205,
                    282282206,
                    282282207,
                    282282208,
                    282282209,
                    282282210,
                    282282211,
                    282282212,
                    282282213,
                    282282214,
                    282282215,
                    282282216,
                    282282217,
                    282282218,
                    282282219,
                    282282220,
                    282282221,
                    282282222,
                    282282223
                ],
                "illustration_settings": null,
                "evolution_level": 1,
                "exp": 379988
            }
        ]
    },
    "viewer_id": 276818168
}
*/
interface PublishBody {
    party_name: string,
    battle_party: {

    },
    viewer_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/publish", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as PublishBody

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

        if (isNaN(playerId)) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "party_code": "https://www.howLongCanThisBe?=+-.comhttps://www.howLongCanThisBe?=+-.comhttps://www.howLongCanThisBe?=+-.com"
            }
        })

    })

    fastify.post("/edit", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as EditBody

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

        // update main party id if required
        if (player.partySlot !== body.main_party_id) {
            updatePlayerSync({
                id: playerId,
                partySlot: body.main_party_id
            })
        }

        // update each slot
        const characterOwnedMap: Record<number, boolean> = {}
        const equipmentOwnedMap: Record<number, boolean> = {}

        const mapOwnedCharacters = (characterId: number | null): number | null => {
            let isOwned = characterId === null ? false : characterOwnedMap[characterId]
            if (isOwned === undefined) {
                isOwned = playerOwnsCharacterSync(playerId, characterId as number)
                characterOwnedMap[characterId as number] = isOwned
            }
            
            return isOwned ? characterId : null
        }

        const mapOwnedEquipment = (equipmentId: number | null): number | null => {
            let isOwned = equipmentId === null ? false : equipmentOwnedMap[equipmentId]
            if (isOwned === undefined) {
                isOwned = playerOwnsEquipmentSync(playerId, equipmentId as number)
                equipmentOwnedMap[equipmentId as number] = isOwned
            }
            
            return isOwned ? equipmentId : null
        }

        for (const updateInfo of body.party_info_list) {
            updatePlayerPartySync(
                playerId,
                updateInfo.party_id,
                {
                    name: updateInfo.party_name,
                    unisonCharacterIds: updateInfo.unison_character_ids.map(mapOwnedCharacters),
                    characterIds: updateInfo.character_ids.map(mapOwnedCharacters),
                    equipmentIds: updateInfo.equipment_ids.map(mapOwnedEquipment), // TODO: Implement stack checking, to see if more equipment is being equipped than is owned.
                    abilitySoulIds: updateInfo.ability_soul_ids,
                    options: { allowOtherPlayersToHealMe: updateInfo.options.allow_other_players_to_heal_me },
                    edited: updateInfo.party_edited,
                    category: updateInfo.party_category
                }
            )
        }

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "mail_arrived": false
            }
        })
    })
}

export default routes;