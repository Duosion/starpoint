# Rooted Android Connection Guide
The following is a general guide for connecting a rooted Android device or emulator to Starpoint.

This guide expects your Android device or emulator to be rooted using Magisk.

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

## Starting the Server
1. **In the following step, you may receive a Windows firewall popup. Hit "Allow".**
   - This step is crucial. If you do not hit allow you will encounter connection problems.
   - If the popup does not appear, you can continue.
2. In the directory where you installed Starpoint, locate and run the ``start-ios.bat`` file.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - For non-Windows users or manual setup, see the "Manual Server Start Method" section below.
3. Two windows should open.
   - One of the windows should eventually show ``StarPoint is listening on http://localhost:8000``. This may take a minute or two, give it some time.
   - The other window should show ``Flows`` in its top left corner.

## Device/Emulator Setup

### Wi-Fi Proxy Setup
This is a general guide. The process will vary depending on your version of Android its distributor.

1. Open your device's settings.
2. Navigate to the Wi-Fi menu.
3. Open the settings for the Wi-Fi network that both your device and computer are connected to.
4. Locate the proxy section.
5. Set the proxy's host name to your computer's IP address (e.g., ``10.0.0.167``).
6. Set the proxy's port to ``8080``
7. Save these settings.

### Certificate Setup
1. Open your device's web browser.
2. Navigate to ``http://mitm.it``
   - If you cannot access this page, your device is not connected to your computer properly.
3. Scroll down to the Android section and tap ``Get mitmproxy-ca-cert.cer``.
4. Tap ``Show Instructions`` and follow the instructions for installing the certificate.
5. In the web browser, navigate to ``http://mitm.it/cert/magisk``.
6. Open the Magisk app.
7. Click ``Modules`` and install the file that was downloaded in step 5.
8. Reboot your device.
9. After reboot, ensure your device is still connected to your computer by navigating to ``http://mitm.it``
   - If the page doesn't load, follow the ``Wi-Fi Proxy Setup`` section above.

### Pinball App Setup
1. Clear all data for the pinball game via your device's settings.
   - You only have to do this once, do not clear your data every time you connect to Starpoint.
2. Open the pinball game, and **sign in as a Guest**.
3. If prompted, click "Trust for this session" for the mitmproxy certificate.
4. You will now be connected to Starpoint.

## (Optional) Manual Server Start Method
1. Navigate to the .mitmproxy folder in the Starpoint install directory.
2. Open a command prompt in this folder and run the following line:
   ```
   .\mitmproxy.exe --mode wireguard --set connection_strategy=lazy -s ..\scripts\mitm-redirect-traffic.py
   ```
   - **Note**: The ``path/to/starpoint/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint, keep the ``/scripts/mitm-redirect-traffic.py`` portion.
3. Go to the directory where you have Starpoint installed; open a new terminal, and start the server.
   ```
   npm install
   npx tsc
   npm run dev
   ```