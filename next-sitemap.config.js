const subServicePaths = require('./data/sub-service-paths.json');
const costGuidePaths = require('./data/cost-guide-paths.json');
const comparisonPaths = require('./data/comparison-paths.json');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.georgetownhomeservices.com',
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
      '/compare',
      ...comparisonPaths,
      '/blog/hail-damage-georgetown-williamson-may-2026',
      '/blog/hail-damage-sun-city-georgetown-tx',
      '/blog/hail-damage-teravista-georgetown-tx',
      '/blog/hail-damage-wolf-ranch-georgetown-tx',
      '/blog/hail-damage-georgetown-village-tx',
      ...subServicePaths,
      ...costGuidePaths,
    ];
    return Promise.all(paths.map((path) => config.transform(config, path)));
  },
};
