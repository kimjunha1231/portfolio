# 국내 개발 커뮤니티·기술블로그 글쓰기 조사

조사 기준일: 2026-07-19  
목적: 국내 개발 커뮤니티와 기술블로그의 인기·최신 사례에서 제목, 도입, 본문 구조, 말투, 근거 제시 방식을 추출하고 포트폴리오·기술 블로그 작성 규칙으로 재사용하기

## 1. 조사 범위와 한계

이번 조사는 국내 개발자 커뮤니티, 개인 개발 글 플랫폼, 기업 기술블로그, 메이커 커뮤니티를 대상으로 진행했습니다. 플랫폼의 허브·최신·트렌딩·검색 목록을 확인하고, 목록에서 반복적으로 보이는 주제와 대표 글의 본문 구조를 상세하게 대조했습니다.

### 조사 범위

- 플랫폼 허브·목록: 16개 채널
- 상세하게 구조를 확인한 대표 사례: 30개 안팎
- 출처 장부에 기록한 링크: 50개 안팎
- 주요 주제: React·프론트엔드 성능, AI·MCP·에이전트, 마이그레이션, 운영 자동화, 제품 회고, 개발자 커리어

플랫폼마다 인기 지표가 다르고 일부 목록은 동적으로 바뀌거나 로그인·검색 결과에 의존하므로, 모든 글을 전수 조사했다고 표현하지 않습니다. “인기”는 플랫폼에 따라 조회·추천·댓글·포인트·트렌딩 노출·목록 배치 중 실제 확인 가능한 지표로 기록해야 하며, 서로 다른 지표를 하나의 순위로 합치지 않습니다.

### 조사 방법

1. 플랫폼 홈과 최신·트렌딩·태그·검색 목록을 확인했습니다.
2. 각 플랫폼에서 글의 목적이 다른 대표 사례를 골랐습니다.
3. 제목, 첫 문단, H2 흐름, 문단 길이, 코드·이미지, 근거, 결론, 말투를 기록했습니다.
4. 기술 사실은 커뮤니티 글이 아니라 공식 문서·저장소·실제 프로젝트 코드와 대조하는 기준을 세웠습니다.
5. 반복적으로 등장하는 패턴만 현재 흐름으로 분류하고, 단일 글의 특징은 해당 글의 사례로만 남겼습니다.

## 2. 핵심 결론

### 플랫폼은 역할이 다릅니다

- **OKKY·GeekNews**는 무엇이 지금 관심을 받는지와 제목·요약의 반응 구조를 보기 좋습니다.
- **Velog·Tistory·Medium**은 개인 개발자의 시행착오, 코드, 튜토리얼의 호흡을 보기 좋습니다.
- **Naver D2·Toss·우아한형제들·LINE/LY·Kakao**는 문제 정의, 팀 맥락, 근거, 결과를 갖춘 장문 기술 글을 참고하기 좋습니다.
- **Disquiet·DEVOCEAN·PyTorchKR**는 제품 문제, AI 생태계, 원문 링크, 커뮤니티 대화의 방식을 참고하기 좋습니다.
- **Brunch**는 기술을 사람·업무·커리어의 장면으로 번역하는 도입을 참고하기 좋습니다.

### 현재 반복해서 나타난 주제

1. 단순 LLM 호출보다 **MCP·도구 연결·에이전트·권한·상태·검증**을 다룹니다.
2. AI가 코드를 생성한 뒤에는 **이해·리뷰·테스트·감독**이 새로운 병목으로 제시됩니다.
3. 데모보다 **배포·관찰·재시도·비용·데이터 품질·온보딩**까지 포함한 자동화 사례가 설득력을 얻습니다.
4. 프론트엔드에서는 React 렌더링, 캐싱, 가상화, 상호작용 지연처럼 **측정 가능한 사용자 체감 성능**이 계속 다뤄집니다.
5. React 19, 모노레포, 데이터 플랫폼 전환 등에서 **마이그레이션 중 드러나는 숨은 결합도**가 좋은 회고 소재가 됩니다.

### 인기 글에서 공통으로 보인 편집 원칙

