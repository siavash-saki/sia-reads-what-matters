"use client";

import { useState } from "react";
import type { Story } from "@/lib/content";

const TAG_CONFIG: Record<string, { label: string; color: string }> = {
  "hot-take": { label: "HOT TAKE", color: "#EF4444" },
  release: { label: "RELEASE", color: "#06B6D4" },
  podcast: { label: "PODCAST", color: "#8B5CF6" },
  research: { label: "RESEARCH", color: "#10B981" },
  news: { label: "NEWS", color: "#F59E0B" },
};

function heatColor(heat: number): string {
  if (heat >= 9) return "#EF4444";
  if (heat >= 7) return "#F59E0B";
  if (heat >= 5) return "#3B82F6";
  return "#06B6D4";
}

export function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const tag = TAG_CONFIG[story.tag] ?? { label: story.tag, color: "#06B6D4" };
  const color = heatColor(story.heat);

  return (
    <article
      onClick={() => setOpen((v) => !v)}
      className={`
        group relative cursor-pointer rounded-lg
        bg-surface border border-rule/50
        transition-all duration-300 ease-out
        hover:border-accent/30 hover:bg-surface-hover
        ${featured ? "md:col-span-2" : ""}
      `}
      style={{
        boxShadow: open
          ? `0 0 40px ${color}10, 0 0 80px ${color}05`
          : undefined,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 30px rgba(6, 182, 212, 0.07)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = open
          ? `0 0 40px ${color}10, 0 0 80px ${color}05`
          : "none";
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
        style={{ backgroundColor: color, opacity: 0.7 + (story.heat / 10) * 0.3 }}
      />

      <div className={featured ? "p-6 md:p-8 pl-5 md:pl-7" : "p-5 md:p-6 pl-5"}>
        {/* Tag + date row */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] font-medium"
            style={{
              backgroundColor: `${tag.color}15`,
              color: tag.color,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tag.color }}
            />
            {tag.label}
          </span>
          <span className="font-mono text-[11px] text-muted tracking-wide">
            {story.date}
          </span>
        </div>

        {/* Hook / headline */}
        <h2
          className={`font-display font-semibold leading-snug text-primary ${
            featured
              ? "text-2xl sm:text-3xl md:text-4xl"
              : "text-lg sm:text-xl"
          }`}
        >
          {story.hook}
        </h2>

        {/* Heat meter */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1 h-1 rounded-full bg-rule/80 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${story.heat * 10}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}60`,
              }}
            />
          </div>
          <span
            className="font-mono text-sm font-semibold tabular-nums"
            style={{ color }}
          >
            {story.heat}
          </span>
        </div>

        {/* Expand indicator */}
        <div className="mt-4 flex items-center gap-2 text-muted font-mono text-[11px] tracking-widest uppercase">
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span>{open ? "Collapse" : "Read more"}</span>
        </div>
      </div>

      {/* Expandable panel */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 md:px-6 md:pb-6 space-y-4">
            <div className="gradient-line" />

            <p className="font-body text-primary/80 leading-relaxed text-[15px] pt-2">
              {story.summary}
            </p>

            {story.image && (
              <img
                src={story.image}
                alt={story.title}
                className="w-full rounded-md object-cover border border-rule/50"
              />
            )}

            {story.links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {story.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md
                      font-mono text-[11px] tracking-wide
                      bg-accent/10 text-accent-bright border border-accent/20
                      hover:bg-accent/20 hover:border-accent/40
                      transition-all duration-200"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
