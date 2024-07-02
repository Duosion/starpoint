import { randomInt } from "crypto";
import { clientSerializeDate } from "../data/utils";
import { getPlayerCharacterSync, getPlayerSync, givePlayerItemSync, updatePlayerSync } from "../data/wdfpData";
import { getRareScoreRewardGroup } from "./assets";
import { givePlayerCharacterSync } from "./character";
import { givePlayerEquipmentSync } from "./equipment";
import { CharacterReward, CurrencyReward, DropScoreRewardId, EquipmentItemReward, GivePlayerScoreRewardsResult, ItemScoreReward, PlayerRewardResult, RareScoreRewardGroup, Reward, RewardType, ScoreReward, ScoreRewardType } from "./types";

/**
 * Grants a player score rewards.
 * 
 * @param playerId The ID of the player.
 * @param groupId The ID of the score reward group.
 * @param scoreRewards The score rewards inside of the group.
 * @returns A result detailing what was added/changed.
 */
export function givePlayerScoreRewardsSync(
    playerId: number,
    groupId: number,
    scoreRewards: ScoreReward[]
): GivePlayerScoreRewardsResult {

    const dropScoreRewardIds: DropScoreRewardId[] = []
    const dropRareRewardIds: DropScoreRewardId[] = []

    let mana = 0
    let vmoney = 0
    let joinedCharacterIdList: number[] = []
    let characterList: Object[] = []
    let equipmentList: Object[] = []
    let items: Record<string, number> = {}

    let rewardIndex = 0
    for (const scoreReward of scoreRewards) {
        rewardIndex += 1;
        switch (scoreReward.type) {
            case ScoreRewardType.ITEM: {
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
            case ScoreRewardType.RARE_POOL: {
                const reward = scoreReward as RareScoreRewardGroup
                const roll = randomInt(0, 100) / 100

                if (reward.rarity >= roll) {
                    // give reward from group
                    // TODO: implement RareScoreReward rarity using .rarity field instead of having an even chance between all items in pool
                    const rareGroupId = reward.id
                    const group = getRareScoreRewardGroup(rareGroupId)
                    if (group !== null) {
                        const random_index = 1 >= group.length ? 0 : randomInt(group.length)
                        const reward = group[random_index]
                        const result = givePlayerRewardSync(playerId, reward)

                        // merge arrays
                        mana += result.user_info.free_mana
                        vmoney += result.user_info.free_vmoney
                        joinedCharacterIdList = [...joinedCharacterIdList, ...result.joined_character_id_list]
                        characterList = [...characterList, ...result.character_list]
                        equipmentList = [...equipmentList, ...result.equipment_list]

                        // merge items
                        for (const [itemId, count] of Object.entries(result.items)) {
                            const existingCount = items[itemId]
                            if (existingCount === undefined) {
                                items[itemId] = count
                            } else {
                                items[itemId] = existingCount + count
                            }
                        }

                        // calculate number
                        let number = 0
                        switch (reward.type) {
                            case RewardType.ITEM:
                            case RewardType.EQUIPMENT:
                                number = (reward as Reward as EquipmentItemReward).count
                                break;
                            case RewardType.CHARACTER:
                                number = 1;
                                break;
                            case RewardType.BEADS:
                            case RewardType.MANA:
                                number = (reward as Reward as CurrencyReward).count
                                break;
                        }

                        // add reward id to table
                        dropRareRewardIds.push({
                            group_id: rareGroupId,
                            index: random_index + 1,
                            number: number
                        })
                    }
                }
                break;
            }
        }    
    } 

    return {
        drop_score_reward_ids: dropScoreRewardIds,
        drop_rare_reward_ids: dropRareRewardIds,
        user_info: {
            free_mana: mana,
            free_vmoney: vmoney
        },
        character_list: characterList,
        joined_character_id_list: joinedCharacterIdList,
        equipment_list: equipmentList,
        items: items
    }
}

export function givePlayerRewardSync(
    playerId: number,
    reward: Reward
): PlayerRewardResult {

    // get player data
    const player = getPlayerSync(playerId)

    let mana = 0
    let vmoney = 0
    const joinedCharacterIdList: number[] = []
    const characterList: Object[] = []
    const equipmentList: Object[] = []
    let items: Record<string, number> = {}

    if (player) {
        switch (reward.type) {
            case RewardType.ITEM: {
                const convertedReward = (reward as EquipmentItemReward)
                const itemId = convertedReward.id
                items[String(itemId)] = givePlayerItemSync(playerId, itemId, convertedReward.count);
                break;
            }
            case RewardType.EQUIPMENT: {
                const convertedReward = (reward as EquipmentItemReward)
                equipmentList.push(givePlayerEquipmentSync(playerId, convertedReward.id, convertedReward.count))
                break;
            }
            case RewardType.CHARACTER: {
                const characterId = (reward as CharacterReward).id
                const giveResult = givePlayerCharacterSync(playerId, characterId)
                const giveItemList = giveResult["item_list"]
                items = giveItemList === undefined ? {} : giveItemList as Record<string, number>

                const character = getPlayerCharacterSync(playerId, characterId)
                if (character) {
                    if (0 >= character.stack) {
                        joinedCharacterIdList.push(characterId)
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
                    } else {
                        characterList.push({
                            "character_id": characterId,
                            "stack": character.stack,
                            "create_time": clientSerializeDate(character.joinTime),
                            "update_time": clientSerializeDate(character.updateTime),
                            "join_time": clientSerializeDate(character.joinTime),
                        })
                    }
                    
                }
                break;
            }
            case RewardType.BEADS: {
                vmoney = (reward as CurrencyReward).count
                updatePlayerSync({
                    id: playerId,
                    freeVmoney: player.freeVmoney + vmoney
                })
                break;
            }
            case RewardType.MANA: {
                mana = (reward as CurrencyReward).count
                updatePlayerSync({
                    id: playerId,
                    freeMana: player.freeMana + mana
                })
                break;
            }
        }
    }

    return {
        user_info: {
            free_mana: mana,
            free_vmoney: vmoney
        },
        character_list: characterList,
        joined_character_id_list: joinedCharacterIdList,
        equipment_list: equipmentList,
        items: items
    }
}