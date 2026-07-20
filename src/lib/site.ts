export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.junha.dev",
);

export const SITE_NAME = "김준하 | 프론트엔드 중심 풀스택 개발자";
export const SITE_TITLE = "AI와 협업하여 성능과 사용자 경험을 최적화하는 개발자";
export const SITE_DESCRIPTION =
  "성능 최적화, 인터랙션, 확장 가능한 아키텍처를 고민하는 김준하의 포트폴리오와 기술 블로그입니다.";
export const SITE_LAST_MODIFIED = "2026-07-19";
export const PERSON_NAME = "김준하";
export const PERSON_ALTERNATE_NAME = "Kim Junha";
export const PERSON_JOB_TITLE = "Frontend-focused Fullstack Developer";
export const GITHUB_URL = "https://github.com/kimjunha1231";
export const CONTACT_EMAIL = "rlawnsgk0610@gmail.com";
export const SOCIAL_IMAGE_PATH = "/images/typography_poster.png";

export const TECHNICAL_TOPICS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Java",
  "Dart",
  "React",
  "Next.js",
  "Flutter",
  "Spring Boot",
  "Styled-components",
  "Tailwind CSS",
  "Zustand",
  "TanStack Query",
  "Riverpod"
];

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_URL).toString();
}

export function formatDateForSchema(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T00:00:00+09:00`
    : undefined;
}

export function formatDateForSitemap(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
}
