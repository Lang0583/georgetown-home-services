import type { ProviderCategory } from "./providers";

export type ZipCodeFaq = { q: string; a: string };

export type ZipServiceLink = {
  slug: string;
  label: string;
  description: string;
};

export type ZipCodePage = {
  zip: string;
  neighborhoods: string;
  shortLabel: string;
  housingProfile: string;
  introParagraphs: string[];
  costGuideSlugs: string[];
  faqs: ZipCodeFaq[];
  metaDescription: string;
};

export const GEORGETOWN_ZIP_CODES = ["78626", "78628", "78633", "78634"] as const;

export type GeorgetownZipCode = (typeof GEORGETOWN_ZIP_CODES)[number];

/** All eight Georgetown service hub slugs with short blurbs for zip landing grids. */
export const ZIP_SERVICE_LINKS: ZipServiceLink[] = [
  {
    slug: "plumber-georgetown-tx",
    label: "Plumbing",
    description: "Repairs, repipes, water heaters, and drain service for Georgetown homes.",
  },
  {
    slug: "hvac-georgetown-tx",
    label: "HVAC",
    description: "AC repair, heating service, maintenance, and replacement planning.",
  },
  {
    slug: "roofer-georgetown-tx",
    label: "Roofing",
    description: "Inspections, shingle repair, storm documentation, and replacements.",
  },
  {
    slug: "electrician-georgetown-tx",
    label: "Electrical",
    description: "Panels, wiring, lighting, generators, and EV charger installs.",
  },
  {
    slug: "landscaping-georgetown-tx",
    label: "Landscaping",
    description: "Lawn care, irrigation, design, and seasonal landscape maintenance.",
  },
  {
    slug: "pest-control-georgetown-tx",
    label: "Pest Control",
    description: "Perimeter treatments, termite plans, rodents, and mosquito control.",
  },
  {
    slug: "foundation-repair-georgetown-tx",
    label: "Foundation Repair",
    description: "Slab and pier evaluations, stabilization, and drainage corrections.",
  },
  {
    slug: "house-cleaning-georgetown-tx",
    label: "House Cleaning",
    description: "Recurring maid service, deep cleans, and move-in/move-out cleaning.",
  },
];

export function zipPageH1(zip: string): string {
  return `Home Services in Georgetown TX ${zip} | Local Contractors Near You`;
}

export function zipPageTitle(zip: string): string {
  return `Home Services in Georgetown TX ${zip} | Plumbers, HVAC, Roofers & More`;
}

