import type { Story } from "@/lib/content";
import { StoryCard } from "./StoryCard";

export function DigestGrid({ stories }: { stories: Story[] }) {
  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-12 h-12 rounded-full border border-rule flex items-center justify-center">
          <span className="text-muted text-lg">?</span>
        </div>
        <p className="font-mono text-muted text-sm tracking-widest uppercase">
          No stories this week
        </p>
      </div>
    );
  }

  const [featured, ...rest] = stories;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      <StoryCard story={featured} featured />
      {rest.map((story) => (
        <StoryCard key={story.slug} story={story} />
      ))}
    </div>
  );
}
