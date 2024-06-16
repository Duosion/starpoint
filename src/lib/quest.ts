import { Player } from "../data/types";
import { clientSerializeDate } from "../data/utils";
import { getPlayerCharacterSync, getPlayerSync, givePlayerItemSync, updatePlayerSync } from "../data/wdfpData";
import { rewardPlayerCharacterSync } from "./character";
import { CharacterClearReward, ClearReward, ClearRewardType, CurrencyClearReward, DropScoreRewardId, ItemScoreReward, RewardPlayerClearRewardResult, RewardPlayerScoreRewardsResult, ScoreReward, ScoreRewardType } from "./types";

/**
 * Grants a player score rewards.
 * 
 * @param playerId The ID of the player.
 * @param groupId The ID of the score reward group.
 * @param scoreRewards The score rewards inside of the group.
 * @returns A result detailing what was added/changed.
 */
export function rewardPlayerScoreRewardsSync(
    playerId: number,
    groupId: number,
    scoreRewards: ScoreReward[]
): RewardPlayerScoreRewardsResult {

    const items: Record<string, number> = {}
    const dropScoreRewardIds: DropScoreRewardId[] = []

    let rewardIndex = 0
    for (const scoreReward of scoreRewards) {
        rewardIndex += 1;
        switch (scoreReward.type) {
            case ScoreRewardType.ITEM:
                const reward = scoreReward as ItemScoreReward
                const itemId = reward.id
                const rewardAmount = reward.count * 10
                items[String(itemId)] = givePlayerItemSync(playerId, itemId, rewardAmount);
                
                dropScoreRewardIds.push({
                    group_id: groupId,
                    index: rewardIndex,
                    number: rewardAmount
                })
                break;
        }    
    } 

    return {
        items: items,
        drop_score_reward_ids: dropScoreRewardIds
    }
}

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