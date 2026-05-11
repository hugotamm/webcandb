import { useTranslations } from "next-intl";

export default function Booking() {
  const t = useTranslations("Booking");

  const benefits = [
    { num: "01", title: t("benefit1Title"), body: t("benefit1Body") },
    { num: "02", title: t("benefit2Title"), body: t("benefit2Body") },
    { num: "03", title: t("benefit3Title"), body: t("benefit3Body") },
  ];

  return (
    <section id="boka" className="py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {t("title")}
          </h2>
          <p className="mt-10 text-lg text-foreground/75 leading-relaxed max-w-lg font-light">
            {t("description")}
          </p>

          <ul className="mt-14 divide-y divide-foreground/10 border-y border-foreground/10">
            {benefits.map((b) => (
              <li key={b.title} className="grid grid-cols-[40px_1fr] gap-6 py-6">
                <span className="text-xs tracking-[0.4em] uppercase text-brand tabular-nums pt-1">
                  {b.num}
                </span>
                <div>
                  <div
                    className="text-xl text-foreground"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {b.title}
                  </div>
                  <div className="text-sm text-foreground/65 mt-1.5 font-light leading-relaxed">
                    {b.body}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:mt-24">
          <div className="bg-dark-bg p-10 lg:p-14 border border-foreground/10">
            <span className="text-[10px] tracking-[0.4em] uppercase text-brand">
              — {t("contactLabel")}
            </span>
            <div
              className="mt-8 text-3xl sm:text-4xl lg:text-5xl tracking-tight break-all leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              web.candb@gmail.com
            </div>
            <p className="mt-8 text-base text-foreground/65 leading-relaxed font-light">
              {t("contactNote")}
            </p>
            <a
              href="mailto:web.candb@gmail.com"
              className="group mt-10 inline-flex items-center gap-4 text-[11px] tracking-[0.35em] uppercase text-brand hover:text-foreground transition-colors duration-700"
            >
              <span>{t("contactCta")}</span>
              <span className="w-10 h-px bg-current transition-all duration-700 group-hover:w-16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
