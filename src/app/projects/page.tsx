import React from "react";
import Link from "next/link";
import BentoProjects from "@/components/home/BentoProjects";
import type { Metadata } from "next";
import StructuredData from "@/components/shared/StructuredData";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import {
  PROJECT_ROLE_LABELS,
  PROJECT_ROLES,
  type ProjectRole,
} from "@/lib/project-taxonomy";
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

type ProjectsListPageProps = {
  searchParams: Promise<{
    role?: string | string[];
  }>;
};

type ProjectFilters = {
  role: ProjectRole | "all";
};

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getFilterHref(current: ProjectFilters, updates: Partial<ProjectFilters>) {
  const filters = { ...current, ...updates };
  const query = new URLSearchParams();

  if (filters.role !== "all") query.set("role", filters.role);

  const queryString = query.toString();
  return queryString ? `/projects?${queryString}` : "/projects";
}

function FilterGroup({
  label,
  options,
  selected,
  current,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  selected: string;
  current: ProjectFilters;
}) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.value === selected;

          return (
            <Link
              key={option.value}
              href={getFilterHref(current, {
                role: option.value as ProjectRole | "all",
              })}
              aria-current={isSelected ? "page" : undefined}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isSelected
                  ? "border-accent-blue bg-accent-blue text-white"
                  : "border-card-border text-foreground/60 hover:border-accent-blue/50 hover:text-accent-blue"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default async function ProjectsListPage({ searchParams }: ProjectsListPageProps) {
  const params = await searchParams;
  const posts = getAllPosts("projects");
  const requestedRole = getSearchParam(params.role) || "all";
  const selectedRole = PROJECT_ROLES.includes(requestedRole as ProjectRole)
    ? (requestedRole as ProjectRole)
    : "all";
  const currentFilters: ProjectFilters = {
    role: selectedRole,
  };

  const visiblePosts = posts.filter((project) => {
    const matchesRole = selectedRole === "all" || project.role === selectedRole;

    return matchesRole;
  });

  const projects = visiblePosts.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.projectCategory || project.category || "Project Case Study",
    platforms: project.platforms,
    role: project.role,
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
          dateModified: getLatestLastModified(visiblePosts, SITE_LAST_MODIFIED),
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: visiblePosts.map((project, index) => ({
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

      <div className="mb-12 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            Selected work
          </span>
          <h2 className="mt-3 text-3xl font-light tracking-tight md:text-5xl">
            프로젝트를 담당 역할로 나눠 확인할 수 있습니다.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">
            각 프로젝트에서 제가 맡은 역할을 기준으로 프로젝트를 살펴볼 수 있습니다.
          </p>

          <div className="mt-8 space-y-4" aria-label="프로젝트 필터">
            <FilterGroup
              label="Role"
              options={[
                { value: "all", label: "전체" },
                ...PROJECT_ROLES.map((role) => ({
                  value: role,
                  label: PROJECT_ROLE_LABELS[role],
                })),
              ]}
              selected={selectedRole}
              current={currentFilters}
            />
          </div>

          <p className="mt-6 font-mono text-[10px] text-foreground/45">
            {visiblePosts.length}개의 프로젝트
          </p>
        </div>
      </div>

      {/* 벤토 그리드 프로젝트 리스트 마운트 */}
      <div className="flex-1 -mx-6 md:-mx-12 lg:-mx-24">
        {projects.length > 0 ? (
          <BentoProjects projects={projects} />
        ) : (
          <div className="mx-auto max-w-7xl px-6 py-20 text-center text-sm text-foreground/50 md:px-12 lg:px-24">
            선택한 조건에 해당하는 프로젝트가 없습니다.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-card-border text-[10px] font-mono text-foreground/45 flex items-center justify-between w-full">
        <span>김준하 &copy; 2026</span>
        <span>Developing high performance products.</span>
      </footer>

    </main>
  );
}
