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

    // Slower, more dramatic timeline:
    // 0s: trailer begins
    // 0.4s - 4.0s : Hero pair emerges/dissolves
    // 1.8s - 5.4s : Steps emerge
    // 3.2s - 6.8s : Pricing emerges
    // Timeline (total 6.5s):
    // 0.2-3.3s : hero pair, 1.2-4.5s : steps,
    // 2.2-5.9s : pricing, 3.4-6.5s : closing whisper
    // 6.5s : ready — WEB C&B fully zoomed-in + sharp + PRESS visible
    const t0 = setTimeout(() => setPhase("trailer"), 100);
    const t1 = setTimeout(() => setPhase("ready"), 6500);

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
    setTimeout(() => setPhase("dismissed"), 1400);
  };

  if (!mounted || phase === "dismissed") return null;

  const playing = phase === "trailer" || phase === "ready";

  // Logo states — shadow → bright
  const logoIsHidden = phase === "boot";
  const logoIsInShadow = phase === "trailer";
  const logoIsBright = phase === "ready" || phase === "fading-out";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#040302] flex items-center justify-center overflow-hidden transition-opacity duration-[1400ms] ease-out ${
        phase === "fading-out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        // Force dark-mode colors inside the gate regardless of site theme.
        // Override both the raw variables and the Tailwind theme aliases.
        "--foreground": "#f5f2e8",
        "--brand": "#d9c89a",
        "--color-foreground": "#f5f2e8",
        "--color-brand": "#d9c89a",
        color: "#f5f2e8",
      } as React.CSSProperties}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(217,200,154,0.10) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.92) 100%)",
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
          TRAILER — phrases EMERGE from shadow, hold, DISSOLVE back
          BIGGER, SLOWER, MORE DRAMATIC
          ================================================================= */}
      {playing && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* === Hero pair === */}
          <div
            className="absolute left-[6%] top-[14%] text-5xl md:text-7xl lg:text-8xl text-foreground"
            style={{
              animation: "emergeL 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "0.2s",
              opacity: 0,
              textShadow:
                "0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.7)",
            }}
          >
            {c.heroLine1}
          </div>
          <div
            className="absolute right-[6%] top-[22%] text-5xl md:text-7xl lg:text-8xl italic text-brand text-right"
            style={{
              animation: "emergeR 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "0.5s",
              opacity: 0,
              textShadow:
                "0 4px 30px rgba(0,0,0,0.95), 0 0 70px rgba(217,200,154,0.4)",
            }}
          >
            {c.heroLine2}
          </div>

          {/* === Steps === */}
          <div
            className="absolute left-[4%] top-[78%] flex items-baseline gap-5"
            style={{
              animation: "emergeL 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "1.2s",
              opacity: 0,
            }}
          >
            <span className="text-base text-brand tabular-nums tracking-[0.3em] font-sans">01</span>
            <span
              className="text-3xl md:text-5xl lg:text-6xl text-foreground"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              {c.step1}
            </span>
          </div>
          <div
            className="absolute right-[4%] top-[78%] flex items-baseline gap-5 justify-end"
            style={{
              animation: "emergeR 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "1.5s",
              opacity: 0,
            }}
          >
            <span className="text-base text-brand tabular-nums tracking-[0.3em] font-sans">02</span>
            <span
              className="text-3xl md:text-5xl lg:text-6xl text-foreground"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              {c.step2}
            </span>
          </div>

          {/* === Pricing — big numbers, dramatic === */}
          <div
            className="absolute left-[4%] top-[14%] flex items-baseline gap-6"
            style={{
              animation: "emergeL 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "2.2s",
              opacity: 0,
            }}
          >
            <span
              className="text-4xl md:text-6xl lg:text-7xl text-foreground"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              {c.tierStart}
            </span>
            <span className="text-xl md:text-3xl text-brand tabular-nums font-sans"
              style={{ textShadow: "0 0 30px rgba(217,200,154,0.4)" }}>
              4 900
            </span>
            <span className="text-xs md:text-sm text-foreground/70 tracking-[0.3em] uppercase font-sans">
              {c.priceUnit}
            </span>
          </div>
          <div
            className="absolute right-[4%] top-[14%] flex items-baseline gap-6 justify-end"
            style={{
              animation: "emergeR 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "2.5s",
              opacity: 0,
            }}
          >
            <span
              className="text-4xl md:text-6xl lg:text-7xl text-foreground"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              {c.tierKlassisk}
            </span>
            <span className="text-xl md:text-3xl text-brand tabular-nums font-sans"
              style={{ textShadow: "0 0 30px rgba(217,200,154,0.4)" }}>
              11 900
            </span>
            <span className="text-xs md:text-sm text-foreground/70 tracking-[0.3em] uppercase font-sans">
              {c.priceUnit}
            </span>
          </div>

          <div
            className="absolute left-[4%] top-[78%] flex items-baseline gap-6"
            style={{
              animation: "emergeL 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "2.8s",
              opacity: 0,
            }}
          >
            <span
              className="text-4xl md:text-6xl lg:text-7xl text-foreground"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              {c.tierPremium}
            </span>
            <span className="text-xl md:text-3xl text-brand tabular-nums font-sans"
              style={{ textShadow: "0 0 30px rgba(217,200,154,0.4)" }}>
              24 900
            </span>
            <span className="text-xs md:text-sm text-foreground/70 tracking-[0.3em] uppercase font-sans">
              {c.priceUnit}
            </span>
          </div>
          <div
            className="absolute right-[4%] top-[78%] flex items-baseline gap-5 justify-end"
            style={{
              animation: "emergeR 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "3.1s",
              opacity: 0,
            }}
          >
            <span className="text-base text-brand tabular-nums tracking-[0.3em] font-sans">03</span>
            <span
              className="text-3xl md:text-5xl lg:text-6xl text-foreground"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              {c.step4}
            </span>
          </div>

          {/* === WhyUs final whisper === */}
          <div
            className="absolute left-[10%] top-[14%] text-3xl md:text-5xl lg:text-6xl italic text-foreground/95"
            style={{
              animation: "emergeL 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "3.4s",
              opacity: 0,
              textShadow: "0 4px 40px rgba(0,0,0,0.9)",
            }}
          >
            {c.whyLine1}
          </div>
          <div
            className="absolute right-[10%] top-[78%] text-3xl md:text-5xl lg:text-6xl italic text-brand text-right"
            style={{
              animation: "emergeR 2.8s cubic-bezier(0.16,1,0.3,1) forwards",
              animationDelay: "3.7s",
              opacity: 0,
              textShadow: "0 4px 40px rgba(217,200,154,0.35)",
            }}
          >
            {c.whyLine2}
          </div>
        </div>
      )}

      {/* =================================================================
          CENTER LOGO — emerges gradually from deep shadow throughout the
          trailer (parallel with side phrases), then sharpens fully on ready.
          ================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
        <div
          className="flex flex-col items-center gap-14"
          style={{
            animation: logoIsInShadow
              ? "logoEmerge 6.5s cubic-bezier(0.16,1,0.3,1) forwards"
              : undefined,
            opacity: logoIsHidden ? 0 : logoIsBright ? 1 : undefined,
            filter: logoIsHidden ? "blur(40px)" : logoIsBright ? "blur(0)" : undefined,
            transform: logoIsHidden ? "scale(0.85)" : logoIsBright ? "scale(1)" : undefined,
            transition: logoIsBright
              ? "filter 1.4s cubic-bezier(0.22,1,0.36,1), opacity 1.4s cubic-bezier(0.22,1,0.36,1), transform 1.4s cubic-bezier(0.22,1,0.36,1)"
              : undefined,
            willChange: "filter, opacity, transform",
          }}
        >
          <div className="select-none">
            <div
              className="text-7xl sm:text-8xl lg:text-[10rem] tracking-[-0.02em] font-normal leading-none"
              style={{
                textShadow:
                  "0 8px 80px rgba(0,0,0,0.95), 0 0 80px rgba(217,200,154,0.25)",
              }}
            >
              <span className="text-foreground">Web</span>{" "}
              <span className="text-brand">C&amp;B</span>
            </div>
            <div className="mt-5 text-[11px] tracking-[0.55em] uppercase text-foreground/65 font-sans font-light">
              {c.taglineSub}
            </div>
          </div>

          {/* PRESS button — only at ready phase */}
          <button
            onClick={dismiss}
            aria-label={c.press}
            className={`pointer-events-auto group flex flex-col items-center gap-5 cursor-pointer outline-none transition-opacity duration-[1600ms] ease-out ${
              logoIsBright ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: logoIsBright ? "400ms" : "0ms" }}
          >
            <div
              className="text-[12px] tracking-[0.5em] uppercase text-foreground/75 font-sans font-light group-hover:text-brand transition-colors duration-700"
              style={{ animation: logoIsBright ? "pressPulse 3.6s ease-in-out infinite" : "none" }}
            >
              {c.press}
            </div>
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/55 group-hover:text-brand group-hover:-translate-y-1 transition-all duration-700"
              style={{ animation: logoIsBright ? "arrowFloat 3.6s ease-in-out infinite" : "none" }}
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes emergeL {
          /* Glide in from far off-screen left, hold, drift gently */
          0%   { transform: translateX(-240px) scale(0.92); opacity: 0; filter: blur(10px); }
          35%  { transform: translateX(0)      scale(1);    opacity: 1; filter: blur(0); }
          70%  { transform: translateX(0)      scale(1);    opacity: 1; filter: blur(0); }
          100% { transform: translateX(70px)   scale(0.95); opacity: 0; filter: blur(8px); }
        }
        @keyframes emergeR {
          0%   { transform: translateX(240px)  scale(0.92); opacity: 0; filter: blur(10px); }
          35%  { transform: translateX(0)      scale(1);    opacity: 1; filter: blur(0); }
          70%  { transform: translateX(0)      scale(1);    opacity: 1; filter: blur(0); }
          100% { transform: translateX(-70px)  scale(0.95); opacity: 0; filter: blur(8px); }
        }
        @keyframes logoEmerge {
          /* Smoother zoom-in, capped blur for GPU performance.
             Ends at full final state so the transition to 'ready' is seamless. */
          0%   { opacity: 0;    filter: blur(24px); transform: scale(0.50); }
          20%  { opacity: 0.20; filter: blur(20px); transform: scale(0.58); }
          45%  { opacity: 0.50; filter: blur(12px); transform: scale(0.72); }
          70%  { opacity: 0.82; filter: blur(5px);  transform: scale(0.88); }
          88%  { opacity: 0.96; filter: blur(1px);  transform: scale(0.97); }
          100% { opacity: 1;    filter: blur(0);    transform: scale(1); }
        }
        @keyframes pressPulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes arrowFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
