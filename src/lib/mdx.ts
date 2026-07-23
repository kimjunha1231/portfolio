import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import {
  PROJECT_PLATFORMS,
  PROJECT_ROLES,
  type ProjectPlatform,
  type ProjectRole,
} from "@/lib/project-taxonomy";

// 콘텐츠 루트 경로 설정
const CONTENT_PATH = path.join(process.cwd(), "content");

export interface MDXPost {
  slug: string;
  title: string;
  date: string;
  lastModified: string;
  section?: string;
  category?: string;
  projectCategory?: string;
  platforms?: ProjectPlatform[];
  role?: ProjectRole;
  description?: string;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  coverFit?: "cover" | "contain";
  githubUrl?: string;
  content: string;
}

function parseFrontmatterDate(value: unknown) {
  if (typeof value === "string") return value;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return "";
}

function parseCoverFit(value: unknown): MDXPost["coverFit"] {
  return value === "contain" ? "contain" : undefined;
}

function parseProjectPlatforms(value: unknown): ProjectPlatform[] {
  if (!Array.isArray(value)) return [];

  return value.filter((platform): platform is ProjectPlatform =>
    typeof platform === "string" &&
    PROJECT_PLATFORMS.includes(platform as ProjectPlatform),
  );
}

function parseProjectRole(value: unknown): ProjectRole | undefined {
  return typeof value === "string" && PROJECT_ROLES.includes(value as ProjectRole)
    ? (value as ProjectRole)
    : undefined;
}

function parsePostData(slug: string, fileContent: string): MDXPost {
  const { data, content } = matter(fileContent);
  const date = parseFrontmatterDate(data.date);

  return {
    slug,
    title: data.title || "Untitled",
    date,
    lastModified: parseFrontmatterDate(data.lastModified) || date,
    section: typeof data.section === "string" ? data.section : "",
    category: data.category || "",
    projectCategory:
      typeof data.projectCategory === "string" ? data.projectCategory : "",
    platforms: parseProjectPlatforms(data.platforms),
    role: parseProjectRole(data.role),
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: typeof data.cover === "string" ? data.cover : "",
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : "",
    coverFit: parseCoverFit(data.coverFit),
    githubUrl: typeof data.githubUrl === "string" ? data.githubUrl : "",
    content,
  };
}

export const getPostSlugs = (type: "blog" | "projects") =>
  getAllPosts(type).map((post) => post.slug);

export function toCleanMarkdown(post: MDXPost) {
  return `# ${post.title}

${post.content.trim()}
`;
}

export function estimateTokens(value: string) {
  return Math.max(1, Math.ceil(value.length / 4));
}

export function getLatestLastModified(
  posts: Array<Pick<MDXPost, "lastModified">>,
  fallback = "",
) {
  return (
    posts
      .map((post) => post.lastModified)
      .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
      .sort()
      .at(-1) ?? fallback
  );
}

export function toRawMarkdown(post: MDXPost) {
  const frontmatter = [
    `title: ${JSON.stringify(post.title)}`,
    `date: ${JSON.stringify(post.date)}`,
    `lastModified: ${JSON.stringify(post.lastModified)}`,
    ...(post.section ? [`section: ${JSON.stringify(post.section)}`] : []),
    ...(post.category ? [`category: ${JSON.stringify(post.category)}`] : []),
    ...(post.projectCategory
      ? [`projectCategory: ${JSON.stringify(post.projectCategory)}`]
      : []),
    ...(post.platforms?.length
      ? [`platforms: ${JSON.stringify(post.platforms)}`]
      : []),
    ...(post.role ? [`role: ${JSON.stringify(post.role)}`] : []),
    ...(post.tags?.length ? [`tags: ${JSON.stringify(post.tags)}`] : []),
    ...(post.cover ? [`cover: ${JSON.stringify(post.cover)}`] : []),
    ...(post.coverAlt ? [`coverAlt: ${JSON.stringify(post.coverAlt)}`] : []),
    ...(post.coverFit ? [`coverFit: ${JSON.stringify(post.coverFit)}`] : []),
    ...(post.githubUrl ? [`githubUrl: ${JSON.stringify(post.githubUrl)}`] : []),
    ...(post.description
      ? [`description: ${JSON.stringify(post.description)}`]
      : []),
  ].join("\n");

  return `---\n${frontmatter}\n---\n\n${post.content.trim()}\n`;
}

// 특정 타입(blog 또는 projects)의 모든 포스트 목록 가져오기 (React.cache 적용)
export const getAllPosts = cache((type: "blog" | "projects"): MDXPost[] => {
  const dirPath = path.join(CONTENT_PATH, type);
  
  // 디렉토리가 없으면 빈 배열 리턴 (개발 편의)
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const slug = file.replace(/\.mdx?$/, "");

      return parsePostData(slug, fileContent);
    });

  // 프로젝트는 프로젝트 날짜, 블로그는 최종 업데이트일 기준으로 최신순 정렬
  const sortDate = (post: MDXPost) =>
    type === "projects" ? post.date : post.lastModified;

  return posts.sort((a, b) => {
    const bTime = Date.parse(sortDate(b));
    const aTime = Date.parse(sortDate(a));
    const safeBTime = Number.isNaN(bTime) ? Number.NEGATIVE_INFINITY : bTime;
    const safeATime = Number.isNaN(aTime) ? Number.NEGATIVE_INFINITY : aTime;

    return safeBTime - safeATime;
  });
});

// 특정 슬러그(slug)의 포스트 단건 가져오기 (React.cache 적용)
export const getPostBySlug = cache((type: "blog" | "projects", slug: string): MDXPost | null => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return null;
  }

  const dirPath = path.join(CONTENT_PATH, type);
  const mdxPath = path.join(dirPath, `${slug}.mdx`);
  const mdPath = path.join(dirPath, `${slug}.md`);

  let finalPath = "";
  if (fs.existsSync(mdxPath)) {
    finalPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    finalPath = mdPath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(finalPath, "utf-8");
  return parsePostData(slug, fileContent);
});
