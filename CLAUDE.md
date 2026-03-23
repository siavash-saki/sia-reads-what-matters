# Agent Onboarding — Sia Reads What Matters

## What this is

A personal weekly AI news digest website. Static Next.js site that reads markdown files at build time and renders them as a curated feed. No database, no CMS, no API, no auth.

## Architecture

```
content/[YYYY-MM-DD]/[slug].md   → Source of truth. Markdown files with YAML frontmatter.
src/lib/content.ts               → Reads content dir, parses frontmatter with gray-matter, returns typed Story objects sorted by heat.
src/app/page.tsx                  → Homepage. Shows latest week's digest.
src/app/digest/[date]/page.tsx   → Archive page. Statically generated via generateStaticParams.
src/components/StoryCard.tsx     → Client component. Expandable card with heat meter, tag badge, links. Only interactive component.
src/components/DigestGrid.tsx    → Grid layout. First story (highest heat) gets featured treatment (col-span-2).
src/components/SiteHeader.tsx    → Title, week label, story count.
src/components/SiteFooter.tsx    → Archive links, copyright.
```

## Content model

Each story is a `.md` file in `content/[week-date]/`. Frontmatter fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | yes | Full title (not displayed directly — used for metadata) |
| hook | string | yes | One punchy line. This is the headline users see. |
| tag | enum | yes | `hot-take`, `release`, `podcast`, `research`, `news` |
| heat | number | yes | 1–10. Drives sort order, visual weight, and color coding. |
| summary | string | yes | 2–3 sentences. Shown when card is expanded. |
| image | string | no | URL to an image. Shown in expanded card. |
| links | array | yes | `[{label, url}]`, max 3. Shown as buttons in expanded card. |
| date | string | yes | ISO date (YYYY-MM-DD). Publication date of the story. |

Stories are sorted by heat descending. The highest-heat story becomes the featured card.

## Design system

- **Theme**: Dark (`#09090B`) with cyan accent (`#06B6D4`) and purple highlights
- **Fonts**: Sora (display), Inter (body), JetBrains Mono (data/tags)
- **Cards**: Rounded, subtle borders, glow on hover, heat-colored left accent bar
- **Heat colors**: cyan (1-4) → blue (5-6) → amber (7-8) → red (9-10)
- **Tags**: Color-coded pill badges (red=hot-take, cyan=release, purple=podcast, green=research, amber=news)
- **Background**: Dot grid pattern with faint cyan radial glow

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build — also validates all content is parseable
npm run lint     # ESLint
```

## How to add a new week

1. Create `content/YYYY-MM-DD/` directory (use Monday of that week)
2. Add 6–10 `.md` files following the frontmatter schema above
3. `npm run build` to verify
4. Commit and push — Vercel redeploys automatically

## Key decisions to preserve

- **No client-side data fetching.** Everything is static. Content is read from the filesystem at build time.
- **Single interactive component.** Only `StoryCard.tsx` uses `"use client"`. Everything else is a server component.
- **No external dependencies beyond gray-matter.** Keep the dep tree minimal.
- **Content lives in the repo**, not in a CMS. This is intentional — it enables a GitHub Actions workflow to commit new content files automatically.
- **No pages router.** App Router only.

## Deployment

Deployed on Vercel. Zero config — just push to `main`. No environment variables required.
