import { randomBytes } from "crypto";
import getDatabase, { Database } from ".";
import { generateViewerId, getServerTime } from "../utils";
import { Account, DailyChallengePointListCampaign, DailyChallengePointListEntry, MergedPlayerData, Player, PlayerActiveMission, PlayerBoxGacha, PlayerBoxGachaDrawnReward, PlayerCharacter, PlayerCharacterBondToken, PlayerCharacterExBoost, PlayerDrawnQuest, PlayerEquipment, PlayerGachaCampaign, PlayerGachaInfo, PlayerMultiSpecialExchangeCampaign, PlayerParty, PlayerPartyGroup, PlayerPeriodicRewardPoint, PlayerQuestProgress, PlayerStartDashExchangeCampaign, RawAccount, RawDailyChallengePointListCampaign, RawDailyChallengePointListEntry, RawPlayer, RawPlayerActiveMission, RawPlayerActiveMissionStage, RawPlayerBoxGacha, RawPlayerCharacter, RawPlayerCharacterBondToken, RawPlayerCharacterManaNode, RawPlayerClearedRegularMission, RawPlayerDrawnQuest, RawPlayerEquipment, RawPlayerGachaCampaign, RawPlayerGachaInfo, RawPlayerItem, RawPlayerMultiSpecialExchangeCampaign, RawPlayerOption, RawPlayerParty, RawPlayerPartyGroup, RawPlayerQuestProgress, RawPlayerStartDashExchangeCampaign, RawPlayerTriggeredTutorial, RawSession, Session, SessionType } from "./types";
import { deserializeBoolean, deserializeNumberList, getDefaultPlayerData, serializeBoolean, serializeNumberList } from "./utils";

const db = getDatabase(Database.WDFP_DATA)
const expPoolMax = 100000 // the maximum amount of exp that can be pooled

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
 * Synchronously gets all of the players that are bound to an account.
 * 
 * @param accountId The account's id.
 * @returns A list of player ids.
 */
function getAccountPlayersSync(
    accountId: number
): number[] {
    const raw = db.prepare(`
    SELECT id
    FROM players
    WHERE account_id = ?
    `).all(accountId) as { id: number }[]

    return raw.map(player => player.id)
}

/**
 * Gets all of the players that are bound to an account.
 * 
 * @param accountId The account's id.
 * @returns A promise that resolves with a list of player ids.
 */
export function getAccountPlayers(
    accountId: number
): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
        try {
            resolve(getAccountPlayersSync(accountId))
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
    account: Omit<Account, "id" | "firstLoginTime" | "regTime" | "lastLoginTime">
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
    account: Omit<Account, "id" | "firstLoginTime" | "regTime" | "lastLoginTime">
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
        accountId: rawSession.account_id,
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
    SELECT token, account_id, expires, type
    FROM sessions
    WHERE token = ?
    `).get(token) as RawSession | undefined

    if (raw === undefined) return null

    const session = buildSession(raw)

    // viewer tokens don't expire.
    if (session.type !== SessionType.VIEWER && new Date() >= session.expires) {
        console.log(`session of type (${session.type}) expired:`, session)
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
 * Synchronously returns all of the sessions of a particular type belonging to an account.
 * 
 * @param accountId The ID of the account to get the sessions of.
 * @param type The type of session to get.
 * @returns An array of sessions.
 */
function getAccountSessionsOfTypeSync(
    accountId: number,
    type: SessionType
): Session[] {
    const rawResult = db.prepare(`
    SELECT token, account_id, expires, type
    FROM sessions
    WHERE account_id = ? AND type = ?    
    `).all(accountId, type) as RawSession[]

    return rawResult.map(raw => buildSession(raw))
}

/**
 * Returns all of the sessions of a particular type belonging to an account.
 * 
 * @param accountId The ID of the account to get the sessions of.
 * @param type The type of session to get.
 * @returns A promise that resolves with an array of sessions.
 */
export function getAccountSessionsOfType(
    accountId: number,
    type: SessionType
): Promise<Session[]> {
    return new Promise<Session[]>((resolve, reject) => {
        try {
            resolve(getAccountSessionsOfTypeSync(accountId, type))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Synchronously inserts a session into the database that already has a token.
 * 
 * @param session The session to insert.
 */
function insertSessionWithTokenSync(
    session: Session
): Session {
    db.prepare(`
    INSERT INTO sessions (token, account_id, expires, type)
    VALUES (?, ?, ?, ?)    
    `).run(
        session.token,
        session.accountId,
        session.expires.toISOString(),
        session.type
    )

    return session
}

/**
 * Synchronously inserts a session into the database that already has a token.
 * 
 * @param session The session to insert.
 * @returns A promise that resolves with the session that was inserted.
 */
export function insertSessionWithToken(
    session: Session
): Promise<Session> {
    return new Promise<Session>((resolve, reject) => {
        try {
            resolve(insertSessionWithTokenSync(session))
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

    const completeSession = session as Session
    completeSession.token = token
    return insertSessionWithTokenSync(completeSession)
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
    db.prepare(`DELETE FROM sessions WHERE account_id = ?`).run(playerId)
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

/**
 * Synchronously deletes all of an account's sessions of a particular type.
 * 
 * @param accountId The ID of the account to delete the sessions of.
 * @param type The type of session to delete.
 */
function deleteAccountSessionsOfTypeSync(
    accountId: number,
    type: SessionType
) {
    db.prepare(`
    DELETE FROM sessions
    WHERE account_id = ? AND type = ?
    `).run(accountId, type)
}

/**
 * Deletes all of an account's sessions of a particular type.
 * 
 * @param accountId The ID of the account to delete the sessions of.
 * @param type The type of session to delete.
 * @returns A promise that resolves when the sessions are deleted.
 */
export function deleteAccountSessionsOfType(
    accountId: number,
    type: SessionType
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            resolve(deleteAccountSessionsOfTypeSync(accountId, type))
        } catch (error) {
            reject(error)
        }
    })
}

export function generateViewerIdSession(
    accountId: number
): Promise<Session> {
    return new Promise<Session>((resolve, reject) => {
        try {
            // delete any existing viewer ID sessions
            deleteAccountSessionsOfTypeSync(accountId, SessionType.VIEWER)

            // insert new session
            resolve(insertSessionWithTokenSync({
                token: generateViewerId().toString(),
                expires: new Date(new Date().getTime()),
                accountId: accountId,
                type: SessionType.VIEWER
            }))
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
export function getPlayerDailyChallengePointListSync(
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
 * Inserts a singular DailyChallengePointListEntry into the database.
 * 
 * @param playerId The ID of the player.
 * @param entry The entry to insert.
 */
function insertPlayerDailyChallengePointListEntrySync(
    playerId: number,
    entry: DailyChallengePointListEntry
) {
    const id = entry.id

    // insert into the list entry table
    db.prepare(`
    INSERT INTO daily_challenge_point_list_entries (id, point, player_id)
    VALUES (?, ?, ?)
    `).run(
        id,
        entry.point,
        playerId
    )

    // insert campaigns
    for (const campaign of entry.campaignList) {
        db.prepare(`
        INSERT INTO daily_challenge_point_list_campaigns (campaign_id, additional_point, list_entry_id, player_id)
        VALUES (?, ?, ?, ?)
        `).run(
            campaign.campaignId,
            campaign.additionalPoint,
            id,
            playerId
        )
    }
}

/**
 * Batch inserts a list of DailyChallengePointListEntries into the database.
 * 
 * @param playerId The ID of the player.
 * @param entries The entries to insert.
 */
function insertPlayerDailyChallengePointListSync(
    playerId: number,
    entries: DailyChallengePointListEntry[]
) {
    db.transaction(() => {
        for (const entry of entries) {
            insertPlayerDailyChallengePointListEntrySync(playerId, entry)
        }
    })()
}

/**
 * Gets a player's triggered tutorials.
 * 
 * @param playerId The ID of the player to get the triggered tutorials of.
 * @returns A list of the IDs of each triggered tutorial.
 */
export function getPlayerTriggeredTutorialsSync(
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
 * Marks a tutorial as having been triggered by a player.
 * 
 * @param playerId The ID of the player that triggered the tutorial.
 * @param tutorialId The ID of the tutorial that was triggered.
 */
export function insertPlayerTriggeredTutorialSync(
    playerId: number,
    tutorialId: number
) {
    db.prepare(`
    INSERT INTO players_triggered_tutorials (id, player_id)
    VALUES (?, ?)
    `).run(tutorialId, playerId)
}

/**
 * Batch marks tutorials as having been triggered by a player.
 * 
 * @param playerId The ID of the player that triggered the tutorials.
 * @param tutorialIds An array of tutorial IDs which were triggered.
 */
function insertPlayerTriggeredTutorialsSync(
    playerId: number,
    tutorialIds: number[]
) {
    db.transaction(() => {
        for (const tutorialId of tutorialIds) {
            insertPlayerTriggeredTutorialSync(playerId, tutorialId)
        }
    })()
}

/**
 * Retrieve a list of a player's cleared regular missions.
 * 
 * @param playerId The ID of the player.
 * @returns A record, where the index is the id of the mission and the value is ???.
 */
export function getPlayerClearedRegularMissionListSync(
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
 * Sets a regular mission as having been cleared by a player.
 * 
 * @param playerId The ID of the player.
 * @param missionId The ID of the mission that was cleared.
 * @param value 
 */
function insertPlayerClearedRegularMissionSync(
    playerId: number,
    missionId: number | string,
    value: number
) {
    db.prepare(`
    INSERT INTO players_cleared_regular_missions (id, value, player_id)
    VALUES (?, ?, ?)
    `).run(
        Number(missionId),
        value,
        playerId
    )
}

/**
 * Sets a list of regular missions as having been cleared by a player.
 * 
 * @param playerId The ID of the player.
 * @param missionList The list of missions that were cleared.
 */
function insertPlayerClearedRegularMissionListSync(
    playerId: number,
    missionList: Record<string, number>
) {
    db.transaction(() => {
        for (const [missionId, value] of Object.entries(missionList)) {
            insertPlayerClearedRegularMissionSync(playerId, missionId, value)
        }
    })()
}

/**
 * Converts a RawPlayerCharacterBondToken into a PlayerCharacterBondToken
 * 
 * @param rawBondToken The raw bond token to build/deserialize
 * @returns The built/deserialized PlayerCharacterBondToken
 */
function buildCharacterBondToken(
    rawBondToken: RawPlayerCharacterBondToken
): PlayerCharacterBondToken {
    return {
        manaBoardIndex: rawBondToken.mana_board_index,
        status: rawBondToken.status
    }
}

/**
 * Builds a PlayerCharacterExBoost object.
 * 
 * @param exBoostStatusId The ex boost's status ID
 * @param exBoostAbilityIdList The serialized string representing the ex boost's ability id list.
 * @returns A PlayerCharacterExBoost object or undefined.
 */
function buildPlayerCharacterExBoost(
    exBoostStatusId: number | null,
    exBoostAbilityIdList: string | null
): PlayerCharacterExBoost | undefined {
    if (exBoostStatusId === null || exBoostAbilityIdList === null) return undefined
    return {
        statusId: exBoostStatusId,
        abilityIdList: deserializeNumberList(exBoostAbilityIdList)
    }
}

/**
 * Converts a RawPlayerCharacter into a PlayerCharacter
 * 
 * @param rawCharacter The RawPlayerCharacter to convert.
 * @param bondTokens The character's bond tokens
 * @returns The converted PlayerCharacter
 */
function buildPlayerCharacter(
    rawCharacter: RawPlayerCharacter,
    bondTokens: PlayerCharacterBondToken[]
): PlayerCharacter {
    return {
        entryCount: rawCharacter.entry_count,
        evolutionLevel: rawCharacter.evolution_level,
        overLimitStep: rawCharacter.over_limit_step,
        protection: deserializeBoolean(rawCharacter.protection),
        joinTime: new Date(rawCharacter.join_time),
        updateTime: new Date(rawCharacter.update_time),
        exp: rawCharacter.exp,
        stack: rawCharacter.stack,
        manaBoardIndex: rawCharacter.mana_board_index,
        exBoost: buildPlayerCharacterExBoost(rawCharacter.ex_boost_status_id, rawCharacter.ex_boost_ability_id_list),
        illustrationSettings: rawCharacter.illustration_settings === null ? undefined : deserializeNumberList(rawCharacter.illustration_settings),
        bondTokenList: bondTokens
    }
}

/**
 * Checks whether a player owns a given character or not.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @returns A boolean, stating whether the player owns the character.
 */
export function playerOwnsCharacterSync(
    playerId: number,
    characterId: number
): boolean {
    return db.prepare(`
    SELECT id
    FROM players_characters
    WHERE player_id = ? AND id = ?
    `).get(playerId, characterId) !== undefined
}

/**
 * Gets a singular character from a player's data.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @returns The PlayerCharacter or null if it doesn't exist.
 */
export function getPlayerCharacterSync(
    playerId: number,
    characterId: number
): PlayerCharacter | null {

    const rawCharacter = db.prepare(`
    SELECT id, entry_count, evolution_level, over_limit_step, protection,
        join_time, update_time, exp, stack, mana_board_index, ex_boost_status_id,
        ex_boost_ability_id_list, illustration_settings
    FROM players_characters
    WHERE player_id = ? AND id = ?
    `).get(playerId, characterId) as RawPlayerCharacter

    if (rawCharacter === undefined) return null

    // get bond tokens
    const rawBondTokens = db.prepare(`
    SELECT mana_board_index, status, character_id
    FROM players_characters_bond_tokens
    WHERE player_id = ? AND character_id = ?
    `).all(playerId, characterId) as RawPlayerCharacterBondToken[]

    return buildPlayerCharacter(
        rawCharacter,
        rawBondTokens.map(raw => buildCharacterBondToken(raw))
    )
}

/**
 * Gets a list of all of the characters that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A list of the characters that the player owns.
 */
export function getPlayerCharactersSync(
    playerId: number
): Record<string, PlayerCharacter> {

    const rawCharacters = db.prepare(`
    SELECT id, entry_count, evolution_level, over_limit_step, protection,
        join_time, update_time, exp, stack, mana_board_index, ex_boost_status_id,
        ex_boost_ability_id_list, illustration_settings
    FROM players_characters
    WHERE player_id = ?
    `).all(playerId) as RawPlayerCharacter[]

    // get bond tokens
    const rawBondTokens = db.prepare(`
    SELECT mana_board_index, status, character_id
    FROM players_characters_bond_tokens
    WHERE player_id = ?
    `).all(playerId) as RawPlayerCharacterBondToken[]

    const bondBuckets: Record<string, PlayerCharacterBondToken[]> = {}

    for (const rawBondToken of rawBondTokens) {
        const characterId = rawBondToken.character_id.toString()
        let bucket = bondBuckets[characterId]
        if (!bucket) {
            bucket = []
            bondBuckets[characterId] = bucket
        }

        bucket.push(buildCharacterBondToken(rawBondToken))
    }

    const out: Record<string, PlayerCharacter> = {}

    for (const rawCharacter of rawCharacters) {
        const id = rawCharacter.id.toString()
        out[id] = buildPlayerCharacter(
            rawCharacter,
            bondBuckets[id] || []
        )
    }

    return out
}

/**
 * Inserts a single character's bond token into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @param bondToken The bond token to insert.
 */
function insertPlayerCharacterBondTokenSync(
    playerId: number,
    characterId: number | string,
    bondToken: PlayerCharacterBondToken
) {
    db.prepare(`
    INSERT INTO players_characters_bond_tokens (mana_board_index, status, player_id, character_id)
    VALUES (?, ?, ?, ?)
    `).run(
        bondToken.manaBoardIndex,
        bondToken.status,
        playerId,
        Number(characterId)
    )
}

/**
 * Updates a player's character's bond token.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @param bondToken The updated bondToken.
 */
export function updatePlayerCharacterBondTokenSync(
    playerId: number,
    characterId: number | string,
    bondToken: PlayerCharacterBondToken
) {
    db.prepare(`
    UPDATE players_characters_bond_tokens
    SET status = ?
    WHERE player_id = ? AND character_id = ?
    `).run(
        bondToken.status,
        playerId,
        Number(characterId)
    )
}

/**
 * Inserts a single character into a player's inventory.
 * 
 * @param playerId The ID of the player to add the character to.
 * @param characterId The ID of the character to add.
 * @param character The character data.
 */
export function insertPlayerCharacterSync(
    playerId: number,
    characterId: number | string,
    character: PlayerCharacter
) {
    // insert into characters table
    db.prepare(`
    INSERT INTO players_characters (id, entry_count, evolution_level, over_limit_step, 
        protection, join_time, update_time, exp, stack, mana_board_index, player_id,
        ex_boost_status_id, ex_boost_ability_id_list, illustration_settings)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        Number(characterId),
        character.entryCount,
        character.evolutionLevel,
        character.overLimitStep,
        serializeBoolean(character.protection),
        character.joinTime.toISOString(),
        character.updateTime.toISOString(),
        character.exp,
        character.stack,
        character.manaBoardIndex,
        playerId,
        character.exBoost?.statusId === undefined ? null : character.exBoost.statusId,
        character.exBoost?.abilityIdList === undefined ? null : serializeNumberList(character.exBoost.abilityIdList),
        character.illustrationSettings === undefined ? null : serializeNumberList(character.illustrationSettings)
    )

    // insert mana board nodes
    for (const token of character.bondTokenList) {
        insertPlayerCharacterBondTokenSync(playerId, characterId, token)
    }
}

