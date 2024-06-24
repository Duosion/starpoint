@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Save the path to the scripts directory
set "MITMPROXYSCRIPTFOLDER=%BASEPATH%scripts"

:: Check if mitmproxy is installed in the install directory
if exist "C:\Program Files\mitmproxy\bin\mitmweb.exe" (
    start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && "C:\Program Files\mitmproxy\bin\mitmweb.exe" -p 8080"
) else (
    start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo mitmproxy is not installed at 'C:\Program Files\mitmproxy'. Install from https://mitmproxy.org"
)

echo Starting mitmweb...