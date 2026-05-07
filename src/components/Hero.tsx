"use client";

import { useState } from "react";
import Image from "next/image";
import { startCheckout } from "@/lib/checkout";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await startCheckout("demo", url || undefined);
    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-brand bg-brand-soft px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand mr-2" />
            AI-driven webdesign · Sverige
          </span>

          <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Din gamla hemsida.
            <br />
            <span className="text-brand italic font-bold">Helt ny igen.</span>
          </h1>

          <p className="mt-8 text-lg text-foreground/70 max-w-lg leading-relaxed">
            Klistra in er nuvarande webbadress — inom <strong className="text-foreground">48 timmar</strong> levererar vi en personlig demo. Ni finjusterar med oss, lägger in era bilder, och vi tar fram en plan tillsammans.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-soft border border-brand/20 px-4 py-2 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand flex-shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-foreground">
              <strong>Inget köpkrav.</strong> <span className="text-muted">Demo:n är inspiration.</span>
            </span>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <div className="w-10 h-px bg-foreground mt-3" />
            <p className="text-base font-semibold italic">
              Det finns inget företag utan en hemsida.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://din-hemsida.se"
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
                  Öppnar checkout…
                </>
              ) : (
                <>
                  Få demo för 199 kr
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
            <span className="eyebrow">Hemsidoexempel</span>
          </div>
          <a
            href="https://karna-craft-coffeeshop.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 p-3 shadow-xl border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-card shadow-md relative">
              <Image
                src="/cases/karna.png"
                alt="Skärmbild av Kärna-demon"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            <span className="absolute top-6 left-6 inline-flex items-center gap-2 bg-foreground text-background text-xs font-semibold px-3 py-2 rounded-full">
              Se live
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </a>

          <div className="mt-8">
            <span className="eyebrow">Fler exempel</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { name: "Kärna", tag: "Kaffe", url: "https://karna-craft-coffeeshop.lovable.app", image: "/cases/karna.png" },
              { name: "Sizewall", tag: "B2B Tech", url: "https://sizewall-precision-scan.lovable.app", image: "/cases/sizewall.png" },
              { name: "Studio Norr", tag: "Salong", url: "https://studio-norr-editorial.lovable.app", image: "/cases/studio-norr.png" },
            ].map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group aspect-[4/5] rounded-xl bg-card border border-border overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex-1 overflow-hidden bg-stone-100 relative">
                  <Image
                    src={c.image}
                    alt={`Skärmbild av ${c.name}`}
                    fill
                    sizes="200px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted/70">{c.tag}</div>
                  <div className="font-semibold text-sm mt-0.5">{c.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
