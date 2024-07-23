import { getCharacterDataSync } from "../lib/assets"
import { getDateFromServerTime, getServerTime } from "../utils"
import { ClientPlayerData, DailyChallengePointListEntry, MergedPlayerData, Player, PlayerActiveMission, PlayerBoxGacha, PlayerCharacter, PlayerCharacterBondToken, PlayerDrawnQuest, PlayerEquipment, PlayerGachaCampaign, PlayerGachaInfo, PlayerMultiSpecialExchangeCampaign, PlayerParty, PlayerPartyGroup, PlayerPeriodicRewardPoint, PlayerQuestProgress, PlayerStartDashExchangeCampaign, UserBoxGacha, UserCharacter, UserCharacterBondTokenStatus, UserEquipment, UserGachaCampaign, UserPartyGroup, UserPartyGroupTeam, UserQuestProgress, UserTutorial } from "./types"

import saveData from "../../assets/save_data.json"
import { getPlayerSync, getPlayerTriggeredTutorialsSync, getAccountPlayers, getPlayerActiveMissionsSync, getPlayerBoxGachasSync, getPlayerCharactersManaNodesSync, getPlayerCharactersSync, getPlayerClearedRegularMissionListSync, getPlayerDailyChallengePointListSync, getPlayerDrawnQuestsSync, getPlayerEquipmentListSync, getPlayerGachaInfoListSync, getPlayerItemsSync, getPlayerMultiSpecialExchangeCampaignsSync, getPlayerOptionsSync, getPlayerPartyGroupListSync, getPlayerPeriodicRewardPointsSync, getPlayerQuestProgressSync, getPlayerStartDashExchangeCampaignsSync, getPlayerGachaCampaignListSync } from "./wdfpData"
import { availableAssetVersion } from "../routes/api/asset"

/**
 * Serializes a boolean into a number, which is storable by the database.
 * 
 * @param toSerialize The boolean to serialize.
 * @returns A number that represents the boolean.
 */
export function serializeBoolean(
    toSerialize: boolean
): number {
    return toSerialize ? 1 : 0
}

/**
 * Converts a number into a boolean.
 * 
 * @param toDeserialize The number to deserialize into a boolean.
 * @returns The deserialized boolean
 */
export function deserializeBoolean(
    toDeserialize: number
): boolean {
    return toDeserialize === 1 ? true : false
}

/**
 * Converts a list of numbers into a string.
 * 
 * @param toSerialize The list of numbers to serialize.
 * @returns A serialized string.
 */
export function serializeNumberList(
    toSerialize: number[]
): string {
    return toSerialize.join(',')
}

/**
 * Converts a serialized string into a list of numbers.
 * 
 * @param toDeserialize The serialized string to deserialize.
 * @returns A list of numbers.
 */
export function deserializeNumberList(
    toDeserialize: string
): number[] {
    try {
        return toDeserialize.split(",").map(str => Number(str))
    } catch (error) {
        return []
    }
}

/**
 * Serializes a list of PlayerCharacterBondTokens into UserCharacterBondTokenStatuses
 * 
 * @param toSerialize 
 * @returns 
 */
export function serializeBondTokenStatuses(
    toSerialize: PlayerCharacterBondToken[]
): UserCharacterBondTokenStatus[] {
    return toSerialize.map(bondToken => {
        return {
            mana_board_index: bondToken.manaBoardIndex,
            status: bondToken.status
        }
    })
}

/**
 * Serializes a PlayerGachaCampaign into a UserGachaCampaign.
 * 
 * @param campaign 
 * @returns 
 */
export function serializeGachaCampaign(
    campaign: PlayerGachaCampaign
): UserGachaCampaign {
    return {
        gacha_id: campaign.gachaId,
        campaign_id: campaign.campaignId,
        count: campaign.count
    }
}

/**
 * Serializes a player data object in the way that the world flipper client expects it.
 * 
 * @param player The player data object to serialize.
 * @returns A serialized player data object.
 */
