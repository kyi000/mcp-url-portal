#!/bin/bash

# MCP URL 포털 서버 시작 스크립트

# 노드 패키지 설치 확인
echo "패키지 설치 확인 중..."
npm install

# 로그 디렉토리 생성
mkdir -p logs

# 서버 시작
echo "MCP URL 포털 서버를 시작합니다..."
node server.js