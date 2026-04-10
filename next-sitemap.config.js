module.exports = {
  siteUrl: 'https://www.georgetownhomeservices.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [],
  },
  exclude: ['/contact', '/privacy-policy', '/terms'],
  changefreq: 'weekly',
  priority: 0.7,
};
