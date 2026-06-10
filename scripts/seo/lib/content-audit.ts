/**
 * Pure audit functions for content-health and freshness reports.
 *
 * Kept free of side effects (no fs, no network) so they can be unit-tested
 * and called from multiple scripts. All heavy I/O happens in the orchestrator
 * scripts under `scripts/seo/*.ts`.
 */

/**
 * Count words in rendered article text (strips HTML + block structure).
 *
 * `renderedHtml` should be the output from `generatedPages.json` when available;
 * callers fall back to the JSON content blocks for posts without generated HTML.
 */
export function countWords(text: string): number {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Count `$` followed by a digit — a proxy for "has real pricing data". */
export function countDollarFigures(text: string): number {
  const matches = text.match(/\$\s?\d/g);
  return matches ? matches.length : 0;
}

/** True if the page's title/slug suggests it is a cost guide. */
export function isCostTitle(title: string, slug: string): boolean {
  const t = `${title} ${slug}`.toLowerCase();
  return /\bcost\b|\bprice\b|how[- ]much|\$/.test(t);
}

/**
 * Walk a `ContentBlock[]` (or similar structure) and return only the
 * human-visible text, so `countWords` isn't polluted by JSON keys/braces.
 *
 * Accepts `unknown` because the same function runs against blog/service/best/
 * location page objects which share a `content` array shape but are not the
 * same type.
 */
export function extractTextFromBlocks(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    if (typeof b.text === "string") {
      parts.push(b.text);
    }
    if (Array.isArray(b.parts)) {
      for (const p of b.parts) {
        if (p && typeof p === "object") {
          const pp = p as Record<string, unknown>;
          if (typeof pp.text === "string") parts.push(pp.text);
          if (typeof pp.label === "string") parts.push(pp.label);
        }
      }
    }
    if (Array.isArray(b.items)) {
      for (const item of b.items) {
        if (typeof item === "string") parts.push(item);
      }
    }
  }
  return parts.join(" ");
}

/** Extract Q + A text from a FAQ array (shape: `{ q, a }[]`). */
export function extractTextFromFaqs(faqs: unknown): string {
  if (!Array.isArray(faqs)) return "";
  const parts: string[] = [];
  for (const f of faqs) {
    if (!f || typeof f !== "object") continue;
    const ff = f as Record<string, unknown>;
    if (typeof ff.q === "string") parts.push(ff.q);
    if (typeof ff.a === "string") parts.push(ff.a);
  }
  return parts.join(" ");
}

/**
 * Resolve the best available "rendered text" for a page:
 *   1. Generated HTML if present (blog posts render through MDX → HTML).
 *   2. Otherwise, structured extraction from content blocks + heroBullets +
 *      faqs — the three fields actually shown on the live page.
 */
export function getRenderedText(
  slug: string,
  generatedHtmlBySlug: Record<string, { html: string } | undefined>,
  page: {
    content?: unknown;
    heroBullets?: unknown;
    faqs?: unknown;
  },
): string {
  const gen = generatedHtmlBySlug[slug];
  if (gen?.html) return gen.html;
  const parts: string[] = [];
  if (Array.isArray(page.heroBullets)) {
    for (const h of page.heroBullets) if (typeof h === "string") parts.push(h);
  }
  parts.push(extractTextFromBlocks(page.content));
  parts.push(extractTextFromFaqs(page.faqs));
  return parts.join(" ");
}

/**
 * Flag list for a single content item. Returns an array of short human-readable
 * strings; empty array means "no issues".
 *
 * `hasInjectedPricing` should be `true` if the slug is wired into
 * `COST_POST_SUPPLEMENTS` in `lib/pricing-data.ts` (in which case the live page
 * injects a pricing table via `BlogCostSupplement` at render time, even though
 * the stored content has zero `$` figures). Without this signal we'd get false
 * positives on the exact posts we already fixed.
 */
export function auditContentItem(opts: {
  slug: string;
  title: string;
  section: "blog" | "service" | "best" | "location" | "sub-service" | "cost-guide";
  renderedText: string;
  hasInjectedPricing?: boolean;
}): { wordCount: number; dollarFigureCount: number; isCostTitle: boolean; flags: string[] } {
  const { slug, title, section, renderedText, hasInjectedPricing } = opts;
  const wordCount = countWords(renderedText);
  // Inject a synthetic dollar-figure count when the page uses
  // BlogCostSupplement — it renders 5+ real $ figures at runtime.
  const rawDollarCount = countDollarFigures(renderedText);
  const dollarFigureCount = hasInjectedPricing
    ? Math.max(rawDollarCount, 5)
    : rawDollarCount;
  const costFlag = isCostTitle(title, slug);
  const flags: string[] = [];

  // Thin content thresholds vary by section:
  //   blog/service: Google's helpful-content signals favor 800+ words on
  //     competitive local queries; flag under 800.
  //   best/location: shorter is acceptable (lists, directory pages). Flag under 500.
  const thinThreshold =
    section === "best" || section === "location"
      ? 500
      : section === "sub-service"
        ? 300
        : section === "cost-guide"
          ? 420
          : 800;
  if (wordCount < thinThreshold) {
    flags.push(`thin:${wordCount}w`);
  }

  // The most serious flag: a cost-titled page with zero $ figures. This was the
  // exact pattern that sent several Georgetown pages into "Discovered – currently
  // not indexed" earlier.
  if (costFlag && dollarFigureCount === 0) {
    flags.push("cost-title-no-dollars");
  }

  // Softer warning — cost-titled page with fewer than 3 $ figures is usually
  // still too light for a cost guide.
  if (costFlag && dollarFigureCount > 0 && dollarFigureCount < 3) {
    flags.push(`cost-thin-dollars:${dollarFigureCount}`);
  }

  return { wordCount, dollarFigureCount, isCostTitle: costFlag, flags };
}
