import { getGeneratedPage } from "./generatedPages";
import type { BestPage, ContentBlock, ServicePage } from "./site-content";
import { getBestBySlug, getServiceBySlug } from "./site-content";

/** Canonical slugs — must exist in `data/site-content.json` and have html (generated) and/or content blocks. */
export const CORE_SERVICE_SLUGS = ["plumber-georgetown-tx", "hvac-georgetown-tx", "roofer-georgetown-tx"] as const;

export const CORE_BEST_SLUGS = [
  "best-plumbers-georgetown-tx",
  "top-hvac-companies-georgetown-tx",
  "best-roofers-georgetown-tx",
] as const;

export type ResolvedServicePage = {
  kind: "service";
  slug: string;
  title: string;
  type: "service";
  record: ServicePage;
  /** Prefer `record.html`, else long-form HTML from `generatedPages.json`. */
  html: string | null;
  content: ContentBlock[];
};

export type ResolvedBestPage = {
  kind: "best";
  slug: string;
  title: string;
  type: "best";
  record: BestPage;
  html: string | null;
  content: ContentBlock[];
};

/** Single merge: inline html from site-content overrides generatedPages. */
function mergedArticleHtml(slug: string, inlineHtml: string | undefined): string | null {
  if (inlineHtml && inlineHtml.length > 0) return inlineHtml;
  const fromFile = getGeneratedPage(slug)?.html;
  return fromFile && fromFile.length > 0 ? fromFile : null;
}

/** Resolve a service page with one consistent shape (array + keyed html). */
export function resolveServicePage(slug: string): ResolvedServicePage | null {
  const record = getServiceBySlug(slug);
  if (!record) return null;
  return {
    kind: "service",
    slug: record.slug,
    title: record.title,
    type: "service",
    record,
    html: mergedArticleHtml(slug, record.html),
    content: record.content,
  };
}

/** Resolve a best-of page with one consistent shape. */
export function resolveBestPage(slug: string): ResolvedBestPage | null {
  const record = getBestBySlug(slug);
  if (!record) return null;
  return {
    kind: "best",
    slug: record.slug,
    title: record.title,
    type: "best",
    record,
    html: mergedArticleHtml(slug, record.html),
    content: record.content,
  };
}

function assertCorePages() {
  for (const slug of CORE_SERVICE_SLUGS) {
    const r = resolveServicePage(slug);
    if (!r) throw new Error(`[pageContentRegistry] Missing core service in data/site-content.json: ${slug}`);
    if (r.record.type !== "service") {
      throw new Error(`[pageContentRegistry] Core service "${slug}" must set "type": "service" in site-content.json`);
    }
    const hasHtml = !!(r.html && r.html.length);
    const hasContent = r.content.length > 0;
    if (!hasHtml && !hasContent) {
      throw new Error(
        `[pageContentRegistry] Core service "${slug}" needs long-form html (generatedPages.json or record.html) and/or content blocks`,
      );
    }
  }
  for (const slug of CORE_BEST_SLUGS) {
    const r = resolveBestPage(slug);
    if (!r) throw new Error(`[pageContentRegistry] Missing core best page in data/site-content.json: ${slug}`);
    if (r.record.type !== "best") {
      throw new Error(`[pageContentRegistry] Core best page "${slug}" must set "type": "best" in site-content.json`);
    }
    const hasHtml = !!(r.html && r.html.length);
    const hasContent = r.content.length > 0;
    if (!hasHtml && !hasContent) {
      throw new Error(
        `[pageContentRegistry] Core best page "${slug}" needs long-form html (generatedPages.json or record.html) and/or content blocks`,
      );
    }
  }
}

assertCorePages();
