/**
 * One-shot generator for data/sub-services.ts — run: node scripts/generate-sub-services-data.mjs
 */
import fs from "node:fs";
import path from "node:path";

const NEIGHBORHOODS = {
  "sun-city": "Sun City",
  teravista: "Teravista",
  "wolf-ranch": "Wolf Ranch",
  "berry-creek": "Berry Creek",
  "georgetown-village": "Georgetown Village",
};

const SERVICE_CONFIG = {
  plumbing: {
    label: "Plumbing",
    parentHubPath: "/services/plumbing",
    angiCategorySlug: "plumbing",
    neighborhoodServiceSlug: "plumber",
    thumbtackCategory: "plumbers",
    extended: false,
    defaultHoods: ["sun-city", "teravista"],
  },
  hvac: {
    label: "HVAC",
    parentHubPath: "/services/hvac",
    angiCategorySlug: "hvac",
    neighborhoodServiceSlug: "hvac",
    thumbtackCategory: "hvac-contractors",
    extended: false,
    defaultHoods: ["sun-city", "wolf-ranch"],
  },
  roofing: {
    label: "Roofing",
    parentHubPath: "/services/roofing",
    angiCategorySlug: "roofing",
    neighborhoodServiceSlug: "roofer",
    thumbtackCategory: "roofers",
    extended: false,
    defaultHoods: ["sun-city", "wolf-ranch"],
  },
  electrical: {
    label: "Electrical",
    parentHubPath: "/services/electrical",
    angiCategorySlug: "electrical",
    neighborhoodServiceSlug: "electrician",
    thumbtackCategory: "electricians",
    extended: true,
    defaultHoods: ["teravista", "wolf-ranch"],
  },
  landscaping: {
    label: "Landscaping",
    parentHubPath: "/services/landscaping",
    angiCategorySlug: "landscaping",
    neighborhoodServiceSlug: "landscaping",
    thumbtackCategory: "landscapers",
    extended: true,
    defaultHoods: ["berry-creek", "georgetown-village"],
  },
  "pest-control": {
    label: "Pest Control",
    parentHubPath: "/services/pest-control",
    angiCategorySlug: "pest-control",
    neighborhoodServiceSlug: "pest-control",
    thumbtackCategory: "pest-control",
    extended: true,
    defaultHoods: ["berry-creek", "georgetown-village"],
  },
  foundation: {
    label: "Foundation",
    parentHubPath: "/services/foundation",
    angiCategorySlug: "foundation-repair",
    neighborhoodServiceSlug: "foundation-repair",
    thumbtackCategory: "foundation-repair",
    extended: true,
    defaultHoods: ["wolf-ranch", "teravista"],
  },
  cleaning: {
    label: "Cleaning",
    parentHubPath: "/services/house-cleaning",
    angiCategorySlug: "house-cleaning",
    neighborhoodServiceSlug: "house-cleaning",
    thumbtackCategory: "house-cleaning",
    extended: true,
    defaultHoods: ["sun-city", "georgetown-village"],
  },
};

const SLUGS = {
  plumbing: [
    "drain-cleaning",
    "water-heater-installation",
    "pipe-repair",
    "leak-detection",
    "sewer-line-repair",
    "toilet-installation",
    "emergency-plumber",
    "water-filtration",
  ],
  hvac: [
    "ac-repair",
    "ac-installation",
    "furnace-repair",
    "heat-pump-installation",
    "air-duct-cleaning",
    "emergency-hvac",
    "hvac-maintenance",
    "mini-split-installation",
  ],
  roofing: [
    "roof-repair",
    "roof-replacement",
    "hail-damage-repair",
    "gutter-installation",
    "emergency-roof-repair",
    "metal-roofing",
    "flat-roofing",
    "roof-inspection",
  ],
  electrical: [
    "panel-upgrade",
    "outlet-installation",
    "ev-charger-installation",
    "ceiling-fan-installation",
    "generator-installation",
    "emergency-electrician",
    "whole-home-rewiring",
    "lighting-installation",
  ],
  landscaping: [
    "lawn-mowing",
    "sprinkler-installation",
    "tree-trimming",
    "sod-installation",
    "landscape-design",
    "irrigation-repair",
    "mulching",
    "seasonal-cleanup",
  ],
  "pest-control": [
    "termite-treatment",
    "mosquito-control",
    "rodent-control",
    "bed-bug-treatment",
    "scorpion-control",
    "ant-control",
    "cockroach-control",
    "wasp-removal",
  ],
  foundation: [
    "foundation-repair",
    "pier-and-beam-repair",
    "crack-repair",
    "drainage-correction",
    "slab-leak-repair",
    "foundation-inspection",
    "waterproofing",
    "soil-stabilization",
  ],
  cleaning: [
    "house-cleaning",
    "deep-cleaning",
    "move-in-move-out-cleaning",
    "post-construction-cleaning",
    "recurring-cleaning",
    "carpet-cleaning",
    "window-cleaning",
    "pressure-washing",
  ],
};

