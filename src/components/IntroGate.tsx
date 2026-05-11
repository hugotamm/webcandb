"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Phase = "boot" | "trailer" | "fade-to-black" | "logo" | "fading-out" | "dismissed";

type Copy = {
  heroLine1: string;
  heroLine2: string;
  step1: string;
  step2: string;
  tierStart: string;
  tierKlassisk: string;
  tierPremium: string;
  tierPriceSuffix: string;
  whyLine1: string;
  whyLine2: string;
  howItWorksLabel: string;
  pricingLabel: string;
  press: string;
  taglineSub: string;
  skipHint: string;
};

const COPY_BY_LOCALE: Record<string, Copy> = {
  sv: {
    heroLine1: "Din gamla hemsida.",
    heroLine2: "Helt ny igen.",
    step1: "Skicka oss er länk",
    step2: "Vi bygger en demo",
    tierStart: "Start",
    tierKlassisk: "Klassisk",
    tierPremium: "Premium",
    tierPriceSuffix: "kr",
    whyLine1: "Snabbare. Tydligare.",
    whyLine2: "Helt utan krångel.",
    howItWorksLabel: "— Så här fungerar det",
    pricingLabel: "— Priser",
    press: "Tryck för att öppna",
    taglineSub: "Changer · Builder",
    skipHint: "Tryck Esc för att hoppa över",
  },
  en: {
    heroLine1: "Your old website.",
    heroLine2: "Brand new again.",
    step1: "Send us your link",
    step2: "We build a demo",
    tierStart: "Start",
    tierKlassisk: "Classic",
    tierPremium: "Premium",
    tierPriceSuffix: "SEK",
    whyLine1: "Faster. Clearer.",
    whyLine2: "No fuss.",
    howItWorksLabel: "— How it works",
    pricingLabel: "— Pricing",
    press: "Press to enter",
    taglineSub: "Changer · Builder",
    skipHint: "Press Esc to skip",
  },
};

