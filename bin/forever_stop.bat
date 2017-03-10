@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Forever stop

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

forever stop dummy

CD /d %OLDDIR%

ENDLOCAL
