## Android Connection Guide
The following is a general guide for connecting the Android game client to Starpoint.

## Installing Mitmproxy
- If not already installed, install mitmproxy from their [website](https://mitmrpoxy.org)
- Follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/) for your platform.
- The mitmproxy tool will act as an intermediary between Starpoint and the game client, redirecting all game traffic to Starpoint.

## Starting the Server
### Quick method (Windows)
- Ensure that mitmproxy is installed to the ``C:\Program Files\mitmproxy`` folder.
- In the directory where you installed Starpoint, locate and run the ``start.bat`` file.
- The Starpoint server and mitmproxy will start in their own windows.
### Manual method
- Navigate to the mitmproxy Program Files directory, usually located at ``C:\Program Files\mitmproxy\bin``.
- Open a command prompt in this directory and run the following line:
  ```
  .\mitmproxy -p 8080 -s "path/to/starpoint/directory/scripts/mitm-redirect-traffic.py"
  ```
    - **Note**: The ``path/to/starpoint/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint, keep the ``/scripts/mitm-redirect-traffic.py`` portion.
- Go to the directory where you have Starpoint installed; open a new terminal, and start the server.
  ```
  npm run dev
  ```

## Discovering Local IP Address (Windows)
- Open a new command prompt and run the following command:
  ```
  ipconfig
  ```
- Find the section for your wifi adapter. e.g. "Wireless LAN adapter Wi-Fi:". And make note of the "IPv4 Address" value. Mine, for instance, is ``10.0.0.167``.

## Android/Emulator Setup
- To connect the Android device to mitmproxy on your computer we will be using an app called [TunProxy](https://github.com/raise-isayan/TunProxy). 
  - If you do not want to use this app, there are other methods of connecting your Android device to your PC, such as your phone's built-in WiFi proxy settings or [gnirehtet](https://github.com/Genymobile/gnirehtet).
- Download and install the TunProxy APK to your Android device from [here](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1).
- Once installed, ensure that your Android device is connected to the same internet network as the computer running Starpoint.
- Open the TunProxy app and input your computer's IP address along with ``:8080`` into the "Proxy address (ipv4:port) field". For example, my field would look like ``10.0.0.167:8080``
- Press the "START" button and accept the VPN popup.
- If you do not already have the pinball game installed, install it using your desired method.
- Clear all data for the pinball game through your Android device's settings.
  - Ensure that you have your existing account linked, as this step will erase all data from the app.
- Open the app, and **sign in as a Guest**. The other login methods will not be supported.
- Once signed up, you might see a popup on the loading screen about trusting the mitmproxy certificate. Click the "Trust for this session" button.
- You will have to redownload the assets for the game, but you will now be connected to the Starpoint private server.