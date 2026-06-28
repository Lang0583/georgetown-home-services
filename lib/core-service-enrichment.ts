import { neighborhoodServicePages } from "@/data/neighborhoods";
import type { PricingCategory } from "./pricing-data";
import type { InternalLink } from "./internal-links";

/** Core `/services/[slug]` pages that receive shared enrichment sections. */
export const CORE_SERVICE_ENRICHMENT_SLUGS = [
  "plumber-georgetown-tx",
  "hvac-georgetown-tx",
  "roofer-georgetown-tx",
  "electrician-georgetown-tx",
  "landscaping-georgetown-tx",
  "pest-control-georgetown-tx",
  "foundation-repair-georgetown-tx",
  "house-cleaning-georgetown-tx",
] as const;

export type CoreServiceEnrichmentSlug = (typeof CORE_SERVICE_ENRICHMENT_SLUGS)[number];

export type CoreServiceEnrichment = {
  pricingKey: PricingCategory["key"];
  /** Route segment under `/neighborhoods/[area]/[segment]`. */
  neighborhoodServiceSlug: string;
  /** Lowercase trade noun for headings, e.g. "plumber". */
  tradeNoun: string;
  /** Title-case trade label, e.g. "Plumber". */
  tradeLabel: string;
  whyHireParagraphs: string[];
};

const NEIGHBORHOOD_LINK_AREAS: { slug: string; name: string }[] = [
  { slug: "sun-city", name: "Sun City" },
  { slug: "wolf-ranch", name: "Wolf Ranch" },
  { slug: "teravista", name: "Teravista" },
  { slug: "berry-creek", name: "Berry Creek" },
  { slug: "georgetown-village", name: "Georgetown Village" },
];

