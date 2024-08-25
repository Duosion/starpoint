import adventEventQuests from "../../assets/advent_event_quest.json";
import bossBattleQuests from "../../assets/boss_battle_quest.json";
import boxGacha from "../../assets/box_gacha.json";
import boxReward from "../../assets/box_reward.json";
import characters from "../../assets/character.json";
import characterQuests from "../../assets/character_quest.json";
import clearRewards from "../../assets/clear_reward.json";
import dailyExpManaEventQuests from "../../assets/daily_exp_mana_event_quest.json";
import dailyWeekEventQuests from "../../assets/daily_week_event_quest.json";
import worldStoryEventBossBattleQuests from "../../assets/world_story_event_boss_battle_quest.json";
import worldStoryEventQuests from "../../assets/world_story_event_quest.json";
import carnivalEventQuests from "../../assets/carnival_event_quest.json";
import challengeDungeonEventQuests from "../../assets/challenge_dungeon_event_quest.json";
import expertSingleEventQuests from "../../assets/expert_single_event_quest.json";
import raidEventQuests from "../../assets/raid_event_quest.json";
import rankingEventSingleQuests from "../../assets/ranking_event_single_quest.json";
import rushEventQuests from "../../assets/rush_event_quest.json";
import scoreAttackEventQuests from "../../assets/score_attack_event_quest.json";
import soloTimeAttackEventQuests from "../../assets/solo_time_attack_event_quest.json";
import storyEventSingleQuests from "../../assets/story_event_single_quest.json";
import towerDungeonEventQuests from "../../assets/tower_dungeon_event_quest.json";
import exAbility from "../../assets/ex_ability.json";
import exBoost from "../../assets/ex_boost.json";
import exQuests from "../../assets/ex_quest.json";
import exStatus from "../../assets/ex_status.json";
import gachas from "../../assets/gacha.json";
import mainQuests from "../../assets/main_quest.json";
import manaNodes from "../../assets/mana_node.json";
import rareScoreRewards from "../../assets/rare_score_reward.json";
import scoreRewards from "../../assets/score_reward.json";
import gachaCampaigns from "../../assets/gacha_campaign.json";
import bossCoinShopItems from "../../assets/boss_coin_shop.json";
import bossCoinShopItemCategoryMap from "../../assets/boss_coin_shop_item_category_map.json";
import eventItemShopItems from "../../assets/event_item_shop.json";
import eventItemShopIdMap from "../../assets/event_item_shop_id_map.json";
import generalShopItems from "../../assets/general_shop.json";
import starGrainShopItems from "../../assets/star_grain_shop.json";
import treasureShopItems from "../../assets/treasure_shop.json";
import { AssetCharacter, BattleQuest, BossCoinShopItems, BoxGacha, ClearRewards, EventItemShopIdMapItem, EventShopItems, ExAbilities, ExBoostItem, ExBoostItems, ExStatus, Gacha, Gachas, ManaNode, ManaNodes, QuestCategory, RareScoreReward, RareScoreRewardGroups, RawAssetCharacters, RawBoxGachas, RawBoxRewards, RawQuests, Reward, ScoreReward, ScoreRewardGroups, ShopItem, ShopItems, ShopType, StoryQuest } from "./types";

/**
 * Gets a clear reward from its ID.
 * 
 * @param clearRewardId The ID of the clear reward.
 * @returns The clear reward that was found, or null.
 */
export function getClearRewardSync(
    clearRewardId: string | number
): Reward | null {
    const clearReward = (clearRewards as ClearRewards)[String(clearRewardId)]
    return clearReward ? clearReward as Reward : null
}

/**
 * Gets a rare score reward group from its ID.
 * 
 * @param groupId The ID of the rare score reward group.
 * @returns The score reward group that was found, or null.
 */
export function getRareScoreRewardGroup(
    groupId: string | number
): RareScoreReward[] | null {
    const group = (rareScoreRewards as RareScoreRewardGroups)[String(groupId)]
    return group ? group as RareScoreReward[] : null
}

/**
 * Gets a score reward group from its ID.
 * 
 * @param groupId The ID of the group.
 * @returns The score reward group that was found, or null.
 */
export function getScoreRewardGroup(
    groupId: string | number
): ScoreReward[] | null {
    const group = (scoreRewards as ScoreRewardGroups)[String(groupId)]
    return group ? group as ScoreReward[] : null
}

