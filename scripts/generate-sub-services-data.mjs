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

function localForSlug(serviceSlug, slug, name) {
  const key = `${serviceSlug}/${slug}`;
  if (PAGE[key]?.local) return PAGE[key].local;

  const job = slug.replace(/-/g, " ");
  const bySlug = {
    "hvac/ac-repair": `${name} spikes when Georgetown heat indexes top 105°F—capacitors, contactors, and low refrigerant are the usual suspects before anyone talks full replacement.`,
    "hvac/ac-installation": `${name} must be sized for long Central Texas cooling seasons; undersized equipment struggles in Sun City guest weeks and two-story Teravista plans.`,
    "hvac/furnace-repair": `${name} shows up on the coldest Georgetown nights—flame sensors, inducer motors, and cracked heat exchangers are common on furnaces that sit idle most of the year.`,
    "hvac/heat-pump-installation": `${name} pairs heating and cooling in one box; Wolf Ranch high-efficiency builds often need electrical and line-set planning before install day.`,
    "hvac/air-duct-cleaning": `${name} targets cedar pollen, drywall dust, and pet dander in return runs—especially in homes with long attic trunks and rarely changed filters.`,
    "hvac/emergency-hvac": `${name} calls jump in July when systems run near continuously; know your shutoffs and filter size before the after-hours truck rolls.`,
    "hvac/hvac-maintenance": `${name} before summer focuses on coil cleaning, drain lines, and amp draws—not just swapping a filter.`,
    "hvac/mini-split-installation": `${name} helps room additions and garage conversions where duct extensions are impractical; line-set routing through brick and stucco matters in Georgetown Village.`,
    "plumbing/pipe-repair": `${name} in older Georgetown stock may mean copper pinholes, polybutylene, or irrigation cross-connections—not every leak is a slab job.`,
    "plumbing/leak-detection": `${name} separates irrigation losses from domestic lines before anyone cuts concrete in Sun City slab homes.`,
    "plumbing/water-filtration": `${name} pairs with hard Edwards Aquifer water—softeners protect fixtures while RO improves drinking taste.`,
    "roofing/hail-damage-repair": `${name} follows Williamson County spring storms; document with photos before insurers or roofers scope repairs.`,
    "roofing/metal-roofing": `${name} handles hail better than asphalt in some cases but needs correct flashing at Georgetown's hard-driving rain.`,
    "roofing/flat-roofing": `${name} on porches and low-slope additions needs drainage planning—ponding shows up after slow Texas rains.`,
    "electrical/ev-charger-installation": `${name} often triggers panel evaluations in Teravista and Wolf Ranch garages built before EV load was common.`,
    "electrical/generator-installation": `${name} rises after outage seasons; transfer switches and gas line work must be permitted.`,
    "foundation/crack-repair": `${name} starts with monitoring—hairline shrinkage cracks differ from widening gaps tied to clay movement.`,
    "foundation/waterproofing": `${name} pairs with drainage when clay swells against slabs after heavy Williamson County rains.`,
    "cleaning/deep-cleaning": `${name} tackles pollen, hard-water film, and baseboards that standard visits skip in busy Sun City households.`,
    "pest-control/scorpion-control": `${name} targets species active along limestone edges and patio lights in warm Georgetown evenings.`,
  };
  if (bySlug[key]) return bySlug[key];

  const tradeLead = {
    plumbing: `For ${job}, hard water and mature sewer lines in Georgetown mean mineral buildup and roots show up sooner than national averages suggest.`,
    hvac: `For ${job}, equipment runs longer here than in northern climates—pollen, heat, and attic access shape every quote.`,
    roofing: `For ${job}, hail history and HOA shingle rules in Sun City and Wolf Ranch affect both materials and labor.`,
    electrical: `For ${job}, panel age and permit requirements in Georgetown city limits can add time beyond the visible repair.`,
    landscaping: `For ${job}, clay soil and watering rules change how crews schedule installs and maintenance.`,
    "pest-control": `For ${job}, Central Texas species and seasonal humidity drive treatment plans—not one chemical fits every eave.`,
    foundation: `For ${job}, expansive clay movement is the backdrop—drainage and pier counts matter as much as crack width.`,
    cleaning: `For ${job}, cedar pollen and limestone dust mean more frequent deep work than in softer-water markets.`,
  };
  return tradeLead[serviceSlug] ?? `${name} in Georgetown varies by home age, access, and whether the job is emergency or planned.`;
}

