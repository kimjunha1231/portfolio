import Link from "next/link";
import { ChevronDown, ListTree } from "lucide-react";
import type { MarkdownHeading } from "@/lib/mdx-headings";

export default function ArticleTableOfContents({
  headings,
}: {
  headings: MarkdownHeading[];
}) {
  if (headings.length < 5) return null;

  return (
    <details className="group mb-10 rounded-2xl border border-card-border bg-foreground/[0.025]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-sm font-medium text-foreground marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2.5">
          <ListTree className="h-4 w-4 text-accent-blue" aria-hidden="true" />
          이 글의 목차
          <span className="font-mono text-xs text-foreground/45">{headings.length}</span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-foreground/50 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <nav aria-label="글 목차" className="max-h-[60vh] overflow-y-auto border-t border-card-border px-5 py-4">
        <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {headings.map((heading, index) => (
            <li key={`${heading.id}-${index}`} className="min-w-0">
              <Link
                href={`#${heading.id}`}
                className="flex gap-3 rounded-md py-1 text-sm leading-relaxed text-foreground/70 transition-colors hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              >
                <span className="shrink-0 font-mono text-[11px] text-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="break-keep">{heading.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
