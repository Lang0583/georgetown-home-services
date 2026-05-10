import { buildSitemapEntries, sitemapEntriesToXml } from "../lib/sitemap-entries";
import { SITE_URL, normalizeSeoPathname } from "../lib/page-seo";

const entries = buildSitemapEntries();
const xml = sitemapEntriesToXml(entries);
console.log(JSON.stringify({ siteUrl: SITE_URL, urlCount: entries.length }, null, 2));
console.log("--- XML_START ---");
console.log(xml.slice(0, 5000));
console.log("--- XML_END ---");
