import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPlayerFromAccountId, getSession } from "../../data/wdfpData";
import { SessionType } from "../../data/types";
import { serializePlayerData } from "../../data/utils";
import { getServerTime } from "../../utils";

interface LoadBody {
    app_secret: string,
    graphics_device_name: string,
    device_id: number,
    access_token: string,
    storage_directory_path: string,
    app_admin: string,
    kakao_pid: string,
    keychain: number,
    viewer_id: number,
    platform_os_version: string
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/load", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as LoadBody

        const zat = body.access_token
        if (!zat) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const session = await getSession(zat)
        if (session === null || session.type !== SessionType.ZAT) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid zat provided."
        })

        const playerData = getPlayerFromAccountId(session.accountId)
        if (playerData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No player data exists."
        })

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": {
                "force_update": false,
                "asset_update": true,
                "short_udid": 0,
                "viewer_id": 0,
                "servertime": getServerTime(),
                "result_code": 1
            },
            "data": serializePlayerData(playerData)
        })
    })
}

export default routes;