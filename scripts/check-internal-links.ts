/**
 * Scan project source (and the `pages/` tree if present) for internal hrefs; validate
 * targets against App Router routes + known dynamic slugs + `next.config` redirects.
 *
 * Usage:
 *   npm run links:check
 *   npx tsx scripts/check-internal-links.ts --broken-table
 *   LINK_CHECK_BASE=http://localhost:3000 npm run links:check
 *
 * With LINK_CHECK_BASE set, adds an HTTP column (HEAD/GET against the running server).
 *
 * Output: optional full markdown table; always ends with **Broken internal links** table:
 *   Source page | Broken link | Route status | HTTP status
 */

import fs from "node:fs";
import path from "node:path";
import pathPosix from "node:path/posix";
import { pathToFileURL } from "node:url";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "../data/neighborhood-home-services-hubs";
import { NEIGHBORHOOD_HAIL_PAGES } from "../data/neighborhood-hail-pages";
import { neighborhoodServicePages } from "../data/neighborhoods";
import {
  getBestSlugs,
  getBlogSlugs,
  getLocationSlugs,
  getServiceSlugs,
} from "../lib/site-content";
import { AUTHOR_PROFILE_PATH } from "../lib/site-author";

const ROOT = process.cwd();

const SITE_HOSTS = new Set([
  "georgetownhomeservices.com",
  "www.georgetownhomeservices.com",
]);

function normalizePathname(href: string): string | null {
  try {
    if (href.startsWith("//")) return null;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const u = new URL(href);
      if (!SITE_HOSTS.has(u.hostname)) return null;
      href = u.pathname + u.search;
      const hix = href.indexOf("#");
      if (hix >= 0) href = href.slice(0, hix);
    }
    if (!href.startsWith("/")) return null;
    const hashIdx = href.indexOf("#");
    if (hashIdx >= 0) href = href.slice(0, hashIdx);
    const q = href.split("?");
    let p = q[0] ?? href;
    if (!p || p === "") p = "/";
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    return null;
  }
}

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".next" || ent.name === ".git") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(full, acc);
    else {
      const ext = path.extname(ent.name).toLowerCase();
      if ([".tsx", ".ts", ".jsx", ".js", ".json", ".mdx", ".md"].includes(ext)) acc.push(full);
    }
  }
  return acc;
}

/** List every App Router `page.*` under `app/` and route files under `pages/` (if present). */
function reportRouterFiles(): { appPages: string[]; pagesDirPages: string[] } {
  const appPages: string[] = [];
  const appRoot = path.join(ROOT, "app");
  if (fs.existsSync(appRoot)) {
    function walkApp(d: string) {
      for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
        const f = path.join(d, ent.name);
        if (ent.isDirectory()) walkApp(f);
        else if (/^page\.(tsx|ts|jsx|js)$/.test(ent.name)) appPages.push(path.relative(ROOT, f));
      }
    }
    walkApp(appRoot);
  }

  const pagesDirPages: string[] = [];
  const pagesRoot = path.join(ROOT, "pages");
  if (fs.existsSync(pagesRoot)) {
    function walkPages(d: string) {
      for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
        const f = path.join(d, ent.name);
        if (ent.isDirectory()) walkPages(f);
        else if (/\.(tsx|ts|jsx|js)$/.test(ent.name) && !ent.name.startsWith("_")) {
          pagesDirPages.push(path.relative(ROOT, f));
        }
      }
    }
    walkPages(pagesRoot);
  }

  return { appPages, pagesDirPages };
}

function collectApiRoutes(): Set<string> {
  const set = new Set<string>();
  const apiRoot = path.join(ROOT, "app", "api");
  if (!fs.existsSync(apiRoot)) return set;

  function walk(dir: string, segments: string[]) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full, [...segments, ent.name]);
      } else if (/^route\.(ts|js|tsx|jsx|mts|cts)$/.test(ent.name)) {
        set.add("/api/" + segments.join("/"));
      }
    }
  }

  for (const ent of fs.readdirSync(apiRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    walk(path.join(apiRoot, ent.name), [ent.name]);
  }
  return set;
}

function collectStaticPublicPaths(): Set<string> {
  const set = new Set<string>();
  const pub = path.join(ROOT, "public");
  if (!fs.existsSync(pub)) return set;
  function walk(d: string, rel: string) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const r = rel ? `${rel}/${ent.name}` : ent.name;
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) walk(full, r);
      else set.add("/" + r.split(path.sep).join("/"));
    }
  }
  walk(pub, "");
  return set;
}

