"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Hur snabbt kan ni leverera?",
    a: "Vi levererar enligt det paket ni väljer: Start på 5 dagar, Klassisk på 10 dagar och Premium på 15 dagar. Demo-versionen får ni inom 24–48 timmar efter ni klistrat in er nuvarande webbadress.",
  },
  {
    q: "Vad händer efter att sidan är levererad?",
    a: "Ni äger sajten — det finns ingen lock-in. Vi hjälper er sätta upp domän och hosting i ert eget namn. Behöver ni uppdateringar senare återkommer ni till oss eller hanterar det själva.",
  },
  {
    q: "Vad ingår i 199 kr-demon?",
    a: "Ni får en fungerande, designad version av er nya hemsida — byggd specifikt för er. Ingen mall. Beloppet dras av om ni väljer att gå vidare med ett av paketen.",
  },
  {
    q: "Tillkommer det några löpande kostnader?",
    a: "Endast hosting (ca 99 kr/mån) och domän (ca 150 kr/år), som ni betalar direkt till leverantören — inte till oss. Inga prenumerationer eller månadsavgifter från Web C&B.",
  },
  {
    q: "Kan jag flytta min befintliga domän hit?",
    a: "Ja. Vi hjälper er peka om DNS:en så att er befintliga adress fungerar med den nya sidan. Nedtid är normalt under en timme och vi planerar in det när det stör minst.",
  },
  {
    q: "Vad händer med min Stripe / betalning / e-post?",
    a: "Allt sådant är frikopplat från sajten och påverkas inte. Ert Stripe-konto, era e-postadresser och era integrationer fortsätter fungera som tidigare — vi kopplar bara in dem i den nya sidan.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">Vanliga frågor</span>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Allt ni undrar — utan krångel.
        </h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between gap-6 text-left hover:text-brand transition"
                >
                  <span className="font-bold text-lg">{f.q}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-transform ${
                      isOpen ? "rotate-45 bg-brand text-white border-brand" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-foreground/70 leading-relaxed pr-12">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
