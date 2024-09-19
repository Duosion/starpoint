import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readFileSync } from "fs";
import path from "path";
import playerRoutePlugin from "./player"
import { getServerDate } from "../../utils";

export const staticPagesDir = "../../../web/pages"

const routes = async (fastify: FastifyInstance) => {
    fastify.get("/", async (_: FastifyRequest, reply: FastifyReply) => {
        const currentServerTime = getServerDate().toISOString().replace(/\.\d\d\dZ/, "")
        let html = readFileSync(path.join(__dirname, staticPagesDir, "index.html")).toString("utf-8")

        // replace values
        html = html.replace("{{currentServerTime}}", currentServerTime)

        reply.header("content-type", "text/html; charset=utf-8")
        reply.send(html)
    })

    fastify.register(playerRoutePlugin, { prefix: "/player" })
}

export default routes;