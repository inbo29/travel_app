# Smart Tourism Platform (Mongolia)
관광 · 치안 · 결제 · 이동 · 커머스 · 기록 통합 플랫폼

외국인 관광객을 위한 몽골 특화 스마트 관광 서비스  
웹 / 모바일 웹 / 앱(WebView) 공통 구조

---

## 1. 기술 스택 확정

### Frontend
- Framework: **React 19.2.3**
- Language: **TypeScript**
- Styling:
  - Tailwind CSS
  - CSS Module (보조)
- State Management:
  - React Context (MVP)
  - TanStack Query (API 캐싱)
- Routing:
  - React Router v7 (SPA)
- Build Tool:
  - Vite
- Responsive:
  - Mobile First
  - Tablet / Desktop 대응
- App:
  - WebView 기반 (iOS / Android)
  - 동일한 Web Build 사용

---

## 2. 프로젝트 디렉토리 구조 (확정)

root
├── public
│ └── assets (icons, images, lottie)
│
├── src
│ ├── assets # 이미지, 아이콘, 애니메이션
│ ├── components # 공통 UI 컴포넌트
│ ├── context # 전역 상태 (Auth, Wallet, Locale)
│ ├── graphql # API Query / Mutation
│ ├── hooks # Custom Hooks
│ ├── pages # 화면 단위 (Route 기준)
│ ├── styles # 글로벌 스타일
│ ├── utils # helper, formatter
│ ├── widgets # 비즈니스 위젯 (Map, TaxiCard 등)
│ ├── middleware.ts # 인증 / 언어 / 접근 제어
│ └── sdk.ts # 외부 SDK 연동
│
├── project_url.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md

yaml
Copy code

---

## 3. 화면 URL 구조 (Route Spec)

### 3-1. Public / Onboarding
/onboarding

yaml
Copy code

---

### 3-2. Main Tabs
/home
/map
/wallet
/taxi
/profile

yaml
Copy code

---

### 3-3. Home / Explore
/home
/home/explore
/home/explore/:category
/home/place/:placeId

yaml
Copy code

---

### 3-4. Wallet / Payment
/wallet
/wallet/topup
/wallet/exchange
/wallet/checkout

yaml
Copy code

---

### 3-5. Store (Made in Mongolia)
/store
/store/:category
/store/product/:productId
/store/checkout

yaml
Copy code

---

### 3-6. Tickets
/tickets
/tickets/:eventId
/tickets/my

yaml
Copy code

---

### 3-7. Travel Log
/travel-log
/travel-log/day/:date
/travel-log/share/:logId

yaml
Copy code

---

### 3-8. Taxi / Transport
/taxi
/taxi/ride
/taxi/complete

yaml
Copy code

---

### 3-9. Translator
/translator

yaml
Copy code

---

### 3-10. Market Rates
/market-rates
/market-rates/:category

yaml
Copy code

---

### 3-11. Profile / Settings
/profile
/profile/settings
/profile/safety
/profile/premium

yaml
Copy code

---

## 4. 반응형 기준 (필수)

### Breakpoints
- Mobile: `~640px`
- Tablet: `641px ~ 1024px`
- Desktop: `1025px ~`

### 규칙
- 모든 화면 Mobile First
- Desktop에서는 Max Width 1280px
- App(WebView)는 Mobile UI 고정

---

## 5. 앱(WebView) 연동 규칙

### 공통
- 동일한 Web Build 사용
- User-Agent로 App 구분

### App 전용 브릿지
window.AppBridge = {
getLocation,
openCamera,
openGallery,
biometricAuth,
pushToken
}

yaml
Copy code

---


## 6. 권한 & 보안

- 위치 권한 (Map, Taxi)
- 마이크 (Translator, Taxi 녹음)
- 카메라 (OCR, Travel Log)
- Wallet 관련 모든 API는 인증 필수

---

## 7. 개발 순서 (확정)

### Phase 1 – MVP
1. Onboarding
2. Home / Explore
3. Map
4. Taxi
5. Wallet
6. Translator

### Phase 2 – 수익 확장
7. Store
8. Tickets
9. Market Rates

### Phase 3 – 락인
10. Travel Log
11. Premium

---

## 9. GitHub Actions / Demo Publish

### 목적
- 실제 서비스처럼 동작하는 데모 환경 제공
- URL 하나로 웹 / 모바일 웹 / 앱(WebView) 시연
- push → 자동 빌드 → 자동 배포

---

## 9-1. 배포 방식

- Framework: React 19.2.3 + Vite
- Output Directory: `/dist`
- Hosting:
  - GitHub Pages (1차 데모)
  - 추후 Vercel / S3 / Cloudflare 전환 가능

---

## 9-2. GitHub Actions Workflow

📄 `.github/workflows/deploy.yml`

```yaml
name: Deploy Demo (GitHub Pages)

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
9-3. GitHub Pages 설정
GitHub Repository → Settings → Pages

Source: gh-pages branch

Folder: / (root)

배포 URL:

php-template
Copy code
https://<github-username>.github.io/<repository-name>/
예시:

arduino
Copy code
https://company.github.io/smart-tourism/
9-4. Vite 설정 (중요)
📄 vite.config.ts

ts
Copy code
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<repository-name>/'
})
⚠️ GitHub Pages에서는 base 필수

9-5. 환경 변수 (Demo Mode)
GitHub → Settings → Secrets and variables → Actions

env
Copy code
VITE_APP_ENV=demo
VITE_API_BASE_URL=https://api.demo.local
VITE_MAP_API_KEY=xxxx
9-6. Demo 동작 규칙
로그인 없이 진입 가능

Wallet → Mock Balance

Taxi → Dummy Ride Flow

결제 → 성공 화면만 표시

Map → Static POI + Safety Zone

Translator → UI Only (API 미연결)

⚠️ 실결제 / 실위치 / 실치안 API 없음

yaml
Copy code

---

## ✅ 이 방식의 장점 (지금 상황에 최적)
- ✅ GitLab 필요 없음
- ✅ main 브랜치 push = 자동 배포
- ✅ URL 즉시 공유 가능
- ✅ 앱(WebView)에서도 동일 URL 사용 가능
- ✅ “실제 서비스처럼 보이는 데모” 완성

---

## 🔜 다음 단계 (강력 추천 순서)

### 1️⃣ Vite + React 19 개발환경 세팅  
→ `package.json`, `vite.config.ts`, `tailwind.config.ts`

### 2️⃣ Demo 전용 전역 상태
```ts
const IS_DEMO = import.meta.env.VITE_APP_ENV === 'demo'


