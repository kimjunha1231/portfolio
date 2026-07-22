import type { MetadataRoute } from "next";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import {
  formatDateForSitemap,
  SITE_LAST_MODIFIED,
  SITE_URL,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts("blog");
  const projects = getAllPosts("projects");
  const latestSiteUpdate = getLatestLastModified(
    [...blogPosts, ...projects, { lastModified: SITE_LAST_MODIFIED }],
    SITE_LAST_MODIFIED,
  );
  const latestBlogUpdate = getLatestLastModified(blogPosts, SITE_LAST_MODIFIED);
  const latestProjectUpdate = getLatestLastModified(projects, SITE_LAST_MODIFIED);

  return [
    {
      url: SITE_URL.toString(),
      lastModified: latestSiteUpdate,
    },
    {
      url: new URL("/projects", SITE_URL).toString(),
      lastModified: latestProjectUpdate,
    },
    {
      url: new URL("/blog", SITE_URL).toString(),
      lastModified: latestBlogUpdate,
    },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, SITE_URL).toString(),
      lastModified:
        formatDateForSitemap(project.lastModified) ?? SITE_LAST_MODIFIED,
    })),
    ...blogPosts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
      lastModified: formatDateForSitemap(post.lastModified) ?? SITE_LAST_MODIFIED,
    })),
  ];
}
