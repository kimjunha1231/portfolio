import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar } from "lucide-react";
import { getPostBySlug, getPostSlugs, toRawMarkdown } from "@/lib/mdx";
import {
  getContentMetadata,
  getContentStructuredData,
} from "@/lib/seo";
import { PERSON_NAME } from "@/lib/site";
import CopyMarkdownButton from "@/components/shared/CopyMarkdownButton";
import StructuredData from "@/components/shared/StructuredData";

interface ProjectPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPostBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  return getContentMetadata(project, "projects");
}

export default async function ProjectPostPage({ params }: ProjectPostPageProps) {
  const { slug } = await params;
  const project = getPostBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  const rawMarkdownContent = toRawMarkdown(project);

  return (
    <article className="min-h-screen py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full relative z-10">
      <StructuredData
        id="project-post-structured-data"
        data={getContentStructuredData(project, "projects")}
      />

      <header className="mb-12 pb-8 border-b border-card-border">
        {project.category && (
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-accent-blue bg-accent-blue/10 dark:bg-accent-blue/20 px-3 py-1 rounded-full w-max block mb-4">
            {project.category}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
          {project.title}
        </h1>

        {project.description && (
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/70 mb-6">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-foreground/70">
          <div className="flex items-center gap-4">
            <span>
              작성자 <Link href="/" className="hover:text-accent-blue transition-colors">{PERSON_NAME}</Link>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/35" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>최종 업데이트</span>
              <time dateTime={project.lastModified}>
                {project.lastModified}
              </time>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CopyMarkdownButton content={rawMarkdownContent} />
          </div>
        </div>
      </header>

      {project.cover && (
        <figure className="mb-12 overflow-hidden rounded-3xl border border-card-border bg-foreground/5">
          <div className="relative aspect-[1.91]">
            <Image
              src={project.cover}
              alt={project.coverAlt || `${project.title} 대표 이미지`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className={project.coverFit === "contain" ? "object-contain p-10" : "object-cover"}
            />
          </div>
          <figcaption className="sr-only">{project.coverAlt || `${project.title} 대표 이미지`}</figcaption>
        </figure>
      )}

      <div className="markdown-content">
        <MDXRemote
          source={project.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <footer className="mt-20 pt-8 border-t border-card-border flex items-center justify-between">
        <Link href="/projects" className="text-xs font-mono text-foreground/65 hover:text-accent-blue transition-colors">
          &larr; View other projects
        </Link>
        <span className="text-[10px] font-mono text-foreground/60">Junha.dev &copy; 2026</span>
      </footer>
    </article>
  );
}