/** @type {Record<string, { name: string; pricing: object; local: string; hoods?: string[]; faq1: string; faq1a: string; faq2: string; faq2a: string; faq3: string; faq3a: string }>} */
const PAGE = {
  "plumbing/drain-cleaning": {
    name: "Drain Cleaning",
    pricing: { low: 125, average: 225, high: 450, unit: "per visit", year: "2026" },
    local:
      "Williamson County hard water leaves mineral film in kitchen and bath lines, and mature trees in Berry Creek and Georgetown Village send roots toward older clay laterals. In Sun City slab homes, slow tubs often trace to venting or long horizontal runs—not a single clog at the trap.",
    faq1: "How often should Georgetown homeowners clean drains?",
    faq1a:
      "Most households schedule professional cleaning every 18–24 months; homes with large oaks, guest-week surges in Sun City, or recurring grease backups may need annual service.",
    faq2: "Is hydro-jetting worth it here?",
    faq2a:
      "On Georgetown clay laterals with root intrusion, hydro-jetting plus a camera pass often outlasts repeated snaking—ask for footage before and after.",
    faq3: "Do plumbers need a Texas license for drain work?",
    faq3a:
      "Yes—drain work beyond a homeowner trap is regulated plumbing in Texas. Verify the company holds a valid TSBPE license and carries general liability insurance.",
  },
  "plumbing/water-heater-installation": {
    name: "Water Heater Installation",
    pricing: { low: 1200, average: 1850, high: 3200, unit: "installed (tank)", year: "2026" },
    local:
      "Hard water in Georgetown shortens anode life and scales elements on electric tanks common in Teravista garages. Heat-pump and tankless upgrades are popular in Wolf Ranch high-efficiency builds but need correct gas line or electrical capacity in older Sun City slabs.",
    faq1: "Tank or tankless for Georgetown hard water?",
    faq1a:
      "Tanks are simpler and cheaper to service; tankless needs descaling maintenance to fight scale. Many Sun City owners stay with tank replacements for predictability.",
    faq2: "Do I need a permit in Williamson County?",
    faq2a:
      "Most cities around Georgetown require a permit and inspection for water heater change-outs—your installer should pull it and leave the sticker on the tank.",
    faq3: "How long does installation take?",
    faq3a:
      "A straight tank swap is often same-day; venting, pan drains, or gas line upgrades in pier-and-beam homes can stretch to two days.",
  },
  "plumbing/pipe-repair": {
    name: "Pipe Repair",
    pricing: { low: 175, average: 425, high: 1200, unit: "per repair", year: "2026" },
    local:
      "Copper pinholes and polybutylene remnants still surface in 1990s Georgetown subdivisions, while newer Teravista homes more often see nail-plate nicks or irrigation cross-connections. Slab leaks in Sun City demand isolation tests before jackhammer work.",
    faq1: "When is a spot repair enough?",
    faq1a:
      "If corrosion is localized and the rest of the run looks sound on camera, a sleeve or reroute at one fitting can work—repeat leaks on the same line usually mean repipe planning.",
    faq2: "Are slab leaks common in Georgetown?",
    faq2a:
      "They occur in older slab-on-grade stock; soil movement after dry spells can stress rigid copper. Compare hot versus cold meter tests before authorizing demolition.",
    faq3: "Will insurance cover pipe repair?",
    faq3a:
      "Sudden leaks may be covered; slow seepage and wear are often excluded. Document dates and photos for your adjuster.",
  },
  "plumbing/leak-detection": {
    name: "Leak Detection",
    pricing: { low: 200, average: 350, high: 650, unit: "per visit", year: "2026" },
    local:
      "Summer irrigation runtimes in Wolf Ranch and Georgetown Village can mask domestic leaks until the water bill spikes. Acoustic and thermal tools help separate slab supply leaks from attic condensate stains after long Texas cooling seasons.",
    faq1: "What does leak detection include?",
    faq1a:
      "A qualified tech isolates systems, uses listening gear or tracer gas, and should deliver a written map of the breach before repair pricing.",
    faq2: "Can I use my water meter to test?",
    faq2a:
      "Yes—shut off irrigation, take a two-hour meter reading with no fixtures running; movement usually means supply-side loss.",
    faq3: "Is detection required before slab repair?",
    faq3a:
      "Reputable Georgetown plumbers detect and document first so you are not paying for exploratory concrete removal.",
  },
  "plumbing/sewer-line-repair": {
    name: "Sewer Line Repair",
    pricing: { low: 2500, average: 5500, high: 12000, unit: "typical repair", year: "2026" },
    local:
      "Clay sewer laterals shift in expansive Georgetown soils after drought-breaking rains. Berry Creek’s mature canopy is notorious for root balls, while Teravista infill sometimes shares easements that complicate trenchless access.",
    faq1: "Trenchless or open cut?",
    faq1a:
      "Pipe bursting or lining can save driveways in Sun City; collapsed sections or belly sags may still need excavation—get two camera surveys.",
    faq2: "Who owns the line in Georgetown?",
    faq2a:
      "You typically own the lateral to the city tap; confirm with Georgetown utilities before work starts.",
    faq3: "How urgent is a sewage backup?",
    faq3a:
      "Stop using fixtures and call a licensed plumber the same day—backups pose health risks and can worsen separation at the cleanout.",
  },
  "plumbing/toilet-installation": {
    name: "Toilet Installation",
    pricing: { low: 225, average: 350, high: 600, unit: "per toilet", year: "2026" },
    local:
      "Guest baths in Sun City see heavy weekend use; wax rings and closet flanges fail faster when floors settle on slab. High-efficiency models help Teravista homes on municipal conservation tiers without sacrificing flush performance.",
    faq1: "Can I buy the toilet and hire install only?",
    faq1a:
      "Yes—most Georgetown plumbers will set a customer-supplied unit if the box is complete; they may not warranty the fixture itself.",
    faq2: "How long does install take?",
    faq2a:
      "Standard swap is 1–2 hours; rotted flanges or off-standard rough-ins in remodels add time.",
    faq3: "Do dual-flush toilets handle hard water?",
    faq3a:
      "Choose models with glazed trapways and plan periodic vinegar flushes—scale builds faster here than in softer-water markets.",
  },
  "plumbing/emergency-plumber": {
    name: "Emergency Plumber",
    pricing: { low: 175, average: 325, high: 550, unit: "service call", year: "2026" },
    local:
      "Frozen hose bibs are rare, but burst washers on aging stops and AC condensate overflows during July heat waves drive after-hours calls across Georgetown. Know your main shutoff before storms roll through Williamson County.",
    faq1: "What counts as a plumbing emergency?",
    faq1a:
      "Active sewage, no water to the whole home, or water spraying from a supply line warrant immediate help; a slow drip can usually wait for business hours.",
    faq2: "Are after-hours fees higher?",
    faq2a:
      "Expect trip charges or overtime multipliers—ask for the rate on the phone and whether the fee applies to repair labor.",
    faq3: "Should I shut off water first?",
    faq3a:
      "Yes—close the main or fixture stop and move valuables; photos help the plumber stage parts on the truck.",
  },
  "plumbing/water-filtration": {
    name: "Water Filtration",
    pricing: { low: 800, average: 2200, high: 4500, unit: "installed", year: "2026" },
    local:
      "Georgetown’s moderately hard water leaves spotting on Wolf Ranch black fixtures and shortens ice maker life in Teravista kitchens. Whole-home softeners plus under-sink RO are common pairings when families want both appliance protection and drinking taste.",
    faq1: "Softener vs filtration only?",
    faq1a:
      "Softeners address hardness minerals; carbon or RO targets taste and chlorine. Many Williamson County homes use both in sequence.",
    faq2: "How much salt will I use?",
    faq2a:
      "Plan one to two bags monthly for average household use—guest weeks in Sun City can increase regeneration cycles.",
    faq3: "Do filters need a plumber?",
    faq3a:
      "Whole-home installs tie into main lines and need a licensed plumber; simple pitcher or countertop units do not.",
  },
};

