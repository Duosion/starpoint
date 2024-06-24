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
            if type == 0 and reward[3] != "":
                converted_group.append({
                    "name": "", #reward[0],
                    "type": type,
                    "id": int(reward[3]),
                    "count": int(reward[4]),
                    "field5": int(reward[5]),
                })
            elif type == 1:
                converted_group.append({
                    "name": "", #reward[0],
                    "type": type,
                    "id": int(reward[6]),
                    "rarity": float(reward[7])
                })
            else:
                converted_group.append({
                    "name": "", #reward[0],
                    "type": type,
                    "field2": reward[2],
                    "field3": reward[3],
                    "field4": reward[4],
                    "field5": reward[5],
                    "field6": reward[6],
                    "field7": reward[7],
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
        mana_nodes = {}
        for _, nodes in data.items(): 
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
        converted[characterId] = mana_nodes
    return converted

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
    "mana_node": convert_mana_nodes
    # "world_story_event_boss_battle_quest": convert_main_ex_quests,
    # "world_story_event_quest": convert_main_ex_quests
}

for file_name, converter in to_convert_files.items():
    file_name = f"{file_name}.json" # add extension
    parsed = parse_file(os.path.join(FILE_INPUT, file_name))
    if parsed == None:
        print(f"{file_name} file not found inside the '/in' folder. Skipping...")
    else:
        save_json(converter(parsed), os.path.join(FILE_OUTPUT, file_name))