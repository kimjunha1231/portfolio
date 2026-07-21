import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getMarkdownPath(pathname: string) {
  if (pathname === "/") return "/index.md";
  if (pathname === "/projects") return "/projects.md";
  if (pathname === "/blog") return "/blog.md";

  const detailMatch = pathname.match(/^\/(projects|blog)\/([^/]+)$/);

  return detailMatch ? `/${detailMatch[1]}/${detailMatch[2]}/raw` : null;
}

export function proxy(request: NextRequest) {
  const acceptsMarkdown = request.headers
    .get("accept")
    ?.toLowerCase()
    .includes("text/markdown");
  const markdownPath = getMarkdownPath(request.nextUrl.pathname);

  if (acceptsMarkdown && markdownPath) {
    return NextResponse.rewrite(new URL(markdownPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/projects", "/projects/:slug", "/blog", "/blog/:slug"],
};
