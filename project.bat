@echo off
title VEYLORA USA - Project Starter
echo ==========================================
echo  VEYLORA USA - Beverly Hills
echo  Starting Backend + Frontend...
echo ==========================================
echo.

REM --- Backend Window ---
start "VEYLORA Backend - Port 8000" cmd /k "cd /d %~dp0backend && echo Checking backend/.env... && if not exist .env echo [WARNING] backend/.env missing! Add DATABASE_URL, COHERE_API_KEY, GROQ_API_KEY && uvicorn main:app --reload --port 8000"

REM --- Frontend Window (Frontend ROOT me hai) ---
start "VEYLORA Frontend - Port 3000" cmd /k "cd /d %~dp0 && echo Checking .env.local... && if not exist .env.local echo [WARNING] .env.local missing! Add NEXT_PUBLIC_API_URL && npm run dev"

echo.
echo DONE! 2 Windows khul gayi hongi:
echo Backend  : http://localhost:8000
echo Frontend : http://localhost:3000
echo.
pause
