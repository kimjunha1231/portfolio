import { getAllPosts, type MDXPost } from "@/lib/mdx";

export type HandbookGroupKey =
  | "getting-started"
  | "learn"
  | "deep-dive"
  | "labs"
  | "knowledge-map";

export type HandbookTopicProgress = "not-started" | "learning" | "completed";

export interface HandbookTopic {
  label: string;
  children?: readonly HandbookTopic[];
  progress?: HandbookTopicProgress;
}

export interface HandbookSection {
  slug: string;
  group: HandbookGroupKey;
  label: string;
  englishLabel: string;
  description: string;
  contentSection?: string;
  tags?: readonly string[];
  topics: readonly HandbookTopic[];
}

const item = (label: string, progress?: HandbookTopicProgress): HandbookTopic =>
  progress ? { label, progress } : { label };
const items = (...labels: string[]): HandbookTopic[] => labels.map((label) => item(label));
const branch = (label: string, ...children: HandbookTopic[]): HandbookTopic => ({ label, children });

export const HANDBOOK_NAV_GROUPS: ReadonlyArray<{
  key: HandbookGroupKey;
  label: string;
  englishLabel: string;
  description: string;
}> = [
  {
    key: "getting-started",
    label: "Getting Started",
    englishLabel: "00 / START HERE",
    description: "이 학습 지도를 활용하고 실험 결과를 기록하는 방법",
  },
  {
    key: "learn",
    label: "Learn",
    englishLabel: "01–13 / LEARN",
    description: "기초부터 언어, 브라우저, 프레임워크와 시스템 설계까지",
  },
  {
    key: "deep-dive",
    label: "Deep Dive",
    englishLabel: "14 / DEEP DIVE",
    description: "기초 문서에서 더 깊게 들어가는 런타임·프레임워크 내부 구조",
  },
  {
    key: "labs",
    label: "Labs",
    englishLabel: "15 / LABS",
    description: "예상하고, 실행하고, 측정해 동작 원리를 확인하는 실험 목차",
  },
  {
    key: "knowledge-map",
    label: "Knowledge Map",
    englishLabel: "16 / LEARNING PATH",
    description: "선수 개념과 후속 개념을 연결한 추천 학습 순서",
  },
];

