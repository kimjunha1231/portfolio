import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight, Calendar, ListTree } from "lucide-react";
import ArticleTableOfContents from "@/components/shared/ArticleTableOfContents";
import CopyMarkdownButton from "@/components/shared/CopyMarkdownButton";
import HandbookOutline from "@/components/handbook/HandbookOutline";
import StructuredData from "@/components/shared/StructuredData";
import VideoLink from "@/components/shared/VideoLink";
import ZoomableImage from "@/components/shared/ZoomableImage";
import {
  countHandbookTopics,
  HANDBOOK_SECTIONS,
  getHandbookPosts,
  getHandbookSection,
  summarizeHandbookProgress,
} from "@/lib/handbook";
import {
  getAllPosts,
  getLatestLastModified,
  getPostBySlug,
  toCleanMarkdown,
} from "@/lib/mdx";
import {
  getContentMetadata,
  getContentRawUrl,
  getContentStructuredData,
} from "@/lib/seo";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";
import { getMarkdownHeadings, rehypeHeadingIds } from "@/lib/mdx-headings";

interface HandbookPageProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const sections = HANDBOOK_SECTIONS.map((section) => ({ slug: section.slug.split("/") }));
  const posts = getAllPosts("handbook")
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug.split("/") }));

  return [...sections, ...posts];
}

