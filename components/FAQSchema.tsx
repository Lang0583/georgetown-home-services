import JsonLd from "./JsonLd";
import type { Faq } from "../lib/site-content";
import { buildFAQPage } from "../lib/schema";

export type FAQSchemaProps = {
  /** Absolute canonical URL (e.g. from `absolutePageUrl(pathname)`). */
  pageUrl: string;
  /** FAQ entity name for structured data (e.g. `"HVAC in Georgetown — FAQ"`). */
  name: string;
  faqs: Faq[];
};

/**
 * Emits FAQPage JSON-LD for eligible FAQ rich results. Pair with visible FAQ markup.
 */
export default function FAQSchema({ pageUrl, name, faqs }: FAQSchemaProps) {
  const data = buildFAQPage(faqs, { pageUrl, name });
  if (!data) return null;
  return <JsonLd data={data} />;
}
