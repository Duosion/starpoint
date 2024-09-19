import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SessionType } from "../../data/types";
import { getClientSerializedData, serializePlayerData } from "../../data/utils";
import { collectPlayerDataPooledExpSync, collectPlayerPooledExpSync, dailyResetPlayerDataSync, getAccountPlayers, getPlayerActiveMissionsSync, getPlayerBoxGachasSync, getPlayerCharactersManaNodesSync, getPlayerCharactersSync, getPlayerClearedRegularMissionListSync, getPlayerDailyChallengePointListSync, getPlayerDrawnQuestsSync, getPlayerEquipmentListSync, getPlayerGachaInfoListSync, getPlayerItemsSync, getPlayerMultiSpecialExchangeCampaignsSync, getPlayerOptionsSync, getPlayerPartyGroupListSync, getPlayerPeriodicRewardPointsSync, getPlayerQuestProgressSync, getPlayerStartDashExchangeCampaignsSync, getPlayerSync, getPlayerTriggeredTutorialsSync, getSession, updatePlayerSync } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";

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

        const viewerSession = await getSession(String(viewerId))
        if (viewerSession === null || viewerSession.type !== SessionType.VIEWER) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer ID provided."
        })

        const accountId = session.accountId

        const playerIds = await getAccountPlayers(accountId)
        const playerId = playerIds[0]
        const player = !isNaN(playerId) ? getPlayerSync(playerId) : null

        if (player === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // get last login time
        dailyResetPlayerDataSync(player)

        // collect the player's pooled exp
        collectPlayerDataPooledExpSync(player)

        const clientData = getClientSerializedData(playerId, { viewerId: viewerId })
        if (clientData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No player data."
        })

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders({
                asset_update: true,
                viewer_id: viewerId
            }),
            "data": clientData
        })
    })
}

export default routes;