const WEATHER_CONTEXT = {
  plumbing: (job) =>
    `Hard water and drought-stressed clay can turn a small ${job} scope into a larger repair once a plumber opens a wall chase or tests under a slab.`,
  hvac: (job) =>
    `July heat and cedar pollen often expose weak capacitors or clogged coils during ${job}—symptoms that looked minor in spring can fail under full summer load.`,
  roofing: (job) =>
    `Spring hail and wind can widen a ${job} scope once tear-off exposes soft decking or bruised mats that were invisible from the curb.`,
  electrical: (job) =>
    `Summer AC load and storm outages stress panels during ${job}; heat in attics and garages slows safe wire pulls in two-story Teravista homes.`,
  landscaping: (job) =>
    `Drought restrictions and heavy rain swings affect ${job} timing—clay soil in Berry Creek and Georgetown Village holds or sheds water differently than newer Wolf Ranch lots.`,
  "pest-control": (job) =>
    `Rain pushes ants and roaches toward slabs after ${job}; Central Texas humidity changes how long perimeter barriers stay effective.`,
  foundation: (job) =>
    `Dry summers shrink clay and wet winters swell it—${job} quotes should account for seasonal movement, not just today's crack width.`,
  cleaning: (job) =>
    `Pollen season and hard-water film make ${job} tougher than in softer-water markets; plan deep work after spring storms if guests are coming.`,
};

const WORKFLOW = {
  plumbing: [
    (job) => `On ${job}, expect shutoff confirmation, floor protection, and a pressure or flow test before walls are closed.`,
    (job) => `Ask whether camera footage is included on ${job}—Georgetown clay lines often need video before hydro-jetting.`,
  ],
  hvac: [
    (job) => `A solid ${job} visit records supply/return temps and documents part numbers before replacement is recommended.`,
    (job) => `For ${job}, confirm whether refrigerant work is itemized by pound and if the diagnostic fee applies to repair labor.`,
  ],
  roofing: [
    (job) => `${job} work should include photos of decking and penetrations before materials are ordered.`,
    (job) => `On ${job}, verify whether tear-off debris haul-away and permit pulls are in the base price.`,
  ],
  electrical: [
    (job) => `${job} should end with labeled circuits, passed inspection when required, and written warranty terms.`,
    (job) => `For ${job}, confirm permit responsibility and whether drywall patching is excluded on older Georgetown walls.`,
  ],
  landscaping: [
    (job) => `${job} visits should note irrigation runtimes and any city watering restrictions that affect scheduling.`,
    (job) => `On ${job}, confirm plant warranty length and who waters new installs during the first dry week.`,
  ],
  "pest-control": [
    (job) => `${job} plans should list products used indoors, re-entry time, and how many follow-ups are included.`,
    (job) => `For ${job}, ask how entry points are sealed—not only where bait or spray is applied.`,
  ],
  foundation: [
    (job) => `${job} proposals should show pier locations, lift tolerances, and plumbing tests after stabilization.`,
    (job) => `On ${job}, drainage corrections belong in the same conversation as pier counts for clay soil.`,
  ],
  cleaning: [
    (job) => `${job} crews should walk the home with you on first visit to agree on rooms, supplies, and off-limit areas.`,
    (job) => `For ${job}, confirm whether ovens, fridges, and interior windows are in scope or priced separately.`,
  ],
};

const TYPICAL_SCOPE = {
  plumbing: (name, job) =>
    `Most ${job} calls in Georgetown start with shutting off water at the fixture or main, then isolating whether the issue is a branch line, vent, or supply failure before parts are ordered.`,
  hvac: (name, job) =>
    `Technicians usually measure temperature split and static pressure on ${job} visits here before recommending capacitors, refrigerant work, or airflow fixes—guesswork is common on busy August afternoons.`,
  roofing: (name, job) =>
    `${name} estimates should note shingle class, underlayment, flashing at penetrations, and whether decking allowance is included—Georgetown hail history makes those line items non-optional on many slopes.`,
  electrical: (name, job) =>
    `Licensed electricians document panel capacity, wire gauge, and permit needs on ${job} jobs—older Georgetown homes near the Square often need arc-fault upgrades when circuits are extended.`,
  landscaping: (name, job) =>
    `${job} scopes should spell out visit frequency, mulch depth, irrigation zones, and who hauls debris—clay soil and watering restrictions change what survives a Georgetown summer.`,
  "pest-control": (name, job) =>
    `Good ${job} plans name target species, interior vs exterior treatment, re-service windows, and drying times—fire ants and roof rats flare differently after Williamson County rain.`,
  foundation: (name, job) =>
    `${job} evaluations should include elevation or crack monitoring data, pier type, and drainage recommendations—clay movement without moisture control often retriggers repairs.`,
  cleaning: (name, job) =>
    `${name} checklists should list rooms, baseboards, supplies, and cancellation rules—hard-water film and cedar pollen mean Georgetown deep cleans take longer than national checklists suggest.`,
};

const LICENSE_LINE = {
  plumbing: "Verify a valid TSBPE plumbing license and general liability insurance before work starts.",
  hvac: "Verify a TDLR HVAC license, EPA refrigerant certification where applicable, and insurance.",
  roofing: "Confirm insurance, local references, and written warranty terms—Texas does not license roofers at the state level.",
  electrical: "Verify a Texas electrical license and insurance; panel and new-circuit work usually requires permits in Georgetown.",
  landscaping: "Confirm workers' compensation and liability insurance, plus a written scope for visit frequency and bed work.",
  "pest-control": "Verify a TPCL applicator license and ask which products will be used indoors vs along the perimeter.",
  foundation: "Ask for a documented repair plan, pier specifications, and transferable warranty terms—not a verbal walk-through only.",
  cleaning: "Confirm liability insurance, background-check policy, and a written checklist for standard vs deep cleans.",
};

