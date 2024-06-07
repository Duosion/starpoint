import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomBytes } from "crypto";
import { deleteSession, getAccount, getSession, insertAccount, insertSession, updateAccount } from "../data/wdfpData";
import { SessionType } from "../data/types";

interface CreateDeviceAccessTokenBody {
    adid: string
    appVer: string
    deviceId: string
    market: string
    os: string
    previousDeviceId: string
    previousSerialNo: string
    sdkVer: string
    serialNo: string
}

interface ZatLoginBody {
    adid: string
    appId: string
    appSecret: string
    appVer: string
    clientTime: number
    country: string
    deviceId: string
    deviceModel: string
    fields: string[]
    gsiToken: boolean
    lang: string
    loginType: string
    market: string
    network: string
    os: string
    playerId: string
    resume: boolean
    retryNo: number
    sdkVer: string
    telecom: string
    timezoneOffset: number
    usimCountry: string
    whiteKey: string
    zat: string
}

interface AndroidZatLoginBody extends ZatLoginBody {
    androidId: string
}

interface PushTokenRegisterBody {
    appId: string
    country: string
    deviceId: string
    lang: string
    market: string
    os: string
    playerId: string
    pushToken: string
    timezoneOffset: number
}

interface LoginAgreementBody {
    appId: string
    country: string
    deviceId: string
    idpCode: string
    idpId: string
    lang: string
    os: string
    serialNo: string
}

interface PlayerHeartbeatBody {
    appId: string
    clientTime: number
    country: string
    heartbeatIntervals: number
    market: string
    os: string
    playerId: string
    seq: number
}

interface AuthLoginDeviceBody {
    accessToken: string
    adid: string
    appId: string
    appSecret: string
    appVer: string
    clientTime: number
    country: string
    deviceAppKey: string
    deviceId: string
    deviceModel: string
    fields: string[]
    gsiToken: boolean
    idpId: string
    lang: string
    loginType: string
    market: string
    network: string
    os: string
    osVer: string
    referrer: string
    resume: boolean
    retryNo: string
    sdkVer: string
    serialNo: string
    telecom: string
    timezoneOffset: number
    usimCountry: string
    whiteKey: string
}

interface AndroidAuthLoginDeviceBody extends AuthLoginDeviceBody {
    androidId: string
}

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/v3/util/country/get", async (_, reply: FastifyReply) => {
        reply.status(200).send({ 
            "country": "en"
        })
    })

    fastify.post("/v4/device/accessToken/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateDeviceAccessTokenBody

        console.log(body)
        
        reply.status(200).send({
            "accessToken": "fwPla7fQ8ty9+DZT/lD//uWZD4uD6C4lD6gGIIZTLKRTQ52/SLCRmk/370jcWGs+e+1iSoZtL7lj8ov9B0/jHmijH4nsHPQT6pchaQM1M9mtwYNQq0BWhVr9hF0jjCK/a5LIVd1kBac/Gemv29WKEDKSrUS9HxxUigoPRwtOy8m+oDj9FmDJZ+rzqWCc0QjES4Ky0fTpXZ7ESoguDzNmRtW3FYr+OFexw8wBPlwiC4w=",
            "expiryTime": new Date().getTime() + 4600000
        })
    })

    fastify.post("/v3/zat/login", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as ZatLoginBody

        const clientZat = body.zat
        if (!clientZat) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const session = await getSession(clientZat)
        if (session === null || session.type !== SessionType.ZAT) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid zat provided."
        })
        
        // get the Account assigned to the session
        const player = await updateAccount({
            id: session.playerId,
            lastLoginTime: new Date()
        })
        .catch(err => {
            console.log(err)
            reply.status(500).send({
                "error": "Internal Server Error",
                "message": "No player assigned to session."
            })
            return null
        })
        if (!player) return

        // create new zat session
        await deleteSession(session.token)

        const newSession = await insertSession({
            expires: new Date(new Date().getTime() + 43200000),
            playerId: player.id,
            type: SessionType.ZAT
        })

        reply.status(200).send({
            "externalToken": "",
            "firstLogin": false,
            "player": {
                "agreement": {
                    "E001": "y",
                    "E002": "y",
                    "E006": "y",
                    "N002": "n",
                    "N003": "n",
                    "timestamp": "1717623430484"
                },
                "appId": player.appId,
                "firstLoginTime": player.firstLoginTime.getTime(),
                "idpAlias": player.idpAlias,
                "idpCode": player.idpCode,
                "idpId": player.idpId,
                "lang": body.lang,
                "lastLoginTime": player.lastLoginTime.getTime(),
                "playerId": player.id.toString(),
                "pushOption": {
                    "night": "n",
                    "player": "n"
                },
                "regTime": player.regTime.getTime(),
                "status": player.status
            },
            "zat": newSession.token,
            "zatExpiryTime": newSession.expires.getTime()
        })
    })

    fastify.post("/v3/push/token/register", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as PushTokenRegisterBody
        console.log(body)
        reply.status(200).send({})
    })

    fastify.post("/v3/agreement/getForLogin", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as LoginAgreementBody

        console.log(body)
        
        reply.status(200).send({
            "adAgreementStatus": "n",
            "agreement": {
                "E001": "y",
                "E002": "y",
                "E006": "y",
                "N002": "n",
                "N003": "n",
                "timestamp": (new Date().getTime() * 1000).toString()
            },
            "agreementPopup": "n",
            "appId": body.appId,
            "appName": "World Flipper (NA)",
            "context": "login",
            "country": body.country,
            "firstAgreement": "n",
            "idpCode": body.idpCode,
            "idpId": "6076008646",
            "informationSecurityCountry": "kr",
            "kakaoSyncAgreementGetSet": "n",
            "kakaoSyncStatus": "off",
            "kakaogameSdkVer": "3.0",
            "lang": body.lang,
            "partnerId": 825,
            "partnerName": "주식회사 카카오게임즈",
            "plusFriendStatusInfo": null,
            "policyApplyTime": 1630854000000
        })
    })

    fastify.post("/v3/player/heartbeat", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as PlayerHeartbeatBody
        console.log(body)
        reply.status(200).send({})
    })

    fastify.post("/v4/auth/loginDevice", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as AuthLoginDeviceBody

        // create player
        const player = await insertAccount({
            appId: body.appId,
            idpAlias: `${body.appId}:${body.idpId}:${body.serialNo}`,
            idpCode: "zd3",
            idpId: "6076018502",
            status: "normal",
        })

        const zatToken = await insertSession({
            expires: new Date(new Date().getTime() + 43200000),
            playerId: player.id,
            type: SessionType.ZAT
        })
        const zrtToken = await insertSession({
            expires: new Date(new Date().getTime() + 2592000000),
            playerId: player.id,
            type: SessionType.ZRT
        })

        reply.status(200).send({
            "externalToken": "", //randomBytes(52).toString('base64'),
            "firstLogin": true,
            "player": {
                "appId": player.appId,
                "firstLoginTime": player.firstLoginTime.getTime(),
                "idpAlias": player.idpAlias,
                "idpCode": player.idpCode,
                "idpId": player.idpId,
                "playerId": player.id.toString(),
                "pushOption": {
                    "night": "n",
                    "player": "n"
                },
                "regTime": player.regTime.getTime(),
                "status": player.status
            },
            "zat": zatToken.token,
            "zatExpiryTime": zatToken.expires.getTime(),
            "zrt": zrtToken.token,
            "zrtExpiryTime": zrtToken.expires.getTime()
        })
    })

}

export default routes;