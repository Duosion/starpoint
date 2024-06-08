import getDatabase, { Database } from ".";
import { Account, DailyChallengePointListCampaign, DailyChallengePointListEntry, Player, PlayerActiveMission, PlayerBoxGacha, PlayerCharacter, PlayerCharacterBondToken, PlayerDrawnQuest, PlayerEquipment, PlayerGachaInfo, PlayerMultiSpecialExchangeCampaign, PlayerParty, PlayerPartyGroup, PlayerPeriodicRewardPoint, PlayerQuestProgress, PlayerStartDashExchangeCampaign, RawAccount, RawDailyChallengePointListCampaign, RawDailyChallengePointListEntry, RawPlayer, RawPlayerActiveMission, RawPlayerActiveMissionStage, RawPlayerBoxGacha, RawPlayerCharacter, RawPlayerCharacterBondToken, RawPlayerCharacterManaNode, RawPlayerClearedRegularMission, RawPlayerDrawnQuest, RawPlayerEquipment, RawPlayerGachaInfo, RawPlayerItem, RawPlayerMultiSpecialExchangeCampaign, RawPlayerParty, RawPlayerPartyGroup, RawPlayerQuestProgress, RawPlayerStartDashExchangeCampaign, RawPlayerTriggeredTutorial, RawSession, Session } from "./types";
import { randomBytes } from "crypto";

const db = getDatabase(Database.WDFP_DATA)

// Account

/**
 * Converts a RawAccount into a Account
 * 
 * @param rawAccount The RawAccount to convert.
 * @returns The converted Account
 */
function buildAccount(
    rawAccount: RawAccount
): Account {
    return {
        id: rawAccount.id,
        appId: rawAccount.app_id,
        firstLoginTime: new Date(rawAccount.first_login_time),
        idpAlias: rawAccount.idp_alias,
        idpCode: rawAccount.idp_code,
        idpId: rawAccount.idp_id,
        regTime: new Date(rawAccount.reg_time),
        lastLoginTime: new Date(rawAccount.last_login_time),
        status: rawAccount.status
    }
}

/**
 * Asynchronously gets an Account from their id.
 * 
 * @param accountId The ID of the Account to get.
 * @returns The Account that was found or null.
 */
function getAccountSync(
    accountId: number
): Account | null {

    const raw = db.prepare(`
    SELECT id, app_id, first_login_time, idp_alias, idp_code, idp_id, reg_time, last_login_time, status
    FROM accounts
    WHERE id = ?
    `).get(accountId) as RawAccount | undefined

    if (raw === undefined) return null

    return buildAccount(raw)
}

/**
 * Gets an Account from their id.
 * 
 * @param accountId The ID of the Account to get.
 * @returns A promise that resolves with the Account that was found or null.
 */