export function serializePlayerData(
    toSerialize: MergedPlayerData,
    viewerId?: number,
): ClientPlayerData {

    // convert userCharacterList
    const userCharacterList: Record<string, UserCharacter> = {}
    for (const [characterId, character] of Object.entries(toSerialize.characterList)) {
        // convert bond tokens
        const converted_character: UserCharacter = {
            "entry_count": character.entryCount,
            "evolution_level": character.evolutionLevel,
            "over_limit_step": character.overLimitStep,
            "protection": character.protection,
            "join_time": getServerTime(character.joinTime),
            "update_time": getServerTime(character.updateTime),
            "exp": character.exp,
            "stack": character.stack,
            "bond_token_list": serializeBondTokenStatuses(character.bondTokenList),
            "mana_board_index": character.manaBoardIndex
        }

        const exBoost = character.exBoost
        if (exBoost !== undefined) {
            converted_character['ex_boost'] = {
                "status_id": exBoost.statusId,
                "ability_id_list": exBoost.abilityIdList
            }
        }

        if (character.illustrationSettings !== undefined) {
            converted_character['illustration_settings'] = character.illustrationSettings
        }

        userCharacterList[characterId] = converted_character
    }

    // convert parties
    const userPartyGroupList: Record<string, UserPartyGroup> = {}
    for (const [groupId, group] of Object.entries(toSerialize.partyGroupList)) {
        const list: Record<string, UserPartyGroupTeam> = {}
        for (const [partyId, party] of Object.entries(group.list)) {
            list[partyId] = {
                "name": party.name,
                "character_ids": party.characterIds,
                "unison_character_ids": party.unisonCharacterIds,
                "equipment_ids": party.equipmentIds,
                "ability_soul_ids": party.abilitySoulIds,
                "edited": party.edited,
                "options": {
                    "allow_other_players_to_heal_me": party.options.allowOtherPlayersToHealMe
                }
            }
        }
        userPartyGroupList[groupId] = {
            "list": list,
            "color_id": group.colorId
        }
    }

    // convert equipment list
    const userEquipmentList: Record<string, UserEquipment> = {}
    for (const [equipmentId, equipment] of Object.entries(toSerialize.equipmentList)) {
        userEquipmentList[equipmentId] = {
            "enhancement_level": equipment.enhancementLevel,
            "level": equipment.level,
            "protection": equipment.protection,
            "stack": equipment.stack
        }
    }

    // convert player Quest Progress
    const userQuestProgress: Record<string, UserQuestProgress[]> = {}
    for (const [section, progresses] of Object.entries(toSerialize.questProgress)) {
        const list: UserQuestProgress[] = []
        for (const progress of progresses) {
            list.push({
                "best_elapsed_time_ms": progress.bestElapsedTimeMs,
                "clear_rank": progress.clearRank,
                "finished": progress.finished,
                "high_score": progress.highScore,
                "quest_id": progress.questId
            })
        }
        userQuestProgress[section] = list
    }

    // convert box gacha list
    const userBoxGachaList: Record<string, UserBoxGacha[]> = {}
    for (const [section, list] of Object.entries(toSerialize.boxGachaList)) {
        userBoxGachaList[section] = list.map(boxGacha => {
            return {
                "box_id": boxGacha.boxId,
                "reset_times": boxGacha.resetTimes,
                "remaining_number": boxGacha.remainingNumber,
                "is_closed": boxGacha.isClosed
            }
        })
    }

    // handle tutorial
    let userTutorial: UserTutorial | null = null
    const playerData = toSerialize.player
    const tutorialStep = playerData.tutorialStep
    if (tutorialStep !== null && toSerialize.triggeredTutorial.find((value: number) => value === 12) === undefined) {
        userTutorial = {
            "viewer_id": viewerId || 0,
            "tutorial_step": tutorialStep,
            "skip_flag": playerData.tutorialSkipFlag
        }

        if (tutorialStep >= 1) {
            userTutorial["powerflip_failure"] = 0
        }
    }

    return {
        "user_info": {
            "stamina": playerData.stamina,
            "stamina_heal_time": getServerTime(playerData.staminaHealTime),
            "boost_point": playerData.boostPoint,
            "boss_boost_point": playerData.bossBoostPoint,
            "transition_state": playerData.transitionState,
            "role": playerData.role,
            "name": playerData.name,
            "last_login_time": clientSerializeDate(playerData.lastLoginTime),
            "comment": playerData.comment,
            "vmoney": playerData.vmoney,
            "free_vmoney": playerData.freeVmoney,
            "rank_point": playerData.rankPoint,
            "star_crumb": playerData.starCrumb,
            "bond_token": playerData.bondToken,
            "exp_pool": playerData.expPool,
            "exp_pooled_time": getServerTime(playerData.expPooledTime),
            "leader_character_id": playerData.leaderCharacterId,
            "party_slot": playerData.partySlot,
            "degree_id": playerData.degreeId,
            "birth": playerData.birth,
            "free_mana": playerData.freeMana,
            "paid_mana": playerData.paidMana,
            "enable_auto_3x": playerData.enableAuto3x
        },
        "premium_bonus_list": [],
        "expired_premium_bonus_list": null,
        "user_daily_challenge_point_list": toSerialize.dailyChallengePointList.map(dailyChallenge => {
            return {
                "id": dailyChallenge.id,
                "point": dailyChallenge.point,
                "campaign_list": dailyChallenge.campaignList.map(campaign => {
                    return {
                        "campaign_id": campaign.campaignId,
                        "additional_point": campaign.additionalPoint
                    }
                })
            }
        }),
        "bonus_index_list": null,
        "login_bonus_received_at": null,
        "user_notice_list": [],
        "user_triggered_tutorial": toSerialize.triggeredTutorial,
        "user_tutorial": userTutorial,
        "tutorial_gacha": null,
        "cleared_regular_mission_list": toSerialize.clearedRegularMissionList,
        "user_character_list": userCharacterList,
        "user_character_mana_node_list": toSerialize.characterManaNodeList,
        "user_party_group_list": userPartyGroupList,
        "item_list": toSerialize.itemList,
        "user_equipment_list": userEquipmentList,
        "user_character_from_town_history": [],
        "quest_progress": userQuestProgress,
        "last_main_quest_id": null,
        "gacha_info_list": toSerialize.gachaInfoList.map(gachaInfo => {
            return {
                "gacha_id": gachaInfo.gachaId,
                "is_daily_first": gachaInfo.isDailyFirst,
                "is_account_first": gachaInfo.isAccountFirst,
                "gacha_exchange_point": gachaInfo.gachaExchangePoint
            }
        }),
        "available_asset_version": availableAssetVersion,
        "should_prompt_takeover_registration": false,
        "has_unread_news_item": false,
        "user_option": toSerialize.userOption,
        "drawn_quest_list": toSerialize.drawnQuestList.map(drawnQuest => {
            return {
                "category_id": drawnQuest.categoryId,
                "quest_id": drawnQuest.questId,
                "odds_id": drawnQuest.oddsId
            }
        }),
        "mail_arrived": false,
        "user_periodic_reward_point_list": toSerialize.periodicRewardPointList,
        "all_active_mission_list": toSerialize.allActiveMissionList,
        "cleared_collect_item_event_mission_list": [],
        "box_gacha_list": userBoxGachaList,
        "gacha_campaign_list": toSerialize.gachaCampaignList.map(campaign => serializeGachaCampaign(campaign)),
        "purchased_times_list": {
            "gs.kg.worldflipper.pakage_monthly": 0,
            "gs.kg.worldflipper.pakage_rank": 0,
            "gs.kg.worldflipper.pakage_monthly_90": 0,
            "gs.kg.worldflipper.pakage_monthly_stamina": 0,
            "gs.kg.worldflipper.pakage_monthly_kareido": 0,
            "gs.kg.worldflipper.pakage_monthly_boss": 0,
            "gs.kg.worldflipper.pakage_rank_2": 0,
            "gs.kg.worldflipper.pakage_rank_3_1": 0,
            "gs.kg.worldflipper.pakage_rank_4": 0,
            "gs.kg.worldflipper.pakage_challenge_boost": 0
        },
        "start_dash_exchange_campaign_list": toSerialize.startDashExchangeCampaignList.map(campaign => {
            return {
                "campaign_id": campaign.campaignId,
                "gacha_id": campaign.gachaId,
                "period_start_time": getServerTime(campaign.periodStartTime),
                "period_end_time": getServerTime(campaign.periodEndTime),
                "status": campaign.status,
                "term_index": campaign.termIndex
            }
        }),
        "multi_special_exchange_campaign_list": toSerialize.multiSpecialExchangeCampaignList.map(campaign => {
            return {
                "campaign_id": campaign.campaignId,
                "status": campaign.status
            }
        }),
        "associate_token": "associate_token",
        "config": {
            "attention_recruitment_interval_seconds": 15,
            "attention_recruitment_redeliver_limit": 20,
            "attention_polling_interval_seconds_normal": 10,
            "attention_polling_interval_seconds_battle": 15,
            "multi_attention_lifetime_seconds": 30,
            "contribution_score_rate_to_parasite": 0.25,
            "attention_log_interval_seconds": 600,
            "disable_finish_duration_seconds": 5,
            "disable_decline_count_seconds": 60,
            "disable_decline_count_limit": 14,
            "disable_decline_duration_seconds": 30,
            "disable_intent_disconnect_duration_seconds": 300,
            "disable_unintent_disconnect_duration_seconds": 5,
            "disable_remote_error_duration_seconds": 300,
            "attention_animation_time_seconds": 6,
            "disable_expire_count_limit": 4,
            "disable_expire_duration_seconds": 180,
            "polling_delay_normal_seconds_range_min": 1,
            "polling_delay_normal_seconds_range_max": 10,
            "polling_delay_battle_seconds_range_min": 1,
            "polling_delay_battle_seconds_range_max": 15,
            "return_attention_max_num": 3
        }
    }
}