const ZIP_PAGES: Record<GeorgetownZipCode, ZipCodePage> = {
  "78626": {
    zip: "78626",
    neighborhoods: "Downtown Georgetown, the Square, and older historic neighborhoods",
    shortLabel: "Downtown & historic Georgetown",
    housingProfile: "Pre-1980 homes, pier-and-beam and early slab foundations, historic facades",
    introParagraphs: [
      "ZIP code 78626 covers the heart of Georgetown—Downtown, the Williamson County Square, and established in-town streets where limestone cottages, bungalows, and early ranch homes sit on smaller lots shaded by mature oaks. If your mailing address is 78626, you are usually within a short drive of San Gabriel Park, the university district, and the walkable retail core that makes this one of the most character-rich parts of the city.",
      "Housing stock here skews older than the master-planned communities on Georgetown’s edges. Many homes were built before modern plumbing materials, higher electrical loads, and today’s foundation engineering standards became commonplace. Pier-and-beam foundations, galvanized supply lines, cast-iron drains, and original electrical panels still appear behind renovated kitchens and updated bathrooms. Preserving street-facing charm while upgrading systems behind the walls is a recurring theme for 78626 owners.",
      "Three home-service pain points stand out in this zip. First, aging pipes: corrosion in galvanized lines reduces pressure and raises leak risk inside plaster walls, so camera inspections and targeted repipes often beat repeated patch jobs. Second, historic-structure considerations: contractors must plan crawl-space access, material matching, and careful protection of original trim and masonry when opening walls or rerouting utilities. Third, foundation age: decades of Central Texas clay shrink-swell cycles can produce stair-step cracks, sloping floors, and sticking doors—early engineering opinions help separate cosmetic movement from structural drift.",
      "Roofing and electrical work in 78626 often ties back to the same era: mixed roof planes from additions, undersized panels after kitchen expansions, and attic ventilation that predates current code. Georgetown Home Services helps 78626 residents compare plumbers, electricians, foundation specialists, and roofers who routinely work in older in-town homes. Browse the service guides and provider lists below, then contact companies directly for written estimates tied to your address.",
    ],
    costGuideSlugs: [
      "foundation-repair-cost-georgetown-tx",
      "plumber-cost-georgetown-tx",
      "electrician-cost-georgetown-tx",
      "roof-repair-cost-georgetown-tx",
    ],
    faqs: [
      {
        q: "Are there licensed plumbers serving Georgetown TX 78626?",
        a: "Yes. Multiple licensed plumbing companies serve 78626, including downtown and historic in-town addresses. Compare at least two written quotes, confirm a valid Texas State Board of Plumbing Examiners (TSBPE) license, and ask how the company handles older galvanized lines and slab access before authorizing work.",
      },
      {
        q: "What foundation issues are common in 78626 historic homes?",
        a: "Older pier-and-beam and early slab foundations in 78626 often show clay-soil movement as drought and heavy rain alternate. Watch for diagonal cracks, doors that stick, and gaps at interior trim. A structural evaluation can document whether monitoring, drainage improvements, or pier work is appropriate before cracks widen.",
      },
      {
        q: "How do I find electricians familiar with older Georgetown homes near the Square?",
        a: "Look for electricians who routinely upgrade panels, add circuits for modern kitchens, and work carefully in homes with plaster walls or limited attic access. Georgetown Home Services lists highly rated local electricians; verify TDLR licensing and insurance, and request a written scope before panel or rewiring work begins.",
      },
    ],
    metaDescription:
      "Home services in Georgetown TX 78626 serving Downtown Georgetown, the Square & historic in-town homes. Compare licensed plumbers, HVAC, roofers, electricians & foundation repair.",
  },
  "78628": {
    zip: "78628",
    neighborhoods: "Wolf Ranch, Berry Creek, west-side Sun City, and newer construction corridors",
    shortLabel: "Wolf Ranch, Berry Creek & west Georgetown",
    housingProfile: "2000s–2020s builds, slab foundations, irrigation-heavy lots, builder-grade systems",
    introParagraphs: [
      "ZIP code 78628 stretches across some of Georgetown’s fastest-growing residential corridors—Wolf Ranch, Berry Creek, west-side Sun City pockets, and newer subdivisions along the I-35 and SH 130 access paths. Addresses here are typically farther from the historic Square but closer to large retail nodes, community pools, and HOA-managed landscape standards that define daily home maintenance.",
      "Housing in 78628 is dominated by slab-on-grade construction from the 2000s through 2020s: open floor plans, high ceilings, builder-grade HVAC and roofing packages, and irrigation systems sized for larger lots and St. Augustine turf. Many owners are still inside—or just beyond—the original builder warranty window, which changes how you document HVAC deficiencies, roof wind damage, and irrigation leaks before calling for out-of-pocket repairs.",
      "Service pain points in 78628 often cluster around three themes. First, new-construction warranty transitions: know what your builder, manufacturer, and home warranty cover before paying for AC, roofing, or irrigation fixes that may still be claimable. Second, irrigation systems: broken heads, zone pressure issues, and controller programming problems are common on large lots where HOA landscape rules require consistent green turf. Third, large-lot exterior care: mowing, fertilization, tree trimming, and drainage swales need recurring attention as landscaping matures.",
      "HVAC efficiency also matters in 78628’s newer homes with tall ceilings and wide glass exposures—undersized maintenance shortens compressor life, while skipped filter changes strain systems during July heat. Georgetown Home Services links 78628 homeowners to HVAC, landscaping, roofing, and plumbing guides tuned for Williamson County pricing. Use the resources below to shortlist providers, then request line-item written estimates you can compare.",
    ],
    costGuideSlugs: [
      "ac-installation-cost-georgetown-tx",
      "landscaping-cost-georgetown-tx",
      "hvac-repair-cost-georgetown-tx",
      "roof-replacement-cost-georgetown-tx",
    ],
    faqs: [
      {
        q: "Are there licensed plumbers serving Georgetown TX 78628?",
        a: "Yes. Plumbers throughout Williamson County routinely service 78628 neighborhoods such as Wolf Ranch and Berry Creek. Confirm licensing, ask about slab leak detection experience, and compare written estimates—especially for water heaters and irrigation tie-ins on newer homes.",
      },
      {
        q: "What HVAC services do Wolf Ranch and Berry Creek homeowners need most?",
        a: "AC tune-ups, refrigerant leak diagnosis, capacitor and blower repairs, and full system replacements as builder-grade units age past ten to fifteen years. Schedule spring maintenance before peak summer demand and keep warranty documentation handy if your home is still within a builder coverage period.",
      },
      {
        q: "How much does landscaping cost in 78628 communities with large lots?",
        a: "Costs vary by lot size, turf type, and whether you need basic mowing or full maintenance with fertilization and irrigation repair. See our landscaping cost guide for 2026 Georgetown ranges, then collect two or three quotes that specify visit frequency and what is included in each pass.",
      },
    ],
    metaDescription:
      "Georgetown TX 78628 home services: Wolf Ranch, Berry Creek, west Sun City & newer construction areas. Compare HVAC, landscaping, roofers, plumbers & AC replacement costs.",
  },
  "78633": {
    zip: "78633",
    neighborhoods: "Sun City Texas, northern Georgetown, and 55+ active-adult communities",
    shortLabel: "Sun City Texas & north Georgetown",
    housingProfile: "Single-story 55+ homes, HOA rules, efficient footprints, retirement-focused budgets",
    introParagraphs: [
      "ZIP code 78633 is closely associated with Sun City Texas and the northern Georgetown communities built for active-adult living. Streets here emphasize single-story floor plans, low-maintenance exteriors, golf-cart paths, and clubhouses that anchor a 55+ lifestyle. If you live in 78633, HOA architectural and landscape rules often shape when—and how—exterior work can be scheduled.",
      "Homes in this zip are typically newer than downtown Georgetown but optimized for accessibility rather than sprawling family layouts: one-level living, smaller attic spaces, efficient HVAC tonnage, and hard-surface flooring that is easy to maintain. Many residents are on fixed incomes or carefully managed retirement budgets, so transparent pricing, written scopes, and companies accustomed to Sun City access rules matter as much as star ratings.",
      "Three service themes recur in 78633. First, HOA compliance: exterior paint, roofing, landscaping, and even visible HVAC equipment may need association approval—confirm lead times before signing contracts. Second, single-story HVAC efficiency: systems that short-cycle or lose cooling in west-facing rooms affect comfort quickly when every room is on one level; maintenance plans often beat emergency midsummer replacements. Third, value-seeking behavior: compare multiple quotes for pest control, house cleaning, and plumbing, and ask about senior discounts or bundled maintenance visits.",
      "Pest pressure and perimeter treatments are also common concerns near open greenbelts and golf-course edges. House cleaning demand stays high among snowbirds and full-time residents who want reliable recurring service without surprise add-on fees. Georgetown Home Services aggregates guides and provider lists for 78633 homeowners researching HVAC maintenance, cleaning, pest control, and plumbing. Browse the sections below, then contact providers directly to confirm availability in Sun City Texas.",
    ],
    costGuideSlugs: [
      "hvac-maintenance-cost-georgetown-tx",
      "house-cleaning-cost-georgetown-tx",
      "pest-control-cost-georgetown-tx",
      "plumber-cost-georgetown-tx",
    ],
    faqs: [
      {
        q: "What home services are available in Sun City Texas (78633)?",
        a: "Sun City Texas homeowners can access the full range of Georgetown trades: HVAC, plumbing, roofing, electrical, landscaping, pest control, foundation repair, and house cleaning. Many national and local brands explicitly list Sun City in their service areas—confirm HOA notice requirements before exterior work begins.",
      },
      {
        q: "How often should 78633 homeowners service single-story HVAC systems?",
        a: "Plan for spring and fall tune-ups on most single-story heat-pump or split systems, with filter changes every one to three months during heavy cooling season. See our HVAC maintenance cost guide for typical Georgetown price bands, then hire a licensed contractor who documents refrigerant pressures and coil condition in writing.",
      },
      {
        q: "Are there affordable house cleaning services serving Georgetown TX 78633?",
        a: "Yes. Several highly rated cleaning companies serve Sun City and northern Georgetown with recurring and deep-clean options. Compare per-visit pricing, insurance, and whether supplies are included; request the same crew when possible for consistent results in a 55+ community.",
      },
    ],
    metaDescription:
      "Home services in Georgetown TX 78633 for Sun City Texas & northern Georgetown active-adult areas. Compare HVAC maintenance, house cleaning, pest control & licensed plumbers.",
  },
  "78634": {
    zip: "78634",
    neighborhoods: "Hutto border area, eastern Georgetown, and newer fast-growing subdivisions",
    shortLabel: "East Georgetown & Hutto border",
    housingProfile: "New builds on slab, undeveloped land nearby, rapid growth, builder-grade exteriors",
    introParagraphs: [
      "ZIP code 78634 covers eastern Georgetown and the Williamson County fringe toward Hutto—neighborhoods where new subdivisions, semi-rural lots, and construction cranes still share the horizon. Addresses here often belong to buyers who chose Georgetown schools and commute paths while accepting a greenerfield setting with fewer mature trees and more exposed soil.",
      "Housing is dominated by slab-on-grade construction from the last ten to twenty years: standardized builder packages, builder landscaping minimums, and HVAC systems that may not yet show wear but sit on soils still settling from recent grading. As communities infill, undeveloped fields nearby can increase pest pressure from rodents and insects migrating toward new turf and exterior lighting.",
      "Three pain points appear often in 78634. First, newer builds on slab: hairline drywall cracks and patio settlement may be normal early settling, but persistent stair-step brick movement warrants a foundation evaluation before your builder warranty expires. Second, fast growth infrastructure: road dust, construction traffic, and intermittent drainage during heavy storms affect lawns and garage slabs on the east side. Third, pest pressure: open land nearby means proactive perimeter pest control often pays off before ants, scorpions, or rodents establish interior routes.",
      "Landscaping and irrigation installs are also common as homeowners replace builder-minimum sod with beds, trees, and outdoor living spaces. AC installation and upgrade demand rises as families finish bonus rooms and add second zones. Georgetown Home Services helps 78634 residents compare pest control, foundation, HVAC, and landscaping providers who already work along the Hutto border. Use the guides below for local price context, then request written estimates from a short list of companies.",
    ],
    costGuideSlugs: [
      "pest-control-cost-georgetown-tx",
      "foundation-repair-cost-georgetown-tx",
      "ac-installation-cost-georgetown-tx",
      "landscaping-cost-georgetown-tx",
    ],
    faqs: [
      {
        q: "Is pest control necessary in newer 78634 subdivisions?",
        a: "Many eastern Georgetown homeowners choose quarterly perimeter treatments because nearby undeveloped land pushes ants, spiders, and rodents toward new landscaping and slab penetrations. Compare treatment schedules, products used, and whether interior service is included before signing an annual plan.",
      },
      {
        q: "When should 78634 homeowners get a foundation inspection on a new build?",
        a: "Document baseline cracks and door alignment during your builder warranty period. If diagonal brick cracks, separations at windows, or sloping floors worsen after the first two rainy seasons, hire an independent evaluator before warranty expiration to clarify whether settlement is cosmetic or structural.",
      },
      {
        q: "Are there HVAC installers serving the Hutto border and 78634?",
        a: "Yes. AC installation and replacement companies across Williamson County routinely work in eastern Georgetown and along the Hutto border. Use our AC installation cost guide for planning ranges, then compare load calculations, equipment brands, and warranty terms on every quote.",
      },
    ],
    metaDescription:
      "Home services in Georgetown TX 78634 for eastern Georgetown & Hutto border subdivisions. Compare pest control, foundation repair, AC installation & landscaping contractors.",
  },
};

export function isGeorgetownZipCode(zip: string): zip is GeorgetownZipCode {
  return (GEORGETOWN_ZIP_CODES as readonly string[]).includes(zip);
}

export function getZipCodePage(zip: string): ZipCodePage | null {
  if (!isGeorgetownZipCode(zip)) return null;
  return ZIP_PAGES[zip];
}

export function getAllZipCodePages(): ZipCodePage[] {
  return GEORGETOWN_ZIP_CODES.map((zip) => ZIP_PAGES[zip]);
}

export function zipServiceHref(serviceSlug: string, zip: string): string {
  return `/services/${serviceSlug}?zip=${zip}`;
}

/** Index blurb for /zip hub cards. */
export const ZIP_INDEX_INTRO =
  "Georgetown, Texas spans four primary ZIP codes—each with distinct neighborhoods, housing ages, and home-service priorities. Choose your ZIP to see local guides, cost ranges, and provider shortlists.";
