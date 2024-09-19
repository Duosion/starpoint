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
  - Unit Portals
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
4. Place your copy of the game's CDN into the Starpoint install directory.
   - It should be named ``.cdn``.
5. Install mitmproxy from their [downloads page](https://mitmproxy.org/downloads/#10.4.0) [[direct Windows download](https://downloads.mitmproxy.org/10.4.0/mitmproxy-10.4.0-windows-x86_64.zip)].
   - Extract into the ``.mitmproxy`` folder within the Starpoint install directory.
6. Follow the guide for your phone or emulator:
   - [Android (No Root)](/docs/connecting-android.md)
   - [Android (Root)](/docs/connecting-android-root.md)
   - [iOS](/docs/connecting-ios.md)

## FAQ
- **Do I have to host this on my own?**
  - Yes. I will not be hosting this server myself.
- **Can I import my save data?**
  - Yes. Once you have Starpoint installed & running, visit [http://localhost:8000](http://localhost:8000) in your browser and navigate to the players page.
  - Select a player from the page, select the save file you want to import, and click the "Upload Save" button.
- **I am getting an 'H404' error**
  - Receiving this error means that the feature you are trying to interact with has not been implemented yet.

## Mods
Follow the [modding guide](/docs/modding.md) to learn more about installing & creating mods.

## Contribution
Interested in contributing to Starpoint? Read the [contribution guide](/docs/contributing.md) to learn more!

## Special Thanks
- Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.
- Special thanks to the [wfax tool](https://github.com/blead/wfax) for making modding possible.