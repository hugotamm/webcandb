import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Cookie-policy — Web C&B",
  description: "Vilka cookies Web C&B använder och varför.",
};

const sections = [
  { id: "vad-ar", title: "Vad är cookies?" },
  { id: "vilka", title: "Vilka cookies vi använder" },
  { id: "kop", title: "Vid köp" },
  { id: "ditt-val", title: "Ditt val" },
  { id: "webblasaren", title: "Hantera cookies via webbläsaren" },
  { id: "kontakt", title: "Kontakt" },
];

const cookies = [
  {
    category: "Nödvändiga",
    consent: false,
    items: [
      { name: "session_id", purpose: "Håller koll på din session under besöket", duration: "Session" },
      { name: "cookie_consent", purpose: "Sparar dina cookie-val", duration: "12 månader" },
      { name: "stripe_session", purpose: "Hanterar din betalning säkert", duration: "Endast under köpprocess" },
    ],
  },
  {
    category: "Analys",
    consent: true,
    items: [
      { name: "_ga, _ga_*", purpose: "Google Analytics — anonym besöksstatistik", duration: "Upp till 2 år" },
    ],
  },
  {
    category: "Marknadsföring",
    consent: true,
    items: [
      { name: "_fbp", purpose: "Meta/Facebook-pixel (om aktivt)", duration: "90 dagar" },
    ],
  },
];

const browsers = [
  { name: "Safari", path: "Inställningar → Sekretess → Hantera webbplatsdata" },
  { name: "Chrome", path: "Inställningar → Sekretess och säkerhet → Cookies" },
  { name: "Firefox", path: "Inställningar → Sekretess och säkerhet" },
  { name: "Edge", path: "Inställningar → Cookies och webbplatsbehörigheter" },
];

export default function CookiesPage() {
  return (
    <LegalShell
      eyebrow="Juridiskt"
      title="Cookie-policy"
      intro="Den här sidan använder cookies. Här förklarar vi vilka, varför och hur du själv kan styra dem."
      updated="4 maj 2026"
      sections={sections}
    >
      <div className="rounded-2xl bg-brand-soft/60 border border-brand/20 p-6">
        <p className="text-sm text-foreground/80 leading-relaxed m-0">
          <strong>Korta versionen:</strong> Vi använder bara cookies som behövs för att sajten ska funka, plus anonym besöksstatistik om du säger ja. Du bestämmer.
        </p>
      </div>

      <LegalSection id="vad-ar" number={1} title="Vad är cookies?">
        <p>
          Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. De används för att webbplatsen ska fungera, för att förbättra användarupplevelsen och för att samla statistik.
        </p>
      </LegalSection>

      <LegalSection id="vilka" number={2} title="Vilka cookies vi använder">
        <div className="not-prose space-y-6">
          {cookies.map((group) => (
            <div key={group.category} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-6 py-4 bg-foreground/[0.02] border-b border-border">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold">{group.category} cookies</h3>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                      group.consent
                        ? "bg-amber-100 text-amber-900"
                        : "bg-brand-soft text-brand"
                    }`}
                  >
                    {group.consent ? "Kräver samtycke" : "Krävs alltid"}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {group.items.map((c) => (
                  <div key={c.name} className="grid sm:grid-cols-[180px_1fr_140px] gap-3 px-6 py-4 text-sm">
                    <div className="font-mono font-semibold">{c.name}</div>
                    <div className="text-foreground/80">{c.purpose}</div>
                    <div className="text-xs text-muted sm:text-right">{c.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection id="kop" number={3} title="Vid köp">
        <p>
          När du köper ett av våra paket eller hanterar din löpande månadsavgift skickas du till <strong>Stripe</strong> respektive <strong>Bokio</strong>. Dessa tredjepartstjänster använder egna cookies som omfattas av deras respektive integritetspolicys:
        </p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3">
            <span className="text-brand">•</span>
            Stripe:{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">
              stripe.com/privacy
            </a>
          </li>
          <li className="flex gap-3">
            <span className="text-brand">•</span>
            Bokio:{" "}
            <a href="https://bokio.se/integritet" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">
              bokio.se/integritet
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="ditt-val" number={4} title="Ditt val">
        <p>
          När du besöker sajten första gången får du välja vilka cookies du godkänner. Du kan ändra dina val när som helst genom att klicka på <strong>"Cookie-inställningar"</strong> längst ner på sidan.
        </p>
      </LegalSection>

      <LegalSection id="webblasaren" number={5} title="Hantera cookies via webbläsaren">
        <div className="not-prose grid sm:grid-cols-2 gap-3">
          {browsers.map((b) => (
            <div key={b.name} className="rounded-xl border border-border bg-card p-4">
              <div className="font-bold text-sm">{b.name}</div>
              <div className="text-xs text-muted mt-1.5">{b.path}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 mt-6">
          <strong>Obs:</strong> Att stänga av nödvändiga cookies kan göra att sajten slutar fungera korrekt och att du inte kan slutföra köp.
        </div>
      </LegalSection>

      <LegalSection id="kontakt" number={6} title="Kontakt">
        <p>
          Frågor om cookies:{" "}
          <a href="mailto:web.candb@gmail.com" className="text-brand font-semibold hover:underline">
            web.candb@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
