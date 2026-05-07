import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Allmänna villkor — Web C&B",
  description: "Web C&Bs villkor för köp, leverans, betalning och support.",
};

const sections = [
  { id: "tjansterna", title: "Om tjänsterna" },
  { id: "bestallning", title: "Beställning och betalning" },
  { id: "leverans", title: "Leveranstid och 5-dagars garanti" },
  { id: "revisioner", title: "Revisioner och ångerperiod" },
  { id: "aterkund", title: "Återkundsrabatt" },
  { id: "agande", title: "Äganderätt och upphovsrätt" },
  { id: "kund", title: "Kundens ansvar" },
  { id: "ej-ingar", title: "Vad som inte ingår i månadsavgiften" },
  { id: "ansvar", title: "Ansvarsbegränsning" },
  { id: "anger", title: "Ångerrätt" },
  { id: "prisandring", title: "Prisändringar" },
  { id: "tvist", title: "Tvistlösning och tillämplig lag" },
  { id: "kontakt", title: "Kontakt" },
];

export default function VillkorPage() {
  return (
    <LegalShell
      eyebrow="Juridiskt"
      title="Allmänna villkor"
      intro="Dessa allmänna villkor gäller för alla köp och tjänster som tillhandahålls av Web C&B. Genom att beställa en tjänst godkänner du dessa villkor."
      updated="4 maj 2026"
      sections={sections}
    >
      <p>
        Web C&B ("vi", "oss", "vårt"). Fullständiga företagsuppgifter (organisationsnummer och registrerad adress) publiceras här när registreringen hos Bolagsverket är slutförd.
      </p>

      <LegalSection id="tjansterna" number={1} title="Om tjänsterna">
        <p>Web C&B erbjuder webbutvecklingstjänster i form av tre fasta paket:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span><span><strong>Start</strong> — 4 900 kr</span></li>
          <li className="flex gap-3"><span className="text-brand">•</span><span><strong>Klassisk</strong> — 11 900 kr</span></li>
          <li className="flex gap-3"><span className="text-brand">•</span><span><strong>Premium</strong> — 24 900 kr</span></li>
        </ul>
        <p>Samtliga priser är inklusive moms (25 %) och anges i SEK.</p>
        <p>
          Utöver engångskostnaden för det valda paketet tillkommer en löpande månadskostnad om <strong>199 kr (inkl. moms)</strong> som täcker:
        </p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>Hosting och drift av hemsidan</li>
          <li className="flex gap-3"><span className="text-brand">•</span>SSL-certifikat och säkerhet</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Mindre teknisk support</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Övervakning av drifttid</li>
        </ul>
        <p>
          Den löpande månadskostnaden faktureras kvartalsvis och påbörjas i samband med leverans. Den kan sägas upp med 30 dagars uppsägningstid varefter hemsidan flyttas över till kundens egen hosting eller stängs ner.
        </p>
        <p>
          Detaljerade beskrivningar av vad varje paket innehåller finns på vår hemsida vid beställningstillfället.
        </p>
      </LegalSection>

      <LegalSection id="bestallning" number={2} title="Beställning och betalning">
        <p>
          Beställning sker via vår hemsida eller mejl. Betalning av engångsbeloppet sker via Stripe (kortbetalning), faktura via Bokio eller Swish. Månadsavgiften om 199 kr faktureras kvartalsvis i förskott via Bokio.
        </p>
        <p>Vi godkänner ordern och påbörjar arbete först när full betalning eller bekräftad faktura mottagits.</p>
      </LegalSection>

      <LegalSection id="leverans" number={3} title="Leveranstid och 5-dagars garanti">
        <p>Vi garanterar leverans inom följande tidsramar från beställningsdatum:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Start</strong> — 5 arbetsdagar</li>
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Klassisk</strong> — 10 arbetsdagar</li>
          <li className="flex gap-3"><span className="text-brand">•</span><strong>Premium</strong> — 15 arbetsdagar</li>
        </ul>
        <p>
          Levererar vi inte inom utlovad tid har du rätt till full återbetalning av engångsbeloppet. Garantin gäller under förutsättning att du tillhandahållit allt nödvändigt material (texter, bilder, logotyp, domänåtkomst) inom 24 timmar efter beställning. Vid sen materialleverans räknas leveranstiden från det att vi mottagit komplett underlag.
        </p>
      </LegalSection>

      <LegalSection id="revisioner" number={4} title="Revisioner och ångerperiod">
        <p>
          Inom 30 dagar efter leverans har du rätt till två (2) omgångar mindre justeringar utan extra kostnad. Större ändringar eller ny funktionalitet debiteras enligt timpris (950 kr/h, inkl. moms).
        </p>
      </LegalSection>

      <LegalSection id="aterkund" number={5} title="Återkundsrabatt">
        <p>Som tidigare kund får du rabatt på framtida engångsbeställningar:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>Inom 6 månader från senaste leverans — <strong>30 % rabatt</strong></li>
          <li className="flex gap-3"><span className="text-brand">•</span>6–18 månader — <strong>20 % rabatt</strong></li>
          <li className="flex gap-3"><span className="text-brand">•</span>18+ månader — <strong>15 % rabatt</strong></li>
        </ul>
        <p>
          Rabatten gäller på fullt paketpris (engångsdelen) och kan inte kombineras med andra erbjudanden. Den löpande månadsavgiften om 199 kr berörs inte av återkundsrabatten.
        </p>
      </LegalSection>

      <LegalSection id="agande" number={6} title="Äganderätt och upphovsrätt">
        <p>
          Vid full betalning av engångsbeloppet övergår fullständiga rättigheter till den färdiga hemsidan till dig som kund. Web C&B förbehåller sig rätten att visa det levererade arbetet i sin portfolio och i marknadsföring, om inte annat skriftligen avtalats.
        </p>
      </LegalSection>

      <LegalSection id="kund" number={7} title="Kundens ansvar">
        <p>Du som kund ansvarar för:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>Att leverera korrekt material i tid</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Att alla bilder, texter och logotyper du tillhandahåller är godkända för användning</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Att din domän är registrerad i ditt eget namn</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Att uppfylla GDPR och andra lagkrav på din egen hemsida efter leverans</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Att uppdatera betalningsinformation om kortet förnyas eller ändras</li>
        </ul>
      </LegalSection>

      <LegalSection id="ej-ingar" number={8} title="Vad som inte ingår i månadsavgiften">
        <p>Den löpande månadskostnaden om 199 kr inkluderar inte:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex gap-3"><span className="text-brand">•</span>Innehållsuppdateringar (priser, texter, bilder)</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Designändringar eller nya sektioner</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Ny funktionalitet</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Domänregistrering eller -förnyelse</li>
          <li className="flex gap-3"><span className="text-brand">•</span>E-postkonton</li>
          <li className="flex gap-3"><span className="text-brand">•</span>Support utöver mindre tekniska frågor</li>
        </ul>
        <p>
          Behov av sådant faktureras enligt timpris (950 kr/h) eller kan beställas som ny tjänst med Återkundsrabatt.
        </p>
      </LegalSection>

      <LegalSection id="ansvar" number={9} title="Ansvarsbegränsning">
        <p>
          Web C&Bs ansvar är begränsat till värdet av det köpta paketet (engångsbeloppet). Vi ansvarar inte för indirekta skador såsom utebliven vinst, dataförlust eller affärsavbrott.
        </p>
      </LegalSection>

      <LegalSection id="anger" number={10} title="Ångerrätt">
        <p>
          Konsumenter har enligt distansavtalslagen normalt 14 dagars ångerrätt. Eftersom våra tjänster är skräddarsydda och produktionen påbörjas direkt vid beställning godkänner du genom köpet att tjänsten påbörjas under ångerfristen och att ångerrätten därmed upphör när vi börjar arbeta.
        </p>
        <p>Den löpande månadsavgiften kan sägas upp när som helst med 30 dagars uppsägningstid.</p>
      </LegalSection>

      <LegalSection id="prisandring" number={11} title="Prisändringar">
        <p>
          Engångsbeloppet är fast vid beställningstillfället. Den löpande månadsavgiften kan justeras med 60 dagars förvarning, varvid kunden har rätt att säga upp avtalet utan kostnad innan höjningen träder i kraft.
        </p>
      </LegalSection>

      <LegalSection id="tvist" number={12} title="Tvistlösning och tillämplig lag">
        <p>
          Svensk lag tillämpas på alla avtal. Tvister ska i första hand lösas genom dialog. Vid kvarstående tvist hänvisas konsumenter till Allmänna reklamationsnämnden (ARN), företag till svensk allmän domstol.
        </p>
      </LegalSection>

      <LegalSection id="kontakt" number={13} title="Kontakt">
        <p>
          Frågor om dessa villkor:{" "}
          <a href="mailto:web.candb@gmail.com" className="text-brand font-semibold hover:underline">
            web.candb@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
