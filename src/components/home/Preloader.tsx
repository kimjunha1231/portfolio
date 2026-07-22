"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenPreloader") === "true") return;
    // 브라우저 에이전트와 자동화 도구가 첫 화면의 실제 콘텐츠를 가리지 않도록 합니다.
    if (navigator.webdriver === true) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("hasSeenPreloader", "true");
      return;
    }

    const renderTimer = window.setTimeout(() => setShouldRender(true), 0);
    return () => window.clearTimeout(renderTimer);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const container = containerRef.current;
    const text = textRef.current;
    const bar = barRef.current;
    if (!container || !text || !bar) return;

    const animationTimer = window.setTimeout(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setShouldRender(false);
          sessionStorage.setItem("hasSeenPreloader", "true");
        },
      });

      timeline
        .fromTo(
          text,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
        )
        .fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
          "-=0.4",
        )
        .to(
          container,
          { yPercent: -100, duration: 1, ease: "power4.inOut" },
          "+=0.2",
        );

      return () => timeline.kill();
    }, 50);

    return () => {
      window.clearTimeout(animationTimer);
      gsap.killTweensOf([container, text, bar]);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 bg-[#0d111a] flex flex-col items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div className="flex flex-col items-start gap-4 w-72 md:w-96 px-4">
        <div
          ref={textRef}
          className="text-white text-xs uppercase tracking-[0.25em] font-medium font-mono"
        >
          Junha.dev &copy; 2026
        </div>
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div ref={barRef} className="absolute left-0 top-0 h-full w-full bg-white" />
        </div>
      </div>
    </div>
  );
}
