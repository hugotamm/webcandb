import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import DemoViewer from "@/components/DemoViewer";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const isDefault = locale === routing.defaultLocale;
  const baseUrl = "https://webcandb.com";
  const canonical = isDefault ? baseUrl : `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    applicationName: "Web C&B",
    keywords: [
      "Web C&B",
      "webcandb",
      "webbyrå",
      "webbdesign",
      "hemsida",
      "ny hemsida",
      "bygga hemsida",
      "AI webbdesign",
      "Sverige",
      "fast pris",
      "Stockholm webbyrå",
    ],
    authors: [{ name: "Web C&B" }],
    creator: "Web C&B",
    publisher: "Web C&B",
    alternates: {
      canonical,
      languages: {
        sv: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonical,
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      siteName: "Web C&B",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("twitterDescription"),
      images: ["/opengraph-image"],
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
  };
}

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
  "@id": "https://webcandb.com/#organization",
  name: "Web C&B",
  alternateName: ["Web CB", "Web Changer & Builder", "WebCB", "webcandb"],
  legalName: "Web C&B",
  url: "https://webcandb.com",
  logo: {
    "@type": "ImageObject",
    url: "https://webcandb.com/apple-icon",
    width: 180,
    height: 180,
  },
  image: "https://webcandb.com/opengraph-image",
  email: "web.candb@gmail.com",
  description:
    "Svensk webbyrå som bygger om trötta hemsidor till moderna, snabba sajter — fast pris, levererat på 5–15 dagar.",
  slogan: "Din gamla hemsida. Helt ny igen.",
  areaServed: { "@type": "Country", name: "Sverige" },
  serviceType: "Webbutveckling",
  priceRange: "199–24900 SEK",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Webbpaket",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Demo" },
        price: "199",
        priceCurrency: "SEK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Start-paketet" },
        price: "4900",
        priceCurrency: "SEK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Klassisk-paketet" },
        price: "11900",
        priceCurrency: "SEK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Premium-paketet" },
        price: "24900",
        priceCurrency: "SEK",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Web C&B",
    alternateName: ["Web CB", "WebCB", "webcandb"],
    url: "https://webcandb.com",
    publisher: { "@id": "https://webcandb.com/#organization" },
    inLanguage: locale === "sv" ? "sv-SE" : "en-US",
  };

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <StickyMobileCTA />
          <DemoViewer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
