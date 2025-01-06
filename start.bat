@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Save the path to the scripts directory
set "MITMPROXYSCRIPTFOLDER=%BASEPATH%scripts"

:: Set the path to the mitmproxy directory
set "MITMPROXYFOLDER=%BASEPATH%.mitmproxy"

set "CANRUN=true"

::Find mitmproxy with several methods
set "MITMPROXYCOMMAND="
if exist "%MITMPROXYFOLDER%\mitmweb.exe" (
    set "MITMPROXYCOMMAND=cd /d "%MITMPROXYFOLDER%" && .\mitmweb.exe --mode wireguard --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s ..\scripts\mitm-redirect-traffic.py"
) else (
    if exist "C:\Program Files\mitmproxy\bin\mitmweb.exe" (
        set "MITMPROXYCOMMAND=cd /d "%MITMPROXYSCRIPTFOLDER%" && echo Using existing mitmproxy install... && "C:\Program Files\mitmproxy\bin\mitmweb.exe" --mode wireguard --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s mitm-redirect-traffic.py"
    ) else (
        set FOUND_MITMPROXY=
        for %%e in (%PATHEXT%) do (
            for %%X in (mitmweb%%e) do (
                if not defined FOUND_MITMPROXY (
                set FOUND_MITMPROXY=%%~$PATH:X
                )
            )
        )
        if defined FOUND_MITMPROXY (
            set "MITMPROXYCOMMAND=cd /d "%MITMPROXYSCRIPTFOLDER%" && echo Using existing mitmproxy install in path... && mitmweb --mode wireguard --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s mitm-redirect-traffic.py"
        ) else (
            echo "mitmproxy is not installed in the '.mitmproxy' folder. Opening download page at https://mitmproxy.org/downloads..."
            explorer "https://mitmproxy.org/downloads"
            echo "Please add mitmweb.exe to the .mitmproxy folder or install it via the installer. If you have Python installed, you may try 'pip install mitmproxy'"
            set "CANRUN="
        )
    )
)

if not "%CANRUN%" == "true" (
    echo Couldn't find stuff needed to run Starpoint! Please check errors above and use the web pages opened to download missing utilities. After you are done, close this window and try again.
    PAUSE
    exit \B
)

:: Start starpoint
start cmd.exe /k "cd /d "%BASEPATH%" && starpoint"

:: Start MITMproxy
start cmd.exe /k "%MITMPROXYCOMMAND%"