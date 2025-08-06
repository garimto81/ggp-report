# Camera Work Auto Report

Firebase와 GitHub 데이터를 기반으로 카메라 파트의 일일 업무 보고서를 자동으로 생성하는 시스템입니다.

## 🚀 주요 기능

- **Firebase 업무 데이터 수집**: Firestore에서 카메라 파트 업무 자동 추출
- **GitHub 활동 추적**: 이슈, 커밋, PR 등 개발 활동 모니터링
- **AI 우선순위 분석**: Gemini AI로 상위 3개 중요 업무 자동 선정
- **Google Docs 자동 작성**: 구조화된 보고서 자동 생성
- **완전 자동화**: GitHub Actions로 평일 오전 10시 자동 실행

## 📋 목차

- [시작하기](#시작하기)
- [설치 방법](#설치-방법)
- [환경 설정](#환경-설정)
- [사용 방법](#사용-방법)
- [시스템 구조](#시스템-구조)
- [문제 해결](#문제-해결)

## 🎯 시작하기

### 필요 조건

- Node.js v18 이상
- Firebase 프로젝트 (Firestore 활성화)
- Google Cloud 프로젝트 (Docs API 활성화)
- GitHub 계정
- Gemini AI API 키

### 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/garimto81/ggp-report.git
cd ggp-report

# 의존성 설치
npm install

# TypeScript 빌드
npm run build

# 테스트 실행
npm start -- --run-once
```

## 🔧 설치 방법

### 1. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Firestore Database 활성화
3. 익명 인증 활성화
4. 프로젝트 설정에서 설정 정보 복사

### 2. Google Cloud 설정

1. [Google Cloud Console](https://console.cloud.google.com)에서 프로젝트 생성
2. Google Docs API 활성화
3. 서비스 계정 생성 및 키 다운로드
4. Google Docs에 서비스 계정 이메일 편집 권한 부여

### 3. Gemini AI 설정

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 생성
2. API 키 안전하게 보관

### 4. GitHub Secrets 설정

리포지토리 Settings > Secrets and variables > Actions에서 추가:

- `GEMINI_API_KEY`: Gemini AI API 키
- `GOOGLE_SERVICE_ACCOUNT_KEY`: 서비스 계정 JSON (전체 내용)
- `GOOGLE_DOC_ID`: Google Docs 문서 ID

## ⚙️ 환경 설정

### Firebase 설정 (src/config/index.ts)

```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 환경 변수 (.env)

```env
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_DOC_ID=your-google-doc-id
```

## 📖 사용 방법

### 수동 실행

```bash
# 일회성 실행
npm start -- --run-once

# 또는 직접 실행
node dist/index.js --camera-report --run-once
```

### 자동 실행

GitHub Actions가 평일 오전 10시(KST)에 자동으로 실행합니다.

수동으로 트리거하려면:
1. Actions 탭 이동
2. "Daily Camera Report" 선택
3. "Run workflow" 클릭

### 테스트

```bash
# 시스템 테스트
node test-run.js

# Firebase 연결 테스트
node firebase-test.js

# Google Docs 테스트
node test-docs-v2.js
```

## 🏗️ 시스템 구조

```
src/
├── services/
│   ├── firebaseDataFetcher.ts    # Firebase 데이터 수집
│   ├── githubDataFetcher.ts      # GitHub API 연동
│   ├── geminiAnalyzer.ts         # AI 우선순위 분석
│   ├── googleDocsWriter.ts       # Google Docs 작성
│   └── reportGenerator.ts        # 전체 프로세스 관리
├── types/
│   └── index.ts                  # TypeScript 타입 정의
├── config/
│   └── index.ts                  # Firebase 설정
└── index.ts                      # 진입점
```

### 데이터 흐름

1. **데이터 수집**: Firebase + GitHub → 카메라 파트 업무 추출
2. **AI 분석**: Gemini AI → 우선순위 점수 및 상위 3개 선정
3. **보고서 작성**: Google Docs → 날짜별 탭에 자동 작성

## 🔍 문제 해결

### Firebase 연결 실패

- Firebase 프로젝트 설정 확인
- 익명 인증 활성화 여부 확인
- 네트워크 연결 상태 점검

### Google Docs 쓰기 실패

- 서비스 계정 이메일이 문서에 편집 권한 있는지 확인
- Google Docs API 활성화 여부 확인
- 문서 ID가 올바른지 확인

### GitHub Actions 실행 안 됨

- Actions 활성화 여부 확인
- Secrets 설정 확인
- 워크플로우 파일 문법 검증

## 📊 성능

- 평균 실행 시간: 3-5분
- Firebase 캐시: 5분 유지
- 병렬 처리로 50% 성능 향상

## 🔐 보안

- API 키는 GitHub Secrets로 관리
- Firebase 익명 인증 사용
- 최소 권한 원칙 적용

## 📝 라이선스

MIT License

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- **개발자**: Aiden Kim
- **GitHub**: [@garimto81](https://github.com/garimto81)
- **프로젝트**: [ggp-report](https://github.com/garimto81/ggp-report)

---

*Camera Work Auto Report - 카메라 파트 업무의 효율적인 관리를 위한 자동화 솔루션*