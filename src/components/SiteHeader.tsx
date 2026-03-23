import Link from "next/link";

export function SiteHeader({
  weekLabel,
  weekCount,
}: {
  weekLabel: string;
  weekCount?: number;
}) {
  return (
    <header className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Link href="/" className="block group">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent mb-3">
                Weekly AI Intelligence Briefing
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="text-primary">Sia Reads</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#8B5CF6] to-accent-bright">
                  What Matters
                </span>
              </h1>
            </Link>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="font-display text-xl md:text-2xl font-semibold text-primary/60 tracking-tight">
              {weekLabel}
            </p>
            {weekCount !== undefined && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent heat-pulse" />
                <p className="font-mono text-[11px] text-muted tracking-widest uppercase">
                  {weekCount} {weekCount === 1 ? "story" : "stories"} tracked
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="gradient-line" />
    </header>
  );
}
