import { Database } from "better-sqlite3";


export default function init(
    database: Database,
    exists: Boolean
) {
    // initialize the database

    // create players table
    database.prepare(`CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        app_id TEXT NOT NULL,
        first_login_time DATE NOT NULL,
        idp_alias TEXT NOT NULL,
        idp_code TEXT NOT NULL,
        idp_id TEXT NOT NULL,
        reg_time DATE NOT NULL,
        last_login_time DATE NOT NULL,
        status TEXT NOT NULL
    )`).run()

    // create zat session table
    database.prepare(`CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY NOT NULL,
        player_id INTEGER NOT NULL,
        expires DATE NOT NULL,
        type INTEGER NOT NULL,
        FOREIGN KEY (player_id) REFERENCES accounts (id) ON DELETE CASCADE
    )`).run()
}