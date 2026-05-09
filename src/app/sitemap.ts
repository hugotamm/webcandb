import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://webcandb.com";
  const now = new Date();

  // For each path, generate entries for all locales with hreflang alternates.
  const paths: Array<{ path: string; priority: number; changeFrequency: "weekly" | "yearly" }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/villkor", priority: 0.4, changeFrequency: "yearly" },
    { path: "/integritet", priority: 0.4, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  ];

  return paths.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => {
      const isDefault = locale === routing.defaultLocale;
      const url =
        path === "/"
          ? isDefault
            ? `${base}/`
            : `${base}/${locale}`
          : isDefault
            ? `${base}${path}`
            : `${base}/${locale}${path}`;

      return {
        url,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => {
              const altIsDefault = alt === routing.defaultLocale;
              const altUrl =
                path === "/"
                  ? altIsDefault
                    ? `${base}/`
                    : `${base}/${alt}`
                  : altIsDefault
                    ? `${base}${path}`
                    : `${base}/${alt}${path}`;
              return [alt, altUrl];
            }),
          ),
        },
      };
    }),
  );
}
