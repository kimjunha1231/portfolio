import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar, ExternalLink } from "lucide-react";
import { getPostBySlug, getPostSlugs, toRawMarkdown } from "@/lib/mdx";
import {
  getContentCanonicalUrl,
  getContentMetadata,
  getContentStructuredData,
} from "@/lib/seo";
import { PERSON_NAME } from "@/lib/site";
import CopyMarkdownButton from "@/components/shared/CopyMarkdownButton";
import StructuredData from "@/components/shared/StructuredData";
import ZoomableImage from "@/components/shared/ZoomableImage";
import {
  PROJECT_PLATFORM_LABELS,
  PROJECT_ROLE_LABELS,
} from "@/lib/project-taxonomy";

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
  const rawMarkdownUrl = `${getContentCanonicalUrl(project, "projects")}/raw`;

  return (
    <article aria-labelledby="project-post-title" className="min-h-screen py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full relative z-10">
      <StructuredData
        id="project-post-structured-data"
        data={getContentStructuredData(project, "projects")}
      />

      <header className="mb-12 pb-8 border-b border-card-border">
        <h1 id="project-post-title" className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
          {project.title}
        </h1>

        {project.description && (
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/70 mb-6">
            {project.description}
          </p>
        )}

        {(project.platforms?.length || project.role) && (
          <div
            className="mb-6 flex flex-wrap gap-2"
            aria-label="프로젝트 플랫폼과 담당 역할"
          >
            {project.platforms?.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-card-border px-3 py-1.5 text-[10px] font-mono text-foreground/65"
              >
                플랫폼 · {PROJECT_PLATFORM_LABELS[platform]}
              </span>
            ))}
            {project.role && (
              <span className="rounded-full bg-accent-blue/10 px-3 py-1.5 text-[10px] font-mono text-accent-blue dark:bg-accent-blue/20">
                담당 역할 · {PROJECT_ROLE_LABELS[project.role]}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-foreground/70">
          <div className="flex items-center gap-4">
            <span>
              작성자 <Link href="/" className="hover:text-accent-blue transition-colors">{PERSON_NAME}</Link>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/35" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>작성일</span>
              <time dateTime={project.date}>{project.date}</time>
              <span aria-hidden="true">·</span>
              <span>수정일</span>
              <time dateTime={project.lastModified}>{project.lastModified}</time>
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
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-xs font-mono text-foreground/70 transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
                aria-label={`${project.title} GitHub 저장소`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>GitHub 저장소</span>
              </a>
            )}
            <CopyMarkdownButton content={rawMarkdownContent} />
          </div>
        </div>
      </header>

      {project.cover && (
        <figure className="mb-12 overflow-hidden rounded-3xl border border-card-border bg-foreground/5">
          <div className="relative aspect-[1.91]">
            <ZoomableImage
              src={project.cover}
              alt={project.coverAlt || `${project.title} 대표 이미지`}
              sizes="(max-width: 896px) 100vw, 896px"
              loading="eager"
              className={project.coverFit === "contain" ? "h-full w-full object-contain p-10" : "h-full w-full object-cover"}
            />
          </div>
          <figcaption className="sr-only">{project.coverAlt || `${project.title} 대표 이미지`}</figcaption>
        </figure>
      )}

      <div className="markdown-content">
        <MDXRemote
          source={project.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ img: ZoomableImage, ZoomableImage }}
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
