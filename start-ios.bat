@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Save the path to the scripts directory
set "MITMPROXYSCRIPTFOLDER=%BASEPATH%scripts"

:: Set the path to the mitmproxy directory
set "MITMPROXYFOLDER=%BASEPATH%.mitmproxy"

:: Start the Node.js project
start cmd.exe /k "cd /d "%BASEPATH%" && npm install && npx tsc && npm run dev"

:: Check if mitmproxy is installed in the install directory
if exist "%MITMPROXYFOLDER%\mitmproxy.exe" (
    start cmd.exe /k "cd /d "%MITMPROXYFOLDER%" && .\mitmproxy.exe --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s ..\scripts\mitm-redirect-traffic.py -p 8080"
) else (
    if exist "C:\Program Files\mitmproxy\bin\mitmproxy.exe" (
        start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && "C:\Program Files\mitmproxy\bin\mitmproxy.exe" --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s mitm-redirect-traffic.py -p 8080"
    ) else (
        start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo mitmproxy is not installed in the '.mitmproxy' folder. Install from https://mitmproxy.org/downloads."
    )
)