export const HANDBOOK_SECTIONS = [
  {
    slug: "getting-started",
    group: "getting-started",
    label: "Getting Started",
    englishLabel: "00 / START HERE",
    description: "핸드북의 사용법과 문서·실험·측정 기준",
    contentSection: "Getting Started",
    topics: [
      ...items(
        "Frontend / Web Engineering Handbook이란?",
        "학습 방법",
        "개념 → 예제 → 실험 → 측정 흐름",
        "개발 환경",
        "DevTools 사용법",
        "성능 측정 기준",
      ),
      branch(
        "References 정책",
        branch("Primary Sources", ...items("ECMAScript Specification", "MDN", "React Docs", "TypeScript Docs", "Next.js Docs", "Chrome / V8", "web.dev")),
        branch("Engineering References", ...items("Toss", "당근", "우아한형제들", "LINE", "Meta", "Netflix", "Shopify", "Vercel")),
      ),
    ],
  },
  {
    slug: "learn/web-fundamentals",
    group: "learn",
    label: "Web Fundamentals",
    englishLabel: "01 / WEB",
    description: "요청이 오가고 문서가 화면으로 만들어지는 웹의 기초",
    contentSection: "Web Fundamentals",
    topics: [
      branch("How Web Works", ...items("URL 입력", "DNS", "TCP", "TLS", "HTTP Request / Response")),
      branch("HTTP", ...items("HTTP/1.1", "HTTP/2", "HTTP/3", "Header", "Status Code", "Cookie", "Cache-Control", "CORS")),
      branch("HTML", ...items("Parsing", "Semantic HTML", "Accessibility", "Resource Loading")),
      branch("CSS", ...items("Cascade", "Specificity", "Box Model", "Layout", "Flex", "Grid", "Rendering Cost")),
    ],
  },
  {
    slug: "learn/javascript",
    group: "learn",
    label: "JavaScript",
    englishLabel: "02 / LANGUAGE",
    description: "값과 실행 모델부터 비동기 처리, 모듈과 오류까지",
    contentSection: "JavaScript",
    topics: [
      branch("Fundamentals", ...items("Primitive / Object", "var / let / const", "Operator", "Function", "Array", "Object", "Destructuring / Spread")),
      branch("Type & Value", ...items("Primitive", "Reference", "Equality", "Type Coercion", "null / undefined", "Symbol / BigInt")),
      branch("Execution Model", ...items("Execution Context", "Lexical Environment", "Scope", "Scope Chain", "Hoisting", "Call Stack", "Closure")),
      branch("Closure Deep Dive", ...items("Lexical Environment", "Scope Chain", "함수가 생성되는 시점", "Counter 예제", "Loop 문제", "React Stale Closure", "Event Listener", "Heap Reference", "GC와 Closure")),
      branch("Object Model", ...items("this", "Prototype", "Prototype Chain", "Class", "Property Descriptor", "Proxy / Reflect")),
      branch("Async JavaScript", ...items("Event Loop", "Task", "Microtask", "Promise", "async / await", "setTimeout", "requestAnimationFrame", "requestIdleCallback")),
      branch("Module", ...items("ESM", "CommonJS", "Dynamic Import", "Module Resolution")),
      branch("Error", ...items("Error", "Exception", "Error Boundary 개념", "Debugging")),
    ],
  },
  {
    slug: "learn/typescript",
    group: "learn",
    label: "TypeScript",
    englishLabel: "03 / LANGUAGE",
    description: "타입 모델과 컴파일 설정을 작은 단위로 나누어 이해하기",
    contentSection: "TypeScript",
    topics: [
      branch("Fundamentals", ...items("Type Annotation", "Interface", "Type Alias", "Array / Tuple", "Enum", "Function")),
      branch("Type System", ...items("Union", "Intersection", "Literal Type", "Structural Typing", "Type Compatibility", "Inference")),
      branch("Narrowing", ...items("typeof", "instanceof", "in", "Type Predicate", "Discriminated Union")),
      branch("Generics", ...items("Generic Function", "Constraint", "keyof", "Indexed Access", "Generic Inference")),
      branch("Advanced Types", ...items("Mapped Type", "Conditional Type", "infer", "Template Literal Type", "never", "unknown", "satisfies")),
      branch("Compiler", ...items("tsconfig", "strict", "target", "module", "Type Erasure")),
    ],
  },
  {
    slug: "learn/browser",
    group: "learn",
    label: "Browser",
    englishLabel: "04 / PLATFORM",
    description: "브라우저 프로세스, 렌더링 파이프라인과 Web APIs",
    contentSection: "Browser",
    topics: [
      branch("Architecture", ...items("Browser Process", "Renderer Process", "Main Thread", "Compositor Thread", "Worker")),
      branch("Rendering", ...items("HTML Parsing", "DOM", "CSSOM", "Render Tree", "Style Calculation", "Layout", "Paint", "Composite")),
      branch("Event", ...items("Event Capturing", "Bubbling", "Delegation", "Passive Listener")),
      branch("Storage", ...items("Cookie", "LocalStorage", "SessionStorage", "IndexedDB", "Cache Storage")),
      branch("Web APIs", ...items("IntersectionObserver", "ResizeObserver", "MutationObserver", "PerformanceObserver", "Web Worker", "Service Worker")),
    ],
  },
  {
    slug: "learn/react",
    group: "learn",
    label: "React",
    englishLabel: "05 / UI",
    description: "컴포넌트, Hooks, 렌더링과 내부 구조를 단계별로",
    contentSection: "React",
    topics: [
      branch("01 Fundamentals", ...items("Component", "JSX", "Props", "State", "Event", "Conditional Rendering", "List", "Key", "Composition", "Controlled / Uncontrolled")),
      branch("02 State", ...items("State locality", "Derived state", "State Snapshot", "State Queue", "Batching", "Object State", "Lazy Initialization", "Render와의 관계")),
      branch("03 Hooks", ...items("useState", "useEffect", "useContext", "useReducer", "useRef", "useImperativeHandle", "useLayoutEffect", "useInsertionEffect", "useMemo", "useCallback", "useId", "useTransition", "useDeferredValue", "useSyncExternalStore", "useOptimistic", "useActionState", "use", "Custom Hooks")),
      branch("useState Deep Dive", ...items("기본 사용법", "Initial State", "Functional Update", "State Snapshot", "State Queue", "Batching", "Object State", "Lazy Initialization", "Render와의 관계", "Fiber Hook State 개요")),
      branch("04 Effects", ...items("Effect가 필요한 경우", "Effect가 필요 없는 경우", "Dependency", "Cleanup", "Stale Closure", "Race Condition", "AbortController", "Strict Mode", "useEffect와 useLayoutEffect")),
      branch("05 Rendering", ...items("Render란?", "Render 발생 조건", "State Snapshot", "Batching", "Reconciliation", "Diffing", "Key", "Render Phase", "Commit Phase", "Browser Paint와의 관계")),
      branch("06 State Architecture", ...items("State locality", "Context", "Reducer", "Context Splitting", "External Store", "Server State와 Client State")),
      branch("07 Concurrent React", ...items("Concurrent Rendering", "Suspense", "Transition", "Deferred Value", "Scheduling")),
      branch("08 Performance", ...items("React.memo", "useMemo", "useCallback", "State Locality", "Render Boundary", "Context Re-render", "Context Splitting", "Subscription", "Virtualization", "Lazy", "Suspense", "Transition", "Profiler", "React Compiler")),
      branch("09 Internals", ...items("Virtual DOM", "Stack Reconciler", "Fiber", "Fiber Node", "Current / WorkInProgress", "alternate", "Reconciliation", "Update Queue", "Scheduler", "Lane", "Priority", "Render Phase", "Commit Phase", "Concurrent Rendering", "Suspense 내부 구조")),
    ],
  },
  {
    slug: "learn/nextjs",
    group: "learn",
    label: "Next.js",
    englishLabel: "06 / FRAMEWORK",
    description: "App Router와 렌더링, 서버·클라이언트 경계와 캐시",
    contentSection: "Next.js",
    topics: [
      branch("Fundamentals", ...items("Next.js란?", "React와 차이", "App Router", "Page", "Layout", "Routing")),
      branch("Rendering", ...items("CSR", "SSR", "SSG", "ISR", "RSC", "Hydration")),
      branch("Server / Client", ...items("Server Component", "Client Component", "'use client'", "Boundary")),
      branch("Data", ...items("fetch", "Cache", "Revalidation", "Server Action", "Route Handler")),
      branch("Streaming", ...items("Suspense", "Streaming SSR", "Loading UI")),
      branch("Performance", ...items("Bundle", "Image", "Font", "Prefetch", "Cache", "Hydration Cost")),
    ],
  },
  {
    slug: "learn/data-network",
    group: "learn",
    label: "Data & Network",
    englishLabel: "07 / DATA",
    description: "요청·캐시·서버 상태를 브라우저와 API 경계에서 보기",
    contentSection: "Data & Network",
    topics: [
      ...items("Fetch API", "Axios", "REST", "GraphQL", "WebSocket", "SSE", "Polling", "AbortController", "Pagination", "Cursor Pagination", "Optimistic Update", "Cache", "Request Deduplication"),
      branch("TanStack Query", ...items("Query", "Mutation", "staleTime", "gcTime", "Invalidation", "Optimistic Update", "Infinite Query")),
    ],
  },
  {
    slug: "learn/build-system",
    group: "learn",
    label: "Build System",
    englishLabel: "08 / TOOLING",
    description: "패키지 매니저, bundler와 개발 서버의 역할을 구분해 이해하기",
    contentSection: "Build System",
    topics: [
      branch("Module System", ...items("ESM", "CommonJS", "Module Resolution")),
      branch("Bundling", ...items("Bundler란?", "Dependency Graph", "Tree Shaking", "Code Splitting", "Chunk", "Dynamic Import", "Minification")),
      branch("Package Manager", ...items("npm", "pnpm", "Yarn", "Bun", "npm · pnpm · Yarn · Bun 비교", "Package Manager와 Bundler의 차이", "Lockfile", "Dependency Resolution", "Workspace", "Scripts / Lifecycle")),
      branch("Webpack", ...items("Loader", "Plugin", "Chunk", "HMR")),
      branch("Vite", ...items("Native ESM", "Dev Server", "HMR", "Pre-bundling", "Rollup / Rolldown")),
      item("Turbopack"),
    ],
  },
  {
    slug: "learn/performance",
    group: "learn",
    label: "Performance",
    englishLabel: "09 / QUALITY",
    description: "앞에서 배운 개념을 재현 가능한 측정과 개선에 적용하기",
    contentSection: "Performance",
    topics: [
      branch("Measurement", ...items("Lighthouse", "Core Web Vitals", "Performance Panel", "React Profiler", "RUM")),
      branch("Network", ...items("Waterfall", "Compression", "Cache", "CDN", "Preconnect", "Preload", "Prefetch")),
      branch("JavaScript", ...items("Long Task", "Scheduling", "Allocation", "Web Worker")),
      branch("Rendering", ...items("Reflow", "Repaint", "Composite", "Layout Thrashing", "DOM Size", "content-visibility")),
      branch("React", ...items("Re-render", "Commit", "Context", "Memoization", "Virtualization")),
      branch("Bundle", ...items("Tree Shaking", "Code Splitting", "Dependency Diet")),
      branch("Resource", ...items("Image", "Font", "Third-party Script")),
      branch("Perceived Performance", ...items("Skeleton", "Optimistic UI", "Progressive Rendering")),
    ],
  },
  {
    slug: "learn/memory-runtime",
    group: "learn",
    label: "Memory & Runtime",
    englishLabel: "10 / RUNTIME",
    description: "메모리 생명주기, Garbage Collection과 V8 개요",
    contentSection: "Memory & Runtime",
    topics: [
      ...items("Stack", "Heap", "Allocation", "Reference", "Reachability"),
      branch("Garbage Collection", ...items("Mark", "Sweep", "Compact", "Generational GC", "Young Generation", "Old Generation")),
      branch("Memory Leak", ...items("Closure", "Event Listener", "Timer", "Detached DOM", "WebSocket", "Cache")),
      branch("V8", ...items("Ignition", "TurboFan", "Hidden Class", "Inline Cache", "Orinoco")),
      branch("DevTools", ...items("Heap Snapshot", "Allocation Timeline", "Allocation Sampling", "Detached Elements")),
    ],
  },
  {
    slug: "learn/web-security",
    group: "learn",
    label: "Web Security",
    englishLabel: "11 / SECURITY",
    description: "브라우저부터 API, 서버와 의존성까지 신뢰 경계를 이해하기",
    contentSection: "Web Security",
    topics: [
      branch("01 Security Fundamentals", ...items("Authentication vs Authorization", "CIA Triad", "Trust Boundary", "Attack Surface", "Same-Origin Policy", "Defense in Depth")),
      branch("02 Browser Security", ...items("Same-Origin Policy", "CORS", "CSP", "Cookie Security: HttpOnly / Secure / SameSite", "iframe sandbox", "Clickjacking", "Permissions Policy")),
      branch("03 XSS", ...items("Stored XSS", "Reflected XSS", "DOM-based XSS", "HTML escaping", "Sanitization", "dangerouslySetInnerHTML", "CSP", "React의 보호 경계")),
      branch("04 CSRF", ...items("CSRF가 가능한 이유", "Cookie 자동 전송", "SameSite", "CSRF Token", "Origin / Referer 검증", "JWT와 CSRF")),
      branch("05 Injection", ...items("SQL Injection", "Command Injection", "NoSQL Injection", "Template Injection", "Parameterized Query")),
      branch("06 Authentication", ...items("Session", "Cookie", "JWT", "Access Token", "Refresh Token", "OAuth 2.0", "OpenID Connect", "PKCE", "Session Fixation")),
      branch("07 Authorization", ...items("RBAC", "ABAC", "IDOR / BOLA", "Vertical Privilege Escalation", "Horizontal Privilege Escalation")),
      branch("08 API Security", ...items("Input Validation", "Rate Limiting", "API Key", "CORS 오해", "Mass Assignment", "Pagination abuse", "Error 정보 노출")),
      branch("09 Server Security", ...items("SSRF", "Path Traversal", "File Upload", "Open Redirect", "Host Header", "Request Smuggling 개념")),
      branch("10 JavaScript Security", ...items("Prototype Pollution", "eval", "ReDoS", "postMessage", "DOM Clobbering", "Third-party Script")),
      branch("11 Dependency Security", ...items("npm dependency", "Supply Chain Attack", "Typosquatting", "Lockfile", "npm audit", "Dependabot", "SBOM")),
      branch("12 Secret Management", ...items("API Key", "Environment Variable", "NEXT_PUBLIC_", "Client bundle의 Secret 노출", "Git history에 노출된 Secret")),
      branch("13 Security Headers", ...items("Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy")),
    ],
  },
  {
    slug: "learn/testing-quality",
    group: "learn",
    label: "Testing & Quality",
    englishLabel: "12 / QUALITY",
    description: "단위부터 E2E, 접근성·관측 가능성과 보안 테스트까지",
    contentSection: "Testing & Quality",
    topics: [
      ...items("Unit Test", "Integration Test", "E2E", "Playwright", "MSW", "Accessibility", "Error Handling", "Observability", "Sentry", "Logging", "Security Test", "Performance Test"),
    ],
  },
  {
    slug: "learn/architecture",
    group: "learn",
    label: "Architecture",
    englishLabel: "13 / ARCHITECTURE",
    description: "경계·의존성·상태 흐름을 시스템 관점에서 설계하기",
    contentSection: "Architecture",
    topics: [
      ...items("Module Boundary", "Layering", "Dependency Direction", "Domain Model", "State Architecture", "API Contract", "Error Boundary", "Monolith vs Services", "Frontend / Backend Boundary", "Architecture Decision Record"),
    ],
  },
  {
    slug: "deep-dive",
    group: "deep-dive",
    label: "Deep Dive",
    englishLabel: "14 / DEEP DIVE",
    description: "기초 개념의 내부 구조와 여러 런타임 계층을 따라가기",
    contentSection: "Deep Dive",
    tags: ["Deep Dive"],
    topics: items(
      "JavaScript Event Loop Internals",
      "V8 Garbage Collector",
      "Browser Rendering Pipeline",
      "React Fiber Architecture",
      "React Scheduler & Lane",
      "React Reconciliation",
      "Next.js RSC Protocol",
      "Hydration",
      "HTTP/2 vs HTTP/3",
      "Webpack Dependency Graph",
      "Vite Dev Server",
    ),
  },
  {
    slug: "labs",
    group: "labs",
    label: "Labs",
    englishLabel: "15 / EXPERIMENTS",
    description: "결과 예측부터 재측정까지 같은 흐름으로 실험하기",
    contentSection: "Labs",
    tags: ["Lab"],
    topics: [
      branch("JavaScript", ...items("Event Loop Lab", "Memory Leak Lab")),
      branch("React", ...items("Re-render Lab", "Context Lab", "useMemo Lab", "Transition Lab")),
      branch("Browser", ...items("Layout Thrashing", "Paint", "DOM Size")),
      branch("Network", ...items("Waterfall", "Cache", "Prefetch")),
      branch("Memory", ...items("Heap Snapshot", "Closure Leak", "Detached DOM")),
      branch("Bundle", ...items("Tree Shaking", "Code Splitting", "Dynamic Import")),
      branch("Security", ...items("XSS Lab", "CSRF Lab", "Cookie Lab", "CORS Lab", "SQL Injection Lab", "Auth Lab", "격리된 로컬 환경에서 원인과 방어 비교")),
      item("Lab 공통 흐름: 문제 코드 → 예상 → 실행 → 측정 → DevTools → 개선 → 재측정 → 원리 설명"),
    ],
  },
  {
    slug: "knowledge-map",
    group: "knowledge-map",
    label: "Knowledge Map",
    englishLabel: "16 / LEARNING PATH",
    description: "기초를 연결해 프레임워크와 성능 주제로 넘어가는 첫 학습 경로",
    contentSection: "Knowledge Map",
    topics: items(
      "01 · Execution Context",
      "02 · Scope",
      "03 · Closure",
      "04 · Event Loop",
      "05 · TypeScript Narrowing",
      "06 · React State",
      "07 · useEffect",
      "08 · React Rendering",
      "09 · Reconciliation",
      "10 · Context Re-render",
    ),
  },
] as const satisfies readonly HandbookSection[];

