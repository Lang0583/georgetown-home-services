/**
 * next-sitemap (post-build): emits XML under `.indexnow-tmp/` only so we never
 * overwrite `/sitemap.xml` (that URL is rewritten to `/api/sitemap-xml`).
 *
 * The canonical URL list for crawlers and IndexNow is `buildSitemapEntries()` in
 * `lib/sitemap-entries.ts`. After this runs, `postbuild` in package.json submits
 * those URLs to IndexNow via `scripts/submit-indexnow.ts`.
 *
 * @type {import('next-sitemap').IConfig}
 */
const siteUrl = (process.env.SITE_URL || "https://www.georgetownhomeservices.com").replace(/\/$/, "");

module.exports = {
  siteUrl,
  outDir: ".indexnow-tmp",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  autoLastmod: false,
  changefreq: "weekly",
  priority: 0.7,
};
