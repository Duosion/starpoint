// player
export interface RawAccount {
    id: number,
    app_id: string
    first_login_time: string
    idp_alias: string
    idp_code: string
    idp_id: string
    reg_time: string
    last_login_time: string
    status: string
}

export interface Account {
    id: number
    appId: string
    firstLoginTime: Date
    idpAlias: string
    idpCode: string
    idpId: string
    regTime: Date
    lastLoginTime: Date
    status: string
}

// zat session
export enum SessionType {
    ZAT,
    ZRT,
    VIEWER
}

export interface RawSession {
    token: string
    expires: string
    type: number
    account_id: number
}

export interface Session {
    token: string
    expires: Date
    type: SessionType
    accountId: number
}

// game player
export interface RawDailyChallengePointListCampaign {
    campaign_id: number
    additional_point: number
    list_entry_id: number
}

export interface DailyChallengePointListCampaign {
    campaignId: number
    additionalPoint: number
}

export interface RawDailyChallengePointListEntry {
    id: number
    point: number
}

export interface DailyChallengePointListEntry {
    id: number
    point: number
    campaignList: DailyChallengePointListCampaign[]
}

export interface RawPlayerTriggeredTutorial {
    id: number
}

export interface RawPlayerClearedRegularMission {
    id: number
    value: number
}

export interface RawPlayerItem {
    id: number
    amount: number
}

export interface RawPlayerCharacterBondToken {
    mana_board_index: number
    status: number
    character_id: number
}

export interface PlayerCharacterBondToken {
    manaBoardIndex: number
    status: number
}

export interface RawPlayerCharacter {
    id: number
    entry_count: number
    evolution_level: number
    over_limit_step: number
    protection: number
    join_time: string
    update_time: string
    exp: number
    stack: number
    mana_board_index: number
    ex_boost_status_id: number | null
    ex_boost_ability_id_list: string | null
    illustration_settings: string | null
}

export interface PlayerCharacterExBoost {
    statusId: number,
    abilityIdList: number[]
}

export interface PlayerCharacter {
    entryCount: number
    evolutionLevel: number
    overLimitStep: number
    protection: boolean
    joinTime: Date
    updateTime: Date
    exp: number
    stack: number
    manaBoardIndex: number
    exBoost?: PlayerCharacterExBoost
    illustrationSettings?: number[]
    bondTokenList: PlayerCharacterBondToken[]
}

export interface RawPlayerCharacterManaNode {
    value: number,
    character_id: number
}

// party
export enum PartyCategory {
    EMPTY,
    NORMAL,
    EMPTY2,
    EMPTY3,
    EVENT
}

export interface RawPlayerPartyOptions {
    allow_other_players_to_heal_me: number
}

export interface PlayerPartyOptions {
    allowOtherPlayersToHealMe: boolean
}

export interface RawPlayerParty {
    slot: number
    name: string
    character_id_1: number
    character_id_2: number
    character_id_3: number
    unison_character_1: number
    unison_character_2: number
    unison_character_3: number
    equipment_1: number
    equipment_2: number
    equipment_3: number
    ability_soul_1: number
    ability_soul_2: number
    ability_soul_3: number
    edited: number
    group_id: number
    category: PartyCategory
}

export interface PlayerParty {
    name: string
    characterIds: (number | null)[]
    unisonCharacterIds: (number | null)[]
    equipmentIds: (number | null)[]
    abilitySoulIds: (number | null)[]
    edited: boolean
    options: PlayerPartyOptions
    category: PartyCategory
}

export interface RawPlayerPartyGroup {
    id: number
    color_id: number
    category: PartyCategory
}

export interface PlayerPartyGroup {
    list: Record<string, PlayerParty>
    colorId: number
    category: PartyCategory
}

export interface RawPlayerEquipment {
    id: number
    level: number
    enhancement_level: number
    protection: number
    stack: number
}

export interface PlayerEquipment {
    level: number
    enhancementLevel: number
    protection: boolean
    stack: number
}

