/**
 * Handles gacha summoning.
 * Right now all characters in a gacha's pool have an equal chance of being summoned.
 */

import { randomInt } from "crypto";
import { getPlayerCharacterSync, getPlayerSync, insertPlayerCharacterSync, updatePlayerGachaInfoSync, updatePlayerSync } from "../data/wdfpData"
import { BoxGachaBox, BoxGachaIdReward, BoxGachaRewardTier, BoxGachaRewardType, BoxGachaDrawResult, Reward, EquipmentItemReward, RewardType, CharacterReward, CurrencyReward, PlayerRewardResult, Gacha, GachaType, GachaPoolItem, GachaDrawResult, GachaDraws, GachaMovieType, CharacterGacha, GachaMovieSeeds, GachaCharacterDraw, RewardPlayerGachaDrawResult, GachaEquipmentDraw } from "./types"
import { PlayerBoxGachaDrawnReward } from "../data/types";
import { givePlayerRewardsSync } from "./quest";
import movieSeeds from "../../assets/gacha_movie_seeds.json";
import { givePlayerCharacterSync } from "./character";
import { givePlayerEquipmentSync } from "./equipment";

// list of gachas
// [gacha_id] = (array of character ids)
const gachas: Record<number, number[]> = {
    [157]: [251001, 251002, 251003, 251004, 251005, 251006, 251007, 251008]
}

const characterGachaRankRates = {
    normal: [
        75, // 5*
        250,  // 4*
        675 // 3*
    ],
    multiGuarantee: [
        75, // 5*
        925 // 4*
    ]
}

const equipmentGachaRankRates = {
    normal: [
        50,  // 5*
        250, // 4*
        700  // 3*
    ],
    multiGuarantee: [
        50, // 5*
        950 // 4*
    ]
}

const rankMovieRates = [
    [ // 5*
        80,
        20
    ],
    [ // 4*
        80,
        20
    ],
    [
        100
    ]
]

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
 * Selects a random index from a weighted pool.
 * 
 * @param min The minimum random value to pick.
 * @param max The maximum random value to pick.
 * @param pool The pool to select the random index from.
 * @returns The index that was selected. null if nothing was selected.
 */
function randomPoolItem(
    min: number,
    max: number,
    pool: number[]
): number | null {
    let roll = randomInt(min, max)

    let offset = 0;
    let index = 0
    for (const rate of pool) {
        if ((rate + offset) >= roll) return index;
        offset += rate;
        index += 1;
    }
    return null;
}

export function drawGachaSync(
    gacha: Gacha,
    drawAmount: number
): GachaDrawResult {
    const rankRates = gacha.type === GachaType.CHARACTER ? characterGachaRankRates : equipmentGachaRankRates

    const pulls: Map<number, number> = new Map()

    for (let drawNumber = 0; drawNumber < drawAmount; drawNumber++) {

        const drawRankRates = (drawNumber !== 0) && ((drawNumber % 9) === 0) ? rankRates.multiGuarantee : rankRates.normal
        
        const ratePool = gacha.pool[(randomPoolItem(0, 1001, drawRankRates) ?? 0) + 1]

        // pick item from pool
        const selectedItem = ratePool[randomPoolItem(0, 1001, ratePool.map(item => item.rarity)) ?? 0]
        const selectedItemId = selectedItem.id

        pulls.set(selectedItemId, (pulls.get(selectedItemId) ?? 0) + 1)
    }

    return pulls
}

