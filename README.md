## Starpoint
A work-in-progress server emulator for the global version of a mobile pinball game.

## Implemented Features
* Tutorial
* Character levelling & uncapping.
* Party organization
* Main story quests
* Main story quest drops
* Character stories
* Guest login flow

## Installation
- Install [Node.js](https://nodejs.org/en/download/package-manager).
- Clone the repository from the command line.
  ```
  git clone https://github.com/Duosion/starpoint.git
  ```
- Navigate to the directory where the repository was cloned to.
- Double click on the start.bat file to start the server.
  - If mitmproxy is installed, this will also start up mitmproxy automatically.
- The server is now listening on port 8000 for any game traffic.

## FAQ
- **Do I have to host this on my own?**
  - Yes. I will not be hosting this server myself.
- **Does this work for IOS devices?**
  - At the moment, this server has not been tested for compatibility with the IOS game client.
- **How do I connect the game to this server?**
  - Read the "Connecting" section below.
- **Can I import my save data?**
  - Not yet. This is a planned feature, however.
- **I am getting a 'H404' error**
  - Receiving this error means that the feature you are trying to interact with has not been implemented yet.

## Connecting
- In order to utilize Starpoint, you will have to redirect traffic from the game client, originally intended for the official servers, to an instance of Starpoint running on your computer.
- [Android Connection Guide](/docs/connecting-android.md)

## Scripts
The ``/scripts`` directory contains two useful scripts:
- ``converter.py``
  - Converts game asset files into a form that's readable by the server. The output of this script has been stored in the ``/assets`` directory.
- ``mitm-redirect-traffic.py``
  - A script for [mitmproxy](https://mitmproxy.org/) which will redirect all incoming game traffic to this server.

## Special Thanks
Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.