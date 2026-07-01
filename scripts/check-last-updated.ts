/**
 * Build-time check: warn when any page lastUpdated is older than 90 days.
 *
 * Scans site-content.json (services, best, locations, blog), static page
 * registry, neighborhood data, and cost guides.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import staticPages from "../data/static-pages-last-updated.json";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "../data/neighborhood-home-services-hubs";
import { NEIGHBORHOOD_HAIL_PAGES } from "../data/neighborhood-hail-pages";
import { neighborhoodServicePages } from "../data/neighborhoods";
import { costGuidePages } from "../data/cost-guides";
import { subServicePages } from "../data/sub-services";
import {
  DIRECTORY_PAGES_LAST_UPDATED,
  isLastUpdatedStale,
  LAST_UPDATED_STALE_DAYS,
} from "../lib/last-updated";

type StaleEntry = { source: string; id: string; lastUpdated: string; daysOld: number };

function daysSince(iso: string): number {
  const then = new Date(`${iso}T00:00:00.000Z`).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function check(iso: string | undefined, source: string, id: string, entries: StaleEntry[]) {
  if (!iso) {
    console.warn(`[check-last-updated] MISSING lastUpdated: ${source} → ${id}`);
    return;
  }
  if (isLastUpdatedStale(iso)) {
    entries.push({ source, id, lastUpdated: iso, daysOld: daysSince(iso) });
  }
}

function main(): void {
  const root = join(process.cwd());
  const siteContent = JSON.parse(readFileSync(join(root, "data/site-content.json"), "utf8")) as {
    services: { slug: string; lastUpdated?: string }[];
    best: { slug: string; lastUpdated?: string }[];
    locations: { slug: string; lastUpdated?: string }[];
    blog: { slug: string; lastUpdated?: string; dateModified?: string; datePublished?: string }[];
  };

  const stale: StaleEntry[] = [];

  for (const page of siteContent.services) {
    check(page.lastUpdated, "site-content.services", page.slug, stale);
  }
  for (const page of siteContent.best) {
    check(page.lastUpdated, "site-content.best", page.slug, stale);
  }
  for (const page of siteContent.locations) {
    check(page.lastUpdated, "site-content.locations", page.slug, stale);
  }
  for (const page of siteContent.blog) {
    check(page.dateModified ?? page.datePublished ?? page.lastUpdated, "site-content.blog", page.slug, stale);
  }

  for (const [pathname, iso] of Object.entries(staticPages)) {
    check(iso, "static-pages-last-updated", pathname, stale);
  }

  for (const hub of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    check(hub.lastUpdated, "neighborhood-home-services-hubs", hub.neighborhoodSlug, stale);
  }
  for (const page of NEIGHBORHOOD_HAIL_PAGES) {
    check(page.lastUpdated, "neighborhood-hail-pages", page.neighborhoodSlug, stale);
  }
  for (const page of neighborhoodServicePages) {
    check(page.lastUpdated, "neighborhoods", `${page.neighborhoodSlug}/${page.serviceSlug}`, stale);
  }
  for (const guide of costGuidePages) {
    check(guide.lastUpdated, "cost-guides", guide.slug, stale);
  }
  for (const page of subServicePages) {
    check(page.lastUpdated, "sub-services", `${page.serviceSlug}/${page.slug}`, stale);
  }

  check(DIRECTORY_PAGES_LAST_UPDATED, "lib/last-updated", "DIRECTORY_PAGES_LAST_UPDATED", stale);

  if (stale.length === 0) {
    console.log(`[check-last-updated] All lastUpdated values are within ${LAST_UPDATED_STALE_DAYS} days.`);
    return;
  }

  console.warn(
    `[check-last-updated] ${stale.length} page(s) have lastUpdated older than ${LAST_UPDATED_STALE_DAYS} days:`,
  );
  for (const entry of stale.sort((a, b) => b.daysOld - a.daysOld)) {
    console.warn(
      `  - ${entry.source} / ${entry.id}: ${entry.lastUpdated} (${entry.daysOld} days old)`,
    );
  }
}

main();
