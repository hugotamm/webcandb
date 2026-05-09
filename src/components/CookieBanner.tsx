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
    <div className="fixed bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-auto sm:right-6 sm:max-w-md z-[60] animate-[slideUp_0.4s_ease-out]">
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="rounded-2xl bg-card border border-border shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-soft text-brand flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
              <path d="M7 3.34V5a3 3 0 0 0 3 3" />
              <path d="M11 21.95V18a2 2 0 0 0-2-2H2.05" />
              <path d="M21.54 15a8 8 0 1 1-9.07-12.95" />
              <circle cx="12" cy="12" r="0.5" fill="currentColor" />
              <circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
              <circle cx="17" cy="7" r="0.5" fill="currentColor" />
            </svg>
          </span>
          <div>
            <h3 className="font-bold text-base">{t("title")}</h3>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              {t("description")}{" "}
              <a href="/cookies" className="text-brand font-semibold hover:underline">
                {t("linkMore")}
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setChoice("necessary")}
            className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-full border border-border hover:border-foreground/40 transition"
          >
            {t("buttonNecessary")}
          </button>
          <button
            onClick={() => setChoice("all")}
            className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-full bg-brand text-white hover:bg-brand-hover transition"
          >
            {t("buttonAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
