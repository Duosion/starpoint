import Fastify, { FastifyRequest } from "fastify";
import { ContentTypeParserDoneFunction } from "fastify/types/content-type-parser";
import fastifyStatic from "@fastify/static";
import { pack, unpack } from "msgpackr";
import path from "path";
// api routes
import apiPlugin from "./routes/api";
import assetApiPlugin from "./routes/api/asset";
import toolApiPlugin from "./routes/api/tool";
import reproduceApiPlugin from "./routes/api/reproduce"
import tutorialApiPlugin from "./routes/api/tutorial"
import gachaApiPlugin from "./routes/api/gacha"
import partyApiPlugin from "./routes/api/party"
import expodApiPlugin from "./routes/api/expod"
import storyQuestApiPlugin from "./routes/api/storyQuest"
import optionApiPlugin from "./routes/api/option"
import singleBattleQuestApiPlugin from "./routes/api/singleBattleQuest"
import multiBattleQuestApiPlugin from "./routes/api/multiBattleQuest"
import attentionApiPlugin from "./routes/api/attention"
import characterApiPlugin from "./routes/api/character"
import partyGroupApiPlugin from "./routes/api/partyGroup"
import equipmentApiPlugin from "./routes/api/equipment"
import exBoostApiPlugin from "./routes/api/exBoost"
import boxGachaApiPlugin from "./routes/api/boxGacha"
import shopApiPlugin from "./routes/api/shop"
import encyclopediaApiPlugin from "./routes/api/encyclopedia"
import mailApiPlugin from "./routes/api/mail"
import rankingEventApiPlugin from "./routes/api/rankingEvent"
import missionApiPlugin from "./routes/api/mission"
import paymentApiPlugin from "./routes/api/payment"
// web routes
import indexWebPlugin from "./routes/web"
// web api routes
import indexWebApiPlugin from "./routes/web_api"
// misc routes
import openapiPlugin from "./routes/openapi";
import infodeskPlugin from "./routes/infodesk";

// gc-openapi-zinny3.kakaogames.com
// gc-infodesk-zinny3.kakaogames.com
// na.wdfp.kakaogames.com

// initialize server
const fastify = Fastify({
    logger: false
})

// serializers
fastify.addHook('onSend', (_, reply, payload, done) => {
    try {
        switch (reply.getHeader('content-type')) {
            case "application/x-msgpack": {
                done(null, pack(payload).toString('base64'))
                break;
            }
            default:
                done(null, payload)
        }
    } catch (error) {
        done(null, payload)
    }

})

// content-type parsers
function jsonParser(_: FastifyRequest, body: string, done: ContentTypeParserDoneFunction) {
    try {
        var json = JSON.parse(body)
        done(null, json)
    } catch (err) {
        done(null, undefined)
    }
}

fastify.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: 'string' }, (request: FastifyRequest, body: string, done) => {
    // on IOS, for some reason, requests to infodesk and openapi are JSON, but the content-type header is set as 'application/x-www-form-urlencoded'
    const routeUrl = request.routeOptions.url || ''
    if (routeUrl.startsWith("/openapi") || routeUrl.startsWith("/infodesk"))
        return jsonParser(request, body, done);

    try {
        const unpacked = unpack(Buffer.from(body, "base64"))
        done(null, unpacked)
    } catch (err) {
        done(err as Error, undefined)
    }
})
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, jsonParser)

// register plugins

//api
const apiPrefix = "/latest/api/index.php"
fastify.register(apiPlugin, { prefix: apiPrefix })
fastify.register(assetApiPlugin, { prefix: `${apiPrefix}/asset` })
fastify.register(toolApiPlugin, { prefix: `${apiPrefix}/tool` })
fastify.register(reproduceApiPlugin, { prefix: `${apiPrefix}/reproduce` })
fastify.register(tutorialApiPlugin, { prefix: `${apiPrefix}/tutorial` })
fastify.register(gachaApiPlugin, { prefix: `${apiPrefix}/gacha` })
fastify.register(partyApiPlugin, { prefix: `${apiPrefix}/party` })
fastify.register(expodApiPlugin, { prefix: `${apiPrefix}/expod` })
fastify.register(storyQuestApiPlugin, { prefix: `${apiPrefix}/story_quest` })
fastify.register(optionApiPlugin, { prefix: `${apiPrefix}/option` })
fastify.register(singleBattleQuestApiPlugin, { prefix: `${apiPrefix}/single_battle_quest` })
fastify.register(multiBattleQuestApiPlugin, { prefix: `${apiPrefix}/multi_battle_quest` })
fastify.register(attentionApiPlugin, { prefix: `${apiPrefix}/attention` })
fastify.register(characterApiPlugin, { prefix: `${apiPrefix}/character` })
fastify.register(partyGroupApiPlugin, { prefix: `${apiPrefix}/party_group` })
fastify.register(equipmentApiPlugin, { prefix: `${apiPrefix}/equipment` })
fastify.register(exBoostApiPlugin, { prefix: `${apiPrefix}/ex_boost` })
fastify.register(boxGachaApiPlugin, { prefix: `${apiPrefix}/box_gacha` })
fastify.register(shopApiPlugin, { prefix: `${apiPrefix}/shop` })
fastify.register(encyclopediaApiPlugin, { prefix: `${apiPrefix}/encyclopedia` })
fastify.register(mailApiPlugin, { prefix: `${apiPrefix}/mail` })
fastify.register(rankingEventApiPlugin, { prefix: `${apiPrefix}/ranking_event` })
fastify.register(missionApiPlugin, { prefix: `${apiPrefix}/mission` })
fastify.register(paymentApiPlugin, { prefix: `${apiPrefix}/payment` })

// openapi
fastify.register(openapiPlugin, { prefix: "/openapi/service" })

// infodesk
fastify.register(infodeskPlugin, { prefix: "/infodesk" })

// web routes
fastify.register(indexWebPlugin, { prefix: "/" })

// web api routes
fastify.register(indexWebApiPlugin, { prefix: "/api" })

// web static
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "web/public"),
    prefix: "/public",
    decorateReply: false
})

// static CDN
const cdnDir = process.env.CDN_DIR || ".cdn"
fastify.register(fastifyStatic, {
    root: path.isAbsolute(cdnDir) ? cdnDir : path.join(__dirname, "..", process.env.CDN_DIR || ".cdn"),
    prefix: "/patch/Live/2.0.0",
    decorateReply: false
})

// listen
const listenHost = process.env.LISTEN_HOST ?? "localhost"

const envListenPort = process.env.LISTEN_PORT === undefined ? 8000 : Number.parseInt(process.env.LISTEN_PORT)
const listenPort = isNaN(envListenPort) ? 8000 : envListenPort
fastify.listen({ port: listenPort, host: listenHost }, (err, address) => {
    if (err) {
        console.error(err)
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`StarPoint is listening on http://${listenHost}:${listenPort}`)
})
