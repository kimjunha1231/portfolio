"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import LottieAnimation from "../shared/LottieAnimation";
import Card3DTilt from "../shared/Card3DTilt";

export default function Hero() {
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 1. 마우스 무브에 반응하는 백그라운드 오라(Aura) 광원 효과 (MengTo & Taste-Skill)
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgGlowRef.current) return;
      const x = e.clientX;
      const y = e.clientY;

      // GSAP을 이용해 마우스 좌표로 구름 광원을 부드럽게 지연(Lag) 이동시킴
      gsap.to(bgGlowRef.current, {
        x: x - window.innerWidth / 2,
        y: y - window.innerHeight / 2,
        duration: 2.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 2. 세션 여부에 따라 텍스트 리빌 애니메이션 딜레이 동적 적용
    if (heroContentRef.current) {
      const hasSeen = sessionStorage.getItem("hasSeenPreloader") === "true";
      const animDelay = hasSeen ? 0.2 : 2.2; // 이미 로더를 보았다면 즉시 리빌 시작

      const revealElements = heroContentRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        revealElements,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          delay: animDelay,
        }
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-start gap-8 lg:gap-12 py-12 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* ☁️ Luminous Cloudy Background Orbs (맑은 미스트 광원) */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none bg-background">
        <div
          ref={bgGlowRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-60 dark:opacity-40 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle, var(--color-accent-sky) 0%, var(--color-accent-peach) 50%, transparent 100%)`,
          }}
        />
      </div>



      {/* 🤝 Editorial Split Layout (좌측 소개글, 우측 아담한 로고 카드 배치) */}
      <div
        ref={heroContentRef}
        className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-8 mb-4 z-10"
      >
        {/* 좌측 소개 텍스트 블록 (col-span-8) */}
        <div className="lg:col-span-8 flex flex-col justify-center gap-6">
          {/* 1. 뱃지 */}
          <div data-reveal className="inline-flex items-center gap-2 w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-foreground/60">
              Frontend-focused Fullstack Developer
            </span>
          </div>

          {/* 2. 타이틀 */}
          <h1
            data-reveal
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.25] font-light text-foreground break-keep"
          >
            <span className="block whitespace-nowrap">
              프론트엔드 중심 풀스택 개발자
            </span>
            <span className="block whitespace-nowrap mt-1">
              <span className="relative inline-block">
                <span className="text-accent-blue relative z-10">김준하</span>
                <div className="absolute -top-6 -right-6 w-16 h-16 pointer-events-none z-0">
                  <LottieAnimation
                    url="https://lottie.host/80ff65b6-b072-466d-ad02-8ce1b250ff6d/y6UqYFw06I.json"
                    className="w-full h-full"
                  />
                </div>
              </span>
              입니다.
            </span>
          </h1>

          {/* 3. 신규 소개 문구 */}
          <p data-reveal className="text-sm md:text-base text-foreground/80 leading-relaxed font-light">
            익숙한 기술을 고집하기보다 문제 해결에 필요한 기술과 방식을 선택합니다. 반복적이거나 비효율적인 업무와 사용자의 불편을 발견하면 원인을 파악하고 더 나은 흐름으로 개선하는 것을 좋아합니다. 다양한 환경에서 협업하고 리더 역할을 수행하며 쌓은 경험을 바탕으로, 문제를 주도적으로 정의하고 상황에 맞는 해결책을 유연하게 실행해왔습니다.
          </p>
        </div>

        {/* 우측 아트워크 로고 블록 (col-span-4) */}
        <div data-reveal className="lg:col-span-4 w-full flex justify-center lg:justify-end items-center">
          <div className="w-full max-w-[350px]">
            <Card3DTilt className="overflow-hidden p-0! rounded-[24px]! shadow-[0_12px_35px_rgba(0,0,0,0.03)] border border-card-border">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/playful_logo.png"
                  alt="김준하 포트폴리오 로고 포스터"
                  fill
                  sizes="350px"
                  priority
                  className="object-cover"
                />
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
