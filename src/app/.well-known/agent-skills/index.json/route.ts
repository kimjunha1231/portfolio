import { createHash } from "node:crypto";
import { getSkillMarkdown } from "@/lib/ai-context";
import { SITE_DESCRIPTION, absoluteUrl } from "@/lib/site";

const skillContent = getSkillMarkdown();
const skillDigest = createHash("sha256").update(skillContent).digest("hex");

export function GET() {
  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "junha-portfolio",
          type: "skill-md",
          description: SITE_DESCRIPTION,
          url: absoluteUrl("/skill.md"),
          digest: `sha256:${skillDigest}`,
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-Robots-Tag": "noindex, follow",
      },
    },
  );
}
