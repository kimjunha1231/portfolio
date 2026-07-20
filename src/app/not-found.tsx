import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지가 존재하지 않습니다.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10">
      <div className="max-w-xl w-full text-center">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent-blue mb-5">404 / Not Found</p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
          찾으시는 페이지가
          <span className="block font-serif italic text-accent-blue mt-2">없습니다.</span>
        </h1>
        <p className="mt-6 text-sm text-foreground/70 leading-relaxed">
          주소가 변경되었거나 아직 공개되지 않은 콘텐츠일 수 있습니다. 포트폴리오와 기술 블로그에서 원하는 내용을 찾아보세요.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-xs font-mono hover:bg-accent-blue transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            홈으로
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-card-border text-xs font-mono hover:border-accent-blue/40 hover:text-accent-blue transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            프로젝트 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
