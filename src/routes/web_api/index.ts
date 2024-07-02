import { FastifyInstance } from "fastify";
import playerApiPlugin from "./player"

const routes = async (fastify: FastifyInstance) => {
    fastify.register(require('@fastify/multipart'), {
        limits: {
            fieldNameSize: 100, // Max field name size in bytes
            fieldSize: 100,     // Max field value size in bytes
            fields: 10,         // Max number of non-file fields
            fileSize: 5000000,  // For multipart forms, the max file size in bytes
            files: 1,           // Max number of file fields
            headerPairs: 2000,  // Max number of header key=>value pairs
            parts: 1000         // For multipart forms, the max number of parts (fields + files)
        }
    })

    fastify.register(playerApiPlugin, { prefix: "/player" })
}

export default routes;