/**
 * Handles gacha summoning.
 * Right now all characters in a gacha's pool have an equal chance of being summoned.
 */


// fes_guarantee = yellow -> rainbow pinball
// fes = maybe fakeout

import { randomInt } from "crypto"
import { getPlayerCharacterSync, getPlayerSync, insertPlayerCharacterSync, updatePlayerGachaInfoSync, updatePlayerSync } from "../data/wdfpData"
import { BoxGacha, BoxGachaBox, BoxGachaIdReward, BoxGachaRewardTier, BoxGachaRewardType } from "./types"
import { PlayerBoxGachaDrawnReward } from "../data/types"

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

/**
 * Performs box gacha draws.
 * 
 * @param rewards A record, where the key is the reward id and the value is a BoxGachaReward
 * @param drawnRewards The current draws the player has made on the box gacha.
 * @param drawAmount The number of draws to perform.
 */
export function drawBoxGachaSync(
    rewards: BoxGachaBox,
    drawnRewards: PlayerBoxGachaDrawnReward[],
    drawAmount: number, // the number of times to draw
    stopOnFeaturedReward: boolean = false
) {

    // build drawn reward map
    const drawnRewardsMap = new Map(drawnRewards.map(reward => [reward.id, reward.number]))

    const rewardsPool: string[] = []
    for (const [rewardId, reward] of Object.entries(rewards)) {
        for (let i = 0; i < (reward.available - (drawnRewardsMap.get(Number(rewardId)) ?? 0)); i++) {
            rewardsPool.push(rewardId)
        }
    }

    let drawnMana = 0
    let drawnExp = 0
    const drawnCharacters: Map<number, number> = new Map()
    const drawnEquipment: Map<number, number> = new Map()
    const drawnItems: Map<number, number> = new Map()
    const sessionDrawnRewards: Map<string, number> = new Map()

    let totalDraws = 0

    for (let n = 0; n < drawAmount && rewardsPool.length > 0; n++) {
        const rollIndex = randomInt(rewardsPool.length + 1)
        const rewardId = rewardsPool[rollIndex]
        const reward = rewards[rewardId]

        switch (reward.type) {
            case BoxGachaRewardType.ITEM: {
                const itemId = (reward as BoxGachaIdReward).id
                drawnItems.set(itemId, (drawnItems.get(itemId) ?? 0) + reward.count)
                break;
            }
            case BoxGachaRewardType.EQUIPMENT: {
                const equipmentId = (reward as BoxGachaIdReward).id
                drawnEquipment.set(equipmentId, (drawnEquipment.get(equipmentId) ?? 0) + reward.count)
                break;
            }
            case BoxGachaRewardType.MANA: {
                drawnMana += reward.count
                break;
            }
            case BoxGachaRewardType.EXP: {
                drawnExp += reward.count
                break;
            }
            case BoxGachaRewardType.CHARACTER: {
                const characterId = (reward as BoxGachaIdReward).id
                drawnCharacters.set(characterId, (drawnCharacters.get(characterId) ?? 0) + reward.count)
                break;
            }
        }
        
        sessionDrawnRewards.set(rewardId, (sessionDrawnRewards.get(rewardId) ?? 0) + 1)
        rewardsPool.splice(rollIndex, 1)
        totalDraws += 1

        // break if the reward was featured & stop of featured is enabled
        if (reward.tier == BoxGachaRewardTier.FEATURED && stopOnFeaturedReward) break;
    }

    // 

}   