function slugHash(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h;
}

const HOOD_LINES = [
  (hoodNames, job) =>
    `Quotes in ${hoodNames} often run higher than central Georgetown when crews factor HOA gates, narrow lots, or long attic runs—ask what is included in the trip fee.`,
  (hoodNames, job) =>
    `${hoodNames} mixes slab and two-story stock; ${job} access through garages, crawl spaces, or steep roof planes changes labor more than parts.`,
  (hoodNames, job) =>
    `Drive time from west Williamson County affects ${job} scheduling in ${hoodNames}—book non-emergency work before summer storm surges if you can.`,
];

const HIRING_LINES = [
  (job) =>
    `Compare two written ${job} scopes with line items for labor, materials, permits, and warranty—verbal allowances invite change orders.`,
  (job) =>
    `A solid ${job} bid states what happens if hidden damage appears after tear-off or wall opening; get that in writing before work starts.`,
  (job) =>
    `For ${job}, ask whether the trip or diagnostic fee applies toward repair if you proceed the same day—policies differ across Georgetown shops.`,
];

const DIY_LINES = [
  (name, serviceSlug) =>
    `${name} crosses permit or safety lines in most Georgetown homes—DIY makes sense only for tasks your city explicitly allows homeowners to perform.`,
  (name) =>
    `Skip DIY on ${name} when manufacturer warranties, gas, refrigerant, or structural loads are involved; the savings rarely cover a failed inspection.`,
  (name, serviceSlug) =>
    serviceSlug === "landscaping" || serviceSlug === "cleaning"
      ? `Light ${name.toLowerCase()} prep is fine DIY; equipment rental, chemical, or height work belongs on a pro's scope.`
      : `${name} on live systems needs licensed pros in Texas—budget for permits where the city requires them.`,
];

function buildBody(name, serviceLabel, local, serviceSlug, slug, hoods) {
  const hoodNames = hoods.map((h) => NEIGHBORHOODS[h]).join(" and ");
  const job = slug.replace(/-/g, " ");
  const key = `${serviceSlug}/${slug}`;
  const h = slugHash(key);
  const weather =
    WEATHER_CONTEXT[serviceSlug]?.(job) ??
    `Local weather and soil still shape ${job} outcomes in Williamson County—plan for heat, storms, and access limits.`;
  const license = LICENSE_LINE[serviceSlug] ?? "Verify appropriate licensing and insurance for this trade.";
  return [
    local,
    HOOD_LINES[h % HOOD_LINES.length](hoodNames, job),
    (TYPICAL_SCOPE[serviceSlug] ?? ((n, j) => `Scope ${j} clearly before authorizing work.`))(name, job),
    (WORKFLOW[serviceSlug]?.[(h + 1) % 2] ?? ((j) => `Document the ${j} scope in writing before work starts.`))(job),
    weather,
    HIRING_LINES[(h + 3) % HIRING_LINES.length](job),
    license,
    DIY_LINES[(h + 7) % DIY_LINES.length](name, serviceSlug),
    `Use the price table as a ${new Date().getFullYear()} planning band, then open the ${serviceLabel.toLowerCase()} hub for related guides and neighborhood pages.`,
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

function defaultFaqs(name, serviceLabel, serviceSlug, slug) {
  const job = slug.replace(/-/g, " ");
  const licenseHint =
    serviceSlug === "plumbing"
      ? "a TSBPE-licensed plumber"
      : serviceSlug === "hvac"
        ? "a TDLR-licensed HVAC contractor"
        : serviceSlug === "electrical"
          ? "a licensed electrician"
          : serviceSlug === "pest-control"
            ? "a TPCL-licensed applicator"
            : "a insured contractor with verifiable local references";
  return {
    faq1: `How much does ${job} cost in Georgetown, TX?`,
    faq1a: `Use the table on this page as a ${new Date().getFullYear()} planning range. Final ${job} pricing depends on access, parts, permits, and whether the call is emergency or scheduled.`,
    faq2: `Who should I hire for ${job} in Georgetown?`,
    faq2a: `Shortlist ${licenseHint}, compare two written scopes, and read recent reviews from Williamson County homeowners—not just national brand advertising.`,
    faq3: `When is the best time to schedule ${job}?`,
    faq3a:
      serviceSlug === "hvac" || serviceSlug === "roofing"
        ? "Book non-emergency work in spring or fall; summer AC failures and post-hail roofing stack schedules quickly."
        : "Off-peak weeks outside holidays and storm surges usually mean better availability and steadier pricing.",
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
    const local = localForSlug(serviceSlug, slug, name);
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
      : defaultFaqs(name, cfg.label, serviceSlug, slug);
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
