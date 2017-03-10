@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Docker Build 

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

docker run -i -t --rm -p 8001:8001 -p 8801:8801 pip-services-template-node-1.0.0

CD /d %OLDDIR%

ENDLOCAL
