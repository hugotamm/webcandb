import type { Metadata } from "next";
import Stripe from "stripe";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Success" });
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

const PACKAGE_KEYS: Record<string, string> = {
  demo: "packageDemo",
  start: "packageStart",
  klassisk: "packageKlassisk",
  premium: "packagePremium",
};

async function getSessionDetails(sessionId: string) {
  if (!sessionId) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
    });
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string; package?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "Success" });

  const session = sp.session_id ? await getSessionDetails(sp.session_id) : null;
  const pkgId = sp.package || "demo";
  const pkgKey = PACKAGE_KEYS[pkgId];
  const pkgName = pkgKey ? t(pkgKey) : t("fallbackPackage");

  const stepsKey = `steps${pkgId.charAt(0).toUpperCase()}${pkgId.slice(1)}`;
  const steps = pkgKey
    ? [1, 2, 3, 4].map((n) => t(`${stepsKey}${n}`))
    : [1, 2, 3, 4].map((n) => t(`stepsDemo${n}`));

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {t("badge")}
        </div>

        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          {t("heading")}
        </h1>

        <p className="mt-8 text-lg text-foreground/70 leading-relaxed max-w-xl">
          {t("descriptionPrefix")} <strong className="text-foreground">{pkgName}</strong> {t("descriptionSuffix")}
          {session?.customer_details?.email && (
            <>
              {" "}{t("receiptPrefix")} <strong className="text-foreground">{session.customer_details.email}</strong>.
            </>
          )}
        </p>

        <div className="mt-12 rounded-2xl bg-card border border-border p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-brand mb-4">
            {t("stepsLabel")}
          </div>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-foreground/80 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-6 py-3.5 text-sm font-semibold hover:bg-brand-hover transition"
          >
            {t("buttonHome")}
          </Link>
          <a
            href="mailto:web.candb@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-foreground/40 transition"
          >
            {t("buttonEmail")}
          </a>
        </div>

        <p className="mt-12 text-xs text-muted">
          {t("footerNote")}
        </p>
      </div>
    </section>
  );
}
