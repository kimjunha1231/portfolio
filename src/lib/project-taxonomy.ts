export const PROJECT_PLATFORMS = ["web", "app", "extension"] as const;
export type ProjectPlatform = (typeof PROJECT_PLATFORMS)[number];

export const PROJECT_ROLES = ["frontend", "backend", "fullstack"] as const;
export type ProjectRole = (typeof PROJECT_ROLES)[number];

export const PROJECT_PLATFORM_LABELS: Record<ProjectPlatform, string> = {
  web: "웹",
  app: "앱",
  extension: "브라우저 확장",
};

export const PROJECT_ROLE_LABELS: Record<ProjectRole, string> = {
  frontend: "프론트엔드",
  backend: "백엔드",
  fullstack: "풀스택",
};

export const PROJECT_CATEGORY_OPTIONS = [
  { value: "AI 서비스", label: "AI 서비스" },
  { value: "메시징", label: "메시징" },
  { value: "커뮤니티", label: "커뮤니티" },
] as const;
