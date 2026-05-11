"use client";

import { useTranslations } from "next-intl";
import { openDemo } from "./DemoViewer";

type CaseTone = {
  /** Frame background gradient (subtle, hint at industry vibe) */
  gradient: string;
  /** Decorative SVG glyph for the industry */
  glyph: React.ReactNode;
};

const caseConfigs: Array<{
  key: "karna" | "sizewall" | "studioNorr";
  url: string;
  tone: CaseTone;
}> = [
  {
    key: "karna",
    url: "https://karna-craft-coffeeshop.lovable.app",
    tone: {
      gradient:
        "linear-gradient(140deg, rgba(110, 70, 40, 0.18) 0%, rgba(50, 30, 20, 0.04) 60%, transparent 100%)",
      // coffee bean
      glyph: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(-25 12 12)" />
          <path d="M 8.5 5 Q 12 12 15.5 19" transform="rotate(-25 12 12)" />
        </svg>
      ),
    },
  },
  {
    key: "sizewall",
    url: "https://demo-sizewall-precision-scan.lovable.app",
    tone: {
      gradient:
        "linear-gradient(140deg, rgba(90, 110, 140, 0.16) 0%, rgba(40, 60, 80, 0.04) 60%, transparent 100%)",
      // technical / measurement grid
      glyph: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" />
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="14" x2="20" y2="14" />
          <line x1="9" y1="4" x2="9" y2="20" />
          <line x1="14" y1="4" x2="14" y2="20" />
        </svg>
      ),
    },
  },
  {
    key: "studioNorr",
    url: "https://demo-studio-norr-editorial.lovable.app",
    tone: {
      gradient:
        "linear-gradient(140deg, rgba(150, 100, 100, 0.16) 0%, rgba(60, 40, 50, 0.04) 60%, transparent 100%)",
      // elegant scissors / salon
      glyph: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.5" y2="15.5" />
          <line x1="20" y1="20" x2="8.5" y2="8.5" />
        </svg>
      ),
    },
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
              {/* Card frame — no screenshot, just stylized type + industry hint */}
              <div
                className="aspect-[3/4] relative overflow-hidden border border-border bg-card transition-all duration-[1200ms] ease-out group-hover:border-brand/60"
                style={{ backgroundImage: c.tone.gradient }}
              >
                {/* Decorative glyph — sits softly in upper-middle, fades on hover */}
                <div
                  className="absolute top-[20%] left-1/2 -translate-x-1/2 text-foreground/15 transition-all duration-[1200ms] ease-out group-hover:text-brand/40 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {c.tone.glyph}
                </div>

                {/* Index number — always visible top-left */}
                <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] uppercase text-foreground/55 tabular-nums font-light">
                  0{i + 1} &nbsp;/&nbsp; 0{cases.length}
                </div>

                {/* Industry tag — top right */}
                <div className="absolute top-5 right-5 text-[9px] tracking-[0.35em] uppercase text-brand/80 text-right max-w-[60%]">
                  {c.industry}
                </div>

                {/* Bottom content — name + reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 border-t border-border/60 bg-card/40 backdrop-blur-sm">
                  {/* Always-visible: name */}
                  <h3
                    className="text-3xl lg:text-4xl text-foreground transition-transform duration-[1200ms] ease-out group-hover:-translate-y-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {c.name}
                  </h3>

                  {/* Hover-revealed: blurb + CTA */}
                  <div className="overflow-hidden">
                    <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[1200ms] ease-out delay-150">
                      <p className="mt-3 text-sm text-foreground/85 leading-relaxed font-light max-w-xs">
                        {c.blurb}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-brand">
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
