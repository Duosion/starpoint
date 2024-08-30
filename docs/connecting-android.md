# Unrooted Android Connection Guide

The following is a general guide for connecting the Android game client to Starpoint.

## Discovering Local IP Address (Windows)

1. On your keyboard press the Windows key + X.
2. Select ``Terminal``.
3. In the window that just opened, type the following:

   ```sh
   ipconfig
   ```

4. Locate your WiFi adapter's "IPv4 Address" under the "Wireless LAN adapter Wi-Fi:" section (e.g., `10.0.0.167`).
   - The section will typically look like the following. Notice the "IPv4 Address. . ." entry.

     ```yaml
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

## Starting the Server

1. **In the following step, you may receive a Windows firewall popup. Hit "Allow".**
   - This step is crucial. If you do not hit allow you will encounter connection problems.
   - If the popup does not appear, you can continue.
2. In the directory where you installed Starpoint, locate and run the ``start.bat`` file.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - For non-Windows users or manual setup, see the "Manual Server Start Method" section below.
3. Two windows should open.
   - One of the windows should eventually show ``StarPoint is listening on http://localhost:8000``. This may take a minute or two, give it some time.
   - The other window should show ``Loading script mitm-redirect-traffic.py`` at the top.
4. A new tab will open in your web browser. Keep this open for later.

## Device/Emulator Setup

### Installing & Setting up WG Tunnel

1. Install the WG Tunnel app from the [Google Play Store](https://play.google.com/store/apps/details?id=com.zaneschepke.wireguardautotunnel) or [Github](https://github.com/zaneschepke/wgtunnel/releases/tag/3.4.7)
2. Ensure your Android device is on the same network as your computer.
3. Open the WG Tunnel app.
   - If you do not have access to a camera, such as if you are using an emulator. Continue to the "(Optional) Manual WG Tunnel setup" below.
4. Tap the "+" button in the bottom right corner of the screen.
5. Tap "WireGuard"
6. Tap "Add from QR code"
7. Scan the QR code that is visible in the tab that opened up in your browser.
8. At the top of the screen, there will be some numbers; i.e. 10.0.0.167.
9. Tap the round button to the right of these numbers.
10. Accept the VPN popup.
11. Tap the round button to the right of these numbers again.

### (Optional) Manual WG Tunnel setup

If you have already turned on the WG Tunnel VPN, you may skip the following steps and jump to "Pinball App Setup" below.

1. Go to the tab that opened up in your browser.
2. Make note of the values to the left of the QR code. They will look like the below.

   ```ini
   [Interface]
   PrivateKey = <value>
   Address = 10.0.0.1/32
   DNS = 10.0.0.53

   [Peer]
   PublicKey = <value>
   AllowedIPs = 0.0.0.0/0
   Endpoint = 10.0.0.167:51820
   ```

3. In the WG tunnel app, tap the "+" button in the bottom right corner of the screen.
4. Tap "WireGuard".
5. Tap "Create from scratch".
6. In the top field, "Name", put "Pinball".
7. In the next field, "Private key", put the ``PrivateKey`` value you noted earlier.
8. In the "Addresses" field, put the ``Address`` value you noted earlier.
9. In the "DNS servers" field, put ``10.0.0.53``.
   - Do not put the value under the ``[Interface]`` section of the values you noted earlier.
10. In the "Public key" field, put the ``PublicKey`` value you noted earlier.
11. In the "Endpoint" field, put the ``Endpoint`` value you noted earlier.
12. In the "Allowed IPs" field, put the ``AllowedIPs`` value you noted earlier.

### Pinball App Setup

1. Clear all data for the pinball game via your device's settings.
   - You only have to do this once, do not clear your data every time you connect to Starpoint.
2. Open the pinball game, and **sign in as a Guest**.
3. If prompted, click "Trust for this session" for the mitmproxy certificate.
4. You will now be connected to Starpoint.

## (Optional) Manual Server Start Method

1. Navigate to the .mitmproxy folder in the Starpoint install directory.
2. Open a command prompt in this folder and run the following line:

   ```sh
   .\mitmweb.exe --mode wireguard --set connection_strategy=lazy -s ..\scripts\mitm-redirect-traffic.py
   ```

   - **Note**: The ``path/to/starpoint/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint, keep the ``/scripts/mitm-redirect-traffic.py`` portion.
3. Go to the directory where you have Starpoint installed; open a new terminal, and start the server.

   ```sh
   npm install
   npx tsc
   npm run dev
   ```
