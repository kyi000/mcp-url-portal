# MCP URL 포털

이 프로젝트는 MCP(Mission Control Protocol) 서버를 사용하여 특정 URL(예: 문화재청 매장문화재 포털)에 접근할 수 있는 포털 서비스를 제공합니다.

## 기능

- **직접 리다이렉트**: 사용자를 대상 URL로 직접 리다이렉트합니다.
- **프록시 서비스**: 대상 사이트의 콘텐츠를 프록시를 통해 제공합니다.
- **내장 프레임**: MCP 서버 내에서 대상 사이트를 iframe으로 표시합니다.

## 설치 및 실행 방법

1. 저장소 클론:
   ```
   git clone https://github.com/kyi000/mcp-url-portal.git
   cd mcp-url-portal
   ```

2. 의존성 설치:
   ```
   npm install
   ```

3. 환경 변수 설정:
   `.env` 파일에서 다음 변수를 설정합니다:
   ```
   PORT=3000
   TARGET_URL=https://portal.nrich.go.kr/kor/archeologyUsrList.do?menuIdx=567
   ALLOW_CORS=true
   ```

4. 서버 실행:
   ```
   npm start
   ```

5. 브라우저에서 `http://localhost:3000`으로 접속

## 환경 변수 설명

- `PORT`: 서버가 실행될 포트 번호 (기본값: 3000)
- `TARGET_URL`: 접근하려는 대상 URL
- `ALLOW_CORS`: CORS(Cross-Origin Resource Sharing) 허용 여부 (true/false)

## 라이센스

MIT

## 참고사항

- 일부 웹사이트는 프록시 또는 iframe 내에서의 로딩을 차단할 수 있습니다.
- 이 프로젝트는 교육 및 개발 목적으로만 사용하세요.