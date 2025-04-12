FROM node:18-alpine

WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 로그 디렉토리 생성
RUN mkdir -p logs

# 환경 변수 설정
ENV PORT=3000
ENV NODE_ENV=production

# 포트 노출
EXPOSE 3000

# 앱 실행
CMD ["node", "server.js"]