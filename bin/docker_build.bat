@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Docker Build 

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

docker build -t pip-services-template-node-1.0.0 -f ./bin/Dockerfile --rm=true .

CD /d %OLDDIR%

ENDLOCAL
