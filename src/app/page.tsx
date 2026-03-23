import { getLatestWeek, getStoriesByWeek, getAllWeeks } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import { DigestGrid } from "@/components/DigestGrid";
import { SiteFooter } from "@/components/SiteFooter";

function formatWeekLabel(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomePage() {
  const latestWeek = getLatestWeek();

  if (!latestWeek) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="font-mono text-muted text-sm tracking-wide">
          NO DIGESTS YET.
        </p>
      </main>
    );
  }

  const stories = getStoriesByWeek(latestWeek);
  const allWeeks = getAllWeeks();

  return (
    <>
      <SiteHeader
        weekLabel={`Week of ${formatWeekLabel(latestWeek)}`}
        weekCount={stories.length}
      />

      <main className="max-w-7xl mx-auto">
        <DigestGrid stories={stories} />
      </main>

      <SiteFooter weeks={allWeeks} currentWeek={latestWeek} />
    </>
  );
}