export function getHandbookSection(slug: string) {
  return HANDBOOK_SECTIONS.find((section) => section.slug === slug) ?? null;
}

export function countHandbookTopics(topics: readonly HandbookTopic[]): number {
  return topics.reduce((total, topic) => {
    const children = topic.children ?? [];
    return total + (children.length > 0 ? countHandbookTopics(children) : 1);
  }, 0);
}

export interface HandbookProgressSummary {
  total: number;
  notStarted: number;
  learning: number;
  completed: number;
}

function emptyProgressSummary(): HandbookProgressSummary {
  return { total: 0, notStarted: 0, learning: 0, completed: 0 };
}

function addProgress(
  summary: HandbookProgressSummary,
  progress: HandbookTopicProgress,
  count = 1,
) {
  summary.total += count;
  if (progress === "completed") summary.completed += count;
  else if (progress === "learning") summary.learning += count;
  else summary.notStarted += count;
}

export function summarizeHandbookProgress(
  topics: readonly HandbookTopic[],
): HandbookProgressSummary {
  return topics.reduce((summary, topic) => {
    const children = topic.children ?? [];

    if (topic.progress) {
      addProgress(summary, topic.progress, countHandbookTopics([topic]));
    } else if (children.length > 0) {
      const childSummary = summarizeHandbookProgress(children);
      summary.total += childSummary.total;
      summary.notStarted += childSummary.notStarted;
      summary.learning += childSummary.learning;
      summary.completed += childSummary.completed;
    } else {
      addProgress(summary, "not-started");
    }

    return summary;
  }, emptyProgressSummary());
}

export function getHandbookTopicStatus(topic: HandbookTopic): HandbookTopicProgress {
  if (topic.progress) return topic.progress;

  const summary = summarizeHandbookProgress(topic.children ?? []);
  if (summary.total === 0 || summary.notStarted === summary.total) return "not-started";
  if (summary.completed === summary.total) return "completed";
  return "learning";
}

export function getHandbookPosts(section: HandbookSection): MDXPost[] {
  return getAllPosts("handbook")
    .filter((post) => post.published)
    .filter((post) => {
      const matchesContentSection = section.contentSection
        ? post.section === section.contentSection
        : false;
      const matchesTag = section.tags?.some((tag) => post.tags?.includes(tag)) ?? false;

      return matchesContentSection || matchesTag;
    });
}
