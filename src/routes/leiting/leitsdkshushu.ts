// leitsdkshushu.leiting.com:19083

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/sync_data", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0
        })
    })

}

export default routes;