/**
 * Generic quest fetching function.
 * 
 * @param quests The list of quests to search.
 * @param questId The ID of the quest to get.
 * @returns The found BattleQuest, StoryQuest, or null
 */
function getQuestSync(
    quests: RawQuests,
    questId: string | number
): BattleQuest | StoryQuest | null {
    const quest = quests[String(questId)]

    // return null if the quest doesn't exist
    if (!quest) return null;

    // return either a story quest or a battle quest depending on the keys present
    return 'manaReward' in quest ? {
        name: quest.name,
        clearReward: quest.clearRewardId === undefined ? undefined : getClearRewardSync(quest.clearRewardId),
        sPlusReward: quest.sPlusRewardId === undefined ? undefined : getClearRewardSync(quest.sPlusRewardId),
        scoreRewardGroupId: quest.scoreRewardGroup,
        scoreRewardGroup: quest.scoreRewardGroup === undefined ? undefined : getScoreRewardGroup(quest.scoreRewardGroup),
        bRankTime: quest.bRankTime,
        aRankTime: quest.aRankTime,
        sRankTime: quest.sRankTime,
        sPlusRankTime: quest.sPlusRankTime,
        rankPointReward: quest.rankPointReward,
        characterExpReward: quest.characterExpReward,
        manaReward: quest.manaReward,
        poolExpReward: quest.poolExpReward,
        fixedParty: quest.fixedParty,
        rushEventId: quest.rushEventId
    } as BattleQuest : {
        name: quest.name,
        clearReward: quest.clearRewardId === undefined ? undefined : getClearRewardSync(quest.clearRewardId),
    } as StoryQuest
}

/**
 * Gets the data for a main quest from the database.
 * 
 * @param questId The ID of the quest.
 * @returns A BattleQuest, StoryQuest, or null
 */
export function getMainQuestSync(
    questId: string | number
): BattleQuest | StoryQuest | null {
    return getQuestSync((mainQuests as RawQuests), questId)
}

/**
 * Gets an EX quest.
 * 
 * @param questId The ID of the quest to get.
 * @returns The found BattleQuest or null
 */
export function getExQuestSync(
    questId: string | number
): BattleQuest | null {
    return getQuestSync((exQuests as RawQuests), questId) as BattleQuest | null
}

/**
 * Gets a boss battle quest.
 * 
 * @param questId The ID of the quest to get.
 * @returns The found BattleQuest or null
 */
export function getBossBattleQuestSync(
    questId: string | number
): BattleQuest | null {
    return getQuestSync((bossBattleQuests as RawQuests), questId) as BattleQuest | null
}

/**
 * Gets a character quest.
 * 
 * @param questId The ID of the quest to get.
 * @returns The found StoryQuest or null
 */
export function getCharacterQuestSync(
    questId: string | number
): StoryQuest | null {
    return getQuestSync((characterQuests as any as RawQuests), questId) as StoryQuest | null
}

/**
 * Gets a world story event quest.
 * 
 * @param questId The ID of the quest to get.
 * @returns The found StoryQuest or null
 */
export function getWorldStoryEventQuestSync(
    questId: string | number
): StoryQuest | null {
    return getQuestSync((worldStoryEventQuests as RawQuests), questId) as StoryQuest | null
}

/**
 * Gets a world story event boss battle quest.
 * 
 * @param questId The ID of the quest to get.
 * @returns The found StoryQuest or null
 */
export function getWorldStoryEventBossBattleQuestSync(
    questId: string | number
): StoryQuest | null {
    return getQuestSync((worldStoryEventBossBattleQuests as RawQuests), questId) as StoryQuest | null
}

/**
 * Gets an advent quest.
 * 
 * @param questId The ID of the quest to get.
 * @returns The found StoryQuest or null
 */
export function getAdventEventQuest(
    questId: string | number
): StoryQuest | null {
    return getQuestSync((adventEventQuests as RawQuests), questId) as StoryQuest | null
}

/**
 * Gets a quest from a specific quest category.
 * 
 * @param category The category of the quest.
 * @param questId The ID of the quest.
 * @returns The BattleQuest or StoryQuest that was found, or null if nothing was found.
 */
