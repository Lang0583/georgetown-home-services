/**
 * Build the weekly SEO digest markdown from the three JSON artifacts.
 *
 * Inputs:  .reports/gsc.json, .reports/content-health.json, .reports/freshness.json
 * Output:  .reports/weekly-digest.md
 *
 * The GitHub Actions workflow pipes this markdown into `gh issue create
 * --body-file`, giving the user one issue per week with everything they need
 * to triage in 15–20 minutes.
 *
 * The content-health and freshness sections work offline (no API calls); the
 * GSC section is skipped gracefully if `.reports/gsc.json` is absent (e.g. in
 * dev runs without GSC credentials).
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname } from "node:path";
import type {
  ContentHealthReport,
  FreshnessReport,
  GscReport,
} from "./lib/types";

const GSC_PATH = ".reports/gsc.json";
const HEALTH_PATH = ".reports/content-health.json";
const FRESHNESS_PATH = ".reports/freshness.json";
const OUTPUT_PATH = ".reports/weekly-digest.md";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJson<T>(path: string): Promise<T | null> {
  if (!(await exists(path))) return null;
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

function fmtInt(n: number): string {
  return n.toLocaleString("en-US");
}
function fmtPct(n: number): string {
  return `${(n * 100).toFixed(2)}%`;
}
function fmtPos(n: number): string {
  return n === 0 ? "—" : n.toFixed(1);
}

function deltaArrow(current: number, prior: number): string {
  if (prior === 0 && current === 0) return "flat";
  if (prior === 0) return `new (+${fmtInt(current)})`;
  const delta = current - prior;
  const pct = (delta / prior) * 100;
  if (Math.abs(pct) < 1) return `flat (${delta >= 0 ? "+" : ""}${delta})`;
  const arrow = delta >= 0 ? "↑" : "↓";
  return `${arrow} ${Math.abs(pct).toFixed(1)}% (${delta >= 0 ? "+" : ""}${delta})`;
}

function sectionGsc(gsc: GscReport | null): string {
  if (!gsc) {
    return [
      "## Search Console",
      "",
      "_No GSC data this week_ — `.reports/gsc.json` not found.",
      "If this is a CI run, check that `GSC_SERVICE_ACCOUNT_KEY` and `GSC_SITE_URL` secrets are set.",
      "",
    ].join("\n");
  }
  const lines: string[] = [];
  lines.push("## Search Console (last 28 days vs. prior 28)");
  lines.push("");
  lines.push(`**Property:** \`${gsc.property}\``);
  lines.push(
    `**Window:** ${gsc.window.startDate} → ${gsc.window.endDate}  _(prior: ${gsc.priorWindow.startDate} → ${gsc.priorWindow.endDate})_`,
  );
  lines.push("");
  lines.push("| Metric | Current | Prior | Trend |");
  lines.push("| ------ | ------: | ----: | ----- |");
  lines.push(
    `| Clicks | ${fmtInt(gsc.totals.clicks)} | ${fmtInt(gsc.totals.priorClicks)} | ${deltaArrow(gsc.totals.clicks, gsc.totals.priorClicks)} |`,
  );
  lines.push(
    `| Impressions | ${fmtInt(gsc.totals.impressions)} | ${fmtInt(gsc.totals.priorImpressions)} | ${deltaArrow(gsc.totals.impressions, gsc.totals.priorImpressions)} |`,
  );
  lines.push(`| CTR | ${fmtPct(gsc.totals.ctr)} | — | — |`);
  lines.push(`| Avg. position | ${fmtPos(gsc.totals.position)} | — | — |`);
  lines.push("");

  // Top winners by clicks
  const winners = [...gsc.pages].sort((a, b) => b.clicks - a.clicks).slice(0, 10);
  if (winners.length > 0) {
    lines.push("### Top 10 pages by clicks");
    lines.push("");
    lines.push("| Page | Clicks | Impressions | CTR | Position |");
    lines.push("| ---- | -----: | ----------: | --: | -------: |");
    for (const p of winners) {
      lines.push(
        `| \`${shortPath(p.page)}\` | ${fmtInt(p.clicks)} | ${fmtInt(p.impressions)} | ${fmtPct(p.ctr)} | ${fmtPos(p.position)} |`,
      );
    }
    lines.push("");
  }

  // Low-CTR targets (best title-rewrite candidates)
  if (gsc.lowCtrTargets.length > 0) {
    lines.push("### Low-CTR targets — candidates for title rewrites");
    lines.push("");
    lines.push("_Rules: impressions ≥ 100, CTR < 1%, position ≤ 20. Sorted by impressions._");
    lines.push("");
    lines.push("| Page | Query | Impr. | CTR | Pos. |");
    lines.push("| ---- | ----- | ----: | --: | ---: |");
    for (const r of gsc.lowCtrTargets.slice(0, 15)) {
      lines.push(
        `| \`${shortPath(r.page)}\` | ${escapePipe(r.query)} | ${fmtInt(r.impressions)} | ${fmtPct(r.ctr)} | ${fmtPos(r.position)} |`,
      );
    }
    lines.push("");
    lines.push(
      "> To generate 3 title alternatives for any row above, ask Cursor: _\"Draft 3 new SEO title options for `[page path]` optimized for query `[query]`. Format: [topic] Cost in Georgetown TX: $[low]–$[high] (2026 Guide). Show current vs. proposed side-by-side.\"_",
    );
    lines.push("");
  }

  // Zero-click pages (impressions but no clicks)
  if (gsc.zeroClickPages.length > 0) {
    lines.push("### Pages with impressions but zero clicks");
    lines.push("");
    lines.push(
      "_Usually a meta-description problem, not a ranking problem. The page shows up in SERPs, but the snippet doesn't earn the click._",
    );
    lines.push("");
    lines.push("| Page | Impressions | Avg. position |");
    lines.push("| ---- | ----------: | ------------: |");
    for (const p of gsc.zeroClickPages.slice(0, 10)) {
      lines.push(
        `| \`${shortPath(p.page)}\` | ${fmtInt(p.impressions)} | ${fmtPos(p.position)} |`,
      );
    }
    lines.push("");
    lines.push(
      "> **Meta-description rewrite prompt for Cursor:** _\"Rewrite the meta description for `[page path]`. Rules: max 155 chars. Lead with a specific number or concrete fact (a price range, a year, a count). Include `Georgetown TX`. End with a local signal (neighborhood name, a response-time promise, or a specific service detail). No fluff words like 'best', 'trusted', 'leading'.\"_",
    );
    lines.push("");
  }

  return lines.join("\n");
}

function sectionContentHealth(health: ContentHealthReport | null): string {
  if (!health) {
    return "## Content health\n\n_No content-health report this week._\n";
  }
  const lines: string[] = [];
  lines.push("## Content health");
  lines.push("");
  lines.push(
    `Scanned **${health.totalPages}** pages, flagged **${health.flaggedCount}**.`,
  );
  lines.push("");
  if (health.flaggedCount === 0) {
    lines.push("_No pages flagged — all cost pages have $ figures and nothing is suspiciously thin._");
    return lines.join("\n");
  }

  // Most serious: cost-titled page with zero dollar figures.
  const costNoDollars = health.items.filter((i) =>
    i.flags.includes("cost-title-no-dollars"),
  );
  if (costNoDollars.length > 0) {
    lines.push("### Cost-titled pages with zero $ figures");
    lines.push("");
    lines.push("_These are the exact pattern that triggers \"Discovered – currently not indexed\". Fix first._");
    lines.push("");
    lines.push("| Slug | Section | Words |");
    lines.push("| ---- | ------- | ----: |");
    for (const it of costNoDollars) {
      lines.push(`| \`${it.slug}\` | ${it.section} | ${fmtInt(it.wordCount)} |`);
    }
    lines.push("");
  }

  const thinOnly = health.items
    .filter(
      (i) => i.flags.some((f) => f.startsWith("thin:")) && !i.flags.includes("cost-title-no-dollars"),
    )
    .sort((a, b) => a.wordCount - b.wordCount);
  if (thinOnly.length > 0) {
    const TOP = 20;
    const shown = thinOnly.slice(0, TOP);
    const remaining = thinOnly.length - shown.length;
    lines.push("### Thin pages");
    lines.push("");
    lines.push(
      `_Sorted by severity (lowest word count first). Showing top ${shown.length} of ${thinOnly.length}._`,
    );
    lines.push("");
    lines.push("| Slug | Section | Words | Other flags |");
    lines.push("| ---- | ------- | ----: | ----------- |");
    for (const it of shown) {
      const others = it.flags.filter((f) => !f.startsWith("thin:"));
      lines.push(
        `| \`${it.slug}\` | ${it.section} | ${fmtInt(it.wordCount)} | ${others.join(", ") || "—"} |`,
      );
    }
    if (remaining > 0) {
      lines.push("");
      lines.push(`_…and ${remaining} more. Full list in \`.reports/content-health.json\` (uploaded as a workflow artifact)._`);
    }
    lines.push("");
  }

  const costLight = health.items.filter((i) =>
    i.flags.some((f) => f.startsWith("cost-thin-dollars:")),
  );
  if (costLight.length > 0) {
    lines.push("### Cost pages with fewer than 3 $ figures");
    lines.push("");
    lines.push("| Slug | Section | $-count | Words |");
    lines.push("| ---- | ------- | ------: | ----: |");
    for (const it of costLight) {
      lines.push(
        `| \`${it.slug}\` | ${it.section} | ${it.dollarFigureCount} | ${fmtInt(it.wordCount)} |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

function sectionFreshness(fresh: FreshnessReport | null): string {
  if (!fresh) {
    return "## Freshness\n\n_No freshness report this week._\n";
  }
  const lines: string[] = [];
  lines.push("## Freshness");
  lines.push("");
  lines.push(
    `Staleness threshold: **${fresh.stalenessThresholdDays} days**. Stale pages: **${fresh.stale.length}**. Blog posts without an explicit \`dateModified\`: **${fresh.missingExplicitDate.length}**.`,
  );
  lines.push("");
  if (fresh.stale.length > 0) {
    lines.push("### Stale pages (last content commit older than threshold)");
    lines.push("");
    lines.push("| Slug | Section | Days since change |");
    lines.push("| ---- | ------- | ----------------: |");
    for (const it of fresh.stale.slice(0, 20)) {
      lines.push(
        `| \`${it.slug}\` | ${it.section} | ${it.daysSinceChange ?? "—"} |`,
      );
    }
    lines.push("");
  }
  if (fresh.missingExplicitDate.length > 0) {
    lines.push("### Blog posts without an explicit `dateModified`");
    lines.push("");
    lines.push(
      `_${fresh.missingExplicitDate.length} post(s). Setting \`dateModified\` in the \`overrides\` map in \`app/blog/[slug]/page.tsx\` lets Google surface recency in SERPs. First 15 shown:_`,
    );
    lines.push("");
    for (const it of fresh.missingExplicitDate.slice(0, 15)) {
      lines.push(`- \`${it.slug}\``);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function shortPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return url;
  }
}
function escapePipe(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function formatToday(): string {
  return new Date().toISOString().slice(0, 10);
}

async function main(): Promise<void> {
  const [gsc, health, fresh] = await Promise.all([
    readJson<GscReport>(GSC_PATH),
    readJson<ContentHealthReport>(HEALTH_PATH),
    readJson<FreshnessReport>(FRESHNESS_PATH),
  ]);

  const today = formatToday();

  const md = [
    `# Weekly SEO digest — ${today}`,
    "",
    "_Auto-generated by `scripts/seo/build-weekly-digest.ts`. This issue is a suggestion queue, not a to-do list — triage, merge what's useful, close what isn't._",
    "",
    sectionGsc(gsc),
    "",
    sectionContentHealth(health),
    "",
    sectionFreshness(fresh),
    "",
    "---",
    "",
    "### How to act on this digest",
    "",
    "1. **Cost-titled pages with zero $ figures** → top priority. Ask Cursor to add pricing tables from `lib/pricing-data.ts`.",
    "2. **Low-CTR targets** → pick 2-3 pages, ask Cursor to draft title alternatives, update the `overrides` map in `app/blog/[slug]/page.tsx`.",
    "3. **Stale pages** → either add fresh content or set a `dateModified` on them so Google sees recency.",
    "4. **Pages with impressions but zero clicks** → usually a meta-description problem. Rewrite descriptions to lead with a specific fact or number.",
    "",
    "_Not covered here (intentionally): auto-generating new content, calling the Google Indexing API. Both have negative ROI for this site — see `docs/seo-pipeline.md`._",
    "",
  ].join("\n");

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, md);
  console.log(`[seo/digest] wrote ${OUTPUT_PATH} (${md.length} chars)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
