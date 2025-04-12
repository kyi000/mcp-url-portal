// MCP URL 포털 서버
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_URL = process.env.TARGET_URL || 'https://portal.nrich.go.kr/kor/archeologyUsrList.do?menuIdx=567';

// CORS 설정
if (process.env.ALLOW_CORS === 'true') {
  app.use(cors());
  logger.info('CORS가 활성화되었습니다.');
}

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });
  next();
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  logger.error('서버 오류', { error: err.message, stack: err.stack });
  res.status(500).send('서버 내부 오류가 발생했습니다.');
});

// 메인 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 프록시 엔드포인트
app.get('/proxy', async (req, res) => {
  try {
    logger.info('프록시 요청 시작', { targetUrl: TARGET_URL });
    
    const response = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': req.headers['user-agent'],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      responseType: 'arraybuffer'
    });

    // 응답 헤더 설정
    res.set('Content-Type', response.headers['content-type']);
    logger.info('프록시 요청 성공', { 
      contentType: response.headers['content-type'],
      contentLength: response.data.length 
    });
    
    res.send(response.data);
  } catch (error) {
    logger.error('프록시 요청 오류', { 
      error: error.message,
      status: error.response ? error.response.status : 'N/A' 
    });
    
    res.status(500).send('요청 처리 중 오류가 발생했습니다.');
  }
});

// 리다이렉트 엔드포인트
app.get('/redirect', (req, res) => {
  logger.info('리다이렉트 요청', { targetUrl: TARGET_URL });
  res.redirect(TARGET_URL);
});

// API 엔드포인트
app.get('/api/target-url', (req, res) => {
  logger.info('대상 URL API 요청');
  res.json({ targetUrl: TARGET_URL });
});

// 서버 시작
app.listen(PORT, () => {
  logger.info(`MCP URL 포털 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  logger.info(`대상 URL: ${TARGET_URL}`);
});