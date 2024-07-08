## Contribution Guide
Learn the basics of the Starpoint project to begin contributing!

## What's Left?
There is a list of all routes that have been discovered along with their implementation status in the [routes document](./routes.md)

This document also contains links to individual documentation pages for each route with the data that passes between the client and server.

## Project Structure
The following is an overview of the project structure.
### ``/src``
- The location of the majority of Starpoint's source code.
- ``/data``
  - The directory that hosts the scripts that handle the server's internal SQLite database for storing player data.
  - ``wdfpData.ts``
    - The main database proxy script. Exports a variety of functions that are helpful for modifying, inserting, or deleting player data.
- ``/lib``
  - The location of various scripts that are intended for helping the API endpoints perform their functions.\
- ``/routes``
  - The directory that hosts all of the scripts that directly handle API endpoints.
  - ``/api``
    - Hosts scripts that handle ``na.wdfp.kakaogames.com`` endpoints.
  - ``/infodesk.ts``
    - The script that handles any traffic that was originally intended for ``gc-infodesk-zinny3.kakaogames.com``
  - ``/openapi.ts``
    - The script that handles any traffic that was originally intended for ``openapi-zinny3.game.kakao.com``
- ``server.ts``
  - The main server script. Connects all of the routes together.

## Getting Started

### Server-Client Traffic
When the game client makes calls to ``na.wdfp.kakaogames.com`` it sends a POST request with its body in a base64-encoded msgpack format. It also expects responses from the server to be in this format.

I recommend the usage of ref45638's [msgpack-converter website](https://ref45638.github.io/msgpack-converter/) when viewing captured traffic to and from this server.

For all other API endpoints, the client and server simply communicate using JSON.

### Captured Traffic
Examining captured traffic between the game client and the official game servers is the easiest way to reverse engineer and implement specific endpoints.

In order to capture traffic, I recommend following the [android connection tutorial](./connecting-android.md), but instead of running ``start.bat``, run ``start_mitmweb_capture.bat``.

This will open mitmweb and capture traffic between the game client and official game servers instead of proxying traffic to Starpoint.

You will be simply playing the game like normal, but all of the network traffic you are generating is being captured by mitmweb.

You can save the traffic that mitmweb captures and reference it at a later point when implementing endpoints.

## Scripts
The ``/scripts`` directory contains two useful scripts:
- ``converter.py``
  - Converts game asset files into a form that's readable by the server. The output of this script has been stored in the ``/assets`` directory.
  - Simply put files from [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) into a folder called ``in`` in the same directory as the script and it will convert them into a folder called ``out``.
- ``mitm-redirect-traffic.py``
  - A script for [mitmproxy](https://mitmproxy.org/) which will redirect all incoming game traffic to this server.
- ``cdn_download.py``
  - A script for downloading a copy of the game's official CDN.
  - Run instructions are included in the main README.