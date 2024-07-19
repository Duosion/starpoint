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
fastify.register(apiPlugin, { prefix: "/latest/api/index.php" })
fastify.register(assetApiPlugin, { prefix: "/latest/api/index.php/asset" })
fastify.register(toolApiPlugin, { prefix: "/latest/api/index.php/tool" })
fastify.register(reproduceApiPlugin, { prefix: "/latest/api/index.php/reproduce" })
fastify.register(tutorialApiPlugin, { prefix: "/latest/api/index.php/tutorial" })
fastify.register(gachaApiPlugin, { prefix: "/latest/api/index.php/gacha" })
fastify.register(partyApiPlugin, { prefix: "/latest/api/index.php/party" })
fastify.register(expodApiPlugin, { prefix: "/latest/api/index.php/expod" })
fastify.register(storyQuestApiPlugin, { prefix: "/latest/api/index.php/story_quest" })
fastify.register(optionApiPlugin, { prefix: "/latest/api/index.php/option" })
fastify.register(singleBattleQuestApiPlugin, { prefix: "/latest/api/index.php/single_battle_quest" })
fastify.register(multiBattleQuestApiPlugin, { prefix: "/latest/api/index.php/multi_battle_quest" })
fastify.register(attentionApiPlugin, { prefix: "/latest/api/index.php/attention" })
fastify.register(characterApiPlugin, { prefix: "/latest/api/index.php/character" })
fastify.register(partyGroupApiPlugin, { prefix: "/latest/api/index.php/party_group" })
fastify.register(equipmentApiPlugin, { prefix: "/latest/api/index.php/equipment" })
fastify.register(exBoostApiPlugin, { prefix: "/latest/api/index.php/ex_boost" })
fastify.register(boxGachaApiPlugin, { prefix: "/latest/api/index.php/box_gacha" })
fastify.register(shopApiPlugin, { prefix: "/latest/api/index.php/shop" })
fastify.register(encyclopediaApiPlugin,  { prefix: "/latest/api/index.php/encyclopedia" })

// openapi
fastify.register(openapiPlugin, { prefix: "/openapi/service" })

// infodesk
fastify.register(infodeskPlugin, { prefix: "/infodesk" })

// web routes
fastify.register(indexWebPlugin, { prefix: "/" }),

// web api routes
fastify.register(indexWebApiPlugin, { prefix: "/api" })

// web static
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "web/public"),
    prefix: "/public",
    decorateReply: false
})

// static CDN
// english
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", ".cdn/en"),
    prefix: "/patch/Live/2.0.0/en",
    decorateReply: false
})

// listen
fastify.listen({ port: 8000 }, (err, address) => {
    if (err) {
        console.error(err)
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`StarPoint is listening on http://localhost:8000`)
})
