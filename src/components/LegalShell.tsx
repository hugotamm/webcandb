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
    <article className="py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <a
          href="/"
          className="group inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-foreground/60 hover:text-brand transition-colors duration-700"
        >
          <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
          <span>Tillbaka till start</span>
        </a>

        <header className="mt-16 pb-16 border-b border-foreground/10">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-10 text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            {title}
          </h1>
          <p className="mt-10 text-lg text-foreground/80 max-w-3xl leading-relaxed font-light">
            {intro}
          </p>
          <div className="mt-10 text-[10px] tracking-[0.4em] uppercase text-foreground/55">
            — Senast uppdaterad: {updated}
          </div>
        </header>

        <div className="mt-16 grid lg:grid-cols-[280px_1fr] gap-16 lg:gap-24">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-8">
                — På denna sida
              </div>
              <nav className="space-y-3 text-sm font-light">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex gap-4 text-foreground/70 hover:text-brand transition-colors duration-700 py-1"
                  >
                    <span className="text-brand tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="legal-content space-y-16 max-w-3xl text-foreground/85 font-light leading-relaxed">{children}</div>
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
      <div className="flex items-baseline gap-6 mb-8">
        <span className="text-xs tracking-[0.3em] text-brand tabular-nums font-sans">
          §{number.toString().padStart(2, "0")}
        </span>
        <h2
          className="text-2xl sm:text-3xl leading-snug"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-5 text-foreground/80 leading-relaxed font-light">{children}</div>
    </section>
  );
}
