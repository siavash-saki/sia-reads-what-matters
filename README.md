# Sia Reads What Matters

A personal weekly AI news digest — curated, opinionated, zero noise.

Not a generic newsletter. A filtered feed tuned to one person's interests, built for people who actually know what they're reading.

## What's inside

**6–10 stories per week**, sorted by a heat score (1–10), covering:

- **People & Ideas** — Podcasts, interviews, and essays from watchlist figures (Dario Amodei, Sam Altman, Demis Hassabis, Boris Cherny, Chris Olah)
- **Developer Tools & Releases** — New models, coding tools, agent frameworks, infrastructure, open-source drops
- **Industry News** — Only if genuinely seismic — mergers, regulation, landscape-shifting events

Hard-filtered: no listicles, no benchmark papers, no image gen drama, no corporate PR, no crypto crossovers.

## How it works

Stories are markdown files with frontmatter, organized by week:

```
content/
└── 2026-03-23/
    ├── dario-amodei-three-hour-manifesto.md
    ├── claude-4-5-opus-drops.md
    └── ...
```

Each file has:

```yaml
---
title: "..."
hook: "One punchy line"
tag: release | podcast | research | hot-take | news
heat: 1-10
summary: "2-3 sentences"
links:
  - label: "Source"
    url: "https://..."
date: "2026-03-23"
---
```

The site reads these at build time — no database, no CMS, no API. Drop a new folder of `.md` files and redeploy.

## Routes

| Path | Description |
|------|-------------|
| `/` | Latest week's digest |
| `/digest/[date]` | Archive page for a specific week |

## Stack

- **Next.js 16** — App Router, static generation
- **Tailwind CSS v4** — Custom dark theme with cyan accents
- **gray-matter** — Frontmatter parsing
- **Vercel** — Zero-config deployment

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new week

1. Create `content/YYYY-MM-DD/` with story `.md` files
2. Push to `main`
3. Vercel rebuilds automatically

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsiavash-saki%2Fsia-reads-what-matters)
