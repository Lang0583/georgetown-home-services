import type { ContentBlock } from "./site-content";
import { CORE_SERVICE_SLUGS } from "./pageContentRegistry";

/** Mirrors `sanitizeArticleHtml` in `GeneratedArticleBody` so extraction matches rendered HTML. */
export function sanitizeArticleHtmlForExtract(html: string): string {
  let out = html;
  out = out.replace(/<p><strong>CTA:<\/strong>[\s\S]*?<\/p>/gi, "");
  out = out.replace(/<h2>[^<]*form[^<]*<\/h2>[\s\S]*?(?=<h2>|$)/gi, "");
  out = out.replace(/<h3>[^<]*form[^<]*<\/h3>[\s\S]*?(?=<h2>|<h3>|$)/gi, "");
  out = out.replace(/<p>[^<]*(submit the form|request service options|free quotes)[^<]*<\/p>/gi, "");
  out = out.replace(/\n{3,}/g, "\n\n").trim();
  return out;
}

function stripTags(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Question-style headings: words the user called out (case-insensitive). */
const QUESTION_START = /^(what|how|why|when|is|can|should|does)\b/i;

export function isQuestionStyleHeading(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  return QUESTION_START.test(t);
}

function answerFromUlInner(ulInner: string): string {
  const lis = [...ulInner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return lis
    .map((m) => stripTags(m[1] ?? ""))
    .filter(Boolean)
    .join(" ");
}

/**
 * Next block after an h2/h3 in `content`: use first `p`, or join `ul` items if the first
 * block is a list (matches many service templates where a list follows a question heading).
 */
function nextBlockAnswer(blocks: ContentBlock[], startIdx: number): string | null {
  const next = blocks[startIdx + 1];
  if (!next) return null;
  if (next.kind === "p") {
    if ("parts" in next && next.parts?.length) {
      const joined = next.parts.map((p) => (p.type === "text" ? p.text : p.label)).join("");
      return joined.trim() || null;
    }
    if ("text" in next && typeof next.text === "string") return next.text.trim() || null;
  }
  if (next.kind === "ul" && next.items?.length) {
    return next.items.map((x) => x.trim()).filter(Boolean).join(" ") || null;
  }
  return null;
}

export function extractHeadingFaqsFromContentBlocks(blocks: ContentBlock[]): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.kind !== "h2" && b.kind !== "h3") continue;
    const heading = b.text.trim();
    if (!isQuestionStyleHeading(heading)) continue;
    const a = nextBlockAnswer(blocks, i);
    if (!a || a.length < 12) continue;
    out.push({ q: heading, a });
  }
  return out;
}

export function extractHeadingFaqsFromArticleHtml(html: string): { q: string; a: string }[] {
  const sanitized = sanitizeArticleHtmlForExtract(html);
  const out: { q: string; a: string }[] = [];
  const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const matches: RegExpExecArray[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(sanitized)) !== null) {
    matches.push(m);
  }
  for (let i = 0; i < matches.length; i++) {
    const headingText = stripTags(matches[i]![2] ?? "");
    if (!isQuestionStyleHeading(headingText)) continue;
    const start = matches[i]!.index! + matches[i]![0].length;
    const end = i + 1 < matches.length ? matches[i + 1]!.index! : sanitized.length;
    const segment = sanitized.slice(start, end);
    const pMatch = segment.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    const ulMatch = segment.match(/<ul\b[^>]*>([\s\S]*?)<\/ul>/i);
    let answer = "";
    if (pMatch && ulMatch) {
      answer = pMatch.index! <= ulMatch.index! ? stripTags(pMatch[1]!) : answerFromUlInner(ulMatch[1]!);
    } else if (pMatch) {
      answer = stripTags(pMatch[1]!);
    } else if (ulMatch) {
      answer = answerFromUlInner(ulMatch[1]!);
    }
    if (answer.length < 12) continue;
    out.push({ q: headingText, a: answer });
  }
  return out;
}

const coreSet = new Set<string>(CORE_SERVICE_SLUGS);

/**
 * Heading-based FAQ pairs for the **visible** main article. Core hub pages use hardcoded JSX
 * (not `articleHtml`); do not use generated HTML for those slugs or answers would not match the UI.
 */
export function extractServiceHeadingFaqs(args: {
  slug: string;
  articleHtml: string | null;
  contentBlocks: ContentBlock[];
}): { q: string; a: string }[] {
  if (coreSet.has(args.slug)) return [];
  if (args.articleHtml && args.articleHtml.trim().length > 0) {
    return extractHeadingFaqsFromArticleHtml(args.articleHtml);
  }
  return extractHeadingFaqsFromContentBlocks(args.contentBlocks);
}

export function buildServiceFaqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
