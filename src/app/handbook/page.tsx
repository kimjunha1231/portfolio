import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpenText, ChevronRight } from "lucide-react";
import StructuredData from "@/components/shared/StructuredData";
import {
  countHandbookTopics,
  getHandbookPosts,
  HANDBOOK_NAV_GROUPS,
  HANDBOOK_SECTIONS,
  summarizeHandbookProgress,
} from "@/lib/handbook";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Engineering Handbook",
  description:
    "프론트엔드와 웹 애플리케이션 엔지니어링 지식을 공식 출처, 실험, 실무 연결을 기준으로 쌓는 학습 목차입니다.",
  alternates: { canonical: "/handbook" },
  openGraph: {
    title: "Web Engineering Handbook | 김준하",
    description:
      "Web Fundamentals, JavaScript, Browser, React, Next.js, Security, Performance를 연결한 학습 지도입니다.",
    type: "website",
    url: new URL("/handbook", SITE_URL).toString(),
  },
};

const learningSteps = [
  { number: "01", title: "Learn", detail: "공식 문서를 기준으로 개념을 읽습니다." },
  { number: "02", title: "Verify", detail: "직접 실행하고 관찰해 근거를 확인합니다." },
  { number: "03", title: "Explain", detail: "원문을 덮고 내 구조와 말로 다시 설명합니다." },
  { number: "04", title: "Connect", detail: "관련 개념과 실제 서비스 경험을 연결합니다." },
];

export default function HandbookPage() {
  const progress = summarizeHandbookProgress(
    HANDBOOK_SECTIONS.flatMap((section) => section.topics),
  );

  return (
    <main
      aria-labelledby="handbook-title"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-20 md:px-12 md:py-24 lg:px-24"
    >
      <StructuredData
        id="handbook-collection-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": new URL("/handbook#collection", SITE_URL).toString(),
          url: new URL("/handbook", SITE_URL).toString(),
          name: "Web Engineering Handbook",
          description: metadata.description,
          dateModified: SITE_LAST_MODIFIED,
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
        }}
      />

      <header className="mb-14 border-b border-card-border/70 pb-10 md:mb-16 md:pb-12">
        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          <BookOpenText className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
          <span>Frontend / Web Engineering</span>
        </div>
        <h1
          id="handbook-title"
          className="text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
        >
          Web Engineering <span className="text-accent-blue">Handbook</span>
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/65 md:text-base">
          웹의 기초부터 언어, 브라우저, React, 서버 경계, 보안과 성능까지 연결하는 지식 지도입니다.
          지금은 목차를 먼저 세우고, 각 주제는 근거와 실험을 갖춰 하나씩 채워갑니다.
        </p>
        <p className="mt-4 max-w-3xl border-l-2 border-accent-blue/50 pl-4 text-sm leading-relaxed text-foreground/65">
          공식 문서에서 사실을 확인하고, 기술 블로그에서 실무 맥락을 찾은 뒤,
          직접 검증한 설명으로 다시 구성합니다.
        </p>
      </header>

      <section aria-labelledby="learning-loop-title" className="mb-16">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              Learning principle
            </span>
            <h2 id="learning-loop-title" className="mt-2 text-xl font-medium tracking-tight md:text-2xl">
              Learn → Verify → Explain → Connect
            </h2>
          </div>
          <span className="font-mono text-[10px] text-foreground/45">
            {HANDBOOK_SECTIONS.length}개 영역 · {progress.total}개 주제
          </span>
        </div>
        <p className="mb-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-foreground/50" aria-label="전체 작성 상태">
          <span>{progress.notStarted} 작성 전</span>
          <span>{progress.learning} 학습 중</span>
          <span>{progress.completed} 작성 완료</span>
        </p>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-card-border bg-card-border sm:grid-cols-2 lg:grid-cols-4">
          {learningSteps.map((step) => (
            <li key={step.number} className="min-h-28 bg-background/90 p-5 md:p-6">
              <span className="font-mono text-[10px] tracking-[0.15em] text-accent-blue">{step.number}</span>
              <h3 className="mt-3 text-sm font-medium">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/55">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <nav aria-label="핸드북 목차" className="flex-1">
        {HANDBOOK_NAV_GROUPS.map((group) => {
          const sections = HANDBOOK_SECTIONS.filter((section) => section.group === group.key);

          return (
            <section key={group.key} aria-labelledby={`group-${group.key}`} className="mb-14 last:mb-16">
              <div className="mb-5 flex flex-col gap-2 border-b border-card-border/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    {group.englishLabel}
                  </span>
                  <h2 id={`group-${group.key}`} className="mt-2 text-2xl font-light tracking-tight md:text-3xl">
                    {group.label}
                  </h2>
                </div>
                <p className="max-w-xl text-xs leading-relaxed text-foreground/50">{group.description}</p>
              </div>

              <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {sections.map((section, index) => {
                  const articleCount = getHandbookPosts(section).length;
                  const topicCount = countHandbookTopics(section.topics);
                  const sectionProgress = summarizeHandbookProgress(section.topics);

                  return (
                    <li key={section.slug}>
                      <Link
                        href={`/handbook/${section.slug}`}
                        className="group block h-full rounded-2xl border border-card-border bg-foreground/[0.02] p-5 transition-colors hover:border-accent-blue/40 hover:bg-accent-blue/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue md:p-6"
                      >
                        <span className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/40">
                          <span>{section.englishLabel}</span>
                          <span>{articleCount > 0 ? `${articleCount} 문서` : `${topicCount} 항목`}</span>
                        </span>
                        <span className="mt-4 flex items-center gap-2 text-lg font-medium tracking-tight">
                          <span className="font-mono text-xs text-accent-blue/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {section.label}
                          <ChevronRight
                            className="h-4 w-4 text-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-accent-blue"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-2 block min-h-10 text-xs leading-relaxed text-foreground/55">
                          {section.description}
                        </span>
                        <span
                          aria-label={`${sectionProgress.notStarted}개 작성 전, ${sectionProgress.learning}개 학습 중, ${sectionProgress.completed}개 작성 완료`}
                          className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-card-border/70 pt-4 font-mono text-[9px] text-foreground/45"
                        >
                          <span>{sectionProgress.notStarted} 작성 전</span>
                          <span>{sectionProgress.learning} 학습 중</span>
                          <span>{sectionProgress.completed} 작성 완료</span>
                        </span>
                        <span className="mt-4 block border-t border-card-border/70 pt-4 text-xs leading-relaxed text-foreground/50">
                          {section.topics.slice(0, 3).map((topic) => topic.label).join(" · ")}
                          {section.topics.length > 3 ? " · …" : ""}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </nav>

      <section aria-labelledby="blog-channel-title" className="rounded-2xl border border-card-border bg-foreground/[0.02] p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">Separate channel</span>
          <h2 id="blog-channel-title" className="mt-2 text-lg font-medium tracking-tight">기술 블로그</h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-foreground/55">
            Handbook은 개념을 설명하고, Blog는 프로젝트에서 겪은 문제와 해결 과정을 기록합니다.
            각 글은 서로 연결됩니다.
          </p>
        </div>
        <Link
          href="/blog"
          className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-sm text-sm text-accent-blue transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue md:mt-0"
        >
          기술 블로그 보기 <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <footer className="mt-10 border-t border-card-border pt-6 text-xs text-foreground/40">
        목차를 먼저 세우고, 내용을 하나씩 채워갑니다.
      </footer>
    </main>
  );
}