/**
 * Generates default player data.
 * 
 * @returns The generated default player data.
 */
export function getDefaultPlayerData(): Omit<Player, 'id'> {
    // generate party groups
    return {
        stamina: 20,
        staminaHealTime: new Date(),
        boostPoint: 3,
        bossBoostPoint: 3,
        transitionState: 0,
        role: 1,
        name: "플레이어",
        lastLoginTime: new Date(),
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
        tutorialStep: 0,
        tutorialSkipFlag: null
    }
}

/**
 * Deserializes client player data into data that can be processed by the server.
 * 
 * @param toDeserialize The client player data to be deserialized
 */
export function deserializePlayerData(
    playerId: number,
    toDeserialize: Partial<ClientPlayerData>
): MergedPlayerData {
    try {
        // deserialize user info
        const userInfo = toDeserialize['user_info']
        if (userInfo === undefined) throw new Error("Missing 'user_info' field.");

        const userTutorial = toDeserialize['user_tutorial']

        const player: Player = {
            id: playerId,
            stamina: userInfo.stamina,
            staminaHealTime: getDateFromServerTime(userInfo.stamina_heal_time),
            boostPoint: userInfo.boost_point,
            bossBoostPoint: userInfo.boss_boost_point,
            transitionState: userInfo.transition_state,
            role: userInfo.role,
            name: userInfo.name,
            lastLoginTime: deserializeClientDate(userInfo.last_login_time),
            comment: userInfo.comment,
            vmoney: userInfo.vmoney,
            freeVmoney: userInfo.free_vmoney,
            rankPoint: userInfo.rank_point,
            starCrumb: userInfo.star_crumb,
            bondToken: userInfo.bond_token,
            expPool: userInfo.exp_pool,
            expPooledTime: getDateFromServerTime(userInfo.exp_pooled_time),
            leaderCharacterId: userInfo.leader_character_id,
            partySlot: userInfo.party_slot,
            degreeId: userInfo.degree_id,
            birth: userInfo.birth,
            freeMana: userInfo.free_mana,
            paidMana: userInfo.paid_mana,
            enableAuto3x: userInfo.enable_auto_3x,
            tutorialStep: userTutorial?.tutorial_step === undefined ? null : userTutorial.tutorial_step,
            tutorialSkipFlag: userTutorial?.skip_flag === undefined ? null : userTutorial.skip_flag
        }

        // deserialize user daily challenge point list
        const userDailyChallengePointList = toDeserialize['user_daily_challenge_point_list']
        if (userDailyChallengePointList === undefined) throw new Error("Missing 'user_daily_challenge_point_list' field.");

        const dailyChallengePointList: DailyChallengePointListEntry[] = userDailyChallengePointList.map(dailyChallenge => {
            const id = dailyChallenge['id']
            const point = dailyChallenge['point']
            const campaignList = dailyChallenge['campaign_list']
            if (isNaN(id) || isNaN(point) || campaignList === undefined) throw new Error("Invalid user_daily_challenge_point_list field.");

            return {
                id: id,
                point: point,
                campaignList: campaignList.map(campaign => {
                    const id = campaign['campaign_id']
                    const additionalPoint = campaign['additional_point']
                    if (isNaN(id) || isNaN(additionalPoint)) throw new Error("Invalid user_daily_challenge_point_list campaign_list field.");

                    return {
                        campaignId: id,
                        additionalPoint: additionalPoint
                    }
                })
            }
        })

        // deserialize triggered tutorial
        const triggeredTutorial = toDeserialize['user_triggered_tutorial']
        if (triggeredTutorial === undefined) throw new Error("Missing 'user_triggered_tutorial' field.");

        // deserialize cleared regular mission list
        const clearedRegularMissionList = toDeserialize['cleared_regular_mission_list']
        if (clearedRegularMissionList === undefined) throw new Error("Missing 'cleared_regular_mission_list' field.");

        // deserialize character list
        const userCharacterList = toDeserialize['user_character_list']
        if (userCharacterList === undefined) throw new Error("Missing 'user_character_list' field.");

        const characterList: Record<string, PlayerCharacter> = {}
        for (const [characterId, character] of Object.entries(userCharacterList)) {
            // get asset data
            const assetData = getCharacterDataSync(characterId)
            if (assetData === null) throw new Error(`Character with id "${characterId}" does not exist.`);

            const entryCount = character['entry_count']
            const evolutionLevel = character['evolution_level']
            const overLimitStep = character['over_limit_step']
            const protection = character['protection']
            const joinTime = character['join_time']
            const updateTime = character['update_time']
            const exp = character['exp']
            const stack = character['stack']
            const bondTokenList = character['bond_token_list']
            const manaBoardIndex = character['mana_board_index']

            if (isNaN(entryCount) || isNaN(evolutionLevel) || isNaN(overLimitStep) || protection === undefined
                || isNaN(joinTime) || isNaN(updateTime) || isNaN(exp) || isNaN(stack) || bondTokenList === undefined
                || isNaN(manaBoardIndex)) throw new Error(`Invalid user_character_list value for character with id "${characterId}".`);

            // convert bond tokens
            const converted_character: PlayerCharacter = {
                entryCount: entryCount,
                evolutionLevel: evolutionLevel,
                overLimitStep: overLimitStep,
                protection: protection,
                joinTime: getDateFromServerTime(joinTime),
                updateTime: getDateFromServerTime(updateTime),
                exp: exp,
                stack: stack,
                manaBoardIndex: manaBoardIndex,
                bondTokenList: bondTokenList.map(bondToken => {
                    const manaBoardIndex = bondToken['mana_board_index']
                    const status = bondToken['status']
                    if (isNaN(manaBoardIndex) || isNaN(status)) throw new Error(`Invalid bond_token_list value for character with id "${characterId}".`);

                    return {
                        manaBoardIndex: manaBoardIndex,
                        status: status
                    }
                })
            }

            // validan length of bond token list
            if (bondTokenList.length > 2) throw new Error(`Invalid bond_token_list length for character with id "${characterId}".`);

            const exBoost = character['ex_boost']
            if (exBoost !== undefined) {
                const statusId = exBoost['status_id']
                if (isNaN(statusId)) throw new Error(`Invalid ex_boost value for character with id "${characterId}".`);

                converted_character['exBoost'] = {
                    statusId: statusId,
                    abilityIdList: exBoost['ability_id_list']
                }
            }

            if (character['illustration_settings'] !== undefined) {
                converted_character['illustrationSettings'] = character.illustration_settings
            }

            characterList[characterId] = converted_character
        }

        // deserialize mana node list
        const characterManaNodeList = toDeserialize['user_character_mana_node_list']
        if (characterManaNodeList === undefined) throw new Error("Missing 'user_character_mana_node_list' field.");

        // deserialize party list
        const userPartyGroupList = toDeserialize['user_party_group_list']
        if (userPartyGroupList === undefined) throw new Error("Missing 'user_party_group_list' field.");

        const partyGroupList: Record<string, PlayerPartyGroup> = {}
        for (const [groupId, group] of Object.entries(userPartyGroupList)) {
            const userList = group['list']
            const colorId = group['color_id']
            if (isNaN(colorId)) throw new Error(`Invalid fields in group with id "${groupId}"`);

            const list: Record<string, PlayerParty> = {}
            for (const [partyId, party] of Object.entries(userList)) {
                const name = party['name']
                const characterIds = party['character_ids']
                const unisonCharacterIds = party['unison_character_ids']
                const equipmentIds = party['equipment_ids']
                const abilitySoulIds = party['ability_soul_ids']
                const edited = party['edited']
                const options = party['options']
                if (name === undefined || edited === undefined || options === undefined
                    || characterIds === undefined || unisonCharacterIds === undefined
                    || equipmentIds === undefined || abilitySoulIds === undefined
                ) throw new Error(`Invalid party team with id "${partyId}" in group with id "${groupId}"`);

                // check lengths
                if (characterIds.length > 3 || unisonCharacterIds.length > 3 || equipmentIds.length > 3 || abilitySoulIds.length > 3) throw new Error(`Invalid array lengths for party with id "${partyId}" in group with id "${groupId}"`);

                list[partyId] = {
                    name: name,
                    characterIds: characterIds,
                    unisonCharacterIds: unisonCharacterIds,
                    equipmentIds: equipmentIds,
                    abilitySoulIds: abilitySoulIds,
                    edited: edited,
                    options: {
                        allowOtherPlayersToHealMe: options?.allow_other_players_to_heal_me === undefined ? true : options.allow_other_players_to_heal_me
                    }
                }
            }
            partyGroupList[groupId] = {
                list: list,
                colorId: colorId
            }
        }

        // deserialize item list
        const itemList = toDeserialize['item_list']
        if (itemList === undefined) throw new Error("Missing 'item_list' field.");

        // deserialize equipment
        const userEquipmentList = toDeserialize['user_equipment_list']
        if (userEquipmentList === undefined) throw new Error("Missing 'user_equipment_list' field.");

        const equipmentList: Record<string, PlayerEquipment> = {}
        for (const [equipmentId, equipment] of Object.entries(userEquipmentList)) {
            const enhancementLevel = equipment['enhancement_level']
            const level = equipment['level']
            const protection = equipment['protection']
            const stack = equipment['stack']
            if (isNaN(enhancementLevel) || isNaN(level) || protection === undefined || isNaN(stack)) throw new Error(`Invalid fields for equipment with id "${equipmentId}"`);

            equipmentList[equipmentId] = {
                enhancementLevel: enhancementLevel,
                level: level,
                protection: protection,
                stack: stack
            }
        }

        // deserialize quest progress
        const userQuestProgress = toDeserialize['quest_progress']
        if (userQuestProgress === undefined) throw new Error("Missing 'quest_progress' field.");

        const questProgress: Record<string, PlayerQuestProgress[]> = {}
        for (const [section, progresses] of Object.entries(userQuestProgress)) {
            const list: PlayerQuestProgress[] = []
            for (const progress of progresses) {
                const finished = progress['finished']
                const questId = progress['quest_id']
                if (isNaN(questId) || finished === undefined) throw new Error(`Invalid quest progress in section "${section}"`);

                list.push({
                    bestElapsedTimeMs: progress['best_elapsed_time_ms'],
                    clearRank: progress['clear_rank'],
                    finished: finished,
                    highScore: progress['high_score'],
                    questId: questId
                })
            }
            questProgress[section] = list
        }

        // deserialize gacha info list
        const userGachaInfoList = toDeserialize['gacha_info_list']
        if (userGachaInfoList === undefined) throw new Error("Missing 'gacha_info_list' field.");

        const gachaInfoList: PlayerGachaInfo[] = userGachaInfoList.map(gachaInfo => {
            const gachaId = gachaInfo['gacha_id']
            const isDailyFirst = gachaInfo['is_daily_first']
            const isAccountFirst = gachaInfo['is_account_first']
            if (isNaN(gachaId) || isDailyFirst === undefined || isAccountFirst === undefined) throw new Error(`Invalid or missing fields for 'gacha_info' field.`);

            return {
                gachaId: gachaId,
                isDailyFirst: isDailyFirst,
                isAccountFirst: isAccountFirst,
                gachaExchangePoint: gachaInfo['gacha_exchange_point']
            }
        })

        // deserialize gacha campaign list
        const userGachaCampaignList = toDeserialize['gacha_campaign_list']
        let gachaCampaignList: PlayerGachaCampaign[] = []
        if (userGachaCampaignList !== undefined) {
            gachaCampaignList = userGachaCampaignList.map(rawCampaign => {
                const gachaId = rawCampaign['gacha_id']
                const campaignId = rawCampaign['campaign_id']
                const count = rawCampaign['count']
                if (isNaN(gachaId) || isNaN(campaignId) || isNaN(count)) throw new Error(`Invalid or missing fields for 'gacha_campaign_list' field.`);

                return {
                    gachaId: gachaId,
                    campaignId: campaignId,
                    count: count
                }
            })
        }

        // deserialize player options
        const userOption = toDeserialize['user_option']
        if (userOption === undefined) throw new Error("Missing 'user_option' field.");

        // deserialize drawn quest list
        const userDrawnQuestList = toDeserialize['drawn_quest_list']
        if (userDrawnQuestList === undefined) throw new Error("Missing 'drawn_quest_list' field.");

        const drawnQuestList: PlayerDrawnQuest[] = userDrawnQuestList.map(drawnQuest => {
            const categoryId = drawnQuest['category_id']
            const questId = drawnQuest['quest_id']
            const oddsId = drawnQuest['odds_id']

            if (isNaN(categoryId) || isNaN(questId) || isNaN(oddsId)) throw new Error(`Invalid or missing fields for 'drawn_quest_list' field.`);

            return {
                categoryId: categoryId,
                questId: questId,
                oddsId: oddsId
            }
        })

        // deserialize periodic reward point list
        const periodicRewardPointList = toDeserialize['user_periodic_reward_point_list']
        if (periodicRewardPointList === undefined) throw new Error("Missing 'user_periodic_reward_point_list' field.");

        // deserialize active mission list
        const allActiveMissionList = toDeserialize['all_active_mission_list']
        if (allActiveMissionList === undefined) throw new Error("Missing 'all_active_mission_list' field.");

        // convert box gacha list
        const userBoxGachaList = toDeserialize['box_gacha_list']
        if (userBoxGachaList === undefined) throw new Error("Missing 'box_gacha_list' field.");

        const boxGachaList: Record<string, PlayerBoxGacha[]> = {}
        for (const [section, list] of Object.entries(userBoxGachaList)) {
            boxGachaList[section] = list.map(boxGacha => {
                const boxId = boxGacha['box_id']
                const resetTimes = boxGacha['reset_times']
                const remainingNumber = boxGacha['remaining_number']
                const isClosed = boxGacha['is_closed']

                if (isNaN(boxId) || isNaN(resetTimes) || isNaN(remainingNumber) || isClosed === undefined) throw new Error(`Invalid or missing fields for 'box_gacha_list' field in section ${section}.`);

                return {
                    boxId: boxId,
                    resetTimes: resetTimes,
                    remainingNumber: remainingNumber,
                    isClosed: isClosed
                }
            })
        }

        // deserialize start dash exchange campaign list
        const userStartDashCampaignList = toDeserialize['start_dash_exchange_campaign_list']
        if (userStartDashCampaignList === undefined) throw new Error("Missing 'start_dash_exchange_campaign_list' field.");

        const startDashExchangeCampaignList: PlayerStartDashExchangeCampaign[] = userStartDashCampaignList.map(campaign => {
            const campaignId = campaign['campaign_id']
            const gachaId = campaign['gacha_id']
            const periodStartTime = campaign['period_start_time']
            const periodEndTime = campaign['period_end_time']
            const status = campaign['status']
            const termIndex = campaign['term_index']

            if (isNaN(campaignId) || isNaN(gachaId) || isNaN(periodStartTime) || isNaN(periodEndTime) || isNaN(status) || isNaN(termIndex))
                throw new Error("Invalid or missing fields for 'start_dash_exchange_campaign_list' field.");

            return {
                campaignId: campaignId,
                gachaId: gachaId,
                periodStartTime: getDateFromServerTime(periodStartTime),
                periodEndTime: getDateFromServerTime(periodEndTime),
                status: status,
                termIndex: termIndex
            }
        })

        // deserialize multi special exchange campaign list
        const userMultiSpecialExchangeCampaignList = toDeserialize['multi_special_exchange_campaign_list']

        let multiSpecialExchangeCampaignList: PlayerMultiSpecialExchangeCampaign[] = []
        if (userMultiSpecialExchangeCampaignList !== undefined) {
            multiSpecialExchangeCampaignList = userMultiSpecialExchangeCampaignList.map(campaign => {
                const campaignId = campaign['campaign_id']
                const status = campaign['status']
    
                if (isNaN(campaignId) || isNaN(status))
                    throw new Error("Invalid or missing fields for 'multi_special_exchange_campaign_list' field.");
    
                return {
                    campaignId: campaignId,
                    status: status
                }
            })
        }
        

        return {
            player: player,
            dailyChallengePointList: dailyChallengePointList,
            triggeredTutorial: triggeredTutorial,
            clearedRegularMissionList: clearedRegularMissionList,
            characterList: characterList,
            characterManaNodeList: characterManaNodeList,
            partyGroupList: partyGroupList,
            itemList: itemList,
            equipmentList: equipmentList,
            questProgress: questProgress,
            gachaInfoList: gachaInfoList,
            gachaCampaignList: gachaCampaignList,
            drawnQuestList: drawnQuestList,
            periodicRewardPointList: periodicRewardPointList,
            allActiveMissionList: allActiveMissionList,
            boxGachaList: boxGachaList,
            purchasedTimesList: {},
            startDashExchangeCampaignList: startDashExchangeCampaignList,
            multiSpecialExchangeCampaignList: multiSpecialExchangeCampaignList,
            userOption: userOption
        }

    } catch (error: Error | any) {
        throw error
    }
}

