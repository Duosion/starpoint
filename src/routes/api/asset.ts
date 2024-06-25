

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Platform, generateDataHeaders, getRequestPlatformSync, getServerTime } from "../../utils";
import enAndroidFull from "../../../assets/asset_lists/en-android-full.json";
import enAndroidShort from "../../../assets/asset_lists/en-android-short.json";
import enIOSFull from "../../../assets/asset_lists/en-ios-full.json";

interface GetPathBody {
    target_asset_version: string,
    viewer_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/version_info", async(request: FastifyRequest, reply: FastifyReply) => {
        const platform = getRequestPlatformSync(request)

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders(),
            "data": {
                "base_url": "{$cdnAddress}/en/entities/files/",
                "files_list": platform === Platform.ANDROID ? "{$cdnAddress}/en/entities/2.1.121-android_medium.csv"
                    : "{$cdnAddress}/en/entities/2.1.122-ios_small.csv",
                "total_size": platform === Platform.ANDROID ? 8846079322 : 7928642125,
                "delayed_assets_size": platform === Platform.ANDROID ? 6919955738 : 6362644965
            }
        })
    })
    
    fastify.post("/get_path", async (request: FastifyRequest, reply: FastifyReply) => {
        const header = request.headers['asset_size']
        if (!header) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid headers provided."
        })

        // get the platform that this request originates from.
        const platform = getRequestPlatformSync(request)

        reply.header("content-type", "application/x-msgpack")
        if (header === 'fulfill') {
            reply.status(200).send(platform === Platform.ANDROID ? enAndroidFull : enIOSFull)
        } else {
            // send short
            reply.status(200).send(platform === Platform.ANDROID ? enAndroidShort : enIOSFull)
        }
    })
}

export default routes;