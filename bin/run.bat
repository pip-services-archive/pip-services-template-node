@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Microservice Template

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

node bin\run.js %1

CD /d %OLDDIR%

ENDLOCAL