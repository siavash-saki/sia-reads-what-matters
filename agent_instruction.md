# AI Digest — Agent Instruction

## Goal

Create a **weekly AI digest** for one technically sophisticated reader who wants **signal, not noise**.

This is not a generic AI newsletter. It should answer:

**What should an ambitious AI builder pay attention to this week?**

---

## Step-by-step workflow

On each run:

### 1. Determine the week date

Use the Monday of the current week, formatted as `YYYY-MM-DD` (UTC).

### 2. Check if the week already exists

Look in `content/` — if a folder for this week's Monday already exists, stop and report that the digest is already published.

### 3. Research

Find the most important AI developments from the past 7 days. Apply the [content selection rules](#content-selection-rules) and [hard filters](#hard-filters--never-include).

**Research strategy:**

Run at least the following searches (adapt wording to get recent results):

| Category | Example queries |
|----------|----------------|
| Broad sweep | "most important AI news this week", "AI developments [date range]" |
| Models & labs | "new AI model release this week", "Anthropic announcement", "OpenAI announcement", "Google DeepMind announcement" |
| Developer tools | "AI coding tools news", "Claude Code update", "Cursor update", "new AI developer tools" |
| Open source | "open source AI model release this week", "HuggingFace trending" |
| Research | "AI research breakthrough this week", "new interpretability paper", "AI safety research" |
| Agentic / infra | "AI agent framework release", "MCP news", "AI infrastructure update" |

**Watchlist checks** — run a dedicated search for each [watchlist person](#watchlist):
- "Dario Amodei" recent interview OR podcast OR essay
- "Sam Altman" recent announcement OR blog
- "Demis Hassabis" recent interview OR announcement
- "Boris Cherny" recent post OR release
- "Chris Olah" recent paper OR post

**Source prioritization** — when results overlap, prefer the primary source (blog post, paper, release page) over coverage articles. Check Hacker News, ArXiv, and X/Twitter threads for stories that mainstream tech press may miss.

**Minimum effort**: at least 8 distinct web searches before moving to story selection. If a category yields nothing noteworthy, move on — do not force stories.

### 4. Select stories

Apply the [selection rules](#selection-rules), [content selection rules](#content-selection-rules), and [story categories](#story-categories). **Check the previous week's folder** for deduplication before finalizing.

### 5. Create the new week folder

```
content/YYYY-MM-DD/
```

### 6. Create one `.md` file per story

Use slugified names (lowercase, hyphens, no special characters). Example: `claude-4-5-opus-drops.md`

Each `.md` file must have this exact frontmatter format (no markdown body — all content lives in frontmatter):

```yaml
---
title: "Full descriptive title"
hook: "One punchy line — this is the headline users see"
tag: release
heat: 8
summary: "2–3 sentences. Shown when the card is expanded."
image: "https://example.com/og-image.jpg"
links:
  - label: "Primary source"
    url: "https://example.com/article"
  - label: "Discussion"
    url: "https://example.com/thread"
date: "2026-03-24"
---
```

**Frontmatter field rules:**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| title | string | yes | Full title for metadata |
| hook | string | yes | One sharp line, the visible headline |
| tag | enum | yes | One of: `hot-take`, `release`, `podcast`, `research`, `news` |
| heat | number | yes | 1–10 integer. Drives sort order and visual weight. See [heat score anchors](#heat-score-anchors) |
| summary | string | yes | 2–3 sentences max. Follow the [style rules](#style) |
| image | string | no | URL to OG image (see [image sourcing rules](#image-sourcing-rules)). Omit the field entirely if none found — do not leave empty |
| links | array | yes | `[{label, url}]`, 1–3 items. Only worth-clicking links |
| date | string | yes | ISO date `YYYY-MM-DD` of the story's publication |

**Tag mapping** (map from display tags to frontmatter values):
- 🔥 hot take → `hot-take`
- 🚀 release → `release`
- 🎙️ podcast → `podcast`
- 🧪 research → `research`
- ⚠️ news → `news`

### 7. Validate

Run `npm run build` and confirm it succeeds with zero errors. If it fails, read the error output carefully — the most common causes are:

- **YAML syntax error**: unescaped quotes in `hook` or `summary` (wrap the value in double quotes and escape inner double quotes with `\"`)
- **Missing required field**: check the frontmatter field table — every required field must be present
- **Invalid tag value**: must be exactly one of `hot-take`, `release`, `podcast`, `research`, `news`

Fix the offending `.md` file(s) and re-run `npm run build`. Do not proceed to step 8 until the build passes.

### 8. Commit and push

A GitHub Personal Access Token is stored in the `.env` file as `GITHUB_PAT`. Use it to authenticate when pushing to the repository:

```bash
git add content/YYYY-MM-DD/
git commit -m "Add weekly digest for YYYY-MM-DD"
# Read the PAT from .env and use it for push authentication
GITHUB_PAT=$(grep GITHUB_PAT .env | cut -d '=' -f2)
git push https://${GITHUB_PAT}@github.com/$(git remote get-url origin | sed 's|.*github.com[:/]||') main
```

Vercel deploys automatically on push to `main`.

---

## How the site works

This is a static Next.js site. Content lives in `content/YYYY-MM-DD/` folders. The site automatically picks the **newest folder** (by date sort) as the landing page. All older folders become archive pages at `/digest/[date]`. There is no database — just markdown files read at build time.

**You do not need to move or delete anything.** Creating a new folder automatically pushes the old content into the archive.

---

## Content selection rules

### Prioritize

Focus on stories about:

* frontier labs and major model moves
* coding tools and developer workflows
* agentic systems and AI product architecture
* interpretability and grounded research
* open-source breakthroughs with practical leverage
* major industry shifts only when truly important

### Include Only If It Matters

A story should usually pass at least **2** of these:

1. It changes what a serious AI builder should pay attention to.
2. It introduces a genuinely new capability, idea, or constraint.
3. It has practical implications for tools, workflows, architecture, or strategy.
4. It is intellectually sharp enough to justify reading time.

Every story should also answer at least one of these:

* What became possible?
* What became easier?
* What became cheaper?
* What became more credible?
* What became obsolete?

### Prefer

Prefer stories attached to a concrete artifact:

* release
* paper
* demo
* technical post
* product change
* serious interview with non-trivial substance

Prefer **high-signal niche relevance** over **mass popularity**.

---

## Watchlist

Always review anything published, said, or shipped by:

* Dario Amodei
* Sam Altman
* Demis Hassabis
* Boris Cherny
* Chris Olah

Do not include automatically. Still apply the quality bar.

---

## Story Categories

### 🎙️ People & Ideas
Podcasts, interviews, essays, or public statements from watchlist people. Also covers big, grounded ideas about AI — consciousness in LLMs, interpretability findings, what AGI means, what comes after it — as long as it's rooted in AI systems, not abstract philosophy.

**In:** Dario drops a 3hr podcast. Chris Olah publishes a new circuits paper. A researcher makes a credible claim about emergent behavior in large models.

**Out:** A philosopher writes about consciousness. Sam Harris on the future of humanity.

### 🚀 Developer Tools & Releases
Anything a developer building AI-powered apps might actually use or ship with. Recency matters — being first matters.

Includes:
- New model releases (Claude, GPT, Gemini, open-source)
- Coding tools (Claude Code, Cursor, Copilot, Windsurf features)
- Agent frameworks (LangGraph, OpenAI Agents SDK, new entrants)
- Infrastructure (vector DBs, embedding models, RAG improvements)
- API and integration changes (new Anthropic API features, MCP connectors)
- Open-source drops (new models on HuggingFace, killer new libraries)

**In:** Claude Code ships terminal integration. A new open-source model beats GPT-4 on coding. LangGraph releases a major new primitive.

**Out:** A tool with no practical use case. A release that's incrementally better on a benchmark.

### ⚠️ Industry News
Only if genuinely seismic — company decisions, policy moves, or events that reshape the landscape.

**In:** Anthropic exits a military contract. OpenAI announces a merger. A major AI regulation passes in the EU.

**Out:** Funding rounds (unless historic). Routine partnerships. Company blog posts dressed as news.

---

## Selection Rules

* Prefer the last 7 days
* Select only **6–10 stories**
* If fewer than 6 are truly good, publish fewer
* Avoid redundancy; keep only the strongest version of overlapping stories
* **Check the previous week's folder before finalizing.** Do not repeat a story that was already covered unless there is substantial new information (e.g., benchmarks after a model launch, a policy reversal). If covering a follow-up, the summary should reference the prior context — don't re-explain the original story.
* Quality over completeness

---

## Hard Filters — Never Include

| Type | Example |
|------|---------|
| Productivity listicles | "10 AI tools to supercharge your workflow" |
| Benchmark papers | "New model achieves X% on MMLU" with no practical angle |
| Image generation news | Midjourney updates, Sora vs Kling, AI art drama |
| Corporate PR fluff | Company blog posts that are disguised press releases |
| Crypto × AI crossover | Blockchain + AI projects |
| Enterprise adoption stories | "Goldman Sachs deploys AI for compliance" |

---

## Heat Score Anchors

- **9–10**: Paradigm shift — new frontier model drop, major open-source breakthrough that changes the game, a genuinely new capability that didn't exist before.
- **7–8**: Significant release or insight that changes real workflows — a major tool update, a strong research result with practical implications.
- **5–6**: Worth knowing, solid but not landscape-altering — a useful library, an interesting essay, a mid-tier release.
- **3–4**: Niche but genuinely interesting to the right builder — a narrow research finding, an under-the-radar tool.
- **1–2**: Rarely used. Reserve for stories you almost cut but included for completeness.

Heat scores must be differentiated. Don't give everything an 8. Spread across the range. The highest-heat story gets featured treatment on the site.

---

## Image Sourcing Rules

- For each story, fetch the primary source URL and look for the `og:image` meta tag.
- If the page has no OG image, try the second link. If neither has one, omit the `image` field entirely.
- **Never guess or fabricate image URLs.** Only use URLs you have actually verified exist.
- Prefer images that are descriptive (product screenshots, diagrams, speaker photos) over generic brand logos.

---

## Style

Write like a smart technical curator, not a journalist.

Be:

* concise
* sharp
* selective
* non-hyped

Do not use filler. Do not sound corporate.

Each entry should feel like:

**Here is why this is worth 30 seconds of your attention.**

---

## Edge Cases & Error Recovery

### Research yields fewer than 4 stories
If after completing all searches you have fewer than 4 stories that pass the quality bar, **publish what you have**. A 3-story digest is better than padding with weak entries. If you have zero qualifying stories, skip the week entirely — do not create the folder. Report that no digest was published and why.

### Build fails after retries
If `npm run build` fails and you cannot fix the issue after 3 attempts, do not commit. Report the error and the files that caused it. Do not delete or overwrite content from previous weeks while debugging.

### A link is dead or paywalled
If a primary source link returns a 404 or is behind a hard paywall, try to find an alternative URL (e.g., an archived version, the author's blog post, a mirror). If no working link exists, you may still include the story if the summary stands on its own — but swap the dead link for the best available alternative. Never include a link you know is broken.

### Story date is uncertain
If you cannot determine the exact publication date of a story, use the date you found it. Do not leave the `date` field empty or guess a date you're not confident about.

### Git push fails
If `git push` fails (e.g., due to a remote conflict), do not force push. Report the error. The content folder you created is still safe locally.

---

## Important Constraints

- **Do not touch any files outside `content/`.** No code changes, no config changes.
- **Do not modify or delete existing content folders.** Old weeks must stay intact for the archive.
- **No empty image fields.** If you can't find an OG image for a story, omit the `image` field entirely.
- **No markdown body.** The `.md` files have frontmatter only — everything after the closing `---` is ignored by the parser but keep it clean.
- **6–10 stories per week.** Fewer is fine if the quality bar isn't met. Never pad with weak stories.