export function getQuestFromCategorySync(
    category: QuestCategory,
    questId: string | number
): BattleQuest | StoryQuest | null {
    switch (category) {
        case QuestCategory.MAIN:
            return getMainQuestSync(questId)
        case QuestCategory.EX:
            return getExQuestSync(questId)
        case QuestCategory.BOSS_BATTLE:
            return getBossBattleQuestSync(questId)
        case QuestCategory.CHARACTER:
            return getCharacterQuestSync(questId)
        case QuestCategory.WORLD_STORY_EVENT:
            return getWorldStoryEventQuestSync(questId)
        case QuestCategory.WORLD_STORY_EVENT_BOSS_BATTLE:
            return getWorldStoryEventBossBattleQuestSync(questId)
        case QuestCategory.ADVENT_EVENT_SINGLE:
        case QuestCategory.ADVENT_EVENT_MULTI:
            return getAdventEventQuest(questId)
        case QuestCategory.STORY_EVENT_SINGLE:
            return getQuestSync((storyEventSingleQuests as RawQuests), questId)
        case QuestCategory.RANKING_EVENT_SINGLE:
            return getQuestSync((rankingEventSingleQuests as RawQuests), questId)
        case QuestCategory.CHALLENGE_DUNGEON_EVENT:
            return getQuestSync((challengeDungeonEventQuests as RawQuests), questId)
        case QuestCategory.DAILY_EXP_MANA_EVENT:
            return getQuestSync((dailyExpManaEventQuests as RawQuests), questId)
        case QuestCategory.DAILY_WEEK_EVENT:
            return getQuestSync((dailyWeekEventQuests as RawQuests), questId)
        case QuestCategory.TOWER_DUNGEON_EVENT:
            return getQuestSync((towerDungeonEventQuests as RawQuests), questId)
        case QuestCategory.EXPERT_SINGLE_EVENT:
            return getQuestSync((expertSingleEventQuests as RawQuests), questId)
        case QuestCategory.CARNIVAL_EVENT:
            return getQuestSync((carnivalEventQuests as RawQuests), questId)
        case QuestCategory.RAID_EVENT:
            return getQuestSync((raidEventQuests as RawQuests), questId)
        case QuestCategory.RUSH_EVENT:
            return getQuestSync((rushEventQuests as RawQuests), questId)
        case QuestCategory.SOLO_TIME_ATTACK_EVENT:
            return getQuestSync((soloTimeAttackEventQuests as RawQuests), questId)
        case QuestCategory.SCORE_ATTACK_EVENT:
            return getQuestSync((scoreAttackEventQuests as RawQuests), questId)
        default:
            return null
    }
}

/**
 * Gets a character's asset data from their id.
 * 
 * @param characterId The ID of the character.
 * @returns The character's asset data, or null if it wasn't found.
 */
export function getCharacterDataSync(
    characterId: string | number
): AssetCharacter | null {
    const character = (characters as RawAssetCharacters)[String(characterId)]

    if (!character) return null;

    return character
}

/**
 * Gets all of a character's mana nodes of a certain level.
 * 
 * @param characterId The ID of the character.
 * @param level The mana node level to get the nodes of.
 * @returns A record containing ManaNode objects or null.
 */
export function getCharacterManaNodesSync(
    characterId: string | number,
    level: string | number,
): Record<string, ManaNode> | null{
    const characterManaNodes = (manaNodes as ManaNodes)[String(characterId)]
    if (!characterManaNodes) return null;

    return characterManaNodes[String(level)] || null
}

/**
 * Gets the data for a character mana node.
 * 
 * @param characterId The ID of the character.
 * @param level The mana node level to get the node from.
 * @param manaNodeId The ID of the mana node.
 * @returns A ManaNode object or null.
 */
export function getCharacterManaNodeSync(
    characterId: string | number,
    level: string | number,
    manaNodeId: string | number
): ManaNode | null {
    const nodes = getCharacterManaNodesSync(characterId, level);
    if (!nodes) return null;

    return nodes[String(manaNodeId)] || null
}

/**
 * Gets the ExAbilities record.
 * 
 * @returns 
 */
export function getExAbilityPoolsSync(): ExAbilities {
    return exAbility as ExAbilities;
}

/**
 * Gets an ex status pool.
 * 
 * @param tier The tier of the pool to get.
 * @returns A list of numbers with the StatusIDs corresponding to the requested pool.
 */
export function getExStatusPoolSync(
    tier: string | number
): number[] | null {
    const pool = (exStatus as ExStatus)[String(tier)]
    return pool === undefined ? null : pool
}

