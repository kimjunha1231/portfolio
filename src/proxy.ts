import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getMarkdownPath(pathname: string) {
  if (pathname === "/") return "/index.md";
  if (pathname === "/projects") return "/projects.md";
  if (pathname === "/blog") return "/blog.md";

  const detailMatch = pathname.match(/^\/(projects|blog)\/([^/]+)$/);

  return detailMatch ? `/${detailMatch[1]}/${detailMatch[2]}/raw` : null;
}

function isKnownPagePath(pathname: string) {
  return [
    "/",
    "/projects",
    "/blog",
    "/handbook",
    "/videos",
    "/about",
    "/contact",
    "/privacy",
    "/developers",
    "/.well-known/mcp",
  ].includes(pathname) || /^\/(projects|blog|videos)\/[^/]+(?:\/raw)?$/.test(pathname) || /^\/handbook(?:\/.*)?$/.test(pathname);
}

const markdownNotFound = `# 404 Not Found

The requested path does not exist on Junha.dev.

- [Sitemap](/sitemap.xml)
- [Agent index](/llms.txt)
- [Developer resources](/developers)
- [Home](/)
`;

export function proxy(request: NextRequest) {
  const acceptsMarkdown = request.headers
    .get("accept")
    ?.toLowerCase()
    .includes("text/markdown");
  const markdownPath = getMarkdownPath(request.nextUrl.pathname);

  if (acceptsMarkdown && markdownPath) {
    return NextResponse.rewrite(new URL(markdownPath, request.url));
  }

  if (!isKnownPagePath(request.nextUrl.pathname)) {
    return new Response(markdownNotFound, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "X-Robots-Tag": "noindex, follow",
        "x-markdown-tokens": String(Math.max(1, Math.ceil(markdownNotFound.length / 4))),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|.*\\.[^/]+$).*)"],
};