export const CORE_SERVICE_ENRICHMENT: Record<CoreServiceEnrichmentSlug, CoreServiceEnrichment> = {
  "plumber-georgetown-tx": {
    pricingKey: "plumbing",
    neighborhoodServiceSlug: "plumber",
    tradeNoun: "plumber",
    tradeLabel: "Plumber",
    whyHireParagraphs: [
      "Georgetown sits on expansive Williamson County clay and draws hard Edwards Aquifer water that scales fixtures and shortens water-heater life. Slab-on-grade homes—common from Sun City ranches to Wolf Ranch and Teravista builds—hide supply lines under concrete, so a small leak can show up as a drywall stain feet away from the actual breach.",
      "Older bungalows near downtown Georgetown Village often still have original angle stops and galvanized branches that fail during freeze-thaw swings or after decades of mineral buildup. A Georgetown plumber who understands slab isolation, irrigation cross-talk, and when camera verification beats repeated snaking saves you from paying twice for the same symptom.",
      "Sun City retirees and guest-week surges add another layer: multiple showers stacking at once expose undersized drains and water heaters that looked fine when only two people lived in the home. Local experience means knowing when a slow drain is a single-fixture clog versus a main-line pattern tied to mature trees in Berry Creek.",
    ],
  },
  "hvac-georgetown-tx": {
    pricingKey: "hvac",
    neighborhoodServiceSlug: "hvac",
    tradeNoun: "HVAC company",
    tradeLabel: "HVAC",
    whyHireParagraphs: [
      "Georgetown summers regularly exceed 100°F, so cooling systems run longer and harder than in most U.S. markets. Latent humidity, pollen loading, and attic temperatures above 140°F stress capacitors, condensate drains, and duct connections that looked fine last April.",
      "Two-story Teravista and Wolf Ranch layouts often have upstairs bedrooms that never catch up—not because the equipment is undersized on paper, but because return placement and long duct runs favor the thermostat location over the rooms you actually sleep in. A local HVAC company documents airflow and static pressure, not only refrigerant gauges.",
      "Sun City single-level homes with extended roof lines can starve outdoor units of airflow when landscaping matures. Historic Georgetown Village homes with retrofitted closets or garage conversions may hide air handlers in tight spaces where condensate backups trip safety switches during visitor-heavy weeks.",
    ],
  },
  "roofer-georgetown-tx": {
    pricingKey: "roofing",
    neighborhoodServiceSlug: "roofer",
    tradeNoun: "roofer",
    tradeLabel: "Roofer",
    whyHireParagraphs: [
      "Williamson County spring hail and wind events are the primary driver of roofing calls in Georgetown. Bruised shingles, dented soft metals, and lifted flashing often show up on newer Wolf Ranch and Teravista roofs as well as older stock in Berry Creek—documentation timing matters for both insurance and cash-pay decisions.",
      "Georgetown's mix of tree canopy and tight lot lines means debris dams in valleys and behind chimneys after storms. A roofer who traces the actual entry path—flashing, vents, transitions—not only where the ceiling stain appears, prevents repeat leak chases every time rain hits from a different angle.",
      "Sun City HOA maintenance windows and Georgetown Village historic-district visibility rules can affect when tear-off work is scheduled and how vent and color selections are documented. Local crews know how to write scopes that satisfy both water-shedding performance and neighborhood expectations.",
    ],
  },
  "electrician-georgetown-tx": {
    pricingKey: "electrical",
    neighborhoodServiceSlug: "electrician",
    tradeNoun: "electrician",
    tradeLabel: "Electrician",
    whyHireParagraphs: [
      "Georgetown homes span decades of code evolution—from 100-amp panels in central Georgetown Village bungalows to 200-amp service in newer master-planned subdivisions. EV chargers, tankless water heaters, and heat-pump retrofits often need capacity that was not planned when the original service was installed.",
      "Central Texas heat and storm-season power blips stress connections in attic junction boxes and outdoor panels. Sun City garages built before EV adoption frequently have marginal spare breaker spaces; Wolf Ranch two-story homes may need long attic runs that change labor and materials versus a single-story ranch.",
      "Historic-district remodels near downtown require arc-fault and GFCI upgrades in finished walls where paths are tight. A licensed Georgetown electrician pulls permits, documents load calculations, and explains grounding upgrades—not shortcuts that create fire-safety risk.",
    ],
  },
  "landscaping-georgetown-tx": {
    pricingKey: "landscaping",
    neighborhoodServiceSlug: "landscaping",
    tradeNoun: "landscaping company",
    tradeLabel: "Landscaping",
    whyHireParagraphs: [
      "Georgetown's clay soil swells when wet and cracks in drought, which changes how St. Augustine and Bermuda establish roots and how irrigation heads must be aligned through the season. Edwards Aquifer watering restrictions and HOA rules in Sun City, Wolf Ranch, and Berry Creek make scheduling as important as plant choice.",
      "Mature pecan and oak canopies in Teravista and Berry Creek create shade patterns that defeat one-size-fits-all sod advice. Chinch bugs, take-all root rot after wet-cool snaps, and iron chlorosis on calcareous soil show up repeatedly in Williamson County lawns.",
      "Irrigation repair and installation in Texas requires TCEQ licensing when work touches in-ground systems—not every mowing crew qualifies. A local landscaping company that soil-tests compaction and documents HOA bed standards before promising instant curb appeal saves rework after the first Georgetown heat wave.",
    ],
  },
  "pest-control-georgetown-tx": {
    pricingKey: "pest",
    neighborhoodServiceSlug: "pest-control",
    tradeNoun: "pest control company",
    tradeLabel: "Pest Control",
    whyHireParagraphs: [
      "Georgetown's mix of suburban subdivisions, greenbelt edges, and exurban lots means pest pressure shifts block by block—fire ants from untreated neighboring yards, subterranean termites that swarm each spring, scorpions on rocky west-side terrain, and rodents along Berry Creek tree lines.",
      "Sun City homes with fruiting ornamentals and Wolf Ranch lots backing to greenbelts see seasonal spikes that generic quarterly sprays miss if the vendor never adjusts product rotation or exclusion work. Hard-water lime and stored pantry goods in historic Georgetown Village kitchens attract different pest patterns than new-build pantries in Teravista.",
      "Texas Department of Agriculture licensing (TPCL) and category endorsements matter for termite versus general pest work. A Georgetown pest control company that explains Integrated Pest Management—moisture fixes, entry sealing, targeted applications—beats monthly blind fogging that does not address why ants keep returning after rain.",
    ],
  },
  "foundation-repair-georgetown-tx": {
    pricingKey: "foundation",
    neighborhoodServiceSlug: "foundation-repair",
    tradeNoun: "foundation repair contractor",
    tradeLabel: "Foundation Repair",
    whyHireParagraphs: [
      "Georgetown sits on expansive clay that swells when wet and shrinks in drought, exerting uneven uplift on slabs and perimeter beams. Mature trees in Berry Creek and Teravista, poor downspout discharge, and irrigation overspray against foundations compound the cycle—hairline cracks are not always emergencies, but progressive door binding is.",
      "Slab-on-grade Sun City ranches and newer Wolf Ranch pours behave differently from pier-and-beam remnants near Georgetown Village. A foundation repair contractor who measures deflection, documents pier depth plans, and addresses drainage before selling an all-piers pitch prevents fighting soil movement with structural lifts alone.",
      "Post-storm soil saturation followed by rapid drying—common after Central Texas downpours—can accelerate seasonal movement. Local engineers and contractors know Williamson County soil profiles better than national franchise scripts that treat every home as the same pier count.",
    ],
  },
  "house-cleaning-georgetown-tx": {
    pricingKey: "cleaning",
    neighborhoodServiceSlug: "house-cleaning",
    tradeNoun: "house cleaning service",
    tradeLabel: "House Cleaning",
    whyHireParagraphs: [
      "Georgetown's hard Edwards Aquifer water leaves mineral film on glass, fixtures, and shower doors faster than in soft-water markets—crews who know how to descale without etching finishes save hours on every deep clean. Sun City retirees and snowbird schedules mean guest-ready turnovers spike around holidays and tournament weeks.",
      "Two-story Teravista homes with tall foyer glass and Wolf Ranch open plans change how teams stage supplies and ladder safely. Historic Georgetown Village homes with original wood trim and specialty tile need product discipline that generic national checklists ignore.",
      "Pet hair from indoor/outdoor dogs, pollen tracked in during cedar and oak seasons, and clay dust from construction in growing subdivisions all affect realistic visit times. A local house cleaning service that prices square footage, bath count, and clutter honestly beats flat national quotes that underestimate Georgetown realities.",
    ],
  },
};

export function isCoreServiceEnrichmentSlug(slug: string): slug is CoreServiceEnrichmentSlug {
  return (CORE_SERVICE_ENRICHMENT_SLUGS as readonly string[]).includes(slug);
}

export function getCoreServiceEnrichment(slug: string): CoreServiceEnrichment | null {
  if (!isCoreServiceEnrichmentSlug(slug)) return null;
  return CORE_SERVICE_ENRICHMENT[slug];
}

/** Three or more `/neighborhoods/[area]/[service]` links for a core service guide. */
export function neighborhoodLandingLinksForCoreService(serviceSlug: string): InternalLink[] {
  const config = getCoreServiceEnrichment(serviceSlug);
  if (!config) return [];

  return NEIGHBORHOOD_LINK_AREAS.flatMap(({ slug, name }) => {
    const page = neighborhoodServicePages.find(
      (p) => p.neighborhoodSlug === slug && p.serviceSlug === config.neighborhoodServiceSlug,
    );
    if (!page) return [];
    return [
      {
        href: `/neighborhoods/${slug}/${config.neighborhoodServiceSlug}`,
        label: `${config.tradeLabel} in ${name}`,
        description: page.intro.slice(0, 160),
      },
    ];
  });
}
