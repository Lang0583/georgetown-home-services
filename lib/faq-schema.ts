import type { Faq } from "./site-content";

/** Alternative shape for FAQSchema `questions` prop. */
export type FaqQuestion = { question: string; answer: string };

export type FaqItem = Faq | FaqQuestion;

function normalizeFaq(f: FaqItem): Faq {
  return "q" in f ? f : { q: f.question, a: f.answer };
}

/** FAQPage JSON-LD aligned with Google’s FAQ rich results guidance. */
export function buildFaqPageJsonLd(opts: {
  /** Absolute canonical URL for the page (faq mainEntityOfPage). */
  pageUrl: string;
  /** Short name for the FAQ entity, e.g. "Plumbing in Georgetown TX — FAQ". */
  name: string;
  faqs: FaqItem[];
}): Record<string, unknown> | null {
  if (!opts.faqs.length) return null;
  const faqs = opts.faqs.map(normalizeFaq);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    mainEntityOfPage: opts.pageUrl,
    name: opts.name,
  };
}
