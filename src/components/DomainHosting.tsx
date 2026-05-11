import { useTranslations } from "next-intl";

export default function DomainHosting() {
  const t = useTranslations("DomainHosting");

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")];

  return (
    <section className="py-32 lg:py-48 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <span className="eyebrow">{t("label")}</span>

        <div className="mt-12 grid md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-brand mb-5">— 01</div>
            <h3
              className="text-3xl lg:text-4xl text-foreground/90 leading-snug"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("domainTitle")}
            </h3>
            <p className="mt-5 text-base lg:text-lg text-foreground/70 leading-relaxed font-light">
              {t("domainDescription")}
            </p>
          </div>
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-brand mb-5">— 02</div>
            <h3
              className="text-3xl lg:text-4xl text-foreground/90 leading-snug"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("hostingTitle")}
            </h3>
            <p className="mt-5 text-base lg:text-lg text-foreground/70 leading-relaxed font-light">
              {t("hostingDescription")}
            </p>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-foreground/10">
          <h3
            className="text-2xl lg:text-3xl text-foreground/90 leading-snug max-w-2xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("processTitle")}
          </h3>
          <ol className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
            {steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[40px_1fr] gap-6 py-6">
                <span className="text-xs tracking-[0.3em] uppercase text-brand tabular-nums pt-1">
                  0{i + 1}
                </span>
                <p className="text-base lg:text-lg text-foreground/75 leading-relaxed font-light max-w-3xl">
                  {s}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
