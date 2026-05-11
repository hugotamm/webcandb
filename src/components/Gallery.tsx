"use client";

import { useTranslations } from "next-intl";
import { openDemo } from "./DemoViewer";

const caseConfigs: Array<{
  key: "karna" | "sizewall" | "studioNorr";
  url: string;
  /** Atmospheric Unsplash photo that hints at industry — NOT a screenshot of the actual site */
  photo: string;
}> = [
  {
    key: "karna",
    url: "https://karna-craft-coffeeshop.lovable.app",
    photo:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop",
  },
  {
    key: "sizewall",
    url: "https://demo-sizewall-precision-scan.lovable.app",
    photo:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop",
  },
  {
    key: "studioNorr",
    url: "https://demo-studio-norr-editorial.lovable.app",
    photo:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80&auto=format&fit=crop",
  },
];

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
            <p className="text-lg text-foreground/85 leading-relaxed font-light">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Language note */}
        <div className="mt-12 max-w-2xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-3">
            — {t("languageNoteLabel")}
          </div>
          <div className="text-lg text-foreground/95 leading-relaxed font-light italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {t("languageNoteTitle")}
          </div>
          <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
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
              {/* Card with atmospheric photo backdrop (industry mood, NOT website screenshot) */}
              <div
                className="aspect-[3/4] relative overflow-hidden border border-border bg-card transition-all duration-[1200ms] ease-out group-hover:border-brand/60"
                style={{
                  backgroundImage: `url(${c.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Cinematic overlays — dim + sepia for atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/85 transition-opacity duration-[1500ms] ease-out group-hover:opacity-80" />
                <div className="absolute inset-0 mix-blend-multiply bg-[#1a0e05]/35" />

                {/* Index number — always visible top-left */}
                <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] uppercase text-foreground/95 tabular-nums font-light"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}>
                  0{i + 1} &nbsp;/&nbsp; 0{cases.length}
                </div>

                {/* Industry tag — top right */}
                <div
                  className="absolute top-5 right-5 text-[9px] tracking-[0.35em] uppercase text-brand text-right max-w-[60%]"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}
                >
                  {c.industry}
                </div>

                {/* Bottom content — name + reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3
                    className="text-3xl lg:text-4xl text-foreground transition-transform duration-[1200ms] ease-out group-hover:-translate-y-2"
                    style={{ fontFamily: "var(--font-playfair), serif", textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}
                  >
                    {c.name}
                  </h3>

                  {/* Hover-revealed: blurb + CTA */}
                  <div className="overflow-hidden">
                    <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[1200ms] ease-out delay-150">
                      <p
                        className="mt-3 text-sm text-foreground/95 leading-relaxed font-light max-w-xs"
                        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}
                      >
                        {c.blurb}
                      </p>
                      <div
                        className="mt-5 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-brand"
                        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}
                      >
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
