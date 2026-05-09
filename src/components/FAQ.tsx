"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const t = useTranslations("FAQ");

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: t(`q${n}.question`),
    a: t(`q${n}.answer`),
  }));

  return (
    <section id="faq" className="py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          {t("title")}
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