export default function IntroGate() {
  const locale = useLocale();
  const c = COPY_BY_LOCALE[locale] ?? COPY_BY_LOCALE.sv;
  const [phase, setPhase] = useState<Phase>("boot");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // ?intro=1 forces the trailer to replay (clears the session flag)
    const force = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("intro");
    if (force) {
      sessionStorage.removeItem("intro_passed");
    } else if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro_passed") === "1") {
      setPhase("dismissed");
      return;
    }
    document.body.style.overflow = "hidden";

    // Choreographed timeline
    const t0 = setTimeout(() => setPhase("trailer"), 120);
    const t1 = setTimeout(() => setPhase("fade-to-black"), 8800);
    const t2 = setTimeout(() => setPhase("logo"), 10500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "logo" && phase !== "fading-out" && phase !== "dismissed") {
        e.preventDefault();
        setPhase("logo");
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && phase === "logo") {
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
    setTimeout(() => setPhase("dismissed"), 1400);
  };

  if (!mounted || phase === "dismissed") return null;

  const trailerPlaying = phase === "trailer";
  const showLogo = phase === "logo" || phase === "fading-out";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050403] flex items-center justify-center text-foreground overflow-hidden transition-opacity duration-[1400ms] ease-out ${
        phase === "fading-out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,200,154,0.06) 0%, transparent 55%), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Skip hint */}
      <div
        className={`absolute top-6 right-6 text-[10px] tracking-[0.35em] uppercase text-foreground/40 font-sans transition-opacity duration-700 ${
          trailerPlaying || phase === "fade-to-black" ? "opacity-100" : "opacity-0"
        }`}
      >
        {c.skipHint}
      </div>

      {/* =================================================================
          TRAILER — montage of phrases flying through frame
          ================================================================= */}
      <div
        className={`absolute inset-0 transition-all duration-[1600ms] ease-in ${
          phase === "fade-to-black" ? "opacity-0 scale-90 blur-md" : "opacity-100 scale-100 blur-0"
        }`}
        aria-hidden={!trailerPlaying && phase !== "fade-to-black"}
      >
        {trailerPlaying && (
          <>
            {/* --- Hero --- */}
            <div
              className="absolute left-[8%] top-[28%] text-5xl md:text-7xl text-foreground"
              style={{
                animation: "trailerSlideLeft 3.5s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "0.1s",
                opacity: 0,
                textShadow: "0 4px 30px rgba(0,0,0,0.85)",
              }}
            >
              {c.heroLine1}
            </div>
            <div
              className="absolute right-[8%] top-[44%] text-5xl md:text-7xl italic text-brand text-right"
              style={{
                animation: "trailerSlideRight 3.5s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "0.6s",
                opacity: 0,
                textShadow: "0 4px 40px rgba(217,200,154,0.35)",
              }}
            >
              {c.heroLine2}
            </div>

            {/* --- How it works --- */}
            <div
              className="absolute left-[10%] top-[18%] text-[10px] tracking-[0.4em] uppercase text-foreground/55 font-sans"
              style={{
                animation: "trailerFadeUp 3s ease-out forwards",
                animationDelay: "2.6s",
                opacity: 0,
              }}
            >
              {c.howItWorksLabel}
            </div>

            <div
              className="absolute left-[12%] top-[40%] flex items-baseline gap-6"
              style={{
                animation: "trailerSlideLeft 3s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "2.8s",
                opacity: 0,
              }}
            >
              <span className="text-xs text-brand tabular-nums tracking-widest font-sans">01</span>
              <span className="text-3xl md:text-5xl text-foreground/95" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
                {c.step1}
              </span>
            </div>
            <div
              className="absolute right-[12%] top-[55%] flex items-baseline gap-6"
              style={{
                animation: "trailerSlideRight 3s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "3.2s",
                opacity: 0,
              }}
            >
              <span className="text-xs text-brand tabular-nums tracking-widest font-sans">02</span>
              <span className="text-3xl md:text-5xl text-foreground/95" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
                {c.step2}
              </span>
            </div>

            {/* --- Pricing --- */}
            <div
              className="absolute left-[6%] top-[20%] text-[10px] tracking-[0.4em] uppercase text-foreground/55 font-sans"
              style={{
                animation: "trailerFadeUp 2.5s ease-out forwards",
                animationDelay: "5.2s",
                opacity: 0,
              }}
            >
              {c.pricingLabel}
            </div>

            <div
              className="absolute left-[10%] top-[32%] flex items-baseline gap-8"
              style={{
                animation: "trailerSlideLeft 2.8s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "5.4s",
                opacity: 0,
              }}
            >
              <span className="text-5xl md:text-7xl text-foreground/95" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
                {c.tierStart}
              </span>
              <span className="text-xl md:text-3xl text-brand tabular-nums font-sans">4 900</span>
              <span className="text-xs text-foreground/55 tracking-widest uppercase font-sans">{c.tierPriceSuffix}</span>
            </div>

            <div
              className="absolute right-[10%] top-[48%] flex items-baseline gap-8 justify-end"
              style={{
                animation: "trailerSlideRight 2.8s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "5.7s",
                opacity: 0,
              }}
            >
              <span className="text-5xl md:text-7xl text-foreground/95" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
                {c.tierKlassisk}
              </span>
              <span className="text-xl md:text-3xl text-brand tabular-nums font-sans">11 900</span>
              <span className="text-xs text-foreground/55 tracking-widest uppercase font-sans">{c.tierPriceSuffix}</span>
            </div>

            <div
              className="absolute left-[18%] top-[64%] flex items-baseline gap-8"
              style={{
                animation: "trailerSlideLeft 2.8s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "6.0s",
                opacity: 0,
              }}
            >
              <span className="text-5xl md:text-7xl text-foreground/95" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
                {c.tierPremium}
              </span>
              <span className="text-xl md:text-3xl text-brand tabular-nums font-sans">24 900</span>
              <span className="text-xs text-foreground/55 tracking-widest uppercase font-sans">{c.tierPriceSuffix}</span>
            </div>

            {/* --- Why us closing lines --- */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center px-8"
              style={{
                animation: "trailerFadeUpStay 3s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: "7.0s",
                opacity: 0,
              }}
            >
              <div className="text-4xl md:text-6xl text-foreground/95" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}>
                {c.whyLine1}
              </div>
              <div className="mt-2 text-4xl md:text-6xl italic text-brand" style={{ textShadow: "0 4px 40px rgba(217,200,154,0.3)" }}>
                {c.whyLine2}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fade to black overlay — grows from edges to center */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[1700ms] ease-in ${
          phase === "fade-to-black" || phase === "logo" || phase === "fading-out" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 25%, rgba(5,4,3,0.85) 55%, #050403 100%)",
        }}
        aria-hidden="true"
      />

      {/* =================================================================
          LOGO PHASE — emerges from shadow
          ================================================================= */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 transition-opacity duration-[2000ms] ease-out ${
          showLogo ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!showLogo}
      >
        <div
          className={`flex flex-col items-center gap-12 transition-all duration-[2200ms] ease-out ${
            phase === "logo" ? "scale-100 translate-y-0" : "scale-90 translate-y-6"
          }`}
          style={{ filter: phase === "logo" ? "blur(0)" : "blur(10px)" }}
        >
          <div className="select-none">
            <div className="text-7xl sm:text-8xl lg:text-9xl tracking-[-0.02em] font-normal" style={{ textShadow: "0 8px 70px rgba(0,0,0,0.9), 0 0 50px rgba(217,200,154,0.15)" }}>
              <span className="text-foreground">Web</span>{" "}
              <span className="text-brand">C&amp;B</span>
            </div>
            <div className="mt-4 text-[10px] tracking-[0.5em] uppercase text-foreground/60 font-sans font-light">
              {c.taglineSub}
            </div>
          </div>

          <button
            onClick={dismiss}
            aria-label={c.press}
            className="group flex flex-col items-center gap-4 cursor-pointer outline-none"
          >
            <div
              className="text-[11px] tracking-[0.45em] uppercase text-foreground/70 font-sans font-light group-hover:text-brand transition-colors duration-700"
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
              className="text-foreground/50 group-hover:text-brand group-hover:translate-y-1 transition-all duration-700"
              style={{ animation: "arrowFloat 3.6s ease-in-out infinite" }}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="5 12 12 19 19 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes trailerSlideLeft {
          0%   { transform: translateX(-80px); opacity: 0; filter: blur(8px); }
          22%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          70%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          100% { transform: translateX(40px);  opacity: 0; filter: blur(4px); }
        }
        @keyframes trailerSlideRight {
          0%   { transform: translateX(80px);  opacity: 0; filter: blur(8px); }
          22%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          70%  { transform: translateX(0);     opacity: 1; filter: blur(0); }
          100% { transform: translateX(-40px); opacity: 0; filter: blur(4px); }
        }
        @keyframes trailerFadeUp {
          0%   { transform: translateY(20px); opacity: 0; }
          30%  { transform: translateY(0);    opacity: 1; }
          75%  { transform: translateY(0);    opacity: 1; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
        @keyframes trailerFadeUpStay {
          0%   { transform: translateY(30px) scale(0.95); opacity: 0; filter: blur(6px); }
          40%  { transform: translateY(0)    scale(1);    opacity: 1; filter: blur(0); }
          100% { transform: translateY(0)    scale(1);    opacity: 1; filter: blur(0); }
        }
        @keyframes pressPulse {
          0%, 100% { opacity: 0.5; }
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
