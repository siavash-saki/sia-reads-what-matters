import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Story {
  slug: string;
  title: string;
  hook: string;
  tag: "hot-take" | "release" | "podcast" | "research" | "news";
  heat: number;
  summary: string;
  image?: string;
  links: { label: string; url: string }[];
  date: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllWeeks(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name))
    .sort()
    .reverse();
}

export function getLatestWeek(): string | null {
  const weeks = getAllWeeks();
  return weeks.length > 0 ? weeks[0] : null;
}

export function getStoriesByWeek(weekDate: string): Story[] {
  const weekDir = path.join(CONTENT_DIR, weekDate);
  if (!fs.existsSync(weekDir)) return [];

  const files = fs
    .readdirSync(weekDir)
    .filter((name) => name.endsWith(".md"));

  const stories: Story[] = files.map((filename) => {
    const filePath = path.join(weekDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title ?? "",
      hook: data.hook ?? "",
      tag: data.tag ?? "news",
      heat: Number(data.heat) || 0,
      summary: data.summary ?? "",
      image: data.image || undefined,
      links: Array.isArray(data.links) ? data.links : [],
      date: data.date ?? weekDate,
    };
  });

  return stories.sort((a, b) => b.heat - a.heat);
}
