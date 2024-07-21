import argparse
from os import path, makedirs, listdir
from shutil import copyfile, make_archive, rmtree
from math import floor
from threading import Thread, current_thread, enumerate

# functions
def zip(start, end, items):
    for i in range(start, end):
        to_zip_path = items[i]
        make_archive(to_zip_path, "zip", to_zip_path)
        rmtree(to_zip_path)

# parse arguments
arg_parser = argparse.ArgumentParser()
arg_parser.add_argument("source", type=str, help="The source directory of the files to merge")
arg_parser.add_argument("target", type=str, help="Where to put the zipped CDN files.")
arg_parser.add_argument("asset_list", type=str, help="The asset list for formatting zipped CDN files.")

args = arg_parser.parse_args()

source_dir = args.source
target_dir = args.target
asset_list_dir = args.asset_list

# validate source dir
if not path.exists(source_dir) or not path.isdir(source_dir):
    print(f"Invalid source directory provided: '{source_dir}'.")
    exit()

# validate asset list directory
if not path.exists(asset_list_dir) or not path.isfile(asset_list_dir):
    print(f"Invalid asset list provided: '{source_dir}'.")
    exit()

# create target directory if it doesn't exist
if not path.exists(target_dir):
    makedirs(target_dir)

# build asset list map
assets = {}

print("[INFO] Reading asset list...")
with open(asset_list_dir, 'r') as asset_list_file:
    for line in asset_list_file.readlines():
        [hash, zip_dir] = line.strip().split(",")
        
        existing = assets.get(hash)
        if existing == None:
            existing = []
            assets[hash] = existing

        existing.append(zip_dir)

to_zip = {}

print("[INFO] Copying files...")
upload_dir = path.join(source_dir, "upload")
if path.exists(upload_dir):
    for hex in listdir(upload_dir):
        hex_dir = path.join(upload_dir, hex)
        if path.isdir(hex_dir):
            for hash in listdir(hex_dir):
                paths = assets.get(hash)
                if paths:
                    for output_path in paths:
                        [archive, asset, sub_folder, hex] = output_path.split("/")
                        directory = path.join(target_dir, output_path)
                        if not path.exists(directory):
                            to_zip[path.join(target_dir, archive, asset)] = True
                            makedirs(directory)
                        copyfile(path.join(hex_dir, hash), path.join(directory, hash))

# zip everything
print("[INFO] Zipping...")
to_zip = list(to_zip.keys())
zip_count = len(to_zip)
thread_count = min(zip_count, 10)
locations_per_thread = floor(zip_count / thread_count)

for thread_n in range(thread_count):
    start = locations_per_thread * thread_n
    end = zip_count if thread_n == (thread_count - 1) else min(zip_count, start + locations_per_thread)
    thread = Thread(target=zip, kwargs={
        'start': start, 
        'end': end,
        'items': to_zip
    })
    thread.daemon = True
    thread.start()

# wait for the threads to all finish
for thread in enumerate():
    if thread is current_thread():
        continue
    thread.join()