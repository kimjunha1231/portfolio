import type { MetadataRoute } from "next";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import { HANDBOOK_SECTIONS } from "@/lib/handbook";
import { getAllVideos } from "@/lib/videos";
import {
  formatDateForSitemap,
  SITE_LAST_MODIFIED,
  SITE_URL,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts("blog").filter((post) => post.published);
  const projects = getAllPosts("projects").filter((project) => project.published);
  const handbookPosts = getAllPosts("handbook").filter((post) => post.published);
  const latestSiteUpdate = getLatestLastModified(
    [...blogPosts, ...projects, ...handbookPosts, { lastModified: SITE_LAST_MODIFIED }],
    SITE_LAST_MODIFIED,
  );
  const latestBlogUpdate = getLatestLastModified(blogPosts, SITE_LAST_MODIFIED);
  const latestProjectUpdate = getLatestLastModified(projects, SITE_LAST_MODIFIED);
  const latestHandbookUpdate = getLatestLastModified(handbookPosts, SITE_LAST_MODIFIED);

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
    {
      url: new URL("/handbook", SITE_URL).toString(),
      lastModified: latestHandbookUpdate,
    },
    {
      url: new URL("/videos", SITE_URL).toString(),
      lastModified: getLatestLastModified(
        getAllVideos().map((video) => ({ lastModified: video.uploadDate })),
        SITE_LAST_MODIFIED,
      ),
    },
    ...["about", "contact", "privacy", "developers"].map((path) => ({
      url: new URL(`/${path}`, SITE_URL).toString(),
      lastModified: SITE_LAST_MODIFIED,
    })),
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, SITE_URL).toString(),
      lastModified:
        formatDateForSitemap(project.lastModified) ?? SITE_LAST_MODIFIED,
    })),
    ...blogPosts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
      lastModified: formatDateForSitemap(post.lastModified) ?? SITE_LAST_MODIFIED,
    })),
    ...HANDBOOK_SECTIONS.map((section) => ({
      url: new URL(`/handbook/${section.slug}`, SITE_URL).toString(),
      lastModified: latestHandbookUpdate,
    })),
    ...handbookPosts.map((post) => ({
      url: new URL(`/handbook/${post.slug}`, SITE_URL).toString(),
      lastModified: formatDateForSitemap(post.lastModified) ?? SITE_LAST_MODIFIED,
    })),
    ...getAllVideos().map((video) => ({
      url: new URL(`/videos/${video.slug}`, SITE_URL).toString(),
      lastModified: formatDateForSitemap(video.uploadDate) ?? SITE_LAST_MODIFIED,
    })),
  ];
}
