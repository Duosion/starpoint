import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { deleteAccountSessionsOfType, getPlayerFromAccountId, getSession, insertSessionWithToken, validateViewerId } from "../../data/wdfpData";
import { SessionType } from "../../data/types";
import { serializePlayerData } from "../../data/utils";
import { generateDataHeaders, generateViewerId, getServerTime } from "../../utils";

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
        let viewerId = body.viewer_id
        if (!zat || !viewerId || isNaN(viewerId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const session = await getSession(zat)
        if (session === null || session.type !== SessionType.ZAT) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid zat provided."
        })

        const accountId = session.accountId

        const playerData = getPlayerFromAccountId(accountId)
        if (playerData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No player data exists."
        })

        viewerId = await validateViewerId(accountId, viewerId)

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders({
                asset_update: true,
                viewer_id: viewerId
            }),
            "data": serializePlayerData(playerData, viewerId)
        })
    })
}

export default routes;