export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-brand bg-brand-soft px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand mr-2" />
            AI-driven webdesign · Sverige
          </span>

          <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Din gamla hemsida.
            <br />
            <span className="text-brand italic font-bold">Helt ny igen.</span>
          </h1>

          <p className="mt-8 text-lg text-foreground/70 max-w-md leading-relaxed">
            Klistra in er nuvarande webbadress — vi bygger en modern, snyggare version på 5 dagar. Fast pris. Inga prenumerationer.
          </p>

          <div className="mt-6 flex items-start gap-3">
            <div className="w-10 h-px bg-foreground mt-3" />
            <p className="text-base font-semibold italic">
              Det finns inget företag utan en hemsida.
            </p>
          </div>

          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="url"
              placeholder="https://din-hemsida.se"
              className="flex-1 rounded-full bg-card border border-border px-6 py-4 text-base placeholder:text-muted focus:outline-none focus:border-brand transition"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-7 py-4 text-base font-semibold hover:bg-brand-hover transition shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Få demo för 199 kr
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="mb-4">
            <span className="eyebrow">Hemsidoexempel</span>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 p-6 shadow-xl border border-border overflow-hidden">
            <div className="aspect-[4/3] rounded-xl bg-card shadow-md flex items-center justify-center text-muted">
              <div className="text-center px-8">
                <div className="font-serif text-3xl mb-2">Kärna</div>
                <div className="text-xs uppercase tracking-widest text-muted/70">Specialkaffe · E-handel</div>
                <div className="mt-6 text-sm leading-relaxed">
                  Demo-sida byggd av Web C&B för att visa hur en kunds framtida hemsida skulle kunna se ut.
                </div>
              </div>
            </div>
            <a
              href="https://karna-craft-coffeeshop.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-9 left-9 inline-flex items-center gap-2 bg-foreground text-background text-xs font-semibold px-3 py-2 rounded-full hover:bg-foreground/80 transition"
            >
              Se live
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          <div className="mt-8">
            <span className="eyebrow">Fler exempel</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { name: "Kärna", tag: "Kaffe", url: "https://karna-craft-coffeeshop.lovable.app" },
              { name: "Sizewall", tag: "B2B Tech", url: "https://sizewall-precision-scan.lovable.app" },
              { name: "Studio Norr", tag: "Salong", url: "https://studio-norr-editorial.lovable.app" },
            ].map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-[4/5] rounded-xl bg-card border border-border p-3 flex flex-col justify-end hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-[10px] uppercase tracking-widest text-muted/70">{c.tag}</div>
                <div className="font-semibold text-sm mt-1">{c.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
