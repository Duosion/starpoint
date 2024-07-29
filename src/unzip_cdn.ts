import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, renameSync } from "fs";
import { Open } from "unzipper";
import path from "path";
import cliProgress, { SingleBar } from "cli-progress";

interface EntityData {
    zipPath: string,
    version: string,
    size: string,
    hash: string,
    tag: string
}

type EntityMap = Map<string, EntityData>

const concurrency: number = 8

const validCDNFolders: Record<string, boolean> = {
    "en": true,
    "ko": true,
    "th": true
}

const tempDir = path.join(__dirname, "..", ".unzip-temp")
if (!existsSync(tempDir)) {
    mkdirSync(tempDir)
}

const cdn_dir = process.env.CDN_DIR || ".cdn"
const output_dir = path.isAbsolute(cdn_dir) ? cdn_dir : path.join(__dirname, "..", cdn_dir)
if (!existsSync(output_dir)) {
    throw new Error(`CDN does not exist at directory '${output_dir}'`)
}

/**
 * Parses an entity CDN csv file.
 * 
 * @param path The path to the csv file.
 * @returns A map of zipPath => EntityData objects.
 */
function parseEntityCSV(path: string, existing?: EntityMap): EntityMap {
    const entityMap: EntityMap = existing === undefined ? new Map() : existing

    // read file
    const file = readFileSync(path, { encoding: "utf-8" })
    const lines = file.split("\n")

    // parse file
    for (const line of lines) {
        const data = line.trim().split(",")
        const zipPath = data[0]
        entityMap.set(zipPath, {
            zipPath: zipPath,
            version: data[1],
            size: data[2],
            hash: data[3],
            tag: data[4]
        })
    }

    return entityMap
}

function unzipArchives(
    start: number,
    end: number,
    zipPaths: string[],

    // directory data
    entitiesFilesPath: string,
    entityMap: EntityMap,

    // bar data
    bar: SingleBar
): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            for (let i = start; i < end; i++) {
                const zipPath = zipPaths[i]
                const tempPath = path.join(tempDir, zipPath)
                if (!existsSync(tempPath)) {
                    mkdirSync(tempPath, { recursive: true })
                }

                const open = await Open.file(zipPath)
                await open.extract({ path: tempPath, concurrency: concurrency })

                // iterate extracted files
                for (const productionFile of readdirSync(tempPath)) {
                    if (productionFile === "production") {
                        const productionPath = path.join(tempPath, productionFile)
                        const productionFiles = readdirSync(productionPath)
                        const uploadFile = productionFiles[0]
                        if (uploadFile !== undefined) {
                            const uploadPath = path.join(productionPath, uploadFile)
                            for (const hex of readdirSync(uploadPath)) {
                                if (hex !== "hash") {
                                    const hexPath = path.join(uploadPath, hex)
                                    for (const hash of readdirSync(hexPath)) {
                                        const hashDir = path.join(hexPath, hash)

                                        const zipPath = `production/${uploadFile}/${hex}/${hash}`
                                        const entityData = entityMap.get(zipPath)
                                        if (entityData !== undefined) {
                                            const newPath = path.join(entitiesFilesPath, entityData.hash)
                                            if (!existsSync(newPath)) {
                                                renameSync(hashDir, newPath)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // increment bar
                bar.increment()

                // remove temp folder
                rmSync(tempPath, { recursive: true })
            }

            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Unzips a language's files into its entities path for partial asset downloading
 * 
 * @param path The path to the 
 */
async function unzipLanguage(dirPath: string) {
    // verify that the language exists
    if (!existsSync(dirPath)) throw new Error(`Language does not exist at path '${path}'`);

    // get entity lists
    let entityMap: EntityMap = new Map()

    const entitiesPath = path.join(dirPath, "entities")
    for (const entityName of readdirSync(entitiesPath)) {
        if (entityName.endsWith(".csv")) {
            parseEntityCSV(path.join(entitiesPath, entityName), entityMap)
        }
    }

    const entitiesFilesPath = path.join(entitiesPath, "files")
    if (!existsSync(entitiesFilesPath)) {
        mkdirSync(entitiesFilesPath)
    }

    // get individual zips
    const zipPaths: string[] = []
    for (const archiveName of readdirSync(dirPath)) {
        if (archiveName !== "entities") {
            const archivePath = path.join(dirPath, archiveName)
            for (const zipName of readdirSync(archivePath)) {
                zipPaths.push(path.join(archivePath, zipName))
            }
        }
    }

    // prepare progress bar
    const unzipBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

    // unzip each zip
    const zipCount = zipPaths.length
    const threadCount = Math.min(zipCount, concurrency)
    const zipsPerThread = Math.floor(zipCount / threadCount)

    // start unzipping
    const work: Promise<void>[] = []
    console.log(`Unzipping '${dirPath}'...`)
    unzipBar.start(zipCount, 0)

    for (let i = 0; i < threadCount; i++) {
        const start = zipsPerThread * i
        const end = (i === (threadCount - 1)) ? zipCount : Math.min(zipCount, start + zipsPerThread)
        work.push(unzipArchives(
            start,
            end,
            zipPaths,
            entitiesFilesPath,
            entityMap,
            unzipBar
        ))
    }

    await Promise.all(work)
    console.log(`Successfully unzipped '${dirPath}'.`)
}

async function unzip() {
    console.log("Unzipping CDN...")
    for (const fileName of readdirSync(cdn_dir)) {
        if (validCDNFolders[fileName] === true) {
            await unzipLanguage(path.join(cdn_dir, fileName))
        }
    }
    console.log("Successfully unzipped CDN.")
    rmSync(tempDir, { recursive: true })
}

unzip()