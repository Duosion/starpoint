import sqlite3, { Database as BetterSqlite3Database } from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import initWdfpData from "./initializers/wdfpData";

const rootDir = process.cwd();
const dataDir = rootDir + "/.database"
if (!existsSync(dataDir)) {
    // make the data directory since it doesn't exist
    try {
        mkdirSync(dataDir)
    } catch (error) {
        throw new Error(`Failed to create the data directory. Reason: ${(error as Error).message}`)
    }
}

export const enum Database {
    WDFP_DATA
}

const databaseMetadata = {
    [Database.WDFP_DATA]: {
        path: "/wdfp_data.db",
        init: initWdfpData
    }
}

const loadedDatabases: {
    [key in Database]?: BetterSqlite3Database
} = {}

export default function getDatabase(
    database: Database
): BetterSqlite3Database {
    // don't try to load an already-loaded database
    const isLoaded = loadedDatabases[database]
    if (isLoaded) return isLoaded

    // get metadata
    const metadata = databaseMetadata[database]

    const fullPath = dataDir + metadata.path
    // check if the db already exists
    const dbExists = existsSync(fullPath)

    // create new db
    const db = new sqlite3(fullPath)

    // set pragma
    db.pragma('journal_mode = WAL')

    // call init function
    const init = metadata.init
    if (init) {
        try {
            init(db, dbExists)
        } catch (error) {
            console.log(error)
            console.log(`Initalization failed for module ${metadata.path}. Error: ${error}`)
        }
    }

    // add to loaded databases
    loadedDatabases[database] = db

    return db
}