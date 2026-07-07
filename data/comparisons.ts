import type { Provider, ProviderCategory } from "./providers";
import { PROVIDERS } from "./providers";

export type ComparisonProvider = Provider & {
  yearsInBusiness?: number;
  responseTime: string;
  writtenEstimates: boolean;
  emergencyAvailability: string;
};

export type ProviderComparison = {
  slug: string;
  category: ProviderCategory;
  categoryLabel: string;
  serviceSlug: string;
  bestSlug: string;
  angiCategorySlug: string;
  thumbtackCategory: string;
  providerA: ComparisonProvider;
  providerB: ComparisonProvider;
  bottomLine: string;
  faqs: { q: string; a: string }[];
  metaDescription: string;
};

export const COMPARISON_YEAR = "2026";

export const COMPARISON_CATEGORY_ORDER: ProviderCategory[] = [
  "hvac",
  "plumbing",
  "roofing",
  "electrical",
  "landscaping",
  "foundation",
  "cleaning",
];

const CATEGORY_META: Record<
  ProviderCategory,
  {
    categoryLabel: string;
    serviceSlug: string;
    bestSlug: string;
    angiCategorySlug: string;
    thumbtackCategory: string;
  }
> = {
  plumbing: {
    categoryLabel: "Plumbing",
    serviceSlug: "plumber-georgetown-tx",
    bestSlug: "best-plumbers-georgetown-tx",
    angiCategorySlug: "plumbing",
    thumbtackCategory: "plumbers",
  },
  hvac: {
    categoryLabel: "HVAC",
    serviceSlug: "hvac-georgetown-tx",
    bestSlug: "top-hvac-companies-georgetown-tx",
    angiCategorySlug: "hvac",
    thumbtackCategory: "hvac-contractors",
  },
  roofing: {
    categoryLabel: "Roofing",
    serviceSlug: "roofer-georgetown-tx",
    bestSlug: "best-roofers-georgetown-tx",
    angiCategorySlug: "roofing",
    thumbtackCategory: "roofers",
  },
  electrical: {
    categoryLabel: "Electrical",
    serviceSlug: "electrician-georgetown-tx",
    bestSlug: "best-electricians-georgetown-tx",
    angiCategorySlug: "electrical",
    thumbtackCategory: "electricians",
  },
  landscaping: {
    categoryLabel: "Landscaping",
    serviceSlug: "landscaping-georgetown-tx",
    bestSlug: "best-landscaping-companies-georgetown-tx",
    angiCategorySlug: "landscaping",
    thumbtackCategory: "landscaping",
  },
  "pest-control": {
    categoryLabel: "Pest Control",
    serviceSlug: "pest-control-georgetown-tx",
    bestSlug: "best-pest-control-georgetown-tx",
    angiCategorySlug: "pest-control",
    thumbtackCategory: "pest-control",
  },
  foundation: {
    categoryLabel: "Foundation Repair",
    serviceSlug: "foundation-repair-georgetown-tx",
    bestSlug: "best-foundation-repair-georgetown-tx",
    angiCategorySlug: "foundation-repair",
    thumbtackCategory: "foundation-repair",
  },
  cleaning: {
    categoryLabel: "House Cleaning",
    serviceSlug: "house-cleaning-georgetown-tx",
    bestSlug: "best-house-cleaning-services-georgetown-tx",
    angiCategorySlug: "house-cleaning",
    thumbtackCategory: "house-cleaning",
  },
};

function providerByName(name: string): Provider {
  const found = PROVIDERS.find((p) => p.name === name);
  if (!found) throw new Error(`Provider not found in providers.ts: ${name}`);
  return found;
}

function asComparison(
  base: Provider,
  extra: Pick<ComparisonProvider, "responseTime" | "writtenEstimates" | "emergencyAvailability">,
): ComparisonProvider {
  return { ...base, ...extra };
}

type ComparisonInput = {
  slug: string;
  category: ProviderCategory;
  providerA: ComparisonProvider;
  providerB: ComparisonProvider;
  bottomLine: string;
  faqs: { q: string; a: string }[];
  metaDescription: string;
};

function buildComparison(input: ComparisonInput): ProviderComparison {
  const meta = CATEGORY_META[input.category];
  return { ...meta, ...input };
}

