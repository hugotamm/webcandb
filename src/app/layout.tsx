import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import DemoViewer from "@/components/DemoViewer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webcandb.com"),
  title: {
    default: "Web C&B — Din gamla hemsida. Helt ny igen.",
    template: "%s · Web C&B",
  },
  description:
    "Vi bygger om trötta hemsidor till moderna, snabba sajter — fast pris, levererat på 5 dagar. Inga prenumerationer, du äger sidan.",
  openGraph: {
    title: "Web C&B — Din gamla hemsida. Helt ny igen.",
    description:
      "Modern, snabb sajt på 5 dagar — fast pris. Inga prenumerationer.",
    type: "website",
    locale: "sv_SE",
    siteName: "Web C&B",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web C&B — Din gamla hemsida. Helt ny igen.",
    description: "Modern, snabb sajt på 5 dagar — fast pris.",
  },
};

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var d = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (d) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Web C&B",
  url: "https://webcandb.com",
  email: "web.candb@gmail.com",
  description:
    "Svensk webbyrå som bygger om trötta hemsidor till moderna, snabba sajter — fast pris, levererat på 5–15 dagar.",
  areaServed: { "@type": "Country", name: "Sverige" },
  serviceType: "Webbutveckling",
  priceRange: "4900–24900 SEK",
  offers: [
    { "@type": "Offer", name: "Start", price: "4900", priceCurrency: "SEK" },
    { "@type": "Offer", name: "Klassisk", price: "11900", priceCurrency: "SEK" },
    { "@type": "Offer", name: "Premium", price: "24900", priceCurrency: "SEK" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <StickyMobileCTA />
        <DemoViewer />
        <Analytics />
      </body>
    </html>
  );
}
