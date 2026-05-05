/**
 * Bygg en mailto-länk till web.candb@gmail.com med ämne + brödtext.
 */
export function mailto({
  subject,
  body,
}: {
  subject: string;
  body?: string;
}): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:web.candb@gmail.com?${params.toString()}`;
}

export const orderMailto = (paket: string, pris: string) =>
  mailto({
    subject: `Beställning: ${paket}-paket (${pris})`,
    body:
      `Hej Web C&B,\n\n` +
      `Jag vill beställa ${paket}-paketet (${pris} inkl. moms).\n\n` +
      `Företag:\n` +
      `Org.nr:\n` +
      `Min nuvarande hemsida:\n` +
      `Telefon:\n\n` +
      `Mvh,\n`,
  });

export const demoMailto = (url?: string) =>
  mailto({
    subject: "Få demo för 199 kr",
    body:
      `Hej Web C&B,\n\n` +
      `Jag är intresserad av en demo för 199 kr.\n\n` +
      (url ? `Min nuvarande hemsida: ${url}\n` : `Min nuvarande hemsida:\n`) +
      `Företag:\n` +
      `Telefon:\n\n` +
      `Mvh,\n`,
  });
