// update.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";

const hexDisOutput = "efbbbf2f2f20e794a8e4ba8ee5ae98e69c8de6ada3e5bc8fe794a80d0a7b0d0a092264656661756c7422203a0d0a097b0d0a0909226170695061746822203a20227368696a7473777967616d6567662e6c656974696e672e636f6d222c0d0a097d0d0a7d"

const routes = async (fastify: FastifyInstance) => {

    fastify.get("/shijtswy/version/client_release_android.dis", (_, reply: FastifyReply) => {
        reply.header("content-type", "text/plain; utf-8")
        reply.status(200).send(Buffer.from(hexDisOutput, 'hex'))
    })

    
    fastify.get("/shijtswy/version/client_release_ios.dis", (_, reply: FastifyReply) => {
        reply.header("content-type", "text/plain; utf-8")
        reply.status(200).send(Buffer.from(hexDisOutput, 'hex'))
    })

}

export default routes;