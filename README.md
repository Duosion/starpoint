# Starpoint
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
1. Install the latest version of [Node.js](https://nodejs.org/en/download/prebuilt-installer).
2. Clone the repository from the command line.
   ```
   git clone https://github.com/Duosion/starpoint.git
   ```
   - If you do not have git installed, click the green "Code" button at the top of the page and select "Download ZIP" to download a ZIP of the repository instead.
3. Navigate to the directory where the repository was cloned/unzipped to.
4. Download a copy of the CDN by following the [CDN Installation guide](/docs/cdn-download.md).
5. Follow the guide for your phone or emulator:
   - [Android](/docs/connecting-android.md)
   - [iOS](/docs/connecting-ios.md)

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
- [iOS Connection Guide](/docs/connecting-ios.md)

## Contribution
Interested in contributing to Starpoint? Read the [contribution guide](/docs/contributing.md) to learn more!

## Special Thanks
Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.