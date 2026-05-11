import { useTranslations } from "next-intl";

export default function Quote() {
  const t = useTranslations("Quote");

  return (
    <section className="py-40 lg:py-56 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <div className="dot-grid h-full w-full" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase text-brand mb-16">
          — {t("label")}
        </div>
        <blockquote
          className="text-3xl sm:text-4xl lg:text-5xl leading-[1.25] italic text-foreground/95"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("quote")}
        </blockquote>
        <div className="mt-16 text-[10px] tracking-[0.45em] uppercase text-foreground/45">
          {t("attribution")}
        </div>
      </div>
    </section>
  );
}
