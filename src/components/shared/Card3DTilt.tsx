"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3DTilt({ children, className = "" }: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Framer Motion 값 설정
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 부드러운 물리 효과(Spring) 적용 (MengTo 특유의 텐션 설정)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // 마우스 이동 시 좌표 계산
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    // 중심점을 기준으로 -0.5 ~ 0.5 사이 값 매핑
    x.set(mouseX / width);
    y.set(mouseY / height);

    // CSS Custom Property를 갱신하여 마우스 반응형 Glow Line 그라데이션 적용
    const absoluteMouseX = event.clientX - rect.left;
    const absoluteMouseY = event.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${absoluteMouseX}px`);
    el.style.setProperty("--mouse-y", `${absoluteMouseY}px`);
  };

  // 마우스가 카드를 벗어날 때 값 초기화
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`double-bezel-outer group relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="double-bezel-inner h-full w-full relative z-10 transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
      >
        {/* Glow border spotlight overlay (MengTo & Taste-Skill 마우스 반응형 불빛 테두리 효과) */}
        <div
          className="absolute inset-0 -z-10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--color-glow), transparent 80%)`,
          }}
        />
        
        {/* 내부 콘텐츠 */}
        <div className="p-6 md:p-8 h-full w-full relative z-20">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
