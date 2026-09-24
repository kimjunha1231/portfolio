import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_BRAND,
  SITE_DESCRIPTION,
  TECHNICAL_TOPICS,
  absoluteUrl,
} from "@/lib/site";
import { getAllPosts, type MDXPost } from "@/lib/mdx";

export const API_VERSION = "v1";
export const API_VERSION_HEADER = API_VERSION;
export const API_RATE_LIMIT = 60;
export const API_RATE_LIMIT_WINDOW_SECONDS = 60;

type RateLimitBucket = { count: number; resetAt: number };
const rateLimitBuckets = new Map<string, RateLimitBucket>();

export interface ApiError {
  code: string;
  message: string;
  hint: string;
  docs: string;
  requestId: string;
}

export interface ApiErrorResponse {
  error: ApiError;
}

export interface ApiProfile {
  brand: string;
  name: string;
  alternateName: string;
  jobTitle: string;
  description: string;
  topics: string[];
  email: string;
  urls: {
    home: string;
    projects: string;
    blog: string;
    github: string;
    linkedin: string;
    developerResources: string;
    agentInstructions: string;
  };
}

export interface ApiContentSummary {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  role?: string;
  section?: string;
  tags: string[];
  date: string;
  lastModified: string;
  url: string;
  rawUrl: string;
}

function getRequestId(request: Request) {
  const supplied = request.headers.get("x-request-id")?.trim();
  return supplied && supplied.length <= 128 ? supplied : crypto.randomUUID();
}

function getClientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "anonymous"
  );
}

function getRateLimitSnapshot(request: Request, consume: boolean) {
  const now = Date.now();
  if (rateLimitBuckets.size > 1000) {
    for (const [bucketKey, bucketValue] of rateLimitBuckets) {
      if (bucketValue.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    }
  }
  const key = getClientKey(request);
  const current = rateLimitBuckets.get(key);
  const bucket = !current || current.resetAt <= now
    ? { count: 0, resetAt: now + API_RATE_LIMIT_WINDOW_SECONDS * 1000 }
    : current;

  if (consume) {
    bucket.count += 1;
    rateLimitBuckets.set(key, bucket);
  }

  return {
    limited: bucket.count > API_RATE_LIMIT,
    remaining: Math.max(0, API_RATE_LIMIT - bucket.count),
    resetInSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

export function getRateLimitHeaders(remaining = API_RATE_LIMIT - 1) {
  return {
    "RateLimit-Limit": String(API_RATE_LIMIT),
    "RateLimit-Remaining": String(Math.max(0, Math.min(API_RATE_LIMIT, remaining))),
    "RateLimit-Reset": String(API_RATE_LIMIT_WINDOW_SECONDS),
  };
}

function getApiHeaders(
  request: Request,
  cacheControl = "public, max-age=60, s-maxage=300",
  requestId = getRequestId(request),
  remaining = getRateLimitSnapshot(request, false).remaining,
  apiVersion: string | null = API_VERSION_HEADER,
) {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": cacheControl,
    ...(apiVersion ? { "X-API-Version": apiVersion } : {}),
    "X-Request-ID": requestId,
    ...getRateLimitHeaders(remaining),
  };
}

export function rateLimitGuard(request: Request) {
  const snapshot = getRateLimitSnapshot(request, true);
  if (!snapshot.limited) return null;

  return jsonApiError(
    request,
    429,
    "RATE_LIMIT_EXCEEDED",
    "요청 한도를 초과했습니다.",
    "RateLimit-Reset과 Retry-After에 표시된 시간만큼 기다린 뒤 다시 시도하세요.",
    { retryAfter: snapshot.resetInSeconds, remaining: 0 },
  );
}

export function jsonApi<T>(request: Request, data: T, init: ResponseInit = {}) {
  return Response.json(
    { data },
    {
      ...init,
      headers: {
        ...getApiHeaders(request),
        ...(init.headers || {}),
      },
    },
  );
}

export function jsonApiError(
  request: Request,
  status: number,
  code: string,
  message: string,
  hint: string,
  options: { docsPath?: string; retryAfter?: number; allowMethods?: string[]; remaining?: number; apiVersion?: string | null } = {},
) {
  const requestId = getRequestId(request);
  const headers: Record<string, string> = {
    ...getApiHeaders(request, "no-store", requestId, options.remaining, options.apiVersion),
    ...(options.retryAfter === undefined
      ? {}
      : { "Retry-After": String(options.retryAfter) }),
    ...(options.allowMethods?.length
      ? { Allow: options.allowMethods.join(", ") }
      : {}),
  };

  return Response.json(
    {
      error: {
        code,
        message,
        hint,
        docs: absoluteUrl(options.docsPath || "/developers"),
        requestId,
      },
    } satisfies ApiErrorResponse,
    { status, headers },
  );
}

export function methodNotAllowed(request: Request, allowedMethods = ["GET", "OPTIONS"]) {
  return jsonApiError(
    request,
    405,
    "METHOD_NOT_ALLOWED",
    "이 리소스는 요청한 HTTP 메서드를 지원하지 않습니다.",
    `지원하는 메서드: ${allowedMethods.join(", ")}.`,
    { docsPath: "/developers", allowMethods: allowedMethods },
  );
}

export function optionsResponse(request: Request, allowedMethods = ["GET", "OPTIONS"]) {
  return new Response(null, {
    status: 204,
    headers: {
      ...getApiHeaders(request, "no-store"),
      Allow: allowedMethods.join(", "),
    },
  });
}

export function getApiProfile(): ApiProfile {
  return {
    brand: SITE_BRAND,
    name: PERSON_NAME,
    alternateName: "Kim Junha",
    jobTitle: PERSON_JOB_TITLE,
    description: SITE_DESCRIPTION,
    topics: TECHNICAL_TOPICS,
    email: CONTACT_EMAIL,
    urls: {
      home: absoluteUrl("/"),
      projects: absoluteUrl("/projects"),
      blog: absoluteUrl("/blog"),
      github: GITHUB_URL,
      linkedin: LINKEDIN_URL,
      developerResources: absoluteUrl("/developers"),
      agentInstructions: absoluteUrl("/agent-instructions.md"),
    },
  };
}

function contentSummary(post: MDXPost, kind: "blog" | "projects"): ApiContentSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    ...(kind === "projects"
      ? { category: post.projectCategory || post.category, role: post.role }
      : { category: post.category, section: post.section }),
    tags: post.tags || [],
    date: post.date,
    lastModified: post.lastModified,
    url: absoluteUrl(`/${kind}/${post.slug}`),
    rawUrl: absoluteUrl(`/${kind}/${post.slug}/raw`),
  };
}

export function getApiContentSummaries(kind: "blog" | "projects") {
  return getAllPosts(kind)
    .filter((post) => post.published)
    .map((post) => contentSummary(post, kind));
}

export function getApiContentSummary(post: MDXPost, kind: "blog" | "projects") {
  return contentSummary(post, kind);
}
