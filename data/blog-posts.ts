/**
 * Metadata for the 24-post Georgetown blog expansion (high-intent homeowner searches).
 * Full article HTML lives in `lib/generatedPages.json`; routing entries in `data/site-content.json`.
 */

export type BlogExpansionCategory =
  | "plumbing"
  | "hvac"
  | "roofing"
  | "electrical"
  | "landscaping"
  | "pest-control"
  | "foundation"
  | "cleaning";

export type BlogIndexSection = "costs" | "repair" | "maintenance" | "emergency" | "hiring";

export type BlogPostMeta = {
  slug: string;
  /** Visible H1 / card title */
  title: string;
  /** `<title>` tag — target 55–60 characters */
  metaTitle: string;
  /** Meta description — target 150–160 characters */
  description: string;
  category: BlogExpansionCategory;
  /** Blog index section on `/blog` */
  blogSection: BlogIndexSection;
  readTime: string;
  intent: string;
  serviceSlug: string;
  costGuideSlug: string;
  bestOfSlug: string;
  /** When set, public URL redirects here (no duplicate post). */
  canonicalSlug?: string;
  /** `pending` = metadata only until HTML is added in a follow-up pass */
  status: "live" | "pending";
};

export const BLOG_EXPANSION_POSTS: BlogPostMeta[] = [
  // —— PLUMBING ——
  {
    slug: "water-heater-not-working-georgetown-tx",
    title: "Water Heater Not Working in Georgetown TX? Here's What to Do",
    metaTitle: "Water Heater Not Working Georgetown TX? Fix Guide (2026)",
    description:
      "Georgetown TX water heater stopped working? Check pilot lights, breakers, and sediment first—then know when to call a plumber. Repair vs replace and local cost context.",
    category: "plumbing",
    blogSection: "repair",
    readTime: "7 min",
    intent: "troubleshooting",
    serviceSlug: "plumber-georgetown-tx",
    costGuideSlug: "water-heater-installation-cost-georgetown-tx",
    bestOfSlug: "best-plumbers-georgetown-tx",
    status: "live",
  },
  {
    slug: "slab-leak-signs-georgetown-tx",
    title: "Slab Leak Signs in Georgetown TX: What to Watch For",
    metaTitle: "Slab Leak Signs in Georgetown TX: When to Worry (2026)",
    description:
      "Do you have a slab leak in Georgetown TX? Hot spots, high water bills, and sound of running water are warning signs. What slab leaks mean on clay soil and when to call a plumber.",
    category: "plumbing",
    blogSection: "repair",
    readTime: "7 min",
    intent: "warning signs",
    serviceSlug: "plumber-georgetown-tx",
    costGuideSlug: "plumber-cost-georgetown-tx",
    bestOfSlug: "best-plumbers-georgetown-tx",
    status: "live",
  },
  {
    slug: "how-to-choose-plumber-georgetown-tx",
    title: "How to Choose a Plumber in Georgetown TX",
    metaTitle: "How to Choose a Plumber in Georgetown TX (2026 Guide)",
    description:
      "Hiring a plumber in Georgetown TX? Verify Texas licensing, insurance, written scopes, and red flags before you book. Checklist for slab homes, hard water, and storm-week scheduling.",
    category: "plumbing",
    blogSection: "hiring",
    readTime: "8 min",
    intent: "hiring",
    serviceSlug: "plumber-georgetown-tx",
    costGuideSlug: "plumber-cost-georgetown-tx",
    bestOfSlug: "best-plumbers-georgetown-tx",
    canonicalSlug: "how-to-choose-a-reliable-plumber-georgetown-tx",
    status: "live",
  },
  // —— HVAC ——
  {
    slug: "hvac-tune-up-worth-it-georgetown-tx",
    title: "Is an HVAC Tune-Up Worth It in Georgetown TX?",
    metaTitle: "Is an HVAC Tune-Up Worth It in Georgetown TX? (2026)",
    description:
      "Georgetown TX homeowners: is an HVAC tune-up worth the cost before summer? What maintenance includes, typical pricing, and when skipping service costs more long term.",
    category: "hvac",
    blogSection: "maintenance",
    readTime: "7 min",
    intent: "decision",
    serviceSlug: "hvac-georgetown-tx",
    costGuideSlug: "hvac-maintenance-cost-georgetown-tx",
    bestOfSlug: "top-hvac-companies-georgetown-tx",
    status: "pending",
  },
  {
    slug: "heat-pump-vs-ac-georgetown-tx",
    title: "Heat Pump vs AC for Georgetown TX Homes",
    metaTitle: "Heat Pump vs AC in Georgetown TX: Which Is Better? (2026)",
    description:
      "Heat pump vs traditional AC for Georgetown TX homes: efficiency, winter heating, upfront cost, and what Central Texas climate means for your replacement decision.",
    category: "hvac",
    blogSection: "repair",
    readTime: "8 min",
    intent: "comparison",
    serviceSlug: "hvac-georgetown-tx",
    costGuideSlug: "ac-installation-cost-georgetown-tx",
    bestOfSlug: "top-hvac-companies-georgetown-tx",
    status: "pending",
  },
  {
    slug: "hvac-not-heating-georgetown-tx",
    title: "HVAC Not Heating in Georgetown TX? Troubleshooting Guide",
    metaTitle: "HVAC Not Heating Georgetown TX? What to Check First (2026)",
    description:
      "HVAC won't heat in Georgetown TX winter? Thermostat settings, heat pump defrost, igniters, and filters—safe checks before you call for service and typical repair costs.",
    category: "hvac",
    blogSection: "repair",
    readTime: "7 min",
    intent: "troubleshooting",
    serviceSlug: "hvac-georgetown-tx",
    costGuideSlug: "hvac-repair-cost-georgetown-tx",
    bestOfSlug: "top-hvac-companies-georgetown-tx",
    status: "pending",
  },
  // —— ROOFING ——
  {
    slug: "how-to-find-roofer-georgetown-tx",
    title: "How to Find a Roofer in Georgetown TX",
    metaTitle: "How to Find a Roofer in Georgetown TX (2026 Checklist)",
    description:
      "How to find a roofer in Georgetown TX: verify insurance, compare written scopes, avoid storm chasers, and hire confidently after hail or when your roof is aging out.",
    category: "roofing",
    blogSection: "hiring",
    readTime: "8 min",
    intent: "hiring",
    serviceSlug: "roofer-georgetown-tx",
    costGuideSlug: "roof-repair-cost-georgetown-tx",
    bestOfSlug: "best-roofers-georgetown-tx",
    status: "pending",
  },
  {
    slug: "hail-damage-roof-claim-georgetown-tx",
    title: "Should You File an Insurance Claim for Hail Roof Damage in Georgetown TX?",
    metaTitle: "Hail Roof Damage Insurance Claim Georgetown TX (2026)",
    description:
      "Hail damage on your Georgetown TX roof—should you file an insurance claim? Documentation, deductibles, adjuster visits, and when a repair quote beats a full replacement push.",
    category: "roofing",
    blogSection: "emergency",
    readTime: "8 min",
    intent: "emergency/decision",
    serviceSlug: "roofer-georgetown-tx",
    costGuideSlug: "roof-repair-cost-georgetown-tx",
    bestOfSlug: "best-roofers-georgetown-tx",
    status: "pending",
  },
  {
    slug: "roof-inspection-cost-georgetown-tx",
    title: "Roof Inspection Cost in Georgetown TX",
    metaTitle: "Roof Inspection Cost Georgetown TX (2026 Price Ranges)",
    description:
      "How much does a roof inspection cost in Georgetown TX? Free vs paid inspections, what you get in writing, and when to pay for an independent report before a big repair.",
    category: "roofing",
    blogSection: "costs",
    readTime: "6 min",
    intent: "cost",
    serviceSlug: "roofer-georgetown-tx",
    costGuideSlug: "roof-repair-cost-georgetown-tx",
    bestOfSlug: "best-roofers-georgetown-tx",
    status: "pending",
  },
  // —— ELECTRICAL ——
  {
    slug: "panel-upgrade-cost-georgetown-tx",
    title: "Electrical Panel Upgrade Cost in Georgetown TX",
    metaTitle: "Panel Upgrade Cost Georgetown TX (2026) — Real Ranges",
    description:
      "Electrical panel upgrade cost in Georgetown TX: typical price ranges, what drives quotes higher, permits, and when a 100-amp service is no longer enough for modern loads.",
    category: "electrical",
    blogSection: "costs",
    readTime: "7 min",
    intent: "cost",
    serviceSlug: "electrician-georgetown-tx",
    costGuideSlug: "panel-upgrade-cost-georgetown-tx",
    bestOfSlug: "best-electricians-georgetown-tx",
    status: "pending",
  },
  {
    slug: "ev-charger-installation-cost-georgetown-tx",
    title: "EV Charger Installation Cost in Georgetown TX",
    metaTitle: "EV Charger Install Cost Georgetown TX (2026) — Home Guide",
    description:
      "Cost to install a home EV charger in Georgetown TX: Level 2 hardware, panel capacity, trenching, permits, and when you need an electrician before the charger arrives.",
    category: "electrical",
    blogSection: "costs",
    readTime: "7 min",
    intent: "cost",
    serviceSlug: "electrician-georgetown-tx",
    costGuideSlug: "electrician-cost-georgetown-tx",
    bestOfSlug: "best-electricians-georgetown-tx",
    status: "pending",
  },
  {
    slug: "signs-electrical-problems-georgetown-tx",
    title: "Warning Signs of Electrical Problems in Georgetown TX Homes",
    metaTitle: "Electrical Problem Warning Signs Georgetown TX (2026)",
    description:
      "Warning signs of electrical problems in Georgetown TX: flickering lights, warm outlets, burning smells, and tripping breakers—what is urgent and when to call a licensed electrician.",
    category: "electrical",
    blogSection: "repair",
    readTime: "7 min",
    intent: "warning signs",
    serviceSlug: "electrician-georgetown-tx",
    costGuideSlug: "electrician-cost-georgetown-tx",
    bestOfSlug: "best-electricians-georgetown-tx",
    status: "pending",
  },
  // —— LANDSCAPING ——
  {
    slug: "when-to-water-lawn-georgetown-tx",
    title: "When to Water Your Lawn in Georgetown TX (Summer Guide)",
    metaTitle: "When to Water Lawn Georgetown TX Summer Schedule (2026)",
    description:
      "When to water your lawn in Georgetown TX summer: best times of day, weekly inches, drought rules, and how clay soil in neighborhoods like Wolf Ranch changes your schedule.",
    category: "landscaping",
    blogSection: "maintenance",
    readTime: "6 min",
    intent: "maintenance",
    serviceSlug: "landscaping-georgetown-tx",
    costGuideSlug: "lawn-care-cost-georgetown-tx",
    bestOfSlug: "best-landscaping-companies-georgetown-tx",
    status: "pending",
  },
  {
    slug: "sod-installation-cost-georgetown-tx",
    title: "Sod Installation Cost in Georgetown TX",
    metaTitle: "Sod Installation Cost Georgetown TX (2026) — Per Sq Ft",
    description:
      "Sod installation cost in Georgetown TX: price per square foot, prep and irrigation needs, best grass types for Central Texas heat, and what quotes should include in writing.",
    category: "landscaping",
    blogSection: "costs",
    readTime: "7 min",
    intent: "cost",
    serviceSlug: "landscaping-georgetown-tx",
    costGuideSlug: "landscaping-cost-georgetown-tx",
    bestOfSlug: "best-landscaping-companies-georgetown-tx",
    status: "pending",
  },
  {
    slug: "irrigation-system-cost-georgetown-tx",
    title: "Irrigation System Cost in Georgetown TX",
    metaTitle: "Irrigation System Cost Georgetown TX (2026) — Install Guide",
    description:
      "How much does an irrigation system cost in Georgetown TX? New installs vs upgrades, zone counts, smart controllers, and typical pricing for Sun City and newer subdivisions.",
    category: "landscaping",
    blogSection: "costs",
    readTime: "7 min",
    intent: "cost",
    serviceSlug: "landscaping-georgetown-tx",
    costGuideSlug: "landscaping-cost-georgetown-tx",
    bestOfSlug: "best-landscaping-companies-georgetown-tx",
    status: "pending",
  },
  // —— PEST CONTROL ——
  {
    slug: "scorpion-control-georgetown-tx",
    title: "How to Get Rid of Scorpions in Georgetown TX",
    metaTitle: "Scorpion Control Georgetown TX: Removal & Prevention (2026)",
    description:
      "How to get rid of scorpions in Georgetown TX: where striped bark scorpions hide, sealing entry points, yard cleanup, and when professional pest control is worth it.",
    category: "pest-control",
    blogSection: "repair",
    readTime: "7 min",
    intent: "problem-specific",
    serviceSlug: "pest-control-georgetown-tx",
    costGuideSlug: "pest-control-cost-georgetown-tx",
    bestOfSlug: "best-pest-control-georgetown-tx",
    status: "pending",
  },
  {
    slug: "termite-signs-georgetown-tx",
    title: "Termite Warning Signs in Georgetown TX Homes",
    metaTitle: "Termite Signs Georgetown TX: Warning Signs to Act On (2026)",
    description:
      "Termite warning signs in Georgetown TX: mud tubes, hollow wood, swarmers, and door frames that stick. What to do before damage spreads in slab and pier-and-beam homes.",
    category: "pest-control",
    blogSection: "repair",
    readTime: "7 min",
    intent: "warning signs",
    serviceSlug: "pest-control-georgetown-tx",
    costGuideSlug: "termite-treatment-cost-georgetown-tx",
    bestOfSlug: "best-pest-control-georgetown-tx",
    status: "pending",
  },
  {
    slug: "best-pest-control-plan-georgetown-tx",
    title: "How to Choose the Best Pest Control Plan in Georgetown TX",
    metaTitle: "Best Pest Control Plan Georgetown TX: Compare Options (2026)",
    description:
      "Best pest control plan for Georgetown TX homes: quarterly vs monthly, what's included, contracts, and how to compare companies for scorpions, ants, and general perimeter service.",
    category: "pest-control",
    blogSection: "hiring",
    readTime: "7 min",
    intent: "hiring/comparison",
    serviceSlug: "pest-control-georgetown-tx",
    costGuideSlug: "pest-control-cost-georgetown-tx",
    bestOfSlug: "best-pest-control-georgetown-tx",
    status: "pending",
  },
  // —— FOUNDATION ——
  {
    slug: "foundation-crack-types-georgetown-tx",
    title: "Foundation Crack Types in Georgetown TX: Which Are Serious?",
    metaTitle: "Foundation Crack Types Georgetown TX: Serious vs OK (2026)",
    description:
      "Which foundation cracks are serious in Georgetown TX? Hairline vs stair-step, horizontal cracks, and clay soil movement—when to monitor and when to call a foundation specialist.",
    category: "foundation",
    blogSection: "repair",
    readTime: "7 min",
    intent: "warning signs",
    serviceSlug: "foundation-repair-georgetown-tx",
    costGuideSlug: "foundation-repair-cost-georgetown-tx",
    bestOfSlug: "best-foundation-repair-georgetown-tx",
    status: "pending",
  },
  {
    slug: "pier-vs-slab-foundation-georgetown-tx",
    title: "Pier and Beam vs Slab Foundation in Georgetown TX",
    metaTitle: "Pier vs Slab Foundation Georgetown TX: Pros & Cons (2026)",
    description:
      "Pier and beam vs slab foundation in Georgetown TX: how each behaves on expansive clay, common repair approaches, and what buyers should know in Teravista and older neighborhoods.",
    category: "foundation",
    blogSection: "repair",
    readTime: "8 min",
    intent: "educational",
    serviceSlug: "foundation-repair-georgetown-tx",
    costGuideSlug: "foundation-repair-cost-georgetown-tx",
    bestOfSlug: "best-foundation-repair-georgetown-tx",
    status: "pending",
  },
  {
    slug: "foundation-watering-guide-georgetown-tx",
    title: "How to Water Your Foundation in Georgetown TX (Summer Guide)",
    metaTitle: "Foundation Watering Guide Georgetown TX Summer (2026)",
    description:
      "How to water your foundation in Georgetown TX summer: soaker hoses, moisture zones, drought vs over-watering, and preventing slab movement in Berry Creek and similar clay-soil areas.",
    category: "foundation",
    blogSection: "maintenance",
    readTime: "7 min",
    intent: "maintenance",
    serviceSlug: "foundation-repair-georgetown-tx",
    costGuideSlug: "foundation-repair-cost-georgetown-tx",
    bestOfSlug: "best-foundation-repair-georgetown-tx",
    status: "pending",
  },
  // —— CLEANING ——
  {
    slug: "how-often-deep-clean-home-georgetown-tx",
    title: "How Often Should You Deep Clean Your Home in Georgetown TX?",
    metaTitle: "How Often to Deep Clean Home Georgetown TX (2026 Guide)",
    description:
      "How often to deep clean your Georgetown TX home: room-by-room cadence, pets and pollen, move-in timing, and when a professional deep clean beats DIY in busy households.",
    category: "cleaning",
    blogSection: "maintenance",
    readTime: "6 min",
    intent: "maintenance",
    serviceSlug: "house-cleaning-georgetown-tx",
    costGuideSlug: "house-cleaning-cost-georgetown-tx",
    bestOfSlug: "best-house-cleaning-services-georgetown-tx",
    status: "pending",
  },
  {
    slug: "move-out-cleaning-cost-georgetown-tx",
    title: "Move-Out Cleaning Cost in Georgetown TX",
    metaTitle: "Move-Out Cleaning Cost Georgetown TX (2026) — Price Guide",
    description:
      "Move-out cleaning cost in Georgetown TX: typical ranges by home size, what landlords expect, add-ons like ovens and garages, and how to compare quotes before lease end.",
    category: "cleaning",
    blogSection: "costs",
    readTime: "6 min",
    intent: "cost",
    serviceSlug: "house-cleaning-georgetown-tx",
    costGuideSlug: "house-cleaning-cost-georgetown-tx",
    bestOfSlug: "best-house-cleaning-services-georgetown-tx",
    status: "pending",
  },
  {
    slug: "recurring-cleaning-service-worth-it-georgetown-tx",
    title: "Is Recurring House Cleaning Worth It in Georgetown TX?",
    metaTitle: "Recurring Cleaning Service Worth It Georgetown TX? (2026)",
    description:
      "Is recurring house cleaning worth it in Georgetown TX? Bi-weekly vs monthly pricing, time saved, and how Sun City retirees and busy Wolf Ranch families use cleaning plans differently.",
    category: "cleaning",
    blogSection: "maintenance",
    readTime: "7 min",
    intent: "decision",
    serviceSlug: "house-cleaning-georgetown-tx",
    costGuideSlug: "house-cleaning-cost-georgetown-tx",
    bestOfSlug: "best-house-cleaning-services-georgetown-tx",
    status: "pending",
  },
];

export function getBlogExpansionPost(slug: string): BlogPostMeta | null {
  return BLOG_EXPANSION_POSTS.find((p) => p.slug === slug || p.canonicalSlug === slug) ?? null;
}

export function isBlogExpansionSlug(slug: string): boolean {
  return BLOG_EXPANSION_POSTS.some(
    (p) => p.status === "live" && (p.slug === slug || p.canonicalSlug === slug),
  );
}

export const BLOG_EXPANSION_LIVE_SLUGS = BLOG_EXPANSION_POSTS.filter((p) => p.status === "live").flatMap((p) =>
  p.canonicalSlug ? [p.slug, p.canonicalSlug] : [p.slug],
);
