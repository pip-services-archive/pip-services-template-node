@ECHO OFF

SETLOCAL enabledelayedexpansion

TITLE Microservice Template

SET OLDDIR=%CD%
SET CURRDIR=%~dp0\..

CD /d %CURRDIR%

bin\ServiceFabricAppPackageUtil.exe /source:. /target:..\dummy-node-sfpkg /appname:DummyNode /exe:bin/node.exe /ma:bin/run.js /AppType:DummyNodeType

rmdir /s /q ..\dummy-node-sfpkg\DummyNode\C\.git

copy bin\ServiceManifest.xml ..\dummy-node-sfpkg\DummyNode\ServiceManifest.xml

powershell.exe .\bin\setup-cluster-app.ps1

CD /d %OLDDIR%

ENDLOCAL