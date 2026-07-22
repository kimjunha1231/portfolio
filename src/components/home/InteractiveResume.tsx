"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase, Award, GraduationCap,
  BookOpen, CheckCircle2, ShieldCheck, FlameKindling, Terminal
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveResume() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll("[data-reveal-resume]");
      if (!sections) return;

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 30, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="resume"
      ref={containerRef}
      className="relative pt-6 md:pt-10 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-24">

        {/* 1. 섹션 헤더 (정합 정렬선 일치) */}
        <div data-reveal-resume className="border-b border-card-border pb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-foreground/70">Resume</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-2 leading-none text-foreground">
              상세 <span className=" text-accent-blue font-semibold">이력</span>
            </h2>
          </div>
        </div>

       {/* 2. 프로젝트 (Projects) - 프론트엔드 중심으로 선별 */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <Briefcase className="w-4 h-4" />
             <span>대표 프로젝트</span>
           </h3>
         </div>

         <div className="lg:col-span-9 space-y-16 pl-2 border-l border-accent-blue/15">
           {/* JobSecretary (2025.11 ~ 2025.12) */}
           <Link
             href="/projects/jobsecretary"
             aria-label="JobSecretary 프로젝트 상세 페이지"
             className="relative block rounded-lg pl-6 pr-2 py-1 -my-1 group transition-colors hover:bg-accent-blue/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-background"
           >
             <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-accent-blue group-hover:scale-150 transition-transform" />
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-xl font-semibold text-foreground group-hover:text-accent-blue transition-colors">
                  JobSecretary <span className="text-sm text-foreground/70 font-normal ml-2">(1인 개인 프로젝트)</span>
                </h4>
                <span className="text-xs font-mono text-foreground/70 bg-foreground/5 px-2.5 py-1 rounded-full border border-card-border">2025.11 ~ 2025.12</span>
              </div>
              <p className="text-xs md:text-sm font-mono text-accent-blue/90 mb-2.5 font-bold">Next.js 15, TypeScript, React Hook Form, TanStack Query, Zustand, Gemini API, Supabase</p>
              <p className="text-sm font-normal text-foreground/90 leading-relaxed mb-4">
               채용 공고와 지원 현황, 자기소개서, PDF 변환, AI 면접 질문 생성을 하나의 흐름으로 연결한 취업 준비 관리 서비스입니다.
             </p>
              <ul className="list-disc pl-4 text-sm font-normal text-foreground/90 space-y-2.5 leading-relaxed">
               <li><strong>칸반보드 렌더링 최적화</strong>: React Developer Tools Profiler에서 동일한 드래그 시나리오를 비교해 전체 커밋 271회에서 98회, 비활성 카드 리렌더링 268회에서 0회로 감소</li>
               <li><strong>자기소개서 작성 안정화</strong>: React Hook Form의 비제어 입력과 isDirty 기반 이탈 경고로 폼 입력과 서버 저장 시점을 분리</li>
               <li><strong>FSD 패턴 적용</strong>: App·Widgets·Features·Entities·Shared 계층으로 페이지 조립, 사용자 기능, 도메인 모델의 책임과 의존성 방향을 정리</li>
             </ul>
           </Link>

           {/* Dearfam (2024.11 ~ 2025.09) */}
           <Link
             href="/projects/dearfam"
             aria-label="Dearfam 프로젝트 상세 페이지"
             className="relative block rounded-lg pl-6 pr-2 py-1 -my-1 group transition-colors hover:bg-accent-blue/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-background"
           >
             <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-accent-blue group-hover:scale-150 transition-transform" />
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-xl font-semibold text-foreground group-hover:text-accent-blue transition-colors">
                  Dearfam <span className="text-sm text-foreground/70 font-normal ml-2">(팀 프로젝트 / 프론트엔드 리드)</span>
                </h4>
                <span className="text-xs font-mono text-foreground/70 bg-foreground/5 px-2.5 py-1 rounded-full border border-card-border">2024.11 ~ 2025.09</span>
              </div>
              <p className="text-xs md:text-sm font-mono text-accent-blue/90 mb-2.5 font-bold">React, TypeScript, Zustand, TanStack Query, MSW, Tailwind CSS</p>
              <p className="text-sm font-normal text-foreground/90 leading-relaxed mb-4">
               Flutter MVP를 React·TypeScript 웹 서비스로 전환한 AI 가족 추억 앨범 서비스입니다.
             </p>
              <ul className="list-disc pl-4 text-sm font-normal text-foreground/90 space-y-2.5 leading-relaxed">
               <li><strong>기술 전환</strong>: Flutter MVP를 React·TypeScript로 마이그레이션하고 Zustand와 TanStack Query로 클라이언트·서버 상태를 분리</li>
               <li><strong>백엔드 구현 전 병목 해결</strong>: MSW로 가족·게시글·댓글·인증 API를 모킹해 백엔드 구현 전에도 주요 화면과 응답 상태를 검증</li>
               <li><strong>성과</strong>: 2024 클라우드 아이디어 공모전 대상(부산시장상), 숭실캡스톤디자인 장려상, Pre-스타트업 선정(창업사무실 입주)</li>
             </ul>
           </Link>

           {/* TITO (2024.03 ~ 2024.12) */}
           <Link
             href="/projects/tito"
             aria-label="TITO 프로젝트 상세 페이지"
             className="relative block rounded-lg pl-6 pr-2 py-1 -my-1 group transition-colors hover:bg-accent-blue/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-background"
           >
             <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-accent-blue group-hover:scale-150 transition-transform" />
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-xl font-semibold text-foreground group-hover:text-accent-blue transition-colors">
                  TITO 토론 보조 서비스 <span className="text-sm text-foreground/70 font-normal ml-2">(팀 프로젝트 / 프론트엔드 리드)</span>
                </h4>
                <span className="text-xs font-mono text-foreground/70 bg-foreground/5 px-2.5 py-1 rounded-full border border-card-border">2024.03 ~ 2024.12</span>
              </div>
              <p className="text-xs md:text-sm font-mono text-accent-blue/90 mb-2.5 font-bold">Flutter, Dart, Riverpod, Dio, Retrofit, WebSocket, Firebase Messaging</p>
              <p className="text-sm font-normal text-foreground/90 leading-relaxed mb-4">
               LLM 기반 주제 생성·주장 코칭과 WebSocket 기반 실시간 토론·투표·관전을 제공하는 Flutter 앱입니다.
             </p>
              <ul className="list-disc pl-4 text-sm font-normal text-foreground/90 space-y-2.5 leading-relaxed">
               <li><strong>통신 분리</strong>: 토론방 기본 정보·기존 내역은 REST API, 채팅·턴 상태·관전자 댓글·투표는 WebSocket으로 분리해 초기 데이터와 실시간 이벤트의 처리 순서를 정리</li>
               <li><strong>앱 상태 관리</strong>: Riverpod으로 토론·인증·알림 상태를 분리하고 Dio·Retrofit으로 인증·토론 API를 연동</li>
               <li><strong>성과</strong>: 2024 한이음 ICT멘토링 프로젝트 은상(정보통신기획평가원장상) 수상 및 One Store·App Store 배포 경험</li>
             </ul>
           </Link>
         </div>
       </div>

       {/* 3. 교육 (Education) - 1개로 와이드 정돈 */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <BookOpen className="w-4 h-4" />
             <span>교육</span>
           </h3>
         </div>
         <div className="lg:col-span-9">
           <div className="glass-panel p-6 rounded-2xl border border-card-border flex flex-col justify-between gap-4 w-full">
             <div>
                <h4 className="text-lg font-semibold text-foreground">현대퓨처넷 11기 MSA기반 Full Stack 개발 전문가 양성과정</h4>
                <p className="text-sm text-foreground/90 mt-2 leading-relaxed">
                  현대퓨처넷 교육생으로 마이크로서비스 아키텍처(MSA) 기반 풀스택 소프트웨어 개발 양성 실무 교육을 이수 중입니다.
                </p>
             </div>
              <span className="text-xs md:text-sm font-mono text-foreground/60 self-start">2026.04 ~ 현재</span>
           </div>
         </div>
       </div>

       {/* 4. 활동 (Activities) - 최신 타임라인순 정렬 완료 */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <FlameKindling className="w-4 h-4" />
             <span>활동 이력</span>
           </h3>
         </div>
         <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* GDG (2024.09 ~ 2025.09) */}
           <div className="glass-panel p-5 rounded-2xl border border-card-border flex flex-col justify-between gap-4">
             <div>
                <h4 className="text-base font-semibold text-foreground">Google Developer Groups on Campus (GDG 숭실대)</h4>
                <p className="text-sm text-foreground/90 mt-1.5 leading-relaxed">
                  Google 기술 관련 대학생 개발자 연합 커뮤니티로, Google Solution Challenge 참가 및 다채로운 개발 네트워킹 협업 활동을 활발히 주도했습니다.
                </p>
             </div>
              <span className="text-xs md:text-sm font-mono text-foreground/60">2024.09 ~ 2025.09</span>
           </div>

           {/* 포키 (2024.03 ~ 2025.09) */}
           <div className="glass-panel p-5 rounded-2xl border border-card-border flex flex-col justify-between gap-4">
             <div>
                <h4 className="text-base font-semibold text-foreground">개발 팀 포키 (창업 사무실 입주)</h4>
                <p className="text-sm text-foreground/90 mt-1.5 leading-relaxed">
                  대학 동기들과 기술 스타트업 지향 개발 팀을 꾸려 1년 6개월 동안 프론트엔드 리드로 활약했으며, 공모전 탐색 및 MVP 초기 기획 수립을 주도하여 창업 지원 사무실 입주를 성공시켰습니다.
                </p>
             </div>
              <span className="text-xs md:text-sm font-mono text-foreground/60">2024.03 ~ 2025.09</span>
           </div>

           {/* 학생복지위원회 (2023.09 ~ 2025.03) */}
           <div className="glass-panel p-5 rounded-2xl border border-card-border flex flex-col justify-between gap-4">
             <div>
                <h4 className="text-base font-semibold text-foreground">숭실대학교 학생복지위원회</h4>
                <p className="text-sm text-foreground/90 mt-1.5 leading-relaxed">
                  대학교 총학생회 산하 특별자치기구인 학생복지위원회의 위원장직을 수행하며 외부 제휴 업체, 학생회 대표단, 교직원 등 다원화된 이해관계자들과의 정책 조율 및 협업을 성공적으로 진행했습니다.
                </p>
             </div>
              <span className="text-xs md:text-sm font-mono text-foreground/60">2023.09 ~ 2025.03</span>
           </div>

           {/* UMC (2023.09 ~ 2024.02) */}
           <div className="glass-panel p-5 rounded-2xl border border-card-border flex flex-col justify-between gap-4">
             <div>
                <h4 className="text-base font-semibold text-foreground">University MakeUs Challenge (UMC 숭실대)</h4>
                <p className="text-sm text-foreground/90 mt-1.5 leading-relaxed">
                  대학생 IT 연합 동아리 UMC 웹 프론트엔드 파트원으로 활동하며 기획자, 디자이너, 개발자 총 11명으로 구성된 대형 팀 프로젝트 협업을 완수했습니다.
                </p>
             </div>
              <span className="text-xs md:text-sm font-mono text-foreground/60">2023.09 ~ 2024.02</span>
           </div>
         </div>
       </div>

       {/* 5. 수상내역 (Awards) - 상장 원본 대조 일자 교정 및 최신순 정렬 완료 */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <Award className="w-4 h-4" />
             <span>수상 내역</span>
           </h3>
         </div>
         <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
           {[
             { title: "2024 클라우드 아이디어 공모전 대상", org: "부산광역시장상", date: "2024.12.24" },
             { title: "2024 한이음 ICT멘토링 공모전 은상", org: "정보통신기획평가원장상", date: "2024.12.04" },
             { title: "2025 한이음 드림업 공모전 장려상", org: "한국정보산업연합회장상", date: "2025.11.19" },
             { title: "숭실 발명아이디어 경진대회 최우수상", org: "숭실대학교 총장상", date: "2024.11.22" },
             { title: "제 15회 숭실캡스톤디자인 경진대회 장려상", org: "숭실대학교 총장상", date: "2025.10.01" }
           ]
             // 날짜를 기준으로 최신순 정렬 (Desc)
             .sort((a, b) => new Date(b.date.replace(/\./g, "-")).getTime() - new Date(a.date.replace(/\./g, "-")).getTime())
             .map((award, i) => (
               <div key={i} className="glass-panel p-4 rounded-xl border border-card-border flex items-start gap-3">
                 <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                  <div className="text-sm leading-snug">
                    <p className="font-semibold text-foreground text-sm">{award.title}</p>
                    <p className="text-xs text-foreground/70 mt-1 font-normal">{award.org} | {award.date}</p>
                 </div>
               </div>
             ))}
         </div>
       </div>

       {/* 6. 학력 (Education) */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <GraduationCap className="w-4 h-4" />
             <span>학력 사항</span>
           </h3>
         </div>
         <div className="lg:col-span-9">
           <div className="glass-panel p-5 rounded-2xl border border-card-border flex justify-between items-center">
             <div>
                <h4 className="text-base font-semibold text-foreground">숭실대학교 컴퓨터학부</h4>
             </div>
              <span className="text-xs md:text-sm font-mono text-foreground/70 bg-foreground/5 px-2.5 py-1 rounded border border-card-border">2020.03 ~ 2026.08</span>
           </div>
         </div>
       </div>

       {/* 7. 자격증 (Certificates) - 최신 취득순 정렬 완료 */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <ShieldCheck className="w-4 h-4" />
             <span>자격증</span>
           </h3>
         </div>
         <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { name: "SQLD (SQL 개발자)", info: "한국데이터진흥원 / 국가공인자격", date: "2026.06.19" },
             { name: "TOEIC Speaking · IM3", info: "TOEIC / 어학 자격", date: "2026.06" },
             { name: "정보처리기사", info: "한국산업인력공단 / 국가기술자격", date: "2025.12" },
             { name: "MOS Excel Expert 2016", info: "Microsoft / 국제인증 자격", date: "2024.06" }
           ].map((cert, i) => (
             <div key={i} className="glass-panel p-5 rounded-2xl border border-card-border flex flex-col justify-between gap-3">
               <div className="flex justify-between items-start gap-4">
                  <span className="font-semibold text-foreground text-base">{cert.name}</span>
                  <span className="text-xs font-mono text-foreground/70 bg-foreground/5 px-2 py-0.5 rounded border border-card-border">{cert.date}</span>
               </div>
                <span className="text-sm text-foreground/80 font-normal">{cert.info}</span>
             </div>
           ))}
         </div>
       </div>

       {/* 8. 기술 스택 (Tech Stack) */}
       <div data-reveal-resume className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-3">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent-blue flex items-center gap-2 sticky top-24 font-bold">
             <Terminal className="w-4 h-4" />
             <span>기술 스택</span>
           </h3>
         </div>
         <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* 1. Language */}
           <div className="p-5 rounded-xl border border-card-border bg-foreground/5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent-blue font-bold">Language</span>
              <div className="flex flex-wrap gap-1.5">
               {["HTML", "CSS", "JavaScript", "TypeScript", "Java", "Dart"].map(tech => (
                  <span key={tech} className="text-xs md:text-sm font-mono px-2.5 py-1 rounded bg-background border border-card-border text-foreground font-semibold">{tech}</span>
               ))}
              </div>
           </div>

           {/* 2. Core Frameworks & Libraries */}
           <div className="p-5 rounded-xl border border-card-border bg-foreground/5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent-blue font-bold">Core Frameworks & Libraries</span>
              <div className="flex flex-wrap gap-1.5">
               {["React", "Next.js", "Flutter", "Spring Boot"].map(tech => (
                  <span key={tech} className="text-xs md:text-sm font-mono px-2.5 py-1 rounded bg-background border border-card-border text-foreground font-semibold">{tech}</span>
               ))}
              </div>
           </div>

           {/* 3. Other */}
           <div className="p-5 rounded-xl border border-card-border bg-foreground/5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent-blue font-bold">Other</span>
              <div className="flex flex-wrap gap-1.5">
               {["Styled-components", "Tailwind CSS", "Zustand", "TanStack Query", "Riverpod"].map(tech => (
                  <span key={tech} className="text-xs md:text-sm font-mono px-2.5 py-1 rounded bg-background border border-card-border text-foreground font-semibold">{tech}</span>
               ))}
              </div>
           </div>
         </div>
       </div>

      </div>
    </section>
  );
}
