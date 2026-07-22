import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

export interface BentoCardItem {
  slug: string;
  title: string;
  category: string;
  metaItems?: Array<{ label: string; value: string }>;
  description: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  coverFit?: "cover" | "contain";
  previewLabel?: string;
  lastModified?: string;
}

const placeholderThemes = [
  "from-blue-500 via-cyan-400 to-slate-900",
  "from-violet-500 via-fuchsia-400 to-slate-950",
  "from-amber-300 via-orange-400 to-rose-600",
  "from-emerald-400 via-teal-500 to-slate-900",
];

function getPlaceholderTheme(slug: string) {
  const hash = [...slug].reduce((total, character) => total + character.charCodeAt(0), 0);
  return placeholderThemes[hash % placeholderThemes.length];
}

function CardCover({ item, priority }: { item: BentoCardItem; priority: boolean }) {
  if (item.cover) {
    return (
      <Image
        src={item.cover}
        alt={item.coverAlt || `${item.title} 대표 이미지`}
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className={`${item.coverFit === "contain" ? "object-contain p-6 md:p-8" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderTheme(item.slug)} overflow-hidden`}
    >
      <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[32px] border-white/20" />
      <div className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full border-[22px] border-black/10" />
      <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9 text-white">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
          {item.previewLabel || "Project preview"}
        </span>
        <span className="max-w-[85%] text-3xl md:text-4xl font-light tracking-tight leading-[1.05]">
          {item.title}
        </span>
      </div>
    </div>
  );
}

interface BentoCardsProps {
  items: BentoCardItem[];
  hrefPrefix: "/projects" | "/blog";
  sectionLabel: string;
  detailLabel: string;
  actionLabel: string;
}

export default function BentoCards({
  items,
  hrefPrefix,
  sectionLabel,
  detailLabel,
  actionLabel,
}: BentoCardsProps) {
  return (
    <section
      aria-label={sectionLabel}
      className="py-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 md:gap-y-10 items-stretch">
        {items.map((item, index) => (
          <div key={item.slug} className="relative h-full flex flex-col">
            <Link
              href={`${hrefPrefix}/${item.slug}`}
              aria-label={`${item.title} ${detailLabel}`}
              className="group block h-full w-full rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-background flex flex-col"
            >
              <article className="h-full w-full flex flex-col overflow-hidden rounded-[28px] border border-card-border bg-card-bg/70 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-accent-blue/30 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[1.62] w-full shrink-0 overflow-hidden bg-foreground/5">
                  <CardCover item={item} priority={index < 2} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6 justify-between">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 shrink-0">
                      <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] text-accent-blue dark:bg-accent-blue/20">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-foreground/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-blue md:text-2xl line-clamp-2 min-h-[3.5rem] md:min-h-[4rem] flex items-center">
                      {item.title}
                    </h2>

                    {item.metaItems?.length ? (
                      <div
                        className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-card-border/70 py-3 shrink-0 min-h-[2.75rem]"
                        aria-label={`${item.title} 메타데이터`}
                      >
                        {item.metaItems.map((metaItem) => (
                          <div key={metaItem.label} className="flex items-center gap-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40">
                              {metaItem.label}
                            </span>
                            <span className="rounded-full border border-foreground/10 px-2.5 py-1 text-[10px] font-mono text-foreground/70">
                              {metaItem.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 border-y border-transparent py-3 shrink-0 min-h-[2.75rem]" />
                    )}

                    <p className="mt-3 text-xs md:text-sm font-light leading-relaxed text-foreground/70 line-clamp-3 min-h-[4.25rem] flex-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4 pt-4 border-t border-card-border/40 shrink-0">
                    <div className="min-w-0">
                      {item.lastModified && (
                        <div className="mb-2 flex flex-wrap items-center gap-3 text-[10px] font-mono text-foreground/45">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            <span>최종 업데이트</span>
                            <time dateTime={item.lastModified}>{item.lastModified}</time>
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 min-h-[1.5rem] items-center" aria-label="관련 기술과 주제">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-foreground/5 px-2.5 py-1 text-[10px] font-mono text-foreground/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-mono text-foreground/45 transition-colors group-hover:text-accent-blue">
                      {actionLabel} ↗
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
