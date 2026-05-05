"use client";

import { useState } from "react";
import { demoMailto } from "@/lib/mailto";

type Pages = "1" | "5" | "10";
type Ecom = "no" | "small" | "large";

const priceMatrix: Record<Pages, Record<Ecom, number>> = {
  "1":  { no: 4900,  small: 7900,  large: 14900 },
  "5":  { no: 9900,  small: 11900, large: 17900 },
  "10": { no: 19900, small: 22900, large: 24900 },
};

const formatKr = (n: number) =>
  n.toLocaleString("sv-SE").replace(/,/g, " ") + " kr";

export default function Calculator() {
  const [pages, setPages] = useState<Pages>("5");
  const [ecom, setEcom] = useState<Ecom>("small");

  const price = priceMatrix[pages][ecom];

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-w-0 rounded-xl border px-4 py-3.5 text-sm font-medium transition ${
        active
          ? "border-brand bg-brand-soft text-foreground"
          : "border-border bg-card text-muted hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="kalkylator" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">Priskalkylator</span>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Räkna ut ditt pris.
        </h2>
        <p className="mt-6 text-lg text-foreground/70 max-w-xl leading-relaxed">
          Justera valen — priset uppdateras direkt. Allt är fast pris inkl. moms.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card border border-border p-7 lg:p-9">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                Antal sidor
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Pill active={pages === "1"} onClick={() => setPages("1")}>
                  1 sida (one-pager)
                </Pill>
                <Pill active={pages === "5"} onClick={() => setPages("5")}>
                  Upp till 5 sidor
                </Pill>
                <Pill active={pages === "10"} onClick={() => setPages("10")}>
                  10+ sidor
                </Pill>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                E-handel
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Pill active={ecom === "no"} onClick={() => setEcom("no")}>
                  Nej
                </Pill>
                <Pill active={ecom === "small"} onClick={() => setEcom("small")}>
                  Ja, upp till 20 produkter
                </Pill>
                <Pill active={ecom === "large"} onClick={() => setEcom("large")}>
                  Ja, 20+ produkter
                </Pill>
              </div>
            </div>

            <hr className="my-8 border-border" />

            <div className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
              Alltid ingår
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {[
                "Mobilanpassad design",
                "SEO-grunder & SSL",
                "Hjälp med domän & hosting",
                "Du äger sajten",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-dark-bg text-white p-8 lg:p-12 flex flex-col justify-between min-h-[420px]">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                Uppskattat fast pris
              </span>
              <div className="mt-8 text-6xl lg:text-7xl font-bold tracking-tight tabular-nums">
                {formatKr(price)}
              </div>
              <div className="mt-3 text-sm text-white/60">
                Engångsbelopp inkl. moms · Slutpris bekräftas i offerten
              </div>
            </div>
            <a
              href={demoMailto()}
              className="mt-10 w-full rounded-full bg-brand text-white py-4 font-semibold hover:bg-brand-hover transition flex items-center justify-center gap-2"
            >
              Få demo för 199 kr
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