export async function generateMetadata({ params }: HandbookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const post = getPostBySlug("handbook", slugPath);

  if (post?.published) return getContentMetadata(post, "handbook");

  const section = getHandbookSection(slugPath);
  if (!section) notFound();

  const canonicalPath = `/handbook/${section.slug}`;
  return {
    title: `${section.label} 학습 목차`,
    description: section.description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${section.label} 학습 목차 | Web Engineering Handbook`,
      description: section.description,
      type: "website",
      url: new URL(canonicalPath, SITE_URL).toString(),
    },
  };
}

export default async function HandbookRoutePage({ params }: HandbookPageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const post = getPostBySlug("handbook", slugPath);

  if (post?.published) {
    const headings = getMarkdownHeadings(post.content);
    const cleanMarkdownContent = toCleanMarkdown(post);
    const rawMarkdownUrl = getContentRawUrl(post, "handbook");
    const parentSection = HANDBOOK_SECTIONS.find((section) => section.contentSection === post.section);

    return (
      <article
        aria-labelledby="handbook-article-title"
        className="relative z-10 mx-auto min-h-screen w-full max-w-4xl px-6 py-20 md:px-12 md:py-24"
      >
        <StructuredData
          id="handbook-article-structured-data"
          data={getContentStructuredData(post, "handbook")}
        />
        <header className="mb-10 border-b border-card-border pb-8 md:mb-12 md:pb-10">
          <Link
            href={parentSection ? `/handbook/${parentSection.slug}` : "/handbook"}
            className="mb-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50 transition-colors hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {parentSection?.label ?? "Web Engineering Handbook"}
          </Link>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-blue">
            {post.section}{post.category ? ` / ${post.category}` : ""}
          </p>
          <h1
            id="handbook-article-title"
            className="break-keep text-3xl font-light leading-tight tracking-tight [text-wrap:balance] sm:text-4xl md:text-5xl"
          >
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/65 md:text-base">
              {post.description}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-4 text-[11px] font-mono text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <span>작성</span>
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <span>수정 <time dateTime={post.lastModified}>{post.lastModified}</time></span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={rawMarkdownUrl}
                className="underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-accent-blue hover:decoration-accent-blue/40"
                rel="alternate"
                type="text/markdown"
              >
                원문 Markdown
              </a>
              <CopyMarkdownButton content={cleanMarkdownContent} />
            </div>
          </div>
          {post.tags && post.tags.length > 0 && (
            <ul aria-label="문서 주제" className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-card-border px-2.5 py-1 font-mono text-[10px] text-foreground/50">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <ArticleTableOfContents headings={headings} />
        <div className="markdown-content">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHeadingIds] } }}
            components={{
              img: ZoomableImage,
              VideoLink,
              ZoomableImage,
            }}
          />
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t border-card-border pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={parentSection ? `/handbook/${parentSection.slug}` : "/handbook"}
            className="text-foreground/55 transition-colors hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            &larr; 목차로 돌아가기
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-foreground/55 transition-colors hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            실제 문제 해결 기록 보기 <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </footer>
      </article>
    );
  }

  const section = getHandbookSection(slugPath);
  if (!section) notFound();

  const sectionPosts = getHandbookPosts(section);
  const progress = summarizeHandbookProgress(section.topics);
  const lastModified = getLatestLastModified(sectionPosts, SITE_LAST_MODIFIED);
  const canonicalPath = `/handbook/${section.slug}`;

  return (
    <main
      aria-labelledby="handbook-section-title"
      className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-6 py-20 md:px-12 md:py-24 lg:px-16"
    >
      <StructuredData
        id={`handbook-section-${section.slug}-structured-data`}
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${new URL(canonicalPath, SITE_URL).toString()}#collection`,
          url: new URL(canonicalPath, SITE_URL).toString(),
          name: `${section.label} 학습 목차`,
          description: section.description,
          dateModified: lastModified,
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: sectionPosts.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: new URL(`/handbook/${item.slug}`, SITE_URL).toString(),
            })),
          },
        }}
      />

      <header className="mb-12 border-b border-card-border/70 pb-8 md:mb-14 md:pb-10">
        <Link
          href="/handbook"
          className="mb-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50 transition-colors hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Web Engineering Handbook
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-blue">
          {section.englishLabel}
        </p>
        <h1 id="handbook-section-title" className="mt-3 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          {section.label}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/60 md:text-base">
          {section.description}
        </p>
        <p className="mt-4 font-mono text-[11px] text-foreground/45">
          {countHandbookTopics(section.topics)}개 주제 · {sectionPosts.length}개 공개 문서
        </p>
        <p
          aria-label="현재 영역의 작성 상태"
          className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-foreground/50"
        >
          <span>{progress.notStarted} 작성 전</span>
          <span>{progress.learning} 학습 중</span>
          <span>{progress.completed} 작성 완료</span>
        </p>
      </header>

      <section aria-labelledby="section-outline-title" className="mb-14">
        <div className="mb-5 flex items-center gap-2">
          <ListTree className="h-4 w-4 text-accent-blue" aria-hidden="true" />
          <h2 id="section-outline-title" className="text-lg font-medium tracking-tight">학습 목차</h2>
        </div>
        <HandbookOutline topics={section.topics} />
      </section>

      {sectionPosts.length > 0 && (
        <section aria-labelledby="section-articles-title">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-card-border pb-4">
            <h2 id="section-articles-title" className="text-lg font-medium tracking-tight">채워진 문서</h2>
            <span className="font-mono text-[10px] text-foreground/45">{sectionPosts.length.toString().padStart(2, "0")}</span>
          </div>
          <ul className="divide-y divide-card-border border-y border-card-border">
            {sectionPosts.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/handbook/${item.slug}`}
                  className="group block py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-blue/80">
                    {item.category || item.section}
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-4 text-base font-medium transition-colors group-hover:text-accent-blue md:text-lg">
                    {item.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35 transition-colors group-hover:text-accent-blue" aria-hidden="true" />
                  </span>
                  {item.description && (
                    <span className="mt-2 block max-w-3xl text-xs leading-relaxed text-foreground/55">
                      {item.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-16 border-t border-card-border pt-6 text-xs text-foreground/45">
        <Link href="/blog" className="transition-colors hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue">
          개념이 실제 문제에서 어떻게 쓰였는지 기술 블로그에서 보기 →
        </Link>
      </footer>
    </main>
  );
}
