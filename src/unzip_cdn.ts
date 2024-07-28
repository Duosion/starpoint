import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, renameSync, rmdirSync } from "fs";
import { Open } from "unzipper";
import path from "path";

interface EntityData {
    zipPath: string,
    version: string,
    size: string,
    hash: string,
    tag: string
}

type EntityMap = Map<string, EntityData> 

const concurrency: number = 6

const validCDNFolders: Record<string, boolean> = {
    "en": true,
    // "ko": true,
    // "th": true
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

    // unzip each zip
    for (const archiveName of readdirSync(dirPath)) {
        if (archiveName !== "entities") {
            const archivePath = path.join(dirPath, archiveName)
            for (const zipName of readdirSync(archivePath)) {
                const zipPath = path.join(archivePath, zipName)

                const tempPath = path.join(tempDir, zipName)
                if (!existsSync(tempPath)) {
                    mkdirSync(tempPath)
                }

                const open = await Open.file(zipPath)
                await open.extract({path: tempPath, concurrency: concurrency})

                // iterate extracted files
                for (const productionFile of readdirSync(tempPath)) {
                    if ( productionFile === "production") {
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
                
                // remove temp folder
                rmSync(tempPath, { recursive: true })
            }
        }
    }
}

async function unzip() {
    console.log("Unzipping CDN...")
    for (const fileName of readdirSync(cdn_dir)) {
        if (validCDNFolders[fileName] === true) {
            await unzipLanguage(path.join(cdn_dir, fileName))
        }
    }
    console.log("Successfully unzipped CDN.")
    rmdirSync(tempDir)
}

unzip()