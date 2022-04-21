@echo off
echo Starting..
:main
node .
echo Restarter bot om 5 sek
timeout /t 5 
goto main