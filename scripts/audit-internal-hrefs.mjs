#!/usr/bin/env node
/**
 * Static scan: find internal hrefs in source that match known 301 sources.
 * Run: node scripts/audit-internal-hrefs.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Mirror redirect sources from next.config + lib modules (path only, no hash).
const REDIRECT_SOURCES = new Map([
  ["/home", "/"],
  ["/index", "/"],
  ["/index.html", "/"],
  ["/privacy", "/privacy-policy"],
  ["/blog/hail-damage-georgetown-tx-may-2026", "/blog/hail-damage-georgetown-williamson-may-2026"],
  ["/roofing", "/services/roofing"],
  ["/hvac", "/services/hvac"],
  ["/blog/how-to-find-a-good-plumber-georgetown-tx", "/blog/how-to-choose-a-reliable-plumber-georgetown-tx"],
  ["/blog/how-to-find-a-good-plumber-georgetown", "/blog/how-to-choose-a-reliable-plumber-georgetown-tx"],
  ["/blog/roof-repair-cost-georgetown", "/blog/roof-repair-cost-georgetown-tx"],
  ["/blog/how-to-choose-plumber-georgetown-tx", "/blog/how-to-choose-a-reliable-plumber-georgetown-tx"],
  ["/authors/cole-reinhardt", "/authors/matt"],
  ["/authors/editorial-team", "/authors/matt"],
]);

// Service hub redirects (subset — full list imported dynamically below)
const scopePath = path.join(root, "lib/public-site-scope.ts");
const scopeSrc = fs.readFileSync(scopePath, "utf8");
for (const m of scopeSrc.matchAll(/"([^"]+)":\s*"([^"]+)"/g)) {
  const from = m[1];
  const to = m[2];
  if (from.includes("-georgetown-tx") || from.includes("plumber-sun") || from.includes("hvac-wolf") || from.includes("roofer-berry")) {
    REDIRECT_SOURCES.set(`/services/${from}`, `/services/${to}`);
  }
}

const neighborhoodPath = path.join(root, "lib/neighborhood-redirects.ts");
const nSrc = fs.readFileSync(neighborhoodPath, "utf8");
const areas = [...nSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]).filter((s) => s.includes("-"));
const services = ["plumber", "hvac", "roofer", "electrician", "landscaping", "pest-control", "foundation-repair", "house-cleaning"];
for (const area of areas) {
  for (const svc of services) {
    REDIRECT_SOURCES.set(`/neighborhoods/${area}/${svc}`, `/neighborhoods/${area}/home-services`);
  }
}

const hailBlogs = [
  "hail-damage-sun-city-georgetown-tx",
  "hail-damage-teravista-georgetown-tx",
  "hail-damage-wolf-ranch-georgetown-tx",
  "hail-damage-georgetown-village-tx",
];
for (const slug of hailBlogs) {
  REDIRECT_SOURCES.set(`/blog/${slug}`, `/blog/hail-damage-georgetown-williamson-may-2026`);
}

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "private"]);
const EXT = new Set([".ts", ".tsx", ".json", ".md", ".html", ".mjs", ".cjs"]);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(ent.name))) out.push(p);
  }
  return out;
}

const hrefRe = /href\s*[:=]\s*["'`](\/[^"'`#?]+)["'`]/g;
const htmlHrefRe = /href=["'](\/[^"'#?]+)["']/g;

const hits = [];

for (const file of walk(root)) {
  if (file.includes("scripts/audit-internal-hrefs.mjs")) continue;
  if (file.includes("next.config.ts") && file.endsWith("next.config.ts")) continue;
  if (file.includes("neighborhood-redirects.ts")) continue;
  if (file.includes("public-site-scope.ts")) continue;
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  for (const re of [hrefRe, htmlHrefRe]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      const href = m[1];
      if (REDIRECT_SOURCES.has(href)) {
        hits.push({ file: rel, href, destination: REDIRECT_SOURCES.get(href) });
      }
    }
  }
}

if (hits.length) {
  console.error("Internal hrefs pointing at redirect sources (should update to final URL):\n");
  for (const h of hits) {
    console.error(`  ${h.file}: ${h.href} → ${h.destination}`);
  }
  process.exit(1);
}

console.log("OK: no internal hrefs match known redirect sources.");
