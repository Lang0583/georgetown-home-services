/**
 * Audit every published page (blog, service, best, location) for content-health
 * signals and write `.reports/content-health.json`.
 *
 * Read-only against site content. No GSC calls.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
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
import { costGuidePages } from "../../data/cost-guides";
import { subServicePages } from "../../data/sub-services";
import { getGeneratedPage } from "../../lib/generatedPages";
import { COST_POST_SUPPLEMENTS } from "../../lib/pricing-data";
import { auditContentItem, getRenderedText } from "./lib/content-audit";
import type { ContentHealthItem, ContentHealthReport } from "./lib/types";

const OUTPUT_PATH = ".reports/content-health.json";

function buildItems(): ContentHealthItem[] {
  const items: ContentHealthItem[] = [];

  // A single thin shim so `getRenderedText` can look up generated HTML for any
  // slug without each caller knowing about the module shape.
  const generatedLookup: Record<string, { html: string } | undefined> = new Proxy(
    {},
    {
      get(_t, prop) {
        if (typeof prop !== "string") return undefined;
        const gen = getGeneratedPage(prop);
        return gen ?? undefined;
      },
    },
  );

  const pushItem = (
    slug: string,
    title: string,
    section: ContentHealthItem["section"],
    page: { content?: unknown; heroBullets?: unknown; faqs?: unknown },
  ) => {
    const rendered = getRenderedText(slug, generatedLookup, page);
    const a = auditContentItem({
      slug,
      title,
      section,
      renderedText: rendered,
      hasInjectedPricing: Boolean(COST_POST_SUPPLEMENTS[slug]),
    });
    items.push({
      slug,
      title,
      section,
      wordCount: a.wordCount,
      dollarFigureCount: a.dollarFigureCount,
      isCostTitle: a.isCostTitle,
      flags: a.flags,
    });
  };

  for (const slug of getBlogSlugs()) {
    const page = getBlogBySlug(slug);
    if (page) pushItem(slug, page.title, "blog", page);
  }
  for (const slug of getServiceSlugs()) {
    const page = getServiceBySlug(slug);
    if (page) pushItem(slug, page.title, "service", page);
  }
  for (const slug of getBestSlugs()) {
    const page = getBestBySlug(slug);
    if (page) pushItem(slug, page.title, "best", page);
  }
  for (const slug of getLocationSlugs()) {
    const page = getLocationBySlug(slug);
    if (page) pushItem(slug, page.title, "location", page);
  }

  for (const page of subServicePages) {
    const rendered = [
      page.h1,
      page.metaDescription,
      ...page.bodyParagraphs,
      page.pricing.notes,
      page.faqs.map((f) => `${f.question} ${f.answer}`).join(" "),
    ].join(" ");
    const a = auditContentItem({
      slug: `${page.serviceSlug}/${page.slug}`,
      title: page.h1,
      section: "sub-service",
      renderedText: rendered,
    });
    items.push({
      slug: `${page.serviceSlug}/${page.slug}`,
      title: page.h1,
      section: "sub-service",
      wordCount: a.wordCount,
      dollarFigureCount: a.dollarFigureCount,
      isCostTitle: a.isCostTitle,
      flags: a.flags,
    });
  }

  for (const page of costGuidePages) {
    const rendered = [
      page.h1,
      page.metaDescription,
      page.pricingIntro,
      ...page.bodyParagraphs,
      page.priceRows.map((r) => `${r.serviceType} ${r.low} ${r.average} ${r.high}`).join(" "),
      page.faqs.map((f) => `${f.question} ${f.answer}`).join(" "),
    ].join(" ");
    const a = auditContentItem({
      slug: page.slug,
      title: page.h1,
      section: "cost-guide",
      renderedText: rendered,
    });
    items.push({
      slug: page.slug,
      title: page.h1,
      section: "cost-guide",
      wordCount: a.wordCount,
      dollarFigureCount: a.dollarFigureCount,
      isCostTitle: a.isCostTitle,
      flags: a.flags,
    });
  }

  return items;
}

async function main(): Promise<void> {
  const items = buildItems();
  const flagged = items.filter((i) => i.flags.length > 0);
  const report: ContentHealthReport = {
    generatedAt: new Date().toISOString(),
    totalPages: items.length,
    flaggedCount: flagged.length,
    items: flagged,
  };
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(
    `[seo/audit-content-health] ${items.length} pages scanned, ${flagged.length} flagged → ${OUTPUT_PATH}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
