"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { startCheckout } from "@/lib/checkout";

type Pages = "1" | "5" | "10";
type Ecom = "no" | "small" | "large";

const priceMatrix: Record<Pages, Record<Ecom, number>> = {
  "1":  { no: 4900,  small: 7900,  large: 14900 },
  "5":  { no: 9900,  small: 11900, large: 17900 },
  "10": { no: 19900, small: 22900, large: 24900 },
};

export default function Calculator() {
  const [pages, setPages] = useState<Pages>("5");
  const [ecom, setEcom] = useState<Ecom>("small");
  const t = useTranslations("Calculator");
  const locale = useLocale();

  const formatPrice = (n: number) => {
    const formatted = n.toLocaleString(locale === "sv" ? "sv-SE" : "en-US").replace(/,/g, " ");
    return `${formatted} ${locale === "sv" ? "kr" : "SEK"}`;
  };

  const price = priceMatrix[pages][ecom];
  const includes = [t("include1"), t("include2"), t("include3"), t("include4")];

  const Choice = ({
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
      className={`text-left py-3 text-sm font-light leading-snug border-b transition-colors duration-700 ${
        active
          ? "text-foreground border-brand"
          : "text-foreground/55 hover:text-foreground border-foreground/15"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="kalkylator" className="py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl leading-tight">
          {t("title")}
        </h2>
        <p className="mt-8 text-lg text-foreground/75 max-w-xl leading-relaxed font-light">
          {t("description")}
        </p>

        <div className="mt-20 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          {/* Choices */}
          <div className="space-y-12">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-5">
                — {t("labelPages")}
              </div>
              <div className="grid gap-1">
                <Choice active={pages === "1"} onClick={() => setPages("1")}>
                  {t("pillPages1")}
                </Choice>
                <Choice active={pages === "5"} onClick={() => setPages("5")}>
                  {t("pillPages5")}
                </Choice>
                <Choice active={pages === "10"} onClick={() => setPages("10")}>
                  {t("pillPages10")}
                </Choice>
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-5">
                — {t("labelEcom")}
              </div>
              <div className="grid gap-1">
                <Choice active={ecom === "no"} onClick={() => setEcom("no")}>
                  {t("pillEcomNo")}
                </Choice>
                <Choice active={ecom === "small"} onClick={() => setEcom("small")}>
                  {t("pillEcomSmall")}
                </Choice>
                <Choice active={ecom === "large"} onClick={() => setEcom("large")}>
                  {t("pillEcomLarge")}
                </Choice>
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-5">
                — {t("labelIncludes")}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 font-light leading-relaxed">
                    <span className="text-brand pt-1">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price panel */}
          <div className="bg-dark-bg p-10 lg:p-14 border border-foreground/10 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-brand">
                — {t("priceLabel")}
              </div>
              <div
                className="mt-12 text-6xl lg:text-7xl tracking-tight tabular-nums leading-none"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {formatPrice(price)}
              </div>
              <div className="mt-5 text-sm text-foreground/55 font-light max-w-md leading-relaxed">
                {t("priceNote")}
              </div>
            </div>
            <button
              onClick={() => startCheckout("demo")}
              className="group mt-12 inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-brand hover:text-foreground transition-colors duration-700 self-start"
            >
              <span>{t("button")}</span>
              <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