10. ROUTING & LAYOUT RULE (추가)
10.1 Routing 기본 원칙

모든 화면은 src/pages 기준으로 관리한다

pages 폴더는 Route 단위 화면만 포함

재사용 UI는 절대 pages에 두지 않는다

10.2 Layout 규칙 (중요)

Header / Bottom Navigation은 Layout 책임

각 화면(pages)은 Layout을 직접 제어하지 않는다

📁 디렉토리 추가 (권장):

src
 ├── layouts
 │   └── MainLayout.tsx   # Header + BottomNav 포함

10.3 Route 계층 구조 (확정)
/
├─ /home                (메인 허브)
│   ├─ /home/travel-log
│   ├─ /home/tickets
│   ├─ /home/store
│   └─ /home/rates
│
├─ /translator
├─ /map
├─ /exchange
└─ /mypage
    ├─ /mypage/settings
    ├─ /mypage/settings/theme
    └─ /mypage/settings/language


⚠️ Taxi / Tickets / Store는 최상위 Route 금지

10.4 Bottom Navigation 규칙

Bottom Navigation은 다음 Route만 직접 연결한다:

/home
/translator
/map
/exchange
/mypage


Bottom Tab은 5개 초과 금지

기능성 화면은 반드시 /home/* 또는 /map/* 하위로 이동

10.5 Pages 내부 구조 규칙

📁 예시:

pages
 ├── home
 │   ├── Home.tsx        # 내부 라우터
 │   ├── HomeMain.tsx    # 실제 홈 화면
 │   ├── Tickets.tsx
 │   ├── TravelLog.tsx
 │   └── Rates.tsx


Home.tsx는 Router 역할만 담당

실제 UI는 HomeMain.tsx에 구현

10.6 Navigation 규칙

모든 이동은 navigate() 기반

URL 하드코딩 금지

Quick Access / Card / Button은 항상 Route 기반 이동

navigate('/home/tickets')
navigate('/map/safety')

[추가] 11. GLOBAL STATE SYSTEM RULE
## 11. GLOBAL STATE SYSTEM RULE

The following states are global and must be available
to all screens, all components, and all platforms.

Global States:
- Theme (light | dark)
- Language (i18n)
- Demo Mode
- Wallet Summary
- Auth Status

Implementation Rule:
- React Context is the single source of truth
- No screen manages its own theme or language state


👉 화면마다 다르게 처리 ❌
👉 무조건 전역 Context 하나

🌗 [추가] 12. THEME MODE SYSTEM RULE
## 12. THEME MODE SYSTEM RULE

### 12.1 Supported Modes
- Dark (default)
- Light

### 12.2 Theme Priority
1. User manual selection
2. App setting
3. System preference
4. Default (Dark)

### 12.3 Behavior Rules
- Theme change must apply instantly
- No page reload allowed
- No layout or spacing change allowed
- Only color tokens may change

### 12.4 Persistence
- Theme selection must be stored
  - Web: localStorage
  - App: native storage (bridge)


👉 이게 없으면:

다크/라이트 섞임

디자이너/개발자마다 기준 달라짐

유지보수 지옥

🌍 [추가] 13. LANGUAGE PACK (i18n) SYSTEM RULE
## 13. LANGUAGE PACK (i18n) SYSTEM RULE

### 13.1 Supported Languages
- en (Default)
- mn
- ko
- ja
- zh-CN

### 13.2 Language Priority
1. User manual selection
2. App OS language
3. Browser language
4. Default (English)

### 13.3 Language Change Rules
- Must apply instantly
- No page reload
- No route change
- UI must adapt to text length automatically

### 13.4 Translation Policy
- No hardcoded text in components
- All texts must use language keys
- Keys must be semantic, not visual

Example:
- ❌ home_title_1
- ❌ btn_green_big
- ✅ home.hero.title
- ✅ wallet.balance.label


👉 이 규칙 없으면:

나중에 다국어 추가 불가능

문자열 지옥

화면 깨짐

3️⃣ Demo Mode + Theme + Language 관계 (중요)
## 14. DEMO MODE INTERACTION RULE

- Demo Mode must NOT affect:
  - Theme system
  - Language system
  - Layout system

- Demo Mode only affects:
  - Data source
  - API behavior
  - Payment / Location simulation


👉 Demo = 데이터만 가짜
👉 UX/Theme/Language는 실서비스와 동일

이게 투자용 데모의 핵심이다.

4️⃣ (선택) 코드 레벨 규칙 한 줄 추가 (강력 추천)
## 15. CODE DISCIPLINE RULE

- Theme, Language, Demo flags must NEVER be read directly
  from localStorage inside components.
- All components must consume Context only.


## Global System
- Theme Mode (Light / Dark)
- Language Pack (i18n)
- Demo Mode Flag
All global systems are handled via React Context.
