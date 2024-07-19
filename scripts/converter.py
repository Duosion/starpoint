# Converts the output/orderedmap files into a format readable by the server.
import json
import os
from math import floor

ROOT = os.path.dirname(os.path.realpath(__file__))
FILE_INPUT = os.path.join(ROOT, 'in')
FILE_OUTPUT = os.path.join(ROOT, "out")

# create output directory if it doesn't exist
if not os.path.exists(FILE_OUTPUT):
    os.makedirs(FILE_OUTPUT)

# create input directory if it doesn't exist
if not os.path.exists(FILE_INPUT):
    os.makedirs(FILE_INPUT)

# parses a json file into an object.
def parse_file(file_name):
    if file_name.endswith(".json") and os.path.exists(file_name):
        with open(file_name, "r", encoding='utf8') as file:
            return json.load(file)
    return None

# converts a json quest list object into the correct form
def convert_main_ex_quests(obj):
    converted = {}
    for _, chapter_stages in obj.items():
        for _, sub_stages in chapter_stages.items():
            for _, chapter in sub_stages.items():
                # determine whether the quest is a story or not
                if chapter[84] == "":
                    # is story
                    converted[chapter[0]] = {
                        "name": "", #chapter[1],
                        "clearRewardId": int(chapter[3])
                    }
                else:
                    converted[chapter[0]] = {
                        "name": "", #chapter[1],
                        "clearRewardId": int(chapter[3]),
                        "sPlusRewardId": 1,
                        "scoreRewardGroup": int(chapter[70]),
                        "bRankTime": floor(float(chapter[84]) * 1000),
                        "aRankTime": floor(float(chapter[85]) * 1000),
                        "sRankTime": floor(float(chapter[86]) * 1000),
                        "sPlusRankTime":  floor(float(chapter[87]) * 1000),
                        "rankPointReward": int(chapter[93]),
                        "characterExpReward": int(chapter[94]),
                        "manaReward": int(chapter[95]),
                        "poolExpReward": int(chapter[96])
                    }
    return converted

def convert_boss_quests(obj):
    converted = {}
    for _, chapter_stages in obj.items():
        for _, sub_stages in chapter_stages.items():
            for _, chapter in sub_stages.items():
                # determine whether the quest is a story or not
                if chapter[84] == "":
                    # is story
                    converted[chapter[0]] = {
                        "name": "", #chapter[1],
                        "clearRewardId": int(chapter[3])
                    }
                else:
                    converted[chapter[0]] = {
                        "name": "", #chapter[2],
                        "clearRewardId": int(chapter[4]),
                        "sPlusRewardId": 1,
                        "scoreRewardGroup": int(chapter[70]),
                        "bRankTime": floor(float(chapter[84]) * 1000),
                        "aRankTime": floor(float(chapter[85]) * 1000),
                        "sRankTime": floor(float(chapter[86]) * 1000),
                        "sPlusRankTime":  floor(float(chapter[87]) * 1000),
                        "rankPointReward": int(chapter[93]),
                        "characterExpReward": int(chapter[94]),
                        "manaReward": int(chapter[95]),
                        "poolExpReward": int(chapter[96])
                    }
    return converted

def convert_event_quest(obj):
    converted = {}
    for _, chapter_stages in obj.items():
        for _, chapter in chapter_stages.items():
            # determine whether the quest is a story or not
            if chapter[85] == "":
                # is story
                converted[chapter[0]] = {
                    "name": "", #chapter[1],
                    "clearRewardId": int(chapter[4])
                }
            else:
                converted_chapter = {
                    "name": "", #chapter[2],
                    "clearRewardId": int(chapter[4]),
                    "sPlusRewardId": 1,
                    "bRankTime": floor(float(chapter[85]) * 1000),
                    "aRankTime": floor(float(chapter[86]) * 1000),
                    "sRankTime": floor(float(chapter[87]) * 1000),
                    "sPlusRankTime":  floor(float(chapter[88]) * 1000),
                    "rankPointReward": int(chapter[94]),
                    "characterExpReward": int(chapter[95]),
                    "manaReward": int(chapter[96]),
                    "poolExpReward": int(chapter[97])
                }
                if chapter[71] != "(None)":
                    converted_chapter["scoreRewardGroup"] = int(chapter[71])
                converted[chapter[0]] = converted_chapter

    return converted

