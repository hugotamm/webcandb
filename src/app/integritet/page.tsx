import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Integritetspolicy — Web C&B",
  description: "Hur Web C&B samlar in, använder och skyddar dina personuppgifter enligt GDPR.",
};

const sections = [
  { id: "ansvarig", title: "Personuppgiftsansvarig" },
  { id: "vad", title: "Vilken information vi samlar in" },
  { id: "varfor", title: "Varför vi behandlar uppgifterna" },
  { id: "hur-lange", title: "Hur länge vi sparar uppgifter" },
  { id: "tredje-part", title: "Vem vi delar uppgifter med" },
  { id: "rattigheter", title: "Dina rättigheter" },
  { id: "klagomal", title: "Klagomål" },
  { id: "andringar", title: "Ändringar i policyn" },
];

export default function IntegritetPage() {
  return (
    <LegalShell
      eyebrow="Juridiskt"
      title="Integritetspolicy"
      intro="Den här policyn beskriver hur Web C&B samlar in, använder och skyddar dina personuppgifter i enlighet med dataskyddsförordningen (GDPR)."
      updated="4 maj 2026"
      sections={sections}
    >
      <div className="rounded-2xl bg-brand-soft/60 border border-brand/20 p-6">
        <p className="text-sm text-foreground/80 leading-relaxed m-0">
          <strong>Korta versionen:</strong> Vi samlar bara in det vi behöver för att leverera din hemsida och fakturera dig. Vi säljer aldrig dina uppgifter. Du kan när som helst be oss radera dem.
        </p>
      </div>

      <LegalSection id="ansvarig" number={1} title="Personuppgiftsansvarig">
        <div className="rounded-xl border border-border bg-card p-5 not-prose">
          <div className="font-bold">Web C&B AB</div>
          <div className="text-sm text-muted mt-2 space-y-1">
            <div>Org.nr: [DITT ORG.NR]</div>
            <div>Adress: [DIN ADRESS]</div>
            <div>
              E-post:{" "}
              <a href="mailto:web.candb@gmail.com" className="text-brand font-semibold hover:underline">
                web.candb@gmail.com
              </a>
            </div>
          </div>
        </div>
      </LegalSection>

      <LegalSection id="vad" number={2} title="Vilken information vi samlar in">
        <h3 className="text-lg font-bold mt-2">Information du själv tillhandahåller</h3>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>Namn, e-postadress, telefonnummer</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Företagsnamn, adress, organisationsnummer</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Webbadress till nuvarande hemsida (vid demo-förfrågan)</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Innehåll i meddelanden du skickar oss</li>
        </ul>

        <h3 className="text-lg font-bold mt-6">Information som samlas automatiskt</h3>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>IP-adress och teknisk webbläsarinfo</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Besöksstatistik via Google Analytics (om aktivt och med samtycke)</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Cookies — se separat <a href="/cookies" className="text-brand font-semibold hover:underline">cookie-policy</a></li>
        </ul>

        <h3 className="text-lg font-bold mt-6">Betalningsinformation</h3>
        <p>
          Vid köp av paket (Start, Klassisk eller Premium) behandlas betalningsuppgifter av <strong>Stripe</strong>. Vi sparar inga kortuppgifter själva.
        </p>
        <p>
          Vid den löpande månadsavgiften (199 kr/mån) behandlas fakturauppgifter av <strong>Bokio</strong>.
        </p>
      </LegalSection>

      <LegalSection id="varfor" number={3} title="Varför vi behandlar uppgifterna">
        <div className="not-prose space-y-3">
          {[
            { reason: "Leverera beställda tjänster och löpande hosting", basis: "Avtalsfullgörande" },
            { reason: "Skicka demo-versioner och projekt-uppdateringar", basis: "Avtalsfullgörande" },
            { reason: "Skicka faktura och hantera betalning, inkl. återkommande månadsfakturering", basis: "Rättslig förpliktelse + avtalsfullgörande" },
            { reason: "Förbättra vår tjänst", basis: "Berättigat intresse" },
            { reason: "Marknadsföring", basis: "Endast vid uttryckligt samtycke" },
          ].map((row) => (
            <div key={row.reason} className="grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 items-start rounded-xl border border-border bg-card p-4">
              <div className="text-sm">{row.reason}</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-brand whitespace-nowrap">
                {row.basis}
              </div>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection id="hur-lange" number={4} title="Hur länge vi sparar uppgifter">
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Aktiva kunduppgifter och kommunikation:</strong> så länge kundförhållandet pågår, därefter 7 år enligt bokföringslagen</li>
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Bokföringsmaterial och fakturor:</strong> 7 år</li>
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Demo-förfrågningar utan köp:</strong> 12 månader</li>
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Marknadsföringssamtycken:</strong> tills du återkallar dem</li>
        </ul>
      </LegalSection>

      <LegalSection id="tredje-part" number={5} title="Vem vi delar uppgifter med">
        <p>
          Vi delar uppgifter med följande tredjeparter, alla med personuppgiftsbiträdesavtal eller motsvarande:
        </p>
        <div className="not-prose grid sm:grid-cols-2 gap-3 mt-4">
          {[
            { name: "Stripe", role: "Engångsbetalningar med kort" },
            { name: "Bokio", role: "Fakturering, inklusive löpande månadsavgift" },
            { name: "Vercel", role: "Hosting av hemsidor" },
            { name: "Cloudflare", role: "DNS och säkerhet" },
            { name: "Google", role: "Analytics — om aktivt och med samtycke" },
            { name: "Google Workspace", role: "E-post" },
          ].map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-card p-4">
              <div className="font-bold text-sm">{p.name}</div>
              <div className="text-xs text-muted mt-1">{p.role}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 font-semibold">Vi säljer aldrig dina uppgifter till tredje part.</p>
      </LegalSection>

      <LegalSection id="rattigheter" number={6} title="Dina rättigheter">
        <p>Du har rätt att:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>Begära information om vilka uppgifter vi har om dig</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Få felaktiga uppgifter rättade</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Få dina uppgifter raderade ("rätten att bli glömd")</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Begränsa vår behandling av dina uppgifter</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Flytta dina uppgifter till annan leverantör (dataportabilitet)</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Invända mot behandling som baseras på berättigat intresse</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Återkalla samtycke när som helst</li>
        </ul>
        <p>
          För att utöva dina rättigheter, mejla{" "}
          <a href="mailto:web.candb@gmail.com" className="text-brand font-semibold hover:underline">
            web.candb@gmail.com
          </a>
          . Vi svarar inom 30 dagar.
        </p>
        <div className="rounded-xl bg-foreground/5 border border-border p-5 text-sm">
          <strong>Observera:</strong> Vissa uppgifter (t.ex. fakturahistorik) måste vi spara enligt bokföringslagen även om du begär radering — vi kan då endast radera uppgifter som inte omfattas av rättslig förpliktelse.
        </div>
      </LegalSection>

      <LegalSection id="klagomal" number={7} title="Klagomål">
        <p>
          Om du tycker vi behandlar dina uppgifter felaktigt har du rätt att klaga till Integritetsskyddsmyndigheten (IMY):{" "}
          <a href="https://imy.se" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">
            imy.se
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="andringar" number={8} title="Ändringar i policyn">
        <p>
          Vi kan uppdatera denna policy. Senaste version finns alltid på{" "}
          <a href="/integritet" className="text-brand font-semibold hover:underline">
            webcandb.com/integritet
          </a>
          . Vid väsentliga ändringar informeras befintliga kunder via e-post.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
