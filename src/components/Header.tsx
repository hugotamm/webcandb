"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    { key: "tjanster", label: t("navTjanster") },
    { key: "galleri", label: t("navGalleri") },
    { key: "priser", label: t("navPriser") },
    { key: "kalkylator", label: t("navKalkylator") },
    { key: "boka", label: t("navBoka") },
    { key: "faq", label: t("navFAQ") },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Web <span className="text-brand">C&B</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1 rounded-full bg-brand-soft p-1 text-xs font-semibold">
            <Link
              href={pathname}
              locale="sv"
              className={`px-3 py-1 rounded-full transition ${
                locale === "sv"
                  ? "bg-brand text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              SV
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`px-3 py-1 rounded-full transition ${
                locale === "en"
                  ? "bg-brand text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </Link>
          </div>
          <ThemeToggle />
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`/#${item.key}`}
              className="text-foreground/80 hover:text-foreground transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#boka"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-3 text-sm font-semibold hover:bg-brand-hover transition shadow-sm"
          >
            <span className="hidden md:inline">{t("ctaFull")}</span>
            <span className="md:hidden">{t("ctaShort")}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label={t("openMenu")}
            aria-expanded={open}
            className="lg:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground/5 transition"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`/#${item.key}`}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-foreground/80 hover:text-brand transition border-b border-border/40 last:border-b-0"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-2 self-start rounded-full bg-brand-soft p-1 text-xs font-semibold">
            <Link
              href={pathname}
              locale="sv"
              onClick={() => setOpen(false)}
              className={`px-3 py-1 rounded-full transition ${
                locale === "sv" ? "bg-brand text-white" : "text-muted"
              }`}
            >
              SV
            </Link>
            <Link
              href={pathname}
              locale="en"
              onClick={() => setOpen(false)}
              className={`px-3 py-1 rounded-full transition ${
                locale === "en" ? "bg-brand text-white" : "text-muted"
              }`}
            >
              EN
            </Link>
          </div>
          <a
            href="/#boka"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-5 py-3.5 text-sm font-semibold hover:bg-brand-hover transition"
          >
            {t("ctaShort")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
