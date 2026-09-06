# 프로젝트 포트폴리오 슬라이드 HTML Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 실제 프로젝트 근거와 PAAR 흐름을 발표용 슬라이드처럼 탐색할 수 있는 단일 정적 HTML 포트폴리오를 만든다.

**Architecture:** `public/portfolio-slides.html` 한 파일 안에 슬라이드 데이터, 시맨틱 마크업, CSS 디자인 시스템, 키보드·해시 네비게이션을 둔다. 기존 Next.js 앱은 변경하지 않고 `public/images`의 검증된 프로젝트 이미지를 상대 경로로 사용한다.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript, 기존 PNG/SVG 이미지 자산.

## Global Constraints

- 모든 프로젝트 문장은 `docs/portfolio/hyundai-futurenet/detailed-draft.md`의 실제 근거 범위를 지킨다.
- StockFit의 `17.99초→726ms`, `30초 취소→459ms 완료`는 동일 조건의 당시 캡처 관찰값으로 표시한다.
- 식권대장 SEO는 검색어와 확인 날짜를 함께 표시하며 영구 순위로 표현하지 않는다.
- `public/portfolio-slides.html` 외의 기존 앱 파일은 수정하지 않는다.
- 1440px·1024px·390px 화면과 키보드 이동을 검증한다.

### Task 1: Slide deck markup and evidence content

**Files:**
- Create: `public/portfolio-slides.html`
- Read: `docs/portfolio/hyundai-futurenet/detailed-draft.md`
- Read: `docs/portfolio/hyundai-futurenet/presentation-v2-direction.md`

**Interfaces:**
- Produces one static document with `.deck`, `.slide[data-slide]`, `.slide-nav`, `#progress-bar`, and `#slide-counter`.
- Each slide exposes a stable `id="slide-XX"` for hash navigation.

- [ ] **Step 1: Add the 20-slide semantic outline**
  - Use `main` for the deck, `section` for each slide, `header` for section labels, `figure/figcaption` for screenshots, and lists for PAAR evidence.
  - Include all nine project names and the exact project facts from the design spec.

- [ ] **Step 2: Add image references and alt text**
  - Use `images/projects/stockfit/inventory-filter-after.png`, `images/projects/stockfit/inventory-sort-after.png`, `images/projects/jobsecretary.png`, `images/projects/smart-messaging/member-detail-after.png`, `images/projects/tito.png`, `images/projects/sikdae-kosa.png`, `images/projects/dearfam.png`, `images/projects/poppet.png`, `images/projects/ssyung.png`, and `images/projects/travel-reason.png`.
  - Add a caption that states whether an image is a UI capture, before/after capture, or architecture evidence.

- [ ] **Step 3: Verify content references**
  - Run `rg -n "TBD|TODO|OOO|Lorem|가짜|500개|1위" public/portfolio-slides.html`.
  - Expected: no placeholder or unsupported achievement text.

### Task 2: Editorial technical visual system

**Files:**
- Modify: `public/portfolio-slides.html` (inline `<style>`)

**Interfaces:**
- CSS custom properties expose `--paper`, `--ink`, `--signal`, and PAAR accent variables.
- `.slide--dark`, `.slide--split`, `.slide--evidence`, `.paar-grid`, `.metric`, `.project-index` are reusable layout classes.

- [ ] **Step 1: Define typography, color, grid, and spacing variables**
  - Use warm paper, ink black, signal yellow, restrained PAAR accents, a 12-column grid, and fixed spacing tokens.

- [ ] **Step 2: Implement slide compositions**
  - Use an asymmetric split layout for project overview, a four-row PAAR layout for detailed slides, and a dark closing slide.
  - Keep screenshot frames large and use thin rules, mono labels, and compact captions instead of generic cards.

- [ ] **Step 3: Add responsive and reduced-motion rules**
  - At `max-width: 760px`, switch to one column, allow slide height to grow, and keep the navigation reachable.
  - Under `prefers-reduced-motion: reduce`, remove transforms and transitions.

### Task 3: Navigation, accessibility, and validation hooks

**Files:**
- Modify: `public/portfolio-slides.html` (inline `<script>`)

**Interfaces:**
- `goTo(index: number): void` updates the active slide, URL hash, counter, progress, and navigation state.
- `renderNav(): void` sets `aria-current` on the active navigation item.
- `updateProgress(): void` writes a percentage to `#progress-bar`.

- [ ] **Step 1: Implement hash and button navigation**
  - Start from `location.hash`, clamp invalid values, and update the hash with `history.replaceState` so navigation does not reload.

- [ ] **Step 2: Implement keyboard controls**
  - ArrowRight/Space/j moves forward; ArrowLeft/k moves backward; ignore shortcuts while typing in `input`, `textarea`, or `[contenteditable]` elements.

- [ ] **Step 3: Add focus and screen-reader states**
  - Add visible focus styles, `aria-label` values, `aria-live="polite"` to the counter, and `aria-current="true"` to the active nav item.

- [ ] **Step 4: Run validation**
  - Run `node --check` on the extracted inline script and a static asset existence check for every `src` path.
  - Run the existing `npm run lint` and `npm run build` only if the existing app is unaffected; report unrelated pre-existing failures separately.
