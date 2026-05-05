import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
