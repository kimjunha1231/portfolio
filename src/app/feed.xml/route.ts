import { getAllPosts } from "@/lib/mdx";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function GET() {
  const posts = getAllPosts("blog");

  const itemsXml = posts
    .map((post) => {
      const postUrl = new URL(`/blog/${post.slug}`, SITE_URL).toString();
      const pubDate = post.date
        ? new Date(post.date).toUTCString()
        : new Date().toUTCString();

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description || post.title}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ""}
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <link>${new URL("/blog", SITE_URL).toString()}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${new URL("/rss.xml", SITE_URL).toString()}" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
