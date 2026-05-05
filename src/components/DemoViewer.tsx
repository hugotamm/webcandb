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
      className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl mx-auto flex flex-col"
      >
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 text-white">
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
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          {view === "phone" ? (
            <PhoneFrame url={current.url} name={current.name} />
          ) : (
            <DesktopFrame url={current.url} name={current.name} />
          )}
        </div>

        <div className="mt-4 text-center text-white/40 text-xs">
          Tryck <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-mono">Esc</kbd> för att stänga · scrolla i ramen för att utforska sidan
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ url, name }: { url: string; name: string }) {
  return (
    <div
      className="relative bg-zinc-900 rounded-[58px] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
      style={{ width: 412, maxWidth: "100%", height: "min(866px, 85vh)" }}
    >
      {/* Side buttons (decorative) */}
      <div className="absolute left-[-3px] top-[110px] w-[3px] h-[28px] bg-zinc-800 rounded-l-sm"></div>
      <div className="absolute left-[-3px] top-[160px] w-[3px] h-[55px] bg-zinc-800 rounded-l-sm"></div>
      <div className="absolute left-[-3px] top-[230px] w-[3px] h-[55px] bg-zinc-800 rounded-l-sm"></div>
      <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-zinc-800 rounded-r-sm"></div>

      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-10 flex items-center justify-end pr-2">
        <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
      </div>

      {/* Screen */}
      <div className="rounded-[44px] overflow-hidden bg-white h-full relative">
        <iframe
          src={url}
          title={`Mobil-förhandsvisning av ${name}`}
          className="w-full h-full border-0 block"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function DesktopFrame({ url, name }: { url: string; name: string }) {
  return (
    <div className="w-full bg-zinc-900 rounded-2xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 px-2 pb-2.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
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
