"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";

type ZoomableImageProps = React.ComponentPropsWithoutRef<"img">;

export default function ZoomableImage({
  alt = "",
  className = "",
  src,
  ...props
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const layoutId = useId();
  const {
    decoding,
    height,
    loading,
    referrerPolicy,
    sizes,
    srcSet,
    style,
    title,
    width,
  } = props;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    const closeElement = closeRef.current;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeElement?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
           className="group relative block h-full w-full cursor-zoom-in rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        onClick={() => setIsOpen(true)}
        aria-label={`${alt || "이미지"} 확대 보기`}
      >
           <motion.img
             layoutId={layoutId}
             src={src}
             alt={alt}
             decoding={decoding}
             height={height}
             loading={loading}
             referrerPolicy={referrerPolicy}
             sizes={sizes}
             srcSet={srcSet}
             style={style}
             title={title}
             width={width}
             animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className={`${className} transition-transform duration-300 group-hover:scale-[1.01]`}
        />
        <span
          className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1.5 text-[10px] font-medium tracking-wide text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <Maximize2 className="h-3 w-3" />
          확대
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${alt || "이미지"} 확대 보기`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative flex max-h-[calc(100vh-2rem)] max-w-[min(92vw,1100px)] items-center justify-center md:max-h-[calc(100vh-4rem)]"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.img
                layoutId={layoutId}
                src={src}
                alt={alt}
                className="max-h-[calc(100vh-2rem)] max-w-[92vw] rounded-2xl object-contain shadow-2xl md:max-h-[calc(100vh-4rem)]"
              />
              <button
                ref={closeRef}
                type="button"
                className="absolute -right-2 -top-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 text-white shadow-xl transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:-right-4 md:-top-4"
                onClick={() => setIsOpen(false)}
                aria-label="확대 이미지 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
