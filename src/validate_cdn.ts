import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import cliProgress, { SingleBar } from "cli-progress";
import readlineSync from "readline-sync";
import { createHash } from "crypto";

const CDN_URL = "http://patch.wdfp.kakaogames.com/Live/2.0.0"

const ROOT = __dirname
const cdn_dir = process.env.CDN_DIR || ".cdn"
const OUTPUT_DIR = path.isAbsolute(cdn_dir) ? cdn_dir : path.join(ROOT, "..", cdn_dir)
if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, {
        recursive: true
    })
}

const ASSET_LISTS_DIR = path.join(ROOT, "..", "assets/asset_lists")
const assetListsPaths: Record<string, string[]> = {
    "en-android": [
        path.join(ASSET_LISTS_DIR, "en-android-full.json"),
        path.join(ASSET_LISTS_DIR, "en-android-short.json")
    ],
    "ko-android": [
        path.join(ASSET_LISTS_DIR, "ko-android-full.json"),
        path.join(ASSET_LISTS_DIR, "ko-android-short.json")
    ],
    "th-android": [
        path.join(ASSET_LISTS_DIR, "th-android-full.json"),
        path.join(ASSET_LISTS_DIR, "th-android-short.json")
    ],
    "en-ios": [
        path.join(ASSET_LISTS_DIR, "en-ios-full.json")
    ],
    "ko-ios": [
        path.join(ASSET_LISTS_DIR, "ko-ios-full.json")
    ],
    "th-ios": [
        path.join(ASSET_LISTS_DIR, "th-ios-full.json")
    ]
}

const entityFileLists: Record<string, string> = {
    "en-android": "/en/entities/2.1.125-android_medium.csv",
    "ko-android": "/ko/entities/2.1.121-android_medium.csv",
    "th-android": "/th/entities/2.1.124-android_medium.csv",
    "en-ios": "/en/entities/2.1.125-ios_medium.csv",
    "ko-ios": "/ko/entities/2.1.121-ios_medium.csv",
    "th-ios": "/th/entities/2.1.124-ios_medium.csv"
}

type LocationMap = Record<string, number>
function getAssetLocations(languages: string[]): [LocationMap, Map<string, string>] {
    const locationSizeMap: LocationMap = {}
    const hashes: Map<string, string> = new Map()
    for (const lang of languages) {
        const paths = assetListsPaths[lang]

        for (const path of paths) {

            const textAssetList = readFileSync(path, "utf-8")
            const assetList = JSON.parse(textAssetList)

            try {
                for (const data of assetList['full']['archive']) {
                    const location = data['location'].replace('{$cdnAddress}', '')
                    locationSizeMap[location] = data['size']
                    hashes.set(location, data['sha256'])
                }

                for (const diffData of assetList['diff']) {
                    for (const data of diffData['archive']) {
                        const location = data['location'].replace('{$cdnAddress}', '')
                        locationSizeMap[location] = data['size']
                        hashes.set(location, data['sha256'])
                    }
                }
            } catch (error) {
                console.log(`Error when parsing asset list data. Error: ${error}`)
            }

        }

        // load the file list
        const fileList = entityFileLists[lang]
        if (fileList !== undefined) {
            locationSizeMap[fileList] = 0
        }
    }
    return [locationSizeMap, hashes]
}

function checkHash(
    start: number,
    end: number,
    locations: string[],
    hashes: Map<string, string>,
    bar: SingleBar
): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        const toInstall = []
        for (let i = start; i < end; i++) {
            const location = locations[i]
            try {
                const outputPath = path.join(OUTPUT_DIR, location)
                // check hash
                if (existsSync(outputPath)) {
                    const file = readFileSync(outputPath)
                    const hash = hashes.get(location)
                    if (!location.includes("/entities/") && createHash('sha256').update(file).digest('base64') !== hash) {
                        toInstall.push(location)
                    }
                } else {
                    toInstall.push(location)
                }
                bar.increment()
            } catch (error) {
                reject(`Error when validating asset '${location}'. Error: ${error}`)
            }
        }
        resolve(toInstall)
    })
}

async function validateAssetsMultithread(
    locations: string[],
    hashes: Map<string, string>,
    threadCount: number = 8
) {

    console.log("Validating CDN files...")
    const hashWork: Promise<any>[] = []
    const invalidLocations: string[] = []
    const validateBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    {
        const locationCount = locations.length
        threadCount = Math.min(locationCount, threadCount)
        const locationsPerThread = Math.floor(locationCount / threadCount)

        validateBar.start(locationCount, 0)

        // validate hashes
        for (let i = 0; i < threadCount; i++) {
            const start = locationsPerThread * i
            const end = (i == (threadCount - 1)) ? locationCount : Math.min(locationCount, start + locationsPerThread)
            hashWork.push(checkHash(
                start,
                end,
                locations,
                hashes,
                validateBar
            ).then(res => invalidLocations.push(...res)))
        }
        
    }
    await Promise.all(hashWork)
    validateBar.stop()

    const invalidCount = invalidLocations.length
    const isCDNInvalid = invalidCount > 0
    console.log(isCDNInvalid ? `Your copy of the CDN contains ${invalidCount} invalid and/or missing files.` : "Your copy of the CDN is valid.");
    if (isCDNInvalid) {
        console.log("Invalid and/or missing files: [", invalidLocations.join(", "), ']')
    }
}

let platformChoice = readlineSync.question('Enter the platform you downloaded the CDN for. \nPlatform [ALL/android/ios]: ')
switch (platformChoice.trim()) {
    case 'ios':
        platformChoice = 'ios'
        break;
    case 'android':
        platformChoice = 'android';
        break;
    default:
        platformChoice = 'all';
}
console.log(`Selected platform: "${platformChoice}".`)

let langChoice = readlineSync.question('Enter the language code of the CDN you downloaded. \nLanguage Code [ALL/en/ko/th]: ')
switch (langChoice.trim()) {
    case 'en':
        langChoice = 'en';
        break;
    case 'ko':
        langChoice = 'ko';
        break;
    case 'th':
        langChoice = 'th';
        break;
    default:
        langChoice = 'all'
}
console.log(`Selected language: "${langChoice}".`)

const languages: string[] = []
for (const [lang, _] of Object.entries(assetListsPaths)) {
    if ((langChoice === 'all' || lang.startsWith(langChoice)) && (platformChoice === 'all' || lang.endsWith(platformChoice))) {
        languages.push(lang)
    }
}

// get locations
const [locationsMap, hashes] = getAssetLocations(languages)

const locations: string[] = []
let total_size = 0
for (const [location, size] of Object.entries(locationsMap)) {
    locations.push(location);
    total_size += size;
}

validateAssetsMultithread(locations, hashes)