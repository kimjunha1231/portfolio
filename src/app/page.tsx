import React from "react";
import MotionProvider from "@/components/providers/MotionProvider";
import Preloader from "@/components/home/Preloader";
import Hero from "@/components/home/Hero";
import InteractiveResume from "@/components/home/InteractiveResume";
import { Mail, Phone } from "lucide-react";
import StructuredData from "@/components/shared/StructuredData";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

export default function Home() {
  return (
    <MotionProvider>
      <StructuredData
        id="home-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${SITE_URL.toString()}#profile-page`,
          url: SITE_URL.toString(),
          name: `${PERSON_NAME} 포트폴리오`,
          description: SITE_DESCRIPTION,
          inLanguage: "ko-KR",
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
          mainEntity: { "@id": `${SITE_URL.toString()}#person` },
          about: {
            "@type": "Person",
            name: PERSON_NAME,
            jobTitle: PERSON_JOB_TITLE,
            url: SITE_URL.toString(),
          },
        }}
      />
      {/* 1. 오프닝 로더 */}
      <Preloader />

      {/* 2. 메인 콘텐츠 컨테이너 (이력서 중심의 메인 단일 페이지) */}
      <main className="flex-1 w-full flex flex-col relative z-10">
        {/* 히어로 영역 (좌측 텍스트 + 우측 3D 타이포 포스터) */}
        <Hero />

        {/* 이력서 카드 스태킹 영역 (메인 이력서 본체) */}
        <InteractiveResume />

        {/* 3. 에이전시급 세련된 푸터 (실제 연락처) */}
        <footer className="border-t border-card-border bg-card-bg/20 backdrop-blur-md py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-xs font-mono text-foreground/50 w-full">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
              <span className="font-bold text-foreground text-sm">{PERSON_NAME} &copy; 2026</span>
            </div>

            {/* 실제 연락처 정보 통합 */}
            <div className="flex flex-col gap-3 text-xs">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-accent-blue transition-colors">
                <Mail className="w-4 h-4" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{CONTACT_PHONE}</span>
              </span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-blue transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>{GITHUB_URL.replace("https://", "")}</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-blue transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>{decodeURIComponent(LINKEDIN_URL.replace("https://www.", "").replace("https://", ""))}</span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </MotionProvider>
  );
}
