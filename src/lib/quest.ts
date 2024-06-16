import { Player } from "../data/types";
import { clientSerializeDate } from "../data/utils";
import { getPlayerCharacterSync, getPlayerSync, updatePlayerSync } from "../data/wdfpData";
import { rewardPlayerCharacterSync } from "./character";
import { CharacterClearReward, ClearReward, ClearRewardType, CurrencyClearReward, RewardPlayerClearRewardResult } from "./types";

export function rewardPlayerClearRewardSync(
    playerId: number,
    clearReward: ClearReward,
    playerData?: Player
): RewardPlayerClearRewardResult {

    // get player data
    const player = playerData === undefined ? getPlayerSync(playerId) : playerData

    let mana = 0
    let vmoney = 0
    const joinedCharacterIdList: number[] = []
    const characterList: Object[] = []

    if (player) {
        switch (clearReward.type) {
            case ClearRewardType.EQUIPMENT:
                break;
            case ClearRewardType.CHARACTER:
                const characterId = (clearReward as CharacterClearReward).id
                rewardPlayerCharacterSync(playerId, characterId)
                joinedCharacterIdList.push(characterId)
                const character = getPlayerCharacterSync(playerId, characterId)
                if (character) {
                    characterList.push({
                        "viewer_id": 0,
                        "character_id": characterId,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
                        "bond_token_list": character.bondTokenList.map(bondToken => {
                            return {
                                "mana_board_index": bondToken.manaBoardIndex,
                                "status": bondToken.status
                            }
                        }),
                        "create_time": clientSerializeDate(character.joinTime),
                        "update_time": clientSerializeDate(character.updateTime),
                        "join_time": clientSerializeDate(character.joinTime),
                    })
                }
                break;
            case ClearRewardType.BEADS:
                vmoney = (clearReward as CurrencyClearReward).count
                updatePlayerSync({
                    id: playerId,
                    freeVmoney: player.freeVmoney + vmoney
                })
                break;
            case ClearRewardType.MANA:
                mana = (clearReward as CurrencyClearReward).count
                updatePlayerSync({
                    id: playerId,
                    freeMana: player.freeMana + mana
                })
                break;
        }
    }

    return {
        user_info: {
            free_mana: mana,
            free_vmoney: vmoney
        },
        character_list: characterList,
        joined_character_id_list: joinedCharacterIdList
    }
}