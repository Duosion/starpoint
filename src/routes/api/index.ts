import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/load", async (request: FastifyRequest, reply: FastifyReply) => {
        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": {
                "force_update": false,
                "asset_update": true,
                "short_udid": 409957194,
                "viewer_id": 666701219,
                "servertime": 1717734318,
                "result_code": 1
            },
            "data": {
                "user_info": {
                    "stamina": 20,
                    "stamina_heal_time": 1717734318,
                    "boost_point": 3,
                    "boss_boost_point": 3,
                    "transition_state": 0,
                    "role": 1,
                    "name": "플레이어",
                    "last_login_time": "2024-06-07 13:25:17",
                    "comment": "Nice to meet you.",
                    "vmoney": 0,
                    "free_vmoney": 150,
                    "rank_point": 10,
                    "star_crumb": 0,
                    "bond_token": 0,
                    "exp_pool": 0,
                    "exp_pooled_time": 1717734317,
                    "leader_character_id": 1,
                    "party_slot": 1,
                    "degree_id": 1,
                    "birth": 19900101,
                    "free_mana": 1000,
                    "paid_mana": 0,
                    "enable_auto_3x": false
                },
                "premium_bonus_list": [],
                "expired_premium_bonus_list": null,
                "user_daily_challenge_point_list": [
                    {
                        "id": 1,
                        "point": 2,
                        "campaign_list": [
                            {
                                "campaign_id": 2023013101,
                                "additional_point": 2
                            }
                        ]
                    },
                    {
                        "id": 251,
                        "point": 2,
                        "campaign_list": [
                            {
                                "campaign_id": 2023013102,
                                "additional_point": 2
                            }
                        ]
                    },
                    {
                        "id": 5001,
                        "point": 10,
                        "campaign_list": []
                    },
                    {
                        "id": 10008,
                        "point": 1,
                        "campaign_list": []
                    }
                ],
                "bonus_index_list": null,
                "login_bonus_received_at": null,
                "user_notice_list": [],
                "user_triggered_tutorial": [],
                "user_tutorial": {
                    "viewer_id": 666701219,
                    "tutorial_step": 0,
                    "skip_flag": null
                },
                "tutorial_gacha": null,
                "cleared_regular_mission_list": [],
                "user_character_list": {
                    "1": {
                        "entry_count": 1,
                        "evolution_level": 0,
                        "over_limit_step": 0,
                        "protection": false,
                        "join_time": 1717734317,
                        "update_time": 1717734317,
                        "exp": 10,
                        "stack": 0,
                        "bond_token_list": [
                            {
                                "mana_board_index": 1,
                                "status": 0
                            },
                            {
                                "mana_board_index": 2,
                                "status": 0
                            }
                        ],
                        "mana_board_index": 1
                    }
                },
                "user_character_mana_node_list": [],
                "user_party_group_list": {
                    "1": {
                        "list": {
                            "1": {
                                "name": "Party A",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "2": {
                                "name": "Party B",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "3": {
                                "name": "Party C",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "4": {
                                "name": "Party D",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "5": {
                                "name": "Party E",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "6": {
                                "name": "Party F",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "7": {
                                "name": "Party G",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "8": {
                                "name": "Party H",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "9": {
                                "name": "Party I",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "10": {
                                "name": "Party J",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            }
                        },
                        "color_id": 15
                    },
                    "2": {
                        "list": {
                            "11": {
                                "name": "Party A",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "12": {
                                "name": "Party B",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "13": {
                                "name": "Party C",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "14": {
                                "name": "Party D",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "15": {
                                "name": "Party E",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "16": {
                                "name": "Party F",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "17": {
                                "name": "Party G",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "18": {
                                "name": "Party H",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "19": {
                                "name": "Party I",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "20": {
                                "name": "Party J",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            }
                        },
                        "color_id": 15
                    },
                    "3": {
                        "list": {
                            "21": {
                                "name": "Party A",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "22": {
                                "name": "Party B",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "23": {
                                "name": "Party C",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "24": {
                                "name": "Party D",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "25": {
                                "name": "Party E",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "26": {
                                "name": "Party F",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "27": {
                                "name": "Party G",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "28": {
                                "name": "Party H",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "29": {
                                "name": "Party I",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "30": {
                                "name": "Party J",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            }
                        },
                        "color_id": 15
                    },
                    "4": {
                        "list": {
                            "31": {
                                "name": "Party A",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "32": {
                                "name": "Party B",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "33": {
                                "name": "Party C",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "34": {
                                "name": "Party D",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "35": {
                                "name": "Party E",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "36": {
                                "name": "Party F",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "37": {
                                "name": "Party G",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "38": {
                                "name": "Party H",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "39": {
                                "name": "Party I",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "40": {
                                "name": "Party J",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            }
                        },
                        "color_id": 15
                    },
                    "5": {
                        "list": {
                            "41": {
                                "name": "Party A",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "42": {
                                "name": "Party B",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "43": {
                                "name": "Party C",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "44": {
                                "name": "Party D",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "45": {
                                "name": "Party E",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "46": {
                                "name": "Party F",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "47": {
                                "name": "Party G",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "48": {
                                "name": "Party H",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "49": {
                                "name": "Party I",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "50": {
                                "name": "Party J",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            }
                        },
                        "color_id": 15
                    },
                    "6": {
                        "list": {
                            "51": {
                                "name": "Party A",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "52": {
                                "name": "Party B",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "53": {
                                "name": "Party C",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "54": {
                                "name": "Party D",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "55": {
                                "name": "Party E",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "56": {
                                "name": "Party F",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "57": {
                                "name": "Party G",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "58": {
                                "name": "Party H",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "59": {
                                "name": "Party I",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            },
                            "60": {
                                "name": "Party J",
                                "character_ids": [
                                    1,
                                    null,
                                    null
                                ],
                                "unison_character_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "equipment_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "ability_soul_ids": [
                                    null,
                                    null,
                                    null
                                ],
                                "edited": false,
                                "options": {
                                    "allow_other_players_to_heal_me": true
                                }
                            }
                        },
                        "color_id": 15
                    }
                },
                "item_list": [],
                "user_equipment_list": [],
                "user_character_from_town_history": [],
                "quest_progress": [],
                "last_main_quest_id": null,
                "gacha_info_list": [
                    {
                        "gacha_id": 2,
                        "is_daily_first": true,
                        "is_account_first": true
                    },
                    {
                        "gacha_id": 4,
                        "is_daily_first": true,
                        "is_account_first": true
                    },
                    {
                        "gacha_id": 900003,
                        "is_daily_first": true,
                        "is_account_first": true
                    },
                    {
                        "gacha_id": 157,
                        "is_daily_first": true,
                        "is_account_first": true,
                        "gacha_exchange_point": 0
                    },
                    {
                        "gacha_id": 57,
                        "is_daily_first": true,
                        "is_account_first": true
                    },
                    {
                        "gacha_id": 5033,
                        "is_daily_first": true,
                        "is_account_first": true,
                        "gacha_exchange_point": 0
                    },
                    {
                        "gacha_id": 900000,
                        "is_daily_first": true,
                        "is_account_first": true
                    },
                    {
                        "gacha_id": 155,
                        "is_daily_first": true,
                        "is_account_first": true,
                        "gacha_exchange_point": 0
                    },
                    {
                        "gacha_id": 9,
                        "is_daily_first": true,
                        "is_account_first": true
                    }
                ],
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
                "drawn_quest_list": [
                    {
                        "category_id": 6,
                        "quest_id": 5001,
                        "odds_id": 5
                    },
                    {
                        "category_id": 6,
                        "quest_id": 5002,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 5003,
                        "odds_id": 1
                    },
                    {
                        "category_id": 6,
                        "quest_id": 5004,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 5005,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 13001,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 13002,
                        "odds_id": 4
                    },
                    {
                        "category_id": 6,
                        "quest_id": 13003,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 13004,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 13005,
                        "odds_id": 9
                    },
                    {
                        "category_id": 6,
                        "quest_id": 13006,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 14001,
                        "odds_id": 4
                    },
                    {
                        "category_id": 6,
                        "quest_id": 14002,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 14003,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 14004,
                        "odds_id": 5
                    },
                    {
                        "category_id": 6,
                        "quest_id": 14005,
                        "odds_id": 8
                    },
                    {
                        "category_id": 6,
                        "quest_id": 14006,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 15001,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 15002,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 15003,
                        "odds_id": 5
                    },
                    {
                        "category_id": 6,
                        "quest_id": 15004,
                        "odds_id": 4
                    },
                    {
                        "category_id": 6,
                        "quest_id": 15005,
                        "odds_id": 7
                    },
                    {
                        "category_id": 6,
                        "quest_id": 15006,
                        "odds_id": 5
                    },
                    {
                        "category_id": 6,
                        "quest_id": 16001,
                        "odds_id": 1
                    },
                    {
                        "category_id": 6,
                        "quest_id": 16002,
                        "odds_id": 8
                    },
                    {
                        "category_id": 6,
                        "quest_id": 16003,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 16004,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 16005,
                        "odds_id": 1
                    },
                    {
                        "category_id": 6,
                        "quest_id": 16006,
                        "odds_id": 9
                    },
                    {
                        "category_id": 6,
                        "quest_id": 17001,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 17002,
                        "odds_id": 8
                    },
                    {
                        "category_id": 6,
                        "quest_id": 17003,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 17004,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 17005,
                        "odds_id": 7
                    },
                    {
                        "category_id": 6,
                        "quest_id": 17006,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 18001,
                        "odds_id": 8
                    },
                    {
                        "category_id": 6,
                        "quest_id": 18002,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 18003,
                        "odds_id": 4
                    },
                    {
                        "category_id": 6,
                        "quest_id": 18004,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 18005,
                        "odds_id": 4
                    },
                    {
                        "category_id": 6,
                        "quest_id": 18006,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19001,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19002,
                        "odds_id": 7
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19003,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19004,
                        "odds_id": 3
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19005,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19006,
                        "odds_id": 1
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19007,
                        "odds_id": 7
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19008,
                        "odds_id": 7
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19009,
                        "odds_id": 5
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19010,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19011,
                        "odds_id": 2
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19012,
                        "odds_id": 9
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19013,
                        "odds_id": 4
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19014,
                        "odds_id": 8
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19015,
                        "odds_id": 1
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19016,
                        "odds_id": 1
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19017,
                        "odds_id": 6
                    },
                    {
                        "category_id": 6,
                        "quest_id": 19018,
                        "odds_id": 4
                    },
                    {
                        "category_id": 14,
                        "quest_id": 1001,
                        "odds_id": 21
                    },
                    {
                        "category_id": 14,
                        "quest_id": 1002,
                        "odds_id": 30
                    },
                    {
                        "category_id": 14,
                        "quest_id": 1003,
                        "odds_id": 20
                    },
                    {
                        "category_id": 14,
                        "quest_id": 1004,
                        "odds_id": 27
                    },
                    {
                        "category_id": 14,
                        "quest_id": 1005,
                        "odds_id": 9
                    },
                    {
                        "category_id": 14,
                        "quest_id": 1006,
                        "odds_id": 35
                    }
                ],
                "mail_arrived": false,
                "user_periodic_reward_point_list": [
                    {
                        "id": 1,
                        "point": 22
                    },
                    {
                        "id": 2,
                        "point": 2
                    },
                    {
                        "id": 3,
                        "point": 2
                    },
                    {
                        "id": 10000000,
                        "point": 2
                    }
                ],
                "all_active_mission_list": [],
                "cleared_collect_item_event_mission_list": [],
                "box_gacha_list": {
                    "1011": [
                        {
                            "box_id": 1,
                            "reset_times": 0,
                            "remaining_number": 572,
                            "is_closed": false
                        },
                        {
                            "box_id": 2,
                            "reset_times": 0,
                            "remaining_number": 647,
                            "is_closed": false
                        },
                        {
                            "box_id": 3,
                            "reset_times": 0,
                            "remaining_number": 732,
                            "is_closed": false
                        },
                        {
                            "box_id": 4,
                            "reset_times": 0,
                            "remaining_number": 912,
                            "is_closed": false
                        },
                        {
                            "box_id": 5,
                            "reset_times": 0,
                            "remaining_number": 1401,
                            "is_closed": false
                        }
                    ]
                },
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
                "start_dash_exchange_campaign_list": [],
                "multi_special_exchange_campaign_list": [
                    {
                        "campaign_id": 3,
                        "status": 1
                    }
                ],
                "associate_token": "924fd3af8c5cff69a4b93459ca659176",
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
        })
    })
}

export default routes;