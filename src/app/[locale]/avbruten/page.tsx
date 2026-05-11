import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cancelled" });
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function CancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CancelPageContent />;
}

function CancelPageContent() {
  const t = useTranslations("Cancelled");

  return (
    <section className="py-32 lg:py-48">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("badge")}</span>

        <h1 className="mt-10 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
          {t("heading")}
        </h1>

        <p className="mt-10 text-lg text-foreground/80 leading-relaxed max-w-2xl font-light">
          {t("description")}
        </p>

        <div className="mt-20 grid sm:grid-cols-2 gap-px bg-foreground/10">
          <a
            href="/#priser"
            className="group bg-background p-8 lg:p-10 hover:bg-foreground/[0.02] transition-colors duration-700"
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-brand">
              — {t("option1Label")}
            </div>
            <div
              className="mt-4 text-2xl text-foreground/90 group-hover:text-foreground transition-colors duration-700"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("option1Title")}
            </div>
            <div className="mt-3 text-sm text-foreground/65 font-light leading-relaxed">
              {t("option1Description")}
            </div>
          </a>
          <a
            href="mailto:web.candb@gmail.com?subject=Fr%C3%A5ga%20om%20paket"
            className="group bg-background p-8 lg:p-10 hover:bg-foreground/[0.02] transition-colors duration-700"
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-brand">
              — {t("option2Label")}
            </div>
            <div
              className="mt-4 text-2xl text-foreground/90 group-hover:text-foreground transition-colors duration-700"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("option2Title")}
            </div>
            <div className="mt-3 text-sm text-foreground/65 font-light leading-relaxed">
              {t("option2Description")}
            </div>
          </a>
        </div>

        <div className="mt-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-foreground/60 hover:text-brand transition-colors duration-700"
          >
            <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
            <span>{t("buttonHome")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
