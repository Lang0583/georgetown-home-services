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
