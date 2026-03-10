/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://visa.mytriplooker.com",
  generateRobotsTxt: false, // We have a static robots.txt in /public
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  additionalPaths: async (config) => {
    const destinations = [
      "dubai", "thailand", "vietnam", "indonesia",
      "malaysia", "singapore", "japan", "south-korea",
      "turkey", "egypt", "azerbaijan", "sri-lanka",
    ];

    return destinations.map((slug) => ({
      loc: `/visa/${slug}`,
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));
  },
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
