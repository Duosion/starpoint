// Handles news.

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getSession } from "../../data/wdfpData";
import { generateDataHeaders } from "../../utils";
import { clientSerializeDate } from "../../data/utils";

interface GetInfoBody {
    api_count: number,
    viewer_id: number,
    news_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/get_info", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as GetInfoBody

        const viewerId = body.viewer_id
        if (!viewerId || isNaN(viewerId)) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid request body."
        })

        const viewerIdSession = await getSession(viewerId.toString())
        if (!viewerIdSession) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid viewer id."
        })

        reply.header("content-type", "application/x-msgpack")
        return reply.status(200).send({
            "data_headers": generateDataHeaders({
                viewer_id: viewerId
            }),
            "data": {
                "id": body.news_id,
                "title": "New Halloween Event!",
                "date": clientSerializeDate(new Date()),
                "label": 3,
                "thumbnail": 1,
                "html": "\r\n<!DOCTYPE html/>\r\n<html lang=\"en\">There is a new Halloween event!</html>\r\n"
            }
        })
    })
}

export default routes;