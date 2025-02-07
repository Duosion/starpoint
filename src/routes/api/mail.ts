// Handles mail.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateDataHeaders } from "../../utils";
import { ClientError, viewer_id_to_player_id } from "../../nya/utils";
import { GetMails, ProcessMail, ProcessAllMails } from "../../nya/mail";

interface IndexBody {
    api_count: number,
    viewer_id: number,
    app_secret: string,
    current_page: number,
    app_admin: string
}

interface ReceiveResponse {
    auto_sale_expired_mail: boolean,
    dispose_expired_mail: boolean,
    total_count: number,

    user_periodic_reward_point_list?: { id: number, point: number }[],
    character_list?: Object[],
    crazy_gacha_result_list?: Object[],
    equipment_list?: Object[],
    fund_receive_list?: Object[],
    item_list?: Object[],
    mail_arrived?: boolean,
    monthly_charge_bonus_info?: Object[],
    user_daily_challenge_point_list?: Object[],
    user_info?: Object,
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/index", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as IndexBody

        let playerId: number
        try {
            playerId = await viewer_id_to_player_id(body.viewer_id);
        } catch (e) {
            if (e instanceof ClientError) {
                return reply.status(400).send({
                    "error": "Bad Request",
                    "message": e.message
                });
            }
            throw e;
        }

        const mails = GetMails(playerId);


        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: body.viewer_id
            }),
            "data": {
                "mail": mails,
                "total_count": mails.length,
            }
        })
    })

    fastify.post("/receive", async (request: FastifyRequest, reply: FastifyReply) => {
        const { viewer_id, mail_id } = request.body as { viewer_id: number, mail_id: number };
        try {
            const playerId = await viewer_id_to_player_id(viewer_id);
            const data = ProcessMail(playerId, mail_id);
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id
                }),
                "data": data,
            });
        } catch (e) {
            if (e instanceof ClientError) {
                return reply.status(400).send({
                    "error": "Bad Request",
                    "message": e.message
                });
            }
            throw e;
        }
    })

    fastify.post("/receive_all", async (request: FastifyRequest, reply: FastifyReply) => {
        const { viewer_id, mail_ids } = request.body as { viewer_id: number, mail_ids: number[] };
        try {
            const playerId = await viewer_id_to_player_id(viewer_id);
            const data = ProcessAllMails(playerId);
            return reply.status(200).send({
                "data_headers": generateDataHeaders({
                    viewer_id
                }),
                "data": data,
            });
        } catch (e) {
            if (e instanceof ClientError) {
                return reply.status(400).send({
                    "error": "Bad Request",
                    "message": e.message
                });
            }
            throw e;
        }
    })
}

export default routes;