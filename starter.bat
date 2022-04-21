@echo off
echo Starting...
:main
node .
echo Restarter...
timeout /t 5 
goto main