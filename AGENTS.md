<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


## 이미지 생성 및 프롬프트 지침 (Image Generation & Prompting Rules)

- **기본 이미지 스타일 (IT/기술/아키텍처 블로그)**:
  - **L10 라이트 3D 아이소메트릭 (Bright 3D Clean Isometric, White & Soft Pastel Tech Tone)**
  - 화사하고 밝은 오프화이트/그리드 바닥 (`#F8FAFC`), 입체 3D 유리/플라스틱 모듈, 소프트 파스텔 그라데이션 (스카이블루 `#38BDF8`, 퍼플 `#A855F7`, 민트 `#34D399`, 오렌지 `#FB923C`).
- **텍스트 및 언어 규칙**:
  - **주요 기술 용어**: 영문 그대로 표기 (예: JSP, SPA, SSR, SSG, ISR, RSC, HTML, Cache, Server, Client, Hydration, SEO 등).
  - **일반 설명 및 대제목, 노드 설명**: 순수 한글로 표기 (예: 웹 렌더링 전략의 변천사, 렌더링 요청 생명주기, 브라우저 요청, 서버 계산 등).
  - **숫자 중복 제거**: 원형 배지(1, 2, 3)가 있는 경우 텍스트 박스 내부 라벨에서 앞자리 숫자(`1.`, `2.`) 중복을 완전히 제거한다.