function buildPagePaths(): Set<string> {
  const paths = new Set<string>();
  paths.add("/");

  const staticOnes = [
    "/pricing",
    "/pricing/calculator",
    "/about",
    "/contact",
    "/methodology",
    "/editorial-policy",
    "/service-areas",
    "/privacy-policy",
    "/terms",
    "/services",
    "/best",
    "/blog",
    AUTHOR_PROFILE_PATH,
    "/sitemap.xml",
    "/robots.txt",
  ];
  for (const p of staticOnes) paths.add(p);

  const hubs = [
    "plumbing",
    "hvac",
    "roofing",
    "electrical",
    "landscaping",
    "pest-control",
    "foundation",
    "house-cleaning",
  ];
  for (const h of hubs) paths.add(`/services/${h}`);

  for (const slug of getServiceSlugs()) paths.add(`/services/${slug}`);
  for (const slug of getBestSlugs()) paths.add(`/best/${slug}`);
  for (const slug of getBlogSlugs()) paths.add(`/blog/${slug}`);
  for (const slug of getLocationSlugs()) paths.add(`/locations/${slug}`);

  for (const p of neighborhoodServicePages) {
    paths.add(`/neighborhoods/${p.neighborhoodSlug}/${p.serviceSlug}`);
  }
  for (const h of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    paths.add(`/neighborhoods/${h.neighborhoodSlug}/home-services`);
  }
  for (const h of NEIGHBORHOOD_HAIL_PAGES) {
    paths.add(`/neighborhoods/${h.neighborhoodSlug}/hail-damage`);
  }

  return paths;
}

type RedirectRule = { source: string; destination: string; permanent: boolean };

async function loadRedirectRules(): Promise<RedirectRule[]> {
  const configPath = path.join(ROOT, "next.config.ts");
  const mod = await import(pathToFileURL(configPath).href);
  const nextConfig = mod.default as { redirects?: () => Promise<unknown[]> };
  const raw = (await nextConfig.redirects?.()) ?? [];
  const out: RedirectRule[] = [];
  for (const r of raw as {
    source?: string;
    destination?: string;
    permanent?: boolean;
    has?: unknown[];
    missing?: unknown[];
  }[]) {
    if (!r.source || !r.destination || r.has?.length || r.missing?.length) continue;
    out.push({ source: r.source, destination: r.destination, permanent: !!r.permanent });
  }
  return out;
}

function normalizeRedirectPath(p: string): string {
  let out = p.split("?")[0] ?? p;
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}

/** Exact pathname -> rule (no :params). */
function buildExactRedirectMap(rules: RedirectRule[]): Map<string, RedirectRule> {
  const m = new Map<string, RedirectRule>();
  for (const r of rules) {
    if (r.source.includes(":") || r.source.includes("(") || r.source.includes("*")) continue;
    m.set(normalizeRedirectPath(r.source), r);
  }
  return m;
}

function followRedirects(pathname: string, exact: Map<string, RedirectRule>, maxHops = 8): { final: string; chain: RedirectRule[] } {
  let cur = pathname;
  const chain: RedirectRule[] = [];
  for (let i = 0; i < maxHops; i++) {
    const rule = exact.get(cur);
    if (!rule) break;
    chain.push(rule);
    if (rule.destination.includes(":")) break;
    cur = normalizeRedirectPath(rule.destination);
  }
  return { final: cur, chain };
}

function resolveLinkStatus(
  pathname: string,
  pagePaths: Set<string>,
  exactRedirect: Map<string, RedirectRule>,
  apiPaths: Set<string>,
  publicPaths: Set<string>,
): number {
  if (pathname.startsWith("/api/")) return apiPaths.has(pathname) ? 200 : 404;

  if (pagePaths.has(pathname)) return 200;

  const { final, chain } = followRedirects(pathname, exactRedirect);
  if (chain.length > 0) return pagePaths.has(final) ? (chain[chain.length - 1]!.permanent ? 308 : 307) : 404;

  const ext = pathPosix.extname(pathname);
  if (ext && ext !== pathname) {
    return publicPaths.has(pathname) ? 200 : 404;
  }

  return 404;
}

const HREF_PATTERNS: RegExp[] = [
  /href\s*=\s*["'](\/[^'"]+)["']/g,
  /href\s*=\s*\{["'](\/[^'"]+)["']\}/g,
  /** e.g. generated JSON: href=\"/path\" */
  /href=\\"(\/[^"\\]+)\\"/g,
  /["']href["']\s*:\s*["'](\/[^'"]+)["']/g,
  /\bhref:\s*["'](\/[^'"]+)["']/g,
  /\burl:\s*["'](\/[^'"]+)["']/g,
];

