import { getServerTime } from "../utils"
import { Player, PlayerParty, PlayerPartyGroup } from "./types"

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
 * Serializes a player data object in the way that the world flipper client expects it.
 * 
 * @param player The player data object to serialize.
 * @returns A serialized player data object.
 */
export function serializePlayerData(
    player: Player,
    viewerId?: number
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

    // handle tutorial
    let userTutorial: Record<string, any> | null = null
    const tutorialStep = player.tutorialStep
    if (tutorialStep !== null) {
        userTutorial = {
            "viewer_id": viewerId || 0,
            "tutorial_step": tutorialStep,
            "skip_flag": player.tutorialSkipFlag
        }

        if (tutorialStep >= 1) {
            userTutorial["powerflip_failure"] = 0
        }
    }

    console.log(userTutorial)

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
        "user_tutorial": userTutorial,
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

/**
 * Generates default player data.
 * 
 * @returns The generated default player data.
 */
export function getDefaultPlayerData(): Omit<Player, 'id'> {
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
        tutorialSkipFlag: null,
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
}