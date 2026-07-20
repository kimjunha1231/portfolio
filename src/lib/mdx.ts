import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 콘텐츠 루트 경로 설정
const CONTENT_PATH = path.join(process.cwd(), "content");

export interface MDXPost {
  slug: string;
  title: string;
  date: string;
  lastModified: string;
  section?: string;
  category?: string;
  description?: string;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  coverFit?: "cover" | "contain";
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

export const getPostSlugs = (type: "blog" | "projects") =>
  getAllPosts(type).map((post) => post.slug);

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
    ...(post.tags?.length ? [`tags: ${JSON.stringify(post.tags)}`] : []),
    ...(post.cover ? [`cover: ${JSON.stringify(post.cover)}`] : []),
    ...(post.coverAlt ? [`coverAlt: ${JSON.stringify(post.coverAlt)}`] : []),
    ...(post.coverFit ? [`coverFit: ${JSON.stringify(post.coverFit)}`] : []),
    ...(post.description
      ? [`description: ${JSON.stringify(post.description)}`]
      : []),
  ].join("\n");

  return `---\n${frontmatter}\n---\n\n${post.content.trim()}\n`;
}

// 특정 타입(blog 또는 projects)의 모든 포스트 목록 가져오기
export function getAllPosts(type: "blog" | "projects"): MDXPost[] {
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
      const { data, content } = matter(fileContent);
      const date = parseFrontmatterDate(data.date);

      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: data.title || "Untitled",
        date,
        lastModified: parseFrontmatterDate(data.lastModified) || date,
        section: typeof data.section === "string" ? data.section : "",
        category: data.category || "",
        description: data.description || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: typeof data.cover === "string" ? data.cover : "",
        coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : "",
        coverFit: parseCoverFit(data.coverFit),
        content,
      };
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
}

// 특정 슬러그(slug)의 포스트 단건 가져오기
export function getPostBySlug(type: "blog" | "projects", slug: string): MDXPost | null {
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
  const { data, content } = matter(fileContent);
  const date = parseFrontmatterDate(data.date);

  return {
    slug,
    title: data.title || "Untitled",
    date,
    lastModified: parseFrontmatterDate(data.lastModified) || date,
    section: typeof data.section === "string" ? data.section : "",
    category: data.category || "",
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: typeof data.cover === "string" ? data.cover : "",
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : "",
    coverFit: parseCoverFit(data.coverFit),
    content,
  };
}
