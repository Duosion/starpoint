// api.sobot.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/chat-sdk/sdk/user/v2/config.action", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 1,
            "data": {
                "collectFlag": 1,
                "companyId": "a56cc6541e3646c38f5c65185d9bba73",
                "reqFrequency": 2,
                "support": 1
            },
            "message": "Hello world!",
            "msg": "Hello world!"
        })
    })

}

export default routes;