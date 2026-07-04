import type { Faq } from "./site-content";

/** Homepage FAQ copy — single source for visible FAQ section and FAQPage JSON-LD. */
export const HOME_PAGE_FAQS: Faq[] = [
  {
    q: "What home services are available in Georgetown, TX?",
    a: "Georgetown has active local providers for plumbing, HVAC, roofing, electrical, landscaping, pest control, foundation repair, and house cleaning. Georgetown Home Services maintains a directory of top-rated local companies for each category.",
  },
  {
    q: "How do I find a reliable home service company in Georgetown, TX?",
    a: "Start by checking reviews on Google and comparing at least 3 companies. Look for businesses with consistent ratings above 4.5 stars, verified licenses, and written estimates. Georgetown Home Services lists providers compiled from public business data across all major home service categories.",
  },
  {
    q: "How much does it cost to hire a plumber in Georgetown, TX?",
    a: "Most plumbing jobs in Georgetown range from $150 to $500 for common repairs. Emergency calls and larger jobs like slab leak repair can run $1,000 or more. See our plumbing cost guides for detailed breakdowns.",
  },
  {
    q: "Is Georgetown, TX a good area for foundation issues?",
    a: "Yes - Central Texas clay soil expands and contracts with moisture, making foundation movement common in Georgetown. Hairline cracks are often cosmetic, but horizontal or stair-step cracks warrant a professional inspection.",
  },
  {
    q: "How do I know if I need a new HVAC system in Georgetown?",
    a: "Key signs include a system older than 15 years, frequent repairs, uneven cooling, or energy bills rising without explanation. Georgetown summers regularly exceed 100 degrees, making a functioning HVAC essential.",
  },
];

export function homeFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_PAGE_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
