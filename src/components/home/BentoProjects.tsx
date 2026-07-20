import BentoCards, { type BentoCardItem } from "@/components/shared/BentoCards";

export type ProjectItem = BentoCardItem;

export default function BentoProjects({ projects }: { projects: ProjectItem[] }) {
  return (
    <BentoCards
      items={projects}
      hrefPrefix="/projects"
      sectionLabel="프로젝트 목록"
      detailLabel="프로젝트 상세 보기"
      actionLabel="View case study"
      showCategory={false}
    />
  );
}
