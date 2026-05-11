"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Phase = "boot" | "trailer" | "ready" | "fading-out" | "dismissed";

type Copy = {
  heroLine1: string;
  heroLine2: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  tierStart: string;
  tierKlassisk: string;
  tierPremium: string;
  priceUnit: string;
  whyLine1: string;
  whyLine2: string;
  bullet48h: string;
  bulletOwn: string;
  bulletFixedPrice: string;
  bulletNoSub: string;
  press: string;
  taglineSub: string;
  skipHint: string;
};

const COPY_BY_LOCALE: Record<string, Copy> = {
  sv: {
    heroLine1: "Din gamla hemsida.",
    heroLine2: "Helt ny igen.",
    step1: "Skicka er länk",
    step2: "Vi bygger en demo",
    step3: "Ni godkänner",
    step4: "Live på 5 dagar",
    tierStart: "Start",
    tierKlassisk: "Klassisk",
    tierPremium: "Premium",
    priceUnit: "kr",
    whyLine1: "Snabbare. Tydligare.",
    whyLine2: "Helt utan krångel.",
    bullet48h: "48 timmar",
    bulletOwn: "Ni äger sajten",
    bulletFixedPrice: "Fast pris",
    bulletNoSub: "Inga prenumerationer",
    press: "Tryck för att öppna",
    taglineSub: "Changer · Builder",
    skipHint: "Esc för att hoppa över",
  },
  en: {
    heroLine1: "Your old website.",
    heroLine2: "Brand new again.",
    step1: "Send us your link",
    step2: "We build a demo",
    step3: "You approve",
    step4: "Live in 5 days",
    tierStart: "Start",
    tierKlassisk: "Classic",
    tierPremium: "Premium",
    priceUnit: "SEK",
    whyLine1: "Faster. Clearer.",
    whyLine2: "No fuss.",
    bullet48h: "48 hours",
    bulletOwn: "You own the site",
    bulletFixedPrice: "Fixed price",
    bulletNoSub: "No subscriptions",
    press: "Press to enter",
    taglineSub: "Changer · Builder",
    skipHint: "Esc to skip",
  },
};