export function rewardPlayerGachaDrawResultSync(
    playerId: number,
    gacha: Gacha,
    gachaDrawResult: GachaDrawResult
): RewardPlayerGachaDrawResult {

    const draws: GachaDraws = []
    const characters: Map<number, Object> = new Map()
    const equipment: Map<number, Object> = new Map()
    const items: Map<number, number> = new Map()

    if (gacha.type == GachaType.CHARACTER) {
        const characterGacha = gacha as CharacterGacha
        // reward characters
        for (const [characterId, amount] of gachaDrawResult) {
            for (let n = 0; n < amount; n++) {
                const giveResult = givePlayerCharacterSync(playerId, characterId)
                
                if (giveResult !== null) {
                    // get character rarity
                    const rarity = Math.floor(characterId / 100000) - 1
                    // decide on movie
                    const movieType = randomPoolItem(1, 101, rankMovieRates[rarity]) ?? GachaMovieType.NORMAL

                    // pick a seed
                    const seeds = (movieSeeds as GachaMovieSeeds)[rarity + 1][movieType]
                    const seedIndex = randomInt(0, seeds.length + 1)

                    // build draw
                    const draw: GachaCharacterDraw = {
                        "character_id": characterId,
                        "movie_id": movieType === GachaMovieType.NORMAL ? characterGacha.movieName : characterGacha.guaranteeMovieName,
                        "seed": seeds[seedIndex] ?? seeds[0],
                        "entry_count": 1
                    }
                    
                    // set values in items map, characters map, and draws array.
                    const giveItem = giveResult.item
                    if (giveItem !== undefined) {
                        draw['ex_boost_item'] = giveItem // add ex_boost_item to draw
                        items.set(giveItem.id, (items.get(giveItem.id) ?? 0) + giveItem.count)
                    }

                    characters.set(characterId, giveResult.character)
                    draws.push(draw)
                }

            }
        }
    } else {
        for (const [equipmentId, amount] of gachaDrawResult) {
            const giveResult = givePlayerEquipmentSync(playerId, equipmentId, amount);

            equipment.set(equipmentId, giveResult)
            for (let i = 0; i < amount; i++) {
                draws.push({
                    "equipment_id": equipmentId,
                    "treasure_up_type": 0    
                })
            }
        }
    }
    
    const returnCharacters: Object[] = [];
    for (const value of characters.values()) {
        returnCharacters.push(value)
    }

    const returnEquipment: Object[] = []
    for (const value of equipment.values()) {
        returnEquipment.push(value)
    }
    
    const returnItems: Record<number, number> = {}
    for (const [itemId, amount] of items) {
        returnItems[itemId] = amount
    }

    return {
        draw: draws,
        characters: returnCharacters,
        equipment: returnEquipment,
        items: returnItems
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
): BoxGachaDrawResult {
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
        const rollIndex = randomInt(rewardsPool.length)
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

    // return the draw result
    const returnSessionDrawnRewards: PlayerBoxGachaDrawnReward[] = []

    sessionDrawnRewards.forEach((value, rewardId) => {
        returnSessionDrawnRewards.push({
            id: Number(rewardId),
            number: value
        })
    })

    return {
        mana: drawnMana,
        exp: drawnExp,
        characters: drawnCharacters,
        equipment: drawnEquipment,
        items: drawnItems,
        rewards: returnSessionDrawnRewards
    }
}

/**
 * Rewards a player with the results of a box gacha draw.
 * 
 * @param playerId The ID of the player.
 * @param drawResult The box gacha draw result.
 * @returns A PlayerRewardResult.
 */
export function rewardPlayerBoxGachaResultSync(
    playerId: number,
    drawResult: BoxGachaDrawResult
): PlayerRewardResult | null {
    const rewards: Reward[] = []

    // convert draw results into rewards

    // items
    for (const [itemId, number] of drawResult.items) {
        rewards.push({
            name: '',
            type: RewardType.ITEM,
            id: itemId,
            count: number
        } as EquipmentItemReward)
    }

    // equipment
    for (const [equipmentId, number] of drawResult.equipment) {
        rewards.push({
            name: '',
            type: RewardType.EQUIPMENT,
            id: equipmentId,
            count: number
        } as EquipmentItemReward)
    }

    // characters
    for (const [characterId, number] of drawResult.characters) {
        for (let i = 0; i < number; i++) {
            rewards.push({
                name: '',
                type: RewardType.CHARACTER,
                id: characterId,
            } as CharacterReward)
        }
    }

    // mana & exp
    rewards.push({
        name: '',
        type: RewardType.EXP,
        count: drawResult.exp,
    } as CurrencyReward)
    rewards.push({
        name: '',
        type: RewardType.MANA,
        count: drawResult.mana,
    } as CurrencyReward)

    return givePlayerRewardsSync(playerId, rewards)
}

// {
//     "data_headers": {
//         "force_update": false,
//         "asset_update": false,
//         "short_udid": 461173975,
//         "viewer_id": 297417490,
//         "servertime": 1718941108,
//         "result_code": 1
//     },
//     "data": {
//         "draw_equipment": [
//             {
//                 "equipment_id": 3060007,
//                 "treasure_up_type": 0
//             }
//         ],
//         "is_erupt": false,
//         "gacha_info_list": [
//             {
//                 "gacha_id": 5033,
//                 "is_account_first": false,
//                 "gacha_exchange_point": 1
//             }
//         ],
//         "equipment_list": [
//             {
//                 "null": 1,
//                 "viewer_id": 297417490,
//                 "equipment_id": 3060007,
//                 "protection": false,
//                 "level": 1,
//                 "enhancement_level": 0,
//                 "stack": 0
//             }
//         ],
//         "item_list": {
//             "999005": 0
//         },
//         "mail_arrived": false
//     }
// }

// const output = [
//     { // 5*
      
//     },
//     { // 4*
      
//     },
//     { // 3*
      
//     }
//   ]
  
//   for (const entry of draw) {
//     const rarityPool = Math.floor(entry['character_id'] / 100000) - 1
    
//     //output[rarityPool][entry['seed']] = entry['movie_id'] === "fes_guarantee" ? 1 : 0
//     const movieId = entry['movie_id'] === "fes_guarantee" ? 1 : 0
//     let bucket = output[rarityPool][movieId]
//     if (bucket === undefined) {
//       bucket = {}
//       output[rarityPool][movieId] = bucket
//     }
    
//     bucket[entry['seed']] = true
//   }
  
//   for (const entry of output) {
//     for (const [movieType, seeds] of Object.entries(entry)) {
//       const newValue = []
//       for (const [seed, _] of Object.entries(seeds)) {
//         newValue.push(seed)
//       }
//       entry[movieType] = newValue
//     }
//   }
  
//   console.log(JSON.stringify(output, 2))