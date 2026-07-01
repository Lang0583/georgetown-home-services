import type { Faq } from "./site-content";
import { validateFaqPageSchema } from "./structured-data-validate";

/** FAQPage JSON-LD aligned with Google’s FAQ rich results guidance. */
export function buildFaqPageJsonLd(opts: {
  /** Absolute canonical URL for the page (faq mainEntityOfPage). */
  pageUrl: string;
  /** Short name for the FAQ entity, e.g. "Plumbing in Georgetown TX — FAQ". */
  name: string;
  faqs: Faq[];
}): Record<string, unknown> | null {
  if (!opts.faqs.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: opts.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    mainEntityOfPage: opts.pageUrl,
    name: opts.name,
  };
  validateFaqPageSchema(data);
  return data;
}
