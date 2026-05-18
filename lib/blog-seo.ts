import type { BlogPage } from "./site-content";
import { clipMetaDescription } from "./seo-meta";
import { PRICING_YEAR } from "./pricing-data";

function firstSentence(text: string): string {
  const masked = text
    .replace(/\bU\.S\./g, "__US__")
    .replace(/\bSt\./g, "__ST__")
    .replace(/\be\.g\./gi, "__EG__");
  const first = masked.split(/\.\s+/)[0]?.trim() ?? masked.trim();
  return first
    .replaceAll("__US__", "U.S.")
    .replaceAll("__ST__", "St.")
    .replaceAll("__EG__", "e.g.")
    .replace(/[.!?…]+$/, "");
}

/** Strip geographic/year suffixes so the curiosity hook reads cleanly. */
export function extractBlogTopicPhrase(title: string): string {
  let t = title.trim();
  t = t.replace(/\s*\|\s*.+$/i, "").trim();
  t = t.replace(/\s*\([^)]*\)\s*$/g, "").trim();
  t = t.replace(/\s+in\s+Georgetown,?\s*TX\s*$/i, "").trim();
  t = t.replace(/\s+Georgetown,?\s*TX\s*$/i, "").trim();
  t = t.replace(/\s*\(?\d{4}\)?(?:\s*Guide)?\s*$/i, "").trim();
  t = t.replace(/\s*—\s*.+$/, "").trim();
  if (t.length > 55) {
    const cut = t.slice(0, 52);
    const i = cut.lastIndexOf(" ");
    t = `${(i > 28 ? cut.slice(0, i) : cut).trim()}…`;
  }
  return t;
}

/**
 * Blog `<title>` (absolute) + meta description (≤155) per editorial guidelines.
 */
export function buildBlogPostMeta(post: BlogPage): { absoluteTitle: string; description: string } {
  const topic = extractBlogTopicPhrase(post.title);
  const absoluteTitle = `${topic}: What Georgetown TX Homeowners Need to Know in ${PRICING_YEAR}`;
  const core = firstSentence(post.description);
  const lead = /[.!?]$/.test(core) ? core : `${core}.`;
  const description = clipMetaDescription(
    `${lead} Vetted Georgetown & Williamson pros. Get 3 free quotes in minutes—no obligation.`,
  );
  return { absoluteTitle, description };
}
