import { SITE_URL } from "@/lib/site";

const content = `User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: NaverBot
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: Yeti
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: GPTBot
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /_next/
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /_next/
Disallow: /api/

Sitemap: ${new URL("/sitemap.xml", SITE_URL).toString()}
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
