@echo off
REM Update GitHub Repo Script
REM Stages, commits, and pushes all changes in this folder to GitHub

cd /d "%~dp0"

echo ============================================================
echo Update GitHub - UI Dentist
echo ============================================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERROR: This folder is not a git repository.
    pause
    exit /b 1
)

git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes to commit. Everything is already up to date.
    pause
    exit /b 0
)

echo Changes detected:
echo.
git status --short
echo.

set /p MSG=Enter a commit message (leave blank for a default):

if "%MSG%"=="" (
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATESTAMP=%%a-%%b-%%c
    set MSG=Update site - %date% %time%
)

git commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo ERROR: Commit failed.
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed. Check your internet connection or GitHub login.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Done! Your changes are now live on GitHub.
echo ============================================================
pause
