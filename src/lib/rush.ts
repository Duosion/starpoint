import { RushEventBattleType } from "../data/types";
import { getPlayerRushEventPlayedPartiesSync, serializePlayerRushEventPlayedParty } from "../data/wdfpData";
import { SerializedPlayerRushEventPlayedParty, SerializedPlayerRushEventPlayedParties } from "./types";

/**
 * Gets all of a player's played parties, serializes them into client formant, and organizes them by their RushEventBattleType.
 * 
 * @param playerId The ID of the player.
 * @param eventId The ID of the rush event.
 * @returns The serialized parties organized by type.
 */
export function getSerializedPlayerRushEventPlayedPartiesSync(
    playerId: number,
    eventId: number
): SerializedPlayerRushEventPlayedParties {
    // get played parties
    const playedParties = getPlayerRushEventPlayedPartiesSync(playerId, eventId)

    // convert played parties to the expected client format
    const rushBattlePlayedPartyList: SerializedPlayerRushEventPlayedParty = {}
    const endlessBattlePlayedPartyList: SerializedPlayerRushEventPlayedParty = {}

    for (const party of playedParties) {
        const record = party.battleType === RushEventBattleType.FOLDER ? rushBattlePlayedPartyList : endlessBattlePlayedPartyList;
        record[party.round] = serializePlayerRushEventPlayedParty(party)
    }
    
    // return parties
    return {
        folderParties: rushBattlePlayedPartyList,
        endlessParties: endlessBattlePlayedPartyList
    }
}