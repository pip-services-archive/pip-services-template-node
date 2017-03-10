@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Forever run

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

forever start --uid dummy -a bin\run.js

CD /d %OLDDIR%

ENDLOCAL