- 제목이 기술명만 말하지 않고 문제·결과·질문을 함께 제시합니다.
- 첫 화면에서 “왜 읽어야 하는가”를 알려줍니다.
- 긴 글도 목차나 H2가 질문·단계·원인 순서로 정렬되어 있습니다.
- 실패한 첫 시도와 제약을 숨기지 않습니다.
- 코드보다 문제의 조건과 선택의 이유를 먼저 설명합니다.
- 수치·환경·버전·역할을 공개할수록 신뢰도가 높아집니다.
- 결론은 “무조건 이 방법”보다 “이 조건에서는 이 선택이 적합”으로 끝납니다.

## 3. 플랫폼별 상세 관찰

### 3.1 OKKY

**플랫폼 역할**: Q&A, Tech 뉴스, 프로젝트 모집, 커리어 논의가 섞인 국내 개발자 커뮤니티입니다.

**목록과 최신 흐름**

- AI 활용, AI 에이전트, MCP, 개발자의 업무 변화, 커리어 경험이 빠르게 등장합니다.
- 기술 하나의 정답보다 “실제로 써보니 어땠는가”, “다른 사람은 어떻게 하는가”가 반응을 만듭니다.
- 긴 글도 첫 문단에 고민이나 주장을 먼저 제시합니다.

**제목·도입**

- 질문형: “이 방식이 맞을까요?”
- 논쟁형: “AI를 이렇게 쓰면 생기는 문제”
- 경험형: “직접 적용해 보니…”

**본문 구조**

```text
질문 또는 주장
→ 개인 경험과 상황
→ 구체적인 예시·수치
→ 원인에 대한 판단
→ 다른 사람에게 묻는 질문 또는 조건부 결론
```

**말투**: 대화형이고 개인의 판단을 직접 밝힙니다. 다만 포트폴리오에는 질문과 실제 문제만 차용하고, 지나친 구어체·논쟁체는 줄이는 것이 좋습니다.

**참고 사례**

