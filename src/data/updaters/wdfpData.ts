// Updates an outdated wdfp_data database

import { Database } from "better-sqlite3";

/**
 * Updates a database before its initialization function has been called.
 * 
 * @param database A better-sqlite3 database.
 */
export function updateBeforeInit(
    database: Database,
    currentVersion: number
) {
    if (0 >= currentVersion) {
        // update to version 1

        // rush event; players_parties table
        database.prepare(`ALTER TABLE players_parties RENAME TO players_parties_old`).run()
        // rush event; players_party_groups table
        database.prepare(`ALTER TABLE players_party_groups RENAME TO players_party_groups_old`).run()
    }
}

/**
 * Updates a database after its initialization function has been called.
 * 
 * @param database A better-sqlite3 database.
 */
export function updateAfterInit(
    database: Database,
    currentVersion: number
) {
    if (0 >= currentVersion) {
        // update to version 1

        // rush event; players_party_groups table
        database.prepare(`
        INSERT INTO players_party_groups
        SELECT *, 1 FROM players_party_groups_old
        `).run()

        // rush event; players_parties table
        database.prepare(`
        INSERT INTO players_parties
        SELECT *, 1 FROM players_parties_old
        `).run()
        database.prepare(`DELETE FROM players_parties_old`).run()
        database.prepare(`DELETE FROM players_party_groups_old`).run()
    }

}