// logmonitor.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/api/mg_log!addMgActivateLog.action", (_, reply: FastifyReply) => {
        reply.status(200).send(`{"message":"activate","status":"success"}`)
    })

    fastify.post("/behavior_log/report", (_, reply: FastifyReply) => {
        reply.status(200).send(`{"message":"behavior_report","status":"success"}`)
    })

}

export default routes;