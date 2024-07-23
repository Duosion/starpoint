# iOS Connection Guide
The following is a general guide for connecting the iOS game client to Starpoint.

Credit for most of the steps goes to to [trickster.dev](https://www.trickster.dev/post/setting-up-mitmproxy-with-ios17.1/).
**If you have any problems with the below steps, I recommend following the linked guide, which includes screenshots.

## Install Mitmproxy
1. Install [mitmproxy](https://mitmproxy.org) (follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/)).

## Starting the Server
1. In the directory where you installed Starpoint, locate and run the ``start-ios.bat`` file.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - For non-Windows users or manual setup, see the "Manual Server Start Method" section below.
2. The Starpoint server and mitmproxy will start in their own windows.
   - One of the windows should eventually show ``StarPoint is listening on http://localhost:8000``. This may take a minute or two, give it some time.
   - The other window should be largely empty and say "Flows" in the top left corner.

## iOS Setup
1. Open the settings app.
2. Press the Wi-Fi button.
3. Tap the (i) for your current Wi-Fi connection.
4. Scroll to the bottom of the sub-menu and press the "Configure Proxy" button.
5. Select the "Manual" option.
6. In the "Server" field, enter you computer's IP address. (e.g., `10.0.0.167`)
7. In the "Port" field, enter `8080`
8. Press the "Save" button at the top of the screen.
9. Open safari.
10. Navigate to the website ``mitm.it``.
11. Press the green button under "iOS".
12. Allow the file to be downloaded.
13. Open the settings app.
14. Go to "General" and then to "VPN & Device Management"
15. Locate "mitmproxy" under "Downloaded Profile".
16. Tap it and press the Install button.
    - iOS will ask for your PIN code and additional verification.
17. Go back to the General settings section.
18. Go to "About" and select "Certificate Trust Settings" at the bottom.
19. Turn on the switch for the mitmproxy certificate.
20. Clear all data for the pinball game via your device's settings.
21. Open the pinball game, and **sign in as a Guest**.
22. If prompted, click "Trust for this session" for the mitmproxy certificate.
23. You will now be connected to Starpoint.

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