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
    <section className="py-32 lg:py-48">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("badge")}</span>

        <h1 className="mt-10 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
          {t("heading")}
        </h1>

        <p className="mt-10 text-lg text-foreground/80 leading-relaxed max-w-2xl font-light">
          {t("descriptionPrefix")}{" "}
          <em className="text-brand not-italic" style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic" }}>
            {pkgName}
          </em>{" "}
          {t("descriptionSuffix")}
          {session?.customer_details?.email && (
            <>
              {" "}{t("receiptPrefix")}{" "}
              <span className="text-foreground">{session.customer_details.email}</span>.
            </>
          )}
        </p>

        <div className="mt-20">
          <div className="text-[10px] tracking-[0.4em] uppercase text-brand mb-10">
            — {t("stepsLabel")}
          </div>
          <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
            {steps.map((step, i) => (
              <li key={i} className="grid grid-cols-[40px_1fr] gap-6 py-6">
                <span className="text-xs tracking-[0.3em] uppercase text-brand tabular-nums pt-1">
                  0{i + 1}
                </span>
                <p className="text-base lg:text-lg text-foreground/80 leading-relaxed font-light">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-8 sm:gap-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-brand hover:text-foreground transition-colors duration-700"
          >
            <span>{t("buttonHome")}</span>
            <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
          </Link>
          <a
            href="mailto:web.candb@gmail.com"
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-700"
          >
            <span>{t("buttonEmail")}</span>
            <span className="w-8 h-px bg-current transition-all duration-700 group-hover:w-14" />
          </a>
        </div>

        <p className="mt-20 text-xs text-foreground/50 font-light tracking-wide">
          {t("footerNote")}
        </p>
      </div>
    </section>
  );
}