/**
 * Inserts a default single character into a player's inventory.
 * 
 * @param playerId The ID of the player to add the character to.
 * @param characterId The ID of the character to add.
 */
export function insertDefaultPlayerCharacterSync(
    playerId: number,
    characterId: number | string
) {
    const dateNow = new Date()

    insertPlayerCharacterSync(
        playerId,
        characterId,
        {
            entryCount: 1,
            evolutionLevel: 0,
            overLimitStep: 0,
            protection: false,
            joinTime: dateNow,
            updateTime: dateNow,
            exp: 0,
            stack: 0,
            manaBoardIndex: 1,
            bondTokenList: [
                {
                    manaBoardIndex: 1,
                    status: 0
                },
                {
                    manaBoardIndex: 2,
                    status: 0
                }
            ]
        }
    )
}

/**
 * Batch inserts a record of characters into a player's inventory.
 * 
 * @param playerId The ID of the player.
 * @param characters The record of characters to insert.
 */
function insertPlayerCharactersSync(
    playerId: number,
    characters: Record<string, PlayerCharacter>
) {
    db.transaction(() => {
        for (const [characterId, data] of Object.entries(characters)) {
            insertPlayerCharacterSync(playerId, characterId, data)
        }
    })()
}

/**
 * Updates a single character within a player's data.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @param character The partial data of the character to update.
 */
export function updatePlayerCharacterSync(
    playerId: number,
    characterId: number,
    character: Partial<PlayerCharacter>
) {
    const fieldMap: Record<string, string> = {
        'entryCount': 'entry_count',
        'evolutionLevel': 'evolution_level',
        'overLimitStep': 'over_limit_step',
        'protection': 'protection',
        'joinTime': 'join_time',
        'updateTime': 'update_time',
        'exp': 'exp',
        'stack': 'stack',
        'manaBoardIndex': 'mana_board_index'
    }

    // set the update time to now
    character.updateTime = new Date()

    const sets: string[] = []
    const values: any[] = []
    for (const key in character) {
        const value = character[key as keyof PlayerCharacter]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (value instanceof Date) {
                values.push(value.toISOString())
            } else if (typeof (value) === "boolean") {
                values.push(serializeBoolean(value))
            } else {
                values.push(value)
            }
        }
    }

    const exBoost = character.exBoost
    if (exBoost !== undefined) {
        sets.push('ex_boost_status_id = ?')
        sets.push('ex_boost_ability_id_list = ?')
        values.push(exBoost.statusId)
        values.push(serializeNumberList(exBoost.abilityIdList))
    }

    const illustration_settings = character.illustrationSettings
    if (illustration_settings !== undefined) {
        sets.push('illustration_settings = ?')
        values.push(serializeNumberList(illustration_settings))
    }

    if (sets.length > 0) db.prepare(`
        UPDATE players_characters
        SET ${sets.join(', ')}
        WHERE id = ? AND player_id = ?
        `).run([...values, characterId, playerId]);
}

