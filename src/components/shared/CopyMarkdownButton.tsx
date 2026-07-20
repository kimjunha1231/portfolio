"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyMarkdownButtonProps {
  content: string;
}

export default function CopyMarkdownButton({ content }: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy Markdown: ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-foreground/5 px-3.5 py-2 text-xs font-mono font-medium tracking-wider text-foreground/80 shadow-sm transition-all duration-300 hover:border-accent-blue/40 hover:bg-accent-blue/10 hover:text-accent-blue cursor-pointer"
      title="이 페이지의 Markdown 원문을 복사합니다."
      aria-label="이 페이지의 Markdown 원문 복사"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="font-semibold text-emerald-500" aria-live="polite">
            마크다운 복사됨
          </span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          <span>마크다운 복사</span>
        </>
      )}
    </button>
  );
}
