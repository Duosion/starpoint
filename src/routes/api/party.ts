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

const routes = async (fastify: FastifyInstance) => {
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