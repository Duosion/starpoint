/**
 * Handles gacha summoning.
 * Right now all characters in a gacha's pool have an equal chance of being summoned.
 */


// fes_guarantee = yellow -> rainbow pinball
// fes = maybe fakeout

import { randomInt } from "crypto"
import { getPlayerCharacterSync, getPlayerSync, insertPlayerCharacterSync, updatePlayerGachaInfoSync, updatePlayerSync } from "../data/wdfpData"

// list of gachas
// [gacha_id] = (array of character ids)
const gachas: Record<number, number[]> = {
    [157]: [251001, 251002, 251003, 251004, 251005, 251006, 251007, 251008]
}

export interface GachaResult {
    characterId: number,
    movieId: string,
    seed: number,
    entryCount: number
}

export interface SummonResult {
    freeVmoney: number,
    vmoney: number,
    pulls: GachaResult[],
}

/**
 * Performs a summoning session.
 * 
 * @param playerId The player's ID
 * @param gachaId The ID of the gacha to summon from.
 * @param pullCount The number of pulls to perform.
 * @returns An array of GachaResults outlining what the player received.
 */
export function playerSummon(
    playerId: number,
    gachaId: number,
    pullCount: number
): SummonResult {
    // get the player
    const player = getPlayerSync(playerId)
    if (!player) return {
        freeVmoney: 0,
        vmoney: 0,
        pulls: []
    }

    // calculate the summoning cost
    const cost = pullCount * 150
    if (cost > player.freeVmoney) return {
        freeVmoney: player.freeVmoney,
        vmoney: player.vmoney,
        pulls: []
    }

    // deduct the cost from the player
    const vmoneyNow = player.freeVmoney - cost
    updatePlayerSync({
        id: playerId,
        freeVmoney: vmoneyNow
    })

    // get the summoning pool
    const pool = gachas[gachaId]
    if (!pool) return {
        freeVmoney: player.freeVmoney,
        vmoney: player.vmoney,
        pulls: []
    }
    const poolSize = pool.length

    // begin summons
    const pulls: GachaResult[] = []
    for (let i = 0; i < pullCount; i++) {
        const characterId = pool[randomInt(poolSize)]

        // check if the player already owns the character
        const character = getPlayerCharacterSync(playerId, characterId)
        if (!character) {
            insertPlayerCharacterSync(playerId, characterId, {
                entryCount: 1,
                evolutionLevel: 0,
                overLimitStep: 0,
                protection: false,
                joinTime: new Date(),
                updateTime: new Date(),
                exp: 0,
                stack: 0,
                manaBoardIndex: 1,
                bondTokenList: [
                    {
                        manaBoardIndex: 1,
                        status: 0
                    },
                    {
                        manaBoardIndex: 2,
                        status: 0
                    }
                ]
            })
        } else {
            // TODO: Handle duplicate characters
        }

        pulls.push({
            characterId: characterId,
            movieId: 'normal_guarantee',
            seed: 0,
            entryCount: 1
        })
    }

    // update gacha
    updatePlayerGachaInfoSync(playerId, {
        gachaId: gachaId,
        isDailyFirst: false,
        isAccountFirst: false
    })

    return {
        freeVmoney: vmoneyNow,
        vmoney: player.vmoney,
        pulls: pulls
    }
}