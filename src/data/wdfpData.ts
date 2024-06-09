import getDatabase, { Database } from ".";
import { Account, DailyChallengePointListCampaign, DailyChallengePointListEntry, Player, PlayerActiveMission, PlayerBoxGacha, PlayerCharacter, PlayerCharacterBondToken, PlayerDrawnQuest, PlayerEquipment, PlayerGachaInfo, PlayerMultiSpecialExchangeCampaign, PlayerParty, PlayerPartyGroup, PlayerPeriodicRewardPoint, PlayerQuestProgress, PlayerStartDashExchangeCampaign, RawAccount, RawDailyChallengePointListCampaign, RawDailyChallengePointListEntry, RawPlayer, RawPlayerActiveMission, RawPlayerActiveMissionStage, RawPlayerBoxGacha, RawPlayerCharacter, RawPlayerCharacterBondToken, RawPlayerCharacterManaNode, RawPlayerClearedRegularMission, RawPlayerDrawnQuest, RawPlayerEquipment, RawPlayerGachaInfo, RawPlayerItem, RawPlayerMultiSpecialExchangeCampaign, RawPlayerParty, RawPlayerPartyGroup, RawPlayerQuestProgress, RawPlayerStartDashExchangeCampaign, RawPlayerTriggeredTutorial, RawSession, Session } from "./types";
import { randomBytes } from "crypto";
import { deserializeBoolean, serializeBoolean, serializePlayerData } from "./utils";

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
    INSERT INTO sessions (token, account_id, expires, type)
    VALUES (?, ?, ?, ?)    
    `).run(
        token,
        session.accountId,
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
 * Marks a tutorial as having been triggered by a player.
 * 
 * @param playerId The ID of the player that triggered the tutorial.
 * @param tutorialId The ID of the tutorial that was triggered.
 */
function insertPlayerTriggeredTutorialSync(
    playerId: number,
    tutorialId: number
) {
    db.prepare(`
    INSERT INTO players_triggered_tutorials (id, player_id)
    VALUES (?, ?)
    `).run(playerId, tutorialId)
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
 * Gets a list of all of the characters that a player owns.
 * 
 * @param playerId The ID of the player.
 * @returns A list of the characters that the player owns.
 */
function getPlayerCharactersSync(
    playerId: number
): Record<string, PlayerCharacter> {

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

    const bondBuckets: Record<string, PlayerCharacterBondToken[]> = {}

    for (const rawBondToken of rawBondTokens) {
        const characterId = rawBondToken.character_id.toString()
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

    const out: Record<string, PlayerCharacter> = {}

    for (const rawCharacter of rawCharacters) {
        const id = rawCharacter.id.toString()
        out[id] = {
            entryCount: rawCharacter.entry_count,
            evolutionLevel: rawCharacter.evolution_level,
            overLimitStep: rawCharacter.over_limit_step,
            protection: deserializeBoolean(rawCharacter.protection),
            joinTime: new Date(rawCharacter.join_time),
            updateTime: new Date(rawCharacter.update_time),
            exp: rawCharacter.exp,
            stack: rawCharacter.stack,
            manaBoardIndex: rawCharacter.mana_board_index,
            bondTokenList: bondBuckets[id] || []
        }
    }

    return out
}

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
 * Inserts a single character into a player's inventory.
 * 
 * @param playerId The ID of the player to add the character to.
 * @param characterId The ID of the character to add.
 * @param character The character data.
 */
function insertPlayerCharacterSync(
    playerId: number,
    characterId: number | string,
    character: PlayerCharacter
) {
    // insert into characters table
    db.prepare(`
    INSERT INTO players_characters (id, entry_count, evolution_level, over_limit_step, protection, join_time, update_time, exp, stack, mana_board_index, player_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        playerId
    )

    // insert mana board nodes
    for (const token of character.bondTokenList) {
        insertPlayerCharacterBondTokenSync(playerId, characterId, token)
    }
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
 * Inserts mana nodes for a particular character into the database.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character to insert the mana nodes of.
 * @param manaNodes The mana nodes values to insert.
 */
