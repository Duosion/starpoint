import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import { deserializePlayerData, getClientSerializedData } from "../../data/utils";
import { createReadStream } from "fs";
import { replacePlayerDataSync } from "../../data/wdfpData";

interface SaveQuery {
    id: string | undefined
}

const routes = async (fastify: FastifyInstance) => {
    fastify.get("/save", async (request: FastifyRequest, reply: FastifyReply) => {
        // get id
        const { id } = request.query as SaveQuery
        const playerId = Number(id)
        if (isNaN(playerId)) return reply.redirect("/player");

        // get player
        const data = getClientSerializedData(playerId, 0)
        if (data === null) return reply.redirect("/player");

        // otherwise, send
        reply.header("content-disposition", "attachment; save.json")
        reply.type('application/json').send(data)
    })

    fastify.post("/save", async (request: FastifyRequest, reply: FastifyReply) => {
        // get id
        const { id } = request.query as SaveQuery
        const playerId = Number(id)
        if (isNaN(playerId)) return reply.redirect("/player");
        
        try {
            // get file
            const file = await request.file()
            if (file === undefined) return reply.redirect(`/player/${id}`);

            const text = (await file.toBuffer()).toString('utf-8')
            const json = JSON.parse(text)

            const saveData = json['data'] === undefined ? json : json['data']
            
            const parsedData = deserializePlayerData(playerId, saveData)

            replacePlayerDataSync(parsedData)

        } catch (error) {
            return reply.redirect(`/player/${id}?error=${error}`);
        }

        return reply.redirect(`/player/${id}`);
    })
}

export default routes;