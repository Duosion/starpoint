import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import cliProgress, { SingleBar } from "cli-progress";
import readlineSync from "readline-sync";

const CDN_URL = "http://patch.wdfp.kakaogames.com/Live/2.0.0"

const ROOT = __dirname
const cdn_dir = process.env.CDN_DIR || ".cdn"
const OUTPUT_DIR = path.isAbsolute(cdn_dir) ? cdn_dir : path.join(ROOT, "..",  cdn_dir)
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
function getAssetLocations(languages: string[]): LocationMap {
    const locationSizeMap: LocationMap = {}
    for (const lang of languages) {
        const paths = assetListsPaths[lang]

        for (const path of paths) {
            
            const textAssetList = readFileSync(path, "utf-8")
            const assetList = JSON.parse(textAssetList)

            try {
                for (const data of assetList['full']['archive']) {
                    locationSizeMap[data['location'].replace('{$cdnAddress}', '')] = data['size']
                }

                for (const diffData of assetList['diff']) {
                    for (const data of diffData['archive']) {
                        locationSizeMap[data['location'].replace('{$cdnAddress}', '')] = data['size']
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
    return locationSizeMap
}

function downloadAssets(
    start: number,
    end: number,
    locations: string[],
    bar: SingleBar
): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        for (let i = start; i < end; i++) {
            const location = locations[i]
            try {
                const outputPath = path.join(OUTPUT_DIR, location)
                if (!existsSync(outputPath)) {
                    const blob = await fetch(`${CDN_URL}${location}`)
                        .then(response => response.blob())
                        .then(blob => blob.arrayBuffer())
                    
                    const buffer = Buffer.from(blob)
                    writeFileSync(outputPath, buffer)
                }
                bar.increment()
                
            } catch (error) {
                reject(`Error when downloading asset '${location}'. Error: ${error}`)
            }
        }
        resolve()
    })
}

async function downloadAssetsMultithread(
    locations: string[],
    threadCount: number = 6
) {

    const locationCount = locations.length
    threadCount = Math.min(locationCount, threadCount)
    const locationsPerThread = Math.floor(locationCount / threadCount)
    
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    bar.start(locationCount, 0)

    // create directories
    for (const location of locations) {
        const outputPath = path.join(OUTPUT_DIR, location)
        const outputDir = path.dirname(outputPath)
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, {
                recursive: true
            })
        }
    }

    const threads: Promise<void>[] = []
    for (let i = 0; i < threadCount; i++) {
        const start = locationsPerThread * i
        const end = (i == (threadCount - 1)) ? locationCount : Math.min(locationCount, start + locationsPerThread)
        threads.push(downloadAssets(
            start,
            end,
            locations,
            bar
        ))
    }

    await Promise.all(threads)

    bar.stop()
}

let platformChoice = readlineSync.question('Enter the platform to download the CDN for. \nPlatform [ALL/android/ios]: ')
switch(platformChoice.trim()) {
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

let langChoice = readlineSync.question('Enter the language code for the CDN you wish to download. \nLanguage Code [ALL/en/ko/th]: ')
switch(langChoice.trim()) {
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
    if ((langChoice === 'all' || lang.startsWith(langChoice)) && (platformChoice === 'all' || lang.endsWith(platformChoice)) ) {
        languages.push(lang)
    }
}

// get locations
const locationsMap = getAssetLocations(languages)

const locations: string[] = []
let total_size = 0
for (const [location, size] of Object.entries(locationsMap)) {
    locations.push(location);
    total_size += size;
}

const choice = readlineSync.question(`The download will be ${Math.round((total_size / 1e+9) * 100) / 100} GB. Continue? \n[Y/n]:`)
if (choice.trim() !== 'n') {
    downloadAssetsMultithread(locations).then(_ => console.log("CDN downloaded successfully to '.cdn'."))
}