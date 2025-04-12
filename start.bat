@echo off
rem MCP URL 포털 서버 시작 스크립트 (Windows)

echo 패키지 설치 확인 중...
call npm install

rem 로그 디렉토리 생성
if not exist logs mkdir logs

echo MCP URL 포털 서버를 시작합니다...
node server.js