# This script downloads the contents of the game's live CDN server for the purpose of emulating the CDN for Starpoint

import requests
import os
import json
from msgpack import unpackb
from base64 import b64decode
from progress.bar import IncrementalBar
from math import floor
from threading import Thread, enumerate, current_thread

CDN_URL = "http://patch.wdfp.kakaogames.com/Live/2.0.0"
GET_ASSET_LIST_ENDPOINT = "https://na.wdfp.kakaogames.com/latest/api/index.php/gacha/exec"

ROOT = os.path.dirname(os.path.realpath(__file__))
OUTPUT_DIR = os.path.join(ROOT, "..", ".cdn")
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)


ASSET_LISTS_DIR = os.path.join(ROOT, "..", "assets/asset_lists")
asset_lists_paths = {
    "en": os.path.join(ASSET_LISTS_DIR, "en-full.json")
}

# get the full list from GET_ASSET_LIST_ENDPOINT
def get_assets(lang = 'en'):
    file_locations = []
    total_size = 0

    asset_list_path = asset_lists_paths.get(lang)
    if asset_list_path == None:
        return (
            file_locations,
            total_size
        )

    # load the asset list
    asset_list = None
    with open(asset_list_path, 'r') as file:
        asset_list = json.load(file)

    # parse file locations & total_size
    asset_list_data = asset_list['data']
    if asset_list_data == None:
        return (
            file_locations,
            total_size
        )
    
    asset_list_data_full = asset_list_data['full']
    if asset_list_data_full == None:
        return (
            file_locations,
            total_size
        )
    
    asset_list_data_diff = asset_list_data['diff']
    if asset_list_data_diff == None:
        return (
            file_locations,
            total_size
        )

    with open(os.path.join(OUTPUT_DIR, "metadata.json"), "w") as file:
        json.dump(asset_list, file)

    try:
        for data in asset_list_data_full['archive']:
            file_locations.append(data['location'].replace('{$cdnAddress}', ''))
            total_size += data['size']

        # add diff locations
        for diff_data in asset_list_data_diff:
            for data in diff_data['archive']:
                file_locations.append(data['location'].replace('{$cdnAddress}', ''))
                total_size += data['size']

    except Exception as error:
        print(f"Error when parsing asset list data. Error: {error}")

    return (
        file_locations,
        total_size
    )

def download_assets(start, end, locations, bar, output_dir=OUTPUT_DIR):
    for location_n in range(start, end):
        try:
            location = locations[location_n]
            output_path = os.path.join(output_dir, location.removeprefix('/'))
            if not os.path.exists(output_path):
                blob = requests.get(f'{CDN_URL}{location}').content

                with open(output_path, 'wb') as file:
                    file.write(blob)

            bar.next()
        except Exception as error:
            print(f"Error when download asset {location}. Error: {error}")

def download_assets_multithread(locations, thread_count=4, output_dir=OUTPUT_DIR):
    location_count = len(locations)
    thread_count = min(location_count, thread_count)
    locations_per_thread = floor(location_count / thread_count)

    bar = IncrementalBar('Downloading CDN Assets', suffix="%(index)d/%(max)d (%(percent)d%%) - [%(elapsed_td)s / %(eta_td)s]", max=len(locations))

    # create directories
    for location in locations:
        output_path = os.path.join(output_dir, location.removeprefix('/'))
        file_output_dir = os.path.dirname(output_path)
        if not os.path.exists(file_output_dir):
            os.makedirs(file_output_dir)

    for thread_n in range(thread_count):
        start = locations_per_thread * thread_n
        end = location_count if thread_n == (thread_count - 1) else min(location_count, start + locations_per_thread)
        thread = Thread(target=download_assets, kwargs={
            'start': start, 
            'end': end, 
            'locations': locations, 
            'bar': bar,
            'output_dir': output_dir
        })
        thread.daemon = True
        thread.start()

    # wait for the threads to all finish
    for thread in enumerate():
        if thread is current_thread():
            continue
        thread.join()

    # finish the bar
    bar.finish()


# get user input
lang = input('Enter the language code for the CDN you wish to download. (en)\n')
match lang:
    case _:
        lang = 'en'

# get the assets
assets_tuple = get_assets(lang)
locations = assets_tuple[0]
total_size = assets_tuple[1]

if (len(locations) > 0):
    download_assets_multithread(locations)