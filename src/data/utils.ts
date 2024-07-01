import { getDateFromServerTime, getServerTime } from "../utils"
import { ClientPlayerData, DailyChallengePointListEntry, MergedPlayerData, Player, PlayerActiveMission, PlayerBoxGacha, PlayerCharacter, PlayerCharacterBondToken, PlayerDrawnQuest, PlayerEquipment, PlayerGachaInfo, PlayerMultiSpecialExchangeCampaign, PlayerPartyGroup, PlayerPeriodicRewardPoint, PlayerQuestProgress, PlayerStartDashExchangeCampaign, UserBoxGacha, UserCharacter, UserCharacterBondTokenStatus, UserEquipment, UserPartyGroup, UserPartyGroupTeam, UserQuestProgress, UserTutorial } from "./types"

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
            "last_login_time": playerData.lastLoginTime,
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
        "available_asset_version": "2.1.121",
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
        "gacha_campaign_list": [
            {
                "campaign_id": 19,
                "gacha_id": 157,
                "count": 1
            },
            {
                "campaign_id": 19,
                "gacha_id": 700004,
                "count": 1
            },
            {
                "campaign_id": 19,
                "gacha_id": 155,
                "count": 1
            },
        ],
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
        tutorialStep: 0,
        tutorialSkipFlag: null
    }
}

/**
 * Deserializes client player data into data that can be processed by the server.
 * 
 * @param toDeserialize The client player data to be deserialized
 */
function deserializePlayerData(
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
            lastLoginTime: userInfo.last_login_time,
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



    } catch (error: number | any) {
        throw new Error(error)
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
    return `${date.getUTCFullYear()}-${date.getUTCMonth().toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")} ${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`
}