type Section = {
  id: string;
  title: string;
};

export default function LegalShell({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: Section[];
  children: React.ReactNode;
}) {
  return (
    <article className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Tillbaka till start
        </a>

        <header className="mt-10 pb-10 border-b border-border">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {title}
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl leading-relaxed">
            {intro}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Senast uppdaterad: {updated}
          </div>
        </header>

        <div className="mt-12 grid lg:grid-cols-[260px_1fr] gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                På denna sida
              </div>
              <nav className="space-y-2 text-sm">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex gap-3 text-foreground/70 hover:text-brand transition py-1"
                  >
                    <span className="text-muted/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="legal-content space-y-12 max-w-3xl">{children}</div>
        </div>
      </div>
    </article>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="text-sm font-bold text-brand tabular-nums">
          §{number.toString().padStart(2, "0")}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-4 text-foreground/80 leading-relaxed">{children}</div>
    </section>
  );
}
