// MCP URL 포털 서버
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_URL = process.env.TARGET_URL || 'https://portal.nrich.go.kr/kor/archeologyUsrList.do?menuIdx=567';

// CORS 설정
if (process.env.ALLOW_CORS === 'true') {
  app.use(cors());
}

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 메인 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 프록시 엔드포인트
app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent': req.headers['user-agent'],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      responseType: 'arraybuffer'
    });

    // 응답 헤더 설정
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('프록시 요청 오류:', error.message);
    res.status(500).send('요청 처리 중 오류가 발생했습니다.');
  }
});

// 리다이렉트 엔드포인트
app.get('/redirect', (req, res) => {
  res.redirect(TARGET_URL);
});

// API 엔드포인트
app.get('/api/target-url', (req, res) => {
  res.json({ targetUrl: TARGET_URL });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`MCP URL 포털 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log(`대상 URL: ${TARGET_URL}`);
});