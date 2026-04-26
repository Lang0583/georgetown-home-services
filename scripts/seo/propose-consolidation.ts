/**
 * Consolidation proposal generator.
 *
 * Reads `.reports/content-health.json` and produces a Markdown proposal
 * grouping thin pages into:
 *   1. Service clusters that can collapse into an existing trade-hub
 *      (e.g. roof-repair / shingle-roof-repair / flashing-repair → /services/roofer-georgetown-tx).
 *      Output is a redirect map you review, edit, and pass to apply-consolidation.
 *   2. Pages that need handcrafted rewriting (no consolidation target —
 *      hub pages, location pages, blog posts, best-of pages).
 *   3. Pages with no clear remediation path (candidates for noindex/remove).
 *
 * This script never mutates the codebase. It writes
 * `.reports/consolidation-proposal.md` and the user/operator decides what to do.
 *
 * Run after `npm run seo:audit`.
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname } from "node:path";
import type { ContentHealthReport } from "./lib/types";

const HEALTH_PATH = ".reports/content-health.json";
const OUTPUT_PATH = ".reports/consolidation-proposal.md";

/**
 * Static cluster map: each cluster has a target hub URL and a list of
 * predicate functions for matching member slugs. Hub URLs are existing pages
 * that already exist in `data/site-content.json`.
 *
 * Adding a new cluster: append a new object. The order here drives the order
 * in the output.
 */
type Cluster = {
  id: string;
  trade: string;
  hubSlug: string;
  hubPath: string;
  /** Slugs that match any of these regexes are members. */
  memberPatterns: RegExp[];
  /** Members explicitly *excluded* — usually because they're already the hub. */
  excludeSlugs: string[];
  notes?: string;
};

const SERVICE_CLUSTERS: Cluster[] = [
  {
    id: "roofing",
    trade: "Roofing",
    hubSlug: "roofer-georgetown-tx",
    hubPath: "/services/roofer-georgetown-tx",
    memberPatterns: [
      /^roof-/,
      /^shingle-roof-/,
      /^flashing-/,
      /^gutter-/,
      /^storm-damage-roof-/,
      /^hail-damage-roof-/,
      /^emergency-roof-/,
    ],
    excludeSlugs: ["roofer-georgetown-tx"],
  },
  {
    id: "hvac",
    trade: "HVAC",
    hubSlug: "hvac-georgetown-tx",
    hubPath: "/services/hvac-georgetown-tx",
    memberPatterns: [
      /^ac-/,
      /^furnace-/,
      /^heater-/,
      /^hvac-(?!georgetown-tx$)/,
      /^ductwork-/,
      /^thermostat-/,
      /^indoor-air-/,
      /^emergency-hvac-/,
    ],
    excludeSlugs: ["hvac-georgetown-tx"],
  },
  {
    id: "plumbing",
    trade: "Plumbing",
    hubSlug: "plumber-georgetown-tx",
    hubPath: "/services/plumber-georgetown-tx",
    memberPatterns: [
      /^plumber-/,
      /^water-heater-/,
      /^leak-detection-/,
      /^slab-leak-/,
      /^toilet-/,
      /^garbage-disposal-/,
      /^sewer-line-/,
      /^emergency-plumber-/,
      /^drain-cleaning-/,
      /^clogged-drain-/,
    ],
    excludeSlugs: ["plumber-georgetown-tx"],
  },
];

type FlaggedItem = ContentHealthReport["items"][number];

function isThin(item: FlaggedItem): boolean {
  return item.flags.some((f) => f.startsWith("thin:"));
}

