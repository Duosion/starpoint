// Handles mail.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getPlayerPartyGroupListSync, getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { clientSerializeDate, serializePartyGroupList } from "../../data/utils";
import { PlayerPartyOptions } from "../../data/types";
import { getQuestFromCategorySync } from "../../lib/assets";
import { BattleQuest, QuestCategory } from "../../lib/types";
import { insertActiveQuest } from "./singleBattleQuest";

interface SummaryBody {
    event_id: number,
    viewer_id: number
}

interface PartyBody {
    viewer_id: number
}

interface SelectFolderBody {
    folder_id: number,
    event_id: number,
    viewer_id: number
}

interface BattleStartBody {
    is_auto_start_mode: boolean,
    party_id: number,
    play_id: string,
    quest_id: number,
    viewer_id: number
}

interface RushParty {
    ability_soul_ids: (number | null)[],
    character_ids: (number | null)[],
    equipment_ids: (number | null)[],
    options: {
        allow_other_players_to_heal_me: boolean
    },
    party_edited: boolean,
    party_id: number,
    party_name: string,
    unison_character_ids: (number | null)[]
}

interface RushPartyGroup {
    party_group_color_id: number,
    party_group_id: number,
    party_list: RushParty[]
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/summary", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SummaryBody

        const viewerId = body.viewer_id
        const eventId = body.event_id
        if (isNaN(viewerId) || isNaN(eventId)) return reply.status(400).send({
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
            "message": "No player bound to account."
        })

        /*{
            "active_rush_battle_folder_id": 1,
            "aggregated_time": "2023-05-24T12:00:00Z",
            "cleared_folder_id_list": [1, 2, 3],
            "endless_battle_max_round": 10,
            "endless_battle_my_ranking": {
                "best_round": 8,
                "elapsed_time_ms": 300000,
                "name": "Player1",
                "party_member_list": [
                    {
                        "character_id": 101,
                        "evolution_img_level": 2
                    },
                    {
                        "character_id": 102,
                        "evolution_img_level": 3
                    }
                ],
                "rank_number": 5,
                "user_rank": 50
            },
            "endless_battle_next_round": 11,
            "endless_battle_played_max_round": 9,
            "endless_battle_played_party_list": {
                "1": {
                    "ability_soul_id_1": 201,
                    "ability_soul_id_2": 202,
                    "ability_soul_id_3": 203,
                    "character_id_1": 301,
                    "character_id_2": 302,
                    "character_id_3": 303,
                    "equipment_id_1": 401,
                    "equipment_id_2": 402,
                    "equipment_id_3": 403,
                    "evolution_img_level_1": 2,
                    "evolution_img_level_2": 3,
                    "evolution_img_level_3": 1,
                    "unison_character_id_1": 501,
                    "unison_character_id_2": 502,
                    "unison_character_id_3": 503,
                    "unison_evolution_img_level_1": 1,
                    "unison_evolution_img_level_2": 2,
                    "unison_evolution_img_level_3": 3
                }
            },
            "rush_battle_played_party_list": {
                "1": {
                    "ability_soul_id_1": 601,
                    "ability_soul_id_2": 602,
                    "ability_soul_id_3": 603,
                    "character_id_1": 701,
                    "character_id_2": 702,
                    "character_id_3": 703,
                    "equipment_id_1": 801,
                    "equipment_id_2": 802,
                    "equipment_id_3": 803,
                    "evolution_img_level_1": 2,
                    "evolution_img_level_2": 3,
                    "evolution_img_level_3": 1,
                    "unison_character_id_1": 901,
                    "unison_character_id_2": 902,
                    "unison_character_id_3": 903,
                    "unison_evolution_img_level_1": 1,
                    "unison_evolution_img_level_2": 2,
                    "unison_evolution_img_level_3": 3
                }
            }
        }*/

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "endless_battle_next_round": 1
            }
        })
    })

    fastify.post("/select_folder", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SelectFolderBody

        const viewerId = body.viewer_id
        const eventId = body.event_id
        const folderId = body.folder_id
        if (isNaN(viewerId) || isNaN(eventId) || isNaN(folderId)) return reply.status(400).send({
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
            "message": "No player bound to account."
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "folder_id": folderId,
                "event_id": eventId
            }
        })
    })

    fastify.post("/aggregated_time", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SummaryBody

        const viewerId = body.viewer_id
        const eventId = body.event_id
        if (isNaN(viewerId) || isNaN(eventId)) return reply.status(400).send({
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
            "message": "No player bound to account."
        })

        /*{
            "aggregated_time": clientSerializeDate(new Date())
        }*/

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": []
        })
    })

    fastify.post("/party", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as PartyBody

        const viewerId = body.viewer_id
        if (isNaN(viewerId)) return reply.status(400).send({
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
            "message": "No player bound to account."
        })

        // get parties
        const playerPartyGroups = getPlayerPartyGroupListSync(playerId)

        // convert to proper format
        const userPartyGroupList: RushPartyGroup[] = []

        for (const [idString, group] of Object.entries(playerPartyGroups)) {
            const partyList: RushParty[] = []

            // convert parties
            for (const [partyIdString, party] of Object.entries(group.list)) {
                partyList.push({
                    ability_soul_ids: party.abilitySoulIds,
                    character_ids: party.characterIds,
                    equipment_ids: party.equipmentIds,
                    unison_character_ids: party.unisonCharacterIds,
                    options: {
                        allow_other_players_to_heal_me: party.options.allowOtherPlayersToHealMe
                    },
                    party_edited: party.edited,
                    party_id: Number(partyIdString),
                    party_name: party.name
                })
            }

            userPartyGroupList.push({
                "party_group_color_id": group.colorId,
                "party_group_id": Number(idString),
                "party_list": partyList
            })
        }

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "user_party_group_list": userPartyGroupList
            }
        })
    })

    fastify.post("/battle/start", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as BattleStartBody

        const viewerId = body.viewer_id
        const isAutoStartMode = body.is_auto_start_mode
        const partyId = body.party_id
        const questId = body.quest_id
        if (isNaN(viewerId) || isNaN(partyId) || isNaN(questId) || isAutoStartMode === undefined) return reply.status(400).send({
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
            "message": "No player bound to account."
        })

        // get quest
        const questData = getQuestFromCategorySync(QuestCategory.RUSH_EVENT, questId) as BattleQuest | null
        if (questData === null || !('rankPointReward' in questData)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Quest doesn't exist."
        })


        // insert active quest for '/single_battle_quest/finish' endpoint
        insertActiveQuest(playerId, {
            questId: questId,
            category: QuestCategory.RUSH_EVENT,
            useBoostPoint: false,
            useBossBoostPoint: false,
            isAutoStartMode: isAutoStartMode
        })

        const headers = generateDataHeaders({
            viewer_id: viewerId
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": headers,
            "data": {
                "user_info": {
                    "last_main_quest_id": body.quest_id
                },
                "is_multi": "single",
                "start_time": headers['servertime'],
                "quest_name": ""
            }
        })
    })
}

export default routes;