def convert_advent_quest(obj):
    converted = {}
    for _, chapter_stages in obj.items():
        for _, chapter in chapter_stages.items():
            # determine whether the quest is a story or not
            if chapter[88] == "":
                # is story
                converted[chapter[0]] = {
                    "name": "", #chapter[1],
                    "clearRewardId": int(chapter[4])
                }
            else:
                converted[chapter[0]] = {
                    "name": "", #chapter[2],
                    "clearRewardId": int(chapter[4]),
                    "sPlusRewardId": 1,
                    "scoreRewardGroup": int(chapter[74]),
                    "bRankTime": floor(float(chapter[88]) * 1000),
                    "aRankTime": floor(float(chapter[89]) * 1000),
                    "sRankTime": floor(float(chapter[90]) * 1000),
                    "sPlusRankTime":  floor(float(chapter[91]) * 1000),
                    "rankPointReward": int(chapter[97]),
                    "characterExpReward": int(chapter[98]),
                    "manaReward": int(chapter[99]),
                    "poolExpReward": int(chapter[100])
                }

    return converted

def convert_daily_exp_mana_event_quest(obj):
    converted = {}
    for _, chapter_stages in obj.items():
        for _, chapter in chapter_stages.items():
            converted[chapter[0]] = {
                "name": "", #chapter[2],
                "clearRewardId": int(chapter[4]),
                "scoreRewardGroup": int(chapter[66]),
                "bRankTime": 0,
                "aRankTime": 0,
                "sRankTime": 0,
                "sPlusRankTime":  0,
                "rankPointReward": int(chapter[68]),
                "characterExpReward": int(chapter[69]),
                "manaReward": int(chapter[70]),
                "poolExpReward": int(chapter[71])
            }

    return converted

def convert_daily_week_event_quest(obj):
    converted = {}
    for _, chapter_stages in obj.items():
        for _, chapter in chapter_stages.items():
            converted[chapter[0]] = {
                "name": "", #chapter[2],
                "clearRewardId": int(chapter[3]),
                "scoreRewardGroup": int(chapter[65]),
                "bRankTime": 0,
                "aRankTime": 0,
                "sRankTime": 0,
                "sPlusRankTime":  0,
                "rankPointReward": int(chapter[67]),
                "characterExpReward": int(chapter[68]),
                "manaReward": int(chapter[69]),
                "poolExpReward": int(chapter[70])
            }

    return converted

def convert_character_quests(obj):
    converted = {}
    for story_id, character_story in obj.items():
        converted[story_id] = {
            "name": "", #character_story[3],
            "clearRewardId": int(character_story[5])
        }
    return converted

def convert_clear_rewards(obj):
    converted = {}
    # type map
    # 0 = ?, 1 = equipment, 2 = character, 3 = beads, 4 = mana
    for reward_id, data in obj.items():
        reward_type = int(data[1])
        new = {
            "name": "", #data[0],
            "type": reward_type,
        }
        if (data[2]) != "":
            new["id"] = int(data[2])
        if (data[3]) != "":
            new["count"] = int(data[3])
        converted[reward_id] = new
                
    return converted

def convert_score_reward(obj):
    converted = {}
    # type map
    # 0 = item, 1 = rare score group + id
    for group_id, score_group in obj.items():
        converted_group = []
        for _, reward in score_group.items():
            type = int(reward[1])
            if type == 0:
                converted_reward = {
                    "name": "", #reward[0],
                    "type": type,
                    "reward_type": int(reward[2]),
                    "count": int(reward[4]),
                    "field5": int(reward[5]),
                }
                if reward[3] != "":
                    converted_reward["id"] = int(reward[3])

                converted_group.append(converted_reward)
            elif type == 1:
                converted_group.append({
                    "name": "", #reward[0],
                    "type": type,
                    "id": int(reward[6]),
                    "rarity": float(reward[7])
                })
        converted[group_id] = converted_group
    return converted

