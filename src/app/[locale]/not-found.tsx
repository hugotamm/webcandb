import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });
  return { title: t("title") };
}

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="py-40 lg:py-56">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase text-brand">
          — {t("errorLabel")}
        </div>

        <h1 className="mt-12 text-6xl sm:text-7xl lg:text-8xl leading-[1.05]">
          {t("heading")}
        </h1>

        <p className="mt-12 text-lg text-foreground/80 max-w-md mx-auto leading-relaxed font-light">
          {t("description")}
        </p>

        <div className="mt-16 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-brand hover:text-foreground transition-colors duration-700"
          >
            <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
            <span>{t("buttonHome")}</span>
          </Link>
          <a
            href="mailto:web.candb@gmail.com"
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-700"
          >
            <span>{t("buttonContact")}</span>
            <span className="w-8 h-px bg-current transition-all duration-700 group-hover:w-14" />
          </a>
        </div>

        <div className="mt-24 text-xs text-foreground/45 font-light tracking-wide max-w-md mx-auto leading-relaxed">
          {t("footerNote")}
        </div>
      </div>
    </section>
  );
}