export interface RawPlayerQuestProgress {
    section: number
    quest_id: number
    finished: number
    high_score?: number
    clear_rank?: number
    best_elapsed_time_ms?: number
}

export interface PlayerQuestProgress {
    questId: number
    finished: boolean
    highScore?: number
    clearRank?: number
    bestElapsedTimeMs?: number
}

export interface RawPlayerGachaInfo {
    gacha_id: number
    is_daily_first: number
    is_account_first: number
    gacha_exchange_point?: number
}

export interface PlayerGachaInfo {
    gachaId: number
    isDailyFirst: boolean
    isAccountFirst: boolean
    gachaExchangePoint?: number
}

export interface RawPlayerGachaCampaign {
    gacha_id: number,
    campaign_id: number,
    count: number
}

export interface PlayerGachaCampaign {
    gachaId: number,
    campaignId: number,
    count: number
}

export interface RawPlayerDrawnQuest {
    category_id: number
    quest_id: number
    odds_id: number
}

export interface PlayerDrawnQuest {
    categoryId: number
    questId: number
    oddsId: number
}

export interface PlayerPeriodicRewardPoint {
    id: number
    point: number
}

export interface RawPlayerActiveMissionStage {
    id: number,
    status: number,
    mission_id: number
}

export interface RawPlayerActiveMission {
    id: number,
    progress: number
}

export interface PlayerActiveMission {
    progress: number
    stages: Record<string, boolean> | never[]
}

export interface RawPlayerBoxGacha {
    id: number
    box_id: number
    reset_times: number
    remaining_number: number
    is_closed: number
}

export interface PlayerBoxGacha {
    boxId: number
    resetTimes: number
    remainingNumber: number
    isClosed: boolean
}

export interface PlayerBoxGachaDrawnReward {
    id: number,
    number: number
}

export interface RawPlayerStartDashExchangeCampaign {
    campaign_id: number
    gacha_id: number
    term_index: number
    status: number
    period_start_time: string
    period_end_time: string
}

export interface PlayerStartDashExchangeCampaign {
    campaignId: number
    gachaId: number
    termIndex: number
    status: number
    periodStartTime: Date
    periodEndTime: Date
}

export interface RawPlayerMultiSpecialExchangeCampaign {
    campaign_id: number
    status: number
}

export interface PlayerMultiSpecialExchangeCampaign {
    campaignId: number
    status: number
}

// rush event
export interface RawPlayerRushEvent {
    player_id: number,
    event_id: number,
    endless_battle_next_round: number,
    active_rush_battle_folder_id: number | null,
    endless_battle_max_round: number | null
}

export interface PlayerRushEvent {
    eventId: number,
    endlessBattleNextRound: number,
    activeRushBattleFolderId: number | null,
    endlessBattleMaxRound: number | null
}

export interface RawPlayerRushEventClearedFolder {
    player_id: number,
    event_id: number,
    folder_id: number
}

export type PlayerRushEventClearedFolders = number[]

export enum RushEventBattleType {
    RUSH,
    ENDLESS
}

export interface UserRushEventPlayedParty {
    character_id_1: number | null,
    character_id_2: number | null,
    character_id_3: number | null,
    unison_character_id_1: number | null,
    unison_character_id_2: number | null,
    unison_character_id_3: number | null,
    equipment_id_1: number | null,
    equipment_id_2: number | null,
    equipment_id_3: number | null,
    ability_soul_id_1: number | null,
    ability_soul_id_2: number | null,
    ability_soul_id_3: number | null,
    evolution_img_level_1: number | null,
    evolution_img_level_2: number | null,
    evolution_img_level_3: number | null,
    unison_evolution_img_level_1: number | null,
    unison_evolution_img_level_2: number | null,
    unison_evolution_img_level_3: number | null,
}

export interface RawPlayerRushEventPlayedParty extends UserRushEventPlayedParty {
    player_id: number,
    event_id: number,
    round: number,
    battle_type: RushEventBattleType,
}