- [OKKY 소개](https://okky.kr/corp/about)
- [AI 툴 사용 경험](https://okky.kr/articles/1538004)
- [AI 활용 단계](https://okky.kr/articles/1555082)
- [대시보드 시대와 Agentic Analytics](https://okky.kr/articles/1550124)
- [AI 활용 방법](https://okky.kr/articles/1532042)
- [AI Native Engineer](https://okky.kr/articles/1547204)
- [AI 기반 멘토링 프로젝트](https://okky.kr/articles/1533714)
- [실제 시스템에서 AI 사용하기](https://okky.kr/articles/1538531)
- [AI로 UI를 생성한 프로젝트](https://okky.kr/articles/1523384)
- [현재 Gemini 사용 모델 사례](https://okky.kr/articles/1560798)

**포트폴리오에 적용**: “어떤 불편을 발견했는가”를 짧게 시작하되, 본문은 공식 문서와 측정 결과 중심으로 정제합니다.

### 3.2 GeekNews

**플랫폼 역할**: 개발·기술·스타트업 소식을 빠르게 발견하고 포인트와 댓글로 평가하는 큐레이션 채널입니다.

**목록 구조**

- 제목, 한두 문장 요약, 포인트·댓글 정보가 빠르게 스캔됩니다.
- 최신 글에서는 AI 에이전트, 코드 생성 이후의 이해·검증, MCP, 보안·제품 이슈가 반복됩니다.

**본문 구조**

```text
핵심 주장이 드러나는 제목
→ 한 문장 요약
→ 이 글이 중요한 이유
→ 원문·추가 자료·토론
```

**말투**: 감정과 수식어보다 주장·맥락을 압축합니다. GN+ 유형은 원문을 번역하는 데서 끝나지 않고 요약자의 해석을 추가합니다.

**참고 사례**

- [GeekNews 홈](https://news.hada.io/)
- [최신 목록](https://news.hada.io/new)
- [GN+](https://news.hada.io/plus)
- [이해가 새로운 병목이다](https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck.html): AI가 코드를 쓰는 이후 사람의 이해를 설명·퀴즈·마이크로월드로 전개합니다.
- [Human-in-the-loop는 지쳤다](https://pydantic.dev/articles/the-human-in-the-loop-is-tired): 강한 제목, 개인적 감정, 산업적 배경, 조건부 제안의 흐름입니다.
- [문제에 대응하는 세 가지 방식](https://improvesomething.today/responses-to-problems/): 짧은 정의 뒤 번호 목록으로 유형을 나눕니다.

**포트폴리오에 적용**: 긴 구현 설명의 맨 앞에 “이번 글의 결론”과 “이 글이 유용한 사람”을 둡니다.

### 3.3 Velog

**플랫폼 역할**: TIL, 튜토리얼, 프로젝트 회고, 개념 설명, 시리즈·태그 기반 개발 기록 플랫폼입니다.

**최신·태그 흐름**

- React·Next.js·웹 성능과 함께 MCP, Claude Code, AI 에이전트, RAG, LLM 도구 연결 글이 늘어나는 흐름을 확인할 수 있습니다.
- 태그와 시리즈가 탐색의 중심이어서 하나의 주제를 여러 글로 나누는 방식이 일반적입니다.

**본문 구조**

```text
오늘 다룰 문제
→ 배경 지식
→ 구현·실험
→ 오류·실패
→ 수정·결과
→ 회고·다음 글
```

**말투**: “처음에는”, “직접 해보니”, “문제는 여기서”처럼 경험을 드러냅니다. 실패를 기록해도 되지만, 추측은 공식 동작과 구분해야 합니다.

**참고 사례**

- [Velog 주간 트렌딩](https://velog.io/trending/week)
- [Velog 큐레이션](https://velog.io/curated)
- [React 태그](https://prod.velog.io/tags/React)
- [최신 포스트](https://velog.io/recent?_rsc=10tdb)
- [MCP·Supabase MCP 사례](https://velog.io/%40s_soo100)
- [웹 성능·React 관련 최신 기록](https://velog.io/%40leave_a_comment)
- [MCP Host·Client·Server와 Agentic RAG](https://velog.io/%40s_s)
- [React 프로젝트 리팩터링 사례](https://velog.io/%40yangjaehyuk/%ED%8C%A8%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%8D%BC%EC%8A%A4X%EC%95%BC%EB%86%80%EC%9E%90-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C-%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%841%EC%B0%A8-%EA%B3%BC%EC%A0%9C-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)

**포트폴리오에 적용**: 시행착오를 남기되, 프로젝트 상세 페이지에서는 핵심 결정 1~3개만 남기고 긴 원리는 블로그로 분리합니다.

### 3.4 Tistory

**플랫폼 역할**: 검색 유입을 목표로 하는 개인 기술 블로그, 오류 해결, 실습, 개념 정리의 저장소입니다.

**본문 구조**

```text
문제·목표
→ 환경과 패키지
→ 기본 구조
→ 단계별 코드
→ 실행 결과
→ 오류·주의점
→ 참고 링크
```

**말투**: `~합니다`와 `~했습니다`가 혼용되지만 한 글 안에서는 하나를 유지하는 편이 읽기 좋습니다.

**차용할 점**: 기술명·오류명·구현 대상이 제목에 직접 들어가고, 목차와 단계가 검색 의도에 맞습니다.

**피할 점**: 오래된 패키지 설치법을 최신 문법처럼 제시하기, 키워드 반복, 결과 없이 긴 서론을 쓰기입니다.

**참고 사례**

- [dnd-kit으로 칸반 보드 구현하기](https://bori-note.tistory.com/102)
- [React 리렌더링 최적화](https://kchanguk.tistory.com/231)
- [useMemo·useCallback·React.memo 비교](https://dongurami0502.tistory.com/32)
- [React와 메모이제이션](https://mingos-habitat.tistory.com/70)
- [React Router·렌더링 비교](https://pangil-log.tistory.com/55)

### 3.5 Medium

**플랫폼 역할**: 개인 경험과 기술 설명을 결합한 장문 글입니다.

**본문 구조**

```text
강한 문제 장면
→ 오류·현상 설명
→ 첫 번째 시도
→ 왜 실패했는가
→ 실제 해결
→ 배운 점과 재사용 조건
```

**참고 사례**

- [React DnD 이벤트의 무한 업데이트 해결](https://medium.com/%40fikrim69/how-i-fixed-maximum-update-depth-exceeded-in-react-by-using-throttling-0bab5c87e682): `onDragMove`의 빈번한 호출, 첫 시도인 `useCallback`, 실행 빈도 제어를 위한 throttling으로 이어집니다.
- [React dnd-kit 사이드바 구현](https://medium.com/%40math-krish/building-a-sidebar-with-react-dnd-kit-fac8171466a1): 요구사항, 패키지 선택, ID, Draggable·Droppable, Provider, 예외와 마무리 순서입니다.
- [react-sortable-hoc에서 dnd-kit으로 전환](https://alena-khineika.medium.com/from-react-sortable-hoc-to-dnd-kit-c17122dc67ba): 마이그레이션 배경과 API 매핑을 중심으로 씁니다.

**포트폴리오에 적용**: 실패한 첫 시도와 선택의 이유를 한두 문단으로 가져오되, API 설명은 별도의 블로그 글로 연결합니다.

### 3.6 Brunch

**플랫폼 역할**: 기술 구현보다 일·커리어·조직·사람의 경험을 서사로 전달하는 채널입니다.

**패턴**

- 장면 또는 질문으로 시작합니다.
- 기술 용어보다 사람이 겪는 불편과 감정을 먼저 보여줍니다.
- 문단 호흡과 비유가 길고, 마지막에 관점의 변화를 남깁니다.

**차용할 점**: “사용자가 어떤 순간에 불편을 느꼈는가”를 기술 설명의 입구로 삼는 방식입니다.

**참고**: [Brunch 홈](https://brunch.co.kr/)

### 3.7 Disquiet

**플랫폼 역할**: 메이커·사이드 프로젝트·제품 소개와 사용자 피드백을 연결합니다.

**본문 구조**

```text
왜 만들었는가
→ 실제 사용자의 상황
→ 지금 만든 기능
→ 기술·운영 제약
→ 피드백 요청
```

**최신 관찰**: AI 자동화, 에이전트, MCP, 개발자 생산성, 데이터 품질, 실제 사용자 피드백을 제품 소개와 연결합니다.

**참고 사례**

- [Disquiet 아티클 목록](https://disquiet.io/articles)
- G2BMarket 사례: 원천 데이터의 회사명 불일치, 오래된 데이터, “참고용” 고지의 필요성을 문제로 드러냅니다.
- 텔레그램 웹 릴레이 사례: 제한된 환경, 서버에 세션을 두는 위험, 직접 만든 구조, 저장소 공개의 흐름입니다.
- 책모락 사례: 피드 탐색 문제, 제품 원칙, 피드백을 반영하는 흐름입니다.

**포트폴리오에 적용**: 기능 나열 대신 “왜 만들었고 현재 어디까지 검증했는가”를 보여줍니다.

### 3.8 PyTorchKR·전문 Discourse 커뮤니티

**플랫폼 역할**: AI·ML·PyTorch 자료를 원문과 토론으로 연결합니다.

**패턴**

- 논문·도구·모델의 핵심을 짧게 요약합니다.
- 원문, 재현 코드, 모델·데이터 버전, 실험 조건을 분리합니다.
- 글의 서사보다 용어 정확성과 재현 가능성이 중요합니다.

**참고 사례**

- [PyTorchKR 홈](https://discuss.pytorch.kr/)
- [누구나 만들 수 있을 때 중요한 것](https://discuss.pytorch.kr/t/gn/10520)

### 3.9 DEVOCEAN

**플랫폼 역할**: 기술 트렌드, 실무 경험, 개발자 커뮤니티 소식을 넓게 다룹니다.

**패턴**

- 글의 목적과 대상 독자를 먼저 보여줍니다.
- 기술 설명과 생태계·커리어 맥락을 함께 둡니다.
- AI·에이전트·MCP 관련 탐색의 입구로 사용합니다.

**참고**

- [DEVOCEAN 소개](https://devocean.sk.com/about/introduce.do)
- [DEVOCEAN](https://devocean.sk.com/)

### 3.10 Naver D2

**플랫폼 역할**: 기업 서비스에 실제로 적용한 구조·성능·운영 경험을 문서형으로 보여줍니다.

**본문 구조**

```text
배경 지식
→ 문제와 제약
→ 원인 분석
→ 구현·적용
→ 성능·결과
→ 아쉬운 점·다음 과제
```

**말투**: 정중하고 설명형이지만, 기술 용어의 조건과 실험 환경을 숨기지 않습니다.

**참고 사례**

- [React와 Redux 적용 가이드](https://d2.naver.com/helloworld/1848131)
- [대용량 표에 윈도잉 적용](https://d2.naver.com/helloworld/1450243): 필요한 데이터만 렌더링하고 overscan으로 깜박임을 보완합니다.
- [React 모바일 웹 애플리케이션 적용](https://d2.naver.com/helloworld/4966453)
- [React 이벤트 시스템](https://d2.naver.com/helloworld/9297403)
- [React Fiber 아키텍처](https://d2.naver.com/helloworld/2690975)
- [라이브 플레이어 UI 개선](https://d2.naver.com/helloworld/0203261)
- [Yappi 성능 개선](https://d2.naver.com/helloworld/4394645)

**포트폴리오에 적용**: JobSecretary의 React Profiler 측정, 271회→98회 커밋, 268회→0회 비활성 카드 렌더링 같은 조건·수치를 명확히 기록하는 방식과 잘 맞습니다.

### 3.11 Toss Tech

**플랫폼 역할**: 제품·조직·개발 문화를 실제 사례와 서사로 설명합니다.

**패턴**

- 독자가 겪어 봤을 법한 장면이나 질문으로 시작합니다.
- 기술 문제와 조직·사용자 영향을 함께 설명합니다.
- 긴 글에서도 독자가 따라갈 순서를 초반에 안내합니다.

**참고 사례**

- [Toss Tech 홈](https://toss.tech/)
- [우리 팀의 문서화는 왜 실패할까](https://toss.tech/article/technical-writing-3): 공감 가능한 상황 → 사례 비교 → 원인 → 실천 방법의 흐름입니다.

### 3.12 우아한형제들 기술블로그

**플랫폼 역할**: 운영, 아키텍처, 프론트엔드, 인프라, 조직 경험을 깊게 공유합니다.

**패턴**

- 제목에서 문제·숨은 원인·해결 기술을 함께 암시합니다.
- 실제 제약, 실패한 시도, 운영상의 함정을 기록합니다.
- 결과뿐 아니라 부수 효과와 남은 과제도 적습니다.

**참고 사례**

- [pnpm 모노레포에서 React 19 마이그레이션](https://techblog.woowahan.com/26128/): 98개의 타입 오류, 여러 `node_modules` 레이어, hoisting 설정과 대안을 설명합니다.
- [번역 누락을 ESLint 플러그인으로 해결](https://techblog.woowahan.com/26388/): 사람이 놓친 문제를 결정적 정적 검사로 전환합니다.
- [하네스 엔지니어링으로 팀 맞춤형 AI 환경 구축](https://techblog.woowahan.com/26177/): 규칙·스킬·globs·컨텍스트 윈도우를 팀 환경과 연결합니다.
- [AI UX Writer와 컨텍스트 엔지니어링](https://techblog.woowahan.com/23836/)
- [LLMOps·GenAI Labs·Context Engineering](https://techblog.woowahan.com/22839/)

**포트폴리오에 적용**: 모든 프로젝트를 문제·원인·해결·성과로 강제하기보다, 실제 판단이 있었던 개발 기록에만 이 구조를 적용합니다.

### 3.13 LINE Engineering·LY Tech Blog

**플랫폼 역할**: 대규모 서비스의 마이그레이션, 운영, 아키텍처, 개발 프로세스를 공유합니다.

**패턴**

- 저자 역할과 프로젝트 배경을 먼저 밝힙니다.
- 기존 방식의 한계를 설명한 뒤 해결책과 최적화로 이동합니다.
- 시스템 구성·데이터 구조·실행 단계가 시각 자료와 함께 제시됩니다.

**참고 사례**

- [Ceph 하이퍼스케일 프로젝트](https://engineering.linecorp.com/ko/blog/about-hyperscale-ceph-project/)
- [테스트 자동화 결과 시각화](https://engineering.linecorp.com/ko/blog/visualizing-test-automation-with-elk-grafana/): 자동화 리포트가 읽히지 않는 문제 → 시각화 → 운영 개선입니다.
- [HiveQL에서 Spark SQL로 이전](https://engineering.linecorp.com/ko/blog/from-hiveql-to-sparksql-troubleshooting/)
- [LandPress 콘텐츠로 CMS 이전](https://engineering.linecorp.com/ko/blog/from-traditional-cms-to-landpress-content/)
- [LINE Engineering 홈](https://engineering.linecorp.com/ko/blog)
- [LY Frontend 2024](https://techblog.lycorp.co.jp/en/20250321a)
- [SRE 반복 작업 자동화](https://techblog.lycorp.co.jp/ko/reduce-repetitive-tasks-with-sre-bot)
- [LY Observability 플랫폼 발전](https://techblog.lycorp.co.jp/ko/the-evolution-of-the-ly-observability-platform)
- [React Native에서 Flutter로 전환](https://techblog.lycorp.co.jp/ko/demaecan-3rd-recode-react-native-to-flutter)
- [Flutter Future 2024 회고](https://techblog.lycorp.co.jp/ko/future-flutter-2024-recap)

### 3.14 Kakao Tech

**플랫폼 역할**: AI·클라우드·오픈소스·프론트엔드·백엔드와 개발 문화를 서비스 맥락에 연결합니다.

**패턴**

- 제품·조직·사용자 문제를 먼저 설명합니다.
- 도입 기술의 사용 흐름과 실제 제약을 함께 보여줍니다.
- 구현 자체보다 제품에 어떤 변화가 생겼는지 강조합니다.

**참고**

- [Kakao Tech](https://tech.kakao.com/)
- [프론트엔드 검색 목록](https://tech.kakao.com/?s=frontend)

### 3.15 무신사 Velopers

**플랫폼 역할**: 기업 기술블로그를 주제와 조회 맥락으로 탐색하게 합니다.

**패턴**

- 제목·요약만으로 문제와 결과를 파악할 수 있습니다.
- 디자인 시스템, AI·데이터, 성능, 아키텍처를 제품 문제와 연결합니다.

**참고**

- [Velopers 블로그 목록](https://velopers.kr/blog/20)
- [MDS 지속 가능한 디자인 시스템](https://www.velopers.kr/post/4836)

## 4. 플랫폼별 차용 전략

| 작성 목적 | 1차 참고 | 2차 참고 | 가져올 요소 |
|---|---|---|---|
| 기술 회고 | Naver D2·우아한형제들·LINE | Velog·Medium | 문제 측정, 원인, 실패, 결과 |
| 튜토리얼 | Tistory·Velog | Medium | 검색형 제목, 단계, 최소 코드 |
| 개념 설명 | Naver D2 | GeekNews·Velog | 정의, 도식, 조건·한계 |
| AI·개발 트렌드 | GeekNews·OKKY | DEVOCEAN·LY | 한 문장 요약, 여러 사례, 불확실성 |
| 제품·사이드 프로젝트 | Disquiet·OKKY | Brunch·Velog | 실제 사용자 문제, 현재 수준, 제약 |
| 포트폴리오 | Toss·우아한형제들 | Naver D2·Medium | 짧은 맥락, 역할, 핵심 결정, 근거 |
| 마이그레이션 | LINE·우아한형제들 | Naver D2·Medium | 영향 범위, 실패, 검증, 롤백 |

## 5. 말투 분석과 선택 규칙

### `~합니다`

튜토리얼·개념·트렌드에 적합합니다. 독자에게 설명하는 문장으로 자연스럽고, 용어 정의와 단계 안내에 좋습니다.

### `~했습니다`

개인 프로젝트·회고·포트폴리오에 적합합니다. 실제로 무엇을 했는지와 측정 결과를 책임 있게 설명할 수 있습니다.

### `~다`

참조 문서나 기술 노트에 적합합니다. 문장이 짧고 단정적으로 읽히지만, 개인 경험이나 불확실성을 표현할 때는 조건을 덧붙여야 합니다.

### `했음`·`적용`·`확인`

카드 요약, 표의 상태, 작업 로그에는 사용할 수 있지만 본문 기본 말투로 쓰지 않는 것을 권장합니다. 포트폴리오 전체가 메모처럼 보이고 인과 관계가 생략되기 쉽습니다.

## 6. JobSecretary 블로그에 적용할 추천 구성

### 글 전략

`Render Props`, `dnd-kit`, `React Portal`을 각각 독립적인 일반론으로 길게 나누기보다, JobSecretary의 실제 렌더링 문제를 중심으로 하나의 기술 회고에 묶는 것이 좋습니다.

이유는 다음과 같습니다.

- 프로젝트의 측정값과 실제 코드가 세 개념을 연결하는 공통 맥락을 제공합니다.
- 포트폴리오 방문자는 라이브러리 사전보다 “문제를 어떻게 판단하고 구조를 바꿨는가”를 먼저 봅니다.
- 블로그에서는 같은 글의 깊은 설명을 유지하고, 이후 `Render Props`, `React Portal`, `dnd-kit` 개념 글을 별도 시리즈로 확장할 수 있습니다.

### 추천 제목

1. `dnd-kit 칸반 보드에서 카드 전체가 리렌더링된 이유와 렌더링 경계를 분리한 과정`
2. `271회 커밋이 발생한 React 칸반 보드의 렌더링 문제를 분리한 방법`
3. `useSortable 구독과 React.memo의 한계: JobSecretary 칸반 보드 개선 기록`

제목의 수치는 실제 Profiler 측정 조건과 함께 제시할 때만 사용합니다.

### 추천 본문 흐름

```text
결론 요약
→ 문제 상황: 카드 하나를 움직일 때 271회 커밋, 여러 카드가 함께 렌더링
→ 원인: 드래그 좌표·정렬 상태의 변화와 카드 콘텐츠 구독 범위가 결합
→ 기존 시도: React.memo만으로는 useSortable·SortableContext 구독 영향을 제거하기 어려움
→ 해결 1: 드래그 연결 컴포넌트와 카드 콘텐츠 컴포넌트 분리
→ 해결 2: @hello-pangea/dnd의 Draggable Render Props로 provided·snapshot 전달
→ 해결 3: 드래그 중인 카드를 React Portal로 별도 DOM 계층에 표시
→ 결과: 271회→98회, 비활성 컴포넌트 268회→0회
→ 조건·한계·다음 단계
```

### 개념을 사실에 맞게 쓰는 방법

- **Render Props**: `@hello-pangea/dnd`가 제공하는 `Draggable` API의 함수 자식 패턴입니다. 라이브러리가 실행한 함수에 `provided`, `snapshot`을 전달하고, 개발자가 이를 카드 컴포넌트에 넘깁니다. Render Props 자체가 성능을 자동 개선하는 기능이라고 쓰지 않습니다.
- **React Portal**: React가 제공하는 `createPortal` 방식으로 드래그 중인 UI를 `document.body` 같은 별도 DOM 위치에 렌더링합니다. 레이아웃·overflow·z-index 간섭을 줄이는 것이 주 목적이며, 그 자체를 렌더링 성능 개선으로 주장하지 않습니다.
- **dnd-kit의 원인 설명**: `useSortable`이 `SortableContext`의 상태를 구독하는 구조에서는 드래그 상태 변경의 영향을 Hook 사용 컴포넌트가 받을 수 있습니다. React.memo만으로 이를 항상 차단한다고 쓰지 말고, 실제 프로젝트의 Profiler와 코드 경로를 근거로 “이번 구조에서 분리했다”고 한정합니다.

### 포트폴리오용 짧은 버전

```md
드래그 중 좌표와 정렬 상태가 카드 콘텐츠까지 전달되면서 카드 하나를 이동할 때 여러 카드가 함께 렌더링되는 현상을 확인했습니다.

드래그 연결을 담당하는 컴포넌트와 카드 정보를 표시하는 컴포넌트를 분리하고, `@hello-pangea/dnd`의 Render Props로 `provided`와 `snapshot`을 필요한 경계에서 전달했습니다. 드래그 중인 카드는 React Portal로 별도 DOM 계층에 표시하고, 카드 콘텐츠에는 `memo`를 적용했습니다.

동일 시나리오에서 전체 커밋은 271회에서 98회로, 비활성 컴포넌트 렌더링은 268회에서 0회로 줄었습니다.
```

### 블로그용 확장 항목

- `useSortable`·`SortableContext`의 구독 흐름
- React.memo가 Props 비교에는 유효하지만 Context 구독을 무조건 차단하지 않는 이유
- `Draggable` Render Props에서 `provided`와 `snapshot`이 전달되는 방식
- `KanbanCard`와 `KanbanCardContent`의 책임 분리
- `createPortal`이 DOM 트리를 바꾸지만 React 이벤트 흐름은 유지하는 방식
- 변경 전후 Profiler 시나리오와 측정 조건
- 라이브러리 교체의 비용과 다른 상황에서의 선택 기준

## 7. SEO·AEO 적용안

### 메타 초안

| 항목 | 제안 |
|---|---|
| Title | dnd-kit 칸반 보드 렌더링 최적화: useSortable 구독과 React.memo의 한계 |
| Slug | `/blog/jobsecretary-kanban-rendering-optimization` |
| Description | JobSecretary 칸반 보드에서 드래그 중 카드 전체가 렌더링된 원인을 분석하고, Render Props·React Portal·컴포넌트 분리로 렌더링 범위를 줄인 과정을 정리합니다. |
| OG image | 변경 전후 Profiler 또는 실제 UI 비교 이미지 |
| Author | 김준하 + 프론트엔드 개발자 소개 페이지 링크 |
| Date | 실제 발행일·수정일을 구분 |

### AEO 질문 예시

```md
## dnd-kit에서 드래그 중 카드가 다시 렌더링된 이유는 무엇인가요?

이번 프로젝트에서는 `useSortable`이 정렬 컨텍스트의 드래그 상태를 구독하고, 그 변화가 카드 컴포넌트의 렌더링 경로에 포함되어 있었기 때문입니다.

## Render Props가 성능을 자동으로 개선하나요?

아닙니다. Render Props는 라이브러리가 계산한 드래그 연결 정보와 상태를 함수 자식에게 전달하는 API 패턴입니다. 이번 개선에서는 이 값을 드래그 경계에서만 받고 카드 콘텐츠의 구독 범위를 분리하는 데 사용했습니다.

## React Portal은 왜 사용했나요?

드래그 중인 카드를 기존 스크롤 컨테이너와 레이아웃의 영향을 덜 받는 DOM 위치에서 표시하기 위해 사용했습니다. 렌더링 성능보다 위치·레이아웃 안정성이 주 목적입니다.
```

## 8. 이미지 계획

1. **구조도**: `SortableContext → Draggable → KanbanCard → KanbanCardContent`를 보여주는 Mermaid 또는 SVG. 드래그 상태를 구독하는 경계와 일반 Props만 받는 경계를 색으로 구분합니다.
2. **전후 비교**: 동일한 Profiler 시나리오의 변경 전·후 화면. 캡션에 271회→98회, 268회→0회 수치와 측정 조건을 함께 기록합니다.
3. **Portal 설명**: 목록 DOM과 `document.body`로 이동한 드래그 카드를 나란히 보여주는 단순 도식. 중요한 텍스트는 생성 이미지가 아니라 본문·캡션으로 제공합니다.

실제 UI 캡처를 사용할 때는 개인정보·토큰을 제거합니다. 추상 구조도는 Mermaid를 우선하고, AI 이미지는 개념 비유가 실제 동작 화면으로 오해되지 않도록 분명히 구분합니다.

## 9. 출처 장부 초안

| 주장 | 우선 출처 |
|---|---|
| `React.memo`의 Props 비교 동작 | [React memo 공식 문서](https://react.dev/reference/react/memo) |
| Portal의 DOM 위치와 이벤트 특성 | [React createPortal 공식 문서](https://react.dev/reference/react-dom/createPortal) |
| `useSortable`·정렬 컨텍스트 구조 | [dnd-kit Sortable 공식 문서](https://dndkit.com/legacy/presets/sortable/overview/) |
| 드래그 API와 상태 구조 | [dnd-kit Draggable 문서](https://dndkit.com/legacy/api-documentation/draggable) |
| Context·렌더링 관련 논의 | [dnd-kit GitHub Discussion #1156](https://github.com/clauderic/dnd-kit/discussions/1156) |
| 실제 라이브러리 교체·적용 코드 | [JobSecretary 저장소](https://github.com/kimjunha1231/JobSecretary) |
| 국내 글의 제목·구조·말투 관찰 | 위 플랫폼별 사례 URL |

실제 프로젝트의 수치와 컴포넌트 책임은 저장소의 현재 브랜치와 Profiler 측정 화면을 최종 대조한 뒤 확정합니다.

## 10. 재사용 가능한 글 작성 체크리스트

- [ ] 글 유형을 하나로 결정했는가?
- [ ] 제목에 대상·문제·결과가 들어가는가?
- [ ] 첫 3문장에 결론 또는 독자가 얻을 답이 있는가?
- [ ] 문제·원인·해결·결과가 중복 없이 나뉘는가?
- [ ] 라이브러리의 책임과 내 코드의 책임을 구분했는가?
- [ ] 수치·버전·환경·역할을 근거와 함께 기록했는가?
- [ ] `~합니다`, `~했습니다`, `~다` 중 하나를 일관되게 사용했는가?
- [ ] `했음` 같은 메모체가 본문에 과도하게 남아 있지 않은가?
- [ ] 코드 예시는 핵심 경계만 보여주는가?
- [ ] 이미지는 이해를 돕는 목적과 alt·캡션이 있는가?
- [ ] 질문형 H2 아래에 직접 답변이 있는가?
- [ ] FAQ가 실제 본문에 근거하는가?
- [ ] 출처와 접근일을 기록했는가?
- [ ] 최신성·인기도를 과장하지 않았는가?
