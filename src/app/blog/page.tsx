import React from "react";
import Link from "next/link";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import type { Metadata } from "next";
import StructuredData from "@/components/shared/StructuredData";
import BentoCards from "@/components/shared/BentoCards";
import { SITE_DESCRIPTION, SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";

const BLOG_SECTIONS = [
  { key: "all", label: "전체" },
  { key: "development-log", label: "개발 기록" },
  { key: "technical-note", label: "기술 노트" },
  { key: "reference", label: "레퍼런스" },
] as const;

type BlogListPageProps = {
  searchParams: Promise<{ section?: string | string[] }>;
};

const SECTION_LABELS: Record<string, string> = {
  "development-log": "개발 기록",
  "technical-note": "기술 노트",
  reference: "레퍼런스",
};

export const metadata: Metadata = {
  title: "기술 블로그",
  description:
    "프론트엔드 개발, 웹 애니메이션, 성능 최적화와 확장 가능한 아키텍처를 기록하는 김준하의 기술 블로그입니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "기술 블로그 | 김준하",
    description:
      "프론트엔드 개발, 웹 애니메이션과 성능 최적화에 대한 기술 기록입니다.",
    type: "website",
    url: new URL("/blog", SITE_URL).toString(),
  },
};

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const params = await searchParams;
  const requestedSection = typeof params.section === "string" ? params.section : "all";
  const selectedSection = BLOG_SECTIONS.some((section) => section.key === requestedSection)
    ? requestedSection
    : "all";
  const posts = getAllPosts("blog");
  const visiblePosts = selectedSection === "all"
    ? posts
    : posts.filter((post) => post.section === SECTION_LABELS[selectedSection]);
  const selectedSectionLabel = SECTION_LABELS[selectedSection] || "전체";
  const cards = visiblePosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category || "기술 기록",
    metaItems: [
      { label: "Section", value: post.section || "기술 기록" },
    ],
    description: post.description || "프론트엔드와 웹 개발에 대한 기술 기록입니다.",
    tags: post.tags || [],
    cover: post.cover,
    coverAlt: post.coverAlt,
    coverFit: post.coverFit,
    previewLabel: "Article preview",
    lastModified: post.lastModified,
  }));

  return (
    <main
      aria-labelledby="blog-heading"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between max-w-7xl mx-auto w-full relative z-10"
    >
      <StructuredData
        id="blog-list-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": new URL("/blog#collection", SITE_URL).toString(),
          url: new URL("/blog", SITE_URL).toString(),
          name: "기술 블로그",
          description: SITE_DESCRIPTION,
          dateModified: getLatestLastModified(visiblePosts, SITE_LAST_MODIFIED),
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: visiblePosts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: post.title,
              url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
            })),
          },
        }}
      />

      {/* Top Header */}
      <div>

        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-foreground/50">Tech Blog</span>
          <h1 id="blog-heading" className="text-4xl md:text-6xl font-light tracking-tight mt-2 leading-none">
            Tech <span className=" text-accent-blue">Blog</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-foreground/60">
            프론트엔드와 웹 애니메이션 최적화, 풀스택 아키텍처 구현 과정에서 얻은 깊이 있는 고찰과 기록입니다.
          </p>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
              Section
            </span>
            <nav aria-label="블로그 분류" className="flex flex-wrap gap-2">
              {BLOG_SECTIONS.map((section) => {
                const isSelected = section.key === selectedSection;
                const href = section.key === "all" ? "/blog" : `/blog?section=${section.key}`;

                return (
                  <Link
                    key={section.key}
                    href={href}
                    aria-current={isSelected ? "page" : undefined}
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isSelected
                        ? "border-accent-blue bg-accent-blue text-white"
                        : "border-card-border text-foreground/60 hover:border-accent-blue/50 hover:text-accent-blue"
                      }`}
                  >
                    {section.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {selectedSection !== "all" && (
              <p className="text-xs font-mono text-foreground/45">
                현재 분류: {selectedSectionLabel}
              </p>
            )}
            <p className="text-xs font-mono text-foreground/45">
              {visiblePosts.length}개의 글
            </p>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="flex-1 flex flex-col gap-6">
        {cards.length === 0 ? (
          <div className="text-center py-20 border border-card-border rounded-3xl glass-panel text-sm text-foreground/50">
            {selectedSection === "all"
              ? "작성된 기술 기록이 없습니다."
              : `${selectedSectionLabel}에 해당하는 글이 없습니다.`}
          </div>
        ) : (
          <div className="-mx-6 md:-mx-12 lg:-mx-24">
            <BentoCards
              items={cards}
              hrefPrefix="/blog"
              sectionLabel="기술 블로그 목록"
              detailLabel="글 상세 보기"
              actionLabel="Read article"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-card-border text-[10px] font-mono text-foreground/45 flex items-center justify-between">
        <span>Junha.dev &copy; 2026</span>
        <span>Insights and thought sharing.</span>
      </footer>

    </main>
  );
}
