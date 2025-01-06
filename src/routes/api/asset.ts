

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import enAndroidFull from "../../../assets/asset_lists/en-android-full.json";
import enAndroidShort from "../../../assets/asset_lists/en-android-short.json";
import enIOSFull from "../../../assets/asset_lists/en-ios-full.json";
import koAndroidFull from "../../../assets/asset_lists/ko-android-full.json";
import koAndroidShort from "../../../assets/asset_lists/ko-android-short.json";
import koIOSFull from "../../../assets/asset_lists/ko-ios-full.json";
import thAndroidFull from "../../../assets/asset_lists/th-android-full.json";
import thAndroidShort from "../../../assets/asset_lists/th-android-short.json";
import thIOSFull from "../../../assets/asset_lists/th-ios-full.json";
import { Platform, generateDataHeaders, getRequestPlatformSync } from "../../utils";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import path from "path";

interface GetPathBody {
    target_asset_version: string,
    viewer_id: number
}

interface PathListArchive {
    location: string,
    size: number,
    sha256: string
}

interface PathList {
    info: {
        client_asset_version?: string,
        target_asset_version: string,
        eventual_target_asset_version: string,
        is_initial: boolean,
        latest_maj_first_version: string
    },
    full: {
        version: string,
        archive: PathListArchive[]
    },
    diff: Object[],
    asset_version_hash: string
}

interface CDNMetadata {
    version: number,
    mods: PathListArchive[]
}

/**
 * Gets a base path list for a platform & language.
 * 
 * @param platform 
 * @param lang 
 * @param full Whether the path list should be for the partial or full sizes.
 * @returns 
 */
function getBasePathList(
    platform: Platform,
    lang: string,
    full: boolean
): PathList {
    switch (platform) {
        case Platform.ANDROID:
            switch (lang) {
                case "ko":
                    return full || !koShortAvailable ? koAndroidFull : koAndroidShort
                case "th":
                    return full || !thShortAvailable ? thAndroidFull : thAndroidShort
                default:
                    return full || !enShortAvailable ? enAndroidFull : enAndroidShort
            }
        case Platform.IOS:
            switch (lang) {
                case "ko":
                    return koIOSFull
                case "th":
                    return thIOSFull
                default:
                    return enIOSFull
            }
    }
}

/**
 * Generates a CDN version string from a version number.
 * 
 * @param version 
 * @returns 
 */
function getCDNVersionString(
    version: number
): string {
    return `2.1.${version}`
}

// check whether short CDNs are available.
const envCdnDir = process.env.CDN_DIR || ".cdn"
const cdnDir = path.isAbsolute(envCdnDir) ? envCdnDir : path.join(process.cwd(), envCdnDir)
const enShortAvailable = existsSync(path.join(cdnDir, "en", "entities", "files"))
const koShortAvailable = existsSync(path.join(cdnDir, "ko", "entities", "files"))
const thShortAvailable = existsSync(path.join(cdnDir, "th", "entities", "files"))

// mod directory
const modsDir = path.join(cdnDir, "mods")
const modsExist = existsSync(modsDir)

// metadata
const cdnMetadataPath = path.join(envCdnDir, "metadata.json")
let cdnMetadata: CDNMetadata = {
    version: 125,
    mods: []
}

// load metadata
if (existsSync(cdnMetadataPath)) {
    try {
        const data = readFileSync(cdnMetadataPath).toString('utf8')
        cdnMetadata = JSON.parse(data)
    } catch (error) {
        console.log(`Error when reading CDN metadata: ${error}`)
    }
}

// load mods
if (modsExist) {
    try {
        const modZipNames = readdirSync(modsDir)
        const loadedMods = cdnMetadata.mods

        // check if we need to update the asset version (load new mods)
        let update = loadedMods.length !== modZipNames.length
        if (!update) {
            for (const mod of loadedMods) {
                const modPath = path.join(modsDir, "..", mod.location.replace("{$cdnAddress}", ""))
                update = existsSync(modPath) ? createHash('sha256').update(readFileSync(modPath)).digest('base64') !== mod.sha256 : true
                if (update) {
                    break
                }
            }
        }

        if (update) {
            console.log("Loading Mods...")
            const newLoadedMods: PathListArchive[] = []
            for (const modZipName of modZipNames) {
                const modZipPath = path.join(modsDir, modZipName)
                const stats = statSync(modZipPath)

                // calculate hash
                newLoadedMods.push({
                    location: `{$cdnAddress}/mods/${modZipName}`,
                    size: stats.size,
                    sha256: createHash('sha256').update(readFileSync(modZipPath)).digest('base64')
                })
            }

            cdnMetadata = {
                version: cdnMetadata.version += 1,
                mods: newLoadedMods
            }

            // save metadata
            const toSave = JSON.stringify(cdnMetadata)
            writeFileSync(cdnMetadataPath, toSave, { encoding: "utf-8" })
        }

        console.log(`${cdnMetadata.mods.length} Mods Loaded.`)
    } catch (error) {
        console.log(`Error when loading mods: ${error}`)
    }
}

const latestMajFirstVersion: string = "2.1.0"
export const availableAssetVersion = getCDNVersionString(cdnMetadata.version);

const routes = async (fastify: FastifyInstance) => {
    fastify.post("/version_info", async (request: FastifyRequest, reply: FastifyReply) => {
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
                switch (deviceLang) {
                    case "ko":
                        baseUrl = '{$cdnAddress}/ko/entities/files/'
                        filesList = '{$cdnAddress}/ko/entities/2.1.121-ios_medium.csv'
                        totalSize = 7928642125
                        delayedAssetsSize = 6362644965
                        break;
                    case "th":
                        baseUrl = '{$cdnAddress}/th/entities/files/'
                        filesList = '{$cdnAddress}/th/entities/2.1.124-ios_medium.csv'
                        totalSize = 7928642125
                        delayedAssetsSize = 6362644965
                        break;
                    default:
                        baseUrl = '{$cdnAddress}/en/entities/files/'
                        filesList = '{$cdnAddress}/en/entities/2.1.125-ios_medium.csv'
                        totalSize = 7928642125
                        delayedAssetsSize = 6362644965
                }
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
        const deviceLang = request.headers['device_lang']
        const sizeHeader = request.headers['asset_size']
        const currentVersionHeader = request.headers['res_ver']
        if (!deviceLang) return reply.status(400).send({
            "error": "Bad Request",
            "message": "Invalid headers provided."
        })

        // get the platform that this request originates from.
        const platform = getRequestPlatformSync(request)
        const sendFull = sizeHeader === 'fulfill'

        const headers = generateDataHeaders({
            viewer_id: body.viewer_id,
            asset_update: true
        })

        reply.header("content-type", "application/x-msgpack")
        reply.status(200)
        if (currentVersionHeader !== undefined && (currentVersionHeader !== availableAssetVersion)) {
            // update required, not initial
            const pathList: PathList = {
                info: {
                    client_asset_version: String(currentVersionHeader),
                    target_asset_version: availableAssetVersion,
                    eventual_target_asset_version: availableAssetVersion,
                    is_initial: false,
                    latest_maj_first_version: latestMajFirstVersion
                },
                full: {
                    version: availableAssetVersion,
                    archive: cdnMetadata.mods
                },
                diff: [],
                asset_version_hash: ""
            }

            return reply.send({
                "data_headers": headers,
                "data": pathList
            })
        } else {
            // send
            return reply.send({
                "data_headers": headers,
                "data": getBasePathList(platform, String(deviceLang), sendFull)
            })
        }
    })
}

export default routes;