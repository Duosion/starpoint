@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Save the path to the scripts directory
set "MITMPROXYSCRIPTFOLDER=%BASEPATH%scripts"

:: Set the path to the mitmproxy directory
set "MITMPROXYFOLDER=%BASEPATH%.mitmproxy"

:: Check if mitmproxy is installed in the install directory
if exist "%MITMPROXYFOLDER%\mitmproxy.exe" (
    start cmd.exe /k "cd /d "%MITMPROXYFOLDER%" && .\mitmweb.exe -p 8080"
) else (
    if exist "C:\Program Files\mitmproxy\bin\mitmproxy.exe" (
        start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && "C:\Program Files\mitmproxy\bin\mitmweb.exe" -p 8080"
    ) else (
        start cmd.exe /k "cd /d "%MITMPROXYSCRIPTFOLDER%" && echo mitmproxy is not installed in the '.mitmproxy' folder. Install from https://mitmproxy.org/downloads."
    )
)