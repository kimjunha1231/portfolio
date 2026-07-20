"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Reduced Motion 선호 사용자는 부드러운 스크롤 비활성화
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      console.log("Motion disabled due to prefers-reduced-motion setting.");
      return;
    }

    // 2. Lenis 부드러운 스크롤 엔진 초기화
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;

    // 3. GSAP ScrollTrigger와 Lenis 동기화
    const handleTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(handleTick);

    gsap.ticker.lagSmoothing(0);

    // 창 크기 변경 시 ScrollTrigger 갱신
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(handleTick);
      lenis.off("scroll", ScrollTrigger.update);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 4. 경로가 변경될 때 스크롤 초기화 및 ScrollTrigger 리프레시
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    
    // 비동기로 DOM 렌더링이 완료된 후 refresh 하도록 시간 지연 부여
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return children;
}
