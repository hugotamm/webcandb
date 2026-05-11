"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-lg font-normal tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Web <span className="text-brand">C&amp;B</span>
            </Link>
            <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
              <Link
                href={pathname}
                locale="sv"
                className={`transition-colors duration-700 ${
                  locale === "sv" ? "text-brand" : "text-foreground/40 hover:text-foreground"
                }`}
              >
                SV
              </Link>
              <span className="text-foreground/20">·</span>
              <Link
                href={pathname}
                locale="en"
                className={`transition-colors duration-700 ${
                  locale === "en" ? "text-brand" : "text-foreground/40 hover:text-foreground"
                }`}
              >
                EN
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/#boka"
              className="hidden sm:inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/60 hover:text-brand transition-colors duration-700"
            >
              {t("ctaShort")}
              <span className="w-8 h-px bg-current" />
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={menuOpen}
              className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/70 hover:text-brand transition-colors duration-700 cursor-pointer"
            >
              <span className="hidden sm:inline">Menu</span>
              <span className="flex flex-col gap-1.5">
                <span className="w-7 h-px bg-current transition-all duration-700 group-hover:w-8" />
                <span className="w-5 h-px bg-current ml-auto transition-all duration-700 group-hover:w-8" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-[1200ms] ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-[#050403]/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col">
          {/* Top bar — close button + logo */}
          <div className="h-20 flex items-center justify-between">
            <Link
              href="/"
              onClick={handleNavClick}
              className="text-lg font-normal tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Web <span className="text-brand">C&amp;B</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Stäng meny"
              className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/70 hover:text-brand transition-colors duration-700"
            >
              <span>Close</span>
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute w-6 h-px bg-current rotate-45" />
                <span className="absolute w-6 h-px bg-current -rotate-45" />
              </span>
            </button>
          </div>

          {/* Menu items — staggered fade-in */}
          <nav className="flex-1 flex flex-col justify-center -mt-12">
            <ul className="space-y-6 lg:space-y-8">
              {navItems.map((item, i) => (
                <li
                  key={item.key}
                  className="overflow-hidden"
                  style={{
                    transitionDelay: menuOpen ? `${300 + i * 110}ms` : "0ms",
                  }}
                >
                  <a
                    href={`/#${item.key}`}
                    onClick={handleNavClick}
                    className={`group inline-flex items-baseline gap-6 transition-all duration-[1000ms] ease-out ${
                      menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: menuOpen ? `${300 + i * 110}ms` : "0ms",
                      fontFamily: "var(--font-playfair), serif",
                    }}
                  >
                    <span className="text-xs tracking-[0.3em] text-foreground/30 tabular-nums w-10">
                      0{i + 1}
                    </span>
                    <span className="text-5xl sm:text-6xl lg:text-7xl text-foreground/80 group-hover:text-brand transition-colors duration-700 leading-none">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div
              className={`mt-16 lg:mt-20 flex flex-col sm:flex-row gap-6 sm:gap-12 text-[10px] tracking-[0.3em] uppercase text-foreground/40 transition-all duration-[1000ms] ease-out ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: menuOpen ? `${300 + navItems.length * 110}ms` : "0ms" }}
            >
              <a
                href="mailto:web.candb@gmail.com"
                className="hover:text-brand transition-colors duration-700"
              >
                web.candb@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <Link
                  href={pathname}
                  locale="sv"
                  onClick={handleNavClick}
                  className={`transition-colors duration-700 ${
                    locale === "sv" ? "text-brand" : "hover:text-foreground"
                  }`}
                >
                  SV
                </Link>
                <span className="text-foreground/20">·</span>
                <Link
                  href={pathname}
                  locale="en"
                  onClick={handleNavClick}
                  className={`transition-colors duration-700 ${
                    locale === "en" ? "text-brand" : "hover:text-foreground"
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>
          </nav>

          <div
            className={`pb-10 text-[10px] tracking-[0.3em] uppercase text-foreground/30 transition-opacity duration-[1200ms] ease-out ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "900ms" : "0ms" }}
          >
            Esc &nbsp;—&nbsp; close
          </div>
        </div>
      </div>
    </>
  );
}
