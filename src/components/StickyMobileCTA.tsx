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
      className={`lg:hidden fixed bottom-6 inset-x-6 z-40 transition-all duration-700 ${
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="/#boka"
        className="group flex items-center justify-between w-full bg-dark-bg border border-foreground/10 px-6 py-4 text-[11px] tracking-[0.35em] uppercase text-brand hover:text-foreground transition-colors duration-700"
      >
        <span>{t("button")}</span>
        <span className="w-8 h-px bg-current transition-all duration-700 group-hover:w-14" />
      </a>
    </div>
  );
}