def convert_rare_score_reward(obj):
    converted = {}
    for group_id, rare_group in obj.items():
        converted_group = []
        for _, reward in rare_group.items():
            name = reward[0]
            type = int(reward[1])
            id = int(reward[2]) if reward[2] != "" else None
            amount = int(reward[3]) if reward[3] != "" else None
            rarity = float(reward[4])

            new_obj = {
                "name": "", #name,
                "type": type,
                "rarity": rarity
            }

            if id != None:
                new_obj['id'] = id
            if amount != None:
                new_obj['count'] = amount
            converted_group.append(new_obj)

        converted[group_id] = converted_group
    return converted

def convert_characters(obj):
    converted = {}
    for characterId, data in obj.items():
        converted[characterId] = {
            "name": "", #data[0],
            "rarity": int(data[2]),
            "element": int(data[3]),
            "skill_count": data[36].split(",").count("6")
        }
    return converted

def convert_mana_nodes(obj):
    converted = {}
    for characterId, data in obj.items():
        levels = {}
        for level, nodes in data.items():
            mana_nodes = {}
            for _, node in nodes.items():
                item_list = {}
                item_costs = node[3].split(",")
                
                for n, item_id in enumerate(node[2].split(",")):
                    item_list[item_id.strip()] = int(item_costs[n].strip())

                mana_nodes[node[0]] = {
                    "items": item_list,
                    "manaCost": int(node[4]),
                    "field1": node[1],
                    "field5": node[5],
                    "field6": node[6]
                }
            levels[level] = mana_nodes
        converted[characterId] = levels
    return converted

def convert_ex_boost(obj):
    converted = {}
    for item_id, ex_boost_item in obj.items():
        name = ex_boost_item[1]
        new =  {
            "tier": 3 if name.endswith("r5") else 2 if name.endswith("r4") else 1,
            "count": int(ex_boost_item[0])
        }
        if len(ex_boost_item[2]) == 1:
            new['element'] = int(ex_boost_item[2])
        converted[item_id] = new
    return converted

def convert_ex_status(obj):
    converted = {
        1: [], # 3*
        2: [], # 4*
        3: []  # 5*
    }
    for status_id, status in obj.items():
        tier = int(status[3]) - 2

        converted[tier].append(int(status_id))
    return converted

def convert_ex_ability(obj):
    converted = {
        1: [], # 3*
        2: [], # 4*
        3: []  # 5*
    }
    for ability_id, status in obj.items():
        tier = int(status[2]) - 2

        converted[tier].append(int(ability_id))
    return converted

box_total_counts = {}

def convert_box_rewards(obj):
    converted = {}
    for gacha_id, boxes in obj.items():
        converted_gacha = {}
        box_total_counts[str(gacha_id)] = {}
        for box_id, box in boxes.items():
            converted_box = {}
            box_total_counts[str(gacha_id)][str(box_id)] = 0
            for _, reward in box.items():
                converted_reward = {
                    "type": int(reward[2]),
                    "count": int(reward[4]),
                    "available": int(reward[5]),
                    "tier": int(reward[6])
                }
                box_total_counts[str(gacha_id)][str(box_id)] += converted_reward["available"]
                if reward[3] != "":
                    converted_reward["id"] = int(reward[3])
                
                converted_box[reward[0]] = converted_reward
            converted_gacha[box_id] = converted_box
        converted[gacha_id] = converted_gacha
    return converted

def convert_box_gacha(obj):
    converted = {}
    for gacha_id, gacha in obj.items():
        converted[gacha_id] = {
            "itemId": int(gacha[2]),
            "count": int(gacha[3]),
            "availableCounts": box_total_counts[str(gacha_id)]
        }
    return converted