function insertPlayerCharacterManaNodesSync(
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
            protection: deserializeBoolean(raw.protection),
            stack: raw.stack
        }
    }

    return final
}

/**
 * Inserts a singular equipment into a player's inventory.
 * 
 * @param playerId The ID of the player.
 * @param equipmentId The ID of the equipment to insert.
 * @param equipment The equipment's data.
 */
function insertPlayerEquipmentSync(
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
            finished: deserializeBoolean(raw.finished),
            highScore: raw.high_score,
            clearRank: raw.clear_rank,
            bestElapsedTimeMs: raw.best_elapsed_time_ms
        })
    }

    return mapped
}

/**
 * Inserts a singular quest progress into the database.
 * 
 * @param playerId The ID of the player.
 * @param section The section that this quest progress belongs to.
 * @param data The data of this quest progress.
 */
function insertPlayerQuestProgressSync(
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
            isDailyFirst: deserializeBoolean(raw.is_daily_first),
            isAccountFirst: deserializeBoolean(raw.is_account_first),
            gachaExchangePoint: raw.gacha_exchange_point
        }
    })
}

/**
 * Inserts a singular gacha info into the database for a player.
 * 
 * @param playerId The ID of the player.
 * @param gachaInfo The PlayerGachaInfo data.
 */
function insertPlayerGachaInfoSync(
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
        gachaInfo.gachaExchangePoint || null,
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
    VALUSE (?, ?, ?, ?)   
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
            isClosed: deserializeBoolean(rawBox.is_closed)
        })
    }

    return buckets
}

/**
 * Inserts a singular box gacha into a player's data.
 * 
 * @param playerId The ID of the player.
 * @param section 
 * @param boxGacha The box gacha's data.
 */
