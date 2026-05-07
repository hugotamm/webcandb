import type { Metadata } from "next";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Tack — vi hörs snart!",
  robots: { index: false, follow: false },
};

const PACKAGE_NAMES: Record<string, string> = {
  demo: "Demo",
  start: "Start-paketet",
  klassisk: "Klassisk-paketet",
  premium: "Premium-paketet",
};

const NEXT_STEPS: Record<string, string[]> = {
  demo: [
    "Vi hör av oss inom någon timme för att bekräfta er beställning.",
    "Inom 48 timmar levererar vi en första version av demon.",
    "Ni får ett email med länk där ni kan se demon och ge feedback.",
    "Inget köpkrav — om demon inte träffar rätt, är det OK.",
  ],
  start: [
    "Vi mejlar er inom 24 timmar för att starta projektet.",
    "Ni får en kort intervju (15 min) där vi går igenom innehåll & känsla.",
    "Vi levererar en första version inom 5 arbetsdagar.",
    "Ni godkänner — vi sätter live + hjälper med domän/hosting.",
  ],
  klassisk: [
    "Vi mejlar er inom 24 timmar för att starta projektet.",
    "Ni får en intervju (30 min) där vi går igenom alla 5 sidor.",
    "Vi levererar första versionen inom 10 arbetsdagar.",
    "1 omgång designjusteringar ingår innan vi sätter live.",
  ],
  premium: [
    "Vi mejlar er inom 24 timmar för att starta projektet.",
    "Vi bokar in ett strategimöte för att skräddarsy designen.",
    "Vi levererar första versionen inom 15 arbetsdagar.",
    "2 omgångar designjusteringar + analytics-setup ingår.",
  ],
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
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; package?: string }>;
}) {
  const params = await searchParams;
  const session = params.session_id ? await getSessionDetails(params.session_id) : null;
  const pkgId = params.package || "demo";
  const pkgName = PACKAGE_NAMES[pkgId] || "ert paket";
  const steps = NEXT_STEPS[pkgId] || NEXT_STEPS.demo;

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Beställning bekräftad
        </div>

        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          Tack — vi hörs snart!
        </h1>

        <p className="mt-8 text-lg text-foreground/70 leading-relaxed max-w-xl">
          Er beställning av <strong className="text-foreground">{pkgName}</strong> är registrerad och betalningen är genomförd.
          {session?.customer_details?.email && (
            <>
              {" "}En kvittokopia är skickad till <strong className="text-foreground">{session.customer_details.email}</strong>.
            </>
          )}
        </p>

        <div className="mt-12 rounded-2xl bg-card border border-border p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-brand mb-4">
            Så här går det till nu
          </div>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-foreground/80 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-6 py-3.5 text-sm font-semibold hover:bg-brand-hover transition"
          >
            Tillbaka till start
          </a>
          <a
            href="mailto:web.candb@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-foreground/40 transition"
          >
            Mejla oss
          </a>
        </div>

        <p className="mt-12 text-xs text-muted">
          Frågor? Mejla{" "}
          <a href="mailto:web.candb@gmail.com" className="text-brand hover:underline font-semibold">
            web.candb@gmail.com
          </a>{" "}
          — vi svarar inom 48 timmar.
        </p>
      </div>
    </section>
  );
}
