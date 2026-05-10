import JsonLd from "./JsonLd";
import type { Faq } from "../lib/site-content";
import { buildFaqPageJsonLd } from "../lib/faq-schema";

export type FAQSchemaProps = {
  /** Absolute canonical URL (e.g. from `absolutePageUrl(pathname)`). */
  pageUrl: string;
  /** FAQ entity name for structured data (e.g. `"HVAC in Georgetown — FAQ"`). */
  name: string;
  faqs: Faq[];
};

/**
 * Emits FAQPage JSON-LD for eligible FAQ rich results. Pair with `<FAQList />` for visible markup.
 */
export default function FAQSchema({ pageUrl, name, faqs }: FAQSchemaProps) {
  const data = buildFaqPageJsonLd({ pageUrl, name, faqs });
  if (!data) return null;
  return <JsonLd data={data} />;
}
