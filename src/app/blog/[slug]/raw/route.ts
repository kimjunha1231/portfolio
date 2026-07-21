import { getPostBySlug, estimateTokens, toRawMarkdown } from "@/lib/mdx";

interface RawBlogRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: RawBlogRouteProps) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = toRawMarkdown(post);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Length": String(new TextEncoder().encode(markdown).length),
      "X-AI-Token-Count": String(estimateTokens(markdown)),
      "x-markdown-tokens": String(estimateTokens(markdown)),
      "Vary": "Accept",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