// Auto-fill remaining pages with structured templates
function titleCase(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/\bAc\b/g, "AC")
    .replace(/\bEv\b/g, "EV")
    .replace(/\bHvac\b/g, "HVAC");
}

function metaTitle(name, serviceLabel) {
  const base = `${name} Georgetown TX | Local ${serviceLabel} (2026)`;
  return base.length <= 60 ? base : `${name} in Georgetown, TX (2026)`;
}

function metaDescription(name, serviceLabel, localSnippet) {
  const trimmed = localSnippet.replace(/\s+/g, " ").trim();
  const firstSentence = trimmed.split(/(?<=[.!?])\s+/)[0] ?? trimmed;
  const snippet = firstSentence.length > 95 ? firstSentence.slice(0, 92) + "…" : firstSentence;
  const base = `${name} in Georgetown, TX — ${snippet} Pricing, FAQs, and local ${serviceLabel.toLowerCase()} pros.`;
  return base.length <= 160 ? base : base.slice(0, 157) + "…";
}

function buildBody(name, serviceLabel, local, serviceSlug, slug, hoods) {
  const hoodNames = hoods.map((h) => NEIGHBORHOODS[h]).join(" and ");
  const hoodMention =
    serviceSlug === "foundation" || serviceSlug === "landscaping"
      ? "Wolf Ranch and Teravista sit on expansive clay that moves with Texas drought cycles, while Berry Creek’s tree canopy and Georgetown Village’s established lots each create different maintenance rhythms."
      : serviceSlug === "pest-control"
        ? "Cedar pollen season and warm evenings push pests toward eaves and patio lights from Sun City to Georgetown Village—perimeter treatments need to account for Texas heat and seasonal humidity swings."
        : serviceSlug === "cleaning"
          ? "Sun City’s active households and Georgetown Village’s larger floor plans mean dust from limestone trails and cedar pollen shows up fast on baseboards and fan blades."
          : "From Sun City’s mature slabs to Teravista’s newer builds and Wolf Ranch’s family traffic, Georgetown neighborhoods each stress home systems differently through long Texas summers.";

  const slugWords = slug.replace(/-/g, " ");
  return [
    `Homeowners searching for ${name.toLowerCase()} in Georgetown, TX usually want a clear scope, realistic pricing, and a contractor who knows Williamson County homes—not a generic national script. ${local}`,
    hoodMention,
    `In ${hoodNames}, ${slugWords} jobs often differ from downtown Georgetown bungalows: lot grading, HOA exterior rules, and the age of mechanical systems all change how a crew stages equipment and prices labor. Mention your neighborhood when you request quotes so pros can account for drive time, permit jurisdiction, and the housing stock they see every week.`,
    `Central Texas weather still shapes the job: long cooling seasons, sudden hail, drought-stressed clay, and cedar pollen can each affect how ${slugWords} is scoped, sequenced, and warranted. A neighbor in Berry Creek or Georgetown Village may need different prep than a newer build in Teravista or Wolf Ranch—even when the headline service is the same.`,
    `Before you hire, compare at least two written quotes that list materials, warranty length, and who pulls permits. Ask how the crew handles ${serviceLabel.toLowerCase()} work in homes like yours—pier-and-beam versus slab, two-story supply runs, and summer heat loads that stress Texas installations all change the plan.`,
    `Georgetown’s ${name.toLowerCase()} market includes owner-occupied homes, rentals, and active-adult communities where scheduling windows matter. Request proof of insurance, a line-item estimate, and whether labor is warranted separately from parts. If expansive clay, mature trees, or recent storm damage applies, say so upfront—crews price access and backlog differently across Williamson County.`,
    `Use the pricing table below as a planning band for Georgetown, then shortlist pros with verifiable Texas licensing (where required), recent reviews from neighbors, and clear communication. Our ${serviceLabel.toLowerCase()} hub and neighborhood guides link deeper resources when you are ready to compare ${slugWords} against related jobs.`,
  ];
}

