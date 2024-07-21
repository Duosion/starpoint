## Starpoint
A work-in-progress server emulator for the global version of a mobile pinball game.

## Implemented Features
* Tutorial
* Character leveling, uncapping, mana boards, & ex boosting
* Character stories
* Quests
  - All main quests playable
  - Some event/boss quests playable
* Gacha
  - Rate-up Portals
  - Armament Portals
  - Unit/Armament Exchanges
* Armaments
  - Awakening
  - Melting
* Most shops
* Party organization
* Encyclopedia
* Time travel to past & future events.

For a more in-depth view of the progress completed, visit the [API routes document](/docs/routes.md).

## Installation
1. Install [Node.js](https://nodejs.org/en/download/package-manager).
2. Clone the repository from the command line.
   ```
   git clone https://github.com/Duosion/starpoint.git
   ```
   - If you do not have git installed, click the green "Code" button at the top of the page and select "Download ZIP" to download a ZIP of the repository instead.
3. Navigate to the directory where the repository was cloned/unzipped to.
4. Double click on the start.bat file to start the server.
   - If mitmproxy is installed, this will also start up mitmproxy automatically.
4. The server is now listening on port 8000 for any game traffic.

## FAQ
- **Do I have to host this on my own?**
  - Yes. I will not be hosting this server myself.
- **Does this work for IOS devices?**
  - Starpoint has support for IOS, but has not been tested for compatibility with the IOS game client.
- **How do I connect the game to this server?**
  - Read the "Connecting" section below.
- **Can I import my save data?**
  - Yes. Once you have Starpoint installed & running, visit [http://localhost:8000](http://localhost:8000) in your browser and navigate to the players page.
  - Select a player from the page, select the save file you want to import, and click the "Upload Save" button.
- **How can I download my save data?**
  - You can download your save data **before EOS** by visting & following the instructions for the [wdfp-save-downloader repository](https://github.com/Duosion/wdfp-save-downloader).
- **I am getting an 'H404' error**
  - Receiving this error means that the feature you are trying to interact with has not been implemented yet.

## Connecting
In order to utilize Starpoint, you will have to redirect traffic from the game client, originally intended for the official servers, to an instance of Starpoint running on your computer.
- [Android Connection Guide](/docs/connecting-android.md)

## Contribution
Interested in contributing to Starpoint? Read the [contribution guide](/docs/contributing.md) to learn more!

## CDN Installation
The game client requires more data than is included in the base APK, such as character assets, music, and more. It will download these extra files from the game's offical CDN (Content Delivery Network).

Once the game servers close, this CDN will also close. Therefore, Starpoint offers the ability to replicate the game's CDN so that the client can still download assets after EOS.

In order to replicate the game's CDN, Starpoint requires a copy of the files that the game's CDN would normally serve. For the purpose of this, a CDN downloading script has been created.

### CDN Download Instructions (Windows)
1. Ensure that you have [python](https://www.python.org/downloads/) downloaded and installed.
2. Locate the ``download_cdn.bat`` file in the directory where you downloaded Starpoint.
3. Double click the batch file and follow the instructions in the newly opened window.

### CDN Download Instructions (Other)
1. Ensure that you have [python](https://www.python.org/downloads/) downloaded and installed.
2. Navigate to the directory where you downloaded Starpoint and open a terminal.
3. Install the requirements for the download script by running:
   ```
   pip install -r scripts/requirements.txt
   ```
4. Run the download script:
   ```
   python scripts/cdn_download.py
   ```

### Download Info
- The CDN files will be downloaded to a directory called ``.cdn`` under the main Starpoint directory.
- A full copy of the CDN, including all languages and platforms, will be around ~30GB. Each language is around ~12GB.
- Currently, only the English language CDN can be downloaded for the IOS platform.

## Special Thanks
Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.