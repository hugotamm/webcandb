const cases = [
  {
    name: "Kärna",
    industry: "E-handel · Specialkaffe",
    blurb: "Småskaligt rosteri & e-handel",
    url: "https://karna-craft-coffeeshop.lovable.app",
    image: "/cases/karna.png",
  },
  {
    name: "Sizewall",
    industry: "B2B Tech · SaaS",
    blurb: "3D-skanning av kroppsmått",
    url: "https://sizewall-precision-scan.lovable.app",
    image: "/cases/sizewall.png",
  },
  {
    name: "Studio Norr",
    industry: "Salong · Skönhet",
    blurb: "Premium hår- & skönhetsstudio",
    url: "https://studio-norr-editorial.lovable.app",
    image: "/cases/studio-norr.png",
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
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={`Skärmbild av ${c.name}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-foreground/85 text-background backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full">
                  Öppnas i ny flik
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                  Bransch · {c.industry}
                </div>
                <h3 className="mt-2 text-xl font-bold">{c.name.toUpperCase()}</h3>
                <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-brand-hover transition">
                  Se live
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
