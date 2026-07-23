import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar } from "lucide-react";
import { getPostBySlug, getPostSlugs, toCleanMarkdown } from "@/lib/mdx";
import {
  getContentCanonicalUrl,
  getContentMetadata,
  getContentStructuredData,
} from "@/lib/seo";
import { PERSON_NAME } from "@/lib/site";
import CopyMarkdownButton from "@/components/shared/CopyMarkdownButton";
import StructuredData from "@/components/shared/StructuredData";
import ZoomableImage from "@/components/shared/ZoomableImage";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  return getContentMetadata(post, "blog");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const cleanMarkdownContent = toCleanMarkdown(post);
  const rawMarkdownUrl = `${getContentCanonicalUrl(post, "blog")}/raw`;

  return (
    <article aria-labelledby="blog-post-title" className="min-h-screen py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full relative z-10">
      <StructuredData
        id="blog-post-structured-data"
        data={getContentStructuredData(post, "blog")}
      />
      <header className="mb-12 pb-8 border-b border-card-border">
        <h1 id="blog-post-title" className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {post.description && (
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/70 mb-6">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-foreground/50">
          <div className="flex items-center gap-4">
            <span>
              작성자 <Link href="/" className="hover:text-accent-blue transition-colors">{PERSON_NAME}</Link>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>작성일</span>
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>수정일</span>
              <time dateTime={post.lastModified}>{post.lastModified}</time>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={rawMarkdownUrl}
              className="text-[10px] font-mono text-foreground/55 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-accent-blue hover:decoration-accent-blue/40"
              rel="alternate"
              type="text/markdown"
            >
              원문 Markdown
            </a>
            <CopyMarkdownButton content={cleanMarkdownContent} />
          </div>
        </div>
      </header>

      {post.cover && (
        <figure className="mb-12 overflow-hidden rounded-3xl border border-card-border bg-foreground/5">
          <div className="relative aspect-[1.91]">
            <Image
              src={post.cover}
              alt={post.coverAlt || `${post.title} 대표 이미지`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className={post.coverFit === "contain" ? "object-contain p-10" : "object-cover"}
            />
          </div>
          <figcaption className="sr-only">{post.coverAlt || `${post.title} 대표 이미지`}</figcaption>
        </figure>
      )}

      <div className="markdown-content">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ ZoomableImage }}
        />
      </div>

      <footer className="mt-20 pt-8 border-t border-card-border flex items-center justify-between">
        <Link href="/blog" className="text-xs font-mono text-foreground/50 hover:text-accent-blue transition-colors">
          &larr; All posts
        </Link>
        <span className="text-[10px] font-mono text-foreground/40">Junha.dev &copy; 2026</span>
      </footer>
    </article>
  );
}
