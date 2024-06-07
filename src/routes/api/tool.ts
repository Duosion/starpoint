import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getServerTime } from "../../utils";
import { getSession } from "../../data/wdfpData";
import { SessionType } from "../../data/types";

interface GetHeaderResponseBody {
    viewer_id: number
}

interface SignupBody {
    app_secret: string
    access_token: string
    storage_directory_path: string
    app_admin: string
    kakao_pkd: string,
    device_id: number,
    idp_code: string
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/get_header_response", (request: FastifyRequest, reply: FastifyReply) => {
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
    })

    fastify.post("/signup", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SignupBody
        
        const zat = body.access_token
        if (!zat) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const udid = request.headers['udid']
        const accountId = request.headers['kakao_pid']
        if (!udid || !accountId) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid headers."
        })

        const session = await getSession(zat)
        if (session === null || session.type !== SessionType.ZAT) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid zat provided."
        })

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": {
                "short_udid": 8888,
                "viewer_id": 9999,
                "udid": udid,
                "servertime": getServerTime(),
                "result_code": 1
            },
            "data": []
        })
    })
}

export default routes;