function extractHrefsFromText(text: string): string[] {
  const found = new Set<string>();
  for (const re of HREF_PATTERNS) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      if (m[1]) found.add(m[1]);
    }
  }
  return [...found];
}

async function httpStatus(url: string): Promise<number | "err"> {
  try {
    let res = await fetch(url, { method: "HEAD", redirect: "manual" });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: "GET", redirect: "manual", headers: { Range: "bytes=0-0" } });
    }
    return res.status;
  } catch {
    return "err";
  }
}

async function main() {
  const pagePaths = buildPagePaths();
  const apiPaths = collectApiRoutes();
  const publicPaths = collectStaticPublicPaths();
  const redirectRules = await loadRedirectRules();
  const exactRedirect = buildExactRedirectMap(redirectRules);

  const scanDirs = ["app", "components", "lib", "data", "pages"].map((d) => path.join(ROOT, d));
  const files = scanDirs.filter((d) => fs.existsSync(d)).flatMap((d) => walkFiles(d));

  type Row = { source: string; href: string; pathname: string; status: number; http?: number | string };
  const rows: Row[] = [];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const hrefs = extractHrefsFromText(text);
    const relSource = path.relative(ROOT, file);

    for (const href of hrefs) {
      const pathname = normalizePathname(href);
      if (!pathname) continue;
      if (pathname.startsWith("/_next")) continue;

      const status = resolveLinkStatus(pathname, pagePaths, exactRedirect, apiPaths, publicPaths);
      rows.push({ source: relSource, href, pathname, status });
    }
  }

  const broken = rows.filter((r) => r.status === 404);

  const httpMap = new Map<string, number | string>();
  const base = process.env.LINK_CHECK_BASE?.replace(/\/$/, "");
  const doFetch = Boolean(base);
  const brokenOnlyTable = process.argv.includes("--broken-table") || process.argv.includes("-b");

  if (doFetch) {
    const toFetch = brokenOnlyTable ? broken : rows;
    const uniquePaths = [...new Set(toFetch.map((r) => r.pathname))];
    for (const p of uniquePaths) {
      httpMap.set(p, await httpStatus(`${base}${p}`));
    }
    for (const r of rows) {
      r.http = httpMap.get(r.pathname) ?? "—";
    }
  } else {
    for (const r of rows) {
      r.http = "—";
    }
  }

  if (!brokenOnlyTable) {
    console.log("| Source | Href | Path | Route" + (doFetch ? " | HTTP" : "") + " |");
    console.log("| --- | --- | --- | --- |" + (doFetch ? " --- |" : ""));
    for (const r of rows.sort((a, b) => a.source.localeCompare(b.source) || a.pathname.localeCompare(b.pathname))) {
      const httpCol = doFetch ? ` ${r.http ?? "—"} |` : "";
      console.log(`| ${r.source} | \`${r.href}\` | \`${r.pathname}\` | ${r.status} |${httpCol}`);
    }
  }

  const uniqBroken = broken.filter(
    (r, i, a) => a.findIndex((x) => x.source === r.source && x.pathname === r.pathname) === i,
  );

  const { appPages, pagesDirPages } = reportRouterFiles();
  console.log("\n---\n");
  console.log("### Broken internal links (route resolves to 404)\n");
  if (!uniqBroken.length) {
    console.log("_None._\n");
  } else {
    console.log("| Source page | Broken link | Route status | HTTP status |");
    console.log("| --- | --- | --- | --- |");
    for (const r of uniqBroken.sort((a, b) => a.source.localeCompare(b.source) || a.pathname.localeCompare(b.pathname))) {
      const httpVal = !doFetch ? "—" : String(r.http ?? "err");
      console.log(`| ${r.source} | \`${r.href}\` | ${r.status} | ${httpVal} |`);
    }
    console.log("");
  }

  if (!brokenOnlyTable) {
    console.log(
      `App Router page files (${appPages.length}): ${appPages.slice(0, 6).join(", ")}${appPages.length > 6 ? ", …" : ""}`,
    );
    if (pagesDirPages.length) {
      console.log(`Pages Router files (${pagesDirPages.length}): ${pagesDirPages.join(", ")}`);
    } else {
      console.log("Pages Router: (no `pages/` directory or no routes)");
    }
  }
  console.log(`\nScanned ${files.length} files, ${rows.length} internal href checks.`);
  console.log(`Broken (route resolves to 404): ${uniqBroken.length}`);
  if (uniqBroken.length) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
