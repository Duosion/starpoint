@echo off
setlocal

:: Get the directory path of the batch file
set "BASEPATH=%~dp0"

:: Start the CDN download script.
start cmd.exe /k "cd /d "%BASEPATH%" && npm install && npm run cdn"