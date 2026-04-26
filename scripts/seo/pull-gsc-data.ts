/**
 * Pull Search Console metrics for the SEO pipeline.
 *
 * Fetches two windows:
 *   - Current: last 28 days, ending 3 days ago (GSC has a ~3 day data lag).
 *   - Prior:   the 28 days before that, for trend comparison.
 *
 * Writes `.reports/gsc.json`. Read-only against GSC.
 *
 * Env: GSC_SERVICE_ACCOUNT_KEY, GSC_SITE_URL.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import {
  formatGscDate,
  getSearchConsole,
  getSiteUrl,
  searchAnalyticsQuery,
} from "./lib/gsc";
import type {
  GscPageMetrics,
  GscQueryPageRow,
  GscReport,
} from "./lib/types";

const OUTPUT_PATH = ".reports/gsc.json";
const LOW_CTR_THRESHOLD = 0.01; // 1%
const LOW_CTR_MIN_IMPRESSIONS = 100;
const WINDOW_DAYS = 28;
const GSC_DATA_LAG_DAYS = 3;

function dateOffsetDays(from: Date, days: number): Date {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function computeWindows(): {
  current: { startDate: string; endDate: string; days: number };
  prior: { startDate: string; endDate: string; days: number };
} {
  const now = new Date();
  const endCurrent = dateOffsetDays(now, -GSC_DATA_LAG_DAYS);
  const startCurrent = dateOffsetDays(endCurrent, -(WINDOW_DAYS - 1));
  const endPrior = dateOffsetDays(startCurrent, -1);
  const startPrior = dateOffsetDays(endPrior, -(WINDOW_DAYS - 1));
  return {
    current: {
      startDate: formatGscDate(startCurrent),
      endDate: formatGscDate(endCurrent),
      days: WINDOW_DAYS,
    },
    prior: {
      startDate: formatGscDate(startPrior),
      endDate: formatGscDate(endPrior),
      days: WINDOW_DAYS,
    },
  };
}

type RawRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

function toPageMetrics(rows: RawRow[]): GscPageMetrics[] {
  return rows.map((r) => ({
    page: r.keys?.[0] ?? "",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

function toQueryPageRows(rows: RawRow[]): GscQueryPageRow[] {
  return rows.map((r) => ({
    page: r.keys?.[0] ?? "",
    query: r.keys?.[1] ?? "",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

async function main(): Promise<void> {
  const siteUrl = getSiteUrl();
  const { current, prior } = computeWindows();
  console.log(
    `[seo/pull-gsc] property=${siteUrl} current=${current.startDate}..${current.endDate} prior=${prior.startDate}..${prior.endDate}`,
  );

  const sc = await getSearchConsole();

  // Per-page metrics, current + prior windows, for trend delta.
  const [pagesCurrentRows, pagesPriorRows] = await Promise.all([
    searchAnalyticsQuery(sc, siteUrl, {
      startDate: current.startDate,
      endDate: current.endDate,
      dimensions: ["page"],
      rowLimit: 1000,
    }),
    searchAnalyticsQuery(sc, siteUrl, {
      startDate: prior.startDate,
      endDate: prior.endDate,
      dimensions: ["page"],
      rowLimit: 1000,
    }),
  ]);

  // Page+query pairs for low-CTR targeting. Keep to the current window; we
  // don't need prior data for title rewrites.
  const pageQueryRows = await searchAnalyticsQuery(sc, siteUrl, {
    startDate: current.startDate,
    endDate: current.endDate,
    dimensions: ["page", "query"],
    rowLimit: 5000,
  });

  const pages = toPageMetrics(pagesCurrentRows as RawRow[]);
  const priorPages = toPageMetrics(pagesPriorRows as RawRow[]);
  const pageQueries = toQueryPageRows(pageQueryRows as RawRow[]);

  const totals = {
    clicks: pages.reduce((s, p) => s + p.clicks, 0),
    impressions: pages.reduce((s, p) => s + p.impressions, 0),
    ctr: 0,
    position: 0,
    priorClicks: priorPages.reduce((s, p) => s + p.clicks, 0),
    priorImpressions: priorPages.reduce((s, p) => s + p.impressions, 0),
  };
  totals.ctr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0;
  // Weighted average position across pages (weight = impressions).
  const weightedPosSum = pages.reduce((s, p) => s + p.position * p.impressions, 0);
  totals.position = totals.impressions > 0 ? weightedPosSum / totals.impressions : 0;

  // Low-CTR targets: specific (page,query) pairs with real demand (>= 100 imps)
  // and poor click-through. These are the best title-rewrite candidates.
  const lowCtrTargets = pageQueries
    .filter(
      (r) =>
        r.impressions >= LOW_CTR_MIN_IMPRESSIONS &&
        r.ctr < LOW_CTR_THRESHOLD &&
        r.position <= 20, // only rank-able targets; position > 20 can't be fixed via title alone
    )
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);

  const zeroClickPages = pages
    .filter((p) => p.clicks === 0 && p.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);

  const report: GscReport = {
    generatedAt: new Date().toISOString(),
    property: siteUrl,
    window: current,
    priorWindow: prior,
    totals,
    pages,
    priorPages,
    lowCtrTargets,
    zeroClickPages,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(
    `[seo/pull-gsc] wrote ${OUTPUT_PATH} — ${pages.length} pages, ${pageQueries.length} (page,query) rows, ${lowCtrTargets.length} low-CTR targets`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
