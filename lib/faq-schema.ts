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
  // Drop any entry with a missing/blank question or answer so Google never
  // sees a `Question` with an empty `acceptedAnswer.text`. Trim whitespace
  // before length-checking so " " is treated as empty.
  const faqs = opts.faqs
    .map(normalizeFaq)
    .map((f) => ({ q: (f.q ?? "").trim(), a: (f.a ?? "").trim() }))
    .filter((f) => f.q.length > 0 && f.a.length > 0);
  if (!faqs.length) return null;
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
