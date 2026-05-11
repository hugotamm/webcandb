"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const t = useTranslations("FAQ");

  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({
    q: t(`q${n}.question`),
    a: t(`q${n}.answer`),
  }));

  return (
    <section id="faq" className="py-32 lg:py-48 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl leading-tight">
          {t("title")}
        </h2>

        <div className="mt-16 border-t border-foreground/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-foreground/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group w-full py-8 flex items-center gap-8 text-left transition-colors duration-700"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs tracking-[0.3em] uppercase text-foreground/70 tabular-nums w-8">
                    0{i + 1}
                  </span>
                  <span
                    className={`flex-1 text-xl lg:text-2xl leading-snug transition-colors duration-700 ${
                      isOpen ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-6 h-6 transition-transform duration-[900ms] ease-out ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute w-5 h-px bg-current" />
                    <span
                      className={`absolute w-5 h-px bg-current rotate-90 transition-opacity duration-700 ${
                        isOpen ? "opacity-100" : "opacity-100"
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-[1000ms] ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base lg:text-lg text-foreground/85 leading-relaxed font-light pl-16 pr-12 max-w-3xl">
                      {f.a}
                    </p>
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