/**
 * Serializes a date in a format expected by the client.
 * Format: YYYY-MM-DD HH:MM:SS
 * 
 * @param date The date to serialize.
 * @returns A serialized date as a string.
 */
export function clientSerializeDate(
    date: Date
): string {
    return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")} ${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`
}

/**
 * Deserializes a date from a format expected by the client into a Date.
 * Format: YYYY-MM-DD HH:MM:SS
 * 
 * @param date A serialized date as a string.
 * @returns The deserialized date.
 */
export function deserializeClientDate(
    serializedDate: string
): Date {
    return new Date(`${serializedDate.replace(' ', 'T')}.000Z`)
}

/**
 * Takes a playerID and returns all of the necessary data for the game client.
 * 
 * @param playerId 
 * @param viewerId 
 * @returns 
 */
export function getClientSerializedData(
    playerId: number,
    viewerId: number
): ClientPlayerData | null {

    const playerData = getPlayerSync(playerId)
    if (playerData === null) return null

    return serializePlayerData({
        player: playerData,
        dailyChallengePointList: getPlayerDailyChallengePointListSync(playerId),
        triggeredTutorial: getPlayerTriggeredTutorialsSync(playerId),
        clearedRegularMissionList: getPlayerClearedRegularMissionListSync(playerId),
        characterList: getPlayerCharactersSync(playerId),
        characterManaNodeList: getPlayerCharactersManaNodesSync(playerId),
        partyGroupList: getPlayerPartyGroupListSync(playerId),
        itemList: getPlayerItemsSync(playerId),
        equipmentList: getPlayerEquipmentListSync(playerId),
        questProgress: getPlayerQuestProgressSync(playerId),
        gachaInfoList: getPlayerGachaInfoListSync(playerId),
        gachaCampaignList: getPlayerGachaCampaignListSync(playerId),
        drawnQuestList: getPlayerDrawnQuestsSync(playerId),
        periodicRewardPointList: getPlayerPeriodicRewardPointsSync(playerId),
        allActiveMissionList: getPlayerActiveMissionsSync(playerId),
        boxGachaList: getPlayerBoxGachasSync(playerId),
        purchasedTimesList: {},
        startDashExchangeCampaignList: getPlayerStartDashExchangeCampaignsSync(playerId),
        multiSpecialExchangeCampaignList: getPlayerMultiSpecialExchangeCampaignsSync(playerId),
        userOption: getPlayerOptionsSync(playerId)
    }, viewerId)
}