import type { MetadataRoute } from "next";

/* ═══════════════════════════════════════════════════════════════════
   src/app/robots.ts — visa.mytriplooker.com
   ─────────────────────────────────────────────
   Next.js 14 native robots.txt generation.
   This auto-generates /robots.txt at build time.
   
   AUDIT FIX: robots.txt was returning 404.
   ═══════════════════════════════════════════════════════════════════ */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/login",
          "/auth",
          "/pay",
          "/track",
          "/upload",
          "/api",
        ],
      },
    ],
    sitemap: "https://visa.mytriplooker.com/sitemap.xml",
  };
}