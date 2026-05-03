#!/usr/bin/env node
// SEO + structure audit. Fetches every URL from the sitemap (plus any orphan static routes),
// extracts SEO metadata, headings, JSON-LD types, internal/external link counts, image alt counts,
// and a rough word count. Cross-references against NOINDEX_SLUGS via the rendered <meta robots>.

import { JSDOM } from 'jsdom';

const BASE = process.env.BASE_URL || 'http://localhost:3210';

async function fetchHtml(path) {
  const r = await fetch(BASE + path, { redirect: 'follow' });
  const text = r.headers.get('content-type')?.includes('text/html') ? await r.text() : '';
  return { status: r.status, url: r.url, text };
}

function analyze(path, html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const title = doc.querySelector('title')?.textContent?.trim() || '';
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const ogType = doc.querySelector('meta[property="og:type"]')?.getAttribute('content') || '';
  const twCard = doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || '';
  const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
  const h1s = [...doc.querySelectorAll('h1')].map(h => h.textContent.trim());
  const h2s = [...doc.querySelectorAll('h2')].map(h => h.textContent.trim());
  const h3s = [...doc.querySelectorAll('h3')].map(h => h.textContent.trim());
  const jsonLdNodes = [...doc.querySelectorAll('script[type="application/ld+json"]')];
  const jsonLdTypes = [];
  const jsonLdInvalid = [];
  for (const node of jsonLdNodes) {
    try {
      const data = JSON.parse(node.textContent);
      const arr = Array.isArray(data) ? data : [data];
      for (const d of arr) {
        const t = d['@type'] || (d['@graph'] && d['@graph'].map(g => g['@type'])) || 'unknown';
        jsonLdTypes.push(Array.isArray(t) ? t.join('/') : t);
      }
    } catch (e) {
      jsonLdInvalid.push(e.message);
    }
  }
  const links = [...doc.querySelectorAll('a[href]')];
  let internal = 0, external = 0, mailto = 0, anchor = 0;
  for (const a of links) {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('mailto:') || href.startsWith('tel:')) mailto++;
    else if (href.startsWith('#')) anchor++;
    else if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        if (new URL(href).origin === BASE) internal++;
        else external++;
      } catch { /* noop */ }
    } else internal++;
  }
  const imgs = [...doc.querySelectorAll('img')];
  const imagesNoAlt = imgs.filter(i => !i.getAttribute('alt') && i.getAttribute('alt') !== '').length;
  const text = doc.body?.textContent || '';
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return {
    path, title, desc, canonical, robots, ogTitle, ogDesc, ogUrl, ogImage, ogType, twCard, viewport,
    h1Count: h1s.length, h1s, h2Count: h2s.length, h3Count: h3s.length,
    jsonLdCount: jsonLdNodes.length, jsonLdTypes, jsonLdInvalid,
    internalLinks: internal, externalLinks: external, mailtoLinks: mailto, anchorLinks: anchor,
    images: imgs.length, imagesNoAlt,
    wordCount,
  };
}

async function getSitemapUrls() {
  const r = await fetch(BASE + '/sitemap.xml');
  const xml = await r.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  return matches.map(u => new URL(u).pathname);
}

const sitemapPaths = await getSitemapUrls();

const extras = [
  '/about','/contact','/privacy-policy','/terms','/methodology','/editorial-policy','/service-areas','/authors/cole-reinhardt',
  '/services/electrician-georgetown-tx','/services/landscaping-georgetown-tx','/services/pest-control-georgetown-tx','/services/foundation-repair-georgetown-tx','/services/house-cleaning-georgetown-tx',
  '/services/hvac-georgetown-tx','/services/plumber-georgetown-tx','/services/roofer-georgetown-tx',
  '/best/best-electricians-georgetown-tx','/best/top-hvac-companies-georgetown-tx','/best/best-roofers-georgetown-tx',
  '/best/best-pest-control-georgetown-tx','/best/best-house-cleaning-services-georgetown-tx','/best/best-landscaping-companies-georgetown-tx','/best/best-foundation-repair-georgetown-tx',
];

const allPaths = [...new Set([...sitemapPaths, ...extras])];

const results = [];
for (const p of allPaths) {
  try {
    const { status, text } = await fetchHtml(p);
    if (status !== 200) {
      results.push({ path: p, status, error: 'non-200' });
      continue;
    }
    const r = analyze(p, text);
    r.status = status;
    results.push(r);
  } catch (e) {
    results.push({ path: p, error: e.message });
  }
}

// Cross checks
const titles = new Map();
const descs = new Map();
for (const r of results) {
  if (!r.title) continue;
  titles.set(r.title, (titles.get(r.title) || []).concat(r.path));
  descs.set(r.desc, (descs.get(r.desc) || []).concat(r.path));
}
const dupTitles = [...titles.entries()].filter(([_, v]) => v.length > 1);
const dupDescs = [...descs.entries()].filter(([_, v]) => v.length > 1);

const sitemapNoindex = results.filter(r => sitemapPaths.includes(r.path) && /noindex/.test(r.robots));

console.log(JSON.stringify({
  base: BASE,
  sitemapCount: sitemapPaths.length,
  totalChecked: results.length,
  sitemapNoindex: sitemapNoindex.map(r => ({ path: r.path, robots: r.robots })),
  dupTitles, dupDescs,
  pages: results,
}, null, 2));