function defaultPricing(serviceSlug, slug) {
  const bands = {
    plumbing: [125, 275, 550],
    hvac: [150, 350, 850],
    roofing: [350, 1200, 8500],
    electrical: [150, 425, 2500],
    landscaping: [45, 120, 450],
    "pest-control": [95, 175, 450],
    foundation: [500, 3500, 12000],
    cleaning: [120, 200, 450],
  };
  const [low, average, high] = bands[serviceSlug] ?? [100, 250, 600];
  const unit =
    slug.includes("installation") || slug.includes("replacement")
      ? "installed"
      : slug.includes("repair") || slug.includes("emergency")
        ? "per visit"
        : slug.includes("mowing") || slug.includes("recurring")
          ? "per visit"
          : "typical job";
  return { low, average, high, unit, year: "2026" };
}

function defaultFaqs(name, serviceLabel) {
  return {
    faq1: `How much does ${name.toLowerCase()} cost in Georgetown, TX?`,
    faq1a: `Most homeowners land near the average column in our table, but ${serviceLabel.toLowerCase()} pricing shifts with access, materials, and whether permits are required in Williamson County.`,
    faq2: `How do I vet a ${serviceLabel.toLowerCase()} contractor locally?`,
    faq2a: "Confirm licensing where Texas law requires it, read recent Georgetown-area reviews, and insist on a written scope with warranty terms before work starts.",
    faq3: `When should I schedule ${name.toLowerCase()} in Central Texas?`,
    faq3a: "Spring and fall are popular for non-emergency work; summer heat and storm season can affect outdoor trades and emergency availability—book early for peak weeks.",
  };
}

