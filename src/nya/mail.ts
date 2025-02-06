import { getPlayerSync, givePlayerItemSync, updatePlayerSync } from "../data/wdfpData"
import { givePlayerCharacterSync } from "../lib/character"
import { givePlayerEquipmentSync } from "../lib/equipment"
import { ClientError } from "./utils"

export interface Mail_ {
    "id": number,
    "create_time": string,
    "description"?: string,
    "number": number,
    "reason_id": number,
    "receive_time": string,
    "reward_limit_time"?: string,
    "reward_period_limited": boolean,
    "subject"?: string,
    "type": number,
    "type_id"?: number,
}

export interface Mail {
    "subject"?: string,
    "description"?: string,
    "reason_id"?: number,
    "type": number,
    "type_id"?: number,
    "number": number,
}

enum SPECIAL_MAIL_ID {
    START = 90000000,
    BREAD_1500,
    MANA_1500,
    EXP_1500,
}

export enum MAIL_TYPE {
    ITEM = 1, // with type_id
    PAID_VIRTUAL_MONEY = 3,
    FREE_VIRTUAL_MONEY = 4,
    CHARACTER = 5, // with type_id
    EQUIPMENT = 6, // with type_id
    STAR_CRUMB = 7,
    FREE_MANA = 8,
    POOL_EXP = 9,
    BOND_TOKEN = 10,
    BOSS_BOOST_POINT = 11,
    BOOST_POINT = 12,
    DEGREE = 13,  // with type_id
    DAILY_CHALLENGE_POINT = 14,  // with type_id
    RANK_POINT = 15,
    PERIODIC_REWARD_POINT = 16,  // with type_id
}

const SpecialMails: Mail_[] = [
    {
        "id": SPECIAL_MAIL_ID.BREAD_1500,
        "create_time": "2020-01-01 12:00:00",
        "reason_id": 1,
        "receive_time": "0000-00-00 00:00:00",
        "reward_limit_time": "2099-01-01 12:00:00",
        "reward_period_limited": false,
        "type": MAIL_TYPE.PAID_VIRTUAL_MONEY,
        "number": 1500,
        "subject": "Bread * 1500",
        "description": "^W^",
    },
    {
        "id": SPECIAL_MAIL_ID.MANA_1500,
        "create_time": "2020-01-01 12:00:00",
        "reason_id": 1,
        "receive_time": "0000-00-00 00:00:00",
        "reward_limit_time": "2099-01-01 12:00:00",
        "reward_period_limited": false,
        "type": MAIL_TYPE.FREE_MANA,
        "number": 1500,
        "subject": "Mana * 1500",
        "description": "^W^",
    },
    {
        "id": SPECIAL_MAIL_ID.EXP_1500,
        "create_time": "2020-01-01 12:00:00",
        "reason_id": 1,
        "receive_time": "0000-00-00 00:00:00",
        "reward_limit_time": "2099-01-01 12:00:00",
        "reward_period_limited": false,
        "type": MAIL_TYPE.POOL_EXP,
        "number": 1500,
        "subject": "Exp * 1500",
        "description": "^W^",
    },
]

let MailIdCounter = 10000000
const CachedMails: Record<number, Mail_[]> = {}


const date2str = (date: Date) => {
    return date.toISOString().replace("T", " ").replace(/\.\d+Z$/, "")
}

export const SendMail = (player_id: number, mail: Mail) => {
    if (!CachedMails[player_id]) CachedMails[player_id] = []
    const mail_ = {
        "id": MailIdCounter++,
        "create_time": date2str(new Date()),
        "reason_id": 1,
        "receive_time": "0000-00-00 00:00:00",
        "reward_limit_time": "2099-01-01 12:00:00",
        "reward_period_limited": false,
        ...mail,
    }
    CachedMails[player_id].push(mail_)
    console.log(`Mail sent to player ${player_id}: ${JSON.stringify(mail_)}`)
}

export const GetMails = (player_id: number) => SpecialMails.concat(CachedMails[player_id] || [])

