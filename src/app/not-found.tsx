import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sidan hittades inte",
};

export default function NotFound() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Fel 404
        </div>

        <h1 className="mt-8 text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
          Sidan hittades inte.
        </h1>

        <p className="mt-8 text-lg text-foreground/70 max-w-md mx-auto leading-relaxed">
          Sidan ni letade efter finns inte här — antingen flyttades den, togs bort, eller skrev ni fel adress.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-6 py-3.5 text-sm font-semibold hover:bg-brand-hover transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Tillbaka till start
          </a>
          <a
            href="mailto:web.candb@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-foreground/40 transition"
          >
            Kontakta oss
          </a>
        </div>

        <div className="mt-16 text-xs text-muted">
          Om ni klickade på en länk på vår sajt — mejla{" "}
          <a href="mailto:web.candb@gmail.com" className="text-brand hover:underline font-semibold">
            web.candb@gmail.com
          </a>{" "}
          så fixar vi det.
        </div>
      </div>
    </section>
  );
}
