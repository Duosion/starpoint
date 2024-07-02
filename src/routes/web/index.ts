import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readFileSync } from "fs";
import path from "path";
import playerRoutePlugin from "./player"

export const staticPagesDir = "../../../web/pages"

const routes = async (fastify: FastifyInstance) => {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        const html = readFileSync(path.join(__dirname, staticPagesDir, "index.html"))

        reply.header("content-type", "text/html; charset=utf-8")
        reply.send(html)
    })

    fastify.register(playerRoutePlugin, { prefix: "/player" })
}

export default routes;