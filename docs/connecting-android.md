# Android Connection Guide
The following is a general guide for connecting the Android game client to Starpoint.

## Installing Mitmproxy
1. Install [mitmproxy](https://mitmproxy.org) (follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/)).
2. The mitmproxy tool will act as an intermediary between Starpoint and the game client, redirecting all game traffic to Starpoint.

## Starting the Server
### Quick method (Windows)
1. Ensure that mitmproxy is installed to the ``C:\Program Files\mitmproxy`` folder.
2. In the directory where you installed Starpoint, locate and run the ``start.bat`` file.
3. The Starpoint server and mitmproxy will start in their own windows.
### Manual method
1. Navigate to the mitmproxy Program Files directory, usually located at ``C:\Program Files\mitmproxy\bin``.
2. Open a command prompt in this directory and run the following line:
   ```
   .\mitmproxy -p 8080 -s "path/to/starpoint/directory/scripts/mitm-redirect-traffic.py"
   ```
   - **Note**: The ``path/to/starpoint/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint, keep the ``/scripts/mitm-redirect-traffic.py`` portion.
3. Go to the directory where you have Starpoint installed; open a new terminal, and start the server.
   ```
   npm install
   npx tsc
   npm run dev
   ```

## Discovering Local IP Address (Windows)
1. On your keyboard press the Windows key + X.
2. Select ``Terminal``.
2. In the window that just opened, type the following:
   ```
   ipconfig
   ```
3. Locate your WiFi adapter's "IPv4 Address" under the "Wireless LAN adapter Wi-Fi:" section (e.g., `10.0.0.167`).
   - The section will typically look like the following. Notice the "IPv4 Address. . ." entry.
     ```
     Wireless LAN adapter Wi-Fi:
    
     Connection-specific DNS Suffix  . : <Excluded>
     IPv6 Address. . . . . . . . . . . : <Excluded>
     IPv6 Address. . . . . . . . . . . : <Excluded>
     Temporary IPv6 Address. . . . . . : <Excluded>
     Link-local IPv6 Address . . . . . : <Excluded>
     IPv4 Address. . . . . . . . . . . : 10.0.0.167
     Subnet Mask . . . . . . . . . . . : 255.255.255.0
     Default Gateway . . . . . . . . . : <Excluded>
                                         10.0.0.1
     ```

## Android/Emulator Setup
1. Install [TunProxy](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1) onto your Android device.
2. Ensure your Android device is on the same network as your computer.
3. Open TunProxy and enter your computer's IP address with `:8080` (e.g., `10.0.0.167:8080`).
4. Tap "START" and accept the VPN popup.
5. If you do not already have the pinball game installed, install it using your desired method.
6. Clear all data for the pinball game via your device's settings.
   - Ensure that you have your existing account linked, as this step will erase all data from the app.
7. Open the app, and **sign in as a Guest**.
8. If prompted, click "Trust for this session" for the mitmproxy certificate.
9. You will have to redownload the assets for the game, but you will now be connected to the Starpoint private server.