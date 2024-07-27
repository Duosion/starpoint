/**
 * Handles gacha summoning.
 * Right now all characters in a gacha's pool have an equal chance of being summoned.
 */

import { randomInt } from "crypto";
import movieSeeds from "../../assets/gacha_movie_seeds.json";
import rateUpMovieSeeds from "../../assets/gacha_rate_up_movie_seeds.json";
import { PlayerBoxGachaDrawnReward } from "../data/types";
import { givePlayerCharacterSync } from "./character";
import { givePlayerEquipmentSync } from "./equipment";
import { givePlayerRewardsSync } from "./quest";
import { BoxGachaBox, BoxGachaDrawResult, BoxGachaIdReward, BoxGachaRewardTier, BoxGachaRewardType, CharacterGacha, CharacterReward, CurrencyReward, EquipmentItemReward, Gacha, GachaCharacterDraw, GachaDrawResult, GachaDraws, GachaMovieSeeds, GachaMovieType, GachaType, PlayerRewardResult, Reward, RewardPlayerGachaDrawResult, RewardType } from "./types";

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
const rateUpCharacterGachaRates = {
    normal: [
        50, // 5*
        250, // 4*,
        700, // 3*
    ],
    multiGuarantee: [
        50, // 5*
        950 // 4*
    ],
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
 * Selects a random index from a weighted pool.
 * 
 * @param min The minimum random value to pick.
 * @param max The maximum random value to pick.
 * @param pool The pool to select the random index from.
 * @returns The index that was selected. null if nothing was selected.
 */
export function randomPoolItem(
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
    const isCharacterGacha = gacha.type === GachaType.CHARACTER
    const isRateUp = isCharacterGacha ? (gacha as CharacterGacha).movieName !== "normal" : false
    const rankRates = isCharacterGacha ? (isRateUp ? rateUpCharacterGachaRates : characterGachaRankRates) : equipmentGachaRankRates

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
                    const isRateUp = (gacha as CharacterGacha).movieName !== "normal"
                    const seeds = ((isRateUp ? rateUpMovieSeeds : movieSeeds) as GachaMovieSeeds)[rarity + 1][movieType]
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

                    const existingCharacter = characters.get(characterId)
                    if (existingCharacter) {
                        characters.set(characterId, {...existingCharacter, ...giveResult.character})
                    } else {    
                        characters.set(characterId, giveResult.character)
                    }
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