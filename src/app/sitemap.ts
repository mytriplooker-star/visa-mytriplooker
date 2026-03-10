import type { MetadataRoute } from "next";

/**
 * Next.js native sitemap generation.
 * This creates /sitemap.xml automatically — no extra packages needed.
 * All destination pages are included for maximum crawl coverage.
 */

const BASE_URL = "https://visa.mytriplooker.com";

const DESTINATIONS = [
  "dubai",
  "thailand",
  "vietnam",
  "indonesia",
  "malaysia",
  "singapore",
  "japan",
  "south-korea",
  "turkey",
  "egypt",
  "azerbaijan",
  "sri-lanka",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Homepage — highest priority
  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Individual destination pages
  const destinationPages: MetadataRoute.Sitemap = DESTINATIONS.map(
    (slug) => ({
      url: `${BASE_URL}/visa/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  return [...homepage, ...destinationPages];
}
