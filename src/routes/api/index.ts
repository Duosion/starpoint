import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getServerTime } from "../../utils";
import { SessionType } from "../../data/types";

const routes = async (fastify: FastifyInstance) => {
    /*fastify.post("/get_header_response", async (request: FastifyRequest, reply: FastifyReply) => {

        const body = request.body as GetHeaderResponseBody

        reply.header("content-type", "application/x-msgpack")

        reply.status(200).send({
            "data_headers": {
                "force_update": false,
                "asset_update": false,
                "short_udid": null,
                "viewer_id": body.viewer_id,
                "servertime": getServerTime(),
                "result_code": 1
            },
            "data": []
        })
    })*/


    fastify.post("/load", async (request: FastifyRequest, reply: FastifyReply) => {
        
    })
}

export default routes;