import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
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
export type ContentType = "blog" | "projects" | "handbook";

type LastModifiedCacheEntry = {
  mtimeMs: number;
  value: string;
};

const lastModifiedCache = new Map<string, LastModifiedCacheEntry>();

export interface ContentGeo {
  name: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface MDXPost {
  slug: string;
  title: string;
  date: string;
  lastModified: string;
  published: boolean;
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
  demoUrl?: string;
  geo?: ContentGeo;
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

function parseContentGeo(value: unknown): ContentGeo | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const data = value as Record<string, unknown>;
  if (typeof data.name !== "string" || data.name.trim() === "") return undefined;

  const parseCoordinate = (coordinate: unknown) =>
    typeof coordinate === "number" && Number.isFinite(coordinate)
      ? coordinate
      : undefined;

  return {
    name: data.name,
    region: typeof data.region === "string" ? data.region : undefined,
    country: typeof data.country === "string" ? data.country : undefined,
    latitude: parseCoordinate(data.latitude),
    longitude: parseCoordinate(data.longitude),
  };
}

function formatFileDate(filePath: string) {
  try {
    return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

function getGitDate(filePath: string) {
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    execFileSync("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: process.cwd(),
      stdio: "ignore",
    });

    const isTracked = execFileSync(
      "git",
      ["ls-files", "--error-unmatch", "--", relativePath],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();

    if (!isTracked) return "";

    const hasWorkingTreeChanges = (() => {
      try {
        execFileSync("git", ["diff", "--quiet", "--", relativePath], {
          cwd: process.cwd(),
          stdio: "ignore",
        });
        execFileSync("git", ["diff", "--cached", "--quiet", "--", relativePath], {
          cwd: process.cwd(),
          stdio: "ignore",
        });
        return false;
      } catch {
        return true;
      }
    })();

    if (hasWorkingTreeChanges) return formatFileDate(filePath);

    return execFileSync("git", ["log", "-1", "--format=%cs", "--", relativePath], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function getAutomaticLastModified(filePath: string, fallback: string) {
  let mtimeMs = 0;

  try {
    mtimeMs = fs.statSync(filePath).mtimeMs;
  } catch {
    return fallback;
  }

  const cached = lastModifiedCache.get(filePath);
  if (cached?.mtimeMs === mtimeMs) return cached.value;

  const value = getGitDate(filePath) || fallback;
  lastModifiedCache.set(filePath, { mtimeMs, value });
  return value;
}

function parsePostData(slug: string, fileContent: string, filePath?: string): MDXPost {
  const { data, content } = matter(fileContent);
  const date = parseFrontmatterDate(data.date);
  const frontmatterLastModified = parseFrontmatterDate(data.lastModified) || date;

  return {
    slug,
    title: data.title || "Untitled",
    date,
    lastModified: filePath
      ? getAutomaticLastModified(filePath, frontmatterLastModified)
      : frontmatterLastModified,
    published: data.published !== false,
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
    demoUrl: typeof data.demoUrl === "string" ? data.demoUrl : "",
    geo: parseContentGeo(data.geo),
    content,
  };
}

export const getPostSlugs = (type: ContentType) =>
  getAllPosts(type)
    .filter((post) => post.published)
    .map((post) => post.slug);

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
    ...(post.demoUrl ? [`demoUrl: ${JSON.stringify(post.demoUrl)}`] : []),
    ...(post.geo ? [`geo: ${JSON.stringify(post.geo)}`] : []),
    ...(post.description
      ? [`description: ${JSON.stringify(post.description)}`]
      : []),
  ].join("\n");

  return `---\n${frontmatter}\n---\n\n${post.content.trim()}\n`;
}

function getMarkdownFiles(directoryPath: string, recursive: boolean): string[] {
  if (!fs.existsSync(directoryPath)) return [];

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => !(recursive && entry.name.startsWith("_")))
    .flatMap((entry) => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isFile() && /\.mdx?$/.test(entry.name)) return [entryPath];
      if (recursive && entry.isDirectory()) return getMarkdownFiles(entryPath, true);
      return [];
    });
}

// 블로그와 프로젝트는 기존처럼 한 단계, 핸드북은 정보 구조에 맞춰 중첩 경로를 읽는다.
export const getAllPosts = cache((type: ContentType): MDXPost[] => {
  const dirPath = path.join(CONTENT_PATH, type);

  const posts = getMarkdownFiles(dirPath, type === "handbook").map((filePath) => {
    const relativePath = path.relative(dirPath, filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const slug = relativePath.replace(/\\/g, "/").replace(/\.mdx?$/, "");

    return parsePostData(slug, fileContent, filePath);
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
export const getPostBySlug = cache((type: ContentType, slug: string): MDXPost | null => {
  const slugSegments = slug.split("/");
  const isValidSlug = type === "handbook"
    ? slugSegments.every((segment) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment))
    : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

  if (!isValidSlug) {
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
  return parsePostData(slug, fileContent, finalPath);
});
