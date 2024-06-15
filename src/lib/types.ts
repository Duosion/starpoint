export enum ClearRewardType {
    PLACEHOLDER,
    EQUIPMENT,
    CHARACTER,
    BEADS,
    MANA
}

export enum QuestCategory {
    EMPTY,
    MAIN,
    BOSS_BATTLE,
    CHARACTER,
    EX,
    EMPTY2,
    DAILY_WEEK_EVENT,
    ADVENT_EVENT_SINGLE,
    ADVENT_EVENT_MULTI,
    TUTORIAL,
    STORY_EVENT_SINGLE,
    RANKING_EVENT_SINGLE,
    EMPTY3,
    CHALLENGE_DUNGEON_EVENT,
    DAILY_EXP_MANA_EVENT,
    PRACTICE,
    SKILL_PREVIEW,
    EMPTY4,
    WORLD_STORY_EVENT,
    WORLD_STORY_EVENT_BOSS_BATTLE,
    TOWER_DUNGEON_EVENT,
    EXPERT_SINGLE_EVENT,
    CARNIVAL_EVENT,
    RAID_EVENT,
    RUSH_EVENT,
    SOLO_TIME_ATTACK_EVENT,
    HARD_MULTI_EVENT,
    SCORE_ATTACK_EVENT
}

export enum Element {
    FIRE,
    WATER,
    LIGHTNING,
    WIND,
    LIGHT,
    DARK
}

export interface ClearReward {
    name: string,
    type: ClearRewardType,
}

export interface EquipmentClearReward extends ClearReward {
    id: number,
    count: number
}

export interface CharacterClearReward extends ClearReward {
    id: number
}

export interface CurrencyClearReward extends ClearReward {
    count: number
}

export type ClearRewards = Record<string, ClearReward>

export interface RawQuest {
    name: string,
    clearRewardId: number,
    sPlusRewardId?: number,
    scoreRewardGroup?: number,
    bRankTime?: number,
    aRankTime?: number,
    sRankTime?: number,
    sPlusRankTime?: number,
    rankPointReward?: number,
    characterExpReward?: number,
    manaReward?: number,
    poolExpReward?: number
}

export interface StoryQuest {
    name: string,
    clearReward: ClearReward
}

export interface BattleQuest {
    name: string,
    clearReward: ClearReward,
    sPlusReward: ClearReward,
    scoreRewardGroup: number,
    bRankTime: number,
    aRankTime: number,
    sRankTime: number,
    sPlusRankTime: number,
    rankPointReward: number,
    characterExpReward: number,
    manaReward: number,
    poolExpReward: number
}

export type RawQuests = Record<string, RawQuest>

export interface AssetCharacter {
    name: string
    rarity: number,
    element: Element,
    skill_count: number
}

export type RawAssetCharacters = Record<string, AssetCharacter>