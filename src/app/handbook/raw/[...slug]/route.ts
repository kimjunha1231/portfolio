import { estimateTokens, getPostBySlug, toRawMarkdown } from "@/lib/mdx";
import { getRateLimitHeaders, jsonApiError } from "@/lib/api";

interface RawHandbookRouteProps {
  params: Promise<{ slug: string[] }>;
}

export async function GET(request: Request, { params }: RawHandbookRouteProps) {
  const { slug } = await params;
  const post = getPostBySlug("handbook", slug.join("/"));

  if (!post || !post.published) {
    return jsonApiError(
      request,
      404,
      "HANDBOOK_ARTICLE_NOT_FOUND",
      "공개된 핸드북 원문을 찾을 수 없습니다.",
      "정확한 경로를 확인한 뒤 /handbook 목차에서 공개 문서를 조회하세요.",
      { docsPath: "/handbook" },
    );
  }

  const markdown = toRawMarkdown(post);
  const tokenCount = estimateTokens(markdown);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Length": String(new TextEncoder().encode(markdown).length),
      "X-AI-Token-Count": String(tokenCount),
      "x-markdown-tokens": String(tokenCount),
      Vary: "Accept",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      ...getRateLimitHeaders(),
    },
  });
}
