import type { Faq } from "./site-content";

/** `/best` index — single source for visible FAQ and FAQPage JSON-LD. */
export const BEST_INDEX_FAQS: Faq[] = [
  {
    q: "How should I use these guides?",
    a: "Start with the category you need, shortlist providers, then request written scopes you can compare line-by-line.",
  },
  {
    q: "Do you include every company?",
    a: "No. The goal is a practical shortlist based on publicly available business information. Confirm licensing, insurance, and availability.",
  },
  {
    q: "What if I'm not sure what I need?",
    a: "Start on the Services hub for symptom-based pages, then return here to compare providers for that category.",
  },
];

/** `/services` index — single source for visible FAQ and FAQPage JSON-LD. */
export const SERVICES_INDEX_FAQS: Faq[] = [
  {
    q: "Is this a service company?",
    a: "This site is a local research hub. Use the service pages and best-of guides to compare providers and decide who to contact. Always confirm licensing, pricing, and availability directly with any company before hiring.",
  },
  {
    q: "What should I do if the problem is urgent?",
    a: "If there is active water damage, no cooling in extreme heat, or a roof leak during storms, start with the relevant problem-based service page and then contact a provider from the best-of guide.",
  },
  {
    q: "Do you cover neighborhoods like Sun City or Wolf Ranch?",
    a: "Yes. We publish neighborhood and location pages to help Georgetown homeowners find the right service category and next steps.",
  },
];

/** `/blog` index — single source for visible FAQ and FAQPage JSON-LD. */
export const BLOG_INDEX_FAQS: Faq[] = [
  {
    q: "Are these guides unbiased?",
    a: "These articles are written for Georgetown homeowners and focus on clear decision-making. Always confirm licensing, insurance, pricing, and availability directly with any provider before hiring.",
  },
  {
    q: "Do you schedule appointments?",
    a: "No. This site is a directory and homeowner guide. You choose who to contact and what to schedule directly with the provider.",
  },
  {
    q: "Where should I start?",
    a: "Budgeting: start with cost guides. Urgent problems: start with repair/emergency posts, then review the related service pages and best-of comparisons.",
  },
];
