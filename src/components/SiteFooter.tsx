import Link from "next/link";

export function SiteFooter({
  weeks,
  currentWeek,
}: {
  weeks: string[];
  currentWeek: string;
}) {
  return (
    <footer className="relative mt-8">
      <div className="gradient-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {weeks.length > 1 && (
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted mb-3">
              Archive
            </p>
            <div className="flex flex-wrap gap-2">
              {weeks.map((week) => (
                <Link
                  key={week}
                  href={week === weeks[0] ? "/" : `/digest/${week}`}
                  className={`font-mono text-xs px-3 py-1.5 rounded-md border transition-all duration-200 ${
                    week === currentWeek
                      ? "border-accent/40 text-accent bg-accent/10"
                      : "border-rule/50 text-muted hover:border-accent/30 hover:text-primary hover:bg-surface"
                  }`}
                >
                  {week}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-muted">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase">
            Sia Reads What Matters &copy; {new Date().getFullYear()}
          </p>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase">
            Curated by humans. Filtered by taste.
          </p>
        </div>
      </div>
    </footer>
  );
}
