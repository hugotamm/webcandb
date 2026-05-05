const cases = [
  {
    name: "Kärna",
    industry: "E-handel · Specialkaffe",
    blurb: "Småskaligt rosteri & e-handel",
    accent: "from-stone-200 to-stone-300",
    text: "text-stone-900",
  },
  {
    name: "Sizewall",
    industry: "B2B Tech · SaaS",
    blurb: "3D-skanning av kroppsmått",
    accent: "from-zinc-900 to-zinc-800",
    text: "text-white",
  },
  {
    name: "Studio Norr",
    industry: "Salong · Skönhet",
    blurb: "Premium hår- & skönhetsstudio",
    accent: "from-rose-100 to-amber-100",
    text: "text-zinc-900",
  },
];

export default function Gallery() {
  return (
    <section id="galleri" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">Utvalda case</span>
        <div className="mt-6 grid lg:grid-cols-2 gap-12 items-end">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            3 exempel hemsidor för 3 olika branscher.
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-md lg:justify-self-end">
            Riktiga, levererade demos. Klicka på ett case för att öppna live-versionen i en ny flik.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <article
              key={c.name}
              className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${c.accent} ${c.text} p-6 flex flex-col justify-between`}>
                <div className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  Demo
                </div>
                <div>
                  <div className="font-serif text-3xl">{c.name}</div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                  Bransch · {c.industry}
                </div>
                <h3 className="mt-2 text-xl font-bold">{c.name.toUpperCase()}</h3>
                <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                <button className="mt-5 inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-hover transition">
                  Se live
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