export interface PlayerRushEventPlayedParty {
    characterIds: (number | null)[],
    unisonCharacterIds: (number | null)[],
    equipmentIds: (number | null)[],
    abilitySoulIds: (number | null)[],
    evolutionImgLevels: (number | null)[],
    unisonEvolutionImgLevels: (number | null)[],
    round: number,
    battleType: RushEventBattleType
}

export type PlayerRushEventPlayedParties = PlayerRushEventPlayedParty[]

export interface RawPlayerOption {
    key: string,
    value: number
}

export interface RawPlayer {
    id: number
    stamina: number
    stamina_heal_time: string
    boost_point: number
    boss_boost_point: number
    transition_state: number
    role: number
    name: string
    last_login_time: string
    comment: string
    vmoney: number
    free_vmoney: number
    rank_point: number
    star_crumb: number
    bond_token: number
    exp_pool: number
    exp_pooled_time: string
    leader_character_id: number
    party_slot: number
    degree_id: number
    birth: number
    free_mana: number
    paid_mana: number
    enable_auto_3x: number
    tutorial_step: number | null
    tutorial_skip_flag: number | null
}

export interface Player {
    id: number
    stamina: number
    staminaHealTime: Date
    boostPoint: number
    bossBoostPoint: number
    transitionState: number
    role: number
    name: string
    lastLoginTime: Date
    comment: string
    vmoney: number
    freeVmoney: number
    rankPoint: number
    starCrumb: number
    bondToken: number
    expPool: number
    expPooledTime: Date
    leaderCharacterId: number
    partySlot: number
    degreeId: number
    birth: number
    freeMana: number
    paidMana: number
    enableAuto3x: boolean
    tutorialStep: number | null
    tutorialSkipFlag: boolean | null
}

// client types
// Types used by the pinball game client.
export interface ClientUserInfo {
    stamina: number
    stamina_heal_time: number
    boost_point: number
    boss_boost_point: number
    transition_state: number
    role: number
    name: string
    last_login_time: string
    comment: string
    vmoney: number
    free_vmoney: number
    rank_point: number
    star_crumb: number
    bond_token: number
    exp_pool: number
    exp_pooled_time: number
    leader_character_id: number
    party_slot: number
    degree_id: number
    birth: number
    free_mana: number
    paid_mana: number
    enable_auto_3x: boolean
}

export interface UserDailyChallengePointListItemCampaign {
    campaign_id: number
    additional_point: number
}

export interface UserDailyChallengePointListItem {
    id: number
    point: number
    campaign_list: UserDailyChallengePointListItemCampaign[]
}

export interface UserTutorial {
    viewer_id: number
    tutorial_step: number
    skip_flag: boolean | null
    powerflip_failure?: number
}

export interface UserCharacterBondTokenStatus {
    mana_board_index: number
    status: number
}

export interface UserCharacterExBoost {
    status_id: number
    ability_id_list: number[]
}

export interface UserCharacter {
    entry_count: number
    evolution_level: number
    over_limit_step: number
    protection: boolean
    join_time: number
    update_time: number
    exp: number
    stack: number
    bond_token_list: UserCharacterBondTokenStatus[]
    mana_board_index: number
    ex_boost?: UserCharacterExBoost
    illustration_settings?: number[]
}

export type UserCharacterList = Record<string, UserCharacter>
export type UserCharacterManaNodeList = Record<string, number[]>

export interface UserPartyGroupTeam {
    name: string,
    character_ids: (number | null)[]
    unison_character_ids: (number | null)[]
    equipment_ids: (number | null)[]
    ability_soul_ids: (number | null)[]
    edited: boolean
    options: {
        allow_other_players_to_heal_me: boolean
    }
}

export interface UserPartyGroup {
    color_id: number,
    list: Record<string, UserPartyGroupTeam>
}

