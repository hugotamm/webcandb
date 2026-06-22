"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Phase = "boot" | "trailer" | "ready" | "fading-out" | "dismissed";

type Copy = {
  press: string;
  taglineSub: string;
  skipHint: string;
};

const COPY_BY_LOCALE: Record<string, Copy> = {
  sv: {
    press: "Tryck för att öppna",
    taglineSub: "Changer · Builder",
    skipHint: "Esc för att hoppa över",
  },
  en: {
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

    // Minimal intro: just the logo emerging from shadow into the light.
    // ~4.5s to PRESS becoming visible.
    const t0 = setTimeout(() => setPhase("trailer"), 100);
    const t1 = setTimeout(() => setPhase("ready"), 4500);

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
        "--foreground": "#f5f2e8",
        "--brand": "#ecd9a3",
        "--color-foreground": "#f5f2e8",
        "--color-brand": "#ecd9a3",
        color: "#f5f2e8",
      } as React.CSSProperties}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(236,217,163,0.10) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.92) 100%)",
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
          CENTER LOGO — emerges from shadow into the light
          ================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
        <div className="flex flex-col items-center gap-14">
          <div
            className="select-none"
            style={{
              animation: logoIsInShadow
                ? "logoEmerge 4.5s cubic-bezier(0.16,1,0.3,1) forwards"
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
            <div
              className="text-7xl sm:text-8xl lg:text-[10rem] tracking-[-0.02em] font-normal leading-none"
              style={{
                textShadow:
                  "0 8px 80px rgba(0,0,0,0.95), 0 0 80px rgba(236,217,163,0.25)",
              }}
            >
              <span className="text-foreground">Web</span>{" "}
              <span className="text-brand">C&amp;B</span>
            </div>
            <div className="mt-5 text-[11px] tracking-[0.55em] uppercase text-foreground/65 font-sans font-light">
              {c.taglineSub}
            </div>
          </div>

          {/* PRESS button — visible from the very start, independent of the trailer */}
          <button
            onClick={dismiss}
            aria-label={c.press}
            className="pointer-events-auto group flex flex-col items-center gap-5 cursor-pointer outline-none opacity-100"
          >
            <div
              className="text-[12px] tracking-[0.5em] uppercase text-foreground/75 font-sans font-light group-hover:text-brand transition-colors duration-700"
              style={{ animation: "pressPulse 3.6s ease-in-out infinite" }}
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
              style={{ animation: "arrowFloat 3.6s ease-in-out infinite" }}
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes logoEmerge {
          /* Single segment — no intermediate keyframes so easing drives
             ONE continuous interpolation. No micro-stops between steps. */
          from { opacity: 0; filter: blur(24px); transform: scale(0.5); }
          to   { opacity: 1; filter: blur(0);    transform: scale(1); }
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
