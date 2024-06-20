## Starpoint
A work-in-progress server reimplementation for a mobile pinball game.

## Implemented Features
> Anything not listed is not currently implemented.
* Tutorial
* Character levelling & uncapping.
* Party organization
* Main story quests
* Main story quest drops
* Character stories
* Guest login flow

## Installation
- Install [Node.js](https://nodejs.org/en/download/package-manager)
- Clone the repository.
  ```
  git clone https://github.com/Duosion/starpoint.git
  ```
- Navigate to the directory where the repository was cloned.
- Install packages.
  ```
  npm install
  ```
- Compile TypeScript.
  ```
  npx tsc
  ```
- Run the server.
  ```
  npm run dev
  ```
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

## Connecting (Android)
- You can connect to the server by proxying traffic from the game client on Android to this server hosted on your computer.
- I recommend using [mitmproxy](https://mitmproxy.org/) for this purpose.
- A [script](scripts/mitm-redirect-traffic.py) is included in the ``/scripts`` directory for mitmproxy to redirect game traffic to this server.
- Once you connect the game client to this server, you should clear all data for the game app. This is so that you can sign up for and create an   account with this server instead of the official game servers.
- Step-by-step instructions for Android are **coming soon**.

## Scripts
The ``/scripts`` directory contains two useful scripts:
- ``converter.py``
  - Converts game asset files into a form that's readable by the server. The output of this script has been stored in the ``/assets`` directory.
- ``mitm-redirect-traffic.py``
  - A script for [mitmproxy](https://mitmproxy.org/) which will redirect all incoming game traffic to this server.

## Special Thanks
Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.