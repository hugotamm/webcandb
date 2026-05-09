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
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted">
          {t("badge")}
        </div>

        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          {t("heading")}
        </h1>

        <p className="mt-8 text-lg text-foreground/70 leading-relaxed max-w-xl">
          {t("description")}
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          <a
            href="/#priser"
            className="rounded-2xl bg-card border border-border p-6 hover:border-brand/40 hover:shadow-md transition"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-brand">{t("option1Label")}</div>
            <div className="mt-2 font-bold">{t("option1Title")}</div>
            <div className="mt-1 text-sm text-muted">{t("option1Description")}</div>
          </a>
          <a
            href="mailto:web.candb@gmail.com?subject=Fr%C3%A5ga%20om%20paket"
            className="rounded-2xl bg-card border border-border p-6 hover:border-brand/40 hover:shadow-md transition"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-brand">{t("option2Label")}</div>
            <div className="mt-2 font-bold">{t("option2Title")}</div>
            <div className="mt-1 text-sm text-muted">{t("option2Description")}</div>
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {t("buttonHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
