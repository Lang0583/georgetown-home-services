#!/usr/bin/env node
// Crawl-based link audit. Visits home, follows all internal links recursively (BFS),
// records HTTP status and basic info. Also checks external links with HEAD/GET.

import { JSDOM } from 'jsdom';

const BASE = process.env.BASE_URL || 'http://localhost:3210';
const seen = new Map(); // url -> { status, ok, type, source }
const externalSeen = new Map();
const queue = [['/', '(seed)']];

function abs(href, fromUrl) {
  try { return new URL(href, fromUrl).toString(); } catch { return null; }
}

function isInternal(u) {
  try { return new URL(u).origin === BASE; } catch { return false; }
}

async function fetchPage(url) {
  const res = await fetch(url, { redirect: 'manual' });
  let text = '';
  if (res.headers.get('content-type')?.includes('text/html')) {
    text = await res.text();
  }
  return { res, text };
}

async function checkExternal(url) {
  if (externalSeen.has(url)) return externalSeen.get(url);
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    let status = r.status;
    if (status === 405 || status === 403) {
      const r2 = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000) });
      status = r2.status;
    }
    const out = { status, ok: r.ok || (status >= 200 && status < 400) };
    externalSeen.set(url, out);
    return out;
  } catch (e) {
    const out = { status: 0, ok: false, error: e.message };
    externalSeen.set(url, out);
    return out;
  }
}

while (queue.length) {
  const [path, source] = queue.shift();
  const url = path.startsWith('http') ? path : BASE + path;
  if (seen.has(url)) continue;

  try {
    const { res, text } = await fetchPage(url);
    const entry = {
      status: res.status,
      ok: res.status >= 200 && res.status < 400,
      contentType: res.headers.get('content-type') || '',
      location: res.headers.get('location') || '',
      source,
    };
    seen.set(url, entry);

    if (entry.status >= 300 && entry.status < 400) continue;
    if (!text) continue;

    const dom = new JSDOM(text);
    const doc = dom.window.document;
    const links = doc.querySelectorAll('a[href]');
    for (const a of links) {
      const href = a.getAttribute('href');
      if (!href) continue;
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
      const u = abs(href, url);
      if (!u) continue;
      const cleanU = u.split('#')[0];
      if (isInternal(cleanU)) {
        if (!seen.has(cleanU)) queue.push([cleanU.replace(BASE, ''), url]);
      } else {
        if (!externalSeen.has(cleanU)) {
          // Track but don't validate external URLs in main pass
          externalSeen.set(cleanU, { pending: true, source: url });
        }
      }
    }
  } catch (e) {
    seen.set(url, { status: 0, ok: false, error: e.message, source });
  }
}

// Now check external links
const externals = [...externalSeen.keys()];
console.error(`Checking ${externals.length} external URLs...`);
for (const u of externals) {
  const r = await checkExternal(u);
  externalSeen.set(u, { ...externalSeen.get(u), ...r });
}

const internalArr = [...seen.entries()].map(([u, v]) => ({ url: u, ...v }));
const externalArr = [...externalSeen.entries()].map(([u, v]) => ({ url: u, ...v }));

const broken = internalArr.filter(e => !e.ok && e.status !== 308 && e.status !== 301 && e.status !== 302);
const redirects = internalArr.filter(e => e.status >= 300 && e.status < 400);
const externalBroken = externalArr.filter(e => !e.ok);

console.log(JSON.stringify({
  total_internal: internalArr.length,
  internal_broken: broken,
  internal_redirects: redirects,
  external_total: externalArr.length,
  external_broken: externalBroken,
  external_all: externalArr,
}, null, 2));
