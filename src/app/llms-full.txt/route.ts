import { estimateTokens } from "@/lib/mdx";
import { getLlmsFullText } from "@/lib/ai-context";

const content = getLlmsFullText();

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "x-markdown-tokens": String(estimateTokens(content)),
    },
  });
}
