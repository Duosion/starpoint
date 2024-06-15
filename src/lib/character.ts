// 4* base max level: 70, 75, 80, 85, 90; exp: 76272, 102829, 139190, 189995, 240800
// 5* max level: 80, 85, 90, 95, 100; exp: 153988, 210488, 266988, 323488, 379988

import { getPlayerCharacterSync, givePlayerItemSync, insertPlayerCharacterSync, updatePlayerCharacterSync } from "../data/wdfpData";
import { getCharacterDataSync } from "./assets";
import { Element } from "./types"




//                           3*     4*     5*
// fire dupe reward      : 14001, 14002, 14003
// water dupe reward     : 14004, 14005, 14006
// lightning dupe reward : 14007, 14008, 14009
// wind dupe reward      : 14010, 14011, 14012
// light dupe reward     : 14016, 14017, 14018
// dark dupe reward      : 14013, 14014, 14015

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

export function rewardPlayerCharacterSync(
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