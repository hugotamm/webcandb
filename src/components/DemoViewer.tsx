"use client";

import { useEffect, useState } from "react";

type Demo = { url: string; name: string };

export function openDemo(demo: Demo) {
  window.dispatchEvent(new CustomEvent("demo:open", { detail: demo }));
}

export default function DemoViewer() {
  const [current, setCurrent] = useState<Demo | null>(null);
  const [view, setView] = useState<"phone" | "desktop">("phone");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Demo>).detail;
      setCurrent(detail);
      setView("phone");
    };
    window.addEventListener("demo:open", handler);
    return () => window.removeEventListener("demo:open", handler);
  }, []);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrent(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [current]);

  if (!current) return null;

  const close = () => setCurrent(null);

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex flex-col p-3 sm:p-5 lg:p-6 overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl mx-auto flex flex-col flex-1 min-h-0"
      >
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-white flex-shrink-0">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Demo
            </div>
            <div className="text-xl font-bold">{current.name}</div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex bg-white/10 rounded-full p-1 text-sm">
              <button
                onClick={() => setView("phone")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  view === "phone" ? "bg-white text-zinc-900" : "text-white/80 hover:text-white"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                Telefon
              </button>
              <button
                onClick={() => setView("desktop")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  view === "desktop" ? "bg-white text-zinc-900" : "text-white/80 hover:text-white"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Dator
              </button>
            </div>

            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-hover transition"
            >
              Öppna i ny flik
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            <button
              onClick={close}
              aria-label="Stäng"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Frame area */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          {view === "phone" ? (
            <PhoneFrame key={current.url} url={current.url} name={current.name} />
          ) : (
            <DesktopFrame url={current.url} name={current.name} />
          )}
        </div>

        <div className="mt-3 text-center text-white/40 text-xs flex-shrink-0">
          Tryck <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-mono">Esc</kbd> för att stänga · scrolla i ramen för att utforska sidan
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* iPhone 16 frame                                                     */
/* Built at fixed reference dimensions (412×870), then scaled with     */
/* CSS transform to fill the available viewport height. Aspect ratio   */
/* is exactly the real iPhone 16 (147.6mm × 71.6mm).                   */
/* ------------------------------------------------------------------ */

const PHONE_W = 412;
const PHONE_H = 870;

type Phase = "home" | "opening" | "loading" | "loaded";

function PhoneFrame({ url, name }: { url: string; name: string }) {
  const [phase, setPhase] = useState<Phase>("home");
  const [typed, setTyped] = useState("");
  const [scale, setScale] = useState(1);

  // Compute scale based on actual viewport size (CSS calc with mixed units
  // is unreliable for transform values; JS measurement is rock-solid).
  useEffect(() => {
    const compute = () => {
      // ~190px overhead: top bar (~60), helper text (~30), modal padding (~50),
      // safety margin (~50). Cap at 1.15× on huge monitors.
      const available = window.innerHeight - 190;
      const s = Math.min(1.15, Math.max(0.5, available / PHONE_H));
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 700);
    const t2 = setTimeout(() => setPhase("loading"), 1100);
    const t3 = setTimeout(() => setPhase("loaded"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const clean = url.replace(/^https?:\/\//, "");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(clean.slice(0, i));
      if (i >= clean.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [phase, url]);

  return (
    <div
      className="relative"
      style={{
        width: PHONE_W * scale,
        height: PHONE_H * scale,
      }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <PhoneBody phase={phase} typed={typed} url={url} name={name} />
      </div>
    </div>
  );
}

function PhoneBody({
  phase,
  typed,
  url,
  name,
}: {
  phase: Phase;
  typed: string;
  url: string;
  name: string;
}) {
  return (
    <div
      className="relative bg-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] w-full h-full"
      style={{
        borderRadius: 58,
        padding: 8,
      }}
    >
      {/* Side buttons (decorative) */}
      <div className="absolute left-[-3px] top-[110px] w-[3px] h-[28px] bg-zinc-800 rounded-l-sm" />
      <div className="absolute left-[-3px] top-[160px] w-[3px] h-[55px] bg-zinc-800 rounded-l-sm" />
      <div className="absolute left-[-3px] top-[230px] w-[3px] h-[55px] bg-zinc-800 rounded-l-sm" />
      <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-zinc-800 rounded-r-sm" />

      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[122px] h-[35px] bg-black rounded-full z-20 flex items-center justify-end pr-2 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-zinc-700" />
      </div>

      {/* Screen */}
      <div
        className="overflow-hidden bg-white relative h-full w-full"
        style={{ borderRadius: 50 }}
      >
        {(phase === "home" || phase === "opening") && (
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              phase === "opening" ? "opacity-0 scale-110" : "opacity-100 scale-100"
            }`}
          >
            <HomeScreen tappingSafari={phase === "opening"} />
          </div>
        )}

        {(phase === "loading" || phase === "loaded") && (
          <div className="absolute inset-0 bg-zinc-100 flex flex-col animate-[zoomIn_0.35s_ease-out]">
            <div className="h-11 flex items-center justify-between px-7 text-[13px] text-zinc-900 font-semibold flex-shrink-0 pt-2">
              <span>9:41</span>
              <span className="flex items-center gap-1.5">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </span>
            </div>

            <div className="px-3 pb-2 flex-shrink-0">
              <div className="bg-zinc-200/90 rounded-[10px] px-3 py-1.5 flex items-center gap-2 text-[13px]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500 flex-shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="truncate text-zinc-700 font-medium">
                  {typed}
                  {phase === "loading" && (
                    <span className="inline-block w-[1px] h-[11px] bg-zinc-700 ml-0.5 animate-pulse align-middle" />
                  )}
                </span>
              </div>
            </div>

            <div className="h-0.5 bg-zinc-200 relative overflow-hidden flex-shrink-0">
              {phase === "loading" && (
                <div
                  className="absolute inset-y-0 left-0 bg-blue-500"
                  style={{ animation: "loadBar 1.2s ease-out forwards" }}
                />
              )}
            </div>

            <div className="flex-1 bg-white relative overflow-hidden">
              {phase === "loaded" ? (
                <iframe
                  src={url}
                  title={`Mobil-förhandsvisning av ${name}`}
                  className="w-full h-full border-0 block"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full border-[3px] border-zinc-300 border-t-blue-500 animate-spin" />
                </div>
              )}
            </div>

            <div className="h-12 bg-zinc-100/95 flex items-center justify-around px-6 flex-shrink-0 border-t border-zinc-200">
              <ToolbarIcon><path d="M15 18l-6-6 6-6" /></ToolbarIcon>
              <ToolbarIcon><path d="M9 18l6-6-6-6" /></ToolbarIcon>
              <ToolbarIcon>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </ToolbarIcon>
              <ToolbarIcon>
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
              </ToolbarIcon>
              <ToolbarIcon>
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </ToolbarIcon>
            </div>

            <div className="h-[18px] flex-shrink-0 flex items-center justify-center bg-zinc-100">
              <div className="w-[124px] h-[5px] bg-black rounded-full" />
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.6);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes loadBar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function HomeScreen({ tappingSafari }: { tappingSafari: boolean }) {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #134e3a 0%, #0d4a3a 40%, #07261d 100%)",
      }}
    >
      {/* Web C&B watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-white text-6xl font-bold tracking-tight">
            Web <span className="text-emerald-300">C&B</span>
          </div>
          <div className="mt-3 text-white/60 text-xs font-semibold uppercase tracking-[0.3em]">
            Changer & Builder
          </div>
        </div>
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Status bar */}
      <div className="relative h-11 flex items-center justify-between px-7 text-[13px] text-white font-semibold pt-2">
        <span>9:41</span>
        <span className="flex items-center gap-1.5">
          <SignalIcon className="text-white" />
          <WifiIcon className="text-white" />
          <BatteryIcon className="text-white" />
        </span>
      </div>

      {/* Time + date */}
      <div className="relative text-center text-white pt-3">
        <div className="text-[13px] font-medium opacity-80">tisdag 5 maj</div>
        <div className="text-[68px] font-thin leading-none mt-1">9:41</div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-4 right-4 h-[78px] bg-white/15 backdrop-blur-xl rounded-[28px] flex items-center justify-around px-4 border border-white/10">
        <div className="w-[58px] h-[58px] rounded-[14px] bg-gradient-to-br from-green-400 to-green-600 shadow-md" />
        <div className="w-[58px] h-[58px] rounded-[14px] bg-gradient-to-br from-blue-400 to-blue-700 shadow-md" />
        <div className="w-[58px] h-[58px] rounded-[14px] bg-gradient-to-br from-green-300 to-green-500 shadow-md" />
        <div className="relative">
          <div
            className={`w-[58px] h-[58px] rounded-[14px] shadow-md transition-transform duration-300 ${
              tappingSafari ? "scale-90" : "scale-100"
            }`}
          >
            <SafariIcon />
          </div>
          {tappingSafari && (
            <div
              className="absolute inset-0 rounded-[14px] bg-white/40"
              style={{ animation: "ripple 0.4s ease-out" }}
            />
          )}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-1.5 left-0 right-0 flex justify-center">
        <div className="w-[124px] h-[5px] bg-white/80 rounded-full" />
      </div>

      <style jsx>{`
        @keyframes ripple {
          from {
            opacity: 0.7;
            transform: scale(0.85);
          }
          to {
            opacity: 0;
            transform: scale(1.4);
          }
        }
      `}</style>
    </div>
  );
}

function SafariIcon() {
  return (
    <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-sky-300 via-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
      <div className="w-[80%] h-[80%] rounded-full bg-white shadow-inner relative flex items-center justify-center">
        <div className="absolute inset-1 rounded-full border border-zinc-200" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-1 bg-zinc-300"
            style={{
              top: 4,
              left: "50%",
              transformOrigin: "0 18px",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
        <div className="relative w-0 h-0">
          <div
            className="absolute"
            style={{
              top: -16,
              left: -4,
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "16px solid #ef4444",
            }}
          />
          <div
            className="absolute"
            style={{
              top: 0,
              left: -4,
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "16px solid #f3f4f6",
            }}
          />
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-zinc-700 z-10" />
        </div>
      </div>
    </div>
  );
}

function SignalIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" className={className}>
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4" y="5" width="3" height="6" rx="0.5" />
      <rect x="8" y="3" width="3" height="8" rx="0.5" />
      <rect x="12" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor" className={className}>
      <path d="M7 11a1.3 1.3 0 1 0 0-2.6A1.3 1.3 0 0 0 7 11z" />
      <path d="M7 7.5a3.5 3.5 0 0 1 2.5 1l1-1A5 5 0 0 0 7 6a5 5 0 0 0-3.5 1.5l1 1A3.5 3.5 0 0 1 7 7.5z" />
      <path d="M7 4.5a6.5 6.5 0 0 1 4.6 1.9l1-1A8 8 0 0 0 7 3a8 8 0 0 0-5.6 2.4l1 1A6.5 6.5 0 0 1 7 4.5z" />
    </svg>
  );
}

function BatteryIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="25" height="11" viewBox="0 0 25 11" fill="none" className={className}>
      <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="19" height="7" rx="1.5" fill="currentColor" />
      <rect x="23" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function ToolbarIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop frame                                                       */
/* ------------------------------------------------------------------ */

function DesktopFrame({ url, name }: { url: string; name: string }) {
  return (
    <div className="w-full bg-zinc-900 rounded-2xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 px-2 pb-2.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="ml-3 flex-1 bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-400 truncate">
          {url.replace(/^https?:\/\//, "")}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden bg-white" style={{ aspectRatio: "16 / 10", maxHeight: "75vh" }}>
        <iframe
          src={url}
          title={`Dator-förhandsvisning av ${name}`}
          className="w-full h-full border-0 block"
          loading="lazy"
        />
      </div>
    </div>
  );
}
