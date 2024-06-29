import { clientSerializeDate } from "../data/utils";
import { getPlayerCharacterSync, getPlayerSync, givePlayerItemSync, insertPlayerCharacterSync, updatePlayerCharacterSync, updatePlayerSync } from "../data/wdfpData";
import { getCharacterDataSync } from "./assets";
import { AddExpList, ClientReturnBondTokenStatus, ClientReturnBondTokenStatusList, ClientReturnCharacter, Element, RewardPlayerCharacterExpResult } from "./types";

const characterExpCaps: Record<number, number[]> = {
    [1]: [ // 1* max exp amounts for each uncap level 
        11416,  // level 40
        15820,  // level 45
        21477,  // level 50
        28538,  // level 55
        37241,  // level 60
        49481,  // level 65
        66600,  // level 70
        91180,  // level 75
        125223, // level 80
        170928, // level 85
        216633, // level 90
        262338, // level 95
        308043, // level 100
    ],
    [2]: [ // 2* max exp amounts for each uncap level 
        21477,  // level 50
        28538,  // level 55
        37241,  // level 60
        49481,  // level 65
        66600,  // level 70
        91180,  // level 75
        125223, // level 80
        170928, // level 85
        216633, // level 90
        262338, // level 95
        308043, // level 100
    ],
    [3]: [ // 3* max exp amounts for each uncap level 
        37241,  // level 60
        49481,  // level 65
        66600,  // level 70
        91180,  // level 75
        125223, // level 80
        170928, // level 85
        216633, // level 90
        262338, // level 95
        308043  // level 100
    ], 
    [4]: [ // 4* max exp amounts for each uncap level 
        76272,  // level 70
        102829, // level 75
        139190, // level 80
        189995, // level 85
        240800, // level 90
        291605, // level 95
        342410  // level 100
    ],
    [5]: [ // 5* max exp amounts for each uncap level 
        153988, // level 80
        210488, // level 85
        266988, // level 90
        323488, // level 95
        379988, // level 100
    ], 
}

const dupeItemRewards: Record<number, Record<Element, number>> = {
    [3]: { // 3* dupe item rewards for each element
        [Element.FIRE]: 14001,
        [Element.WATER]: 14004,
        [Element.LIGHTNING]: 14007,
        [Element.WIND]: 14010,
        [Element.LIGHT]: 14016,
        [Element.DARK]: 14013
    },
    [4]: { // 4* dupe item rewards for each element
        [Element.FIRE]: 14002,
        [Element.WATER]: 14005,
        [Element.LIGHTNING]: 14008,
        [Element.WIND]: 14011,
        [Element.LIGHT]: 14017,
        [Element.DARK]: 14014
    },
    [5]: { // 5* dupe item rewards for each element
        [Element.FIRE]: 14003,
        [Element.WATER]: 14006,
        [Element.LIGHTNING]: 14009,
        [Element.WIND]: 14012,
        [Element.LIGHT]: 14018,
        [Element.DARK]: 14015
    }
};

/**
 * Rewards a player a character.
 * 
 * @param playerId The ID of the player.
 * @param characterId The ID of the character to give.
 * @returns An items list, indicating what, if any, items were given to the player.
 */
export function givePlayerCharacterSync(
    playerId: number,
    characterId: number
): Record<string, Object> {

    // get the character's asset data
    const assetData = getCharacterDataSync(characterId)
    if (assetData === null) return {};

    // get the current character data
    const playerCharacter = getPlayerCharacterSync(playerId, characterId)

    const toReturn: Record<string, Object> = {}

    if (playerCharacter === null) {
        const bondTokenList = [
            {
                manaBoardIndex: 1,
                status: 0
            }
        ]

        // add the second bond token list item
        // if the character has more than 1 mana board
        if (assetData.skill_count > 3) {
            bondTokenList.push({
                manaBoardIndex: 2,
                status: 0
            })
        }

        // give the player the character
        insertPlayerCharacterSync(1, characterId, {
            entryCount: 1,
            evolutionLevel: 0,
            overLimitStep: 0,
            protection: false,
            joinTime: new Date(),
            updateTime: new Date(),
            exp: 0,
            stack: 0,
            manaBoardIndex: 1,
            bondTokenList: bondTokenList
        })
    } else {
        // otherwise, it was a dupe
        const dupeRewards = dupeItemRewards[assetData.rarity]
        if (dupeRewards) {
            const itemId = dupeRewards[assetData.element]
            toReturn["item_list"] = {
                [String(itemId)]: givePlayerItemSync(playerId, itemId, 1)
            }
        }

        // update stack
        const currentStack = playerCharacter.stack
        updatePlayerCharacterSync(playerId, characterId, {
            stack: currentStack + 1
        })
    }

    return toReturn
}

/**
 * Adds a given amount of exp to a list of characters.
 * 
 * @param playerId The ID of the player who owns the characters.
 * @param characterIds A list of character IDs to add exp to.
 * @param expAmount The amount of exp to add.
 * @returns A RewardPlayerCharacterExpResult, detailing how much exp was added.
 */
export function givePlayerCharactersExpSync(
    playerId: number,
    characterIds: number[],
    expAmount: number
): RewardPlayerCharacterExpResult {

    const addExpList: AddExpList = []
    const characterList: ClientReturnCharacter[] = []
    const bondTokenStatusList: ClientReturnBondTokenStatusList = {}

    let addToExpPool = 0

    for (const characterId of characterIds) {
        const characterData = getPlayerCharacterSync(playerId, characterId)
        const assetData = getCharacterDataSync(characterId)
        
        if ((characterData !== null) && (assetData !== null)) {
            const expCap = characterExpCaps[assetData.rarity][characterData.overLimitStep] || Number.MAX_SAFE_INTEGER
            const currentExp = characterData.exp

            let afterExp = currentExp + expAmount
            const overflowExp = afterExp > expCap ? afterExp - expCap : 0
            addToExpPool += overflowExp

            afterExp = Math.min(expCap, afterExp)

            updatePlayerCharacterSync(playerId, characterId, {
                exp: afterExp
            })

            addExpList.push({
                character_id: characterId,
                add_exp: overflowExp > 0 ? overflowExp - expAmount : expAmount,
                after_exp: afterExp,
                add_exp_pool: overflowExp
            })

            characterList.push({
                "character_id": characterId,
                "exp": afterExp,
                "create_time": clientSerializeDate(characterData.joinTime),
                "update_time": clientSerializeDate(characterData.updateTime),
                "join_time": clientSerializeDate(characterData.joinTime),
                "exp_total": afterExp
            })

            // insert bondTokenStatusList entry
            const bondTokenStatus: ClientReturnBondTokenStatus[] = characterData.bondTokenList.map(entry => {
                return {
                    mana_board_index: entry.manaBoardIndex,
                    status: entry.status
                }
            })

            bondTokenStatusList[characterId] = {
                before: bondTokenStatus,
                after: bondTokenStatus
            }
        }
    }

    // get player data
    const playerData = getPlayerSync(playerId)
    const currentExpPool = playerData ? playerData.expPool : null
    const afterExpPool = currentExpPool === null ? null : currentExpPool + addToExpPool
    
    if (afterExpPool !== null && addToExpPool > 0) {
        updatePlayerSync({
            id: playerId,
            expPool: afterExpPool
        })
    }

    return {
        add_exp_list: addExpList,
        character_list: characterList,
        bond_token_status_list: bondTokenStatusList,
        exp_pool: afterExpPool === null ? 0 : afterExpPool
    }
}