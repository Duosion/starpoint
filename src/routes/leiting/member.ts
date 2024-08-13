// member.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/aes/message/send_phone_code", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "status": 0
        })
    })

}

export default routes;