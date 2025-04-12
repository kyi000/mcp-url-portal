// 로깅 유틸리티
const fs = require('fs');
const path = require('path');

// 로그 디렉토리 생성
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 현재 날짜 포맷팅
const getFormattedDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// 현재 시간 포맷팅
const getFormattedTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
};

// 로그 레벨
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

/**
 * 로그 메시지 작성
 * @param {string} level - 로그 레벨 (ERROR, WARN, INFO, DEBUG)
 * @param {string} message - 로그 메시지
 * @param {Object} [data] - 추가 데이터
 */
const log = (level, message, data = null) => {
  const date = getFormattedDate();
  const time = getFormattedTime();
  const logFile = path.join(logDir, `${date}.log`);

  // 로그 포맷
  let logEntry = `[${date} ${time}] [${level}] ${message}`;
  
  // 추가 데이터가 있으면 JSON 형식으로 추가
  if (data) {
    let dataStr;
    try {
      dataStr = JSON.stringify(data);
    } catch (error) {
      dataStr = '[데이터 직렬화 오류]';
    }
    logEntry += ` - ${dataStr}`;
  }

  // 콘솔에 출력
  console.log(logEntry);

  // 파일에 기록
  fs.appendFileSync(logFile, logEntry + '\n');
};

// 다양한 로그 레벨의 함수 생성
const logger = {
  error: (message, data) => log(LOG_LEVELS.ERROR, message, data),
  warn: (message, data) => log(LOG_LEVELS.WARN, message, data),
  info: (message, data) => log(LOG_LEVELS.INFO, message, data),
  debug: (message, data) => log(LOG_LEVELS.DEBUG, message, data),
};

module.exports = logger;