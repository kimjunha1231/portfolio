import { getLlmsIndex } from "@/lib/ai-context";
import { estimateTokens } from "@/lib/mdx";

export function GET() {
  const content = getLlmsIndex();
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Vary": "Accept",
      "x-markdown-tokens": String(estimateTokens(content)),
    },
  });
}
