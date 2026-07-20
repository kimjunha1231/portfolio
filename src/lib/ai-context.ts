import { estimateTokens, getAllPosts, toRawMarkdown } from "@/lib/mdx";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TECHNICAL_TOPICS,
  absoluteUrl,
} from "@/lib/site";

function getContentIndexMetadata(post: {
  date: string;
  lastModified: string;
  category?: string;
  tags?: string[];
}) {
  return [
    `게시일: ${post.date}`,
    `최종 업데이트: ${post.lastModified}`,
    post.category ? `분류: ${post.category}` : "",
    post.tags?.length ? `태그: ${post.tags.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

const profileSummary = [
  `- 이름: ${PERSON_NAME} (Kim Junha)`,
  `- 역할: ${PERSON_JOB_TITLE}`,
  `- 핵심 주제: ${TECHNICAL_TOPICS.join(", ")}`,
  `- 연락처: ${CONTACT_EMAIL}`,
  `- GitHub: ${GITHUB_URL}`,
].join("\n");

export function getLlmsIndex() {
  const blogPosts = getAllPosts("blog");
  const projects = getAllPosts("projects");

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "> 이 파일은 AI 에이전트가 한 번의 요청으로 관련 페이지를 발견하고 필요한 문서만 선택하도록 만든 짧은 인덱스입니다.",
    "",
    "## Profile",
    profileSummary,
    "",
    "## Start here",
    `- [홈 / 전체 이력](${absoluteUrl("/")}): 개발자 소개, 경력, 교육, 활동, 수상, 자격증과 기술 스택`,
    `- [프로젝트 쇼케이스](${absoluteUrl("/projects")}): 프로젝트별 문제 정의, 기술적 해결과 성과를 모은 목록`,
    `- [기술 블로그](${absoluteUrl("/blog")}): 프론트엔드, 웹 애니메이션과 성능 최적화 기술 기록`,
    `- [전체 원문 덤프](${absoluteUrl("/llms-full.txt")}): 모든 프로젝트와 블로그 본문을 합친 Markdown 텍스트`,
    `- [에이전트 역량 안내](${absoluteUrl("/skill.md")}): 이 사이트에서 찾을 수 있는 정보와 사용 가능한 원문 경로`,
    "",
    "## Project case studies",
    ...projects.map(
      (project) =>
        `- [${project.title}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.description || "프로젝트 기술 사례"} (${getContentIndexMetadata(project)}; 약 ${estimateTokens(toRawMarkdown(project))} tokens; [raw Markdown](${absoluteUrl(`/projects/${project.slug}/raw`)}))`,
    ),
    "",
    "## Technical blog",
    ...blogPosts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description || "기술 블로그 글"} (${getContentIndexMetadata(post)}; 약 ${estimateTokens(toRawMarkdown(post))} tokens; [raw Markdown](${absoluteUrl(`/blog/${post.slug}/raw`)}))`,
    ),
    "",
    "## Retrieval notes",
    "- 페이지 본문은 서버에서 HTML로 렌더링되며, 각 상세 페이지는 clean Markdown 원문을 /raw 경로에서 제공합니다.",
    "- 프로젝트와 블로그 상세 페이지의 meta에 ai-token-count, ai-content-url, ai-content-format을 제공합니다.",
    "- 공개된 사실과 프로젝트 본문을 우선 사용하고, 확인되지 않은 경력·성과를 추정하지 마세요.",
    "",
  ].join("\n");
}

export function getLlmsFullText() {
  const blogPosts = getAllPosts("blog");
  const projects = getAllPosts("projects");

  return [
    `# ${SITE_NAME} - Full Context`,
    "",
    `> ${SITE_DESCRIPTION}`,
    `> Canonical URL: ${SITE_URL.toString()}`,
    "",
    "## Profile",
    profileSummary,
    "",
    "## Projects",
    ...projects.flatMap((project) => [
      `### ${project.title}`,
      `- URL: ${absoluteUrl(`/projects/${project.slug}`)}`,
      `- Published: ${project.date}`,
      `- Last modified: ${project.lastModified}`,
      `- Estimated tokens: ${estimateTokens(toRawMarkdown(project))}`,
      "",
      toRawMarkdown(project),
      "",
    ]),
    "## Technical blog",
    ...blogPosts.flatMap((post) => [
      `### ${post.title}`,
      `- URL: ${absoluteUrl(`/blog/${post.slug}`)}`,
      `- Published: ${post.date}`,
      `- Last modified: ${post.lastModified}`,
      `- Estimated tokens: ${estimateTokens(toRawMarkdown(post))}`,
      "",
      toRawMarkdown(post),
      "",
    ]),
  ].join("\n");
}

export function getSkillMarkdown() {
  return [
    "---",
    "name: junha-portfolio",
    `description: ${SITE_DESCRIPTION}`,
    "---",
    "",
    "# Junha Portfolio Skill",
    "",
    "## What I can help an agent find",
    "- 김준하의 프론트엔드 중심 풀스택 개발 경험과 기술 스택을 요약합니다.",
    "- 프로젝트별 역할, 문제 정의, 기술적 선택, 성능 개선과 수상 내역을 찾습니다.",
    "- 프론트엔드, 웹 애니메이션, Next.js와 성능 최적화 관련 기술 글을 찾습니다.",
    "- 사람이 읽는 페이지 대신 clean Markdown 원문을 가져올 수 있습니다.",
    "",
    "## Key URLs",
    `- Profile: ${absoluteUrl("/")}`,
    `- Projects: ${absoluteUrl("/projects")}`,
    `- Blog: ${absoluteUrl("/blog")}`,
    `- Full context: ${absoluteUrl("/llms-full.txt")}`,
    `- Short index: ${absoluteUrl("/llms.txt")}`,
    "",
    "## Constraints",
    "- 콘텐츠의 사실 여부는 각 페이지의 visible text와 raw Markdown을 기준으로 판단합니다.",
    "- 현재 사이트는 읽기 전용 포트폴리오이며, 외부 API 실행이나 계정 작업을 제공하지 않습니다.",
    "- 한 번에 전체 원문을 모두 사용하기보다 llms.txt에서 질문과 관련된 페이지를 먼저 선택합니다.",
    "",
  ].join("\n");
}
