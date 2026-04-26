/**
 * Consolidation patch generator.
 *
 * Reads the operator's filled-in merge spec at
 * `scripts/seo/consolidation-spec.ts` and writes a Markdown patch at
 * `.reports/consolidation-patch.md` containing the exact diffs to apply to:
 *
 *   - `next.config.ts`         (308 redirects from each source → target)
 *   - `lib/public-site-scope.ts` (extend the redirected-slug sets so sitemap,
 *                                  static-params, and internal-link code skip
 *                                  the redirected slugs)
 *
 * The script does NOT mutate the codebase. It validates the spec, prints any
 * problems, and emits a review-ready patch file. The operator (or the Cursor
 * agent) applies the diffs after reading them.
 *
 * Run after editing `consolidation-spec.ts`:
 *   npm run seo:consolidate:patch
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname } from "node:path";
import merges, { type Merge } from "./consolidation-spec";

const OUTPUT_PATH = ".reports/consolidation-patch.md";

type ValidationIssue = { mergeId: string; message: string };

function validateMerges(list: Merge[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenSources = new Map<string, string>();
  const ids = new Set<string>();

  for (const m of list) {
    if (!m.id) {
      issues.push({ mergeId: "(missing)", message: "Merge has no id." });
      continue;
    }
    if (ids.has(m.id)) {
      issues.push({ mergeId: m.id, message: `Duplicate merge id "${m.id}".` });
    }
    ids.add(m.id);

    if (!m.target.startsWith("/")) {
      issues.push({ mergeId: m.id, message: `target "${m.target}" must start with "/".` });
    }
    if (m.sources.length === 0) {
      issues.push({ mergeId: m.id, message: "No sources listed." });
    }
    for (const s of m.sources) {
      if (!s.startsWith("/")) {
        issues.push({ mergeId: m.id, message: `source "${s}" must start with "/".` });
      }
      if (s === m.target) {
        issues.push({ mergeId: m.id, message: `source "${s}" is the same as the target — skip.` });
      }
      const prior = seenSources.get(s);
      if (prior) {
        issues.push({
          mergeId: m.id,
          message: `source "${s}" already appears in merge "${prior}" — each source can only redirect to one target.`,
        });
      } else {
        seenSources.set(s, m.id);
      }
    }
  }
  return issues;
}

function pathToSlug(p: string): string {
  return p.replace(/^\/(services|locations|blog|best)\//, "");
}

function pathScope(p: string): "services" | "locations" | "blog" | "best" | "other" {
  if (p.startsWith("/services/")) return "services";
  if (p.startsWith("/locations/")) return "locations";
  if (p.startsWith("/blog/")) return "blog";
  if (p.startsWith("/best/")) return "best";
  return "other";
}

function buildRedirectsBlock(list: Merge[]): string {
  const lines: string[] = [];
  for (const m of list) {
    lines.push(`      // --- ${m.trade} (merge id: ${m.id}) ---`);
    if (m.note) lines.push(`      // ${m.note}`);
    for (const s of m.sources) {
      lines.push("      {");
      lines.push(`        source: "${s}",`);
      lines.push(`        destination: "${m.target}",`);
      lines.push("        permanent: true,");
      lines.push("      },");
    }
  }
  return lines.join("\n");
}

function buildPublicSiteScopeAdditions(list: Merge[]): {
  serviceSlugs: string[];
  locationSlugs: string[];
  unsupported: { slug: string; mergeId: string; scope: string }[];
} {
  const serviceSlugs = new Set<string>();
  const locationSlugs = new Set<string>();
  const unsupported: { slug: string; mergeId: string; scope: string }[] = [];
  for (const m of list) {
    for (const s of m.sources) {
      const scope = pathScope(s);
      const slug = pathToSlug(s);
      if (scope === "services") serviceSlugs.add(slug);
      else if (scope === "locations") locationSlugs.add(slug);
      else unsupported.push({ slug, mergeId: m.id, scope });
    }
  }
  return {
    serviceSlugs: [...serviceSlugs].sort(),
    locationSlugs: [...locationSlugs].sort(),
    unsupported,
  };
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  if (merges.length === 0) {
    console.log(
      "[seo/apply-consolidation] consolidation-spec.ts has no merges defined — nothing to patch. Edit the spec first.",
    );
    return;
  }

  const issues = validateMerges(merges);
  if (issues.length > 0) {
    console.error("[seo/apply-consolidation] Spec has validation issues:");
    for (const i of issues) console.error(`  [${i.mergeId}] ${i.message}`);
    process.exit(1);
  }

  // Sanity check that the files we're patching exist.
  for (const fp of ["next.config.ts", "lib/public-site-scope.ts"]) {
    if (!(await exists(fp))) {
      console.error(`[seo/apply-consolidation] Expected file not found: ${fp}`);
      process.exit(1);
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const totalSources = merges.reduce((s, m) => s + m.sources.length, 0);
  const redirectsBlock = buildRedirectsBlock(merges);
  const { serviceSlugs, locationSlugs, unsupported } = buildPublicSiteScopeAdditions(merges);

  const md: string[] = [];
  md.push(`# Consolidation patch — ${today}`);
  md.push("");
  md.push(
    `_${merges.length} merge group(s), ${totalSources} source URL(s) total. Generated by \`scripts/seo/apply-consolidation.ts\` from \`scripts/seo/consolidation-spec.ts\`._`,
  );
  md.push("");
  md.push("## Pre-flight checklist");
  md.push("");
  md.push(
    "Before applying any of the diffs below, confirm each:",
  );
  md.push("");
  md.push(
    "- [ ] Every target URL resolves to a healthy page on the live site (open each one).",
  );
  md.push(
    "- [ ] Each target hub has been (or will imminently be) rewritten to absorb the value of the redirected members. Redirecting into a thin hub is a step backward for AdSense.",
  );
  md.push(
    "- [ ] No source URL appears in any other redirect rule. Conflicts cause Next.js build errors.",
  );
  md.push(
    "- [ ] You are willing to wait 7-14 days for Google to re-crawl the source URLs and update its index. Do not toggle these redirects on/off.",
  );
  md.push("");

  if (unsupported.length > 0) {
    md.push("## ⚠ Unsupported source paths");
    md.push("");
    md.push(
      "These sources are not under `/services/` or `/locations/`, so they will get redirects but will NOT be added to `lib/public-site-scope.ts` slug sets — that file currently only tracks redirected service and location slugs. If your sitemap or internal-links logic needs to know about these (e.g. blog or best-of redirects), extend `public-site-scope.ts` first.",
    );
    md.push("");
    for (const u of unsupported) {
      md.push(`- \`${u.slug}\` (merge: ${u.mergeId}, scope: ${u.scope})`);
    }
    md.push("");
  }

  md.push("## 1. Diff for `next.config.ts`");
  md.push("");
  md.push(
    "Find the existing `redirects()` array in `next.config.ts` and append the block below **before** the closing `]`. Order does not matter for Next.js but grouping by trade improves readability.",
  );
  md.push("");
  md.push("```ts");
  md.push(redirectsBlock);
  md.push("```");
  md.push("");

  md.push("## 2. Diff for `lib/public-site-scope.ts`");
  md.push("");
  if (serviceSlugs.length > 0) {
    md.push(
      "Add the following to `REDIRECTED_SERVICE_SLUGS`:",
    );
    md.push("");
    md.push("```ts");
    for (const s of serviceSlugs) md.push(`  "${s}",`);
    md.push("```");
    md.push("");
  }
  if (locationSlugs.length > 0) {
    md.push("Add the following to `REDIRECTED_LOCATION_SLUGS`:");
    md.push("");
    md.push("```ts");
    for (const s of locationSlugs) md.push(`  "${s}",`);
    md.push("```");
    md.push("");
  }

  md.push("## 3. Verification steps after applying");
  md.push("");
  md.push("```bash");
  md.push("# Type-check");
  md.push("npx tsc --noEmit");
  md.push("");
  md.push("# Production build (catches duplicate redirect sources)");
  md.push("npm run build");
  md.push("");
  md.push("# Re-run the audits to confirm flagged-page count drops");
  md.push("npm run seo:audit && npm run seo:digest");
  md.push("```");
  md.push("");
  md.push("After the redirects ship:");
  md.push("");
  md.push(
    "- Verify each redirect with `curl -I https://www.georgetownhomeservices.com<source>` and confirm `HTTP/2 308`.",
  );
  md.push(
    "- Resubmit the sitemap in Search Console so Google sees the canonical hubs faster.",
  );
  md.push(
    "- Use the GSC \"URL Inspection\" → \"Request indexing\" tool on the rewritten hub pages once they're substantively rewritten.",
  );
  md.push("");

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, md.join("\n"));
  console.log(
    `[seo/apply-consolidation] wrote ${OUTPUT_PATH} — ${merges.length} merges, ${totalSources} sources`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
