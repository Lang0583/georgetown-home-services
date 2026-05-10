/**
 * Heuristic orphan finder: sitemap paths vs. internal href mentions in source.
 */
import { readdirSync, readFileSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { buildSitemapEntries } from "../lib/sitemap-entries";
import { normalizeSeoPathname } from "../lib/page-seo";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir: string, acc: string[]) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts|jsx|js|mdx)$/.test(name) && !name.endsWith(".d.ts")) acc.push(p);
  }
}

function pathFromSitemapUrl(full: string): string {
  try {
    const u = new URL(full);
    return normalizeSeoPathname(u.pathname);
  } catch {
    return normalizeSeoPathname(full);
  }
}

const files: string[] = [];
for (const base of ["app", "components", "lib", "data"]) {
  try {
    walk(join(ROOT, base), files);
  } catch {
    /* missing */
  }
}

let blob = "";
for (const f of files) {
  try {
    blob += `\n${readFileSync(f, "utf8")}`;
  } catch {
    /* skip */
  }
}

function pathMentionedInSource(path: string): boolean {
  const p = path === "/" ? "/" : path;
  const patterns = [
    `href="${p}"`,
    `href='${p}'`,
    `href={\`${p}\`}`,
    `href=\`${p}\``,
    `href: "${p}"`,
    `href: '${p}'`,
  ];
  if (patterns.some((pat) => blob.includes(pat))) return true;
  if (p !== "/" && p.length > 1) {
    if (blob.includes(`'${p}'`) || blob.includes(`"${p}"`) || blob.includes(`\`${p}\``)) return true;
  }
  return false;
}

const entries = buildSitemapEntries();
const sitemapPaths = new Set(entries.map((e) => pathFromSitemapUrl(e.url)));

const orphans: string[] = [];
for (const path of sitemapPaths) {
  if (path === "/") continue;
  if (pathMentionedInSource(path)) continue;
  orphans.push(path);
}

orphans.sort();

console.log(
  JSON.stringify(
    {
      scannedFiles: files.length,
      sitemapPathCount: sitemapPaths.size,
      orphanCandidatesHeuristic: orphans,
    },
    null,
    2,
  ),
);
