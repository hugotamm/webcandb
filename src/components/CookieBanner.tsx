"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function openCookieSettings() {
  localStorage.removeItem("cookie_consent");
  window.dispatchEvent(new CustomEvent("cookies:reopen"));
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const t = useTranslations("CookieBanner");

  useEffect(() => {
    const choice = localStorage.getItem("cookie_consent");
    if (!choice) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = () => setShow(true);
    window.addEventListener("cookies:reopen", handler);
    return () => window.removeEventListener("cookies:reopen", handler);
  }, []);

  const setChoice = (value: "all" | "necessary") => {
    localStorage.setItem("cookie_consent", value);
    localStorage.setItem("cookie_consent_at", new Date().toISOString());
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 inset-x-6 sm:inset-x-auto sm:right-6 sm:max-w-md z-[60] animate-[slideUp_0.6s_cubic-bezier(0.22,1,0.36,1)]">
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="bg-dark-bg border border-foreground/10 p-7">
        <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-4">
          — {t("title")}
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed font-light">
          {t("description")}{" "}
          <a href="/cookies" className="text-brand hover:text-foreground transition-colors duration-700 underline-offset-4 underline">
            {t("linkMore")}
          </a>
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-5 sm:gap-8 text-[10px] tracking-[0.35em] uppercase">
          <button
            onClick={() => setChoice("necessary")}
            className="group inline-flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors duration-700"
          >
            <span>{t("buttonNecessary")}</span>
            <span className="w-6 h-px bg-current transition-all duration-700 group-hover:w-10" />
          </button>
          <button
            onClick={() => setChoice("all")}
            className="group inline-flex items-center gap-3 text-brand hover:text-foreground transition-colors duration-700"
          >
            <span>{t("buttonAll")}</span>
            <span className="w-6 h-px bg-current transition-all duration-700 group-hover:w-10" />
          </button>
        </div>
      </div>
    </div>
  );
}