def convert_gacha_rarities(path):
    converted = []
    with open(path, "r") as file:
        obj = json.load(file)
        total_odds = 0
        for rarity_entry in list(obj.values())[0].values():
            odds = int(rarity_entry[2])
            converted.append({
                "id": int(rarity_entry[0]),
                "rank": int(rarity_entry[1]),
                "odds": odds,
                "isRateUp": True if rarity_entry[3] == 'true' else False
            })
            total_odds += odds

        # calculate rarities
        for converted_rarity in converted:
            converted_rarity["rarity"] = round((converted_rarity["odds"] / total_odds) * 1000, 2)

    return converted

def convert_gacha(obj):
    converted = {}
    for gacha_id, gacha_data in obj.items():
        payment_type = int(gacha_data[4])

        # 0 = character; 1 = weapon
        gacha_type = int(gacha_data[13])
        if payment_type == 0:
            single_cost = int(gacha_data[5])
            multi_cost = int(gacha_data[6])
            discount_single_cost = int(gacha_data[7])

            if gacha_type == 0:
                converted_gacha = {
                    "type": gacha_type,
                    "paymentType": payment_type,
                    "singleCost": single_cost,
                    "multiCost": multi_cost,
                    "discountCost": discount_single_cost,
                    "movieName": gacha_data[17],
                    "guaranteeMovieName": gacha_data[18],
                    #"onceFreeMulti": True if gacha_data[20] == "true" else False,
                    #"dailyFreeMulti": True if gacha_data[21] == "true" else False,
                    "startDate": gacha_data[29],
                    "endDate": gacha_data[30]
                }
                # get rarity files
                converted_gacha["pool"] = {
                    "3": convert_gacha_rarities(os.path.join(FILE_INPUT, "gacha_odds", f"{gacha_data[14]}.json")),
                    "2": convert_gacha_rarities(os.path.join(FILE_INPUT, "gacha_odds", f"{gacha_data[15]}.json")),
                    "1": convert_gacha_rarities(os.path.join(FILE_INPUT, "gacha_odds", f"{gacha_data[16]}.json")),
                }
                converted[gacha_id] = converted_gacha 

            elif gacha_type == 1:
                converted_gacha = {
                    "type": gacha_type,
                    "paymentType": payment_type,
                    "singleCost": single_cost,
                    "multiCost": multi_cost,
                    "discountCost": discount_single_cost,
                    "startDate": gacha_data[29],
                    "endDate": gacha_data[30]
                }
                # get rarity files
                converted_gacha["pool"] = {
                    "3": convert_gacha_rarities(os.path.join(FILE_INPUT, "gacha_odds", f"{gacha_data[22]}.json")),
                    "2": convert_gacha_rarities(os.path.join(FILE_INPUT, "gacha_odds", f"{gacha_data[23]}.json")),
                    "1": convert_gacha_rarities(os.path.join(FILE_INPUT, "gacha_odds", f"{gacha_data[24]}.json")),
                }
                converted[gacha_id] = converted_gacha
                pass
    
    return converted

def convert_gacha_campaigns(obj):
    campaign_map = {}
    for campaign_id, data in obj.items():
        campaign_id = int(campaign_id)
        for gacha_id in data[5].split(","):
            campaign_map[gacha_id] = campaign_id
    return campaign_map

def convert_general_shop(obj):
    converted = {}
    for item_id, item in obj.items():

        costs = []
        cost_offset = 12
        for _ in range(4):
            if item[cost_offset] != "(None)":
                costs.append({
                    "id": int(item[cost_offset]),
                    "amount": int(item[cost_offset + 1])
                })
            cost_offset += 2

        rewards = []
        reward_offset = 29
        for _ in range (6):
            if item[reward_offset] != "(None)":
                reward = {
                    "type": int(item[reward_offset])
                }
                if item[reward_offset + 1] != "":
                    reward['id'] = int(item[reward_offset + 1])
                if item[reward_offset + 2] != "":
                    reward['count'] = int(item[reward_offset + 2])
                rewards.append(reward)
            reward_offset += 3
        
        converted_item = {
            "costs": costs,
            "rewards": rewards,
            "availableFrom": item[20],
            "availableUntil": item[21] if item[21] != "(None)" else None,
            "stock": int(item[23]),
        }

        if (item[9]) != "(None)":
            converted_item['userCost'] = {
                "type": int(item[9]),
                "amount": int(item[10])
            }
        
        converted[item_id] = converted_item

    return converted