export default function IntroGate() {
  const locale = useLocale();
  const c = COPY_BY_LOCALE[locale] ?? COPY_BY_LOCALE.sv;
  const [phase, setPhase] = useState<Phase>("boot");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const force =
      typeof window !== "undefined" && new URLSearchParams(window.location.search).has("intro");
    if (force) {
      sessionStorage.removeItem("intro_passed");
    } else if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro_passed") === "1") {
      setPhase("dismissed");
      return;
    }
    document.body.style.overflow = "hidden";

    // Snappier: trailer immediately, PRESS becomes available at 3.5s
    const t0 = setTimeout(() => setPhase("trailer"), 100);
    const t1 = setTimeout(() => setPhase("ready"), 3500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "fading-out" && phase !== "dismissed") {
        e.preventDefault();
        setPhase("ready");
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && phase === "ready") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const dismiss = () => {
    setPhase("fading-out");
    document.body.style.overflow = "";
    sessionStorage.setItem("intro_passed", "1");
    setTimeout(() => setPhase("dismissed"), 1200);
  };

  if (!mounted || phase === "dismissed") return null;

  const playing = phase === "trailer" || phase === "ready";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050403] flex items-center justify-center text-foreground overflow-hidden transition-opacity duration-[1200ms] ease-out ${
        phase === "fading-out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,200,154,0.08) 0%, transparent 55%), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Skip hint */}
      <div
        className={`absolute top-6 right-6 text-[10px] tracking-[0.35em] uppercase text-foreground/40 font-sans transition-opacity duration-700 ${
          phase === "trailer" ? "opacity-100" : "opacity-0"
        }`}
      >
        {c.skipHint}
      </div>

      {/* =================================================================
          PHRASES — fly past while logo stays in the center
          ================================================================= */}
      {playing && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* === Wave 1 (0.1s - 2.5s): Hero glimpses + 48h badge === */}
          <div
            className="absolute left-[6%] top-[14%] text-3xl md:text-5xl text-foreground/95"
            style={{
              animation: "trailL 2.6s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "0.1s",
              opacity: 0,
              textShadow: "0 4px 30px rgba(0,0,0,0.85)",
            }}
          >
            {c.heroLine1}
          </div>
          <div
            className="absolute right-[6%] top-[14%] text-3xl md:text-5xl italic text-brand text-right"
            style={{
              animation: "trailR 2.6s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "0.4s",
              opacity: 0,
              textShadow: "0 4px 40px rgba(217,200,154,0.35)",
            }}
          >
            {c.heroLine2}
          </div>

          <div
            className="absolute left-[10%] top-[80%] flex items-baseline gap-3"
            style={{
              animation: "trailL 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "0.6s",
              opacity: 0,
            }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-brand font-sans">—</span>
            <span className="text-2xl md:text-3xl text-foreground/95" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}>
              {c.bullet48h}
            </span>
          </div>
          <div
            className="absolute right-[10%] top-[80%] text-2xl md:text-3xl text-foreground/95 italic text-right"
            style={{
              animation: "trailR 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "0.9s",
              opacity: 0,
              textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            }}
          >
            {c.bulletFixedPrice}
          </div>

          {/* === Wave 2 (1.2s - 3.6s): Steps + Tiers from sides === */}
          <div
            className="absolute left-[4%] top-[28%] flex items-baseline gap-5"
            style={{
              animation: "trailL 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "1.2s",
              opacity: 0,
            }}
          >
            <span className="text-xs text-brand tabular-nums tracking-widest font-sans">01</span>
            <span className="text-xl md:text-3xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.step1}
            </span>
          </div>
          <div
            className="absolute right-[4%] top-[28%] flex items-baseline gap-5 justify-end"
            style={{
              animation: "trailR 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "1.4s",
              opacity: 0,
            }}
          >
            <span className="text-xs text-brand tabular-nums tracking-widest font-sans">02</span>
            <span className="text-xl md:text-3xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.step2}
            </span>
          </div>

          <div
            className="absolute left-[4%] top-[68%] flex items-baseline gap-5"
            style={{
              animation: "trailL 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "1.5s",
              opacity: 0,
            }}
          >
            <span className="text-xs text-brand tabular-nums tracking-widest font-sans">03</span>
            <span className="text-xl md:text-3xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.step3}
            </span>
          </div>
          <div
            className="absolute right-[4%] top-[68%] flex items-baseline gap-5 justify-end"
            style={{
              animation: "trailR 2.4s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "1.7s",
              opacity: 0,
            }}
          >
            <span className="text-xs text-brand tabular-nums tracking-widest font-sans">04</span>
            <span className="text-xl md:text-3xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.step4}
            </span>
          </div>

          {/* === Wave 3 (2.0s - 4.5s): Pricing from sides + bullets === */}
          <div
            className="absolute left-[2%] top-[44%] flex items-baseline gap-4"
            style={{
              animation: "trailL 2.5s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "2.0s",
              opacity: 0,
            }}
          >
            <span className="text-2xl md:text-4xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.tierStart}
            </span>
            <span className="text-base md:text-xl text-brand tabular-nums font-sans">4 900</span>
            <span className="text-[10px] text-foreground/60 tracking-widest uppercase font-sans">{c.priceUnit}</span>
          </div>
          <div
            className="absolute right-[2%] top-[44%] flex items-baseline gap-4 justify-end"
            style={{
              animation: "trailR 2.5s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "2.2s",
              opacity: 0,
            }}
          >
            <span className="text-2xl md:text-4xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.tierKlassisk}
            </span>
            <span className="text-base md:text-xl text-brand tabular-nums font-sans">11 900</span>
            <span className="text-[10px] text-foreground/60 tracking-widest uppercase font-sans">{c.priceUnit}</span>
          </div>

          <div
            className="absolute left-[2%] top-[54%] flex items-baseline gap-4"
            style={{
              animation: "trailL 2.5s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "2.4s",
              opacity: 0,
            }}
          >
            <span className="text-2xl md:text-4xl text-foreground/90" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}>
              {c.tierPremium}
            </span>
            <span className="text-base md:text-xl text-brand tabular-nums font-sans">24 900</span>
            <span className="text-[10px] text-foreground/60 tracking-widest uppercase font-sans">{c.priceUnit}</span>
          </div>

          {/* === Wave 4 (2.6s - 4.5s): WhyUs taglines === */}
          <div
            className="absolute left-[8%] top-[88%] text-base md:text-xl italic text-foreground/80"
            style={{
              animation: "trailL 2.0s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "2.6s",
              opacity: 0,
            }}
          >
            {c.whyLine1}
          </div>
          <div
            className="absolute right-[8%] top-[88%] text-base md:text-xl italic text-brand text-right"
            style={{
              animation: "trailR 2.0s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "2.8s",
              opacity: 0,
              textShadow: "0 2px 20px rgba(217,200,154,0.25)",
            }}
          >
            {c.whyLine2}
          </div>

          <div
            className="absolute left-[14%] top-[20%] text-[10px] tracking-[0.4em] uppercase text-foreground/60 font-sans"
            style={{
              animation: "trailL 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "3.0s",
              opacity: 0,
            }}
          >
            — {c.bulletOwn}
          </div>
          <div
            className="absolute right-[14%] top-[20%] text-[10px] tracking-[0.4em] uppercase text-foreground/60 font-sans"
            style={{
              animation: "trailR 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "3.2s",
              opacity: 0,
            }}
          >
            {c.bulletNoSub} —
          </div>
        </div>
      )}

      {/* =================================================================
          CENTER LOGO — always present, sharpens over time
          ================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
        <div
          className={`flex flex-col items-center gap-12 transition-all duration-[2200ms] ease-out ${
            phase === "ready" || phase === "fading-out" ? "scale-100" : "scale-95"
          }`}
          style={{
            filter:
              phase === "trailer" ? "blur(6px)" : "blur(0)",
            opacity:
              phase === "boot" ? 0 : phase === "trailer" ? 0.55 : 1,
            transition:
              "filter 2.2s cubic-bezier(0.22,1,0.36,1), opacity 2.2s cubic-bezier(0.22,1,0.36,1), transform 2.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="select-none">
            <div
              className="text-7xl sm:text-8xl lg:text-9xl tracking-[-0.02em] font-normal"
              style={{ textShadow: "0 8px 70px rgba(0,0,0,0.9), 0 0 60px rgba(217,200,154,0.18)" }}
            >
              <span className="text-foreground">Web</span>{" "}
              <span className="text-brand">C&amp;B</span>
            </div>
            <div className="mt-4 text-[10px] tracking-[0.5em] uppercase text-foreground/60 font-sans font-light">
              {c.taglineSub}
            </div>
          </div>

          {/* PRESS appears at 'ready' phase */}
          <button
            onClick={dismiss}
            aria-label={c.press}
            className={`pointer-events-auto group flex flex-col items-center gap-4 cursor-pointer outline-none transition-opacity duration-[1200ms] ease-out ${
              phase === "ready" || phase === "fading-out" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="text-[11px] tracking-[0.45em] uppercase text-foreground/75 font-sans font-light group-hover:text-brand transition-colors duration-700"
              style={{ animation: "pressPulse 3.6s ease-in-out infinite" }}
            >
              {c.press}
            </div>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/55 group-hover:text-brand group-hover:translate-y-1 transition-all duration-700"
              style={{ animation: "arrowFloat 3.6s ease-in-out infinite" }}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="5 12 12 19 19 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes trailL {
          0%   { transform: translateX(-80px); opacity: 0; filter: blur(8px); }
          25%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          70%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          100% { transform: translateX(40px);  opacity: 0; filter: blur(4px); }
        }
        @keyframes trailR {
          0%   { transform: translateX(80px);  opacity: 0; filter: blur(8px); }
          25%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          70%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          100% { transform: translateX(-40px); opacity: 0; filter: blur(4px); }
        }
        @keyframes pressPulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes arrowFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
