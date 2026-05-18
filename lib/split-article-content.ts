import type { ContentBlock } from "./site-content";

/**
 * Split HTML after the Nth closing `</p>` so a mid-article CTA can be inserted.
 * If there are fewer than N paragraphs, `after` is empty (caller should still show CTA after `before`).
 */
export function splitHtmlAfterNthParagraph(html: string, n: number): { before: string; after: string } {
  if (n <= 0) return { before: html, after: "" };
  const re = /<\/p>/gi;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    count++;
    if (count === n) {
      const pos = match.index + match[0].length;
      return { before: html.slice(0, pos), after: html.slice(pos) };
    }
  }
  return { before: html, after: "" };
}

const PRICING_H2_RE = /\b(pricing|price|prices|cost|costs|expectations|estimate|estimates|quotes?|fees?|rates?|budget)\b/i;

/** Split before the first `<h2>` whose text looks like a pricing / cost section (else after 1st paragraph). */
export function splitHtmlBeforeFirstPricingSection(html: string): { before: string; after: string } {
  const h2re = /<h2\b[^>]*>[\s\S]*?<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = h2re.exec(html)) !== null) {
    const innerText = m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!PRICING_H2_RE.test(innerText)) continue;
    const start = m.index;
    if (start === 0) continue;
    return { before: html.slice(0, start).trimEnd(), after: html.slice(start).trimStart() };
  }
  return splitHtmlAfterNthParagraph(html, 1);
}

/**
 * Split block list after the Nth paragraph block (`kind === "p"`).
 */
export function splitBlocksAfterNthParagraph(blocks: ContentBlock[], n: number): { first: ContentBlock[]; second: ContentBlock[] } {
  if (n <= 0) return { first: [], second: blocks };
  let pCount = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].kind === "p") {
      pCount++;
      if (pCount === n) {
        return { first: blocks.slice(0, i + 1), second: blocks.slice(i + 1) };
      }
    }
  }
  return { first: [...blocks], second: [] };
}

/**
 * Split HTML after each closing `</p>` so multiple mid-article inserts (ads, CTAs) can be interleaved.
 * Trailing markup after the final `</p>` (if any) is returned as its own segment.
 */
export function splitHtmlAtParagraphBoundaries(html: string): string[] {
  if (!html.trim()) return [];
  const re = /<\/p>/gi;
  const parts: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    parts.push(html.slice(last, m.index + m[0].length));
    last = m.index + m[0].length;
  }
  if (last < html.length) {
    parts.push(html.slice(last));
  }
  return parts.length ? parts : [html];
}
