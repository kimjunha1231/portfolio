import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);

  if (!fs.existsSync(fullPath)) {
    fail(relativePath, "파일이 없습니다.", "필수 라우트 또는 헬퍼를 복구하세요.");
    return "";
  }

  return fs.readFileSync(fullPath, "utf8");
}

function fail(file, problem, fix) {
  failures.push({ file, problem, fix });
}

function expectSource(file, source, pattern, problem, fix) {
  if (!pattern.test(source)) fail(file, problem, fix);
}

function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  return match?.[1]?.trim().replace(/^(["'])(.*)\1$/, "$2") ?? "";
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function checkContent(kind) {
  const directory = path.join(root, "content", kind);
  const relativeDirectory = path.relative(root, directory);
  const files = fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((file) => /\.mdx?$/.test(file))
    : [];

  if (files.length === 0) {
    fail(relativeDirectory, "공개 콘텐츠가 없습니다.", "최소 한 개의 MDX 콘텐츠를 추가하세요.");
  }

  const dates = [];
  for (const file of files) {
    const relativeFile = path.join("content", kind, file);
    const source = read(relativeFile);
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!match) {
      fail(relativeFile, "YAML frontmatter가 없습니다.", "title, date, lastModified, description을 frontmatter에 추가하세요.");
      continue;
    }

    const frontmatter = match[1];
    const title = frontmatterValue(frontmatter, "title");
    const description = frontmatterValue(frontmatter, "description");
    const date = frontmatterValue(frontmatter, "date");
    const lastModified = frontmatterValue(frontmatter, "lastModified");
    const slug = file.replace(/\.mdx?$/, "");

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      fail(relativeFile, "정적 URL에 사용할 slug 형식이 올바르지 않습니다.", "파일명을 소문자 영문·숫자·하이픈 형식으로 바꾸세요.");
    }
    if (!title) {
      fail(relativeFile, "title이 비어 있습니다.", "검색 결과와 메타데이터에 쓸 제목을 추가하세요.");
    }
    if (!description) {
      fail(relativeFile, "description이 비어 있습니다.", "콘텐츠의 요약을 1문장 이상 추가하세요.");
    }
    if (!isValidIsoDate(date)) {
      fail(relativeFile, "date가 유효한 YYYY-MM-DD 날짜가 아닙니다.", "게시일을 실제 ISO 날짜로 지정하세요.");
    }
    if (!isValidIsoDate(lastModified)) {
      fail(relativeFile, "lastModified가 유효한 YYYY-MM-DD 날짜가 아닙니다.", "최종 수정일을 실제 ISO 날짜로 지정하세요.");
    }
    if (isValidIsoDate(date) && isValidIsoDate(lastModified) && lastModified < date) {
      fail(relativeFile, "lastModified가 date보다 이릅니다.", "수정일을 게시일과 같거나 이후로 조정하세요.");
    }
    if (isValidIsoDate(lastModified)) dates.push(lastModified);
  }

  return { count: files.length, latest: dates.sort().at(-1) };
}

const blog = checkContent("blog");
const projects = checkContent("projects");

const sitemap = read("src/app/sitemap.ts");
expectSource("src/app/sitemap.ts", sitemap, /getAllPosts\("blog"\)/, "블로그 URL을 sitemap 데이터에 포함하지 않습니다.", "getAllPosts(\"blog\")를 sitemap 생성에 사용하세요.");
expectSource("src/app/sitemap.ts", sitemap, /getAllPosts\("projects"\)/, "프로젝트 URL을 sitemap 데이터에 포함하지 않습니다.", "getAllPosts(\"projects\")를 sitemap 생성에 사용하세요.");
expectSource("src/app/sitemap.ts", sitemap, /projects\.map\(/, "개별 프로젝트 URL이 sitemap에 생성되지 않습니다.", "projects.map으로 /projects/[slug] URL을 추가하세요.");
expectSource("src/app/sitemap.ts", sitemap, /blogPosts\.map\(/, "개별 블로그 URL이 sitemap에 생성되지 않습니다.", "blogPosts.map으로 /blog/[slug] URL을 추가하세요.");
expectSource("src/app/sitemap.ts", sitemap, /formatDateForSitemap/, "sitemap의 콘텐츠 수정일을 검증하지 않습니다.", "각 URL에 formatDateForSitemap(lastModified)를 사용하세요.");

for (const [kind, route] of [["blog", "src/app/blog/[slug]/page.tsx"], ["projects", "src/app/projects/[slug]/page.tsx"]]) {
  const source = read(route);
  expectSource(route, source, /export const dynamicParams = false/, "빌드되지 않은 동적 slug를 허용합니다.", "dynamicParams = false를 유지하세요.");
  expectSource(route, source, new RegExp(`getPostSlugs\\("${kind}"\\)`), "콘텐츠 slug로 정적 페이지를 생성하지 않습니다.", `generateStaticParams에서 getPostSlugs(\"${kind}\")를 반환하세요.`);
  expectSource(route, source, new RegExp(`getContentMetadata\\(post, "${kind}"\\)|getContentMetadata\\(project, "${kind}"\\)`), "상세 페이지가 표준 콘텐츠 메타데이터를 사용하지 않습니다.", "generateMetadata에서 getContentMetadata를 반환하세요.");
}

const seo = read("src/lib/seo.ts");
for (const [pattern, problem, fix] of [
  [/getContentCanonicalUrl/, "canonical URL 헬퍼가 없습니다.", "getContentCanonicalUrl을 유지하세요."],
  [/canonical:\s*canonicalUrl/, "상세 페이지 canonical 메타데이터가 없습니다.", "alternates.canonical에 canonicalUrl을 설정하세요."],
  [/"text\/markdown":\s*rawUrl/, "원문 Markdown alternate가 없습니다.", "alternates.types에 text/markdown raw URL을 추가하세요."],
  [/"ai-content-format":\s*"markdown"/, "AI 콘텐츠 형식 메타데이터가 없습니다.", "other에 ai-content-format을 설정하세요."],
  [/"ai-content-url":\s*rawUrl/, "AI 콘텐츠 원문 URL 메타데이터가 없습니다.", "other에 ai-content-url을 설정하세요."],
  [/"ai-token-count"/, "AI 토큰 수 메타데이터가 없습니다.", "other에 ai-token-count를 설정하세요."],
  [/publishedTime:\s*formatDateForSchema/, "Open Graph 게시일이 없습니다.", "openGraph.publishedTime을 설정하세요."],
  [/modifiedTime:\s*formatDateForSchema/, "Open Graph 수정일이 없습니다.", "openGraph.modifiedTime을 설정하세요."],
]) expectSource("src/lib/seo.ts", seo, pattern, problem, fix);

for (const [kind, route] of [["blog", "src/app/blog/[slug]/raw/route.ts"], ["projects", "src/app/projects/[slug]/raw/route.ts"]]) {
  const source = read(route);
  for (const [pattern, problem, fix] of [
    [new RegExp(`getPostBySlug\\("${kind}", slug\\)`), "원문 라우트가 올바른 콘텐츠 컬렉션을 조회하지 않습니다.", `getPostBySlug(\"${kind}\", slug)를 사용하세요.`],
    [/"Content-Type":\s*"text\/markdown; charset=utf-8"/, "원문 라우트의 Markdown Content-Type이 없습니다.", "Content-Type을 text/markdown; charset=utf-8로 설정하세요."],
    [/"Content-Length"/, "원문 응답의 Content-Length가 없습니다.", "UTF-8 바이트 길이로 Content-Length를 설정하세요."],
    [/"X-AI-Token-Count"/, "원문 응답의 AI 토큰 수 헤더가 없습니다.", "X-AI-Token-Count를 설정하세요."],
    [/"x-markdown-tokens"/, "원문 응답의 Markdown 토큰 수 헤더가 없습니다.", "x-markdown-tokens를 설정하세요."],
    [/"X-Robots-Tag":\s*"noindex, follow"/, "원문 응답의 로봇 정책이 없습니다.", "X-Robots-Tag를 noindex, follow로 설정하세요."],
    [/"Cache-Control"/, "원문 응답의 캐시 정책이 없습니다.", "공개 Markdown 응답에 Cache-Control을 설정하세요."],
  ]) expectSource(route, source, pattern, problem, fix);
}

const aiRoutes = [
  ["src/app/index.md/route.ts", "text/markdown; charset=utf-8"],
  ["src/app/agents.md/route.ts", "text/markdown; charset=utf-8"],
  ["src/app/skill.md/route.ts", "text/markdown; charset=utf-8"],
  ["src/app/projects.md/route.ts", "text/markdown; charset=utf-8"],
  ["src/app/blog.md/route.ts", "text/markdown; charset=utf-8"],
  ["src/app/llms.md/route.ts", "text/markdown; charset=utf-8"],
  ["src/app/llms.txt/route.ts", "text/plain; charset=utf-8"],
  ["src/app/llms-full.txt/route.ts", "text/plain; charset=utf-8"],
];

for (const [route, contentType] of aiRoutes) {
  const source = read(route);
  expectSource(route, source, /export function GET\(\)/, "GET 핸들러가 없습니다.", "AI 검색용 문서를 GET 라우트로 노출하세요.");
  expectSource(route, source, new RegExp(`"Content-Type":\\s*"${contentType.replace(/[/.+?^${}()|[\\]\\\\]/g, "\\\\$&")}"`), "예상 Content-Type이 없습니다.", `Content-Type을 ${contentType}로 설정하세요.`);
  expectSource(route, source, /"Cache-Control"/, "캐시 정책이 없습니다.", "응답에 Cache-Control을 설정하세요.");
  expectSource(route, source, /"x-markdown-tokens"/, "토큰 예산 헤더가 없습니다.", "x-markdown-tokens를 설정하세요.");
}

const discovery = read("src/app/.well-known/agent-skills/index.json/route.ts");
for (const [pattern, problem, fix] of [
  [/Response\.json/, "에이전트 스킬 발견 라우트가 JSON을 반환하지 않습니다.", "Response.json을 사용하세요."],
  [/schemas\.agentskills\.io/, "에이전트 스킬 discovery schema가 없습니다.", "공식 schema URL을 응답에 포함하세요."],
  [/url:\s*absoluteUrl\("\/skill\.md"\)/, "발견 문서가 skill.md를 가리키지 않습니다.", "skill.md의 절대 URL을 skills 항목에 설정하세요."],
  [/digest:\s*`sha256:/, "발견 문서에 콘텐츠 digest가 없습니다.", "skill.md SHA-256 digest를 설정하세요."],
  [/"X-Robots-Tag":\s*"noindex, follow"/, "발견 문서의 로봇 정책이 없습니다.", "X-Robots-Tag를 noindex, follow로 설정하세요."],
]) expectSource("src/app/.well-known/agent-skills/index.json/route.ts", discovery, pattern, problem, fix);

const nextConfig = read("next.config.ts");
for (const [pattern, problem, fix] of [
  [/X-Content-Type-Options/, "전역 nosniff 헤더가 없습니다.", "X-Content-Type-Options: nosniff를 추가하세요."],
  [/agentDiscoveryLinkHeader/, "에이전트 검색 Link 헤더 구성이 없습니다.", "llms.txt, skill.md, agent-skills discovery Link를 구성하세요."],
  [/<\/llms\.txt>;/, "Link 헤더에 llms.txt가 없습니다.", "llms.txt describedby Link를 추가하세요."],
  [/<\/skill\.md>;/, "Link 헤더에 skill.md가 없습니다.", "skill.md service-desc Link를 추가하세요."],
  [/agent-skills\/index\.json/, "Link 헤더에 agent skills discovery URL이 없습니다.", "well-known discovery Link를 추가하세요."],
]) expectSource("next.config.ts", nextConfig, pattern, problem, fix);

const site = read("src/lib/site.ts");
const siteLastModified = site.match(/SITE_LAST_MODIFIED\s*=\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1];
const newestContentDate = [blog.latest, projects.latest].filter(Boolean).sort().at(-1);
if (!isValidIsoDate(siteLastModified ?? "")) {
  fail("src/lib/site.ts", "SITE_LAST_MODIFIED가 유효한 YYYY-MM-DD 날짜가 아닙니다.", "사이트 기본 수정일을 실제 ISO 날짜로 지정하세요.");
} else if (newestContentDate && siteLastModified < newestContentDate) {
  fail("src/lib/site.ts", `SITE_LAST_MODIFIED(${siteLastModified})가 최신 콘텐츠(${newestContentDate})보다 이릅니다.`, "기본 수정일을 최신 콘텐츠 수정일 이상으로 올려 stale fallback 신호를 제거하세요.");
}

if (failures.length > 0) {
  console.error(`Site contract validation failed with ${failures.length} issue(s):`);
  for (const issue of failures) {
    console.error(`- ${issue.file}: ${issue.problem} Fix: ${issue.fix}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Site contract validation passed: ${projects.count} projects and ${blog.count} blog posts checked.`);
}
