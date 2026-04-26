/**
 * Extract FAQ Q/A pairs from generated article HTML so blog pages can emit
 * FAQPage JSON-LD without a second content source.
 *
 * Detection rules:
 *  - `<h3>` whose text ends with `?` is treated as a Question.
 *  - The immediately following `<p>…</p>` (ignoring whitespace) is the Answer.
 *  - Answers shorter than 20 chars or longer than 600 chars are discarded as
 *    structured-data risk (Google's rich-result guidelines require a real
 *    answer; excessively long answers hurt snippet eligibility).
 *
 * We intentionally do NOT look for `<h2>FAQ</h2>` headers — not every post
 * uses that convention, and `?`-terminated H3s in this codebase consistently
 * represent real FAQ questions after a quick audit of generatedPages.json.
 *
 * Returns at most `limit` pairs (default 5 — Google renders up to 3 in
 * SERPs but submitting more gives flexibility).
 */
export type FaqPair = { question: string; answer: string };

const H3_BLOCK = /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi;
// What's immediately after `</h3>`: optional whitespace, optional wrapper,
// then the first `<p>…</p>`. If something else appears (e.g. `<ul>`, another
// `<h3>`), we skip this H3 as a non-FAQ heading.
const IMMEDIATE_P_AFTER_H3 =
  /^\s*(?:<(?:div|section)\b[^>]*>\s*)?<p\b[^>]*>([\s\S]*?)<\/p>/;

function stripTags(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaqPairs(html: string, limit = 5): FaqPair[] {
  if (!html) return [];
  const pairs: FaqPair[] = [];
  H3_BLOCK.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = H3_BLOCK.exec(html)) !== null) {
    const q = stripTags(match[1]);
    if (!q.endsWith("?")) continue;
    const after = html.slice(H3_BLOCK.lastIndex);
    const pMatch = after.match(IMMEDIATE_P_AFTER_H3);
    if (!pMatch) continue;
    const a = stripTags(pMatch[1]);
    if (a.length < 20 || a.length > 600) continue;
    pairs.push({ question: q, answer: a });
    if (pairs.length >= limit) break;
  }
  return pairs;
}

export function faqPageJsonLd(pairs: FaqPair[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.answer,
      },
    })),
  };
}
