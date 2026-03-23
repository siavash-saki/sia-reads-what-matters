import { notFound } from "next/navigation";
import {
  getAllWeeks,
  getStoriesByWeek,
} from "@/lib/content";
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

export function generateStaticParams() {
  return getAllWeeks().map((date) => ({ date }));
}

export function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  return params.then(({ date }) => ({
    title: `Week of ${formatWeekLabel(date)} — Sia Reads What Matters`,
  }));
}

export default async function DigestPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const stories = getStoriesByWeek(date);
  if (stories.length === 0) notFound();

  const allWeeks = getAllWeeks();

  return (
    <>
      <SiteHeader
        weekLabel={`Week of ${formatWeekLabel(date)}`}
        weekCount={stories.length}
      />

      <main className="max-w-7xl mx-auto">
        <DigestGrid stories={stories} />
      </main>

      <SiteFooter weeks={allWeeks} currentWeek={date} />
    </>
  );
}
