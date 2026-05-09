"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  const t = useTranslations("StickyMobileCTA");

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-4 inset-x-4 z-40 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="/#boka"
        className="flex items-center justify-center gap-2 w-full rounded-full bg-brand text-white px-6 py-4 font-semibold shadow-2xl hover:bg-brand-hover transition"
      >
        {t("button")}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );
}
