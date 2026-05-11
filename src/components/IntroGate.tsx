"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Phase = "boot" | "whisper" | "logo" | "fading-out" | "dismissed";

const COPY: Record<string, { whisper: string; tagline: string; press: string }> = {
  sv: {
    whisper: "En upplevelse.",
    tagline: "Inte en hemsida.",
    press: "Tryck för att öppna",
  },
  en: {
    whisper: "An experience.",
    tagline: "Not a website.",
    press: "Press to enter",
  },
};

export default function IntroGate() {
  const locale = useLocale();
  const copy = COPY[locale] ?? COPY.sv;
  const [phase, setPhase] = useState<Phase>("boot");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Skip the gate if the user already passed through this session.
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro_passed") === "1") {
      setPhase("dismissed");
      return;
    }

    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("whisper"), 600);
    const t2 = setTimeout(() => setPhase("logo"), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "logo") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
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

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050403] flex flex-col items-center justify-center text-foreground overflow-hidden transition-opacity duration-[1400ms] ease-out ${
        phase === "fading-out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
    >
      {/* Vignette + soft glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,183,138,0.06) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Phase: whisper — atmospheric text */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 transition-opacity duration-[1800ms] ease-out ${
          phase === "whisper" ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={phase !== "whisper"}
      >
        <div className="text-3xl sm:text-4xl lg:text-5xl italic text-foreground/80 leading-tight max-w-2xl">
          <div className="whitespace-nowrap">{copy.whisper}</div>
          <div className="mt-3 whitespace-nowrap text-foreground/60">{copy.tagline}</div>
        </div>
      </div>

      {/* Phase: logo + press CTA */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 transition-opacity duration-[1800ms] ease-out ${
          phase === "logo" || phase === "fading-out" ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={phase !== "logo" && phase !== "fading-out"}
      >
        <div
          className={`flex flex-col items-center gap-12 transition-all duration-[1600ms] ease-out ${
            phase === "logo" ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          {/* Logo */}
          <div className="select-none">
            <div className="text-7xl sm:text-8xl lg:text-9xl tracking-[-0.02em] font-normal">
              <span className="text-foreground">Web</span>{" "}
              <span className="text-[var(--brand)]">C&amp;B</span>
            </div>
            <div className="mt-4 text-[10px] tracking-[0.5em] uppercase text-foreground/40 font-sans font-light">
              Changer &nbsp;·&nbsp; Builder
            </div>
          </div>

          {/* Press CTA */}
          <button
            onClick={dismiss}
            aria-label={copy.press}
            className="group flex flex-col items-center gap-4 cursor-pointer outline-none"
          >
            <div
              className="text-[11px] tracking-[0.45em] uppercase text-foreground/50 font-sans font-light group-hover:text-[var(--brand)] transition-colors duration-700"
              style={{ animation: "pressPulse 3.6s ease-in-out infinite" }}
            >
              {copy.press}
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
              className="text-foreground/40 group-hover:text-[var(--brand)] group-hover:translate-y-1 transition-all duration-700"
              style={{ animation: "arrowFloat 3.6s ease-in-out infinite" }}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="5 12 12 19 19 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pressPulse {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.9; }
        }
        @keyframes arrowFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
