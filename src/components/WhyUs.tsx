const reasons = [
  {
    title: "Fast pris från 4 900 kr inkl. moms",
    body: "Inga konsultarvoden, inga överraskningar. Du vet exakt vad du betalar innan vi börjar.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Levererat på 5 dagar",
    body: "Tack vare AI-driven design jobbar vi 10x snabbare än traditionella byråer. Utan att tumma på kvalitén.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Inga prenumerationer",
    body: "Du äger din hemsida. Inga månadsavgifter, inga bindningstider, ingen lock-in.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">Varför Web C&B</span>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
          Snabbare. Tydligare.
          <br />
          Helt utan krångel.
        </h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {reasons.map((r) => (
            <div key={r.title} className="group">
              <div className="w-14 h-14 rounded-xl bg-foreground text-background flex items-center justify-center mb-6 group-hover:scale-105 transition">
                {r.icon}
              </div>
              <h3 className="text-xl font-bold leading-snug">{r.title}</h3>
              <p className="mt-3 text-base text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
