# This script downloads the contents of the game's live CDN server for the purpose of emulating the CDN for Starpoint

import requests
import os
import json
from progress.bar import IncrementalBar
from math import floor
from threading import Thread, enumerate, current_thread

CDN_URL = "http://patch.wdfp.kakaogames.com/Live/2.0.0"

ROOT = os.path.dirname(os.path.realpath(__file__))
OUTPUT_DIR = os.path.join(ROOT, "..", ".cdn")
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)


ASSET_LISTS_DIR = os.path.join(ROOT, "..", "assets/asset_lists")
asset_lists_paths = {
    "en-android": [
        os.path.join(ASSET_LISTS_DIR, "en-android-full.json"), 
        os.path.join(ASSET_LISTS_DIR, "en-android-short.json")
    ],
    "ko-android": [
        os.path.join(ASSET_LISTS_DIR, "ko-android-full.json"), 
        os.path.join(ASSET_LISTS_DIR, "ko-android-short.json")
    ],
    "th-android": [
        os.path.join(ASSET_LISTS_DIR, "th-android-full.json"), 
        os.path.join(ASSET_LISTS_DIR, "th-android-short.json")
    ],
    "en-ios": [
        os.path.join(ASSET_LISTS_DIR, "en-ios-full.json")
    ]
}

files_lists = {
    "en-android": "/en/entities/2.1.125-android_medium.csv",
    "ko-android": "/ko/entities/2.1.121-android_medium.csv",
    "th-android": "/th/entities/2.1.124-android_medium.csv",
    "en-ios": "/en/entities/2.1.122-ios_medium.csv"
}

def get_asset_locations(languages = []):
    location_size_map = {}
    for lang in languages:
        paths = asset_lists_paths.get(lang) or []

        # load the asset lists
        for path in paths:
            asset_list = None
            with open(path, 'r') as file:
                asset_list = json.load(file)

            try:
                for data in asset_list['full']['archive']:
                    location_size_map[data['location'].replace('{$cdnAddress}', '')] = data['size']

                # add diff locations
                for diff_data in asset_list['diff']:
                    for data in diff_data['archive']:
                        location_size_map[data['location'].replace('{$cdnAddress}', '')] = data['size']

            except Exception as error:
                print(f"Error when parsing asset list data. Error: {error}")

        # load file list
        file_list = files_lists.get(lang) or None
        if file_list:
            location_size_map[file_list] = 0

    return location_size_map

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

def download_assets_multithread(locations, thread_count=6, output_dir=OUTPUT_DIR):
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
platform_choice = input('Enter the platform to download the CDN for. \nPlatform [ALL/android/ios]:')
match platform_choice:
    case 'ios':
        platform_choice = 'ios'
    case 'android':
        platform_choice = 'android'
    case _:
        platform_choice = 'all'

print(f'Selected platform "{platform_choice}".\n')


lang_choice = input('Enter the language code for the CDN you wish to download. \nLanguage Code [ALL/en/ko/th]:')
match lang_choice:
    case 'en':
        lang_choice = 'en'
    case 'ko':
        lang_choice = 'ko'
    case 'th':
        lang_choice = 'th'
    case _:
        lang_choice = 'all'

print(f'Selected language "{lang_choice}".\n')

languages = []
for lang, _ in asset_lists_paths.items():
    if ( lang_choice == 'all' or lang.startswith(lang_choice)) and ( platform_choice == 'all' or lang.endswith(platform_choice) ):
        languages.append(lang)

# get the assets
asset_locations_map = get_asset_locations(languages)

locations = []
total_size = 0
for location, size in asset_locations_map.items():
    locations.append(location)
    total_size += size

choice = input(f'The download will be {round(total_size / 1e+9, 2)} GB. Continue? \n[Y/n]:')
match choice:
    case 'n':
        exit()

if (len(locations) > 0):
    download_assets_multithread(locations)