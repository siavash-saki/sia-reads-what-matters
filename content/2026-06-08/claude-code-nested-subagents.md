---
title: "Claude Code Ships Nested Subagents — Subagents Can Now Spawn Subagents Up to Depth 5"
hook: "A two-year-old rule broken: Claude Code subagents can now spawn their own subagents, unlocking layered delegation for sprawling codebases"
tag: release
heat: 7
summary: "On June 9, Boris Cherny shipped Claude Code v2.1.172 with nested subagent support — each subagent can spawn its own subagents, capped at depth=5. Each level runs in an isolated context window and returns only a summary, letting developers break complex workflows into layered delegations. This was previously forbidden in every version of Claude Code. Cherny is explicitly asking for feedback on whether the depth ceiling feels right."
links:
  - label: "Changelog"
    url: "https://code.claude.com/docs/en/changelog"
  - label: "Feature deep-dive"
    url: "https://claudefa.st/blog/guide/agents/nested-subagents"
date: "2026-06-09"
---