/**
 * Gets an ex boost item.
 * 
 * @param itemId The ID of the item.
 * @returns The ExBoostItem that was found, or null.
 */
export function getExBoostItemSync(
    itemId: string | number
): ExBoostItem | null {
    const item = (exBoost as ExBoostItems)[String(itemId)]

    return item === undefined ? null : item
}

/**
 * Gets the data for a box gacha from the assets folder.
 * 
 * @param id The ID of the box gacha.
 * @returns A BoxGacha object or null, if it didn't exist.
 */
export function getBoxGachaSync(
    id: string | number
): BoxGacha | null {

    const idString = String(id)
    // get redeem item data
    const redeemItemData = (boxGacha as RawBoxGachas)[idString]
    if (redeemItemData === undefined) return null;

    // get boxes
    const boxes = (boxReward as RawBoxRewards)[idString]
    if (boxes === undefined) return null;

    // build box gacha
    return {
        redeemItemId: redeemItemData.itemId,
        redeemItemCount: redeemItemData.count,
        boxes: boxes,
        availableCounts: redeemItemData.availableCounts
    }
}

/**
 * Gets the data for a gacha.
 * 
 * @param id The ID of the gacha.
 * @returns The gacha's data, or null.
 */
export function getGachaSync(
    id: string | number
): Gacha | null {
    const data = (gachas as Gachas)[String(id)];
    
    return data ?? null
}

/**
 * Gets the ID of the gacha campaign assigned to a gacha.
 * 
 * @param gachaId The ID of the gacha.
 * @returns The ID of the assigned gacha campaign or null.
 */
export function getGachaCampaignIdSync(
    gachaId: string | number
): number | null {
    return (gachaCampaigns as Record<string, number>)[String(gachaId)] ?? null
}

// shop functions

/**
 * Gets the items for a generic shop.
 * 
 * @param shopType The type of shop to get the items of.
 * @returns A list of shop items belonging to the specified shop type or null.
 */
export function getGenericShopItemsSync(
    shopType: ShopType
): ShopItems | null {
    switch (shopType) {
        case ShopType.TREASURE:
            return treasureShopItems as ShopItems
        case ShopType.GENERAL:
            return generalShopItems as ShopItems
        case ShopType.STAR_GRAIN:
            return starGrainShopItems as ShopItems
    }
    return null
}

/**
 * Gets the items for a specific event shop.
 * 
 * @param eventType The type of event.
 * @param eventId The ID of the event.
 * @returns A list of shop items or null.
 */
export function getEventShopItemsSync(
    eventType: number | string,
    eventId: number | string
): ShopItems | null {
    const typeSection = (eventItemShopItems as EventShopItems)[String(eventType)]
    if (typeSection === undefined) return null;

    return typeSection[String(eventId)] ?? null
}

/**
 * Gets the items belonging to a specific boss coin shop.
 * 
 * @param bossId The ID of the boss to get the items of.
 * @returns A list of shop items or null.
 */
export function getBossCoinShopItemsSync(
    bossId: number | string
): ShopItems | null {
    return (bossCoinShopItems as BossCoinShopItems)[String(bossId)] ?? null
}

/**
 * Gets the data for a specfic ShopItem.
 * 
 * @param shopType The type of shop that this item belongs to.
 * @param itemId The ID of this item.
 * @returns The ShopItem data or null.
 */
export function getShopItemSync(
    shopType: ShopType,
    itemId: number | string
): ShopItem | null {
    switch(shopType) {
        case ShopType.TREASURE:
            return (treasureShopItems as ShopItems)[String(itemId)] ?? null
        case ShopType.GENERAL:
            return (generalShopItems as ShopItems)[String(itemId)] ?? null
        case ShopType.STAR_GRAIN:
            return (starGrainShopItems as ShopItems)[String(itemId)] ?? null
        case ShopType.BOSS_COIN:
            const category = (bossCoinShopItemCategoryMap as Record<string, number>)[itemId]
            if (category === undefined) return null;
            return (bossCoinShopItems as BossCoinShopItems)[category][itemId] ?? null
        case ShopType.EVENT_ITEM:
            const mapInfo = (eventItemShopIdMap as Record<string, EventItemShopIdMapItem>)[itemId]
            if (mapInfo === undefined) return null;
            return (eventItemShopItems as EventShopItems)[mapInfo.eventType][mapInfo.eventId][itemId] ?? null
        default:
            return null
    }
}