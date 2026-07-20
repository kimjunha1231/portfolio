import { getSkillMarkdown } from "@/lib/ai-context";

export function GET() {
  return new Response(getSkillMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
