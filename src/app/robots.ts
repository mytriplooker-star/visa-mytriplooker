import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api/"],
      },
    ],
    sitemap: "https://visa.mytriplooker.com/sitemap.xml",
    host:    "https://visa.mytriplooker.com",
  };
}
