# project_rule.md  
Smart Tourism Platform – Design & System Rules

본 문서는 디자인, 테마, 언어, UI 일관성을 위한
프로젝트 최상위 규칙 문서이다.
모든 화면, 모든 기능, 모든 플랫폼은 이 규칙을 따른다.

---

## 1. DESIGN PRINCIPLES (핵심 철학)

### 1.1 서비스 성격
- 외국인 관광객 대상
- 안전 · 신뢰 · 명확함이 최우선
- “이 앱 하나면 된다”는 인식 제공

### 1.2 디자인 키워드
- Calm
- Trustworthy
- Premium
- Minimal
- International

### 1.3 금지 규칙 (절대)
- ❌ 그라데이션 사용 금지
- ❌ 네온 / 형광 색상 금지
- ❌ 과도한 애니메이션 금지
- ❌ 장식용 요소 남용 금지
- ❌ 의미 없는 아이콘 사용 금지

---

## 2. COLOR & THEME RULE

### 2.1 Theme Mode
- 기본값: **Dark Mode**
- 지원: Light / Dark
- 시스템 설정 연동 가능
- 사용자가 수동 전환 가능

### 2.2 Dark Mode (Default)
- Background:
  - Primary: `slate-900 ~ slate-950`
  - Card: `slate-800`
- Text:
  - Primary: White
  - Secondary: slate-300
- Accent:
  - Green 계열 (Action / Success)
- Danger:
  - Red 계열 (SOS / Warning)

### 2.3 Light Mode
- Background:
  - Primary: `slate-50`
  - Card: White
- Text:
  - Primary: slate-900
  - Secondary: slate-600
- Accent:
  - 동일한 Green 톤 유지 (채도 낮춤)

### 2.4 Theme 전환 규칙
- 색상 값만 변경
- 레이아웃 / 구조 / 컴포넌트 형태는 절대 변경하지 않음
- 동일한 UX 유지

---

## 3. TYPOGRAPHY RULE

### 3.1 기본 원칙
- 국제 사용자 기준
- 읽기 쉬움 최우선
- 장식 폰트 사용 금지

### 3.2 텍스트 위계
- Heading: 굵고 명확
- Body: 단문 위주
- Caption: 보조 설명용

### 3.3 텍스트 길이 규칙
- 한 화면 한 문장 원칙
- 버튼 텍스트는 2~3단어 이내
- 긴 설명은 Bottom Sheet 또는 Detail 화면으로 분리

---

## 4. LAYOUT & RESPONSIVE RULE

### 4.1 기본 규칙
- Mobile First
- App(WebView) = Mobile UI 고정
- Tablet / Desktop은 확장형 레이아웃

### 4.2 Breakpoints
- Mobile: ~640px
- Tablet: 641px ~ 1024px
- Desktop: 1025px ~

### 4.3 공통 구조
- Top Header: 항상 고정
- Bottom Navigation: 항상 고정
- 주요 액션 버튼은 엄지 영역에 배치

---

## 5. GLOBAL UI ELEMENT RULE

### 5.1 Header (모든 화면)
- 좌측: 로고
- 우측: 알림 / 프로필
- 높이 고정
- 투명 or 반투명 배경 허용

### 5.2 Bottom Navigation

Bottom Navigation은 최소 3개, 최대 5개 탭만 허용한다.
(과도한 탭 분리는 금지)

Allowed Tabs Structure (Final):

1. Home
   - 모든 주요 기능의 진입 허브
   - Taxi / Tickets / Market Rates / Store / Travel 기능 포함
   - 개별 기능은 Home 내부 섹션 또는 서브 화면으로 제공

2. Translator
   - 음성 / 텍스트 / OCR 번역
   - 외국인 핵심 락인 기능

3. Map
   - 안전 존
   - 주변 장소
   - 시세 / 이동 / 행동 연결 허브

4. Exchange (또는 Wallet)
   - 환전
   - 잔액 확인
   - 결제 내역
   - 신뢰/안정성 목적

5. My Page
   - Profile
   - Settings
   - Theme / Language
   - Safety / Demo 정보

⚠️ Taxi, Tickets, Store는 Bottom Tab으로 직접 노출하지 않는다.
⚠️ 모든 기능은 Home 또는 Map을 통해 접근한다.


### 5.3 Wallet 표시
- 주요 화면에서 잔액 노출
- 통화: USD / MNT 동시 표시

### 5.4 SOS 버튼
- 항상 접근 가능
- 눈에 띄되 과하지 않게
- Map / Taxi 화면에서는 강조

---

## 6. LANGUAGE (다국어) RULE

### 6.1 지원 언어
- English (Default)
- Mongolian
- Korean
- Japanese
- Chinese (Simplified)

### 6.2 언어 전환 규칙
- 즉시 반영 (reload 없음)
- 앱 전체에 동일하게 적용
- 언어 변경 시:
  - 레이아웃 깨짐 ❌
  - 줄바꿈 허용 ⭕
  - 텍스트 길이에 맞춰 자동 확장

### 6.3 번역 기준
- 직역 ❌
- 관광 맥락 중심 의역 ⭕
- 짧고 명확하게

---

## 7. ICON & IMAGE RULE

### 7.1 아이콘
- 단순한 라인 아이콘
- 의미 명확한 것만 사용
- 장식용 아이콘 금지

### 7.2 이미지
- 실제 장소 / 자연 사진 위주
- 과도한 필터 금지
- Dark Mode에서도 식별 가능해야 함

---

## 8. INTERACTION RULE

### 8.1 버튼
- 한 화면에 Primary Action 1개
- Secondary Action은 시각적 우선순위 낮춤

### 8.2 피드백
- 모든 액션에 즉각적인 반응
- 로딩 / 성공 / 실패 상태 명확히 구분

---

## 9. DEMO MODE RULE

### 9.1 Demo 환경
- 실제 API 연결 ❌
- Mock Data 사용 ⭕
- 결제 / 위치 / 치안은 시뮬레이션

### 9.2 목적
- “실제 서비스처럼 보이는 경험”
- 투자 / 파트너 / 내부 검증용

---


## 10. INFORMATION ARCHITECTURE (IA) RULE

### 10.1 Home의 역할
Home은 단순한 메인 화면이 아니다.
Home은 "여행 중 모든 행동의 시작점"이다.

Home 내부 구성:
- Quick Actions
  - Taxi
  - Tickets
  - Translator
  - Exchange
- Featured Sections
  - Made in Mongolia (Store)
  - Recommended Routes
  - Events / Tickets
- Safety Highlights
  - Nearby Safety Info
  - Price Transparency Entry

### 10.2 접근 원칙
- 사용자는 “어디로 가야 할지” 고민하지 않아야 한다
- Home에서 모든 행동이 시작된다
- Map은 상황 인지
- Translator는 즉시성
- Exchange는 신뢰
- My Page는 관리


## 11. BOTTOM NAVIGATION UX RULE

- Bottom Navigation은 항상 고정
- 아이콘 + 텍스트 필수
- 활성 탭은 명확하게 강조
- 5개 초과 금지
- 기능성 버튼(SOS 등)은 Bottom Nav에 포함하지 않는다

Thumb Zone Rule:
- Bottom Nav와 주요 CTA는 엄지 영역 안에 배치
