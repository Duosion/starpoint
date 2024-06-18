import Fastify from "fastify";
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
import attentionApiPlugin from "./routes/api/attention"
import openapiPlugin from "./routes/openapi";
import infodeskPlugin from "./routes/infodesk";
import { pack, unpack } from "msgpackr";

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
fastify.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: 'string' }, (_, body: string, done) => {
    try {
        const unpacked = unpack(Buffer.from(body, "base64"))
        done(null, unpacked)
    } catch (err) {
        done(err as Error, undefined)
    }
})
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (_, body: string, done) {
    try {
        var json = JSON.parse(body)
        done(null, json)
    } catch (err) {
        done(null, undefined)
    }
})

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
fastify.register(attentionApiPlugin, { prefix: "/latest/api/index.php/attention" })

// openapi
fastify.register(openapiPlugin, { prefix: "/openapi/service" })

// infodesk
fastify.register(infodeskPlugin, { prefix: "/infodesk" })

// listen
fastify.listen({ port: 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`StarPoint is listening on ${address}`)
})