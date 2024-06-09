import { getServerTime } from "../utils"
import { Player } from "./types"

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

export function serializePlayerData(
    player: Player
): Object {

    // convert userCharacterList
    const userCharacterList: Record<string, Object> = {}
    for (const [characterId, character] of Object.entries(player.characterList)) {
        // convert bond tokens
        const bondTokenList: any = []
        for (const bondToken of character.bondTokenList) {
            userCharacterList[characterId] = {
                "entry_count": character.entryCount,
                "evolution_level": character.evolutionLevel,
                "over_limit_step": character.overLimitStep,
                "protection": character.protection,
                "join_time": getServerTime(character.joinTime),
                "update_time": getServerTime(character.updateTime),
                "exp": character.exp,
                "stack": character.stack,
                "bond_token_list": character.bondTokenList.map(bondToken => {
                    return {
                        "mana_board_index": bondToken.manaBoardIndex,
                        "status": bondToken.status
                    }
                }),
                "mana_board_index": 1
            }
        }
    }

    // convert parties
    const userPartyGroupList: Record<string, Object> = {}
    for (const [groupId, group] of Object.entries(player.partyGroupList)) {
        const list: Record<string, Object> = {}
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
    const userEquipmentList: Record<string, Object> = {}
    for (const [equipmentId, equipment] of Object.entries(player.equipmentList)) {
        userEquipmentList[equipmentId] = {
            "enhancement_level": equipment.enhancementLevel,
            "level": equipment.level,
            "protection": equipment.protection,
            "stack": equipment.stack
        }
    }

    // convert player Quest Progress
    const questProgress: Record<string, Object> = {}
    for (const [section, progresses] of Object.entries(player.questProgress)) {
        const list: Object[] = []
        for (const progress of progresses) {
            list.push({
                "best_elapsed_time_ms": progress.bestElapsedTimeMs,
                "clear_rank": progress.clearRank,
                "finished": progress.finished,
                "high_score": progress.highScore,
                "quest_id": progress.questId
            })
        }
        questProgress[section] = list
    }

    // convert box gacha list
    const boxGachaList: Record<string, Object> = {}
    for (const [section, list] of Object.entries(player.boxGachaList)) {
        boxGachaList[section] = list.map(boxGacha => {
            return {
                "box_id": boxGacha.boxId,
                "reset_times": boxGacha.resetTimes,
                "remaining_number": boxGacha.remainingNumber,
                "is_closed": boxGacha.isClosed
            }
        })
    }

    return {
        "user_info": {
            "stamina": player.stamina,
            "stamina_heal_time": getServerTime(player.staminaHealTime),
            "boost_point": player.boostPoint,
            "boss_boost_point": player.bossBoostPoint,
            "transition_state": player.transitionState,
            "role": player.role,
            "name": player.name,
            "last_login_time": player.lastLoginTime,
            "comment": player.comment,
            "vmoney": player.vmoney,
            "free_vmoney": player.freeVmoney,
            "rank_point": player.rankPoint,
            "star_crumb": player.starCrumb,
            "bond_token": player.bondToken,
            "exp_pool": player.expPool,
            "exp_pooled_time": getServerTime(player.expPooledTime),
            "leader_character_id": player.leaderCharacterId,
            "party_slot": player.partySlot,
            "degree_id": player.degreeId,
            "birth": player.birth,
            "free_mana": player.freeMana,
            "paid_mana": player.paidMana,
            "enable_auto_3x": player.enableAuto3x
        },
        "premium_bonus_list": [],
        "expired_premium_bonus_list": null,
        "user_daily_challenge_point_list": player.dailyChallengePointList.map(dailyChallenge => {
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
        "user_triggered_tutorial": player.triggeredTutorial,
        "user_tutorial": {
            "viewer_id": 0,
            "tutorial_step": 0,
            "skip_flag": null
        },
        "tutorial_gacha": null,
        "cleared_regular_mission_list": player.clearedRegularMissionList,
        "user_character_list": userCharacterList,
        "user_character_mana_node_list": player.characterManaNodeList,
        "user_party_group_list": userPartyGroupList,
        "item_list": player.itemList,
        "user_equipment_list": userEquipmentList,
        "user_character_from_town_history": [],
        "quest_progress": questProgress,
        "last_main_quest_id": null,
        "gacha_info_list": player.gachaInfoList.map(gachaInfo => {
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
        "user_option": {
            "gacha_play_no_rarity_up_movie": false,
            "auto_play": false,
            "number_notation_symbol": true,
            "payment_alert": true,
            "room_number_hidden": false,
            "attention_sound_effect": true,
            "attention_vibration": false,
            "attention_enable_in_battle": true,
            "simple_ability_description": false
        },
        "drawn_quest_list": player.drawnQuestList.map(drawnQuest => {
            return {
                "category_id": drawnQuest.categoryId,
                "quest_id": drawnQuest.questId,
                "odds_id": drawnQuest.oddsId
            }
        }),
        "mail_arrived": false,
        "user_periodic_reward_point_list": player.periodicRewardPointList,
        "all_active_mission_list": player.allActiveMissionList,
        "cleared_collect_item_event_mission_list": [],
        "box_gacha_list": boxGachaList,
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
            }
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
        "start_dash_exchange_campaign_list": player.startDashExchangeCampaignList.map(campaign => {
            return {
                "campaign_id": campaign.campaignId,
                "gacha_id": campaign.gachaId,
                "period_start_time": getServerTime(campaign.periodStartTime),
                "period_end_time": getServerTime(campaign.periodEndTime),
                "status": campaign.status,
                "term_index": campaign.termIndex
            }
        }),
        "multi_special_exchange_campaign_list": player.multiSpecialExchangeCampaignList.map(campaign => {
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