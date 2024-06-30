// enums
export enum RewardType {
    ITEM,
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

export enum ScoreRewardType {
    ITEM,
    RARE_POOL
}

// clear rewards
export interface Reward {
    name: string,
    type: RewardType,
}

export interface EquipmentItemReward extends Reward {
    id: number,
    count: number
}

export interface CharacterReward extends Reward {
    id: number
}

export interface CurrencyReward extends Reward {
    count: number
}

export interface RareScoreReward extends Reward {
    rarity: number
}

export type ClearRewards = Record<string, Reward>

// score rewards
export interface ScoreReward {
    name: string,
    type: ScoreRewardType
}

export interface ItemScoreReward extends ScoreReward {
    id: number,
    count: number,
    field5: number
}

export interface RareScoreRewardGroup extends ScoreReward {
    id: number,
    rarity: number
}

export type ScoreRewardGroups = Record<string, ScoreReward[]>

export type RareScoreRewardGroups = Record<string, Reward[]>

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
    clearReward: Reward
}

export interface BattleQuest {
    name: string,
    clearReward: Reward,
    sPlusReward: Reward,
    scoreRewardGroupId: number,
    scoreRewardGroup: ScoreReward[],
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

export interface AddExpListItem {
    character_id: number,
    add_exp: number,
    after_exp: number,
    add_exp_pool: number
}

export type AddExpList = AddExpListItem[]

export interface ClientReturnCharacter {
    character_id: number
    exp: number
    create_time: string
    update_time: string
    join_time: string
    exp_total: number
}

export interface ClientReturnBondTokenStatus {
    mana_board_index: number,
    status: number
}

export interface ClientReturnBondTokenStatusListItem {
    before: ClientReturnBondTokenStatus[]
    after: ClientReturnBondTokenStatus[]
}

export type ClientReturnBondTokenStatusList = Record<string, ClientReturnBondTokenStatusListItem>

export interface RewardPlayerCharacterExpResult {
    add_exp_list: AddExpList
    character_list: ClientReturnCharacter[]
    bond_token_status_list: ClientReturnBondTokenStatusList
    exp_pool: number
}

// quest types
export interface PlayerRewardResult {
    user_info: {
        free_mana: number
        free_vmoney: number
    },
    character_list: Object[]
    joined_character_id_list: number[]
    equipment_list: Object[]
    items: Record<string, number>
}

export interface DropScoreRewardId {
    group_id: number,
    index: number,
    number: number
}

export interface GivePlayerScoreRewardsResult extends PlayerRewardResult {
    drop_score_reward_ids: DropScoreRewardId[]
    drop_rare_reward_ids: DropScoreRewardId[]
}

// mana nodes
export interface ManaNode {
    items: Record<string, number>,
    manaCost: number,
    field1: string,
    field5: string,
    field6: string
}

export type ManaNodes = Record<string, Record<string, Record<string, ManaNode>>>

// ex ability
export type ExAbilities = Record<string, number[]>

export type ExStatus = ExAbilities

export interface ExBoostItem {
    tier: number,
    count: number,
    element?: Element
}

export type ExBoostItems = Record<string, ExBoostItem>;