@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Save the path to the scripts directory
set "MITMPROXYSCRIPTFOLDER=%BASEPATH%scripts"

:: Set the path to the coreDNS directory
set "COREDNSFOLDER=%BASEPATH%.coredns"

:: Set the path to the mitmproxy directory
set "MITMPROXYFOLDER=%BASEPATH%.mitmproxy"

:: Start Node.js
start cmd.exe /k "cd /d "%BASEPATH%" && npm install && npx tsc && npm run dev"

:: Start the CoreDNS server
if exist "%COREDNSFOLDER%\coredns.exe" (
    start cmd.exe /k "cd /d "%COREDNSFOLDER%" && .\coredns.exe"
) else (
    start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo CoreDNS is not installed in the '.coredns' folder. Install from https://github.com/coredns/coredns/releases."
)

:: Check if mitmproxy is installed in the install directory
if exist "%MITMPROXYFOLDER%\mitmweb.exe" (
    start cmd.exe /k "cd /d "%MITMPROXYFOLDER%" && .\mitmweb.exe --mode wireguard --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s ..\scripts\mitm-redirect-traffic.py"
) else (
    if exist "C:\Program Files\mitmproxy\bin\mitmweb.exe" (
        start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo Using existing mitmproxy install... && "C:\Program Files\mitmproxy\bin\mitmweb.exe" --mode wireguard --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s mitm-redirect-traffic.py"
    ) else (
        start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo mitmproxy is not installed in the '.mitmproxy' folder. Install from https://mitmproxy.org/downloads."
    )
)