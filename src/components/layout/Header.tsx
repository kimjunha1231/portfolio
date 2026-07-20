"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 헤더 진입 시 부드럽게 페이드다운 애니메이션 적용
    const hasSeen = sessionStorage.getItem("hasSeenPreloader") === "true";
    const animDelay = hasSeen ? 0.1 : 2.0; // 프리로더를 보지 않은 첫 진입 시 프리로더 끝난 후 페이드인

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.0, 
        ease: "power3.out", 
        delay: animDelay 
      }
    );
  }, []);

  return (
    <header 
      ref={headerRef}
      className="w-full py-6 px-6 md:px-12 lg:px-24 border-b border-card-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* 1. 로고 이미지 심볼 (클릭 시 홈으로 이동) */}
        <Link href="/" className="flex items-center group cursor-pointer" aria-label="Home">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#fcfbfa] border border-card-border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm">
            <Image
              src="/images/playful_logo.png"
              alt="KIM JUNHA Playful Logo Symbol"
              fill
              sizes="48px"
              className="object-cover scale-110"
              priority
            />
          </div>
        </Link>

        {/* 2. 중앙 네비게이션 메뉴바 */}
        <nav className="glass-panel rounded-full px-6 py-2.5 flex items-center gap-6 text-xs font-mono uppercase tracking-[0.1em]">
          <Link href="/" className="hover:text-accent-blue transition-colors">이력서</Link>
          <Link href="/projects" className="hover:text-accent-blue transition-colors">프로젝트</Link>
          <Link href="/blog" className="hover:text-accent-blue transition-colors">블로그</Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border-l border-card-border pl-4 hover:text-accent-blue transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )
            )}
          </button>
        </nav>

        {/* 3. 우측 Github 링크 */}
        <a
          href="https://github.com/kimjunha1231"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.1em] hover:text-accent-blue transition-colors"
        >
          Github <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
