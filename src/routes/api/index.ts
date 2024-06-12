import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { collectPooledExpSync, deleteAccountSessionsOfType, getAccountPlayers, getPlayerActiveMissionsSync, getPlayerBoxGachasSync, getPlayerCharactersManaNodesSync, getPlayerCharactersSync, getPlayerClearedRegularMissionListSync, getPlayerDailyChallengePointListSync, getPlayerDrawnQuestsSync, getPlayerEquipmentSync, getPlayerFromAccountId, getPlayerGachaInfoSync, getPlayerItemsSync, getPlayerMultiSpecialExchangeCampaignsSync, getPlayerPartyGroupListSync, getPlayerPeriodicRewardPointsSync, getPlayerQuestProgressSync, getPlayerStartDashExchangeCampaignsSync, getPlayerSync, getPlayerTriggeredTutorialsSync, getSession, insertSessionWithToken, validateViewerId } from "../../data/wdfpData";
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

        const playerIds = await getAccountPlayers(accountId)
        const playerId = playerIds[0]

        if (isNaN(playerId)) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No players bound to account."
        })

        // collect the player's pooled exp
        collectPooledExpSync(playerId)

        const playerData = getPlayerSync(playerId)
        if (playerData === null) return reply.status(500).send({
            "error": "Internal Server Error",
            "message": "No player data."
        })

        viewerId = await validateViewerId(accountId, viewerId)

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders({
                asset_update: true,
                viewer_id: viewerId
            }),
            "data": serializePlayerData(
                playerData,
                getPlayerDailyChallengePointListSync(playerId),
                getPlayerTriggeredTutorialsSync(playerId),
                getPlayerClearedRegularMissionListSync(playerId),
                getPlayerCharactersSync(playerId),
                getPlayerCharactersManaNodesSync(playerId),
                getPlayerPartyGroupListSync(playerId),
                getPlayerItemsSync(playerId),
                getPlayerEquipmentSync(playerId),
                getPlayerQuestProgressSync(playerId),
                getPlayerGachaInfoSync(playerId),
                getPlayerDrawnQuestsSync(playerId),
                getPlayerPeriodicRewardPointsSync(playerId),
                getPlayerActiveMissionsSync(playerId),
                getPlayerBoxGachasSync(playerId),
                {},
                getPlayerStartDashExchangeCampaignsSync(playerId),
                getPlayerMultiSpecialExchangeCampaignsSync(playerId),
                viewerId
            )
        })
    })
}

export default routes;