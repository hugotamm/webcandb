import { orderMailto } from "@/lib/mailto";

const tiers = [
  {
    name: "Start",
    price: "4 900",
    delivery: "Live på 5 dagar",
    blurb: "Perfekt för småföretag, frilansare och enmansbolag som behöver en snygg digital närvaro.",
    features: [
      "1-sidig landing page (one-pager)",
      "Mobilanpassad & snabbladdad",
      "Kontaktformulär kopplat till er e-post",
      "Hjälp att koppla domän (.se / .com)",
      "Vi hjälper er sätta upp hosting",
      "Grundläggande SEO & Google-indexering",
    ],
    cta: "Beställ Start",
    featured: false,
  },
  {
    name: "Klassisk",
    price: "11 900",
    delivery: "Live på 10 dagar",
    blurb: "För restauranger, salonger, butiker och tjänsteföretag som vill ha en komplett sida.",
    features: [
      "Allt i Start",
      "Upp till 5 sidor (meny, om oss, tjänster m.m.)",
      "Bokning- eller bordsbokning-integration",
      "SEO-grunder + Google Business-koppling",
      "Bildgalleri och Instagram-flöde",
      "1 omgång designjusteringar ingår",
    ],
    cta: "Beställ Klassisk",
    featured: true,
  },
  {
    name: "Premium",
    price: "24 900",
    delivery: "Live på 15 dagar",
    blurb: "För växande företag som vill ha en helt skräddarsydd sajt med mer funktionalitet.",
    features: [
      "Allt i Klassisk",
      "Helt custom-design (unik för er)",
      "Bloggfunktion / nyhetsmodul",
      "E-handel-grund (upp till 20 produkter)",
      "Analytics & konverteringsspårning",
      "2 omgångar designjusteringar ingår",
    ],
    cta: "Beställ Premium",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="priser" className="py-24 lg:py-32 bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-brand">
          • Priser & Paket
        </span>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
          Fast pris. Tydlig leverans.
          <br />
          Inga överraskningar.
        </h2>
        <p className="mt-8 text-lg text-white/70 max-w-3xl leading-relaxed">
          Web C&B är en svensk webbyrå som gör om trötta, daterade hemsidor till moderna, snabba och konverteringsstarka sajter — med hjälp av AI och svensk designhantverk. Du klistrar in din nuvarande webbadress, vi levererar en helt ny version på några dagar. Allt till ett fast pris, utan prenumerationer eller bindningstider.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {["Fast pris från start", "Leverans på 5–15 dagar", "Du äger hemsidan", "Inga månadsavgifter"].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                t.featured
                  ? "bg-white text-zinc-900 shadow-2xl"
                  : "bg-white/[0.03] border border-white/10 text-white"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Populärast
                </span>
              )}
              <div className="text-sm font-semibold uppercase tracking-widest opacity-60 mb-3">
                {t.name}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">{t.price}</span>
                <span className="text-xl font-semibold opacity-60">kr</span>
              </div>
              <div className={`mt-1 text-xs uppercase tracking-widest ${t.featured ? "text-zinc-500" : "text-white/50"}`}>
                Engångsbelopp · Inkl. moms
              </div>
              <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${t.featured ? "text-brand" : "text-brand"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                {t.delivery}
              </div>
              <p className={`mt-6 text-sm leading-relaxed ${t.featured ? "text-zinc-600" : "text-white/70"}`}>
                {t.blurb}
              </p>
              <hr className={`my-6 ${t.featured ? "border-zinc-200" : "border-white/10"}`} />
              <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${t.featured ? "text-zinc-900" : "text-white"}`}>
                Det här ingår
              </div>
              <ul className="space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${t.featured ? "text-emerald-700" : "text-brand"} flex-shrink-0 mt-0.5`}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className={t.featured ? "text-zinc-800" : "text-white/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={orderMailto(t.name, `${t.price} kr`)}
                className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition ${
                  t.featured
                    ? "bg-emerald-700 text-white hover:bg-emerald-800"
                    : "bg-white text-zinc-900 hover:bg-white/90"
                }`}
              >
                {t.cta} →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
          Alla priser är engångsbelopp inkl. moms. Utöver det fasta priset tillkommer endast hosting (ca 99 kr/mån) och domän (ca 150 kr/år) — vi hjälper er sätta upp det. Återkundsförmånen ger upp till 30% rabatt nästa gång.
        </p>
      </div>
    </section>
  );
}
