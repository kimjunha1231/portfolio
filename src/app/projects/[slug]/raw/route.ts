import { getPostBySlug, estimateTokens, toRawMarkdown } from "@/lib/mdx";

interface RawProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: RawProjectRouteProps) {
  const { slug } = await params;
  const project = getPostBySlug("projects", slug);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = toRawMarkdown(project);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Length": String(new TextEncoder().encode(markdown).length),
      "X-AI-Token-Count": String(estimateTokens(markdown)),
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
