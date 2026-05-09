import { useTranslations } from "next-intl";

export default function Quote() {
  const t = useTranslations("Quote");

  return (
    <section className="py-32 lg:py-40 bg-dark-bg text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div className="dot-grid h-full w-full" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="text-xs font-semibold tracking-widest uppercase text-brand/80 mb-10">
          {t("label")}
        </div>
        <div className="text-6xl text-brand/60 leading-none mb-6 font-serif">
          &ldquo;
        </div>
        <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
          {t("quote")}
        </blockquote>
        <div className="mt-10 text-xs font-semibold tracking-widest uppercase text-white/40">
          {t("attribution")}
        </div>
      </div>
    </section>
  );
}
