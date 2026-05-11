"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { startCheckout } from "@/lib/checkout";
import type { PackageId } from "@/lib/stripe-products";

const tierIds: PackageId[] = ["start", "klassisk", "premium"];
const featuredId: PackageId = "klassisk";

export default function Pricing() {
  const t = useTranslations("Pricing");
  const [openTier, setOpenTier] = useState<PackageId | null>(null);

  const tiers = tierIds.map((id) => ({
    id,
    name: t(`tiers.${id}.name`),
    price: t(`tiers.${id}.price`),
    delivery: t(`tiers.${id}.delivery`),
    blurb: t(`tiers.${id}.blurb`),
    features: [1, 2, 3, 4, 5, 6].map((n) => t(`tiers.${id}.feature${n}`)),
    cta: t(`tiers.${id}.cta`),
    featured: id === featuredId,
  }));

  return (
    <section id="priser" className="py-32 lg:py-48 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
          {t("titleLine1")}
          <br />
          <em className="text-brand">{t("titleLine2")}</em>
        </h2>
        <p className="mt-10 text-lg text-foreground/80 max-w-2xl leading-relaxed font-light">
          {t("description")}
        </p>

        <div className="mt-20 divide-y divide-foreground/10 border-y border-foreground/10">
          {tiers.map((tier) => {
            const isOpen = openTier === tier.id;
            return (
              <div
                key={tier.id}
                className="group relative py-12 lg:py-16"
              >
                <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start">
                  <div>
                    <div className="flex items-baseline gap-6 flex-wrap">
                      <h3
                        className="text-5xl lg:text-7xl text-foreground/80 group-hover:text-foreground transition-colors duration-700"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {tier.name}
                      </h3>
                      {tier.featured && (
                        <span className="text-[10px] tracking-[0.4em] uppercase text-brand">
                          — {t("popularBadge")}
                        </span>
                      )}
                    </div>
                    <p className="mt-6 text-base lg:text-lg text-foreground/85 max-w-xl leading-relaxed font-light">
                      {tier.blurb}
                    </p>

                    {/* Click to expand features */}
                    <button
                      onClick={() => setOpenTier(isOpen ? null : tier.id)}
                      className="mt-8 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/80 hover:text-brand transition-colors duration-700"
                      aria-expanded={isOpen}
                    >
                      <span>{isOpen ? "—" : "+"} {t("includes")}</span>
                    </button>

                    {/* Features — slow expand */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-[1000ms] ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-2xl">
                          {tier.features.map((f, i) => (
                            <li
                              key={f}
                              className={`flex gap-4 text-sm text-foreground/90 font-light leading-relaxed transition-all duration-[800ms] ease-out ${
                                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                              }`}
                              style={{ transitionDelay: isOpen ? `${i * 80}ms` : "0ms" }}
                            >
                              <span className="text-brand text-xs tabular-nums pt-1">0{i + 1}</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:text-right space-y-6">
                    <div>
                      <div className="text-[10px] tracking-[0.4em] uppercase text-foreground/90 mb-3">
                        {tier.delivery}
                      </div>
                      <div
                        className="text-5xl lg:text-6xl text-foreground/90 tabular-nums"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {tier.price}
                        <span className="text-lg text-foreground/90 ml-2 font-light">{t("priceUnit")}</span>
                      </div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/90 mt-2">
                        {t("priceLabel")}
                      </div>
                    </div>

                    <button
                      onClick={() => startCheckout(tier.id)}
                      className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-brand hover:text-foreground transition-colors duration-700"
                    >
                      <span>{tier.cta}</span>
                      <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-16 text-xs text-foreground/90 max-w-2xl leading-relaxed font-light">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
