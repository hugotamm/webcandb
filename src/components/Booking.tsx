import { useTranslations } from "next-intl";

export default function Booking() {
  const t = useTranslations("Booking");

  const benefits = [
    {
      title: t("benefit1Title"),
      body: t("benefit1Body"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: t("benefit2Title"),
      body: t("benefit2Body"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: t("benefit3Title"),
      body: t("benefit3Body"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <section id="boka" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            {t("title")}
          </h2>
          <p className="mt-8 text-lg text-foreground/70 leading-relaxed max-w-md">
            {t("description")}
          </p>

          <ul className="mt-10 space-y-6">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-soft text-brand flex items-center justify-center">
                  {b.icon}
                </span>
                <div>
                  <div className="font-bold">{b.title}</div>
                  <div className="text-sm text-muted mt-0.5">{b.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:mt-16">
          <div className="rounded-3xl bg-dark-bg text-white p-10 lg:p-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t("contactLabel")}
            </span>
            <div className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight break-all">
              web.candb@gmail.com
            </div>
            <p className="mt-6 text-white/60 leading-relaxed">
              {t("contactNote")}
            </p>
            <a
              href="mailto:web.candb@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand text-white px-6 py-3.5 font-semibold hover:bg-brand-hover transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t("contactCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
