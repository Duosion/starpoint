// sdklog.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/api/policy/report", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "data": null,
            "message": "Starpoint",
            "status": 0
        })
    })

}

export default routes;