def convert_boss_coin_shop(obj):
    converted = {}
    map_output = {}
    for item_id, item in obj.items():
        costs = []
        cost_offset = 16
        for _ in range(4):
            if item[cost_offset] != "(None)":
                costs.append({
                    "id": int(item[cost_offset]),
                    "amount": int(item[cost_offset + 1])
                })
            cost_offset += 2

        rewards = []
        reward_offset = 31
        for _ in range (6):
            if item[reward_offset] != "(None)":
                reward = {
                    "type": int(item[reward_offset])
                }
                if item[reward_offset + 1] != "":
                    reward['id'] = int(item[reward_offset + 1])
                if item[reward_offset + 2] != "":
                    reward['count'] = int(item[reward_offset + 2])
                rewards.append(reward)
            reward_offset += 3
        
        category = int(item[0])

        converted_item = {
            "costs": costs,
            "rewards": rewards,
            "availableFrom": item[24],
            "availableUntil": item[25] if item[25] != "(None)" else None,
            "stock": int(item[27]),
        }
        
        if not converted.get(category):
            converted[category] = {}

        map_output[item_id] = category
        converted[category][item_id] = converted_item
        
    save_json(map_output, os.path.join(FILE_OUTPUT, "boss_coin_shop_item_category_map.json"))
    return converted

def convert_event_item_shop(obj):
    converted = {}

    map_output = {}
    
    for item_id, item in obj.items():
        costs = []
        cost_offset = 18
        for _ in range(4):
            if item[cost_offset] != "(None)":
                costs.append({
                    "id": int(item[cost_offset]),
                    "amount": int(item[cost_offset + 1])
                })
            cost_offset += 2

        rewards = []
        reward_offset = 32
        for _ in range (6):
            if item[reward_offset] != "(None)":
                reward = {
                    "type": int(item[reward_offset])
                }
                if item[reward_offset + 1] != "":
                    reward['id'] = int(item[reward_offset + 1])
                if item[reward_offset + 2] != "":
                    reward['count'] = int(item[reward_offset + 2])
                rewards.append(reward)
            reward_offset += 3
        
        event_type = int(item[0])
        event_id = int(item[1])

        converted_item = {
            "costs": costs,
            "rewards": rewards,
            "availableFrom": item[26],
            "availableUntil": item[27] if item[27] != "(None)" else None,
            "stock": int(item[29]),
        }
        
        if not converted.get(event_type):
            converted[event_type] = {}

        if not converted[event_type].get(event_id):
            converted[event_type][event_id] = {}

        map_output[item_id] = {
            "eventType": event_type,
            "eventId": event_id
        }

        converted[event_type][event_id][item_id] = converted_item

    save_json(map_output, os.path.join(FILE_OUTPUT, "event_item_shop_id_map.json"))
    return converted

def convert_treasure_shop(obj):
    converted = {}
    for item_id, item in obj.items():
        costs = []
        cost_offset = 10
        for _ in range(4):
            if item[cost_offset] != "(None)":
                costs.append({
                    "id": int(item[cost_offset]),
                    "amount": int(item[cost_offset + 1])
                })
            cost_offset += 2

        rewards = []
        reward_offset = 24
        for _ in range (6):
            if item[reward_offset] != "(None)":
                reward = {
                    "type": int(item[reward_offset])
                }
                if item[reward_offset + 1] != "":
                    reward['id'] = int(item[reward_offset + 1])
                if item[reward_offset + 2] != "":
                    reward['count'] = int(item[reward_offset + 2])
                rewards.append(reward)
            reward_offset += 3

        converted_item = {
            "costs": costs,
            "rewards": rewards,
            "availableFrom": item[18],
            "availableUntil": item[19] if item[19] != "(None)" else None,
            "stock": int(item[21]),
        }

        if (item[7]) != "(None)":
            converted_item['userCost'] = {
                "type": int(item[7]),
                "amount": int(item[8])
            }

        converted[item_id] = converted_item

    return converted