/**
 * Retrieves the mana node statuses of a player's characters.
 * 
 * @param playerId The ID of the player.
 * @returns A record containing the statuses of the player's characters.
 */
export function getPlayerCharactersManaNodesSync(
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
 * Gets all of the mana nodes that a player has unlocked for a specific character.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @returns A list of unlocked mana node ids.
 */
export function getPlayerCharacterManaNodesSync(
    playerId: number,
    characterId: number
): number[] {
    const rawNodes = db.prepare(`
    SELECT value, character_id
    FROM players_characters_mana_nodes
    WHERE character_id = ? AND player_id = ?
    `).all(characterId, playerId) as RawPlayerCharacterManaNode[]

    return rawNodes.map(rawNode => rawNode.value);
}

/**
 * Checks whether a player has unlocked a specific mana node.
 * 
 * @param playerId The ID of the player to check.
 * @param characterId The ID of the character.
 * @param manaNodeId The ID of the mana node.
 * @returns Whether the specified mana node has been unlocked or not.
 */
export function hasPlayerUnlockedCharacterManaNodeSync(
    playerId: number,
    characterId: number,
    manaNodeId: string | number
): boolean {
    return db.prepare(`
    SELECT value
    FROM players_characters_mana_nodes
    WHERE player_id = ? AND character_id = ? AND value = ?
    `).get(playerId, characterId, Number(manaNodeId)) !== undefined
}

/**
 * Inserts mana nodes for a particular character into the database.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character to insert the mana nodes of.
 * @param manaNodes The mana nodes values to insert.
 */
export function insertPlayerCharacterManaNodesSync(
    playerId: number,
    characterId: number | string,
    manaNodes: number[]
) {
    for (const node of manaNodes) {
        db.prepare(`
        INSERT INTO players_characters_mana_nodes (value, character_id, player_id)
        VALUES (?, ?, ?)
        `).run(
            node,
            Number(characterId),
            playerId
        )
    }
}

/**
 * Batch inserts a record of characters' mana nodes into the database.
 * 
 * @param playerId The ID of the player.
 * @param charactersManaNodes The record of character mana node values.
 */
function insertPlayerCharactersManaNodesSync(
    playerId: number,
    charactersManaNodes: Record<string, number[]>
) {
    db.transaction(() => {
        for (const [characterId, manaNodes] of Object.entries(charactersManaNodes)) {
            insertPlayerCharacterManaNodesSync(playerId, characterId, manaNodes)
        }
    })()
}

/**
 * Fetches a player's party group layout.
 * 
 * @param playerId The ID of the player.
 * @returns The data for each of the player's parties.
 */
export function getPlayerPartyGroupListSync(
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
            edited: deserializeBoolean(rawParty.edited),
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
 * Inserts a single party into the database.
 * 
 * @param playerId The player's ID.
 * @param slot The party's slot number.
 * @param groupId The group that the party belongs to.
 * @param party The party data.
 */
function insertPlayerPartySync(
    playerId: number,
    slot: number | string,
    groupId: number | string,
    party: PlayerParty
) {
    db.prepare(`
    INSERT INTO players_parties (slot, name, character_id_1, character_id_2, character_id_3, 
        unison_character_1, unison_character_2, unison_character_3, equipment_1, equipment_2,
        equipment_3, ability_soul_1, ability_soul_2, ability_soul_3, edited, player_id, group_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        Number(slot),
        party.name,
        party.characterIds[0] || null,
        party.characterIds[1] || null,
        party.characterIds[2] || null,
        party.unisonCharacterIds[0] || null,
        party.unisonCharacterIds[1] || null,
        party.unisonCharacterIds[2] || null,
        party.equipmentIds[0] || null,
        party.equipmentIds[1] || null,
        party.equipmentIds[2] || null,
        party.abilitySoulIds[0] || null,
        party.abilitySoulIds[1] || null,
        party.abilitySoulIds[2] || null,
        serializeBoolean(party.edited),
        playerId,
        Number(groupId)
    )
}

/**
 * Inserts a player party group into the database.
 * 
 * @param playerId The player's ID.
 * @param groupId The ID of the group.
 * @param group The group data.
 */
function insertPlayerPartyGroupSync(
    playerId: number,
    groupId: number | string,
    group: PlayerPartyGroup
) {
    // insert the group data
    db.prepare(`
    INSERT INTO players_party_groups (id, color_id, player_id)
    VALUES (?, ?, ?)
    `).run(
        Number(groupId),
        group.colorId,
        playerId
    )

    // insert the parties
    for (const [slot, party] of Object.entries(group.list)) {
        insertPlayerPartySync(playerId, slot, groupId, party)
    }
}

/**
 * Batch inserts a record of PlayerPartyGroups into the database.
 * 
 * @param playerId The ID of the player.
 * @param groups The record of groups to insert.
 */
function insertPlayerPartyGroupListSync(
    playerId: number,
    groups: Record<string, PlayerPartyGroup>
) {
    db.transaction(() => {
        for (const [groupId, group] of Object.entries(groups)) {
            insertPlayerPartyGroupSync(playerId, groupId, group)
        }
    })()
}

/**
 * Updates a singular party within a player's data.
 * 
 * @param playerId The ID of the player.
 * @param slot The slot of the party to update.
 * @param party The party data to update.
 */
export function updatePlayerPartySync(
    playerId: number,
    slot: number,
    party: PlayerParty
) {
    db.prepare(`
    UPDATE players_parties
    SET name = ?,
        character_id_1 = ?,
        character_id_2 = ?,
        character_id_3 = ?,
        unison_character_1 = ?,
        unison_character_2 = ?,
        unison_character_3 = ?,
        equipment_1 = ?,
        equipment_2 = ?,
        equipment_3 = ?,
        ability_soul_1 = ?,
        ability_soul_2 = ?,
        ability_soul_3 = ?,
        edited = ?
    WHERE slot = ? AND player_id = ?
    `).run(
        party.name,
        party.characterIds[0],
        party.characterIds[1],
        party.characterIds[2],
        party.unisonCharacterIds[0],
        party.unisonCharacterIds[1],
        party.unisonCharacterIds[2],
        party.equipmentIds[0],
        party.equipmentIds[1],
        party.equipmentIds[2],
        party.abilitySoulIds[0],
        party.abilitySoulIds[1],
        party.abilitySoulIds[2],
        serializeBoolean(party.edited),
        slot,
        playerId
    )
}

export function updatePlayerPartyGroupSync(
    playerId: number,
    groupId: number,
    colorId: number
) {
    db.prepare(`
    UPDATE players_party_groups
    SET color_id = ?
    WHERE id = ? AND player_id = ?
    `).run(
        colorId,
        groupId,
        playerId
    )
}

/**
 * Gets the amount of a singular item that a player owns.
 * 
 * @param playerId The ID of the player.
 * @param itemId The ID of the item.
 * @returns The amount of the item that the player owns, or null, indicating no ownership.
 */
export function getPlayerItemSync(
    playerId: number,
    itemId: number | string
): number | null {
    const rawItem = db.prepare(`
    SELECT id, amount
    FROM players_items
    WHERE player_id = ? AND id = ?
    `).get(playerId, Number(itemId)) as RawPlayerItem | undefined

    return rawItem === undefined ? null : rawItem.amount
}

/**
 * Gets the items that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A record where the index is the item's ID and the value is the item's amount.
 */
export function getPlayerItemsSync(
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
 * Inserts a singular item into the player's inventory.
 * 
 * @param playerId The ID of the player.
 * @param itemId The ID of the item to insert.
 * @param amount The amount of the item to insert.
 */
function insertPlayerItemSync(
    playerId: number,
    itemId: number | string,
    amount: number
) {
    db.prepare(`
    INSERT INTO players_items (id, amount, player_id)
    VALUES (?, ?, ?)
    `).run(
        Number(itemId),
        amount,
        playerId
    )
}

/**
 * Batch inserts a record of player items into a player's inventory.
 * 
 * @param playerId The ID of the player.
 * @param items The record of items.
 */
function insertPlayerItemsSync(
    playerId: number,
    items: Record<string, number>
) {
    db.transaction(() => {
        for (const [itemId, amount] of Object.entries(items)) {
            insertPlayerItemSync(playerId, itemId, amount)
        }
    })()
}

/**
 * Updates a player's item's amount.
 * 
 * @param playerId The ID of the player.
 * @param itemId The item's ID.
 * @param amount The new amount the item should have.
 */
export function updatePlayerItemSync(
    playerId: number,
    itemId: string | number,
    amount: number
) {
    db.prepare(`
    UPDATE players_items
    SET amount = ?
    WHERE player_id = ? AND id = ?
    `).run(amount, playerId, Number(itemId))
}

/**
 * Gives a player giveAmount of an item.
 * 
 * @param playerId The ID of the player.
 * @param itemId The ID of the item.
 * @param giveAmount The amount of the item to give.
 * @returns The new total amount of the item that the player owns.
 */
export function givePlayerItemSync(
    playerId: number,
    itemId: string | number,
    giveAmount: number
): number {
    // check if the player owns the item
    const ownedAmount = getPlayerItemSync(playerId, itemId)
    if (ownedAmount === null) {
        insertPlayerItemSync(playerId, itemId, giveAmount)
        return giveAmount
    } else {
        const newAmount = ownedAmount + giveAmount
        updatePlayerItemSync(
            playerId,
            itemId,
            newAmount
        )
        return newAmount
    }
}

/**
 * Converts a RawPlayerEquipment object into a PlayerEquipment object.
 * 
 * @param rawEquipment The raw equipment to deserialize.
 * @returns A deserialized PlayerEquipment object.
 */
function buildPlayerEquipment(
    rawEquipment: RawPlayerEquipment
): PlayerEquipment {
    return {
        level: rawEquipment.level,
        enhancementLevel: rawEquipment.enhancement_level,
        protection: deserializeBoolean(rawEquipment.protection),
        stack: rawEquipment.stack,
    }
}

/**
 * Retrieves all of the equipment that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A record where the index is the equipment's ID and the value is its data.
 */
export function getPlayerEquipmentListSync(
    playerId: number
): Record<string, PlayerEquipment> {

    const rawEquipment = db.prepare(`
    SELECT id, level, enhancement_level, protection, stack
    FROM players_equipment
    WHERE player_id = ?
    `).all(playerId) as RawPlayerEquipment[]

    const final: Record<string, PlayerEquipment> = {}

    for (const raw of rawEquipment) {
        final[raw.id.toString()] = buildPlayerEquipment(raw)
    }

    return final
}

/**
 * Gets the data for a single piece of equipment from a player's inventory.
 * 
 * @param playerId The player's ID.
 * @param equipmentId The ID of the equipment to get the data of.
 * @returns If the equipment was found, returns a PlayerEquipment object. Otherwise, returns null.
 */
export function getPlayerEquipmentSync(
    playerId: number,
    equipmentId: number | string
): PlayerEquipment | null {

    const rawEquipment = db.prepare(`
    SELECT id, level, enhancement_level, protection, stack
    FROM players_equipment
    WHERE player_id = ? AND id = ?
    `).get(playerId, Number(equipmentId)) as RawPlayerEquipment | undefined

    return rawEquipment === undefined ? null : buildPlayerEquipment(rawEquipment)
}

/**
 * Checks whether a player owns a given equipment or not.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character.
 * @returns A boolean, stating whether the player owns the character.
 */
export function playerOwnsEquipmentSync(
    playerId: number,
    equipmentId: number
): boolean {
    return db.prepare(`
    SELECT id
    FROM players_equipment
    WHERE id = ? AND player_id = ?
    `).get(equipmentId, playerId) !== undefined
}

/**
 * Inserts a singular equipment into a player's inventory.
 * 
 * @param playerId The ID of the player.
 * @param equipmentId The ID of the equipment to insert.
 * @param equipment The equipment's data.
 */
export function insertPlayerEquipmentSync(
    playerId: number,
    equipmentId: string | number,
    equipment: PlayerEquipment
) {
    db.prepare(`
    INSERT INTO players_equipment (id, level, enhancement_level, protection, stack, player_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        Number(equipmentId),
        equipment.level,
        equipment.enhancementLevel,
        serializeBoolean(equipment.protection),
        equipment.stack,
        playerId
    )
}

/**
 * Batch inserts a record of equipment into a player's inventory.
 * 
 * @param playerId The ID of the player.
 * @param equipment The record of equipment.
 */
function insertPlayerEquipmentListSync(
    playerId: number,
    equipment: Record<string, PlayerEquipment>
) {
    db.transaction(() => {
        for (const [equipmentId, data] of Object.entries(equipment)) {
            insertPlayerEquipmentSync(playerId, equipmentId, data)
        }
    })()
}

/**
 * Updates a piece of a player's equipment.
 * 
 * @param playerId The ID of the player.
 * @param equipmentId The ID of the equipment to update.
 * @param equipment A partial with the values to change inside of it.
 */
export function updatePlayerEquipmentSync(
    playerId: number,
    equipmentId: string | number,
    equipment: Partial<PlayerEquipment>
) {
    const fieldMap: Record<string, string> = {
        'level': 'level',
        'enhancementLevel': 'enhancement_level',
        'protection': 'protection',
        'stack': 'stack'
    }

    const sets: string[] = []
    const values: any[] = []
    for (const key in equipment) {
        const value = equipment[key as keyof PlayerEquipment]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (typeof (value) === "boolean") {
                values.push(serializeBoolean(value))
            } else {
                values.push(value)
            }
        }
    }

    if (sets.length > 0) db.prepare(`
        UPDATE players_equipment
        SET ${sets.join(', ')}
        WHERE id = ? AND player_id = ?
        `).run([...values, Number(equipmentId), playerId]);
}

/**
 * Converts a RawPlayerQuestProgress object into a PlayerQuestProgress object.
 * 
 * @param raw The raw object to convert.
 * @returns The converted object.
 */
function buildPlayerQuestProgress(
    raw: RawPlayerQuestProgress
): PlayerQuestProgress {
    return {
        questId: raw.quest_id,
        finished: deserializeBoolean(raw.finished),
        highScore: raw.high_score,
        clearRank: raw.clear_rank,
        bestElapsedTimeMs: raw.best_elapsed_time_ms
    }
}

/**
 * Gets a player's overall quest progressfrom the database.
 * 
 * @param playerId The player's ID.
 * @returns A record where the index is the section and the value is a list of PlayerQuestProgress.
 */
export function getPlayerQuestProgressSync(
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
        bucket.push(buildPlayerQuestProgress(raw))
    }

    return mapped
}

/**
 * Gets the progress of a singular quest for a player..
 * 
 * @param playerId The ID of the player.
 * @param section The section of the quest.
 * @param questId The ID of the quest.
 * @returns The quest's progress data, or null if it doesn't exist.
 */
export function getPlayerSingleQuestProgressSync(
    playerId: number,
    section: number | string,
    questId: number | string
): PlayerQuestProgress | null {

    const rawProgress = db.prepare(`
    SELECT section, quest_id, finished, high_score, clear_rank, best_elapsed_time_ms
    FROM players_quest_progress
    WHERE player_id = ? AND section = ? AND quest_id = ?
    `).get(playerId, Number(section), Number(questId)) as RawPlayerQuestProgress

    if (rawProgress === undefined) return null;

    return buildPlayerQuestProgress(rawProgress)
}

/**
 * Inserts a singular quest progress into the database.
 * 
 * @param playerId The ID of the player.
 * @param section The section that this quest progress belongs to.
 * @param data The data of this quest progress.
 */
export function insertPlayerQuestProgressSync(
    playerId: number,
    section: number | string,
    data: PlayerQuestProgress
) {
    db.prepare(`
    INSERT INTO players_quest_progress (section, quest_id, finished, high_score, clear_rank, best_elapsed_time_ms, player_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        Number(section),
        data.questId,
        serializeBoolean(data.finished),
        data.highScore || null,
        data.clearRank || null,
        data.bestElapsedTimeMs || null,
        playerId
    )
}

/**
 * Batch inserts a record of quest progress into the database.
 * 
 * @param playerId The player's ID.
 * @param progressList The record of quest progress.
 */
function insertPlayerQuestProgressListSync(
    playerId: number,
    progressList: Record<string, PlayerQuestProgress[]>
) {
    db.transaction(() => {
        for (const [section, progresses] of Object.entries(progressList)) {
            for (const progress of progresses) {
                insertPlayerQuestProgressSync(playerId, section, progress)
            }
        }
    })()
}

/**
 * Updates the progress for a single player's quest.
 * 
 * @param playerId The ID of the player.
 * @param section The section that the quest belongs to.
 * @param data The partial data of the quest progress to update.
 */
export function updatePlayerQuestProgressSync(
    playerId: number,
    section: number | string,
    data: Partial<PlayerQuestProgress> & Pick<PlayerQuestProgress, 'questId'>
) {
    const fieldMap: Record<string, string> = {
        'finished': 'finished',
        'highScore': 'high_score',
        'clearRank': 'clear_rank',
        'bestElapsedTimeMs': 'best_elapsed_time_ms'
    }

    const sets: string[] = []
    const values: any[] = []
    for (const key in data) {
        const value = data[key as keyof PlayerQuestProgress]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (typeof (value) === "boolean") {
                values.push(serializeBoolean(value))
            } else {
                values.push(value)
            }
        }
    }

    if (sets.length > 0) db.prepare(`
        UPDATE players_quest_progress
        SET ${sets.join(', ')}
        WHERE section = ? AND quest_id = ? AND player_id = ?
        `).run([...values, Number(section), data.questId, playerId]);
}

/**
 * Converts a RawPlayerGachaInfo object into a PlayerGachaInfo object.
 * 
 * @param rawInfo The raw object to convert.
 * @returns The converted object.
 */
function buildPlayerGachaInfo(
    rawInfo: RawPlayerGachaInfo
): PlayerGachaInfo {
    return {
        gachaId: rawInfo.gacha_id,
        isDailyFirst: deserializeBoolean(rawInfo.is_daily_first),
        isAccountFirst: deserializeBoolean(rawInfo.is_account_first),
        gachaExchangePoint: rawInfo.gacha_exchange_point
    }
}

/**
 * Retrieves the status of various gacha banners for the player.
 * 
 * @param playerId The ID of the player.
 * @returns A list of PlayerGachaInfo.
 */
export function getPlayerGachaInfoListSync(
    playerId: number
): PlayerGachaInfo[] {
    const rawInfo = db.prepare(`
    SELECT gacha_id, is_daily_first, is_account_first, gacha_exchange_point
    FROM players_gacha_info
    WHERE player_id = ?
    `).all(playerId) as RawPlayerGachaInfo[]

    return rawInfo.map(raw => {
        return buildPlayerGachaInfo(raw)
    })
}

/**
 * Gets an individual gacha info for a player.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The ID of the gacha.
 * @returns The info that corresponds to the provided gachaId, or null.
 */
export function getPlayerGachaInfoSync(
    playerId: number,
    gachaId: number
): PlayerGachaInfo | null {
    const rawInfo = db.prepare(`
    SELECT gacha_id, is_daily_first, is_account_first, gacha_exchange_point
    FROM players_gacha_info
    WHERE player_id = ? AND gacha_id = ?
    `).get(playerId, gachaId) as RawPlayerGachaInfo

    return rawInfo === undefined ? null : buildPlayerGachaInfo(rawInfo)
}

/**
 * Inserts a singular gacha info into the database for a player.
 * 
 * @param playerId The ID of the player.
 * @param gachaInfo The PlayerGachaInfo data.
 */
export function insertPlayerGachaInfoSync(
    playerId: number,
    gachaInfo: PlayerGachaInfo
) {
    db.prepare(`
    INSERT INTO players_gacha_info (gacha_id, is_daily_first, is_account_first, gacha_exchange_point, player_id)
    VALUES (?, ?, ?, ?, ?)
    `).run(
        gachaInfo.gachaId,
        serializeBoolean(gachaInfo.isDailyFirst),
        serializeBoolean(gachaInfo.isAccountFirst),
        gachaInfo.gachaExchangePoint == undefined ? null : gachaInfo.gachaExchangePoint,
        playerId
    )
}

/**
 * Batch inserts a list of gacha info into the database.
 * 
 * @param playerId The player's ID.
 * @param gachaInfoList The list of of PlayerGachaInfo data.
 */
function insertPlayerGachaInfoListSync(
    playerId: number,
    gachaInfoList: PlayerGachaInfo[]
) {
    db.transaction(() => {
        for (const gachaInfo of gachaInfoList) {
            insertPlayerGachaInfoSync(playerId, gachaInfo)
        }
    })()
}

/**
 * Updates a player's gacha info.
 * 
 * @param playerId The ID of the player.
 * @param gachaInfo The partial PlayerGachaInfo object containing data to update.
 */
export function updatePlayerGachaInfoSync(
    playerId: number,
    gachaInfo: Partial<PlayerGachaInfo>
) {
    const id = gachaInfo.gachaId

    const fieldMap: Record<string, string> = {
        'isDailyFirst': 'is_daily_first',
        'isAccountFirst': 'is_account_first',
        'gachaExchangePoint': 'gacha_exchange_point'
    }

    const sets: string[] = []
    const values: any[] = []
    for (const key in gachaInfo) {
        const value = gachaInfo[key as keyof PlayerGachaInfo]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (typeof (value) === "boolean") {
                values.push(serializeBoolean(value))
            } else {
                values.push(value)
            }
        }
    }

    if (sets.length > 0) db.prepare(`
        UPDATE players_gacha_info
        SET ${sets.join(', ')}
        WHERE gacha_id = ? AND player_id = ?
        `).run([...values, id, playerId]);
}

/**
 * Converts a RawPlayerGachaCampaign into a PlayerGachaCampaign.
 * 
 * @param raw The RawPlayerGachaCampaign to convert.
 * @returns The converted PlayerGachaCampaign.
 */
function buildPlayerGachaCampaign(
    raw: RawPlayerGachaCampaign
): PlayerGachaCampaign {
    return {
        gachaId: raw.gacha_id,
        campaignId: raw.campaign_id,
        count: raw.count
    }
}

/**
 * Gets the status of an individual gacha campaign.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The ID of the gacha.
 * @param campaignId The ID of the gacha campaign.
 * @returns A PlayerGachaCampaign object or null.
 */
export function getPlayerGachaCampaignSync(
    playerId: number,
    gachaId: number,
    campaignId: number,
): PlayerGachaCampaign | null {
    const raw = db.prepare(`
    SELECT gacha_id, campaign_id, count
    FROM players_gacha_campaigns
    WHERE player_id = ? AND gacha_id = ? AND campaign_id = ?
    `).get(playerId, gachaId, campaignId) as RawPlayerGachaCampaign | undefined

    return raw === undefined ? null : buildPlayerGachaCampaign(raw)
}

/**
 * Batch gets a list of player gacha campaigns.
 * 
 * @param playerId The ID of the player.
 * @returns The list of gacha campaigns.
 */
export function getPlayerGachaCampaignListSync(
    playerId: number
): PlayerGachaCampaign[] {
    const rawList = db.prepare(`
    SELECT gacha_id, campaign_id, count
    FROM players_gacha_campaigns
    WHERE player_id = ?
    `).all(playerId) as RawPlayerGachaCampaign[]

    return rawList.map(raw => buildPlayerGachaCampaign(raw))
}

/**
 * Inserts a gacha campaign into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param campaign The campaign to insert.
 */
export function insertPlayerGachaCampaignSync(
    playerId: number,
    campaign: PlayerGachaCampaign
) {
    db.prepare(`
    INSERT INTO players_gacha_campaigns (gacha_id, campaign_id, count, player_id)
    VALUES (?, ?, ?, ?)
    `).run(
        campaign.gachaId,
        campaign.campaignId,
        campaign.count,
        playerId
    )
}

function insertPlayerGachaCampaignListSync(
    playerId: number,
    campaigns: PlayerGachaCampaign[]
) {
    db.transaction(() => {
        for (const campaign of campaigns) {
            insertPlayerGachaCampaignSync(playerId, campaign)
        }
    })()
}

/**
 * Updates a player's gacha campaign.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The ID of the gacha.
 * @param campaignId The ID of the gacha campaign.
 * @param newCount The new count the gacha campaign should have.
 */
export function updatePlayerGachaCampaignSync(
    playerId: number,
    gachaId: number,
    campaignId: number,
    newCount: number
) {
    db.prepare(`
    UPDATE players_gacha_campaigns
    SET count = ?
    WHERE player_id = ? AND gacha_id = ? AND campaign_id = ?
    `).run(
        newCount,
        playerId,
        gachaId,
        campaignId
    )
}

/**
 * Gets a player's drawn quests list.
 * 
 * @param playerId The player's ID.
 * @returns A list of the player's drawn quests.
 */
export function getPlayerDrawnQuestsSync(
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
 * Inserts a singular drawn quest into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param drawnQuest The drawn quest to insert.
 */
function insertPlayerDrawnQuestSync(
    playerId: number,
    drawnQuest: PlayerDrawnQuest
) {
    db.prepare(`
    INSERT INTO players_drawn_quests (category_id, quest_id, odds_id, player_id)
    VALUES (?, ?, ?, ?)    
    `).run(
        drawnQuest.categoryId,
        drawnQuest.questId,
        drawnQuest.oddsId,
        playerId
    )
}

/**
 * Batch inserts a list of drawn quests into the database.
 * 
 * @param playerId The ID of the player.
 * @param drawnQuests The list of drawn quests to insert.
 */
function insertPlayerDrawnQuestsSync(
    playerId: number,
    drawnQuests: PlayerDrawnQuest[]
) {
    db.transaction(() => {
        for (const drawnQuest of drawnQuests) {
            insertPlayerDrawnQuestSync(playerId, drawnQuest)
        }
    })()
}

/**
 * Gets a player's periodic reward point list.
 * 
 * @param playerId The ID of the player.
 * @returns A list of the player's periodic reward points
 */
export function getPlayerPeriodicRewardPointsSync(
    playerId: number
): PlayerPeriodicRewardPoint[] {
    return db.prepare(`
    SELECT id, point
    FROM players_periodic_reward_points
    WHERE player_id = ?
    `).all(playerId) as PlayerPeriodicRewardPoint[]
}

/**
 * Inserts a singular periodic reward point into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param periodicReward The periodic reward point data to insert.
 */
function insertPlayerPeriodicRewardPointsSync(
    playerId: number,
    periodicReward: PlayerPeriodicRewardPoint
) {
    db.prepare(`
    INSERT INTO players_periodic_reward_points (id, point, player_id)
    VALUES (?, ?, ?)
    `).run(
        periodicReward.id,
        periodicReward.point,
        playerId
    )
}

/**
 * Batch inserts a =list of periodic reward points into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param periodicRewards A list of periodic reward points data to insert.
 */
function insertPlayerPeriodicRewardPointsListSync(
    playerId: number,
    periodicRewards: PlayerPeriodicRewardPoint[]
) {
    db.transaction(() => {
        for (const periodicReward of periodicRewards) {
            insertPlayerPeriodicRewardPointsSync(playerId, periodicReward)
        }
    })()
}

/**
 * Retrieves the missions that a player is currently completing.
 * 
 * @param playerId The ID of the player.
 * @returns A record of each mission and its current progress.
 */
export function getPlayerActiveMissionsSync(
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

        bucket[rawStage.id] = deserializeBoolean(rawStage.status)
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
 * Inserts the data for a singular active mission stage into the database.
 * 
 * @param playerId The player's ID.
 * @param stageId The ID of the stage.
 * @param missionId The ID of the mission that this stage belongs to.
 * @param status The status of the stage.
 */
function insertPlayerActiveMissionStageSync(
    playerId: number,
    stageId: number | string,
    missionId: number | string,
    status: boolean
) {
    db.prepare(`
    INSERT INTO players_active_missions_stages (id, status, player_id, mission_id)
    VALUES (?, ?, ?, ?)   
    `).run(
        Number(stageId),
        serializeBoolean(status),
        playerId,
        Number(missionId)
    )
}

/**
 * Inserts a singular active mission into the database.
 * 
 * @param playerId The player's iD>
 * @param missionId The ID of the mission to insert.
 * @param mission The mission's data.
 */
function insertPlayerActiveMissionSync(
    playerId: number,
    missionId: number | string,
    mission: PlayerActiveMission
) {
    db.prepare(`
    INSERT INTO players_active_missions (id, progress, player_id)
    VALUES (?, ?, ?)
    `).run(
        Number(missionId),
        mission.progress,
        playerId
    )

    const stages = mission.stages
    if (stages) {
        for (const [stageId, stage] of Object.entries(stages)) {
            insertPlayerActiveMissionStageSync(playerId, stageId, missionId, stage)
        }
    }
}

/**
 * Batch inserts a record of active missions into the database.
 * 
 * @param playerId The player's ID.
 * @param missions The record of active missions to insert.
 */
function insertPlayerActiveMissionsSync(
    playerId: number,
    missions: Record<string, PlayerActiveMission>
) {
    db.transaction(() => {
        for (const [missionId, mission] of Object.entries(missions)) {
            insertPlayerActiveMissionSync(playerId, missionId, mission)
        }
    })()
}

/**
 * Converts a RawPlayerBoxGacha object into a PlayerBoxGacha object.
 * 
 * @param raw The raw object to convert.
 * @returns The converted object.
 */
function buildPlayerBoxGacha(
    raw: RawPlayerBoxGacha
): PlayerBoxGacha {
    return {
        boxId: raw.box_id,
        resetTimes: raw.reset_times,
        remainingNumber: raw.remaining_number,
        isClosed: deserializeBoolean(raw.is_closed)
    }
}

/**
 * Gets the data for an individual player box gacha.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The ID of the box gacha.
 * @param boxId The ID of the box.
 * @returns A PlayerBoxGacha object or null.
 */
export function getPlayerBoxGachaSync(
    playerId: number,
    gachaId: number,
    boxId: number
): PlayerBoxGacha | null {
    const rawBox = db.prepare(`
    SELECT id, box_id, reset_times, remaining_number, is_closed
    FROM players_box_gacha
    WHERE player_id = ? AND id = ? AND box_id = ?
    `).get(playerId, gachaId, boxId) as RawPlayerBoxGacha

    if (rawBox === undefined) return null;

    return buildPlayerBoxGacha(rawBox)
}

/**
 * Gets a player's box gachas.
 * 
 * @param playerId The ID of the player
 * @returns A record containing the status of the player's box gachas.
 */
export function getPlayerBoxGachasSync(
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
        bucket.push(buildPlayerBoxGacha(rawBox))
    }

    return buckets
}

/**
 * Inserts a singular box gacha into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param gachaId 
 * @param boxGacha The box gacha's data.
 */
export function insertPlayerBoxGachaSync(
    playerId: number,
    gachaId: number | string,
    boxGacha: PlayerBoxGacha
) {
    db.prepare(`
    INSERT INTO players_box_gacha (id, box_id, reset_times, remaining_number, is_closed, player_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        Number(gachaId),
        boxGacha.boxId,
        boxGacha.resetTimes,
        boxGacha.remainingNumber,
        serializeBoolean(boxGacha.isClosed),
        playerId
    )
}

/**
 * Batch inserts a record of box gachas into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param boxGachas The record of box gachas.
 */
function insertPlayerBoxGachasSync(
    playerId: number,
    boxGachas: Record<string, PlayerBoxGacha[]>
) {
    db.transaction(() => {
        for (const [section, list] of Object.entries(boxGachas)) {
            for (const boxGacha of list) {
                insertPlayerBoxGachaSync(playerId, section, boxGacha)
            }
        }
    })()
}

/**
 * Updates a player's box gacha box.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The ID of the box gacha that this box belongs to.
 * @param boxGacha 
 * 
 */
export function updatePlayerBoxGachaSync(
    playerId: number,
    gachaId: number | string,
    boxGacha: Partial<PlayerBoxGacha> & Pick<PlayerBoxGacha, 'boxId'>
) {
    const fieldMap: Record<string, string> = {
        'resetTimes': 'reset_times',
        'remainingNumber': 'remaining_number',
        'isClosed': 'is_closed'
    }

    const sets: string[] = []
    const values: any[] = []
    for (const key in boxGacha) {
        const value = boxGacha[key as keyof PlayerBoxGacha]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (typeof (value) === "boolean") {
                values.push(serializeBoolean(value))
            } else {
                values.push(value)
            }
        }
    }

    if (sets.length > 0) db.prepare(`
        UPDATE players_box_gacha
        SET ${sets.join(', ')}
        WHERE player_id = ? AND id = ? AND box_id = ?
        `).run([
            ...values,
            playerId,
            Number(gachaId),
            boxGacha.boxId
        ]);
}

/**
 * Gets all of the drawn rewards for a specific box gacha & box for a player.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The id of the box gacha.
 * @param boxId The box's ID.
 * @returns A list of drawn rewards.
 */
export function getPlayerBoxGachaDrawnRewardsSync(
    playerId: number,
    gachaId: number,
    boxId: string | number
): PlayerBoxGachaDrawnReward[] {
    return db.prepare(`
    SELECT id, number
    FROM players_box_gacha_drawn_rewards
    WHERE box_id = ? AND gacha_id = ? AND player_id = ?
    `).all(Number(boxId), gachaId, playerId) as PlayerBoxGachaDrawnReward[]
}

/**
 * Inserts a drawn reward for a box gacha.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The id of the box gacha.
 * @param boxId The box's ID.
 * @param reward The reward to insert.
 */
export function insertPlayerBoxGachaDrawnRewardSync(
    playerId: number,
    gachaId: number,
    boxId: string | number,
    reward: PlayerBoxGachaDrawnReward
) {
    db.prepare(`
    INSERT INTO players_box_gacha_drawn_rewards (id, box_id, gacha_id, number, player_id)
    VALUES (?, ?, ?, ?, ?)
    `).run(
        reward.id,
        Number(boxId),
        gachaId,
        reward.number,
        playerId
    )
}

/**
 * Updates a drawn reward for a box gacha.
 * 
 * @param playerId The ID of the player.
 * @param gachaId The id of the box gacha.
 * @param boxId The box's ID.
 * @param rewardId A list of drawn rewards.
 * @param newNumber The new number value the drawn reward should have.
 */
export function updatePlayerBoxGachaDrawnRewardSync(
    playerId: number,
    gachaId: number,
    boxId: string | number,
    rewardId: string | number,
    newNumber: number
) {
    db.prepare(`
    UPDATE players_box_gacha_drawn_rewards
    SET number = ?
    WHERE player_id = ? AND gacha_id = ? AND box_id = ? AND id = ?
    `).run(
        newNumber,
        playerId,
        gachaId,
        Number(boxId),
        Number(rewardId),
    )
}

/**
 * Gets the progress of a player's start dash exchange campaigns.
 * 
 * @param playerId The player's ID.
 * @returns The status of the player's start dash exchange campaigns.
 */
export function getPlayerStartDashExchangeCampaignsSync(
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
 * Inserts a singular player start dash exchange campaign into the database.
 * 
 * @param playerId The player's ID.
 * @param campaign The campaign's data.
 */
function insertPlayerStartDashExchangeCampaignSync(
    playerId: number,
    campaign: PlayerStartDashExchangeCampaign
) {
    db.prepare(`
    INSERT INTO players_start_dash_exchange_campaigns (campaign_id, gacha_id, term_index, status, period_start_time, period_end_time, player_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        campaign.campaignId,
        campaign.gachaId,
        campaign.termIndex,
        campaign.status,
        campaign.periodStartTime.toISOString(),
        campaign.periodEndTime.toISOString(),
        playerId
    )
}

/**
 * Batch inserts a list of start dash exchange campaigns into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param campaigns The list of campaigns to insert.
 */
function insertPlayerStartDashExchangeCampaignsSync(
    playerId: number,
    campaigns: PlayerStartDashExchangeCampaign[]
) {
    db.transaction(() => {
        for (const campaign of campaigns) {
            insertPlayerStartDashExchangeCampaignSync(playerId, campaign)
        }
    })()
}

/**
 * Gets the progress of a player's multi special exchange campaigns.
 * 
 * @param playerId The player's ID.
 * @returns The status of the player's multi special exchange campaigns.
 */
export function getPlayerMultiSpecialExchangeCampaignsSync(
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

/**
 * Inserts a singular multi special exchange campaign into the database.
 * 
 * @param playerId The player's ID.
 * @param campaign The campaign's data.
 */
function insertPlayerMultiSpecialExchangeCampaignSync(
    playerId: number,
    campaign: PlayerMultiSpecialExchangeCampaign
) {
    db.prepare(`
    INSERT INTO players_multi_special_exchange_campaigns (campaign_id, status, player_id)
    VALUES (?, ?, ?)
    `).run(
        campaign.campaignId,
        campaign.status,
        playerId
    )
}

/**
 * Batch inserts a list of multi special exchange campaigns into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param campaigns The list of campaigns to insert.
 */
function insertPlayerMultiSpecialExchangeCampaignsSync(
    playerId: number,
    campaigns: PlayerMultiSpecialExchangeCampaign[]
) {
    db.transaction(() => {
        for (const campaign of campaigns) {
            insertPlayerMultiSpecialExchangeCampaignSync(playerId, campaign)
        }
    })()
}


/**
 * Inserts a player option into the database.
 * 
 * @param playerId The ID of the player.
 * @param key The key of the option.
 * @param value The value of the option
 */
export function insertPlayerOptionSync(
    playerId: number,
    key: string,
    value: boolean
) {
    db.prepare(`
    INSERT INTO players_options (key, value, player_id)
    VALUES (?, ?, ?)
    `).run(
        key,
        serializeBoolean(value),
        playerId
    )
}

/**
 * Batch inserts a record of options into the database.
 * 
 * @param playerId The ID of the player that these options belong to.
 * @param options The record of options to insert.
 */
export function insertPlayerOptionsSync(
    playerId: number,
    options: Record<string, boolean>
) {
    db.transaction(() => {
        for (const [key, value] of Object.entries(options)) {
            insertPlayerOptionSync(playerId, key, value)
        }
    })()
}

/**
 * Gets all of the options that a player has saved.
 * 
 * @param playerId The ID of the player.
 * @returns A record of options.
 */
export function getPlayerOptionsSync(
    playerId: number
): Record<string, boolean> {
    const rawOptions = db.prepare(`
    SELECT key, value
    FROM players_options
    WHERE player_id = ?
    `).all(playerId) as RawPlayerOption[]

    const result: Record<string, boolean> = {}

    for (const rawOption of rawOptions) {
        result[rawOption.key] = deserializeBoolean(rawOption.value)
    }

    return result
}

/**
 * Updates the value of a player option.
 * 
 * @param playerId The ID of the player to update the option of.
 * @param key The key of the option to update.
 * @param value The new value.
 */
export function updatePlayerOptionSync(
    playerId: number,
    key: string,
    value: boolean
) {
    db.prepare(`
    UPDATE players_options
    SET value = ?
    WHERE key = ? AND player_id = ?    
    `).run(serializeBoolean(value), key, playerId)
}

/**
 * Batch updates a player's options.
 * 
 * @param playerId The ID of the player to update the options of.
 * @param options A record of options to update the values of.
 */
export function updatePlayerOptionsSync(
    playerId: number,
    options: Record<string, boolean>
) {
    // get all of a player's options
    const allOptions = getPlayerOptionsSync(playerId)

    db.transaction(() => {
        for (const [key, newValue] of Object.entries(options)) {
            const existingValue = allOptions[key]
            if (existingValue === undefined) {
                // insert the value since it doesn't exist.
                insertPlayerOptionSync(playerId, key, newValue)
            } else if (newValue !== existingValue) {
                // update the value since it's different than the existing value
                updatePlayerOptionSync(playerId, key, newValue)
            }
        }
    })()
}

export function getPlayerFromAccountIdSync(
    accountId: number
): Player | null {
    const response = db.prepare(`
    SELECT id
    FROM players
    WHERE account_id = ?
    `).get(accountId) as { id: number } | undefined

    if (response === undefined) return null

    return getPlayerSync(response.id)
}

/**
 * Gets the account that is tied to an individual player.
 * 
 * @param playerId The ID of the player.
 * @returns The account that is tied to the player.
 */
export function getAccountFromPlayerIdSync(
    playerId: number
): Account | null {
    const raw = db.prepare(`
    SELECT account_id
    FROM players
    WHERE id = ?
    `).get(playerId) as { account_id: number } | undefined

    return raw === undefined ? null : getAccountSync(raw.account_id)
}

/**
 * Converts a RawPlayer into a Player
 * 
 * @param raw The raw player to convert into a player.
 * @returns The converted Player
 */
function buildPlayer(
    raw: RawPlayer
): Player {
    return {
        id: raw.id,
        stamina: raw.stamina,
        staminaHealTime: new Date(raw.stamina_heal_time),
        boostPoint: raw.boost_point,
        bossBoostPoint: raw.boss_boost_point,
        transitionState: raw.transition_state,
        role: raw.role,
        name: raw.name,
        lastLoginTime: new Date(raw.last_login_time),
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
        enableAuto3x: deserializeBoolean(raw.enable_auto_3x),
        tutorialStep: raw.tutorial_step,
        tutorialSkipFlag: raw.tutorial_skip_flag === null ? null : deserializeBoolean(raw.tutorial_skip_flag),
    }
}

export function getPlayerSync(
    playerId: number
): Player | null {
    const raw = db.prepare(`
    SELECT id, stamina, stamina_heal_time, boost_point, boss_boost_point,
        transition_state, role, name, last_login_time, comment,
        vmoney, free_vmoney, rank_point, star_crumb,
        bond_token, exp_pool, exp_pooled_time, leader_character_id, party_slot,
        degree_id, birth, free_mana, paid_mana, enable_auto_3x, tutorial_step, tutorial_skip_flag
    FROM players
    WHERE id = ?    
    `).get(playerId) as RawPlayer | undefined

    if (raw === undefined) return null

    return buildPlayer(raw)
}

export function getAllPlayersSync(
    offset: number = 0,
    limit: number = 25
): Player[] {
    const raw = db.prepare(`
    SELECT id, stamina, stamina_heal_time, boost_point, boss_boost_point,
        transition_state, role, name, last_login_time, comment,
        vmoney, free_vmoney, rank_point, star_crumb,
        bond_token, exp_pool, exp_pooled_time, leader_character_id, party_slot,
        degree_id, birth, free_mana, paid_mana, enable_auto_3x, tutorial_step, tutorial_skip_flag
    FROM players
    LIMIT ?
    OFFSET ?
    `).all(limit, offset) as RawPlayer[]

    return raw.map(rawPlayer => buildPlayer(rawPlayer))
}

/**
 * Inserts a player into the database.
 * 
 * @param accountId The ID of the account that this player is linked to.
 * @param player The player data to insert.
 * @returns The ID of the player that was inserted.
 */
export function insertPlayerSync(
    accountId: number,
    player: Pick<Partial<Player>, 'id'> & Omit<Player, 'id'>,
): number {
    const playerId = player.id
    const playerIdGiven = playerId !== undefined

    const values = [
        player.stamina,
        player.staminaHealTime.toISOString(),
        player.boostPoint,
        player.bossBoostPoint,
        player.transitionState,
        player.role,
        player.name,
        player.lastLoginTime.toISOString(),
        player.comment,
        player.vmoney,
        player.freeVmoney,
        player.rankPoint,
        player.starCrumb,
        player.bondToken,
        player.expPool,
        player.expPooledTime.toISOString(),
        player.leaderCharacterId,
        player.partySlot,
        player.degreeId,
        player.birth,
        player.freeMana,
        player.paidMana,
        serializeBoolean(player.enableAuto3x),
        accountId,
        player.tutorialStep === null ? null : player.tutorialStep,
        player.tutorialSkipFlag === null ? null : serializeBoolean(player.tutorialSkipFlag)
    ]

    if (playerIdGiven)
        values.push(playerId);

    const insert = db.prepare(`
    INSERT INTO players (stamina, stamina_heal_time, boost_point, boss_boost_point,
        transition_state, role, name, last_login_time, comment, vmoney, free_vmoney,
        rank_point, star_crumb, bond_token, exp_pool, exp_pooled_time, leader_character_id,
        party_slot, degree_id, birth, free_mana, paid_mana, enable_auto_3x, account_id, 
        tutorial_step, tutorial_skip_flag${playerIdGiven ? ', id' : ''})
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?${playerIdGiven ? ', ?' : ''})
    `).run(values)

    // return
    return Number(insert.lastInsertRowid)
}

/**
 * Inserts the data from a MergedPlayerData object into the database.
 * 
 * @param toInsert The data to insert into the database.
 * @returns The newly inserted player's id.
 */
export function insertMergedPlayerDataSync(
    accountId: number,
    toInsert: MergedPlayerData
) {
    const player = toInsert.player
    const playerId = player.id
    insertPlayerSync(accountId, player)

    insertPlayerDailyChallengePointListSync(playerId, toInsert.dailyChallengePointList)
    insertPlayerTriggeredTutorialsSync(playerId, toInsert.triggeredTutorial)
    insertPlayerClearedRegularMissionListSync(playerId, toInsert.clearedRegularMissionList)
    insertPlayerCharactersSync(playerId, toInsert.characterList)
    insertPlayerCharactersManaNodesSync(playerId, toInsert.characterManaNodeList)
    insertPlayerPartyGroupListSync(playerId, toInsert.partyGroupList)
    insertPlayerItemsSync(playerId, toInsert.itemList)
    insertPlayerEquipmentListSync(playerId, toInsert.equipmentList)
    insertPlayerQuestProgressListSync(playerId, toInsert.questProgress)
    insertPlayerGachaInfoListSync(playerId, toInsert.gachaInfoList)
    insertPlayerGachaCampaignListSync(playerId, toInsert.gachaCampaignList)
    insertPlayerDrawnQuestsSync(playerId, toInsert.drawnQuestList)
    insertPlayerPeriodicRewardPointsListSync(playerId, toInsert.periodicRewardPointList)
    insertPlayerActiveMissionsSync(playerId, toInsert.allActiveMissionList)
    insertPlayerBoxGachasSync(playerId, toInsert.boxGachaList)
    insertPlayerStartDashExchangeCampaignsSync(playerId, toInsert.startDashExchangeCampaignList)
    insertPlayerMultiSpecialExchangeCampaignsSync(playerId, toInsert.multiSpecialExchangeCampaignList)
    insertPlayerOptionsSync(playerId, toInsert.userOption)
}

/**
 * Inserts a default player data into the database, linked to a provided account id.
 * 
 * @param accountId The account ID to link the new player to.
 * @returns The newly created player.
 */
export function insertDefaultPlayerSync(
    accountId: number
): Player {
    const player: Omit<Player, 'id'> = getDefaultPlayerData()

    const playerId = insertPlayerSync(accountId, player)

    // insert daily challenge points
    insertPlayerDailyChallengePointListSync(playerId, [
        {
            id: 1,
            point: 2,
            campaignList: [
                {
                    campaignId: 2023013101,
                    additionalPoint: 2
                }
            ]
        },
        {
            id: 251,
            point: 2,
            campaignList: [
                {
                    campaignId: 2023013102,
                    additionalPoint: 2
                }
            ]
        },
        {
            id: 5001,
            point: 10,
            campaignList: []
        },
        {
            id: 10008,
            point: 1,
            campaignList: []
        }
    ])

    // insert triggered tutorials
    insertPlayerTriggeredTutorialsSync(playerId, [])

    // insert cleared regular missions
    insertPlayerClearedRegularMissionListSync(playerId, {})

    // insert characterList
    insertPlayerCharactersSync(playerId, {
        "1": {
            entryCount: 1,
            evolutionLevel: 0,
            overLimitStep: 0,
            protection: false,
            joinTime: new Date(),
            updateTime: new Date(),
            exp: 10,
            stack: 0,
            bondTokenList: [
                {
                    manaBoardIndex: 1,
                    status: 0
                },
                {
                    manaBoardIndex: 2,
                    status: 0
                }
            ],
            manaBoardIndex: 1
        }
    })

    // insert characterManaNodeList
    insertPlayerCharactersManaNodesSync(playerId, {})

    // insert parties
    const partyGroups: Record<string, PlayerPartyGroup> = {}
    {
        const partyNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        const groupCount = 6
        let currentParty = 1

        for (let i = 0; i < groupCount; i++) {
            const list: Record<string, PlayerParty> = {}
            const group: PlayerPartyGroup = {
                list: list,
                colorId: 15
            }

            for (const name of partyNames) {
                list[currentParty.toString()] = {
                    name: `Party ${name}`,
                    characterIds: [1, null, null],
                    unisonCharacterIds: [null, null, null],
                    equipmentIds: [null, null, null],
                    abilitySoulIds: [null, null, null],
                    edited: false,
                    options: {
                        allowOtherPlayersToHealMe: true
                    }
                }
                currentParty += 1
            }

            partyGroups[(i + 1).toString()] = group
        }
    }
    insertPlayerPartyGroupListSync(playerId, partyGroups)

    // insert items
    insertPlayerItemsSync(playerId, {})

    // insert equipment
    insertPlayerEquipmentListSync(playerId, {})

    // insert quest progress
    insertPlayerQuestProgressListSync(playerId, {})

    // insert options
    insertPlayerOptionsSync(playerId, {
        "gacha_play_no_rarity_up_movie": false,
        "auto_play": false,
        "number_notation_symbol": true,
        "payment_alert": true,
        "room_number_hidden": false,
        "attention_sound_effect": true,
        "attention_vibration": false,
        "attention_enable_in_battle": true,
        "simple_ability_description": false
    })

    // insert gacha info
    insertPlayerGachaInfoListSync(playerId, [])

    // insert drawnQuestList
    insertPlayerDrawnQuestsSync(playerId, [
        {
            categoryId: 6,
            questId: 5001,
            oddsId: 5
        },
        {
            categoryId: 6,
            questId: 5002,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 5003,
            oddsId: 1
        },
        {
            categoryId: 6,
            questId: 5004,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 5005,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 13001,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 13002,
            oddsId: 4
        },
        {
            categoryId: 6,
            questId: 13003,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 13004,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 13005,
            oddsId: 9
        },
        {
            categoryId: 6,
            questId: 13006,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 14001,
            oddsId: 4
        },
        {
            categoryId: 6,
            questId: 14002,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 14003,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 14004,
            oddsId: 5
        },
        {
            categoryId: 6,
            questId: 14005,
            oddsId: 8
        },
        {
            categoryId: 6,
            questId: 14006,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 15001,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 15002,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 15003,
            oddsId: 5
        },
        {
            categoryId: 6,
            questId: 15004,
            oddsId: 4
        },
        {
            categoryId: 6,
            questId: 15005,
            oddsId: 7
        },
        {
            categoryId: 6,
            oddsId: 5,
            questId: 15006
        },
        {
            categoryId: 6,
            questId: 16001,
            oddsId: 1
        },
        {
            categoryId: 6,
            questId: 16002,
            oddsId: 8
        },
        {
            categoryId: 6,
            questId: 16003,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 16004,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 16005,
            oddsId: 1
        },
        {
            categoryId: 6,
            questId: 16006,
            oddsId: 9
        },
        {
            categoryId: 6,
            questId: 17001,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 17002,
            oddsId: 8
        },
        {
            categoryId: 6,
            questId: 17003,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 17004,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 17005,
            oddsId: 7
        },
        {
            categoryId: 6,
            questId: 17006,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 18001,
            oddsId: 8
        },
        {
            categoryId: 6,
            questId: 18002,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 18003,
            oddsId: 4
        },
        {
            categoryId: 6,
            questId: 18004,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 18005,
            oddsId: 4
        },
        {
            categoryId: 6,
            questId: 18006,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 19001,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 19002,
            oddsId: 7
        },
        {
            categoryId: 6,
            questId: 19003,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 19004,
            oddsId: 3
        },
        {
            categoryId: 6,
            questId: 19005,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 19006,
            oddsId: 1
        },
        {
            categoryId: 6,
            questId: 19007,
            oddsId: 7
        },
        {
            categoryId: 6,
            questId: 19008,
            oddsId: 7
        },
        {
            categoryId: 6,
            questId: 19009,
            oddsId: 5
        },
        {
            categoryId: 6,
            questId: 19010,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 19011,
            oddsId: 2
        },
        {
            categoryId: 6,
            questId: 19012,
            oddsId: 9
        },
        {
            categoryId: 6,
            questId: 19013,
            oddsId: 4
        },
        {
            categoryId: 6,
            questId: 19014,
            oddsId: 8
        },
        {
            categoryId: 6,
            questId: 19015,
            oddsId: 1
        },
        {
            categoryId: 6,
            questId: 19016,
            oddsId: 1
        },
        {
            categoryId: 6,
            questId: 19017,
            oddsId: 6
        },
        {
            categoryId: 6,
            questId: 19018,
            oddsId: 4
        },
        {
            categoryId: 14,
            questId: 1001,
            oddsId: 21
        },
        {
            categoryId: 14,
            questId: 1002,
            oddsId: 30
        },
        {
            categoryId: 14,
            questId: 1003,
            oddsId: 20
        },
        {
            categoryId: 14,
            questId: 1004,
            oddsId: 27
        },
        {
            categoryId: 14,
            questId: 1005,
            oddsId: 9
        },
        {
            categoryId: 14,
            questId: 1006,
            oddsId: 35
        },
    ])

    // insert periodicReward
    insertPlayerPeriodicRewardPointsListSync(playerId, [
        {
            id: 1,
            point: 22,
        },
        {
            id: 2,
            point: 2,
        },
        {
            id: 3,
            point: 2,
        },
        {
            id: 10000000,
            point: 2,
        },
    ])

    // insert active missions
    insertPlayerActiveMissionsSync(playerId, {})

    // insert box gacha
    insertPlayerBoxGachasSync(playerId, {
        "1001": [
            {
                boxId: 1,
                resetTimes: 0,
                remainingNumber: 572,
                isClosed: false
            },
            {
                boxId: 2,
                resetTimes: 0,
                remainingNumber: 647,
                isClosed: false
            },
            {
                boxId: 3,
                resetTimes: 0,
                remainingNumber: 732,
                isClosed: false
            },
            {
                boxId: 4,
                resetTimes: 0,
                remainingNumber: 912,
                isClosed: false
            },
            {
                boxId: 5,
                resetTimes: 0,
                remainingNumber: 1401,
                isClosed: false
            },
        ]
    })

    // insert start dash campaign list
    insertPlayerStartDashExchangeCampaignsSync(playerId, [])

    // insert the multi special exchange campaign list
    insertPlayerMultiSpecialExchangeCampaignsSync(playerId, [
        {
            campaignId: 3,
            status: 1
        }
    ])

    const finalPlayer = player as Player
    finalPlayer.id = playerId
    return finalPlayer
}

/**
 * Updates a player within the database.
 * 
 * @param player The properties of the player to change. Id must always be present.
 */
export function updatePlayerSync(
    player: Partial<Player> & Pick<Player, 'id'>
) {
    const id = player.id

    const fieldMap: Record<string, string> = {
        'stamina': 'stamina',
        'staminaHealTime': 'stamina_heal_time',
        'boostPoint': 'boost_point',
        'bossBoostPoint': 'boss_boost_point',
        'transitionState': 'transition_state',
        'role': 'role',
        'name': 'name',
        'lastLoginTime': 'last_login_time',
        'comment': 'comment',
        'vmoney': 'vmoney',
        'freeVmoney': 'free_vmoney',
        'rankPoint': 'rank_point',
        'starCrumb': 'star_crumb',
        'bondToken': 'bond_token',
        'expPool': 'exp_pool',
        'expPooledTime': 'exp_pooled_time',
        'leaderCharacterId': 'leader_character_id',
        'partySlot': 'party_slot',
        'degreeId': 'degree_id',
        'birth': 'birth',
        'freeMana': 'free_mana',
        'paidMana': 'paid_mana',
        'enableAuto3x': 'enable_auto_3x',
        'tutorialStep': 'tutorial_step',
        'tutorialSkipFlag': 'tutorial_skip_flag'
    }

    const sets: string[] = []
    const values: any[] = []
    for (const key in player) {
        const value = player[key as keyof typeof player]
        const mapped = fieldMap[key]
        if (mapped && value !== undefined) {
            sets.push(`${mapped} = ?`)
            if (value instanceof Date) {
                values.push(value.toISOString())
            } else if (typeof (value) === 'boolean') {
                values.push(serializeBoolean(value))
            } else {
                values.push(value)
            }
        }
    }

    if (sets.length > 0) db.prepare(`
        UPDATE players
        SET ${sets.join(', ')}
        WHERE id = ?
        `).run([...values, id]);
}

/**
 * Replaces a player's data with the provided MergedPlayerData object.
 * 
 * @param replaceWith The MergedPlayerData to replace.
 */
export function replacePlayerDataSync(
    replaceWith: MergedPlayerData
) {
    try {
        const playerId = replaceWith.player.id

        const account = getAccountFromPlayerIdSync(playerId)
        if (account === null)
            throw new Error("No account tied to player id.");

        // delete player
        deletePlayerSync(playerId)

        // insert new
        insertMergedPlayerDataSync(account.id, replaceWith)
    } catch (error: Error | any) {
        throw error
    }
}

/**
 * Deletes a player from the database completely.
 * 
 * @param playerId The ID of the player to delete
 */
export function deletePlayerSync(
    playerId: number
) {
    db.prepare(`DELETE FROM players WHERE id = ?`).run(playerId)
}

export function collectPlayerDataPooledExpSync(
    player: Player,
    dateNow: Date = new Date()
) {
    const serverTimeNow = getServerTime(dateNow)
    const poolTime = getServerTime(player.expPooledTime)
    const diff = Math.max(0, serverTimeNow - poolTime)

    if (60 > diff) return;

    updatePlayerSync({
        id: player.id,
        expPooledTime: dateNow,
        expPool: player.expPool + Math.min(expPoolMax, Math.floor(diff / 60))
    })
}

/**
 * Collects any pooled exp that a player might have.
 * Exp regenerates at a rate of 1 per minute.
 * 
 * @param playerId The ID of the player to collect the pooled EXP of.
 */
export function collectPlayerPooledExpSync(
    playerId: number
) {
    // exp regenerates at a rate of 1/min
    const playerData = getPlayerSync(playerId)
    if (!playerData) return;

    collectPlayerDataPooledExpSync(playerData)
}

/**
 * Performs a daily reset for a a player data object.
 * 
 * @param player The player data to perform the daily reset for
 * @param loginDate 
 * @returns A boolean; whether the daily reset was performed
 */
export function dailyResetPlayerDataSync(
    player: Player,
    loginDate: Date = new Date()
): boolean {
    const lastLoginTime = player.lastLoginTime
    const playerId = player.id
    if ( (loginDate.getUTCFullYear() > lastLoginTime.getUTCFullYear()) || (loginDate.getUTCMonth() > lastLoginTime.getUTCMonth()) || (loginDate.getUTCDate() > lastLoginTime.getUTCDate()) ) {
        // TODO: daily reset logic.
        updatePlayerSync({
            id: playerId,
            lastLoginTime: loginDate,
            bossBoostPoint: 3,
            boostPoint: 3
        })

        // reset gacha "isDailyFirst" values.
        const gachaInfo = getPlayerGachaInfoListSync(playerId)
        for (const gacha of gachaInfo) {
            updatePlayerGachaInfoSync(playerId, {
                gachaId: gacha.gachaId,
                isDailyFirst: true
            })
        }

        // reset campaigns
        const gachaCampaigns = getPlayerGachaCampaignListSync(playerId)
        for (const campaign of gachaCampaigns) {
            updatePlayerGachaCampaignSync(playerId, campaign.gachaId, campaign.campaignId, 1)
        }

        return true
    } else {
        updatePlayerSync({
            id: playerId,
            lastLoginTime: loginDate,
        })
        return false
    }
}

/**
 * Performs a daily reset for a player
 * 
 * @param playerId The ID of the player to perform the daily reset for.
 * @returns A boolean; whether the daily reset was performed
 */
export function dailyResetPlayerSync(
    playerId: number
): boolean {
    const playerData = getPlayerSync(playerId)
    if (!playerData) return false;

    return dailyResetPlayerDataSync(playerData)
}