"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { startCheckout } from "@/lib/checkout";

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
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-brand bg-brand-soft px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand mr-2" />
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            {t("titleLine1")}
            <br />
            <span className="text-brand italic font-bold">{t("titleLine2")}</span>
          </h1>

          <p className="mt-8 text-lg text-foreground/70 max-w-lg leading-relaxed">
            {t.rich("subtitle", {
              strong: (chunks) => <strong className="text-foreground">{chunks}</strong>,
            })}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-soft border border-brand/20 px-4 py-2 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand flex-shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-foreground">
              <strong>{t("badge")}</strong> <span className="text-muted">{t("badgeSubtitle")}</span>
            </span>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <div className="w-10 h-px bg-foreground mt-3" />
            <p className="text-base font-semibold italic">
              {t("quote")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t("inputPlaceholder")}
              className="flex-1 rounded-full bg-card border border-border px-6 py-4 text-base placeholder:text-muted focus:outline-none focus:border-brand transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-7 py-4 text-base font-semibold hover:bg-brand-hover transition shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-70 disabled:cursor-wait"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                    <path d="M22 12a10 10 0 0 1-10 10" strokeLinecap="round" />
                  </svg>
                  {t("buttonLoading")}
                </>
              ) : (
                <>
                  {t("buttonPrimary")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="mb-4">
            <span className="eyebrow">{t("examplesEyebrow")}</span>
          </div>
          {/* Featured card — atmospheric photo, not a website screenshot */}
          <a
            href="https://karna-craft-coffeeshop.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden border border-border hover:border-brand/60 transition-all duration-700"
          >
            <div
              className="aspect-[4/3] relative"
              style={{
                backgroundImage: `url(${featuredPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80 transition-opacity duration-700 group-hover:opacity-75" />
              <div className="absolute inset-0 mix-blend-multiply bg-[#1a0e05]/30" />
              <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] uppercase text-brand"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}>
                — Kaffe · Specialkaffe
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <h3 className="text-3xl lg:text-4xl text-foreground"
                  style={{ fontFamily: "var(--font-playfair), serif", textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}>
                  Kärna
                </h3>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/95"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}>
                  {t("viewLive")}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <div className="mt-8">
            <span className="eyebrow">{t("moreExamplesEyebrow")}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {cases.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group aspect-[4/5] border border-border overflow-hidden flex flex-col hover:border-brand/60 transition-all duration-700"
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
