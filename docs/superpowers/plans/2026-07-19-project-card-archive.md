# Project Card Archive Implementation Plan

> **For agentic workers:** Implement this plan task-by-task with a focused verification after each task.

**Goal:** Rebuild the projects archive as a responsive image-led card grid whose covers and alt text are managed from each project's MDX frontmatter.

**Architecture:** Keep the existing server-side MDX content source and pass a small project summary object into the client card grid. Each card is a single accessible link containing an optional real cover image; projects without an image render a deterministic CSS placeholder so future image replacement only requires adding a file and changing frontmatter.

**Tech Stack:** Next.js, React, TypeScript, MDX frontmatter, Tailwind CSS, `next/image`.

## Global Constraints

- Preserve the existing `/projects/:slug` routes, metadata, JSON-LD, and internal links.
- Keep the existing light/dark theme tokens and avoid introducing a new UI dependency.
- Use one column on small screens and two columns from the medium breakpoint upward.
- Keep project titles, descriptions, tags, and image alt text available as server-rendered HTML.
- Use a real JobSecretary cover from the user-provided image and deterministic dummy covers for projects without assets.

---

### Task 1: Extend project content metadata and image asset

**Files:**
- Modify: `src/lib/mdx.ts`
- Modify: `content/projects/*.mdx`
- Create: `public/images/projects/jobsecretary.png`

**Interfaces:**
- `MDXPost` gains `cover?: string` and `coverAlt?: string`.
- `getAllPosts()` and `getPostBySlug()` return those fields from frontmatter.

- [ ] **Step 1: Add optional cover fields to the MDX model and reader.**

  Parse `data.cover` and `data.coverAlt` as strings, defaulting to an empty value when absent. Preserve the existing `tags` and raw Markdown behavior.

- [ ] **Step 2: Add the JobSecretary cover metadata.**

  Add this frontmatter to `content/projects/jobsecretary.mdx`:

  ```yaml
  cover: "/images/projects/jobsecretary.png"
  coverAlt: "JobSecretary AI 채용 관리 플랫폼의 지원 현황 화면"
  ```

- [ ] **Step 3: Copy the user-provided JobSecretary image to `public/images/projects/jobsecretary.png`.**

  Keep the other five projects without a `cover` value so the card component exercises its deterministic placeholder path.

### Task 2: Replace the bento cards with image-led project cards

**Files:**
- Modify: `src/components/home/BentoProjects.tsx`

**Interfaces:**
- `ProjectItem` gains `cover?: string` and `coverAlt?: string`.
- The component continues to consume `projects: ProjectItem[]` from the server page.

- [ ] **Step 1: Render a responsive two-column card grid.**

  Use a one-column mobile layout and two-column medium/desktop layout. Each project must render as one `<Link>` wrapping an `<article>`-style card so the entire card is keyboard accessible and there are no nested interactive elements.

- [ ] **Step 2: Add the cover region.**

  When `project.cover` exists, render `next/image` with `fill`, `sizes`, `object-cover`, and `alt={project.coverAlt || project.title}`. When it does not exist, render a CSS-only placeholder with a project-specific hue derived from the slug and a readable project title.

- [ ] **Step 3: Add the reference-style card information hierarchy.**

  Keep the category, project title, description, technology chips, and a small “자세히 보기” affordance below the image. Use subtle hover/focus states and preserve the current light/dark design tokens.

### Task 3: Pass cover data from the server page

**Files:**
- Modify: `src/app/projects/page.tsx`

**Interfaces:**
- Map `cover` and `coverAlt` from each `MDXPost` into the `ProjectItem` passed to `BentoProjects`.

- [ ] **Step 1: Preserve the existing sitemap and CollectionPage data.**

  Only extend the project card view model; do not remove the existing structured data or metadata.

### Task 4: Verify behavior and content discoverability

**Files:**
- Verify: `src/app/projects/page.tsx`, `src/components/home/BentoProjects.tsx`, `src/lib/mdx.ts`, `content/projects/jobsecretary.mdx`

- [ ] **Step 1: Run `npm run lint`.**

  Expected: exit code `0` with no errors.

- [ ] **Step 2: Run `npm run build`.**

  Expected: exit code `0`; all existing project detail routes remain statically generated.

- [ ] **Step 3: Run a production smoke check.**

  Confirm `/projects` returns `200`, every current project detail route returns `200`, and the HTML contains the JobSecretary cover URL, project title, description, and tech tags.

- [ ] **Step 4: Run `git diff --check`.**

  Expected: no whitespace errors.
