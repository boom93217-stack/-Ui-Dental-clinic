@echo off
REM Video Frame Extraction & Compression Script
REM This script extracts frames from MP4 videos and compresses them to WebP

echo ============================================================
echo Video Frame Extraction and Compression Tool
echo ============================================================
echo.

REM Check if FFmpeg is installed
where ffmpeg >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: FFmpeg is not installed or not in PATH
    echo.
    echo Please install FFmpeg:
    echo   1. Download from: https://ffmpeg.org/download.html
    echo   2. Or use: winget install FFmpeg
    echo   3. Or use: choco install ffmpeg (if Chocolatey is installed)
    echo.
    echo After installing, make sure to add FFmpeg to your system PATH
    pause
    exit /b 1
)

echo ✓ FFmpeg found
echo.

REM Set variables
set BASE_DIR=c:\Users\w\Desktop\UI Dentist
set OUTPUT_DIR=%BASE_DIR%\public\videos

REM Ensure output directory exists
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

REM Extract frames from Video 1
echo Processing Video 1...
if not exist "%OUTPUT_DIR%\video_1_frames" mkdir "%OUTPUT_DIR%\video_1_frames"
ffmpeg -i "%BASE_DIR%\1 Directing_dental_clinic_video_wa…_202608131643.mp4" -vf fps=2 "%OUTPUT_DIR%\video_1_frames\frame_%%04d.png" -y
if exist "%OUTPUT_DIR%\video_1_frames\frame_0001.png" echo ✓ Video 1 frames extracted
echo.

REM Extract frames from Video 2
echo Processing Video 2...
if not exist "%OUTPUT_DIR%\video_2_frames" mkdir "%OUTPUT_DIR%\video_2_frames"
ffmpeg -i "%BASE_DIR%\2 Dentist_examining_patient_in_clinic_202608131640.mp4" -vf fps=2 "%OUTPUT_DIR%\video_2_frames\frame_%%04d.png" -y
if exist "%OUTPUT_DIR%\video_2_frames\frame_0001.png" echo ✓ Video 2 frames extracted
echo.

REM Extract frames from Video 3
echo Processing Video 3...
if not exist "%OUTPUT_DIR%\video_3_frames" mkdir "%OUTPUT_DIR%\video_3_frames"
ffmpeg -i "%BASE_DIR%\3 Directing_clinic_video_sequence_1080p_202608131649.mp4" -vf fps=2 "%OUTPUT_DIR%\video_3_frames\frame_%%04d.png" -y
if exist "%OUTPUT_DIR%\video_3_frames\frame_0001.png" echo ✓ Video 3 frames extracted
echo.

echo ============================================================
echo Now compressing frames using Node.js...
echo ============================================================
echo.

REM Run Node.js compression script
cd /d "%BASE_DIR%"
node extract-and-compress.js

echo.
echo ============================================================
echo Processing Complete!
echo ============================================================
pause
