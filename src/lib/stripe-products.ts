/**
 * Web C&B paket-konfiguration.
 * Pris i öre (SEK * 100). 199 kr = 19900 öre.
 */

export type PackageId = "demo" | "start" | "klassisk" | "premium";

export const PACKAGES: Record<
  PackageId,
  {
    id: PackageId;
    name: string;
    priceSEK: number;
    priceOre: number;
    description: string;
  }
> = {
  demo: {
    id: "demo",
    name: "Demo",
    priceSEK: 199,
    priceOre: 19900,
    description: "Personlig demo av er framtida hemsida — levererad inom 48 timmar. Inspiration, inget köpkrav.",
  },
  start: {
    id: "start",
    name: "Start",
    priceSEK: 4900,
    priceOre: 490000,
    description: "1-sidig landing page, mobilanpassad, kontaktformulär, SEO-grunder. Live på 5 dagar.",
  },
  klassisk: {
    id: "klassisk",
    name: "Klassisk",
    priceSEK: 11900,
    priceOre: 1190000,
    description: "Upp till 5 sidor, bokningsintegration, SEO + Google Business, bildgalleri. Live på 10 dagar.",
  },
  premium: {
    id: "premium",
    name: "Premium",
    priceSEK: 24900,
    priceOre: 2490000,
    description: "Helt custom-design, blogg, e-handel (20 produkter), analytics. Live på 15 dagar.",
  },
};

export function isValidPackage(id: string): id is PackageId {
  return id in PACKAGES;
}
