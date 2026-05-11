"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { openDemo } from "./DemoViewer";

const caseConfigs = [
  { key: "karna", url: "https://karna-craft-coffeeshop.lovable.app", image: "/cases/karna.png" },
  { key: "sizewall", url: "https://demo-sizewall-precision-scan.lovable.app", image: "/cases/sizewall.png" },
  { key: "studioNorr", url: "https://demo-studio-norr-editorial.lovable.app", image: "/cases/studio-norr.png" },
] as const;

export default function Gallery() {
  const t = useTranslations("Gallery");
  const tDemo = useTranslations("DemoViewer");

  const cases = caseConfigs.map((c) => ({
    ...c,
    name: t(`cases.${c.key}.name`),
    industry: t(`cases.${c.key}.industry`),
    blurb: t(`cases.${c.key}.blurb`),
  }));

  return (
    <section id="galleri" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <div className="mt-6 grid lg:grid-cols-2 gap-12 items-end">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {t("title")}
          </h2>
          <div className="lg:justify-self-end max-w-md space-y-4">
            <p className="text-lg text-foreground/70 leading-relaxed">
              {t("description")}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              {tDemo("viewDesktop")}
              <span className="text-brand/40">·</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {tDemo("viewPhone")}
              <span className="text-brand/40">·</span>
              {t("badgePreview")}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-6 flex gap-4 items-start">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-soft text-brand flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand mb-1">
              {t("languageNoteLabel")}
            </div>
            <div className="font-bold text-base leading-snug">
              {t("languageNoteTitle")}
            </div>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">
              {t("languageNoteBody")}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <button
              key={c.key}
              onClick={() => openDemo({ url: c.url, name: c.name })}
              className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                <Image
                  src={c.image}
                  alt={t("screenshotAlt", { name: c.name })}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-foreground/85 text-background backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                  </svg>
                  /
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </span>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                  {t("industryLabel", { industry: c.industry })}
                </div>
                <h3 className="mt-2 text-xl font-bold">{c.name.toUpperCase()}</h3>
                <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-brand-hover transition">
                  {t("button")}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
