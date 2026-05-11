"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const t = useTranslations("ThemeToggle");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // Default to dark for cinematic playground
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const nextTheme = theme === "dark" ? t("themeLight") : t("themeDark");

  return (
    <button
      onClick={toggle}
      aria-label={t("ariaLabel", { theme: nextTheme })}
      className="flex items-center justify-center text-foreground/60 hover:text-brand transition-colors duration-700"
    >
      {theme === "dark" ? (
        // Sun icon = "switch to light"
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon = "switch to dark"
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