function defaultLocal(name, serviceSlug) {
  const snippets = {
    hvac: `${name} in Georgetown runs harder than northern climates—100°F afternoons push condensers in Wolf Ranch and Sun City, and cedar pollen clogs filters faster than many owners expect.`,
    roofing: `${name} matters after spring hail sweeps across Williamson County; Sun City and Teravista roofs often need inspection even when leaks are not visible from the curb.`,
    electrical: `${name} demand rises in Teravista and Wolf Ranch as EV chargers, pool panels, and backup power become standard on larger homes.`,
    landscaping: `${name} must account for clay soil, watering restrictions, and summer heat that stress turf in Berry Creek and Georgetown Village alike.`,
    "pest-control": `${name} targets species active in Central Texas—fire ants, scorpions, and roof rats all flare with heat and moisture around Georgetown eaves.`,
    foundation: `${name} ties directly to expansive clay around Georgetown; dry summers shrink soil and rainy spells swell it, stressing slabs in Teravista and Wolf Ranch.`,
    cleaning: `${name} in Georgetown often focuses on pollen, limestone dust, and heavy foot traffic from schools and events near downtown and Sun City.`,
  };
  return snippets[serviceSlug] ?? `${name} in Georgetown homes must account for hard water, clay soil, and long cooling seasons typical of Williamson County.`;
}

const allPages = [];

