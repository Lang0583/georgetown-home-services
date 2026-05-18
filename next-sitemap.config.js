/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://georgetownhomeservices.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  /** Ensures neighborhood hail blog URLs appear in post-build sitemap (live `/sitemap.xml` also lists them via `getBlogSlugs()`). */
  additionalPaths: async (config) => {
    const paths = [
      '/privacy-policy',
      '/about',
      '/contact',
      '/blog/hail-damage-georgetown-tx-may-2026',
      '/blog/hail-damage-sun-city-georgetown-tx',
      '/blog/hail-damage-teravista-georgetown-tx',
      '/blog/hail-damage-wolf-ranch-georgetown-tx',
      '/blog/hail-damage-georgetown-village-tx',
    ];
    return Promise.all(paths.map((path) => config.transform(config, path)));
  },
};
