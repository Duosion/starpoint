import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAccountPlayers, getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

interface ExecBody {
    api_count: number,
    payment_type: number,
    number_of_exec: number,
    viewer_id: number,
    gacha_id: number,
    type: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/exec", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ExecBody

        const viewerId = body.viewer_id
        if (!viewerId || isNaN(viewerId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        // get player
        const playerIds = await getAccountPlayers(viewerIdSession.accountId)
        const playerId = playerIds[0]
        if (isNaN(playerId)) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "draw": [
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                ],
                "gacha_info_list": [
                    {
                        "gacha_id": 157,
                        "is_account_first": false,
                        "gacha_exchange_point": 10
                    }
                ],
                "gacha_campaign_list": [
                    {
                        "campaign_id": 19,
                        "gacha_id": 157,
                        "count": 0
                    },
                    {
                        "campaign_id": 19,
                        "gacha_id": 700004,
                        "count": 0
                    },
                    {
                        "campaign_id": 19,
                        "gacha_id": 155,
                        "count": 0
                    }
                ],
                "character_list": [
                    {
                        "viewer_id": viewerId,
                        "character_id": 161153,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    }
                ],
                "encyclopedia_info": {
                    "116115301": {
                        "read": false
                    }
                },
                "mail_arrived": false
            }
        })
        reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "draw": [
                    {
                        "null": 1,
                        "character_id": 161153,
                        "movie_id": "fes_guarantee",
                        "seed": 10004166,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 331004,
                        "movie_id": "fes",
                        "seed": 10004122,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 311013,
                        "movie_id": "fes",
                        "seed": 10001209,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 311012,
                        "movie_id": "fes",
                        "seed": 10005992,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 261007,
                        "movie_id": "fes",
                        "seed": 10002855,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 331003,
                        "movie_id": "fes",
                        "seed": 10002902,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 351005,
                        "movie_id": "fes",
                        "seed": 10004630,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 361005,
                        "movie_id": "fes",
                        "seed": 10000786,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 251003,
                        "movie_id": "fes",
                        "seed": 10006046,
                        "entry_count": 1
                    },
                    {
                        "null": 1,
                        "character_id": 361001,
                        "movie_id": "fes",
                        "seed": 10006095,
                        "entry_count": 1
                    }
                ],
                "gacha_info_list": [
                    {
                        "gacha_id": 157,
                        "is_account_first": false,
                        "gacha_exchange_point": 10
                    }
                ],
                "gacha_campaign_list": [
                    {
                        "campaign_id": 19,
                        "gacha_id": 157,
                        "count": 0
                    },
                    {
                        "campaign_id": 19,
                        "gacha_id": 700004,
                        "count": 0
                    },
                    {
                        "campaign_id": 19,
                        "gacha_id": 155,
                        "count": 0
                    }
                ],
                "character_list": [
                    {
                        "viewer_id": viewerId,
                        "character_id": 161153,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 331004,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 311013,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 311012,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 261007,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 331003,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 351005,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 361005,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 251003,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    },
                    {
                        "viewer_id": viewerId,
                        "character_id": 361001,
                        "entry_count": 1,
                        "exp": 0,
                        "exp_total": 0,
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
                        "mana_board_index": 1,
                        "create_time": "2024-06-08 05:41:19",
                        "update_time": "2024-06-08 06:02:21",
                        "join_time": "2024-06-08 06:02:21"
                    }
                ],
                "encyclopedia_info": {
                    "116115301": {
                        "read": false
                    },
                    "125100301": {
                        "read": false
                    },
                    "126100701": {
                        "read": false
                    },
                    "131101201": {
                        "read": false
                    },
                    "131101301": {
                        "read": false
                    },
                    "133100301": {
                        "read": false
                    },
                    "133100401": {
                        "read": false
                    },
                    "135100501": {
                        "read": false
                    },
                    "136100101": {
                        "read": false
                    },
                    "136100501": {
                        "read": false
                    }
                },
                "mail_arrived": false
            }
        })
    })
}

export default routes;