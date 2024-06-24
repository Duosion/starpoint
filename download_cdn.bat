@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Start the CDN download script.
start cmd.exe /k "cd /d "%BASEPATH%" && pip install -r scripts/requirements.txt && python scripts/cdn_download.py"