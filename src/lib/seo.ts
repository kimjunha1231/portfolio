import type { Metadata } from "next";
import { estimateTokens, toRawMarkdown, type ContentGeo, type MDXPost } from "@/lib/mdx";
import {
  formatVideoDuration,
  type SiteVideo,
} from "@/lib/videos";
import {
  absoluteUrl,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_NAME,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
  formatDateForSchema,
} from "@/lib/site";

export type ContentKind = "blog" | "projects" | "handbook";

function getContentDescription(post: MDXPost) {
  return post.description || `${post.title} - ${SITE_NAME}`;
}

function getContentKeywords(post: MDXPost) {
  return post.tags?.length
    ? post.tags
    : post.category
      ? [post.category]
      : undefined;
}

function getContentImage(post: MDXPost) {
  return post.cover ? absoluteUrl(post.cover) : absoluteUrl(SOCIAL_IMAGE_PATH);
}

function getGeoPlace(geo: ContentGeo) {
  return {
    "@type": "Place",
    name: geo.name,
    ...(geo.region || geo.country
      ? {
          address: {
            "@type": "PostalAddress",
            ...(geo.region ? { addressRegion: geo.region } : {}),
            ...(geo.country ? { addressCountry: geo.country } : {}),
          },
        }
      : {}),
    ...(typeof geo.latitude === "number" && typeof geo.longitude === "number"
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
  };
}

export function getContentCanonicalUrl(post: MDXPost, kind: ContentKind) {
  return new URL(`/${kind}/${post.slug}`, SITE_URL).toString();
}

export function getContentRawUrl(post: MDXPost, kind: ContentKind) {
  if (kind === "handbook") {
    return new URL(`/handbook/raw/${post.slug}`, SITE_URL).toString();
  }

  return `${getContentCanonicalUrl(post, kind)}/raw`;
}

export function getContentMetadata(
  post: MDXPost,
  kind: ContentKind,
): Metadata {
  const canonicalUrl = getContentCanonicalUrl(post, kind);
  const rawUrl = getContentRawUrl(post, kind);
  const description = getContentDescription(post);
  const keywords = getContentKeywords(post);
  const image = getContentImage(post);
  const section = post.category;
  const geoHints = post.geo
    ? {
        "geo.placename": post.geo.name,
        ...(post.geo.region ? { "geo.region": post.geo.region } : {}),
        ...(typeof post.geo.latitude === "number" && typeof post.geo.longitude === "number"
          ? { "geo.position": `${post.geo.latitude};${post.geo.longitude}` }
          : {}),
      }
    : {};

  return {
    title: post.title,
    description,
    keywords,
    authors: [{ name: PERSON_NAME, url: SITE_URL.toString() }],
    alternates: {
      canonical: canonicalUrl,
      types: { "text/markdown": rawUrl },
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: SITE_NAME,
      publishedTime: formatDateForSchema(post.date),
      modifiedTime: formatDateForSchema(post.lastModified),
      authors: [PERSON_NAME],
      section,
      tags: keywords,
      images: [
        {
          url: image,
          alt: post.coverAlt || `${post.title} 대표 이미지`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "ai-content-format": "markdown",
      "ai-content-url": rawUrl,
      "ai-token-count": String(estimateTokens(toRawMarkdown(post))),
      "ai-summary": description,
      "ai-keywords": keywords?.join(", ") || "",
      ...geoHints,
    },
  };
}

function estimateWordCount(content: string) {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

export function getContentStructuredData(
  post: MDXPost,
  kind: ContentKind,
) {
  const canonicalUrl = getContentCanonicalUrl(post, kind);
  const keywords = getContentKeywords(post);
  const articleType = kind === "blog" ? "BlogPosting" : "TechArticle";
  const article = {
    "@context": "https://schema.org",
    "@type": articleType,
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: canonicalUrl,
    headline: post.title,
    description: getContentDescription(post),
    ...(post.cover ? { image: [absoluteUrl(post.cover)] } : {}),
    datePublished: formatDateForSchema(post.date),
    dateModified: formatDateForSchema(post.lastModified),
    author: {
      "@id": `${SITE_URL.toString()}#person`,
      name: PERSON_NAME,
      url: SITE_URL.toString(),
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
    publisher: { "@id": `${SITE_URL.toString()}#person` },
    isPartOf: { "@id": `${SITE_URL.toString()}#website` },
    ...(post.category ? { articleSection: post.category } : {}),
    ...(keywords ? { keywords } : {}),
    ...(post.geo
      ? {
          contentLocation: getGeoPlace(post.geo),
          spatialCoverage: getGeoPlace(post.geo),
        }
      : {}),
    wordCount: estimateWordCount(post.content),
    inLanguage: "ko-KR",
  };

  const collectionName = kind === "blog"
    ? "기술 블로그"
    : kind === "projects"
      ? "프로젝트 쇼케이스"
      : "Frontend Handbook";
  const collectionPath = `/${kind}`;

  return [
    article,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: SITE_URL.toString(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: collectionName,
          item: absoluteUrl(collectionPath),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },
  ];
}

export function getVideoCanonicalUrl(video: SiteVideo) {
  return new URL(`/videos/${video.slug}`, SITE_URL).toString();
}

export function getVideoMetadata(video: SiteVideo): Metadata {
  const canonicalUrl = getVideoCanonicalUrl(video);
  const thumbnailUrl = absoluteUrl(video.thumbnail);

  return {
    title: video.title,
    description: video.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: video.title,
      description: video.description,
      type: "website",
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: thumbnailUrl, alt: video.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [thumbnailUrl],
    },
  };
}

export function getVideoStructuredData(video: SiteVideo) {
  const canonicalUrl = getVideoCanonicalUrl(video);
  const videoUrl = absoluteUrl(video.src);

  return [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${canonicalUrl}#video`,
      name: video.title,
      description: video.description,
      thumbnailUrl: [absoluteUrl(video.thumbnail)],
      uploadDate: formatDateForSchema(video.uploadDate),
      duration: formatVideoDuration(video.durationSeconds),
      contentUrl: videoUrl,
      mainEntityOfPage: canonicalUrl,
      isFamilyFriendly: true,
      publisher: { "@id": `${SITE_URL.toString()}#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: SITE_URL.toString(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "동영상",
          item: absoluteUrl("/videos"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: video.title,
          item: canonicalUrl,
        },
      ],
    },
  ];
}
