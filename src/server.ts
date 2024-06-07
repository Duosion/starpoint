import Fastify, { FastifyRequest } from "fastify";
import plugin from "./routes/tool";
import servicePlugin from "./routes/service"
import infodeskPlugin from "./routes/infodesk"
import { pack, unpack } from "msgpackr";
import { ContentTypeParserDoneFunction } from "fastify/types/content-type-parser";

// gc-openapi-zinny3.kakaogames.com
// gc-infodesk-zinny3.kakaogames.com
// na.wdfp.kakaogames.com

// initialize server
const fastify = Fastify({
    logger: false
})

// serializers
fastify.addHook('onSend', (request, reply, payload, done) => {
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
fastify.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: 'string' }, (req, body: string, done) => {
    try {
        const unpacked = unpack(Buffer.from(body, "base64"))
        done(null, unpacked)
    } catch (err) {
        done(err as Error, undefined)
    }
})
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body: string, done) {
    try {
      var json = JSON.parse(body)
      done(null, json)
    } catch (err) {
      done(null, undefined)
    }
  })

// register plugins
fastify.register(plugin, { prefix: "/latest/api/index.php/tool" })
fastify.register(servicePlugin, { prefix: "/service" })
fastify.register(infodeskPlugin)

// listen
fastify.listen({ port: 8000 }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`StarPoint is listening on ${address}`)
})