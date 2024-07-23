# Android Connection Guide
The following is a general guide for connecting the Android game client to Starpoint.

## Install Mitmproxy
1. Install [mitmproxy](https://mitmproxy.org) (follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/)).

## Android Setup
There are two methods for connecting to Starpoint with an Android device or emulator.

## Method 1: WG Tunnel
1. In the directory where you installed Starpoint, locate and run the ``start.bat`` file.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - For non-Windows users or manual setup, see the "Manual Server Start Method" section below.
2. The Starpoint server and mitmproxy will start in their own windows.
3. A new tab will open in your web browser. Keep this open for later.
4. Install the WG tunnel app from the [Google Play Store](https://play.google.com/store/apps/details?id=com.zaneschepke.wireguardautotunnel) or [Github](https://github.com/zaneschepke/wgtunnel/releases/tag/3.4.7)
5. Ensure your Android device is on the same network as your computer.
6. Open the WG tunnel app.
7. Tap the "+" button in the bottom right corner of the screen.
8. Tap "WireGuard"
9. Tap "Add from QR code"
10. Scan the QR code that is visible in the tab that opened up in your browser.
11. At the top of the screen, there will be some numbers; i.e. 10.0.0.167.
12. Tap the round button to the right of these numbers.
13. Accept the VPN popup.
14. Tap the round button to the right of these numbers again.
15. Clear all data for the pinball game via your device's settings.
16. Open the pinball game, and **sign in as a Guest**.
17. If prompted, click "Trust for this session" for the mitmproxy certificate.
18. You will now be connected to Starpoint.

## Method 2: TunProxy
### Server Setup
1. In the directory where you installed Starpoint, locate and run the ``start-tunproxy.bat`` file.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - For non-Windows users or manual setup, see the "Manual Server Start Method" section below.
2. The Starpoint server and mitmproxy will start in their own windows.

### Discovering Local IP Address (Windows)
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

### Device/Emulator Setup
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

## (Optional) Manual Server Start Method
1. Navigate to the mitmproxy Program Files directory, usually located at ``C:\Program Files\mitmproxy\bin``.
2. Open a command prompt in this directory and run the following line:
   ```
   .\mitmweb --mode wireguard -s "path/to/starpoint/directory/scripts/mitm-redirect-traffic.py"
   ```
   - **Note**: The ``path/to/starpoint/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint, keep the ``/scripts/mitm-redirect-traffic.py`` portion.
3. Go to the directory where you have Starpoint installed; open a new terminal, and start the server.
   ```
   npm install
   npx tsc
   npm run dev
   ```