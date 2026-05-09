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
    <footer className="bg-dark-bg text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold tracking-tight">
              Web <span className="text-brand">C&B</span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              {t("sectionSite")}
            </div>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={`/#${item.key}`}
                    className="text-white/80 hover:text-brand transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              {t("sectionLegal")}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/villkor" className="text-white/80 hover:text-brand transition">
                  {t("linkTerms")}
                </Link>
              </li>
              <li>
                <Link href="/integritet" className="text-white/80 hover:text-brand transition">
                  {t("linkPrivacy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/80 hover:text-brand transition">
                  {t("linkCookies")}
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>

            <div className="mt-6 text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
              {t("sectionContact")}
            </div>
            <a
              href="mailto:web.candb@gmail.com"
              className="text-sm text-white/80 hover:text-brand transition block break-all"
            >
              web.candb@gmail.com
            </a>
            <p className="mt-2 text-xs text-white/50 leading-relaxed">
              {t("contactHours")}
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>{t("copyright", { year: new Date().getFullYear() })}</div>
          <div className="flex items-center gap-2">
            <span>{t("builtLabel")}</span>
            <span className="font-semibold text-white/70">Next.js</span>
            <span>·</span>
            <span className="font-semibold text-white/70">Tailwind</span>
            <span>·</span>
            <span className="font-semibold text-white/70">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