function classifyServices(
  items: FlaggedItem[],
): { byCluster: Map<string, FlaggedItem[]>; unclustered: FlaggedItem[] } {
  const byCluster = new Map<string, FlaggedItem[]>();
  for (const c of SERVICE_CLUSTERS) byCluster.set(c.id, []);
  const unclustered: FlaggedItem[] = [];

  for (const item of items) {
    if (item.section !== "service") continue;
    let matched = false;
    for (const c of SERVICE_CLUSTERS) {
      if (c.excludeSlugs.includes(item.slug)) continue;
      if (c.memberPatterns.some((re) => re.test(item.slug))) {
        byCluster.get(c.id)!.push(item);
        matched = true;
        break;
      }
    }
    if (!matched) unclustered.push(item);
  }
  return { byCluster, unclustered };
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function fmtRow(it: FlaggedItem): string {
  return `| \`${it.slug}\` | ${it.wordCount} | ${it.flags.join(", ")} |`;
}

function clusterSection(cluster: Cluster, members: FlaggedItem[], hubItem: FlaggedItem | undefined): string {
  if (members.length === 0) return "";
  const lines: string[] = [];
  lines.push(`### ${cluster.trade} cluster → \`${cluster.hubPath}\``);
  lines.push("");
  if (hubItem) {
    lines.push(
      `**Target hub** \`${hubItem.slug}\` is **also flagged thin** (${hubItem.wordCount} words). Redirecting members to it without rewriting the hub will not satisfy AdSense — it just reduces surface area. The hub needs to absorb the value of the consolidated members and reach 1,200+ unique words before any of these redirects are turned on.`,
    );
    lines.push("");
  } else {
    lines.push(`Target hub: \`${cluster.hubSlug}\` (not in flagged set, but verify word count on the live page before redirecting).`);
    lines.push("");
  }
  lines.push(`**Members to redirect → \`${cluster.hubPath}\`:**`);
  lines.push("");
  lines.push("| Slug | Words | Flags |");
  lines.push("| ---- | ----: | ----- |");
  for (const m of members.sort((a, b) => a.wordCount - b.wordCount)) {
    lines.push(fmtRow(m));
  }
  lines.push("");
  lines.push(`_${members.length} member(s) total. Combined word count: ${members.reduce((s, m) => s + m.wordCount, 0)} words._`);
  lines.push("");
  return lines.join("\n");
}

function nonClusterSections(items: FlaggedItem[]): string {
  const lines: string[] = [];

  const blogs = items.filter((i) => i.section === "blog" && isThin(i));
  const bests = items.filter((i) => i.section === "best" && isThin(i));
  const locations = items.filter((i) => i.section === "location" && isThin(i));

  if (locations.length > 0) {
    lines.push("### Location pages (no consolidation target — handcraft or remove)");
    lines.push("");
    lines.push(
      "_3 of the 4 neighborhood location pages are already 308'd to `/locations/georgetown-tx`. The remaining ones below need handcrafted rewriting (real Georgetown context: school districts, soil/foundation realities, age of the housing stock, common service-call drivers) — there is no consolidation target above them._",
    );
    lines.push("");
    lines.push("| Slug | Words | Flags |");
    lines.push("| ---- | ----: | ----- |");
    for (const it of locations) lines.push(fmtRow(it));
    lines.push("");
  }

  if (bests.length > 0) {
    lines.push("### Best-of pages (no consolidation target — rewrite or remove individually)");
    lines.push("");
    lines.push(
      "_Each best-of page is a different vertical, so there is no obvious hub to redirect into. For AdSense purposes the practical options are: (a) rewrite each to 800+ words with real reviewer-style commentary on each listed business, or (b) noindex the thin ones until they are rewritten, or (c) remove them entirely. Auto-generated text is exactly the pattern AdSense flagged — handcraft or remove._",
    );
    lines.push("");
    lines.push("| Slug | Words | Flags |");
    lines.push("| ---- | ----: | ----- |");
    for (const it of bests.sort((a, b) => a.wordCount - b.wordCount)) lines.push(fmtRow(it));
    lines.push("");
  }

  if (blogs.length > 0) {
    lines.push("### Blog posts (no consolidation target — expand each)");
    lines.push("");
    lines.push(
      "_Each blog post is a unique topic, so consolidation isn't appropriate. Expand each to 1,200+ words with concrete Georgetown-specific information (real price ranges from `lib/pricing-data.ts`, neighborhood-specific examples, photos if available)._",
    );
    lines.push("");
    lines.push("| Slug | Words | Flags |");
    lines.push("| ---- | ----: | ----- |");
    for (const it of blogs.sort((a, b) => a.wordCount - b.wordCount)) lines.push(fmtRow(it));
    lines.push("");
  }

  return lines.join("\n");
}

async function main(): Promise<void> {
  if (!(await exists(HEALTH_PATH))) {
    console.error(
      `[seo/propose-consolidation] ${HEALTH_PATH} not found. Run \`npm run seo:audit\` first.`,
    );
    process.exit(1);
  }
  const raw = await readFile(HEALTH_PATH, "utf8");
  const report = JSON.parse(raw) as ContentHealthReport;
  const items = report.items.filter(isThin);

  const { byCluster, unclustered } = classifyServices(items);

  // For each cluster, find the hub item if it itself was flagged thin.
  const hubByCluster = new Map<string, FlaggedItem | undefined>();
  for (const c of SERVICE_CLUSTERS) {
    hubByCluster.set(c.id, report.items.find((i) => i.slug === c.hubSlug));
  }

  const today = new Date().toISOString().slice(0, 10);
  const total = items.length;
  const totalServices = items.filter((i) => i.section === "service").length;

  const md: string[] = [];
  md.push(`# Consolidation proposal — ${today}`);
  md.push("");
  md.push(
    `_Auto-generated by \`scripts/seo/propose-consolidation.ts\` from \`${HEALTH_PATH}\`. Use this as the input to a human review pass before editing \`scripts/seo/consolidation-spec.ts\` and running \`npm run seo:consolidate:patch\`._`,
  );
  md.push("");
  md.push("## Why this exists");
  md.push("");
  md.push(
    `The site received an AdSense \"Low value content\" decline on 2026-04-25. The audit found ${total} thin pages (${totalServices} services). This proposal groups the service pages into clusters that can collapse into existing trade-hub URLs, and lists the remaining pages that need handcrafted rewrites or removal.`,
  );
  md.push("");
  md.push(
    "**Consolidation alone will NOT clear the AdSense violation.** Hub pages must also be rewritten to substantively absorb the content of redirected members. Consolidation reduces surface area and stops bleeding ranking signal across near-duplicates while you do the rewrites.",
  );
  md.push("");
  md.push("## Service clusters");
  md.push("");
  for (const c of SERVICE_CLUSTERS) {
    md.push(clusterSection(c, byCluster.get(c.id) ?? [], hubByCluster.get(c.id)));
  }
  if (unclustered.length > 0) {
    md.push("### Unclustered service pages (review individually)");
    md.push("");
    md.push("| Slug | Words | Flags |");
    md.push("| ---- | ----: | ----- |");
    for (const it of unclustered) md.push(fmtRow(it));
    md.push("");
  }
  md.push("## Non-service pages");
  md.push("");
  md.push(nonClusterSections(items));
  md.push("---");
  md.push("");
  md.push("## Suggested next step");
  md.push("");
  md.push(
    "1. Read this proposal end-to-end. For each cluster, decide whether to (a) consolidate now (recommended for AdSense recovery), (b) consolidate later (if you'd rather rewrite individual pages instead), or (c) remove members entirely.",
  );
  md.push(
    "2. Open `scripts/seo/consolidation-spec.ts` and add the merges you approved.",
  );
  md.push(
    "3. Run `npm run seo:consolidate:patch` to generate the exact diffs against `next.config.ts` and `lib/public-site-scope.ts`. The patch is written to `.reports/consolidation-patch.md` — nothing is mutated.",
  );
  md.push(
    "4. Apply the patch via the Cursor agent or by hand. Verify the build, then push.",
  );
  md.push(
    "5. Once consolidations are live, start the handcrafted rewrites — top-priority slugs are the trade hubs (`roofer`, `hvac`, `plumber`) since they now have to absorb the consolidated members' value.",
  );
  md.push("");

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, md.join("\n"));
  console.log(
    `[seo/propose-consolidation] wrote ${OUTPUT_PATH} (${md.join("\n").length} chars)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