def convert_star_grain_shop(obj):
    converted = {}
    for item_id, item in obj.items():
        costs = []
        cost_offset = 10
        for _ in range(4):
            if item[cost_offset] != "(None)":
                costs.append({
                    "id": int(item[cost_offset]),
                    "amount": int(item[cost_offset + 1])
                })
            cost_offset += 2

        rewards = []
        reward_offset = 25
        for _ in range (6):
            if item[reward_offset] != "(None)":
                reward = {
                    "type": int(item[reward_offset])
                }
                if item[reward_offset + 1] != "":
                    reward['id'] = int(item[reward_offset + 1])
                if item[reward_offset + 2] != "":
                    reward['count'] = int(item[reward_offset + 2])
                rewards.append(reward)
            reward_offset += 3

        converted_item = {
            "costs": costs,
            "rewards": rewards,
            "availableFrom": item[18],
            "availableUntil": item[19] if item[19] != "(None)" else None,
            "stock": int(item[21]),
        }

        if (item[7]) != "(None)":
            converted_item['userCost'] = {
                "type": int(item[7]),
                "amount": int(item[8])
            }

        converted[item_id] = converted_item

    return converted

# def convert_mana_nodes_save_data(obj):
#     converted = {}

#     for character_id, levels in obj.items():
#         nodes = []
#         for _, level in levels.items():
#             for _, node in level.items():
#                 nodes.append(int(node[0]))
#         converted[character_id] = nodes

#     return {
#         "user_character_mana_node_list": converted
#     }

def save_json(obj, file_path):
    with open(file_path, 'w', encoding='utf8') as file:
        json.dump(obj, file, indent=4, ensure_ascii=False)

# define the files to convert
to_convert_files = {
    "main_quest": convert_main_ex_quests, 
    "ex_quest": convert_main_ex_quests, 
    "boss_battle_quest": convert_boss_quests,
    "character_quest": convert_character_quests,
    "clear_reward": convert_clear_rewards,
    "score_reward": convert_score_reward,
    "character": convert_characters,
    "rare_score_reward": convert_rare_score_reward,
    "mana_node": convert_mana_nodes,
    "ex_boost": convert_ex_boost,
    "ex_status": convert_ex_status,
    "ex_ability": convert_ex_ability,
    "world_story_event_boss_battle_quest": convert_event_quest,
    "world_story_event_quest": convert_event_quest,
    "advent_event_quest": convert_advent_quest,
    "daily_exp_mana_event_quest": convert_daily_exp_mana_event_quest,
    "daily_week_event_quest": convert_daily_week_event_quest,
    "box_reward": convert_box_rewards,
    "box_gacha": convert_box_gacha,
    "gacha": convert_gacha,
    "gacha_campaign": convert_gacha_campaigns,
    "general_shop": convert_general_shop,
    "boss_coin_shop": convert_boss_coin_shop,
    "event_item_shop": convert_event_item_shop,
    "treasure_shop": convert_treasure_shop,
    "star_grain_shop": convert_star_grain_shop
}

for file_name, converter in to_convert_files.items():
    file_name = f"{file_name}.json" # add extension
    parsed = parse_file(os.path.join(FILE_INPUT, file_name))
    if parsed == None:
        print(f"{file_name} file not found inside the '/in' folder. Skipping...")
    else:
        save_json(converter(parsed), os.path.join(FILE_OUTPUT, file_name))