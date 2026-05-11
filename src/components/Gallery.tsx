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

  const cases = caseConfigs.map((c) => ({
    ...c,
    name: t(`cases.${c.key}.name`),
    industry: t(`cases.${c.key}.industry`),
    blurb: t(`cases.${c.key}.blurb`),
  }));

  return (
    <section id="galleri" className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <div className="mt-8 grid lg:grid-cols-2 gap-12 items-end">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {t("title")}
          </h2>
          <div className="lg:justify-self-end max-w-md">
            <p className="text-lg text-foreground/60 leading-relaxed font-light">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Language note — slim, mysterious */}
        <div className="mt-12 max-w-2xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-brand/70 mb-3">
            — {t("languageNoteLabel")}
          </div>
          <div className="text-lg text-foreground/70 leading-relaxed font-light italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {t("languageNoteTitle")}
          </div>
          <p className="mt-3 text-sm text-foreground/40 leading-relaxed">
            {t("languageNoteBody")}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cases.map((c, i) => (
            <button
              key={c.key}
              onClick={() => openDemo({ url: c.url, name: c.name })}
              className="group relative text-left cursor-pointer"
              aria-label={`${t("button")}: ${c.name}`}
            >
              {/* Image area */}
              <div className="aspect-[3/4] relative overflow-hidden bg-card">
                {/* Image — desaturated by default, color on hover */}
                <Image
                  src={c.image}
                  alt={t("screenshotAlt", { name: c.name })}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                  className="object-cover object-top transition-all duration-[1500ms] ease-out grayscale brightness-[0.55] group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-[1.03]"
                />

                {/* Dark overlay that lifts on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-100 group-hover:opacity-30 transition-opacity duration-[1500ms] ease-out" />

                {/* Index number — always visible top-left */}
                <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] uppercase text-foreground/40 tabular-nums font-light">
                  0{i + 1} &nbsp;/&nbsp; 0{cases.length}
                </div>

                {/* Bottom content — gradually reveals */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  {/* Always-visible: name */}
                  <h3
                    className="text-3xl lg:text-4xl text-foreground transition-transform duration-[1200ms] ease-out group-hover:-translate-y-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {c.name}
                  </h3>

                  {/* Hover-revealed: industry + blurb */}
                  <div className="overflow-hidden">
                    <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[1200ms] ease-out delay-150">
                      <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-brand">
                        {c.industry}
                      </div>
                      <p className="mt-3 text-sm text-foreground/70 leading-relaxed font-light max-w-xs">
                        {c.blurb}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/70">
                        <span>{t("button")}</span>
                        <span className="w-6 h-px bg-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
