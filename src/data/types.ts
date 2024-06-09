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
    bondTokenList: PlayerCharacterBondToken[]
}

export interface RawPlayerCharacterManaNode {
    value: number,
    character_id: number
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
}

export interface PlayerParty {
    name: string
    characterIds: (number | null)[]
    unisonCharacterIds: (number | null)[]
    equipmentIds: (number | null)[]
    abilitySoulIds: (number | null)[]
    edited: boolean
    options: PlayerPartyOptions
}

export interface RawPlayerPartyGroup {
    id: number
    color_id: number
}

export interface PlayerPartyGroup {
    list: Record<string, PlayerParty>
    colorId: number
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
    stages?: Record<string, boolean>
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
    lastLoginTime: string
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
    // other data
    dailyChallengePointList: DailyChallengePointListEntry[]
    triggeredTutorial: number[]
    clearedRegularMissionList: Record<string, number>
    characterList: Record<string, PlayerCharacter>
    characterManaNodeList: Record<string, number[]>
    partyGroupList: Record<string, PlayerPartyGroup>
    itemList: Record<string, number>
    equipmentList: Record<string, PlayerEquipment>
    questProgress: Record<string, PlayerQuestProgress[]>
    gachaInfoList: PlayerGachaInfo[]
    drawnQuestList: PlayerDrawnQuest[]
    periodicRewardPointList: PlayerPeriodicRewardPoint[]
    allActiveMissionList: Record<string, PlayerActiveMission>
    boxGachaList: Record<string, PlayerBoxGacha[]>
    purchasedTimesList: Record<string, number>
    startDashExchangeCampaignList: PlayerStartDashExchangeCampaign[]
    multiSpecialExchangeCampaignList: PlayerMultiSpecialExchangeCampaign[]
}