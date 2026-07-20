import { getLlmsFullText } from "@/lib/ai-context";

export function GET() {
  return new Response(getLlmsFullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
