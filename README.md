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

## Connecting (Windows + Android)
- In order to utilize Starpoint, you will have to redirect traffic from the game client, originally intended for the official servers, to an instance of this server running on your computer.
- First, install [mitmproxy](https://mitmproxy.org/), following the instructions to do so from their website/installer.
- Once mitmproxy is installed, navigate to the mitmproxy Program Files directory, usually located at ``C:\Program Files\mitmproxy\bin``.
- Open a command prompt in this directory and run the following line.
  - **Note**: The ``path/to/starpoint/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint, keep the ``/scripts/mitm-redirect-traffic.py`` portion.
  ```
  .\mitmproxy -s "path/to/starpoint/directory/scripts/mitm-redirect-traffic.py"
  ```
- Now, the mitmproxy proxy will be running. Make note of the port that the proxy is listening on. Typically this port is ``8080``, but mitmproxy displays the port it is listening on in the bottom right corner in the format ``[*:xxxx]``
- Next, you need to find your computer's local IP address.
- Open a new command prompt and run the following command:
  ```
  ipconfig
  ```
- Find the section for your wifi adapter. e.g. "Wireless LAN adapter Wi-Fi:". And make note of the "IPv4 Address" value. Mine, for instance, is 10.0.0.167.
- Go to the directory where you have Starpoint installed; open a new terminal, and start the server.
  ```
  npm run dev
  ```
- With that, the setup for the computer is complete, and we can move on to the Android device.
- For this process, we will be using an app called [TunProxy](https://github.com/raise-isayan/TunProxy). If you do not want to use this app, there are other methods of connecting your Android device to your PC, such as your phone's built-in WiFi proxy settings or [gnirehtet](https://github.com/Genymobile/gnirehtet).
- Download and install the TunProxy APK to your Android device [here](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1).
- Once installed, ensure that your Android device is connected to the same internet network as the computer running Starpoint.
- Open the TunProxy app and put down your computer's IP address with the proxy port into the "Proxy address (ipv4:port) field". For example, my field would look like ``10.0.0.167:8080``
- Press the "START" button and accept the VPN popup.
- If you do not already have the pinball game installed, install it from the play store.
- Clear all data for the pinball game through your Android device's settings.
  > Ensure that you have your existing account linked, as this step will erase all data from the app.
- Open the app, and **sign in as a Guest**. The other login methods will never be supported.
- Once signed up, you might see a popup on the loading screen about trusting the mitmproxy certificate. Click the "Trust for this session" button.
- You will have to redownload the assets for the game, but you will now be connected to the Starpoint private server.

## Scripts
The ``/scripts`` directory contains two useful scripts:
- ``converter.py``
  - Converts game asset files into a form that's readable by the server. The output of this script has been stored in the ``/assets`` directory.
- ``mitm-redirect-traffic.py``
  - A script for [mitmproxy](https://mitmproxy.org/) which will redirect all incoming game traffic to this server.

## Special Thanks
Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.