export interface UserEquipment {
    enhancement_level: number,
    level: number,
    protection: boolean,
    stack: number
}

export interface UserQuestProgress {
    quest_id: number
    finished: boolean
    high_score?: number
    best_elapsed_time_ms?: number
    clear_rank?: number
}

export interface UserGachaInfo {
    gacha_id: number
    is_daily_first: boolean
    is_account_first: boolean
    gacha_exchange_point?: number
}

export interface UserDrawnQuest {
    category_id: number
    quest_id: number
    odds_id: number
}

export interface UserBoxGacha {
    box_id: number
    reset_times: number
    remaining_number: number
    is_closed: boolean
}

export interface UserGachaCampaign {
    campaign_id: number
    gacha_id: number
    count: number
}

export interface UserStartDashCampaignList {
    campaign_id: number
    gacha_id: number
    period_start_time: number
    period_end_time: number
    status: number
    term_index: number
}

export interface UserMultiSpecialExchangeCampaignList {
    campaign_id: number
    status: number
}

export interface ClientPlayerData {
    user_info: ClientUserInfo
    premium_bonus_list: unknown[]
    expired_premium_bonus_list: unknown
    user_daily_challenge_point_list: UserDailyChallengePointListItem[]
    bonus_index_list: unknown
    login_bonus_received_at?: unknown
    user_notice_list: unknown[]
    user_triggered_tutorial: number[]
    user_tutorial?: UserTutorial | null
    tutorial_gacha?: unknown
    cleared_regular_mission_list: Record<string, number>
    user_character_list: UserCharacterList
    user_character_mana_node_list: UserCharacterManaNodeList
    user_party_group_list: Record<string, UserPartyGroup>
    item_list: Record<string, number>
    user_equipment_list: Record<string, UserEquipment>
    user_character_from_town_history: unknown[]
    quest_progress: Record<string, UserQuestProgress[]>
    last_main_quest_id: number | null
    gacha_info_list: UserGachaInfo[]
    available_asset_version: string
    should_prompt_takeover_registration: boolean
    has_unread_news_item: boolean
    user_option: Record<string, boolean>
    drawn_quest_list: UserDrawnQuest[]
    mail_arrived: boolean
    user_periodic_reward_point_list: PlayerPeriodicRewardPoint[]
    all_active_mission_list: Record<string, PlayerActiveMission>
    cleared_collect_item_event_mission_list: unknown[]
    box_gacha_list: Record<string, UserBoxGacha[]>
    gacha_campaign_list: UserGachaCampaign[]
    purchased_times_list: Object
    start_dash_exchange_campaign_list: UserStartDashCampaignList[]
    multi_special_exchange_campaign_list: UserMultiSpecialExchangeCampaignList[]
    associate_token: string
    config: Object
}

export interface MergedPlayerData {
    player: Player,
    dailyChallengePointList: DailyChallengePointListEntry[],
    triggeredTutorial: number[],
    clearedRegularMissionList: Record<string, number>,
    characterList: Record<string, PlayerCharacter>,
    characterManaNodeList: Record<string, number[]>,
    partyGroupList: Record<string, PlayerPartyGroup>,
    itemList: Record<string, number>,
    equipmentList: Record<string, PlayerEquipment>,
    questProgress: Record<string, PlayerQuestProgress[]>,
    gachaInfoList: PlayerGachaInfo[],
    gachaCampaignList: PlayerGachaCampaign[],
    drawnQuestList: PlayerDrawnQuest[],
    periodicRewardPointList: PlayerPeriodicRewardPoint[],
    allActiveMissionList: Record<string, PlayerActiveMission>,
    boxGachaList: Record<string, PlayerBoxGacha[]>,
    purchasedTimesList: Record<string, number>,
    startDashExchangeCampaignList: PlayerStartDashExchangeCampaign[],
    multiSpecialExchangeCampaignList: PlayerMultiSpecialExchangeCampaign[],
    userOption: Record<string, boolean>,
}