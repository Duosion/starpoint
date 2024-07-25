@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Save the path to the scripts directory
set "MITMPROXYSCRIPTFOLDER=%BASEPATH%scripts"

:: Set the path to the coreDNS directory
set "COREDNSFOLDER=%BASEPATH%.coredns"

:: Start Node.js
start cmd.exe /k "cd /d "%BASEPATH%" && npm install && npx tsc && npm run dev"

:: Start the CoreDNS server
start cmd.exe /k "cd /d "%COREDNSFOLDER%" && .\coredns.exe"

:: Check if mitmproxy is installed in the install directory
if exist "C:\Program Files\mitmproxy\bin\mitmweb.exe" (
    start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && "C:\Program Files\mitmproxy\bin\mitmweb.exe" --mode wireguard --set connection_strategy=lazy -s mitm-redirect-traffic.py"
) else (
    start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo mitmproxy is not installed at 'C:\Program Files\mitmproxy'. Install from https://mitmproxy.org"
)

echo Starting both Node.js server and mitmweb...