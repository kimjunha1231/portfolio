import type { Plugin } from "unified";

export type MarkdownHeading = {
  id: string;
  text: string;
};

type HeadingNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HeadingNode[];
};

function slugifyHeading(text: string) {
  return text
    .normalize("NFC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "") || "section";
}

function createUniqueHeadingId(text: string, counts: Map<string, number>) {
  const base = slugifyHeading(text);
  const count = (counts.get(base) || 0) + 1;
  counts.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

function getHeadingText(node: HeadingNode): string {
  if (node.type === "text" && typeof node.value === "string") {
    return node.value;
  }

  if (node.tagName === "img" && typeof node.properties?.alt === "string") {
    return node.properties.alt;
  }

  return (node.children || []).map(getHeadingText).join("");
}

export const rehypeHeadingIds: Plugin = () => (tree) => {
  const counts = new Map<string, number>();

  const visit = (node: HeadingNode) => {
    if (node.type === "element" && node.tagName === "h2") {
      const text = getHeadingText(node).trim();
      node.properties = {
        ...node.properties,
        id: createUniqueHeadingId(text, counts),
      };
    }

    node.children?.forEach(visit);
  };

  visit(tree as HeadingNode);
};

function getVisibleMarkdownText(text: string) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(`+)(.*?)\1/g, "$2")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function getMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const counts = new Map<string, number>();
  let fenceCharacter: "`" | "~" | null = null;
  let fenceLength = 0;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);

    if (fenceMatch) {
      const marker = fenceMatch[1];
      const character = marker[0] as "`" | "~";

      if (!fenceCharacter) {
        fenceCharacter = character;
        fenceLength = marker.length;
      } else if (character === fenceCharacter && marker.length >= fenceLength) {
        fenceCharacter = null;
        fenceLength = 0;
      }

      continue;
    }

    if (fenceCharacter) continue;

    const headingMatch = line.match(/^##[ \t]+(.+?)[ \t]*#*[ \t]*$/);
    if (!headingMatch) continue;

    const text = getVisibleMarkdownText(headingMatch[1]);
    if (!text) continue;

    headings.push({
      id: createUniqueHeadingId(text, counts),
      text,
    });
  }

  return headings;
}
