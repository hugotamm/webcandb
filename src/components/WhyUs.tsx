import { useTranslations } from "next-intl";

export default function WhyUs() {
  const t = useTranslations("WhyUs");

  const reasons = [
    { num: "01", title: t("reason1Title"), body: t("reason1Body") },
    { num: "02", title: t("reason2Title"), body: t("reason2Body") },
    { num: "03", title: t("reason3Title"), body: t("reason3Body") },
  ];

  return (
    <section className="py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
          {t("titleLine1")}
          <br />
          <em className="text-brand">{t("titleLine2")}</em>
        </h2>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {reasons.map((r) => (
            <div key={r.title} className="group">
              <div className="text-xs tracking-[0.4em] uppercase text-brand tabular-nums mb-6">
                — {r.num}
              </div>
              <h3
                className="text-2xl lg:text-3xl text-foreground/90 group-hover:text-foreground transition-colors duration-700 leading-snug"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {r.title}
              </h3>
              <p className="mt-5 text-base text-foreground/70 leading-relaxed font-light max-w-md">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
