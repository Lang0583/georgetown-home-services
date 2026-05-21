/**
 * Rewrite H1, meta description (≤155 chars), and first ~200 words via Anthropic Claude.
 *
 * Env: ANTHROPIC_API_KEY (required)
 *      ANTHROPIC_MODEL optional — defaults to claude-sonnet-4-20250514
 */
import Anthropic from "@anthropic-ai/sdk";

const DEFAULT_MODEL = "claude-sonnet-4-20250514";

export type PageContentInput = {
  url: string;
  h1: string;
  metaDescription: string;
  /** Roughly first 200 words of visible body — plain text */
  firstWords: string;
};

export type RewriteResult = {
  h1: string;
  metaDescription: string;
  firstWords: string;
};

const SYSTEM = `You are an SEO expert writing for Georgetown TX homeowners. Rewrite content to be locally specific, include realistic price ranges, and have a clear CTA. Never use filler phrases like "look no further."`;

function extractJson(text: string): RewriteResult | null {
  const trimmed = text.trim();
  try {
    const obj = JSON.parse(trimmed) as Record<string, unknown>;
    const h1 = typeof obj.h1 === "string" ? obj.h1.trim() : "";
    let metaDescription = typeof obj.metaDescription === "string" ? obj.metaDescription.trim() : "";
    const firstWords = typeof obj.firstWords === "string" ? obj.firstWords.trim() : "";
    if (!h1 || !metaDescription || !firstWords) return null;
    if (metaDescription.length > 155) metaDescription = metaDescription.slice(0, 155).trim();
    return { h1, metaDescription, firstWords };
  } catch {
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const inner = fenced?.[1]?.trim();
    if (inner) {
      try {
        return extractJson(inner);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export async function rewritePageContent(content: PageContentInput): Promise<RewriteResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) throw new Error("[agent/rewriter] ANTHROPIC_API_KEY is required.");

  const model = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL;
  const client = new Anthropic({ apiKey });

  const user = `
Page URL: ${content.url}

Current H1:
${content.h1}

Current meta description:
${content.metaDescription}

First ~200 words of body (rewrite this opening in the same factual register; keep specificity for Georgetown/Williamson County where relevant):
${content.firstWords}

Return ONLY valid JSON (no prose before or after) with exactly these keys:
{
  "h1": "...",
  "metaDescription": "max 155 characters",
  "firstWords": "rewritten opening, comparable length (~150-220 words), plain text, no markdown"
}`;

  const response = await client.messages.create({
    model,
    max_tokens: 2048,
    system: SYSTEM,
    messages: [{ role: "user", content: user }],
  });

  const blocks = response.content;
  let textOut = "";
  for (const b of blocks) {
    if (b.type === "text") textOut += b.text;
  }

  const parsed = extractJson(textOut);
  if (!parsed) {
    throw new Error(`[agent/rewriter] Could not parse Claude JSON response: ${textOut.slice(0, 400)}…`);
  }
  return parsed;
}
