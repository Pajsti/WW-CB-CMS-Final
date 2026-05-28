@echo off
chcp 65001 >nul
echo.
echo  WW-CB — Push na GitHub
echo  ========================
echo.

:: Zkontrolovat git
git --version >nul 2>&1
if errorlevel 1 (
  echo  CHYBA: Git neni nainstalovan.
  echo  Stahni na: https://git-scm.com
  pause
  exit /b 1
)

:: Inicializovat git pokud neni
if not exist ".git" (
  echo  Inicializuji Git...
  git init
  git branch -M main
)

:: Nastavit identitu pokud chybi
git config user.email >nul 2>&1
if errorlevel 1 (
  set /p GIT_EMAIL=" Zadej svuj email pro Git: "
  set /p GIT_NAME=" Zadej sve jmeno pro Git: "
  git config --global user.email "%GIT_EMAIL%"
  git config --global user.name "%GIT_NAME%"
)

:: Nastavit remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin https://github.com/Pajsti/WW-CB-CMS-Final.git
  echo  Remote nastaven.
) else (
  git remote set-url origin https://github.com/Pajsti/WW-CB-CMS-Final.git
)

:: Commit a push
echo.
echo  Pridavam soubory...
git add .

set /p COMMIT_MSG=" Commit zprava (Enter = 'update'): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=update

git commit -m "%COMMIT_MSG%"

echo.
echo  Pushuji na GitHub...
git push -u origin main --force

if errorlevel 1 (
  echo.
  echo  Push selhal. Zkus se prihlasit znovu do GitHub.
  echo  Spust: git config --global credential.helper manager
) else (
  echo.
  echo  Hotovo! Netlify automaticky rebuildne web za ~2 minuty.
)

echo.
pause
