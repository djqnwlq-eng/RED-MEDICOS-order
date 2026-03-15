# 💄 안티그래비티 맞춤형 화장품 발주 플랫폼

교육생이 직접 화장품을 설계하고 발주하는 6단계 워크플로우 플랫폼입니다.
Gemini AI가 개발 목표를 분석해 맞춤 성분을 자동 추천합니다.

---

## 🚀 빠른 시작

```bash
# 1. 이 폴더로 이동
cd antigravity-order

# 2. 서버 실행
npm start
```

브라우저에서 `http://localhost:3000` 열기

> **npx가 없다면:** `npm install -g serve` 먼저 실행

---

## 📁 파일 구조

```
antigravity-order/
├── index.html       ← 메인 앱 (전체 코드가 이 파일 하나에 있음)
├── package.json     ← 서버 실행 스크립트
└── README.md        ← 이 파일
```

---

## 🤖 Gemini AI 설정

1. [Google AI Studio](https://aistudio.google.com/app/apikey) 에서 API 키 발급
2. 앱 실행 후 첫 화면에서 API 키 입력
3. 모델: `gemini-2.5-flash` (index.html 상단 CONFIG에서 변경 가능)

API 키 없이도 태그 기반 폴백 추천으로 사용 가능

---

## ⚙️ 주요 설정 (index.html 상단 CONFIG)

```javascript
const CONFIG = {
  GEMINI_MODEL: 'gemini-2.5-flash',           // Gemini 모델명
  TARGET_KG:    25,                             // 최소 제조량 (kg)
  BASE_PRICE:   6000,                           // 기본 제조 원가 (추출물 제외)
  SUBMIT_EMAIL: 'research@antigravity.co.kr',  // 제출 수신 이메일
};
```

---

## 📦 성분 관리

- 앱 상단 **⚙ 성분 관리** 버튼 클릭
- 성분명 / 단가(원) / 효능 태그 입력 후 추가
- 삭제도 동일 화면에서 가능
- 태그는 AI 폴백 추천에도 활용됨 (예: `가려움, 진정, 항균`)

---

## 🔢 MOQ 계산 로직

```
최소 수량 = ceil(25,000g ÷ 용량(ml))

예시:
  30ml  → 최소 834개
  50ml  → 최소 500개
 100ml  → 최소 250개
 200ml  → 최소 125개
```

---

## 📋 6단계 워크플로우

| 단계 | 내용 |
|------|------|
| 1단계 | 개발 목표 자유기입 + 기능성 체크 + 사용 부위 선택 |
| 2단계 | 제형 선택 (미스트/크림/로션/세럼/앰플 등 8종) |
| 3단계 | AI 추천 추출물 + 전체 성분 선택 + 실시간 단가 계산 |
| 4단계 | 용량/수량 선택 + MOQ 자동 검증 |
| 5단계 | 용기 선택 (제형에 따라 자동 제한) |
| 6단계 | 최종 확인 + 연구팀 제출 |

---

## 🔧 Claude Code에서 수정하기

Claude Code로 이 파일을 열고 수정 요청 예시:

```
"성분 리스트에 '레시틴 200원 보습,장벽' 추가해줘"
"크림 D 타입 (젤크림형) 제형 추가해줘"
"MOQ 기준을 25kg에서 20kg으로 변경해줘"
"제출 시 EmailJS로 실제 이메일 발송되게 연동해줘"
"용량에 500ml 옵션 추가해줘"
```

---

## 📌 TODO (추후 개발)

- [x] EmailJS 연동으로 실제 이메일 발송
- [x] 성분 데이터 localStorage 영구 저장
- [x] 발주 이력 조회 기능
- [x] 관리자 비밀번호 보호
- [x] 제조사 내부 Google Sheets 연동