export function getAccount(
    accountId: number
): Promise<Account | null> {
    return new Promise<Account | null>((resolve, reject) => {
        try {
            resolve(getAccountSync(accountId))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Synchronously inserts an Account into the database.
 * 
 * @param account An Account object that doesn't include its id, firstLoginTime, lastLoginTime, nor regTime.
 * @returns The Account that was inserted into the database.
 */
function insertAccountSync(
    account: Omit<Account, "id"|"firstLoginTime"|"regTime"|"lastLoginTime">
): Account {

    const dateNow = new Date()
    const dateNowISO = dateNow.toISOString()

    const result = db.prepare(`
    INSERT INTO accounts (app_id, first_login_time, idp_alias, idp_code, idp_id, reg_time, last_login_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        account.appId,
        dateNowISO,
        account.idpAlias,
        account.idpCode,
        account.idpId,
        dateNowISO,
        dateNowISO,
        account.status
    )

    const id = result.lastInsertRowid

    // return the complete player
    const finalAccount = account as Account
    finalAccount.id = Number(id)
    finalAccount.firstLoginTime = dateNow
    finalAccount.regTime = dateNow

    return finalAccount
}

/**
 * Inserts an Account into the database.
 * 
 * @param account An Account object that doesn't include its id, firstLoginTime, nor regTime.
 * @returns A promise that resolves with the Account that was inserted into the database.
 */
export function insertAccount(
    account: Omit<Account, "id"|"firstLoginTime"|"regTime"|"lastLoginTime">
): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
        try {
            resolve(insertAccountSync(account))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Synchronously updates an Account within the database.
 * 
 * @param account The values of the Account to update.
 * @returns The updated Account.
 */
function updateAccountSync(
    account: Partial<Account> & Pick<Account, "id">
): Account {
    const id = account.id

    const fieldMap: Record<string, string> = {
        'appId': 'app_id',
        'firstLoginTime': 'first_login_time',
        'idpAlias': 'idp_alias',
        'idpCode': 'idp_code',
        'idpId': 'idp_id',
        'regTime': 'reg_time',
        'lastLoginTime': 'last_login_time',
        'status': 'status'
    }

    const sets: string[] = []
    const values: any[] = []
    for (const key in account) {
        const value = account[key as keyof typeof account]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (value instanceof Date) {
                values.push(value.toISOString())
            } else {
                values.push(value)
            }
        }
    }

    if (sets.length > 0) db.prepare(`
        UPDATE accounts
        SET ${sets.join(', ')}
        WHERE id = ?
        `).run([...values, id]);

    return getAccountSync(id) as Account
}

/**
 * Updates an Account within the database.
 * 
 * @param account The values of the Account to update.
 * @returns A promise that resolves with the updated Account.
 */
export function updateAccount(
    account: Partial<Account> & Pick<Account, "id">
): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
        try {
            resolve(updateAccountSync(account))
        } catch (error) {
            reject(error)
        }
    })
}

// Sessions
/**
 * Converts a RawSession into a Session.
 * 
 * @param rawSession The RawSession to convert.
 * @returns The converted Session.
 */
function buildSession(
    rawSession: RawSession
): Session {
    return {
        token: rawSession.token,
        playerId: rawSession.player_id,
        expires: new Date(rawSession.expires),
        type: rawSession.type
    }
}

/**
 * Synchronously retrieves a session based on its token.
 * 
 * @param token The token of the session to retrieve.
 * @returns The session that was found or null
 */
function getSessionSync(
    token: string
): Session | null {

    const raw = db.prepare(`
    SELECT token, player_id, expires, type
    FROM sessions
    WHERE token = ?
    `).get(token) as RawSession | undefined

    if (raw === undefined) return null

    const session = buildSession(raw)

    if (new Date() >= session.expires) {
        deleteSessionSync(session.token)
        return null
    }

    return session
}

/**
 * Retrieves a session based on its token.
 * 
 * @param token The token of the session to retrieve.
 * @returns A promise that resolves with the session that was found or null
 */
export function getSession(
    token: string
): Promise<Session | null> {
    return new Promise<Session | null>((resolve, reject) => {
        try {
            resolve(getSessionSync(token))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Synchronously inserts a session into the database.
 * 
 * @param session The session to insert into the database without its token.
 * @returns The session that was inserted into the database.
 */
function insertSessionSync(
    session: Omit<Session, "token">
): Session {
    const token = randomBytes(54).toString('base64')

    db.prepare(`
    INSERT INTO sessions (token, player_id, expires, type)
    VALUES (?, ?, ?, ?)    
    `).run(
        token,
        session.playerId,
        session.expires.toISOString(),
        session.type
    )

    const completeSession = session as Session
    completeSession.token = token
    return completeSession
}

/**
 * Inserts a session into the database.
 * 
 * @param session The session to insert into the database without its token.
 * @returns A promise that resolves with the session that was inserted into the database.
 */
export function insertSession(
    session: Omit<Session, "token">
): Promise<Session> {
    return new Promise<Session>((resolve, reject) => {
        try {
            resolve(insertSessionSync(session))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Synchronously deletes a session from the database based on its token.
 * 
 * @param token The token of the session to delete.
 */
function deleteSessionSync(
    token: string
) {
    db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token)
}

/**
 * Deletes a session from the database based on its token.
 * 
 * @param token The token of the session to delete.
 * @returns A promise that resolves when the session is deleted.
 */
export function deleteSession(
    token: string
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            resolve(deleteSessionSync(token))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Synchronously deletes all of the sessions assigned to a particular player.
 * 
 * @param playerId The id of the player to delete all the sessions of.
 */
function deleteAccountSessionsSync(
    playerId: number
) {
    db.prepare(`DELETE FROM sessions WHERE player_id = ?`).run(playerId)
}

/**
 * Deletes all of the sessions assigned to a particular player.
 * 
 * @param playerId The id of the player to delete all the sessions of.
 * @returns A promise that resolves when the sessions have been deleted.
 */
export function deleteAccountSessions(
    playerId: number
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            resolve(deleteAccountSessionsSync(playerId))
        } catch (error) {
            reject(error)
        }
    })
}

// player

/**
 * Gets a player's daily challenge point list based on their id.
 * 
 * @param playerId The ID of the player to get the daily challenge point list of.
 * @returns The player's daily challenge point list.
 */
function getPlayerDailyChallengePointListSync(
    playerId: number
): DailyChallengePointListEntry[] {

    const rawEntries = db.prepare(`
    SELECT id, point
    FROM daily_challenge_point_list_entries
    WHERE player_id = ?
    `).all(playerId) as RawDailyChallengePointListEntry[]

    const rawCampaigns = db.prepare(`
    SELECT campaign_id, additional_point, list_entry_id
    FROM daily_challenge_point_list_campaigns
    WHERE player_id = ?
    `).all(playerId) as RawDailyChallengePointListCampaign[]

    const campaignBuckets: Record<number, DailyChallengePointListCampaign[]> = {}

    for (const rawCampaign of rawCampaigns) {
        const listEntryId = rawCampaign.list_entry_id
        let bucket = campaignBuckets[listEntryId]
        if (!bucket) {
            bucket = []
            campaignBuckets[listEntryId] = bucket
        }
        
        bucket.push({
            campaignId: rawCampaign.campaign_id,
            additionalPoint: rawCampaign.additional_point
        })
    }

    const entries = []
    for (const rawEntry of rawEntries) {
        const id = rawEntry.id
        entries.push({
            id: id,
            point: rawEntry.point,
            campaignList: campaignBuckets[id] || []
        })
    }

    return entries
}


/**
 * Gets a player's triggered tutorials.
 * 
 * @param playerId The ID of the player to get the triggered tutorials of.
 * @returns A list of the IDs of each triggered tutorial.
 */
function getPlayerTriggeredTutorialsSync(
    playerId: number
): number[] {

    const raw = db.prepare(`
    SELECT id
    FROM players_triggered_tutorials
    WHERE player_id = ?
    `).all(playerId) as RawPlayerTriggeredTutorial[]

    return raw.map(rawTrigger => rawTrigger.id)
}

/**
 * Retrieve a list of a player's cleared regular missions.
 * 
 * @param playerId The ID of the player.
 * @returns A record, where the index is the id of the mission and the value is ???.
 */
function getPlayerClearedRegularMissionListSync(
    playerId: number
): Record<string, number> {

    const raw = db.prepare(`
    SELECT id, value
    FROM players_cleared_regular_missions
    WHERE player_id = ?
    `).all(playerId) as RawPlayerClearedRegularMission[]

    const record: Record<string, number> = {}

    for (const rawClear of raw) {
        record[rawClear.id.toString()] = rawClear.value
    }

    return record
}

/**
 * Gets a list of all of the characters that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A list of the characters that the player owns.
 */
function getPlayerCharactersSync(
    playerId: number
): PlayerCharacter[] {

    const rawCharacters = db.prepare(`
    SELECT id, entry_count, evolution_level, over_limit_step, protection
        join_time, update_time, exp, stack, mana_board_index
    FROM players_characters
    WHERE player_id = ?
    `).all(playerId) as RawPlayerCharacter[]

    // get bond tokens
    const rawBondTokens = db.prepare(`
    SELECT mana_board_index, status, character_id
    FROM players_characters_bond_tokens
    WHERE player_id = ?
    `).all(playerId) as RawPlayerCharacterBondToken[]

    const bondBuckets: Record<number, PlayerCharacterBondToken[]> = {}

    for (const rawBondToken of rawBondTokens) {
        const characterId = rawBondToken.character_id
        let bucket = bondBuckets[characterId]
        if (!bucket) {
            bucket = []
            bondBuckets[characterId] = bucket
        }
        
        bucket.push({
            manaBoardIndex: rawBondToken.mana_board_index,
            status: rawBondToken.status
        })
    }

    return rawCharacters.map(rawCharacter => {
        return {
            entryCount: rawCharacter.entry_count,
            evolutionLevel: rawCharacter.evolution_level,
            overLimitStep: rawCharacter.over_limit_step,
            protection: rawCharacter.protection === 1 ? true : false,
            joinTime: new Date(rawCharacter.join_time),
            updateTime: new Date(rawCharacter.update_time),
            exp: rawCharacter.exp,
            stack: rawCharacter.stack,
            manaBoardIndex: rawCharacter.mana_board_index,
            bondTokenList: bondBuckets[rawCharacter.id] || []
        }
    }) as PlayerCharacter[]
}

/**
 * Retrieves the mana node statuses of a player's characters.
 * 
 * @param playerId The ID of the player.
 * @returns A record containing the statuses of the player's characters.
 */
function getPlayerCharactersManaNodesSync(
    playerId: number
): Record<string, number[]> {

    const rawNodes = db.prepare(`
    SELECT value, character_id
    FROM players_characters_mana_nodes
    WHERE player_id = ?
    `).all(playerId) as RawPlayerCharacterManaNode[]

    const buckets: Record<string, number[]> = {}

    for (const rawNode of rawNodes) {
        const characterId = rawNode.character_id.toString()
        let bucket: number[] = buckets[characterId]
        if (!bucket) {
            bucket = []
            buckets[characterId] = bucket
        }
        
        bucket.push(rawNode.value)
    }

    return buckets
}

/**
 * Fetches a player's party group layout.
 * 
 * @param playerId The ID of the player.
 * @returns The data for each of the player's parties.
 */
function getPlayerPartyGroupListSync(
    playerId: number
): Record<string, PlayerPartyGroup> {

    // get party groups
    const rawPartyGroups = db.prepare(`
    SELECT id, color_id
    FROM players_party_groups
    WHERE player_id = ?
    `).all(playerId) as RawPlayerPartyGroup[]

    // get raw parties
    const rawParties = db.prepare(`
    SELECT slot, name, character_id_1, character_id_2, character_id_3, unison_character_1,
        unison_character_2, unison_character_3, equipment_1, equipment_2, equipment_3,
        ability_soul_1, ability_soul_2, ability_soul_3, edited, group_id
    FROM players_parties
    WHERE player_id = ?
    `).all(playerId) as RawPlayerParty[]

    const groupLists: Record<string, Record<string, PlayerParty>> = {}

    for (const rawParty of rawParties) {
        const groupId = rawParty.group_id.toString()
        let bucket: Record<string, PlayerParty> = groupLists[groupId]
        if (!bucket) {
            bucket = {}
            groupLists[groupId] = bucket
        }
        bucket[rawParty.slot.toString()] = {
            name: rawParty.name,
            characterIds: [rawParty.character_id_1, rawParty.character_id_2, rawParty.character_id_3],
            unisonCharacterIds: [rawParty.unison_character_1, rawParty.unison_character_2, rawParty.unison_character_3],
            equipmentIds: [rawParty.equipment_1, rawParty.equipment_2, rawParty.equipment_3],
            abilitySoulIds: [rawParty.ability_soul_1, rawParty.ability_soul_2, rawParty.ability_soul_3],
            edited: rawParty.edited === 1 ? true : false,
            options: {
                allowOtherPlayersToHealMe: true
            }
        }
    }

    const final: Record<string, PlayerPartyGroup> = {}

    for (const rawPartyGroup of rawPartyGroups) {
        const id = rawPartyGroup.id.toString()
        final[id] = {
            list: groupLists[id] || [],
            colorId: rawPartyGroup.color_id
        }
    }

    return final
}

/**
 * Gets the items that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A record where the index is the item's ID and the value is the item's amount.
 */
function getPlayerItemsSync(
    playerId: number
): Record<string, number> {

    const rawItems = db.prepare(`
    SELECT id, amount
    FROM players_items
    WHERE player_id = ?
    `).all(playerId) as RawPlayerItem[]
    
    const output: Record<string, number> = {}
    for (const rawItem of rawItems) {
        output[rawItem.id.toString()] = rawItem.amount
    }

    return output
}

/**
 * Retrieves the equipment that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A record where the index is the equipment's ID and the value is its data.
 */
function getPlayerEquipmentSync(
    playerId: number
): Record<string, PlayerEquipment> {

    const rawEquipment = db.prepare(`
    SELECT id, level, enhancement_level, protection, stack
    FROM players_equipment
    WHERE player_id = ?
    `).all(playerId) as RawPlayerEquipment[]

    const final: Record<string, PlayerEquipment> = {}

    for (const raw of rawEquipment) {
        final[raw.id.toString()] = {
            level: raw.level,
            enhancementLevel: raw.enhancement_level,
            protection: raw.protection === 1 ? true : false,
            stack: raw.stack
        }
    }

    return final
}

/**
 * Gets a player's overall quest progressfrom the database.
 * 
 * @param playerId The player's ID.
 * @returns A record where the index is the section and the value is a list of PlayerQuestProgress.
 */
function getPlayerQuestProgressSync(
    playerId: number
): Record<string, PlayerQuestProgress[]> {

    const rawProgress = db.prepare(`
    SELECT section, quest_id, finished, high_score, clear_rank, best_elapsed_time_ms
    FROM players_quest_progress
    WHERE player_id = ?
    `).all(playerId) as RawPlayerQuestProgress[]

    const mapped: Record<string, PlayerQuestProgress[]> = {}

    for (const raw of rawProgress) {
        const section = raw.section.toString()
        let bucket: PlayerQuestProgress[] = mapped[section]
        if (!bucket) {
            bucket = []
            mapped[section] = bucket
        }
        bucket.push({
            questId: raw.quest_id,
            finished: raw.finished === 1 ? true : false,
            highScore: raw.high_score,
            clearRank: raw.clear_rank,
            bestElapsedTimeMs: raw.best_elapsed_time_ms
        })
    }

    return mapped
}

/**
 * Retrieves the status of various gacha banners for the player.
 * 
 * @param playerId The ID of the player.
 * @returns A list of PlayerGachaInfo.
 */
function getPlayerGachaInfoSync(
    playerId: number
): PlayerGachaInfo[] {
    const rawInfo = db.prepare(`
    SELECT gacha_id, is_daily_first, is_account_first, gacha_exchange_point
    FROM players_gacha_info
    WHERE player_id = ?
    `).all(playerId) as RawPlayerGachaInfo[]

    return rawInfo.map(raw => {
        return {
            gachaId: raw.gacha_id,
            isDailyFirst: raw.is_daily_first === 1 ? true : false,
            isAccountFirst: raw.is_account_first === 1 ? true : false,
            gachaExchangePoint: raw.gacha_exchange_point
        }
    })
}

/**
 * Gets a player's drawn quests list.
 * 
 * @param playerId The player's ID.
 * @returns A list of the player's drawn quests.
 */
function getPlayerDrawnQuestsSync(
    playerId: number
): PlayerDrawnQuest[] {
    const rawQuests = db.prepare(`
    SELECT category_id, quest_id, odds_id
    FROM players_drawn_quests
    WHERE player_id = ?
    `).all(playerId) as RawPlayerDrawnQuest[]

    return rawQuests.map(raw => {
        return {
            categoryId: raw.category_id,
            questId: raw.quest_id,
            oddsId: raw.odds_id
        }
    })
}

/**
 * Gets a player's periodic reward point list.
 * 
 * @param playerId The ID of the player.
 * @returns A list of the player's periodic reward points
 */
function getPlayerPeriodicRewardPointsSync(
    playerId: number
): PlayerPeriodicRewardPoint[] {
    return db.prepare(`
    SELECT id, point
    FROM players_periodic_reward_points
    WHERE player_id = ?
    `).all(playerId) as PlayerPeriodicRewardPoint[]
}

/**
 * Retrieves the missions that a player is currently completing.
 * 
 * @param playerId The ID of the player.
 * @returns A record of each mission and its current progress.
 */
function getPlayerActiveMissionsSync(
    playerId: number
): Record<string, PlayerActiveMission> {
    const rawMissions = db.prepare(`
    SELECT id, progress
    FROM players_active_missions
    WHERE player_id = ?
    `).all(playerId) as RawPlayerActiveMission[]

    const rawStages = db.prepare(`
    SELECT id, status, mission_id
    FROM players_active_missions_stages
    WHERE player_id = ?
    `).all(playerId) as RawPlayerActiveMissionStage[]

    const stageBuckets: Record<string, Record<string, boolean>> = {}

    for (const rawStage of rawStages) {
        const missionId = rawStage.mission_id.toString()
        let bucket = stageBuckets[missionId]
        if (!bucket) {
            bucket = {}
            stageBuckets[missionId] = bucket
        }
        
        bucket[rawStage.id] = rawStage.status === 1 ? true : false
    }

    const final: Record<string, PlayerActiveMission> = {}

    for (const rawMission of rawMissions) {
        const id = rawMission.id.toString()

        final[id] = {
            progress: rawMission.progress,
            stages: stageBuckets[id] || []
        }
    }

    return final
}

/**
 * Gets a player's box gachas.
 * 
 * @param playerId The ID of the player
 * @returns A record containing the status of the player's box gachas.
 */
function getPlayerBoxGachasSync(
    playerId: number
): Record<string, PlayerBoxGacha[]> {
    
    const rawBoxes = db.prepare(`
    SELECT id, box_id, reset_times, remaining_number, is_closed
    FROM players_box_gacha
    WHERE player_id = ?
    `).all(playerId) as RawPlayerBoxGacha[]

    const buckets: Record<string, PlayerBoxGacha[]> = {}

    for (const rawBox of rawBoxes) {
        const id = rawBox.id.toString()
        let bucket = buckets[id]
        if (!bucket) {
            bucket = []
            buckets[id] = bucket
        }
        bucket.push({
            boxId: rawBox.box_id,
            resetTimes: rawBox.reset_times,
            remainingNumber: rawBox.remaining_number,
            isClosed: rawBox.is_closed === 1 ? true : false
        })
    }

    return buckets
}

/**
 * Gets the progress of a player's start dash exchange campaigns.
 * 
 * @param playerId The player's ID.
 * @returns The status of the player's start dash exchange campaigns.
 */
function getPlayerStartDashExchangeCampaignsSync(
    playerId: number
): PlayerStartDashExchangeCampaign[] {
    const rawCampaigns = db.prepare(`
    SELECT campaign_id, gacha_id, term_index, status, period_start_time, period_end_time
    FROM players_start_dash_exchange_campaigns
    WHERE player_id = ?
    `).all(playerId) as RawPlayerStartDashExchangeCampaign[]
    
    return rawCampaigns.map(raw => {
        return {
            campaignId: raw.campaign_id,
            gachaId: raw.gacha_id,
            termIndex: raw.term_index,
            status: raw.status,
            periodStartTime: new Date(raw.period_start_time),
            periodEndTime: new Date(raw.period_end_time)
        }
    })
}

/**
 * Gets the progress of a player's multi special exchange campaigns.
 * 
 * @param playerId The player's ID.
 * @returns The status of the player's multi special exchange campaigns.
 */
function getPlayerMultiSpecialExchangeCampaignsSync(
    playerId: number
): PlayerMultiSpecialExchangeCampaign[] {
    const rawCampaigns = db.prepare(`
    SELECT campaign_id, status
    FROM players_multi_special_exchange_campaigns
    WHERE player_id = ?
    `).all(playerId) as RawPlayerMultiSpecialExchangeCampaign[]
    
    return rawCampaigns.map(raw => {
        return {
            campaignId: raw.campaign_id,
            status: raw.status
        }
    })
}

function getPlayerSync(
    playerId: number
): Player | null {
    const raw = db.prepare(`
    SELECT stamina, stamina_heal_time, boost_point, boss_boost_point,
        transition_state, role, name, last_login_time, comment,
        vmoney, free_vmoney, rank_point, star_crumb,
        bond_token, exp_pool, exp_pooled_time, leader_character_id, party_slot,
        degree_id, birth, free_mana, paid_mana, enable_auto_3x
    FROM players
    WHERE id = ?    
    `).get(playerId) as RawPlayer | undefined

    if (raw === undefined) return null
    
    // get daily challenge points
    const dailyChallengePointList = getPlayerDailyChallengePointListSync(playerId)

    // get triggered tutorials
    const triggeredTutorials = getPlayerTriggeredTutorialsSync(playerId)

    // get cleared regular missions
    const clearedRegularMissionList = getPlayerClearedRegularMissionListSync(playerId)

    // get characterList
    const characterList = getPlayerCharactersSync(playerId)

    // get characterManaNodeList
    const characterManaNodeList = getPlayerCharactersManaNodesSync(playerId)

    // get parties
    const partyGroupList = getPlayerPartyGroupListSync(playerId)

    // get items
    const itemList = getPlayerItemsSync(playerId)

    // get equipment
    const equipmentList = getPlayerEquipmentSync(playerId)

    // get quest progress
    const questProgress = getPlayerQuestProgressSync(playerId)

    // get gacha info
    const gachaInfoList = getPlayerGachaInfoSync(playerId)

    // get drawnQuestList
    const drawnQuestList = getPlayerDrawnQuestsSync(playerId)

    // get periodicReward
    const periodicRewardPointList = getPlayerPeriodicRewardPointsSync(playerId)

    // get active missions
    const allActiveMissionList = getPlayerActiveMissionsSync(playerId)

    // get box gacha
    const boxGachaList = getPlayerBoxGachasSync(playerId)

    // get start dash campaign list
    const startDashExchangeCampaignList = getPlayerStartDashExchangeCampaignsSync(playerId)

    // get the multi special exchange campaign list
    const multiSpecialExchangeCampaignList = getPlayerMultiSpecialExchangeCampaignsSync(playerId)
    
    return {
        stamina: raw.stamina,
        staminaHealTime: new Date(raw.stamina_heal_time),
        boostPoint: raw.boost_point,
        bossBoostPoint: raw.boss_boost_point,
        transitionState: raw.transition_state,
        role: raw.role,
        name: raw.name,
        lastLoginTime: raw.last_login_time,
        comment: raw.comment,
        vmoney: raw.vmoney,
        freeVmoney: raw.free_vmoney,
        rankPoint: raw.rank_point,
        starCrumb: raw.star_crumb,
        bondToken: raw.bond_token,
        expPool: raw.exp_pool,
        expPooledTime: new Date(raw.exp_pooled_time),
        leaderCharacterId: raw.leader_character_id,
        partySlot: raw.party_slot,
        degreeId: raw.degree_id,
        birth: raw.birth,
        freeMana: raw.free_mana,
        paidMana: raw.paid_mana,
        enableAuto3x: raw.enable_auto_3x === 1 ? true: false,
        // other data
        dailyChallengePointList: dailyChallengePointList,
        triggeredTutorial: triggeredTutorials,
        clearedRegularMissionList: clearedRegularMissionList,
        characterList: characterList,
        characterManaNodeList: characterManaNodeList,
        partyGroupList: partyGroupList,
        itemList: itemList,
        equipmentList: equipmentList,
        questProgress: questProgress,
        gachaInfoList: gachaInfoList,
        drawnQuestList: drawnQuestList,
        periodicRewardPointList: periodicRewardPointList,
        allActiveMissionList: allActiveMissionList,
        boxGachaList: boxGachaList,
        purchasedTimesList: {},
        startDashExchangeCampaignList: startDashExchangeCampaignList,
        multiSpecialExchangeCampaignList: multiSpecialExchangeCampaignList
    }
}

console.log(getPlayerSync(1))