for (const [serviceSlug, slugs] of Object.entries(SLUGS)) {
  const cfg = SERVICE_CONFIG[serviceSlug];
  for (const slug of slugs) {
    const key = `${serviceSlug}/${slug}`;
    const custom = PAGE[key];
    const name = custom?.name ?? titleCase(slug);
    const local = custom?.local ?? defaultLocal(name, serviceSlug);
    const pricing = custom?.pricing ?? defaultPricing(serviceSlug, slug);
    const faqs = custom
      ? {
          faq1: custom.faq1,
          faq1a: custom.faq1a,
          faq2: custom.faq2,
          faq2a: custom.faq2a,
          faq3: custom.faq3,
          faq3a: custom.faq3a,
        }
      : defaultFaqs(name, cfg.label);
    const hoods = custom?.hoods ?? cfg.defaultHoods;
    const bodyParagraphs = buildBody(name, cfg.label, local, serviceSlug, slug, hoods);
    const neighborhoodLinks = hoods.map((h) => ({
      label: `${cfg.label} in ${NEIGHBORHOODS[h]}`,
      href: `/neighborhoods/${h}/${cfg.neighborhoodServiceSlug}`,
    }));

    allPages.push({
      serviceSlug,
      slug,
      serviceLabel: cfg.label,
      subServiceName: name,
      parentHubPath: cfg.parentHubPath,
      angiCategorySlug: cfg.angiCategorySlug,
      thumbtackCategory: cfg.thumbtackCategory,
      neighborhoodServiceSlug: cfg.neighborhoodServiceSlug,
      extended: cfg.extended,
      h1: `${name} in Georgetown, TX`,
      metaTitle: metaTitle(name, cfg.label),
      metaDescription: metaDescription(name, cfg.label, local),
      bodyParagraphs,
      pricing: {
        ...pricing,
        notes: `Typical ${name.toLowerCase()} costs for Georgetown and Williamson County homes in ${pricing.year}. Actual quotes depend on home size, materials, and urgency.`,
      },
      faqs: [
        { question: faqs.faq1, answer: faqs.faq1a },
        { question: faqs.faq2, answer: faqs.faq2a },
        { question: faqs.faq3, answer: faqs.faq3a },
      ],
      neighborhoodLinks,
    });
  }
}

const out = `/**
 * Sub-service landing pages under \`/[service]/[slug]\` (e.g. \`/plumbing/drain-cleaning\`).
 * Content updates belong here—page components read from this file only.
 */

export type SubServicePricing = {
  low: number;
  average: number;
  high: number;
  unit: string;
  year: string;
  notes: string;
};

export type SubServiceFaq = {
  question: string;
  answer: string;
};

export type SubServiceNeighborhoodLink = {
  label: string;
  href: string;
};

export type SubServicePage = {
  serviceSlug: string;
  slug: string;
  serviceLabel: string;
  subServiceName: string;
  parentHubPath: string;
  angiCategorySlug: string;
  thumbtackCategory: string;
  neighborhoodServiceSlug: string;
  /** When true, page is hidden unless extended trades are enabled. */
  extended: boolean;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  bodyParagraphs: string[];
  pricing: SubServicePricing;
  faqs: SubServiceFaq[];
  neighborhoodLinks: SubServiceNeighborhoodLink[];
};

export const SUB_SERVICE_SLUGS = ${JSON.stringify(SLUGS, null, 2)} as const;

export type SubServiceCategorySlug = keyof typeof SUB_SERVICE_SLUGS;

export const subServicePages: SubServicePage[] = ${JSON.stringify(allPages, null, 2)};

const pageMap = new Map(subServicePages.map((p) => [\`\${p.serviceSlug}/\${p.slug}\`, p]));

export function getSubServicePage(serviceSlug: string, slug: string): SubServicePage | undefined {
  return pageMap.get(\`\${serviceSlug}/\${slug}\`);
}

export function getSubServiceStaticParams(): { service: string; slug: string }[] {
  return subServicePages.map((p) => ({ service: p.serviceSlug, slug: p.slug }));
}

export function getSubServicePaths(): string[] {
  return subServicePages.map((p) => \`/\${p.serviceSlug}/\${p.slug}\`);
}

export function isExtendedSubServiceCategory(serviceSlug: string): boolean {
  const page = subServicePages.find((p) => p.serviceSlug === serviceSlug);
  return page?.extended ?? false;
}
`;

const paths = allPages.map((p) => `/${p.serviceSlug}/${p.slug}`);
fs.writeFileSync(path.join(process.cwd(), "data/sub-services.ts"), out, "utf8");
fs.writeFileSync(path.join(process.cwd(), "data/sub-service-paths.json"), JSON.stringify(paths, null, 2), "utf8");
console.log(`Wrote ${allPages.length} sub-service pages to data/sub-services.ts`);
