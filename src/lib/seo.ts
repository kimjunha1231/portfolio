import type { Metadata } from "next";
import { estimateTokens, toRawMarkdown, type MDXPost } from "@/lib/mdx";
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

export type ContentKind = "blog" | "projects";

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

export function getContentCanonicalUrl(post: MDXPost, kind: ContentKind) {
  return new URL(`/${kind === "blog" ? "blog" : "projects"}/${post.slug}`, SITE_URL).toString();
}

export function getContentMetadata(
  post: MDXPost,
  kind: ContentKind,
): Metadata {
  const canonicalUrl = getContentCanonicalUrl(post, kind);
  const rawUrl = `${canonicalUrl}/raw`;
  const description = getContentDescription(post);
  const keywords = getContentKeywords(post);
  const image = getContentImage(post);
  const section = post.category;

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
    other: {
      "ai-content-format": "markdown",
      "ai-content-url": rawUrl,
      "ai-token-count": String(estimateTokens(toRawMarkdown(post))),
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
    wordCount: estimateWordCount(post.content),
    inLanguage: "ko-KR",
  };

  const collectionName = kind === "blog" ? "기술 블로그" : "프로젝트 쇼케이스";
  const collectionPath = kind === "blog" ? "/blog" : "/projects";

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
