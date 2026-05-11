import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { n: "01", title: t("step1Title"), body: t("step1Body") },
    { n: "02", title: t("step2Title"), body: t("step2Body") },
    { n: "03", title: t("step3Title"), body: t("step3Body") },
    { n: "04", title: t("step4Title"), body: t("step4Body") },
  ];

  return (
    <section id="tjanster" className="py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
          {t("title")}
        </h2>

        <div className="mt-20 divide-y divide-foreground/10 border-y border-foreground/10">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group grid lg:grid-cols-[120px_1fr_2fr] gap-6 lg:gap-12 py-10 lg:py-14"
            >
              <div className="text-xs tracking-[0.4em] uppercase text-brand tabular-nums">
                — {s.n}
              </div>
              <h3
                className="text-2xl lg:text-3xl text-foreground/90 group-hover:text-foreground transition-colors duration-700 leading-snug"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {s.title}
              </h3>
              <p className="text-base lg:text-lg text-foreground/70 leading-relaxed font-light max-w-2xl">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
