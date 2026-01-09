# 프로젝트 구조 설계 규칙

이 문서는 프로젝트 폴더 구조의 책임과 경계를 정의합니다.

---

## 기본 원칙

### 1. `pages/`는 라우트 진입점만 가진다

```
pages/home/
 ├ HomePage.tsx     ← 라우트에서 import
 ├ HomeMain.tsx     ← 내부 컴포넌트 (직접 라우트 X)
 └ index.ts         ← export { default } from './HomePage'
```

- 라우터에서는 항상 `pages/*/index.ts`만 import
- 내부 컴포넌트는 해당 페이지에서만 사용

---

### 2. `domains/`는 재사용 가능한 비즈니스 UI만 가진다

```
✅ OK
domains/tours/
 ├ TourCard.tsx
 └ index.ts

❌ 금지
domains/tours/
 ├ TourPage.tsx      ← pages/로 가야 함
 ├ TourRoute.tsx     ← pages/로 가야 함
```

- 페이지는 `pages/`
- 도메인은 재사용 UI만

---

### 3. `ui/`는 전역 공통 UI만 가진다

```
ui/
 ├ Header.tsx
 ├ BottomNav.tsx
 ├ ThemeToggle.tsx
 └ LanguageSwitcher.tsx
```

- 특정 도메인에 종속되지 않는 UI만
- 모든 페이지에서 공통으로 사용 가능한 컴포넌트

---

### 4. `infra/`는 외부 의존성만 담당한다

```
infra/
 ├ map/        ← 지도 (react-map-gl, Mapbox)
 ├ payment/    ← 결제 UI 및 상태
 └ i18n/       ← 다국어 처리 (미래)
```

**허용되는 것:**
- 결제 수단 UI
- 결제 플로우 상태
- 결제/지도 API 추상화

---

### 5. 비즈니스 로직은 `infra/`에 두지 않는다

```
❌ 금지 - infra/payment에 넣으면 안 되는 것
- 택시 요금 계산
- 티켓 할인 로직
- 투어 가격 책정

✅ 이런 로직은 여기로
- domains/
- services/
- store/
```

---

### 6. `index.ts`는 export 용도로만 사용한다

```typescript
// ✅ OK - pages/home/index.ts
export { default } from './HomePage'

// ❌ 금지 - 로직이나 컴포넌트 정의
export default function SomeComponent() { ... }
```

---

## 폴더별 책임 요약

| 폴더 | 책임 | 금지 |
|------|------|------|
| `pages/` | 라우트 진입점 | 재사용 UI |
| `domains/` | 비즈니스 UI (카드 등) | 페이지, 라우트 |
| `ui/` | 전역 공통 UI | 도메인 종속 UI |
| `infra/` | 외부 의존성 추상화 | 비즈니스 로직 |
| `context/` | 전역 상태 | 비즈니스 로직 |
| `hooks/` | 커스텀 훅 | 컴포넌트 |
| `store/` | Zustand 등 상태 관리 | UI |
| `types/` | 타입 정의 | 로직 |
| `utils/` | 유틸리티 함수 | 상태, UI |

---

## 미래 확장 가이드

- **Dashboard 추가 시**: `widgets/` 폴더 생성 고려
- **API 레이어 추가 시**: `services/` 폴더 생성
- **테스트 추가 시**: 각 폴더에 `__tests__/` 또는 `.test.ts` 파일
