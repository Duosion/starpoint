

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Platform, generateDataHeaders, getRequestPlatformSync } from "../../utils";
import enAndroidFull from "../../../assets/asset_lists/en-android-full.json";
import enAndroidShort from "../../../assets/asset_lists/en-android-short.json";
import koAndroidFull from "../../../assets/asset_lists/ko-android-full.json";
import koAndroidShort from "../../../assets/asset_lists/ko-android-short.json";
import thAndroidFull from "../../../assets/asset_lists/th-android-full.json";
import thAndroidShort from "../../../assets/asset_lists/th-android-short.json";
import enIOSFull from "../../../assets/asset_lists/en-ios-full.json";

interface GetPathBody {
    target_asset_version: string,
    viewer_id: number
}

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/version_info", async(request: FastifyRequest, reply: FastifyReply) => {
        const platform = getRequestPlatformSync(request)
        const deviceLang = request.headers['device_lang'] || 'en'

        let baseUrl = ''
        let filesList = ''
        let totalSize = 0
        let delayedAssetsSize = 0

        switch (platform) {
            case Platform.ANDROID:
                switch (deviceLang) {
                    case "ko":
                        baseUrl = '{$cdnAddress}/ko/entities/files/'
                        filesList = '{$cdnAddress}/ko/entities/2.1.121-android_medium.csv'
                        totalSize = 8846079322
                        delayedAssetsSize = 6919955738
                        break;
                    case "th":
                        baseUrl = '{$cdnAddress}/th/entities/files/'
                        filesList = '{$cdnAddress}/th/entities/2.1.124-android_medium.csv'
                        totalSize = 8846063872
                        delayedAssetsSize = 6919955738
                        break;
                    default:
                        baseUrl = '{$cdnAddress}/en/entities/files/'
                        filesList = '{$cdnAddress}/en/entities/2.1.125-android_medium.csv'
                        totalSize = 8846063846
                        delayedAssetsSize = 6919955738
                }
                break;
            case Platform.IOS:
                baseUrl = '{$cdnAddress}/en/entities/files/'
                filesList = '{$cdnAddress}/${deviceLang}/entities/2.1.118-ios_small.csv'
                totalSize = 7928642125
                delayedAssetsSize = 6362644965
                break;
        }

        reply.header("content-type", "application/x-msgpack")
        reply.status(200).send({
            "data_headers": generateDataHeaders(),
            "data": {
                "base_url": baseUrl,
                "files_list": filesList,
                "total_size": totalSize,
                "delayed_assets_size": delayedAssetsSize
            }
        })
    })
    
    fastify.post("/get_path", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as GetPathBody
        const header = request.headers['asset_size']
        const deviceLang = request.headers['device_lang']
        if (!header || !deviceLang) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid headers provided."
        })

        // get the platform that this request originates from.
        const platform = getRequestPlatformSync(request)
        const sendFull = header === 'fulfill'

        const headers = generateDataHeaders({
            viewer_id: body.viewer_id,
            asset_update: true
        })

        reply.header("content-type", "application/x-msgpack")
        reply.status(200)
        switch (platform) {
            case Platform.ANDROID:
                switch (deviceLang) {
                    case "ko":
                        return reply.send({
                            "data_headers": headers,
                            "data": sendFull ? koAndroidFull : koAndroidShort
                        })
                    case "th":
                        return reply.send({
                            "data_headers": headers,
                            "data": sendFull ? thAndroidFull : thAndroidShort
                        })
                    default:
                        return reply.send({
                            "data_headers": headers,
                            "data": sendFull ? enAndroidFull : enAndroidShort
                        })
                }
            case Platform.IOS:
                return reply.send({
                    "data_headers": headers,
                    "data": enIOSFull
                })
        }
    })
}

export default routes;