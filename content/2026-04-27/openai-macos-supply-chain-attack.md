---
title: "North Korea's Lazarus Group Hit OpenAI's macOS Apps via Axios Supply Chain Attack"
hook: "A compromised npm package slipped a remote access trojan into OpenAI's macOS app-signing pipeline — all users must update before May 8"
tag: news
heat: 6
summary: "On March 31, North Korea's Lazarus Group compromised the axios npm package (v1.14.1), injecting a dependency that deployed the BlueNoroff RAT into OpenAI's macOS app-signing workflow for ChatGPT, Codex, and Atlas. OpenAI concluded the signing certificate was likely not exfiltrated and no user data was accessed, but revoked the certificate and issued an urgent update requirement: all macOS users must update before May 8 or their apps will stop working. A stark reminder that AI tool supply chains are now nation-state targets."
links:
  - label: "OpenAI Response"
    url: "https://openai.com/index/axios-developer-tool-compromise/"
  - label: "The Hacker News Analysis"
    url: "https://thehackernews.com/2026/04/openai-revokes-macos-app-certificate.html"
  - label: "Cybernews Report"
    url: "https://cybernews.com/news/openai-warns-mac-users-to-update-apps-after-third-party-security-issue/"
date: "2026-04-29"
---
