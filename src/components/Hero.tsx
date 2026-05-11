"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { startCheckout } from "@/lib/checkout";
import { openDemo } from "./DemoViewer";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Hero");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await startCheckout("demo", url || undefined);
    setLoading(false);
  };

  const cases = [
    {
      name: "Kärna",
      tag: "Kaffe",
      url: "https://karna-craft-coffeeshop.lovable.app",
      photo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop",
    },
    {
      name: "Sizewall",
      tag: "B2B Tech",
      url: "https://demo-sizewall-precision-scan.lovable.app",
      photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&auto=format&fit=crop",
    },
    {
      name: "Studio Norr",
      tag: "Salong",
      url: "https://demo-studio-norr-editorial.lovable.app",
      photo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80&auto=format&fit=crop",
    },
  ];

  const featuredPhoto =
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>

          <h1 className="mt-10 text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            {t("titleLine1")}
            <br />
            <em className="text-brand italic">{t("titleLine2")}</em>
          </h1>

          <p className="mt-10 text-lg text-foreground/80 max-w-lg leading-relaxed font-light">
            {t.rich("subtitle", {
              strong: (chunks) => <strong className="text-foreground font-normal">{chunks}</strong>,
            })}
          </p>

          <div className="mt-8 flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-foreground/65">
            <span className="text-brand">—</span>
            <span><strong className="text-foreground font-normal">{t("badge")}</strong></span>
            <span className="text-foreground/40">{t("badgeSubtitle")}</span>
          </div>

          <p
            className="mt-10 text-xl italic text-foreground/80 max-w-md leading-snug"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("quote")}
          </p>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col sm:flex-row gap-4 max-w-lg">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t("inputPlaceholder")}
              className="flex-1 bg-transparent border-b border-foreground/30 px-1 py-3 text-base placeholder:text-foreground/35 focus:outline-none focus:border-brand transition-colors duration-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-4 text-[11px] tracking-[0.35em] uppercase text-brand hover:text-foreground transition-colors duration-700 disabled:opacity-50 whitespace-nowrap self-start sm:self-auto py-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                    <path d="M22 12a10 10 0 0 1-10 10" strokeLinecap="round" />
                  </svg>
                  <span>{t("buttonLoading")}</span>
                </>
              ) : (
                <>
                  <span>{t("buttonPrimary")}</span>
                  <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="mb-4">
            <span className="eyebrow">{t("examplesEyebrow")}</span>
          </div>
          {/* Featured card — opens the phone/desktop preview modal */}
          <button
            type="button"
            onClick={() => openDemo({ url: "https://karna-craft-coffeeshop.lovable.app", name: "Kärna" })}
            className="group relative block overflow-hidden border border-border hover:border-brand/60 transition-all duration-700 text-left cursor-pointer w-full"
            aria-label="Förhandsgranska Kärna"
          >
            <div
              className="aspect-[4/3] relative"
              style={{
                backgroundImage: `url(${featuredPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // Force light text colors locally — overlay is always dark
                "--foreground": "#f5f2e8",
                "--brand": "#ecd9a3",
                "--color-foreground": "#f5f2e8",
                "--color-brand": "#ecd9a3",
                color: "#f5f2e8",
              } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80 transition-opacity duration-700 group-hover:opacity-75" />
              <div className="absolute inset-0 mix-blend-multiply bg-[#1a0e05]/30" />
              <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] uppercase text-brand"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}>
                — Kaffe · Specialkaffe
              </div>
              {/* Phone/desktop preview indicator */}
              <div className="absolute top-5 right-5 inline-flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-foreground/90"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="1" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
                <span className="text-foreground/70">/</span>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                </svg>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <h3 className="text-3xl lg:text-4xl text-foreground"
                  style={{ fontFamily: "var(--font-playfair), serif", textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}>
                  Kärna
                </h3>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/95 group-hover:text-brand transition-colors duration-700"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}>
                  {t("viewLive")}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </div>
          </button>

          <div className="mt-8">
            <span className="eyebrow">{t("moreExamplesEyebrow")}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {cases.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => openDemo({ url: c.url, name: c.name })}
                className="group aspect-[4/5] border border-border overflow-hidden flex flex-col hover:border-brand/60 transition-all duration-700 text-left cursor-pointer"
                aria-label={`Förhandsgranska ${c.name}`}
              >
                <div
                  className="flex-1 relative"
                  style={{
                    backgroundImage: `url(${c.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-700" />
                  <div className="absolute inset-0 mix-blend-multiply bg-[#1a0e05]/30" />
                </div>
                <div className="p-3 bg-card">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-brand">{c.tag}</div>
                  <div className="text-base mt-1" style={{ fontFamily: "var(--font-playfair), serif" }}>{c.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
