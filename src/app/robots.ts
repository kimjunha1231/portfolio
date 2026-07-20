import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: ["Googlebot", "NaverBot", "Yeti", "OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
