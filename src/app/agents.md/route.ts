import { getSkillMarkdown } from "@/lib/ai-context";
import { estimateTokens } from "@/lib/mdx";

const content = getSkillMarkdown();

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Vary": "Accept",
      "x-markdown-tokens": String(estimateTokens(content)),
    },
  });
}
