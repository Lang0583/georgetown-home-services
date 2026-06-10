/**
 * Shared types for the SEO signal pipeline.
 *
 * The pipeline is read-only: each audit script produces a JSON artifact under
 * `.reports/`, and `build-weekly-digest.ts` assembles those artifacts into a
 * single Markdown digest that the GitHub Actions workflow posts as an issue.
 */

/** Per-page GSC metrics for a given date window. */
export type GscPageMetrics = {
  /** Page URL as reported by GSC (full absolute URL). */
  page: string;
  clicks: number;
  impressions: number;
  /** Fractional CTR, e.g. 0.035 for 3.5%. */
  ctr: number;
  /** Average position (1 = top). Lower is better. */
  position: number;
};

/** GSC query + page row (used for low-CTR targeting). */
export type GscQueryPageRow = {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** Report emitted by `pull-gsc-data.ts`. */
export type GscReport = {
  generatedAt: string;
  property: string;
  window: { startDate: string; endDate: string; days: number };
  priorWindow: { startDate: string; endDate: string; days: number };
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    priorClicks: number;
    priorImpressions: number;
  };
  pages: GscPageMetrics[];
  priorPages: GscPageMetrics[];
  /** Flagged for title rewrite: CTR < threshold AND impressions >= minImpressions. */
  lowCtrTargets: GscQueryPageRow[];
  /** Pages with impressions but zero clicks in the last 28 days. */
  zeroClickPages: GscPageMetrics[];
};

/** Per-content-item health check. */
export type ContentHealthItem = {
  slug: string;
  title: string;
  /** `/blog/…`, `/services/…`, `/best/…`, `/locations/…`. */
  section: "blog" | "service" | "best" | "location" | "sub-service" | "cost-guide";
  wordCount: number;
  /** How many occurrences of "$" + digit we found in rendered article text. */
  dollarFigureCount: number;
  /** Whether this post's title implies cost/price info. Cost posts with 0 $ are flagged. */
  isCostTitle: boolean;
  /** Warnings triggered. */
  flags: string[];
};

export type ContentHealthReport = {
  generatedAt: string;
  totalPages: number;
  flaggedCount: number;
  /** Items with at least one flag. */
  items: ContentHealthItem[];
};

/** Per-page freshness signal. */
export type FreshnessItem = {
  slug: string;
  title: string;
  section: "blog" | "service" | "best" | "location" | "sub-service" | "cost-guide";
  /** ISO date of last commit touching this slug's content, or `null` if unknown. */
  lastContentChange: string | null;
  daysSinceChange: number | null;
  /** `true` if the slug has an explicit dateModified override in the page file. */
  hasExplicitDateModified: boolean;
};

export type FreshnessReport = {
  generatedAt: string;
  stalenessThresholdDays: number;
  stale: FreshnessItem[];
  missingExplicitDate: FreshnessItem[];
};
