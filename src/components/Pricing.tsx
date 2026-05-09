"use client";

import { useTranslations } from "next-intl";
import { startCheckout } from "@/lib/checkout";
import type { PackageId } from "@/lib/stripe-products";

const tierIds: PackageId[] = ["start", "klassisk", "premium"];
const featuredId: PackageId = "klassisk";

export default function Pricing() {
  const t = useTranslations("Pricing");

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

  const badges = [t("badge1"), t("badge2"), t("badge3"), t("badge4")];

  return (
    <section id="priser" className="py-24 lg:py-32 bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-brand">
          • {t("eyebrow")}
        </span>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h2>
        <p className="mt-8 text-lg text-white/70 max-w-3xl leading-relaxed">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {badges.map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                tier.featured
                  ? "bg-white text-zinc-900 shadow-2xl"
                  : "bg-white/[0.03] border border-white/10 text-white"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {t("popularBadge")}
                </span>
              )}
              <div className="text-sm font-semibold uppercase tracking-widest opacity-60 mb-3">
                {tier.name}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                <span className="text-xl font-semibold opacity-60">{t("priceUnit")}</span>
              </div>
              <div className={`mt-1 text-xs uppercase tracking-widest ${tier.featured ? "text-zinc-500" : "text-white/50"}`}>
                {t("priceLabel")}
              </div>
              <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${tier.featured ? "text-brand" : "text-brand"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                {tier.delivery}
              </div>
              <p className={`mt-6 text-sm leading-relaxed ${tier.featured ? "text-zinc-600" : "text-white/70"}`}>
                {tier.blurb}
              </p>
              <hr className={`my-6 ${tier.featured ? "border-zinc-200" : "border-white/10"}`} />
              <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${tier.featured ? "text-zinc-900" : "text-white"}`}>
                {t("includes")}
              </div>
              <ul className="space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${tier.featured ? "text-emerald-700" : "text-brand"} flex-shrink-0 mt-0.5`}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className={tier.featured ? "text-zinc-800" : "text-white/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => startCheckout(tier.id)}
                className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition ${
                  tier.featured
                    ? "bg-emerald-700 text-white hover:bg-emerald-800"
                    : "bg-white text-zinc-900 hover:bg-white/90"
                }`}
              >
                {tier.cta} →
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
