import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://webcandb.com";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/villkor`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/integritet`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
