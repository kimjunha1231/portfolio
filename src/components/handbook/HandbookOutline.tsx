import { ChevronDown } from "lucide-react";
import {
  countHandbookTopics,
  getHandbookTopicStatus,
  summarizeHandbookProgress,
  type HandbookTopic,
  type HandbookTopicProgress,
} from "@/lib/handbook";

interface HandbookOutlineProps {
  topics: readonly HandbookTopic[];
  level?: number;
}

const progressLabels: Record<HandbookTopicProgress, string> = {
  "not-started": "작성 전",
  learning: "학습 중",
  completed: "작성 완료",
};

const progressStyles: Record<HandbookTopicProgress, string> = {
  "not-started": "bg-foreground/[0.05] text-foreground/45",
  learning: "bg-accent-blue/10 text-accent-blue",
  completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function HandbookOutline({ topics, level = 0 }: HandbookOutlineProps) {
  return (
    <>
      {level === 0 && (
        <ul aria-label="주제별 작성 상태" className="mb-5 flex flex-wrap gap-2">
          {(["not-started", "learning", "completed"] as const).map((status) => (
            <li
              key={status}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${progressStyles[status]}`}
            >
              {progressLabels[status]}
            </li>
          ))}
        </ul>
      )}
      <ol className={level === 0 ? "space-y-2" : "mt-2 space-y-1.5"}>
        {topics.map((topic, index) => {
          const children = topic.children ?? [];
          const number = String(index + 1).padStart(2, "0");
          const progress = summarizeHandbookProgress([topic]);

          return (
            <li key={`${level}-${number}-${topic.label}`}>
              {children.length > 0 ? (
                <details className="group rounded-xl border border-card-border/80 bg-foreground/[0.015]">
                  <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-accent-blue/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue [&::-webkit-details-marker]:hidden">
                    <span className="shrink-0 font-mono text-[10px] text-accent-blue/75">{number}</span>
                    <span className="min-w-0 flex-1 text-foreground/80">{topic.label}</span>
                    <span
                      aria-label={`${progress.notStarted}개 작성 전, ${progress.learning}개 학습 중, ${progress.completed}개 작성 완료`}
                      className="hidden shrink-0 font-mono text-[9px] text-foreground/45 sm:inline"
                    >
                      {progress.notStarted} 전 · {progress.learning} 중 · {progress.completed} 완료
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-foreground/40">
                      {countHandbookTopics(children)}개 항목
                    </span>
                    <ChevronDown
                      className="h-3.5 w-3.5 shrink-0 text-foreground/40 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="border-t border-card-border/70 px-3 py-3 sm:px-4">
                    <HandbookOutline topics={children} level={level + 1} />
                  </div>
                </details>
              ) : (
                <div className="flex items-start gap-3 rounded-xl border border-card-border/60 px-4 py-3 text-sm">
                  <span className="shrink-0 font-mono text-[10px] text-accent-blue/60">{number}</span>
                  <span className="min-w-0 flex-1 leading-relaxed text-foreground/70">{topic.label}</span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] ${progressStyles[getHandbookTopicStatus(topic)]}`}
                  >
                    {progressLabels[getHandbookTopicStatus(topic)]}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