function insertPlayerBoxGachaSync(
    playerId: number,
    section: number | string,
    boxGacha: PlayerBoxGacha
) {
    db.prepare(`
    INSERT INTO players_box_gacha (id, box_id, reset_times, remaining_number, is_closed, player_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        Number(section),
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

export function getPlayerFromAccountId(
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

export function getPlayerSync(
    playerId: number
): Player | null {
    const raw = db.prepare(`
    SELECT id, stamina, stamina_heal_time, boost_point, boss_boost_point,
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
        id: raw.id,
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
        enableAuto3x: deserializeBoolean(raw.enable_auto_3x),
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

/**
 * Inserts a player into the database.
 * 
 * @param accountId The ID of the account that this player is linked to.
 * @param player The player data to insert.
 * @returns The ID of the player that was inserted.
 */
export function insertPlayerSync(
    accountId: number,
    player: Omit<Player, 'id'>
): number {
    const insert = db.prepare(`
    INSERT INTO players (stamina, stamina_heal_time, boost_point, boss_boost_point,
        transition_state, role, name, last_login_time, comment, vmoney, free_vmoney,
        rank_point, star_crumb, bond_token, exp_pool, exp_pooled_time, leader_character_id,
        party_slot, degree_id, birth, free_mana, paid_mana, enable_auto_3x, account_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        player.stamina,
        player.staminaHealTime.toISOString(),
        player.boostPoint,
        player.bossBoostPoint,
        player.transitionState,
        player.role,
        player.name,
        player.lastLoginTime,
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
        accountId
    )

    const playerId = Number(insert.lastInsertRowid)

    // insert daily challenge points
    insertPlayerDailyChallengePointListSync(playerId, player.dailyChallengePointList)

    // insert triggered tutorials
    insertPlayerTriggeredTutorialsSync(playerId, player.triggeredTutorial)

    // insert cleared regular missions
    insertPlayerClearedRegularMissionListSync(playerId, player.clearedRegularMissionList)

    // insert characterList
    insertPlayerCharactersSync(playerId, player.characterList)

    // insert characterManaNodeList
    insertPlayerCharactersManaNodesSync(playerId, player.characterManaNodeList)

    // insert parties
    insertPlayerPartyGroupListSync(playerId, player.partyGroupList)

    // insert items
    insertPlayerItemsSync(playerId, player.itemList)

    // insert equipment
    insertPlayerEquipmentListSync(playerId, player.equipmentList)

    // insert quest progress
    insertPlayerQuestProgressListSync(playerId, player.questProgress)

    // insert gacha info
    insertPlayerGachaInfoListSync(playerId, player.gachaInfoList)

    // insert drawnQuestList
    insertPlayerDrawnQuestsSync(playerId, player.drawnQuestList)

    // insert periodicReward
    insertPlayerPeriodicRewardPointsListSync(playerId, player.periodicRewardPointList)

    // insert active missions
    insertPlayerActiveMissionsSync(playerId, player.allActiveMissionList)

    // insert box gacha
    insertPlayerBoxGachasSync(playerId, player.boxGachaList)

    // insert start dash campaign list
    insertPlayerStartDashExchangeCampaignsSync(playerId, player.startDashExchangeCampaignList)

    // insert the multi special exchange campaign list
    insertPlayerMultiSpecialExchangeCampaignsSync(playerId, player.multiSpecialExchangeCampaignList)

    // return
    return playerId
}

export function insertDefaultPlayerSync(
    accountId: number
): Player {

    // generate party groups
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

    const player: Omit<Player, 'id'> = {
        stamina: 20,
        staminaHealTime: new Date(),
        boostPoint: 3,
        bossBoostPoint: 3,
        transitionState: 0,
        role: 1,
        name: "플레이어",
        lastLoginTime: "2024-06-07 13:25:17",
        comment: "Nice to meet you.",
        vmoney: 0,
        freeVmoney: 150,
        rankPoint: 10,
        starCrumb: 0,
        bondToken: 0,
        expPool: 0,
        expPooledTime: new Date(),
        leaderCharacterId: 1,
        partySlot: 1,
        degreeId: 1,
        birth: 19900101,
        freeMana: 1000,
        paidMana: 0,
        enableAuto3x: false,
        dailyChallengePointList: [
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
        ],
        triggeredTutorial: [],
        clearedRegularMissionList: {},
        characterList: {
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
        },
        characterManaNodeList: {},
        partyGroupList: partyGroups,
        itemList: {},
        equipmentList: {},
        questProgress: {},
        gachaInfoList: [
            {
                gachaId: 2,
                isDailyFirst: true,
                isAccountFirst: true
            },
            {
                gachaId: 4,
                isDailyFirst: true,
                isAccountFirst: true
            },
            {
                gachaId: 900003,
                isDailyFirst: true,
                isAccountFirst: true
            },
            {
                gachaId: 157,
                isDailyFirst: true,
                isAccountFirst: true,
                gachaExchangePoint: 0
            },
            {
                gachaId: 57,
                isDailyFirst: true,
                isAccountFirst: true
            },
            {
                gachaId: 5033,
                isDailyFirst: true,
                isAccountFirst: true,
                gachaExchangePoint: 0
            },
            {
                gachaId: 900000,
                isDailyFirst: true,
                isAccountFirst: true
            },
            {
                gachaId: 155,
                isDailyFirst: true,
                isAccountFirst: true,
                gachaExchangePoint: 0
            },
            {
                gachaId: 9,
                isDailyFirst: true,
                isAccountFirst: true
            },
        ],
        drawnQuestList: [
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
        ],
        periodicRewardPointList: [
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
        ],
        allActiveMissionList: {},
        boxGachaList: {
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
        },
        purchasedTimesList: {},
        startDashExchangeCampaignList: [],
        multiSpecialExchangeCampaignList: [
            {
                campaignId: 3,
                status: 1
            }
        ]
    }

    const id = insertPlayerSync(accountId, player)

    const finalPlayer = player as Player
    finalPlayer.id = id
    return finalPlayer
}