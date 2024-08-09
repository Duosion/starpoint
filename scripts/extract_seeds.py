from subprocess import run
from os import scandir, path, remove
from mitmproxy import http
from math import floor
import argparse
import msgpack
import base64
import json

TEMP_FILE = "extract_seeds_temp.json"
OUT_FILE = "extracted_seeds.json"

def request(flow: http.HTTPFlow) -> None:
    if flow.request.url.endswith("/gacha/exec"):
        combined_seeds = {
            "1": {},
            "2": {},
            "3": {}
        }
        if path.exists(TEMP_FILE):
            with open(TEMP_FILE, 'r') as file:
                combined_seeds = json.load(file)

        response_unpacked = msgpack.unpackb(base64.b64decode(flow.response.data.content), strict_map_key=False)

        draws = response_unpacked['data']['draw']

        for draw in draws:
            rarity = str(floor(draw['character_id'] / 100000))
            draw_type = str(1 if draw['movie_id'].endswith("guarantee") else 0)
            pool = combined_seeds[rarity].get(draw_type)
            if not pool:
                pool = {}
                combined_seeds[rarity][draw_type] = pool

            pool[draw['seed']] = True

        with open(TEMP_FILE, 'w') as file:
            json.dump(combined_seeds, file)

# scan the flows directory and call mitmdump in read mode
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("input_directory", type=str, help="The directory containing the mitmproxy flows.")
    parser.add_argument("output_directory", type=str, help="The directory to output the markdown to.")
    args = parser.parse_args()

    input_dir = args.input_directory
    output_dir = args.output_directory

    if path.exists(TEMP_FILE):
        remove(TEMP_FILE)

    if not path.exists(input_dir):
        raise Exception("Invalid input directory provided.")
    if not path.exists(output_dir):
        raise Exception("Invalid input directory provided.")

    for entry in scandir(input_dir):
        if entry.is_file():
            run(f'mitmdump -r "{entry.path}" -s "{path.dirname(path.join(path.realpath(__file__), "extract_seeds.py"))}" -q')

    all_seeds = {}
    if path.exists(TEMP_FILE):
        with open(TEMP_FILE, 'r') as file:
            all_seeds = json.load(file)

    output = {
        "1": {},
        "2": {},
        "3": {}
    }

    for rarity, draw_type_seeds in all_seeds.items():
        new_seeds = {}
        for draw_type, seeds in draw_type_seeds.items():
            type_pool = []
            for seed, _ in seeds.items():
                type_pool.append(int(seed))
            new_seeds[draw_type] = type_pool
        output[rarity] = new_seeds

    with open(path.join(output_dir, OUT_FILE), 'w') as file:
        json.dump(output, file)
                 
    if path.exists(TEMP_FILE):
        remove(TEMP_FILE)