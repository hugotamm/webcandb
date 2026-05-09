import { useTranslations } from "next-intl";

export default function DomainHosting() {
  const t = useTranslations("DomainHosting");

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")];

  return (
    <section className="py-24 lg:py-32 bg-dark-bg text-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 lg:p-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            {t("label")}
          </span>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-brand">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold">{t("domainTitle")}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t("domainDescription")}
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-brand">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold">{t("hostingTitle")}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t("hostingDescription")}
              </p>
            </div>
          </div>

          <hr className="my-10 border-white/10" />

          <h3 className="text-xl font-bold mb-6">{t("processTitle")}</h3>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-brand text-brand flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-white/80 leading-relaxed pt-0.5">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
