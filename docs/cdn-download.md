## CDN Download Guide
The game client requires more data than is included in the base APK, such as character assets, music, and more. It will download these extra files from the game's offical CDN (Content Delivery Network).

Once the game servers close, this CDN will also close. Therefore, Starpoint offers the ability to replicate the game's CDN so that the client can still download assets after EOS.

In order to replicate the game's CDN, Starpoint requires a copy of the files that the game's CDN would normally serve. For the purpose of this, a CDN downloading script has been created.

### CDN Download Instructions (Windows)
1. Locate the ``download_cdn.bat`` file in the directory where you downloaded Starpoint.
2. Double click the batch file and follow the instructions in the newly opened window.

### CDN Download Instructions (Other)
1. Navigate to the directory where you downloaded Starpoint and open a terminal.
2. Run the CDN download script.
   ```
   npm run cdn
   ```

### Download Info
- The CDN files will be downloaded to a directory called ``.cdn`` under the main Starpoint directory.
- A full copy of the CDN, including all languages and platforms, will be around ~30GB. Each language is around ~12GB.
- Currently, only the English language CDN can be downloaded for the IOS platform.

## Special Thanks
Special thanks to [wdfp-extractor](https://github.com/ScripterSugar/wdfp-extractor) for providing the assets and knowledge required to create the ``converter.py`` script.