/**
 * Freshness audit: how stale is each published page?
 *
 * Strategy:
 *   1. Blog posts: `hasExplicitDateModified` is true when `data/site-content.json`
 *      defines `dateModified` or `datePublished` for the slug, or when
 *      `app/blog/[slug]/page.tsx` embeds per-slug `datePublished` / `dateModified`
 *      in a map (legacy pattern).
 *   2. Use the latest git commit touching the content source files
 *      (`data/site-content.json` or `lib/generatedPages.json`) as a coarse proxy
 *      for last change when comparing staleness.
 *   3. Flag any page whose effective last-change is older than the threshold.
 *
 * Writes `.reports/freshness.json`.
 */
import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { promisify } from "node:util";
import {
  getBestBySlug,
  getBestSlugs,
  getBlogBySlug,
  getBlogSlugs,
  getLocationBySlug,
  getLocationSlugs,
  getServiceBySlug,
  getServiceSlugs,
} from "../../lib/site-content";
import type { FreshnessItem, FreshnessReport } from "./lib/types";

const OUTPUT_PATH = ".reports/freshness.json";
const STALENESS_THRESHOLD_DAYS = 90;

const execFileP = promisify(execFile);

async function latestCommitDateForPath(path: string): Promise<string | null> {
  try {
    const { stdout } = await execFileP("git", [
      "log",
      "-1",
      "--format=%cI",
      "--",
      path,
    ]);
    const iso = stdout.trim();
    return iso || null;
  } catch {
    return null;
  }
}

function daysSince(iso: string | null): number | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

/**
 * Grep the blog page file for explicit date overrides. Returns a set of slugs
 * that have `datePublished` / `dateModified` defined per-slug in the page file.
 */
async function readExplicitBlogDateOverrides(): Promise<Set<string>> {
  const fp = "app/blog/[slug]/page.tsx";
  try {
    const src = await readFile(fp, "utf8");
    const slugs = new Set<string>();
    // Match any `"some-slug": { ... datePublished: ... }` or `dateModified` pattern
    // inside an `overrides`-style map. Very loose on purpose — we only want a
    // yes/no signal per slug.
    const re = /"([a-z0-9-]+)"\s*:\s*\{[^}]*\bdate(Published|Modified)\b/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      slugs.add(m[1]);
    }
    return slugs;
  } catch {
    return new Set();
  }
}

type Row = { slug: string; title: string; section: FreshnessItem["section"] };

function collectAllPages(): Row[] {
  const rows: Row[] = [];
  for (const slug of getBlogSlugs()) {
    const page = getBlogBySlug(slug);
    if (page) rows.push({ slug, title: page.title, section: "blog" });
  }
  for (const slug of getServiceSlugs()) {
    const page = getServiceBySlug(slug);
    if (page) rows.push({ slug, title: page.title, section: "service" });
  }
  for (const slug of getBestSlugs()) {
    const page = getBestBySlug(slug);
    if (page) rows.push({ slug, title: page.title, section: "best" });
  }
  for (const slug of getLocationSlugs()) {
    const page = getLocationBySlug(slug);
    if (page) rows.push({ slug, title: page.title, section: "location" });
  }
  return rows;
}

async function main(): Promise<void> {
  const rows = collectAllPages();
  const explicitDateBlogs = await readExplicitBlogDateOverrides();

  // Coarse signal: last commit that touched either content source. We apply
  // this to every page; if/when we add per-slug datePublished it's trivial to
  // upgrade this to per-slug precision.
  const [contentJsonDate, generatedJsonDate] = await Promise.all([
    latestCommitDateForPath("data/site-content.json"),
    latestCommitDateForPath("lib/generatedPages.json"),
  ]);
  // Use the more-recent of the two as the effective per-slug date.
  const corpusLastChange = [contentJsonDate, generatedJsonDate]
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1) ?? null;

  const items: FreshnessItem[] = rows.map((r) => {
    const blog = r.section === "blog" ? getBlogBySlug(r.slug) : null;
    const explicitFromJson = Boolean(blog?.dateModified ?? blog?.datePublished);
    const explicitFromBlogPage = r.section === "blog" && explicitDateBlogs.has(r.slug);
    return {
      slug: r.slug,
      title: r.title,
      section: r.section,
      lastContentChange: corpusLastChange,
      daysSinceChange: daysSince(corpusLastChange),
      hasExplicitDateModified:
        r.section === "blog" ? explicitFromJson || explicitFromBlogPage : false,
    };
  });

  const stale = items.filter(
    (i) => i.daysSinceChange !== null && i.daysSinceChange > STALENESS_THRESHOLD_DAYS,
  );
  // Blog posts with neither datePublished nor dateModified in site content (and
  // no legacy per-slug dates in the blog route file).
  const missingExplicitDate = items.filter(
    (i) => i.section === "blog" && !i.hasExplicitDateModified,
  );

  const report: FreshnessReport = {
    generatedAt: new Date().toISOString(),
    stalenessThresholdDays: STALENESS_THRESHOLD_DAYS,
    stale,
    missingExplicitDate,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(
    `[seo/audit-freshness] ${items.length} pages, ${stale.length} stale (>${STALENESS_THRESHOLD_DAYS}d), ${missingExplicitDate.length} blog posts without explicit dates in site content → ${OUTPUT_PATH}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
