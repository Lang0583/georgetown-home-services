const subServicePaths = require('./data/sub-service-paths.json');
const costGuidePaths = require('./data/cost-guide-paths.json');
const comparisonPaths = require('./data/comparison-paths.json');
const blogExpansionPaths = require('./data/blog-paths.json');

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
    const zipPaths = ['/zip', '/zip/78626', '/zip/78628', '/zip/78633', '/zip/78634'];
    const paths = [
      '/compare',
      ...comparisonPaths,
      ...zipPaths,
      '/blog/hail-damage-georgetown-williamson-may-2026',
      ...subServicePaths,
      ...costGuidePaths,
      ...blogExpansionPaths,
    ];
    return Promise.all(paths.map((path) => config.transform(config, path)));
  },
};
