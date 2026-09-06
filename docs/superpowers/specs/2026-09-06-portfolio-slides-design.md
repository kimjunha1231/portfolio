# 김준하 프로젝트 포트폴리오 슬라이드 HTML 설계

## 목적

현대퓨처넷 개발자 지원용 포트폴리오를 발표 자료처럼 탐색할 수 있는 정적 HTML 덱으로 만든다. 각 화면은 한 장의 PPT 슬라이드처럼 독립된 메시지를 전달하고, 프로젝트 소개는 실제 구현·커밋·측정 기록에 근거한 PAAR(Problem, Analyze, Action, Result) 흐름으로 읽히게 한다.

## 사용자와 성공 기준

- 주요 독자: 현대퓨처넷의 웹·모바일·업무시스템 개발 직무 검토자.
- 첫 30초 안에 프론트엔드 중심 역량과 React·Flutter·Spring을 함께 다룬 범위를 이해할 수 있어야 한다.
- StockFit, JobSecretary, Smart Messaging System, TITO, 식권대장을 대표 사례로 보여주고 Dearfam, POPPET, SSYUNG, 여행의 이유를 보조 목록으로 빠뜨리지 않는다.
- 실제 화면과 근거 캡션이 본문보다 먼저 눈에 들어와야 한다.
- 수치에는 측정 조건을 함께 표시하고, 평균·p95·운영 성과로 확인되지 않은 값을 일반화하지 않는다.
- 키보드와 화면 버튼으로 모든 슬라이드를 이동할 수 있어야 하며, 모바일 폭에서도 내용이 잘리지 않아야 한다.

## 시각 방향

- 편집 잡지형 기술 보고서: 비대칭 12열 그리드, 넓은 여백, 얇은 규칙선, 큰 섹션 번호와 모노 유틸리티 라벨을 사용한다.
- 배경은 따뜻한 오프화이트(`#f4f1ea`), 본문은 잉크 블랙(`#171717`), 구조색은 신호 노랑(`#f4c430`) 하나를 주로 사용한다.
- PAAR 단계에는 문제 코랄(`#e45757`), 분석 블루(`#377dff`), 실행 오렌지(`#e08a3e`), 결과 그린(`#2b9b69`)을 작은 레일·번호·캡션에만 사용한다.
- 본문 글꼴은 `Pretendard`, `Noto Sans KR` 순으로, 기술 라벨과 수치는 `IBM Plex Mono`, `ui-monospace` 순으로 지정한다.
- 보라색 그라디언트, 유리 카드, 스톡 이미지, 의미 없는 성공 문구를 사용하지 않는다. 저장소의 실제 PNG·SVG를 프레임 안에 배치한다.
- 모션은 진입 시 마스크된 텍스트와 짧은 이미지 이동만 사용하고 `prefers-reduced-motion`에서는 끈다.

## 슬라이드 흐름

1. 표지 — `HOW + RESULT`, 김준하, 역할·사이트·GitHub.
2. 개발 방식 — PAAR를 문제·원인·행동·결과로 읽는 법.
3. 프로젝트 맵 — 9개 프로젝트의 우선순위와 역할 범위.
4. StockFit 개요 — 현대그린푸드 재고 업무를 주제로 한 팀 프로젝트와 담당 범위.
5. StockFit / Problem — 다중 필터·새로고침·느린 목록의 사용자 문제.
6. StockFit / Analyze — URL, TanStack Query, API·SQL 후보 집계로 원인을 계층별로 확인.
7. StockFit / Action — Zustand persist 프리셋, 요청 취소, 동기화 어댑터·해시·keyset·재시도.
8. StockFit / Result — 17.99초→726ms, 30초 취소→459ms 완료를 동일 조건 캡처 관찰값으로 표기.
9. JobSecretary 개요 — 칸반 성능과 문서 작성 흐름.
10. JobSecretary / PAAR — Profiler, 카드 콘텐츠 분리, memo·Portal, RHF·isDirty·FSD.
11. Smart Messaging — N+1 일괄 조회·Map 변환, Redis ZSET Draft TTL·청크·pipeline.
12. Smart Messaging / Result — 당시 API 관찰값과 업무 발송 흐름.
13. TITO — Flutter·Riverpod·Dio/Retrofit·WebSocket 기반 토론·채팅·타이머·투표.
14. TITO / 경계 — REST 진입 데이터와 실시간 이벤트, 팀 범위와 본인 범위.
15. 식권대장 — 직접 느낀 점심 탐색 문제, 84개 식당, 검색·지도·룰렛·공동 선택.
16. 제품 결과 — `식권대장 송파` 검색 노출의 확인 날짜와 사용자 맥락.
17. 기술 선택 — React/Next.js, URL/Zustand/TanStack Query, Flutter/Riverpod, Spring/Redis를 선택한 이유.
18. 보조 프로젝트 — Dearfam, POPPET, SSYUNG, 여행의 이유의 실제 범위 요약.
19. 근거 읽는 법 — PR·커밋·파일·관찰 조건 캡션 규칙.
20. 마무리 — 사이트·GitHub·연락 가능한 다음 단계.

## 콘텐츠 원칙

- 프로젝트마다 제목, 기간·팀·담당, 문제 한 문장, 분석 방법, 실제 변경, 결과와 한계를 고정한다.
- “내가 개발했다” 대신 담당 파일·흐름·기술 선택을 주어로 쓴다.
- StockFit의 `저장한 필터 프리셋`은 상품 즐겨찾기로 부풀리지 않는다.
- 식권대장은 사용자 수·만족도를 임의로 만들지 않고, 본인 사용·동료 사용·검색 확인으로 표현한다.
- TITO는 모바일 프론트엔드 범위를 중심으로 쓰며 팀 백엔드·인증 전체의 완성도를 본인 성과로 확장하지 않는다.
- 모든 대표 이미지는 `public/images`의 기존 자료를 사용하고, 이미지 하단에 프로젝트·자료 종류·조건을 짧게 표시한다.

## 구현 경계

- 새 파일: `public/portfolio-slides.html` 하나에 마크업·스타일·동작을 포함한다.
- 기존 Next.js 라우트와 콘텐츠는 변경하지 않는다.
- 슬라이드 데이터는 HTML 내부의 배열로 두고, `data-slide`와 해시(`#slide-01`)를 함께 사용한다.
- `goTo(index)`, `renderNav()`, `updateProgress()` 세 함수로 이동 상태를 한 곳에서 관리한다.
- `keydown`의 ArrowLeft/ArrowRight, `j`/`k`, Space와 이전/다음 버튼을 지원한다. 입력 요소에 포커스가 있으면 단축키를 가로채지 않는다.
- 모든 이미지에 의미 있는 `alt`, 장식 이미지는 빈 `alt`, 이전·다음 버튼에는 `aria-label`, 현재 슬라이드에는 `aria-current`를 제공한다.
- 작은 화면에서는 고정 16:9 프레임을 강제하지 않고 슬라이드 내부를 세로 흐름으로 바꾼다.

## 검증

- HTML을 직접 브라우저에서 열어 표지·대표 프로젝트·마무리를 확인한다.
- `node --check`로 인라인 스크립트 추출 후 구문을 검사하고, 정적 자산 경로가 실제 파일인지 검사한다.
- Playwright 또는 브라우저에서 1440px, 1024px, 390px 폭으로 텍스트 겹침·가로 스크롤·이미지 누락을 확인한다.
- 키보드 이동과 `prefers-reduced-motion`을 확인한다.