const process_mail = (player_id: number, { type, type_id, number }: Mail) => {
    const player = getPlayerSync(player_id);
    if (!player) throw new ClientError(`Player not found: ${player_id}`)
    switch (type) {
        case MAIL_TYPE.ITEM:
            {
                if (!type_id) throw new ClientError(`Mail type_id not found: ${type_id}`);
                return { "item_list": { [type_id!]: givePlayerItemSync(player_id, type_id, number) } };
            }
            break;
        case MAIL_TYPE.PAID_VIRTUAL_MONEY:
            {
                const new_vmoney = player.vmoney + number;
                updatePlayerSync({
                    id: player_id,
                    vmoney: new_vmoney,
                });
                return { "user_info": { "vmoney": new_vmoney } };
            }
            break;
        case MAIL_TYPE.FREE_VIRTUAL_MONEY:
            {
                const new_vmoney = player.freeVmoney + number;
                updatePlayerSync({
                    id: player_id,
                    freeVmoney: new_vmoney,
                });
                return { "user_info": { "free_vmoney": new_vmoney } };
            }
            break;
        case MAIL_TYPE.CHARACTER:
            {
                const characters: Map<number, Object> = new Map();
                const items: Map<number, number> = new Map();
                if (!type_id) throw new ClientError(`Mail type_id not found: ${type_id}`)
                for (let i = 0; i < number; i++) {
                    const giveResult = givePlayerCharacterSync(player_id, type_id);
                    if (!giveResult)
                        throw new ClientError(`Could not give player character: ${type_id} at ${i}`)
                    const giveItem = giveResult.item
                    if (giveItem !== undefined) {
                        items.set(giveItem.id, (items.get(giveItem.id) ?? 0) + giveItem.count)
                    }
                    const existingCharacter = characters.get(type_id)
                    if (existingCharacter) {
                        characters.set(type_id, { ...existingCharacter, ...giveResult.character })
                    } else {
                        characters.set(type_id, giveResult.character)
                    }
                };
                return {
                    "character_list": Array.from(characters.values()),
                    "item_list": items
                };
            }
            break;
        case MAIL_TYPE.EQUIPMENT:
            {
                if (!type_id) throw new ClientError(`Mail type_id not found: ${type_id}`);
                const giveResult = givePlayerEquipmentSync(player_id, type_id, number);
                return { "equipment_list": [giveResult] };
            }
            break;
        case MAIL_TYPE.FREE_MANA:
            {
                const new_mana = player.freeMana + number;
                updatePlayerSync({
                    id: player_id,
                    freeMana: new_mana,
                });
                return { "user_info": { "free_mana": new_mana } };
            }
            break;
        case MAIL_TYPE.POOL_EXP:
            {
                const new_pool_exp = player.expPool + number;
                updatePlayerSync({
                    id: player_id,
                    expPool: new_pool_exp,
                });
                return { "user_info": { "exp_pool": new_pool_exp } };
            }
            break;
        default:
            throw new Error(`Mail type not implemented: ${type}`)
    }
}

export const ProcessMail = (player_id: number, mail_id: number) => {
    let data: { [key: string]: any };
    if (mail_id >= SPECIAL_MAIL_ID.START) {
        const mail = SpecialMails.find(mail => mail.id === mail_id)
        if (!mail) throw new ClientError(`Mail not found: ${mail_id}`)
        data = process_mail(player_id, mail)
    } else {
        const mail = CachedMails[player_id]?.find(mail => mail.id === mail_id)
        if (!mail) throw new ClientError(`Mail not found: ${mail_id}`)
        data = process_mail(player_id, mail)
        CachedMails[player_id] = CachedMails[player_id]?.filter(mail => mail.id !== mail_id)
        if (CachedMails[player_id]?.length === 0) delete CachedMails[player_id]
    }
    return {
        auto_sale_expired_mail: false,
        dispose_expired_mail: false,
        total_count: SpecialMails.length + (CachedMails[player_id]?.length ?? 0),
        ...data,
    }
}

export const ProcessAllMails = (player_id: number) => {
    const user_info: Map<string, number> = new Map();
    const character_list: Map<number, Object> = new Map();
    const item_list: Map<number, number> = new Map();
    const equipment_list: Map<number, Object> = new Map();
    for (const mail of (CachedMails[player_id] ?? [])) {
        const result = process_mail(player_id, mail);
        if (result.user_info) {
            for (const [key, value] of Object.entries(result.user_info)) user_info.set(key, value);
        }
        if (result.character_list) {
            for (const character of result.character_list) {
                const { character_id } = (character as { character_id: number })
                character_list.set(character_id, character)
            }
        }
        if (result.item_list) {
            for (const [key, value] of Object.entries(result.item_list)) item_list.set(Number.parseInt(key), value);
        }
        if (result.equipment_list) {
            for (const equipment of result.equipment_list) {
                const { equipment_id } = (equipment as { equipment_id: number })
                equipment_list.set(equipment_id, equipment)
            }
        }
    }
    delete CachedMails[player_id]
    const res: { [k: string]: any } = {
        auto_sale_expired_mail: false,
        dispose_expired_mail: false,
        total_count: SpecialMails.length,
    }
    if (user_info.size > 0) res.user_info = Object.fromEntries(user_info);
    if (character_list.size > 0) res.character_list = Array.from(character_list.values());
    if (item_list.size > 0) res.item_list = Object.fromEntries(item_list);
    if (equipment_list.size > 0) res.equipment_list = Array.from(equipment_list.values());
    return res;
}