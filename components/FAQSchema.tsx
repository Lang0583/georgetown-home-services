import JsonLd from "./JsonLd";
import type { Faq } from "../lib/site-content";
import { buildFaqPageJsonLd, type FaqItem, type FaqQuestion } from "../lib/faq-schema";

export type FAQSchemaProps = {
  /** Absolute canonical URL (e.g. from `absolutePageUrl(pathname)`). */
  pageUrl: string;
  /** FAQ entity name for structured data (e.g. `"HVAC in Georgetown — FAQ"`). */
  name: string;
  /**
   * FAQ entries: site-content shape `{ q, a }` or `{ question, answer }`.
   * Merged with `faqs` when both are passed (dedupe at content level, not here).
   */
  questions?: FaqItem[];
  /** @alias {@link FAQSchemaProps.questions} — preferred prop name is `questions`. */
  faqs?: Faq[];
};

export type { FaqItem, FaqQuestion };

/**
 * Reusable FAQPage JSON-LD (`@type`: FAQPage).
 * Primary prop: **`questions`** — array of `{ question, answer }` or site **`{ q, a }`** (`Faq`).
 * Pair with `<FAQList />` (or your own markup) so visible FAQs match this block.
 */
export default function FAQSchema({ pageUrl, name, questions = [], faqs = [] }: FAQSchemaProps) {
  const merged: FaqItem[] = [...questions, ...faqs];
  const data = buildFaqPageJsonLd({ pageUrl, name, faqs: merged });
  if (!data) return null;
  return <JsonLd data={data} />;
}
