import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CookieSettingsLink from "./CookieSettingsLink";

export default function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  const navItems = [
    { key: "tjanster", label: tHeader("navTjanster") },
    { key: "galleri", label: tHeader("navGalleri") },
    { key: "priser", label: tHeader("navPriser") },
    { key: "kalkylator", label: tHeader("navKalkylator") },
    { key: "boka", label: tHeader("navBoka") },
    { key: "faq", label: tHeader("navFAQ") },
  ];

  return (
    <footer className="bg-dark-bg pt-24 lg:pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-foreground/10">
          <div className="md:col-span-2">
            <div
              className="text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Web <span className="text-brand">C&amp;B</span>
            </div>
            <p className="mt-6 text-sm text-foreground/70 leading-relaxed max-w-xs font-light">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-6">
              — {t("sectionSite")}
            </div>
            <ul className="space-y-3 text-sm font-light">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={`/#${item.key}`}
                    className="text-foreground/80 hover:text-brand transition-colors duration-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-6">
              — {t("sectionLegal")}
            </div>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/villkor" className="text-foreground/80 hover:text-brand transition-colors duration-700">
                  {t("linkTerms")}
                </Link>
              </li>
              <li>
                <Link href="/integritet" className="text-foreground/80 hover:text-brand transition-colors duration-700">
                  {t("linkPrivacy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-foreground/80 hover:text-brand transition-colors duration-700">
                  {t("linkCookies")}
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>

            <div className="mt-10 text-[10px] tracking-[0.4em] uppercase text-brand mb-4">
              — {t("sectionContact")}
            </div>
            <a
              href="mailto:web.candb@gmail.com"
              className="text-sm text-foreground/80 hover:text-brand transition-colors duration-700 block break-all font-light"
            >
              web.candb@gmail.com
            </a>
            <p className="mt-3 text-xs text-foreground/55 leading-relaxed font-light">
              {t("contactHours")}
            </p>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-foreground/40">
          <div>{t("copyright", { year: new Date().getFullYear() })}</div>
          <div className="flex items-center gap-3">
            <span>{t("builtLabel")}</span>
            <span className="text-foreground/70">Next.js</span>
            <span className="text-foreground/30">·</span>
            <span className="text-foreground/70">Tailwind</span>
            <span className="text-foreground/30">·</span>
            <span className="text-foreground/70">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
