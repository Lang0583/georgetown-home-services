#!/usr/bin/env node
/**
 * BFS click-depth from homepage vs sitemap URLs.
 * Run after `next start`: BASE_URL=http://localhost:3210 node scripts/audit-click-depth.mjs
 */

import { JSDOM } from "jsdom";

const BASE = (process.env.BASE_URL || "http://localhost:3210").replace(/\/$/, "");

function abs(href, from) {
  try {
    return new URL(href, from).href;
  } catch {
    return null;
  }
}

function pathOnly(url) {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

function isInternal(url) {
  try {
    return new URL(url).origin === new URL(BASE).origin;
  } catch {
    return false;
  }
}

async function fetchHtml(path) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const r = await fetch(url, { redirect: "follow" });
  const text = r.headers.get("content-type")?.includes("text/html") ? await r.text() : "";
  return { status: r.status, url: r.url, text };
}

async function getSitemapPaths() {
  const r = await fetch(`${BASE}/sitemap.xml`);
  const xml = await r.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOnly(m[1])).filter(Boolean);
}

const depth = new Map([["/", 0]]);
const queue = ["/"];
const edges = new Map();

while (queue.length) {
  const path = queue.shift();
  const d = depth.get(path);
  const { status, text, url } = await fetchHtml(path);
  if (status < 200 || status >= 400 || !text) continue;

  const dom = new JSDOM(text);
  const links = dom.window.document.querySelectorAll("a[href]");
  const out = edges.get(path) ?? new Set();
  for (const a of links) {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;
    const u = abs(href, url);
    if (!u || !isInternal(u)) continue;
    const p = pathOnly(u);
    if (!p) continue;
    out.add(p);
    if (!depth.has(p)) {
      depth.set(p, d + 1);
      queue.push(p);
    }
  }
  edges.set(path, out);
}

const sitemap = await getSitemapPaths();
const overTwo = sitemap.filter((p) => (depth.get(p) ?? 99) > 2);
const notReached = sitemap.filter((p) => !depth.has(p));

const hubSummary = {
  depth0: [...depth.entries()].filter(([, d]) => d === 0).map(([p]) => p),
  depth1: [...depth.entries()].filter(([, d]) => d === 1).map(([p]) => p).sort(),
  depth2: [...depth.entries()].filter(([, d]) => d === 2).map(([p]) => p).sort(),
  depth3plus: [...depth.entries()].filter(([, d]) => d > 2).map(([p, d]) => ({ path: p, depth: d })).sort((a, b) => a.depth - b.depth),
};

console.log(
  JSON.stringify(
    {
      crawled_pages: depth.size,
      sitemap_pages: sitemap.length,
      sitemap_over_2_clicks: overTwo,
      sitemap_not_reached_by_crawl: notReached,
      max_depth_on_crawl: Math.max(...depth.values()),
      hub_summary: hubSummary,
    },
    null,
    2,
  ),
);

if (overTwo.length || notReached.length) process.exit(1);
