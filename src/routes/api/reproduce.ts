import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPlayerFromAccountId, getSession } from "../../data/wdfpData";
import { SessionType } from "../../data/types";
import { serializePlayerData } from "../../data/utils";
import { generateDataHeaders, getServerTime } from "../../utils";

interface PostBody {
    create_time: string,
    device_log_sequence_number: number,
    viewer_id: number | null,
    device_id: number,
    info: string,
    os_name: string,
    device_name: string
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/post", (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as PostBody

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: body.viewer_id || undefined
            }),
            "data": []
        })
    })
}

export default routes;