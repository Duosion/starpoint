import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readFileSync } from "fs";
import path from "path";
import { staticPagesDir } from ".";
import { getAllPlayersSync, getPlayerSync } from "../../data/wdfpData";

interface GetPlayerParams {
    playerId: string | undefined
}

interface GetPlayerQuery {
    error: string | undefined
}

const routes = async (fastify: FastifyInstance) => {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        let html = readFileSync(path.join(__dirname, staticPagesDir, "players.html")).toString("utf-8")

        const players = getAllPlayersSync()
        
        let listContent = ''
        if (players.length === 0) {
            listContent = `<h4 class="text-xl w-full text-center font-bold">No players found</h4>
            <h4 class="text-xl w-full text-center font-bold">Connect to Starpoint with a client and sign in as a guest</h4>`
        } else {
            for (const player of players) {
                const id = player.id
                listContent += `<li class="w-full">
                    <a href="/player/${id}"
                        class="p-5 h-full text-on-surface hover:text-primary items-center flex gap-3 border-outline-variant transition-colors border rounded-3xl hover:bg-surface-container-low">
                        <section class="flex flex-col gap-2 flex-1">
                            <h4 class="text-xl font-bold text-inherit transition-colors">${player.name}</h4>
                            <h4 class="text-base font-bold text-on-surface-variant">Last Login: ${player.lastLoginTime.toDateString()}</h4>
                        </section>
                        
                        <section class="flex gap-3 items-center">
                            <p class="text-xl text-on-surface-variant w-full">Player Id</p>
                            <h4 class="text-xl font-bold text-inherit transition-colors">${id}</h4>
                        </section>
                    </a>
                </li>`
            }  
        }

        html = html.replace("{{listContent}}", listContent)

        reply.header("content-type", "text/html; charset=utf-8")
        reply.send(html)
    })

    fastify.get("/:playerId", async (request: FastifyRequest, reply: FastifyReply) => {
        const { playerId } = request.params as GetPlayerParams
        const { error } = request.query as GetPlayerQuery
        const parsedPlayerId = Number(playerId)
        if (isNaN(parsedPlayerId)) return reply.redirect("/player");

        const player = getPlayerSync(parsedPlayerId)
        if (player === null) return reply.redirect("/player");

        let html = readFileSync(path.join(__dirname, staticPagesDir, "player.html")).toString("utf-8")

        html = html.replace("{{playerName}}", player.name)
            .replace("{{playerComment}}", player.comment)
            .replace(/{{playerId}}/g, String(parsedPlayerId))
            .replace("{{uploadError}}", error === undefined ? '' : `<h3 class="text-xl text-error font-semibold mt-2">${error}</h3>`);
        

        reply.header("content-type", "text/html; charset=utf-8")
        reply.send(html)
    })
}

export default routes;