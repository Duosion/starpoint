import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateDataHeaders } from "../../utils";

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/get_recent_other_player_party", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as { viewer_id: number, category: number, quest_id: number };
        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: body.viewer_id
            }),
            "data": {
                "recent_other_player_party": [],
            }
        });
    })
}

export default routes;