const COMPARISONS: ProviderComparison[] = [
  buildComparison({
    slug: "team-enoch-vs-goettl-georgetown-tx",
    category: "hvac",
    providerA: {
      name: "Team Enoch",
      phone: "(512) 888-8181",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Team+Enoch+Austin+TX+HVAC",
      rating: 4.9,
      reviewCount: 1058,
      yearsInBusiness: 15,
      serviceArea: "Georgetown, Round Rock, Austin, Cedar Park",
      specialties: ["Full HVAC replacements", "Multi-trade plumbing and electrical", "New equipment financing"],
      featured: false,
      category: "hvac",
      description:
        "Regional home-services company serving the Austin metro including Georgetown with HVAC, plumbing, electrical, and roofing.",
      city: "Austin",
      state: "TX",
      responseTime: "Same-day or next-day for many calls",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency HVAC available",
    },
    providerB: {
      name: "Goettl Air Conditioning & Plumbing",
      phone: "(512) 422-1722",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Goettl+Air+Conditioning+Plumbing+Austin+TX",
      rating: 4.8,
      reviewCount: 3820,
      yearsInBusiness: 85,
      serviceArea: "Georgetown, Round Rock, Hutto, Cedar Park",
      specialties: ["AC Rejuuuvenation maintenance", "24/7 repair dispatch", "Plumbing and water heaters"],
      featured: false,
      category: "hvac",
      description:
        "Large regional HVAC and plumbing brand with 24/7 Austin metro coverage including Georgetown and Round Rock.",
      city: "Austin",
      state: "TX",
      responseTime: "Often same-day; 24-hour answering",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency service",
    },
    bottomLine:
      "Team Enoch is often the better fit when you want a single contractor for larger HVAC replacements, bundled trades, or complex whole-home upgrades with financing. Goettl is stronger when you need fast repair dispatch, membership-style maintenance, and a large technician bench for peak summer volume—compare written replacement quotes from both before deciding.",
    faqs: [
      {
        q: "Does Team Enoch or Goettl serve Georgetown TX?",
        a: "Both companies list Georgetown in their Austin-metro service areas. Confirm dispatch times for your ZIP, after-hours fees, and whether the technician assigned to your job holds a Texas HVAC license before authorizing work.",
      },
      {
        q: "Which is better for emergency AC repair in Georgetown?",
        a: "Goettl emphasizes 24/7 answering and rapid repair dispatch across Williamson County. Team Enoch also offers emergency coverage but is frequently chosen for larger replacement projects. For a no-cool weekend, ask each company for earliest arrival window and trip/diagnostic fees in writing.",
      },
      {
        q: "Should I get multiple HVAC quotes in Georgetown before choosing?",
        a: "Yes. Even when narrowing to two companies, request itemized scopes that list equipment model numbers, labor, permits, and warranty terms. Georgetown clay-soil homes and long cooling seasons make installation quality as important as brand name.",
      },
    ],
    metaDescription:
      "Team Enoch vs Goettl in Georgetown TX (2026): compare HVAC ratings, response times, emergency service, and which company fits your repair or replacement project.",
  }),
  buildComparison({
    slug: "airwise-vs-roger-stuth-ac-georgetown-tx",
    category: "hvac",
    providerA: {
      name: "AirWise, Inc.",
      phone: "(512) 931-2247",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=AirWise+Inc+100+Neches+Tr+Georgetown+TX",
      rating: 4.8,
      reviewCount: 92,
      yearsInBusiness: 26,
      serviceArea: "Georgetown, Round Rock, Cedar Park, Liberty Hill",
      specialties: ["Owner-operated diagnostics", "Commercial refrigeration", "Written estimates on repairs"],
      featured: false,
      category: "hvac",
      description: "Family-owned Georgetown HVAC contractor since 1999 serving residential and light commercial clients.",
      address: "100 Neches Tr.",
      city: "Georgetown",
      state: "TX",
      postalCode: "78628",
      responseTime: "Same-day when available; after-hours by appointment",
      writtenEstimates: true,
      emergencyAvailability: "Emergency service available 24/7 (by appointment weekends)",
    },
    providerB: {
      name: "Roger Stuth Air Conditioning",
      phone: "(512) 868-7191",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Roger+Stuth+Air+Conditioning+1608+Williams+Dr+Georgetown+TX",
      rating: 4.9,
      reviewCount: 55,
      yearsInBusiness: 45,
      serviceArea: "Georgetown, Lakeway, West Austin",
      specialties: ["Honest repair-first approach", "Heat pump replacements", "Low-pressure sales style"],
      featured: false,
      category: "hvac",
      description:
        "Long-running owner-led HVAC company in Georgetown known for straightforward diagnostics and repair-first recommendations.",
      address: "1608 Williams Dr",
      city: "Georgetown",
      state: "TX",
      postalCode: "78628",
      responseTime: "Often within 24 hours; same-day when possible",
      writtenEstimates: true,
      emergencyAvailability: "Emergency calls accepted; owner-led crew",
    },
    bottomLine:
      "AirWise is a strong pick for Georgetown homeowners who want a established local shop with commercial-grade expertise and flexible scheduling across Williamson County. Roger Stuth Air Conditioning shines when you prefer an owner-operator who prioritizes repair-first honesty and smaller-team accountability—especially if you have been quoted unnecessary replacements elsewhere.",
    faqs: [
      {
        q: "Is AirWise or Roger Stuth better for Georgetown homeowners?",
        a: "AirWise offers broader crew capacity and commercial refrigeration experience; Roger Stuth is prized for personal service and conservative repair recommendations. Match the company to your project—multi-system maintenance vs. a targeted repair or heat-pump replacement.",
      },
      {
        q: "Do AirWise and Roger Stuth offer free estimates?",
        a: "Both advertise written estimates and transparent scopes. Confirm whether diagnostic fees apply toward repair work, and ask for model numbers and warranty terms on any replacement quote.",
      },
      {
        q: "Which company has stronger public ratings in Georgetown?",
        a: "Both show strong Google star ratings for Williamson County HVAC work. Read recent feedback for your job type (repair vs. full replacement) and compare written scopes—not headline numbers alone.",
      },
    ],
    metaDescription:
      "AirWise vs Roger Stuth AC in Georgetown TX (2026): compare local HVAC ratings, response times, and which contractor fits repairs vs. replacements.",
  }),
  buildComparison({
    slug: "mr-rooter-vs-roto-rooter-georgetown-tx",
    category: "plumbing",
    providerA: {
      name: "Mr. Rooter Plumbing of Austin",
      phone: "(512) 864-3001",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Mr+Rooter+Plumbing+Austin+TX",
      rating: 4.7,
      reviewCount: 752,
      yearsInBusiness: 30,
      serviceArea: "Georgetown, Round Rock, Cedar Park, Lakeway",
      specialties: ["24/7 drain clearing", "Water heater installs", "Franchise-standard pricing menus"],
      featured: false,
      category: "plumbing",
      description: "Neighborhoodly franchise plumber serving the Austin metro including Georgetown with 24/7 dispatch.",
      city: "Austin",
      state: "TX",
      responseTime: "Same-day for many emergencies",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency plumbing",
    },
    providerB: {
      name: "Roto-Rooter Plumbing & Water Cleanup",
      phone: "(512) 869-0808",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Roto-Rooter+Plumbing+Georgetown+TX",
      rating: 4.8,
      reviewCount: 1200,
      serviceArea: "Georgetown, Round Rock, Austin metro",
      specialties: ["Drain and sewer clearing", "Camera inspections", "Water damage cleanup"],
      featured: false,
      category: "plumbing",
      description:
        "National drain and plumbing brand with Georgetown-area dispatch for clogs, sewer lines, and water cleanup.",
      city: "Georgetown",
      state: "TX",
      responseTime: "Often within hours for emergencies",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency drain and sewer service",
    },
    bottomLine:
      "Mr. Rooter is the better default when you want a large dispatch network, uniform pricing menus, and 24/7 coverage across Williamson County. Roto-Rooter is often the faster call for stubborn drain and sewer clogs, camera inspections, and water cleanup tied to backups—compare trip fees and warranty terms before you choose.",
    faqs: [
      {
        q: "Does Mr. Rooter serve Georgetown TX?",
        a: "Yes. Mr. Rooter Plumbing of Austin lists Georgetown among its service cities. Ask for the diagnostic fee, whether it applies to repair, and estimated arrival for your ZIP before booking.",
      },
      {
        q: "Mr. Rooter vs Roto-Rooter for drain clogs?",
        a: "Both handle drain clearing and emergencies. Roto-Rooter is nationally known for sewer and drain machines plus water cleanup. Mr. Rooter offers broader general plumbing. For recurring clogs, ask either company about camera inspections and root intrusion.",
      },
      {
        q: "Are these plumbers licensed in Texas?",
        a: "Confirm the active Texas State Board of Plumbing Examiners (TSBPE) license for the company and the technician assigned to your job. Written estimates should list labor, parts, and any after-hours surcharges.",
      },
    ],
    metaDescription:
      "Mr. Rooter vs Roto-Rooter in Georgetown TX (2026): compare plumbing ratings, emergency response, drain service, and which company to hire.",
  }),
  buildComparison({
    slug: "champion-ac-plumbing-vs-local-plumber-georgetown-tx",
    category: "plumbing",
    providerA: {
      name: "Champion Cooling, Heating & Plumbing",
      phone: "(512) 575-4377",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Champion+Cooling+Heating+Plumbing+Austin+TX",
      rating: 4.7,
      reviewCount: 210,
      yearsInBusiness: 18,
      serviceArea: "Georgetown, Wolf Ranch, Sun City, Round Rock",
      specialties: ["HVAC and plumbing under one roof", "24/7 live answering", "New construction warranty support"],
      featured: false,
      category: "plumbing",
      description:
        "Austin-based home-comfort company serving Georgetown with combined HVAC and plumbing crews for repairs and replacements.",
      city: "Austin",
      state: "TX",
      responseTime: "Same-day slots often available",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency HVAC and plumbing dispatch",
    },
    providerB: asComparison(providerByName("Reliant Plumbing"), {
      responseTime: "Same-day for many service calls",
      writtenEstimates: true,
      emergencyAvailability: "Emergency plumbing available",
    }),
    bottomLine:
      "Champion is the better fit when you want one contractor to coordinate HVAC and plumbing—especially in newer Georgetown subdivisions still inside warranty windows. Reliant Plumbing is the stronger local specialist for repipes, slab leaks, and plumbing-only projects where depth of trade focus matters more than bundled dispatch.",
    faqs: [
      {
        q: "Does Champion AC serve Georgetown for plumbing?",
        a: "Yes. Champion Cooling, Heating & Plumbing advertises Georgetown service including Wolf Ranch and Sun City. Confirm whether a plumbing-specific technician will be dispatched and whether HVAC membership discounts apply to plumbing visits.",
      },
      {
        q: "Champion vs a local Georgetown plumber—who should I hire?",
        a: "Choose Champion for combined HVAC/plumbing convenience and 24/7 answering. Choose a local specialist like Reliant when you need repiping, slab leak diagnosis, or complex plumbing scopes without HVAC upsells.",
      },
      {
        q: "What should I ask both companies before hiring?",
        a: "Request line-item estimates, license numbers, insurance certificates, and how change orders are handled if the scope expands after opening walls or slab access.",
      },
    ],
    metaDescription:
      "Champion AC Plumbing vs Reliant Plumbing in Georgetown TX (2026): compare ratings, emergency service, and HVAC+bundled vs local specialist trade-offs.",
  }),
  buildComparison({
    slug: "apex-roofing-vs-ark-roofer-georgetown-tx",
    category: "roofing",
    providerA: asComparison(providerByName("APEX Roofing"), {
      responseTime: "Inspections often within a few days",
      writtenEstimates: true,
      emergencyAvailability: "Storm and leak triage available",
    }),
    providerB: asComparison(providerByName("Ark Roofer"), {
      responseTime: "Fast inspection scheduling; proactive updates",
      writtenEstimates: true,
      emergencyAvailability: "Storm damage and emergency tarping",
    }),
    bottomLine:
      "APEX Roofing is ideal for high-volume replacement projects with established Williams Drive presence and hundreds of Williamson County reviews. Ark Roofer is often chosen for drone-documented inspections, hail claims support, and white-glove communication during storm season—get both bids if you are comparing insurance documentation quality.",
    faqs: [
      {
        q: "APEX Roofing vs Ark Roofer—which has more reviews?",
        a: "Both carry strong Google review volume in Georgetown. APEX lists 600+ reviews; Ark Roofer shows 460+ five-star ratings. Compare recent storm-season feedback, not just totals.",
      },
      {
        q: "Do these roofers help with insurance claims in Georgetown?",
        a: "Both advertise storm damage inspections and documentation. Ask who attends the adjuster meeting, whether supplements are included, and how temporary dry-in is handled before permanent repair.",
      },
      {
        q: "How many roofing quotes should I get in Georgetown?",
        a: "Collect at least three written scopes for replacements. For repairs, two detailed quotes are usually enough if they list materials, flashing, and ventilation work separately.",
      },
    ],
    metaDescription:
      "APEX Roofing vs Ark Roofer in Georgetown TX (2026): compare roofer ratings, storm work, and which company fits repair vs. full replacement.",
  }),
  buildComparison({
    slug: "texas-traditions-roofing-vs-apex-roofing-georgetown-tx",
    category: "roofing",
    providerA: asComparison(providerByName("Texas Traditions Roofing"), {
      responseTime: "Responsive local scheduling",
      writtenEstimates: true,
      emergencyAvailability: "Storm stabilization and repairs",
    }),
    providerB: asComparison(providerByName("APEX Roofing"), {
      responseTime: "Inspections often within a few days",
      writtenEstimates: true,
      emergencyAvailability: "Storm and leak triage available",
    }),
    bottomLine:
      "Texas Traditions Roofing is a Georgetown Chamber–connected local shop well suited to neighborhood repairs, ventilation upgrades, and homeowners who want a Cedar Drive office nearby. APEX brings larger crew capacity and higher review volume for full replacements—especially when timing and throughput matter after widespread hail.",
    faqs: [
      {
        q: "Is Texas Traditions Roofing local to Georgetown?",
        a: "Yes. Texas Traditions Roofing operates from Georgetown on Cedar Drive and markets itself as a local Chamber member serving Williamson County.",
      },
      {
        q: "Texas Traditions vs APEX for roof replacement?",
        a: "Compare shingle brands, ventilation plans, warranty length, and start dates. Larger companies may finish faster; boutique locals may provide more owner oversight—ask who supervises tear-off day.",
      },
      {
        q: "What should a Georgetown roofing estimate include?",
        a: "Demand line items for decking repairs, flashing, drip edge, ventilation, haul-off, and permit pulls. Both companies should document existing damage with photos before work begins.",
      },
    ],
    metaDescription:
      "Texas Traditions vs APEX Roofing in Georgetown TX (2026): compare local roofers, ratings, storm repair, and replacement project fit.",
  }),
  buildComparison({
    slug: "cox-electric-vs-odion-electrical-georgetown-tx",
    category: "electrical",
    providerA: asComparison(providerByName("Cox Electric"), {
      responseTime: "Same-day for many calls",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency electrical service",
    }),
    providerB: asComparison(providerByName("Odion Electrical"), {
      responseTime: "Often same-day scheduling",
      writtenEstimates: true,
      emergencyAvailability: "24/7 emergency calls advertised",
    }),
    bottomLine:
      "Cox Electric is the go-to for Georgetown homeowners who need panel upgrades, generators, and Sun City–familiar service with decades of local name recognition. Odion Electrical is often picked for EV charger installs, meticulous panel documentation, and master-electrician-led jobs where code compliance paperwork matters.",
    faqs: [
      {
        q: "Cox Electric vs Odion—which is better for panel upgrades?",
        a: "Both are highly rated. Ask each for load calculations, permit handling, and whether the scope includes meter coordination with the utility. Compare warranty on labor separately from parts.",
      },
      {
        q: "Are these electricians licensed in Georgetown TX?",
        a: "Verify Texas Department of Licensing and Regulation (TDLR) electrical contractor licenses and insurance before work begins. Written estimates should list AFCI/GFCI requirements if panels are expanded.",
      },
      {
        q: "Who should I call for EV charger installation in Georgetown?",
        a: "Odion advertises frequent EV charger work; Cox also serves Sun City and Round Rock with high review volume. Compare conduit paths, breaker sizing, and whether trenching is included.",
      },
    ],
    metaDescription:
      "Cox Electric vs Odion Electrical in Georgetown TX (2026): compare electrician ratings, panels, EV chargers, and emergency service availability.",
  }),
  buildComparison({
    slug: "just-right-lawns-vs-grass-works-georgetown-tx",
    category: "landscaping",
    providerA: {
      name: "Just Right Lawns",
      phone: "(512) 861-7802",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Just+Right+Lawns+Georgetown+TX",
      rating: 4.7,
      reviewCount: 2100,
      serviceArea: "Georgetown, Round Rock, Austin metro",
      specialties: ["Recurring mowing", "Fertilization and weed control", "Aeration programs"],
      featured: false,
      category: "landscaping",
      description:
        "Central Texas lawn care operator with turf programs serving Georgetown homeowners.",
      city: "Georgetown",
      state: "TX",
      responseTime: "Recurring routes on set schedules",
      writtenEstimates: true,
      emergencyAvailability: "Contact for details",
    },
    providerB: {
      name: "Grass Works Lawn Care",
      phone: "(512) 797-0567",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Grass+Works+Lawn+Care+Georgetown+TX",
      rating: 4.9,
      reviewCount: 530,
      serviceArea: "Georgetown, Sun City, Williamson County",
      specialties: ["Lawn maintenance", "Landscape design", "Irrigation repair"],
      featured: false,
      category: "landscaping",
      description: "Georgetown and Sun City lawn care and landscaping with strong local reviews.",
      city: "Georgetown",
      state: "TX",
      responseTime: "Weekly/bi-weekly route scheduling",
      writtenEstimates: true,
      emergencyAvailability: "Contact for details",
    },
    bottomLine:
      "Just Right Lawns is the better fit when you want a high-volume Central Texas turf program with fertilization, weed control, and thousands of regional reviews. Grass Works excels for Sun City and master-planned lots that need design-forward landscaping, irrigation repair, and a locally branded crew focused on Georgetown curb appeal.",
    faqs: [
      {
        q: "Just Right Lawns vs Grass Works for Georgetown lawn care?",
        a: "Compare visit frequency, whether edging and blowing are included, and how they handle HOA requirements in Wolf Ranch or Sun City. Ask for a seasonal calendar—not just per-visit pricing.",
      },
      {
        q: "Do these companies serve Sun City Texas?",
        a: "Both market Georgetown and Sun City coverage. Confirm gate access rules, preferred service days, and whether shrub trimming is included or billed separately.",
      },
      {
        q: "How much does lawn care cost in Georgetown?",
        a: "Pricing depends on lot size and turf program. See our landscaping cost guide, then collect two quotes that specify fertilization, weed control, and irrigation checks.",
      },
    ],
    metaDescription:
      "Just Right Lawns vs Grass Works in Georgetown TX (2026): compare landscaping ratings, lawn programs, and Sun City service coverage.",
  }),
  buildComparison({
    slug: "baird-foundation-vs-centex-foundation-georgetown-tx",
    category: "foundation",
    providerA: asComparison(providerByName("Baird Foundation Repair"), {
      responseTime: "Inspections typically within a week",
      writtenEstimates: true,
      emergencyAvailability: "Contact for details",
    }),
    providerB: {
      name: "CenTex Foundation Repair",
      phone: "(512) 763-0194",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=CenTex+Foundation+Repair+Austin+TX",
      rating: 4.9,
      reviewCount: 180,
      serviceArea: "Georgetown, Austin, Round Rock corridor",
      specialties: ["Engineer evaluations", "Concrete leveling", "Pier installation"],
      featured: false,
      category: "foundation",
      description:
        "Regional foundation repair contractor serving the Austin–Georgetown corridor with evaluations and pier work.",
      city: "Austin",
      state: "TX",
      responseTime: "Free evaluations; flexible scheduling",
      writtenEstimates: true,
      emergencyAvailability: "Contact for details",
    },
    bottomLine:
      "Baird Foundation Repair is strong when you want a Georgetown office, BBB A+ credentials, and pier work with a long Williamson County track record. CenTex Foundation Repair appeals to homeowners seeking engineer-style evaluations and concrete leveling expertise across the Austin–Georgetown corridor—especially if you want a second opinion before major pier installs.",
    faqs: [
      {
        q: "Baird vs CenTex for foundation repair in Georgetown?",
        a: "Both serve clay-soil homes typical of Williamson County. Compare pier types, warranty transferability, and whether drainage corrections are included—not just lifting.",
      },
      {
        q: "Do I need a foundation inspection before selling in Georgetown?",
        a: "Many sellers order independent evaluations if buyers flag sticking doors or diagonal cracks. Either company can document movement; confirm engineering support if your lender requires it.",
      },
      {
        q: "How much does foundation repair cost in Georgetown TX?",
        a: "Costs depend on pier count and interior floor levelness. Use our foundation repair cost guide for planning bands, then demand line-item pier layouts from each bidder.",
      },
    ],
    metaDescription:
      "Baird vs CenTex Foundation Repair in Georgetown TX (2026): compare foundation ratings, pier methods, evaluations, and which company fits your home.",
  }),
  buildComparison({
    slug: "morehands-vs-boardwalk-cleaning-georgetown-tx",
    category: "cleaning",
    providerA: {
      name: "MoreHands Maid Service",
      phone: "(512) 869-1990",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=MoreHands+Maid+Service+Austin+TX",
      rating: 4.8,
      reviewCount: 890,
      serviceArea: "Georgetown, Round Rock, Austin metro",
      specialties: ["Recurring housekeeping", "Deep cleans", "Move-in/move-out"],
      featured: false,
      category: "cleaning",
      description:
        "Regional maid service with long-standing Austin metro coverage including Georgetown and Sun City.",
      city: "Austin",
      state: "TX",
      responseTime: "Recurring slots booked in advance",
      writtenEstimates: true,
      emergencyAvailability: "Contact for details",
    },
    providerB: {
      name: "Boardwalk Cleaning Co.",
      phone: "(512) 842-6209",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Boardwalk+Cleaning+Georgetown+TX",
      rating: 4.9,
      reviewCount: 210,
      serviceArea: "Georgetown, Cedar Park, northern Williamson County",
      specialties: ["Two-person teams", "Move-in/move-out", "Satisfaction guarantee"],
      featured: false,
      category: "cleaning",
      description:
        "Georgetown-area cleaning company offering recurring and deep-clean packages.",
      city: "Georgetown",
      state: "TX",
      responseTime: "Online booking with set arrival windows",
      writtenEstimates: true,
      emergencyAvailability: "Contact for details",
    },
    bottomLine:
      "MoreHands Maid Service is ideal for long-term recurring cleans across Georgetown and Sun City with a 26-year regional presence and high review volume. Boardwalk Cleaning Co. fits homeowners who want two-person teams, a 24-hour satisfaction guarantee, and move-in/move-out packages tailored to northern Williamson County neighborhoods.",
    faqs: [
      {
        q: "MoreHands vs Boardwalk for house cleaning in Georgetown?",
        a: "Compare hourly vs. flat pricing, whether supplies are included, and how teams handle pets or HOA gate access. Ask for the same crew when possible for recurring service.",
      },
      {
        q: "Do these cleaners serve Sun City Texas?",
        a: "Both advertise Sun City and Georgetown coverage. Confirm minimum visit requirements and whether deep-clean add-ons (ovens, baseboards) are priced separately.",
      },
      {
        q: "How much does house cleaning cost in Georgetown TX?",
        a: "Rates vary by square footage and frequency. See our house cleaning cost guide, then request quotes that list what is included in a standard vs. deep clean.",
      },
    ],
    metaDescription:
      "MoreHands vs Boardwalk Cleaning in Georgetown TX (2026): compare maid service ratings, recurring cleans, and Sun City housekeeping options.",
  }),
];

export function comparisonPageTitle(providerA: string, providerB: string): string {
  return `${providerA} vs ${providerB} Georgetown TX (${COMPARISON_YEAR}) | Which to Hire?`;
}

export function comparisonPageH1(providerA: string, providerB: string): string {
  return `${providerA} vs ${providerB} in Georgetown, TX: Which Should You Hire?`;
}

export function getComparisonBySlug(slug: string): ProviderComparison | null {
  return COMPARISONS.find((c) => c.slug === slug) ?? null;
}

export function getAllComparisons(): ProviderComparison[] {
  return COMPARISONS;
}

export function getComparisonsByCategory(category: ProviderCategory): ProviderComparison[] {
  return COMPARISONS.filter((c) => c.category === category);
}

export function getComparisonsForBestSlug(bestSlug: string): ProviderComparison[] {
  return COMPARISONS.filter((c) => c.bestSlug === bestSlug);
}

export const COMPARISON_SLUGS = COMPARISONS.map((c) => c.slug);
