@echo off
setlocal
if not exist "%~dp0.tools\node_modules\node\bin\node.exe" (
  echo Local Node.js is missing. Install Node.js 22.12+ and use npm directly.
  exit /b 1
)
set "PATH=%~dp0.tools\node_modules\node\bin;%PATH%"
"%~dp0.tools\node_modules\node\bin\node.exe" "%~dp0.tools\node_modules\npm\bin\npm-cli.js" %*
exit /b %errorlevel%
