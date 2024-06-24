

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateDataHeaders, getServerTime } from "../../utils";
import enFull from "../../../assets/cdn/en-full.json";
import enShort from "../../../assets/cdn/en-short.json";

interface GetPathBody {
    target_asset_version: string,
    viewer_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/version_info", async(request: FastifyRequest, reply: FastifyReply) => {
        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders(),
            "data": {
                "base_url": "{$cdnAddress}/en/entities/files/",
                "files_list": "{$cdnAddress}/en/entities/2.1.121-android_medium.csv",
                "total_size": 8846079322,
                "delayed_assets_size": 6919955738
            }
        })
    })
    
    fastify.post("/get_path", async (request: FastifyRequest, reply: FastifyReply) => {
        const header = request.headers['asset_size']
        if (!header) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid headers provided."
        })

        reply.header("content-type", "application/x-msgpack")
        if (header === 'fulfill') {
            reply.status(200).send(enFull)
        } else {
            // send short
            reply.status(200).send(enShort)
        }
    })
}

export default routes;