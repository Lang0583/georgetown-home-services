/**
 * Marketing URL pathname audit (sitemap set + trade hub paths).
 *
 * Run: `npm run seo:urls`
 *
 * Flags:
 *   - Pathname longer than 60 characters
 *   - Underscores (prefer hyphens)
 *   - Whole-segment “stop words” in a path segment: `a`, `the`, `and` as
 *     hyphen-delimited tokens (e.g. `foo-a-bar`, `x-the-y`, `north-and-south`)
 *   - Non-descriptive tails: `page-<digits>`, `post-<digits>` as the last segment
 *
 * Fix regressions by shortening slugs, adding 301s in `next.config.ts`, and
 * pointing `pageSeoMetadata({ pathname })` / internal links at the new path.
 */

import { buildSitemapEntries } from "../../lib/sitemap-entries";

const TRADE_HUB_PATHS = [
  "/services/plumbing",
  "/services/hvac",
  "/services/roofing",
  "/services/electrical",
  "/services/landscaping",
  "/services/pest-control",
  "/services/foundation",
  "/services/house-cleaning",
] as const;

function pathnameFromSitemapUrl(url: string): string {
  try {
    const u = new URL(url);
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  } catch {
    return url;
  }
}

function hasStopWordToken(segment: string): boolean {
  const parts = segment.toLowerCase().split("-").filter(Boolean);
  return parts.some((w) => w === "a" || w === "the" || w === "and");
}

/** Filler tokens as whole hyphen words (e.g. `choose-a-plumber`); adjust list if you add stricter rules. */
function stopWordIssueForPathname(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  for (const seg of segments) {
    if (hasStopWordToken(seg)) {
      return `stop-word token in segment "${seg}"`;
    }
  }
  return null;
}

function genericTailIssue(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (!last) return null;
  if (/^page-\d+$/i.test(last) || /^post-\d+$/i.test(last)) {
    return `generic tail segment "${last}"`;
  }
  return null;
}

function auditPathname(pathname: string): string[] {
  const issues: string[] = [];
  if (pathname.length > 60) issues.push(`length ${pathname.length} (>60)`);
  if (pathname.includes("_")) issues.push("contains underscore");
  const sw = stopWordIssueForPathname(pathname);
  if (sw) issues.push(sw);
  const gen = genericTailIssue(pathname);
  if (gen) issues.push(gen);
  return issues;
}

function main() {
  const paths = new Set<string>();
  for (const entry of buildSitemapEntries()) {
    paths.add(pathnameFromSitemapUrl(entry.url));
  }
  for (const p of TRADE_HUB_PATHS) paths.add(p);

  const sorted = [...paths].sort();
  const rows = sorted.map((p) => ({ p, issues: auditPathname(p) }));
  const failed = rows.filter((r) => r.issues.length > 0);

  console.log("URL path audit (marketing / sitemap scope)");
  console.log(`Paths checked: ${sorted.length}`);
  console.log(`Longest path (${sorted.reduce((a, b) => (b.length > a.length ? b : a), "").length} chars): ${sorted.reduce((a, b) => (b.length > a.length ? b : a), "")}`);
  console.log("");

  if (failed.length === 0) {
    console.log("No paths flagged (length, underscores, a/the/and tokens, or generic page/post slugs).");
    console.log("No new 301 redirects required for these rules.");
    process.exit(0);
  }

  console.log("Flagged paths:");
  for (const r of failed) {
    console.log(`  ${r.p}`);
    for (const i of r.issues) console.log(`    - ${i}`);
  }
  process.exit(1);
}

main();
