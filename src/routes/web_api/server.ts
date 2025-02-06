import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { setServerTime } from "../../utils";
import { givePlayerCharacterSync } from "../../lib/character";
import { givePlayerEquipmentSync } from "../../lib/equipment";
import { SendMail, MAIL_TYPE } from "../../nya/mail";

interface TimeQuery {
    time: string | undefined
}

const routes = async (fastify: FastifyInstance) => {

    fastify.get("/resetTime", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // convert string to date
            setServerTime(null)
        } catch (error) { }

        return reply.redirect(`/`);
    })

    fastify.get("/time", async (request: FastifyRequest, reply: FastifyReply) => {
        const newTime = (request.query as TimeQuery).time
        if (!newTime) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid query parameters."
        })

        try {
            // convert string to date
            const time = new Date(newTime + ".000Z")

            setServerTime(time)

        } catch (error) { }

        return reply.redirect(`/`);
    })

    fastify.get("/give", async (request: FastifyRequest, reply: FastifyReply) => {
        const q = request.query as { playerId: string, type: string, typeId: string, number?: string };
        if (!q.playerId || !q.type || !q.typeId) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid query parameters."
        });
        const playerId = parseInt(q.playerId);
        const typeId = parseInt(q.typeId);
        const number = q.number ? parseInt(q.number) : 1;
        if (isNaN(playerId) || isNaN(typeId) || isNaN(number)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid query parameters."
        });
        
        switch (q.type) {
            case "chara":
                SendMail(playerId, {
                    subject: "Give Character",
                    description: "From Web API",
                    type: MAIL_TYPE.CHARACTER,
                    type_id: typeId,
                    number: number
                })
                break;
            case "equip":
                SendMail(playerId, {
                    subject: "Give Equipment",
                    description: "From Web API",
                    type: MAIL_TYPE.EQUIPMENT,
                    type_id: typeId,
                    number: number
                })
                break;
            case "item":
                SendMail(playerId, {
                    subject: "Give Item",
                    description: "From Web API",
                    type: MAIL_TYPE.ITEM,
                    type_id: typeId,
                    number: number
                })
                break;
            default:
                return reply.status(400).send({
                    "error": "Bad Request",
                    "message": "Invalid query parameters."
                });
        }

        return reply.send({
            "error": "Success",
            "message": "Operation successful."
        });
    });
}

export default routes;