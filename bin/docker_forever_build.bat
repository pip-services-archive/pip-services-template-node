@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Docker Build (with forever.js)

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

docker build -t pip-services-template-node-1.0.0 -f ./bin/DockerfileForever --rm=true .

CD /d %OLDDIR%

ENDLOCAL
