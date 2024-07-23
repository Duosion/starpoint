# Android Connection Guide
The following is a general guide for connecting the Android game client to Starpoint.

## Install Mitmproxy
1. Install [mitmproxy](https://mitmproxy.org) (follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/)).

## Starting the Server
1. In the directory where you installed Starpoint, locate and run the ``start.bat`` file.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - For non-Windows users or manual setup, see the "Manual Server Start Method" section below.
2. The Starpoint server and mitmproxy will start in their own windows.
3. A new tab will open in your web browser. Keep this open for later.

## Android/Emulator Setup
1. Install the WG tunnel app from the [Google Play Store](https://play.google.com/store/apps/details?id=com.zaneschepke.wireguardautotunnel) or [Github](https://github.com/zaneschepke/wgtunnel/releases/tag/3.4.7)
2. Ensure your Android device is on the same network as your computer.
3. Open the WG tunnel app.
4. Tap the "+" button in the bottom right corner of the screen.
5. Tap "WireGuard"
6. Tap "Add from QR code"
7. Scan the QR code that is visible in the tab that opened up in your browser.
8. At the top of the screen, there will be some numbers; i.e. 10.0.0.167.
9. Tap the round button to the right of these numbers.
4. Accept the VPN popup.
5. Tap the round button to the right of these numbers again.
6. Clear all data for the pinball game via your device's settings.
7. Open the pinball game, and **sign in as a Guest**.
8. If prompted, click "Trust for this session" for the mitmproxy certificate.
9. You will now be connected to Starpoint.

## (Optional) Manual Server Start Method
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