import React from "react";
import BentoProjects from "@/components/home/BentoProjects";
import type { Metadata } from "next";
import StructuredData from "@/components/shared/StructuredData";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import { SITE_DESCRIPTION, SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "프로젝트 쇼케이스",
  description:
    "Next.js, React, Flutter, AI, 실시간 통신과 웹 성능 최적화를 적용한 김준하의 프로젝트 케이스 스터디 모음입니다.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "프로젝트 쇼케이스 | 김준하",
    description:
      "프론트엔드와 풀스택 개발, AI 서비스, 웹 성능 최적화 프로젝트를 소개합니다.",
    type: "website",
    url: new URL("/projects", SITE_URL).toString(),
  },
};

export default function ProjectsListPage() {
  const posts = getAllPosts("projects");
  const projects = posts.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category || "Project Case Study",
    description: project.description || "김준하의 프로젝트 기술 사례입니다.",
    tags: project.tags || [],
    cover: project.cover,
    coverAlt: project.coverAlt,
    coverFit: project.coverFit,
    lastModified: project.lastModified,
  }));

  return (
    <main
      aria-labelledby="projects-heading"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between max-w-7xl mx-auto w-full relative z-10"
    >
      <StructuredData
        id="projects-list-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL.toString()}/projects#collection`,
          url: new URL("/projects", SITE_URL).toString(),
          name: "프로젝트 쇼케이스",
          description: SITE_DESCRIPTION,
          dateModified: getLatestLastModified(posts, SITE_LAST_MODIFIED),
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.title,
              url: new URL(`/projects/${project.slug}`, SITE_URL).toString(),
            })),
          },
        }}
      />

      <h1 id="projects-heading" className="sr-only">
        프로젝트 쇼케이스
      </h1>
      
      {/* 벤토 그리드 프로젝트 리스트 마운트 */}
      <div className="flex-1 -mx-6 md:-mx-12 lg:-mx-24">
        <BentoProjects projects={projects} />
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-card-border text-[10px] font-mono text-foreground/45 flex items-center justify-between w-full">
        <span>김준하 &copy; 2026</span>
        <span>Developing high performance products.</span>
      </footer>

    </main>
  );
}
