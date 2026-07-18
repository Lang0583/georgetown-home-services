import type { Faq } from "./site-content";

const MIN_FAQ_SCHEMA_COUNT = 3;

function normQuestion(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Sitewide boilerplate — not eligible for FAQ rich-result schema. */
const BOILERPLATE_QUESTION_PATTERNS: RegExp[] = [
  /georgetown home services/i,
  /do you schedule/i,
  /this site is a directory/i,
  /is this a service company/i,
  /are these recommendations unbiased/i,
  /do you schedule service appointments/i,
  /how should i use these best-of guides/i,
  /where should i start if i/i,
  /where should i start\?/i,
];

export function isBoilerplateFaq(faq: Faq): boolean {
  const q = faq.q.trim();
  return BOILERPLATE_QUESTION_PATTERNS.some((re) => re.test(q));
}

/** FAQs that qualify for FAQPage JSON-LD (unique, non-boilerplate). */
export function faqsForFaqPageSchema(faqs: Faq[]): Faq[] {
  const seen = new Set<string>();
  const out: Faq[] = [];
  for (const f of faqs) {
    if (isBoilerplateFaq(f)) continue;
    const key = normQuestion(f.q);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

export function shouldEmitFaqPageSchema(faqs: Faq[]): boolean {
  return faqsForFaqPageSchema(faqs).length >= MIN_FAQ_SCHEMA_COUNT;
}

/**
 * FAQPage JSON-LD aligned with Google’s FAQ rich results guidance.
 * Prefer {@link buildFAQPage} from `lib/schema.ts` for new call sites.
 */
export function buildFaqPageJsonLd(opts: {
  /** Absolute canonical URL for the page (faq mainEntityOfPage). */
  pageUrl: string;
  /** Short name for the FAQ entity, e.g. "Plumbing in Georgetown TX — FAQ". */
  name: string;
  faqs: Faq[];
}): Record<string, unknown> | null {
  const eligible = faqsForFaqPageSchema(opts.faqs);
  if (eligible.length < MIN_FAQ_SCHEMA_COUNT) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eligible.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    mainEntityOfPage: opts.pageUrl,
    name: opts.name,
  };
}
