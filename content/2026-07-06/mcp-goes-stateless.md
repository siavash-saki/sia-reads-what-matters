---
title: "MCP's Biggest Spec Revision Drops Sessions, Goes Stateless — Final Spec Ships July 28"
hook: "MCP kills the session: any server instance can now handle any request behind a plain load balancer"
tag: release
heat: 7
summary: "The MCP 2026-07-28 release candidate, locked May 21, removes the initialize/initialized handshake, drops the Mcp-Session-Id header, and deprecates Roots, Sampling, and Logging. New additions include the Extensions framework, MCP Apps (server-rendered HTML UIs), and a redesigned Tasks extension. The practical win: remote MCP servers can now run behind a round-robin load balancer with no sticky sessions or shared session stores."
links:
  - label: "MCP blog post"
    url: "https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/"
  - label: "WorkOS authentication analysis"
    url: "https://workos.com/blog/mcp-2026-spec-agent-authentication"
date: "2026-05-21"
---
