export type ProviderCategory =
  | "plumbing"
  | "hvac"
  | "roofing"
  | "electrical"
  | "landscaping"
  | "pest-control"
  | "foundation"
  | "cleaning";

export type Provider = {
  name: string;
  phone: string;
  googleMapsUrl: string;
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  serviceArea: string;
  specialties: string[];
  featured: boolean;
  category: ProviderCategory;
  /** Short profile for schema.org description. */
  description: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

export const PROVIDERS_LAST_VERIFIED = "June 2026";

export const PROVIDER_DISCLAIMER =
  "Ratings sourced from Google Business Profile at time of last verification. Always confirm current licensing and availability directly.";

const BEST_SLUG_TO_CATEGORY: Record<string, ProviderCategory> = {
  "best-plumbers-georgetown-tx": "plumbing",
  "top-hvac-companies-georgetown-tx": "hvac",
  "best-roofers-georgetown-tx": "roofing",
  "best-electricians-georgetown-tx": "electrical",
  "best-landscaping-companies-georgetown-tx": "landscaping",
  "best-pest-control-georgetown-tx": "pest-control",
  "best-foundation-repair-georgetown-tx": "foundation",
  "best-house-cleaning-services-georgetown-tx": "cleaning",
};

/** Angi list slug keys — must match `lib/affiliates.ts`. */
export const PROVIDER_CATEGORY_ANGI_SLUG: Record<ProviderCategory, string> = {
  plumbing: "plumbing",
  hvac: "hvac",
  roofing: "roofing",
  electrical: "electrical",
  landscaping: "landscaping",
  "pest-control": "pest-control",
  foundation: "foundation-repair",
  cleaning: "house-cleaning",
};

export const PROVIDERS: Provider[] = [
  // ——— Plumbing (5) ———
  {
    name: "Atech Plumbing",
    phone: "(512) 930-6535",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Atech+Plumbing+4500+Williams+Dr+Georgetown+TX",
    rating: 4.8,
    reviewCount: 180,
    yearsInBusiness: 18,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Drain cleaning and hydro-jetting", "Water heater repair and replacement", "Slab leak detection"],
    featured: false,
    category: "plumbing",
    description:
      "Williamson County plumbing company offering drain cleaning, water heater service, leak detection, and slab leak diagnosis.",
    address: "4500 Williams Dr Ste 212",
    city: "Georgetown",
    state: "TX",
    postalCode: "78633",
  },
  {
    name: "Reliant Plumbing",
    phone: "(512) 222-6041",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Reliant+Plumbing+1616+Williams+Dr+Georgetown+TX",
    rating: 4.7,
    reviewCount: 240,
    yearsInBusiness: 12,
    serviceArea: "Georgetown, Liberty Hill, Hutto",
    specialties: ["Whole-home repipes", "Emergency plumbing calls", "Gas line repair"],
    featured: false,
    category: "plumbing",
    description:
      "Full-service plumbing for repairs, repipes, water heaters, and emergency calls across Georgetown and Williamson County.",
    address: "1616 Williams Dr Ste 101",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Sosa Plumbing Services",
    phone: "(737) 372-7233",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sosa+Plumbing+Services+Georgetown+TX",
    rating: 4.9,
    reviewCount: 413,
    yearsInBusiness: 25,
    serviceArea: "Georgetown, Round Rock, Taylor",
    specialties: ["Same-day residential repairs", "Water softener installation", "Sewer and drain service"],
    featured: false,
    category: "plumbing",
    description:
      "Long-running Georgetown plumber known for stocked service vans, upfront pricing, and high-volume Google review satisfaction.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Roto-Rooter Plumbing & Water Cleanup",
    phone: "(512) 930-7444",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Roto-Rooter+Plumbing+Georgetown+TX",
    rating: 4.8,
    reviewCount: 492,
    yearsInBusiness: 35,
    serviceArea: "Georgetown, Cedar Park, Leander",
    specialties: ["24/7 drain and sewer service", "Camera inspections", "Water damage cleanup"],
    featured: false,
    category: "plumbing",
    description:
      "National brand with a Georgetown location for emergency drain clearing, sewer line work, and water cleanup.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Brandenburg Plumbing",
    phone: "(512) 868-5639",
    googleMapsUrl:
      "https://www.google.com/maps/place/Brandenburg+Plumbing/@30.6364174,-98.2637329,17z",
    rating: 4.9,
    reviewCount: 520,
    yearsInBusiness: 20,
    serviceArea: "Georgetown, Sun City, Round Rock",
    specialties: ["Hard-water plumbing solutions", "Tankless water heaters", "Sun City retirement community service"],
    featured: false,
    category: "plumbing",
    description:
      "Plumbing and HVAC team serving Georgetown and Sun City with strong Google ratings and hard-water expertise.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },

  // ——— HVAC (5) ———
  {
    name: "Georgetown Air Conditioning & Heating",
    phone: "(512) 868-1966",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Georgetown+Air+Conditioning+Heating+Georgetown+TX",
    rating: 4.7,
    reviewCount: 193,
    yearsInBusiness: 22,
    serviceArea: "Georgetown, Round Rock, Hutto",
    specialties: ["AC repair and replacement", "Heat pump service", "Seasonal maintenance plans"],
    featured: false,
    category: "hvac",
    description:
      "Locally named Georgetown HVAC contractor for AC and heating repair, installation, and seasonal maintenance.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Neal HVAC",
    phone: "(512) 868-0494",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Neal+HVAC+2006+Rivery+Blvd+Georgetown+TX",
    rating: 4.8,
    reviewCount: 95,
    yearsInBusiness: 15,
    serviceArea: "Georgetown, Cedar Park, Leander",
    specialties: ["Residential AC replacement", "Ductless mini-splits", "Indoor air quality upgrades"],
    featured: false,
    category: "hvac",
    description: "Georgetown HVAC company covering residential AC repair, replacement planning, and heat pump service.",
    address: "2006 Rivery Blvd #111",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "DTC Air Conditioning & Heating",
    phone: "(512) 868-8555",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=DTC+Air+Conditioning+Heating+361+Logan+Ranch+Rd+Georgetown+TX",
    rating: 4.7,
    reviewCount: 110,
    yearsInBusiness: 18,
    serviceArea: "Georgetown, Round Rock, Taylor",
    specialties: ["Same-day AC diagnostics", "System replacement quotes", "I-35 corridor emergency service"],
    featured: false,
    category: "hvac",
    description:
      "AC and heating service across Georgetown and the I-35 corridor; same-day diagnostics and replacement quotes.",
    address: "361 Logan Ranch Rd",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "McCullough Heating & Air Conditioning",
    phone: "(512) 868-2188",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=McCullough+Heating+Air+Conditioning+5120+Airport+Rd+Georgetown+TX",
    rating: 4.9,
    reviewCount: 338,
    yearsInBusiness: 16,
    serviceArea: "Georgetown, Liberty Hill, Jarrell",
    specialties: ["Maintenance membership programs", "Furnace and AC tune-ups", "New construction HVAC"],
    featured: false,
    category: "hvac",
    description:
      "Georgetown HVAC contractor with high review volume, maintenance programs, and residential replacement work.",
    address: "5120 Airport Rd #125",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Austex Air Conditioning & Heating",
    phone: "(512) 246-5400",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Austex+Air+Conditioning+Heating+Georgetown+TX",
    rating: 4.9,
    reviewCount: 368,
    yearsInBusiness: 40,
    serviceArea: "Georgetown, Leander, Cedar Park",
    specialties: ["Honest blower and coil diagnostics", "Family-owned service", "All major HVAC brands"],
    featured: false,
    category: "hvac",
    description:
      "Family-owned HVAC company with decades of experience and hundreds of five-star Google reviews in the Georgetown area.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },

  // ——— Roofing (5) ———
  {
    name: "Texas Traditions Roofing",
    phone: "(512) 942-7663",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Texas+Traditions+Roofing+508+Cedar+Dr+Georgetown+TX",
    rating: 4.8,
    reviewCount: 130,
    yearsInBusiness: 14,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Shingle repair and replacement", "Storm and insurance documentation", "Attic ventilation upgrades"],
    featured: false,
    category: "roofing",
    description:
      "Georgetown-based roofer handling shingle repair, full replacements, and storm/insurance work.",
    address: "508 Cedar Dr",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "APEX Roofing Companies",
    phone: "(512) 523-9700",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=APEX+Roofing+2913+Williams+Dr+Georgetown+TX",
    rating: 4.9,
    reviewCount: 632,
    yearsInBusiness: 12,
    serviceArea: "Georgetown, Cedar Park, Leander",
    specialties: ["Full roof replacements", "Chimney and flashing repair", "Free roof inspections"],
    featured: false,
    category: "roofing",
    description: "Georgetown roofing contractor on Williams Drive; residential repair, replacement, and inspections.",
    address: "2913 Williams Dr Ste 315",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Ark Roofer",
    phone: "(512) 777-1827",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ark+Roofer+Georgetown+TX",
    rating: 5.0,
    reviewCount: 460,
    yearsInBusiness: 8,
    serviceArea: "Georgetown, Round Rock, Hutto",
    specialties: ["Drone-assisted inspections", "Hail damage repair", "Gutter and roof replacement bundles"],
    featured: false,
    category: "roofing",
    description:
      "Central Texas roofer serving Georgetown with high-volume five-star reviews and storm documentation support.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Pearson Family Roofing",
    phone: "(512) 887-1960",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pearson+Family+Roofing+700+Berry+Ln+Georgetown+TX",
    rating: 4.7,
    reviewCount: 188,
    yearsInBusiness: 20,
    serviceArea: "Georgetown, Liberty Hill, Florence",
    specialties: ["Family-owned residential roofing", "Free storm inspections", "Shingle and metal options"],
    featured: false,
    category: "roofing",
    description:
      "Family-owned roofing company offering free inspections, shingle replacement, and storm damage estimates in Williamson County.",
    address: "700 Berry Ln",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Amstill Roofing",
    phone: "(512) 863-6860",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Amstill+Roofing+Georgetown+TX",
    rating: 4.9,
    reviewCount: 180,
    yearsInBusiness: 50,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["RCAT-licensed repairs", "Storm damage restoration", "Energy-efficient roofing systems"],
    featured: false,
    category: "roofing",
    description:
      "Long-established Texas roofing company serving Georgetown with manufacturer-certified repair and replacement work.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },

  // ——— Electrical (5) ———
  {
    name: "Cox Electric",
    phone: "(512) 869-0707",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cox+Electric+707+Serenada+Dr+Georgetown+TX",
    rating: 4.8,
    reviewCount: 120,
    yearsInBusiness: 25,
    serviceArea: "Georgetown, Sun City, Round Rock",
    specialties: ["Panel upgrades and generators", "EV charger installation", "24/7 emergency electrical"],
    featured: false,
    category: "electrical",
    description:
      "Georgetown electrician serving Sun City, Round Rock, and Cedar Park; panels, generators, EV chargers, and lighting.",
    address: "707 Serenada Dr",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Comiskey Electric LLC",
    phone: "(512) 688-0447",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Comiskey+Electric+Georgetown+TX",
    rating: 4.9,
    reviewCount: 75,
    yearsInBusiness: 10,
    serviceArea: "Georgetown, Cedar Park, Austin",
    specialties: ["Veteran-owned residential wiring", "Whole-home rewiring", "One-year workmanship guarantee"],
    featured: false,
    category: "electrical",
    description:
      "Veteran-owned, licensed electrician covering Williamson and Travis Counties with a one-year workmanship guarantee.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Odion Electrical, LLC",
    phone: "(737) 342-3466",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Odion+Electrical+302+Reunion+Ln+Georgetown+TX",
    rating: 4.9,
    reviewCount: 108,
    yearsInBusiness: 8,
    serviceArea: "Georgetown, Round Rock, Hutto",
    specialties: ["Panel and service upgrades", "Outlet and fixture installs", "EV charging stations"],
    featured: false,
    category: "electrical",
    description:
      "Georgetown electrician with strong Google review volume for residential wiring, panel upgrades, and EV chargers.",
    address: "302 Reunion Ln",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "STARFIRE ELECTRIC LLC",
    phone: "(512) 900-5984",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=STARFIRE+ELECTRIC+Georgetown+TX",
    rating: 5.0,
    reviewCount: 135,
    yearsInBusiness: 7,
    serviceArea: "Georgetown, Leander, Cedar Park",
    specialties: ["Residential troubleshooting", "Lighting and ceiling fans", "Code-compliant repairs"],
    featured: false,
    category: "electrical",
    description:
      "Highly rated Georgetown-area electrician focused on residential troubleshooting, lighting, and panel work.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Skilliez Electric",
    phone: "(512) 501-7778",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Skilliez+Electric+Georgetown+TX",
    rating: 4.9,
    reviewCount: 60,
    yearsInBusiness: 9,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["24/7 emergency calls", "RV and 50-amp service installs", "Whole-home electrical upgrades"],
    featured: false,
    category: "electrical",
    description: "Local electrician offering residential wiring, 24/7 emergency service, and EV charger installation.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },

  // ——— Landscaping (5) ———
  {
    name: "Just Right Lawns",
    phone: "(512) 861-7802",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Just+Right+Lawns+Georgetown+TX",
    rating: 4.7,
    reviewCount: 1978,
    yearsInBusiness: 20,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Weekly mowing and edging", "Fertilization and weed control", "Aeration and seasonal cleanups"],
    featured: false,
    category: "landscaping",
    description:
      "Lawn care and turf programs serving Georgetown homeowners with mowing, fertilization, weed control, and aeration.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Grass Works Lawn Care",
    phone: "(512) 797-0567",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Grass+Works+Lawn+Care+Georgetown+TX",
    rating: 4.9,
    reviewCount: 530,
    yearsInBusiness: 18,
    serviceArea: "Georgetown, Sun City, Leander",
    specialties: ["Sun City lawn maintenance", "Landscape design and installation", "Irrigation repair"],
    featured: false,
    category: "landscaping",
    description:
      "Licensed lawn care and landscaping crew serving Georgetown and Sun City with hundreds of five-star reviews.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Clayman Outdoors Landscaping",
    phone: "(512) 259-2382",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Clayman+Outdoors+Landscaping+Georgetown+TX",
    rating: 4.9,
    reviewCount: 210,
    yearsInBusiness: 15,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Landscape design and hardscaping", "Irrigation systems", "Ongoing lawn maintenance"],
    featured: false,
    category: "landscaping",
    description:
      "Georgetown landscaping company offering design, planting, hardscaping, irrigation, and seasonal maintenance.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Clean Scapes",
    phone: "(512) 288-5900",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Clean+Scapes+Austin+TX",
    rating: 4.7,
    reviewCount: 320,
    yearsInBusiness: 22,
    serviceArea: "Georgetown, Cedar Park, Austin",
    specialties: ["Commercial and residential landscaping", "Irrigation and drainage", "Native plant design"],
    featured: false,
    category: "landscaping",
    description:
      "Established Central Texas landscaping company serving Georgetown with design, installation, and maintenance programs.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "YardDoc",
    phone: "(512) 288-5522",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=YardDoc+Georgetown+TX",
    rating: 4.8,
    reviewCount: 520,
    yearsInBusiness: 16,
    serviceArea: "Georgetown, Cedar Park, Austin",
    specialties: ["Organic lawn treatments", "Irrigation audits", "Landscape lighting"],
    featured: false,
    category: "landscaping",
    description:
      "Central Texas landscaping team serving Georgetown with lawn care, irrigation, and outdoor lighting services.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },

  // ——— Pest control (5) ———
  {
    name: "King's Pest Control",
    phone: "(512) 863-7233",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=King%27s+Pest+Control+603+River+Bend+Dr+Georgetown+TX",
    rating: 4.8,
    reviewCount: 165,
    yearsInBusiness: 42,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Quarterly perimeter treatments", "Termite inspections", "Rodent exclusion"],
    featured: false,
    category: "pest-control",
    description:
      "Family-owned Georgetown pest control company serving Williamson County since 1982; ants, rodents, termites, mosquitoes.",
    address: "603 River Bend Dr",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Allstate Pest Control",
    phone: "(512) 863-5547",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Allstate+Pest+Control+5800+Williams+Dr+Georgetown+TX",
    rating: 4.8,
    reviewCount: 95,
    yearsInBusiness: 30,
    serviceArea: "Georgetown, Hutto, Taylor",
    specialties: ["General pest control", "Wildlife removal", "Rodent proofing"],
    featured: false,
    category: "pest-control",
    description: "Local Georgetown pest control on Williams Drive offering general pest, wildlife, and rodent exclusion services.",
    address: "5800 Williams Dr",
    city: "Georgetown",
    state: "TX",
    postalCode: "78633",
  },
  {
    name: "Anytime Pest Elimination",
    phone: "(512) 355-5238",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Anytime+Pest+Elimination+Georgetown+TX",
    rating: 4.9,
    reviewCount: 827,
    yearsInBusiness: 20,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["No-contract perimeter plans", "Termite and bed bug treatment", "Mosquito reduction"],
    featured: false,
    category: "pest-control",
    description:
      "High-volume Georgetown pest control provider with free inspections and strong Google review ratings.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Surge Pest Control",
    phone: "(512) 400-2008",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Surge+Pest+Control+Georgetown+TX",
    rating: 5.0,
    reviewCount: 227,
    yearsInBusiness: 6,
    serviceArea: "Georgetown, Leander, Cedar Park",
    specialties: ["Local technician teams", "Recurring exterior treatments", "Wasp and ant control"],
    featured: false,
    category: "pest-control",
    description: "Top-rated local pest control company serving Georgetown with recurring exterior treatment plans.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "HomeTeam Pest Defense",
    phone: "(512) 869-0990",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=HomeTeam+Pest+Defense+2699+FM1460+Georgetown+TX",
    rating: 4.5,
    reviewCount: 70,
    yearsInBusiness: 25,
    serviceArea: "Georgetown, Round Rock, Hutto",
    specialties: ["Builder-installed Taexx systems", "Termite monitoring", "Rodent exclusion"],
    featured: false,
    category: "pest-control",
    description:
      "National pest control brand with a Georgetown office; quarterly perimeter plans, termite monitoring, and rodent exclusion.",
    address: "2699 FM1460 Ste 90",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },

  // ——— Foundation (5) ———
  {
    name: "Baird Foundation Repair",
    phone: "(512) 833-8500",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Baird+Foundation+Repair+555+Eastview+Dr+Georgetown+TX",
    rating: 4.7,
    reviewCount: 110,
    yearsInBusiness: 30,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Pier and beam stabilization", "Slab foundation repair", "Drainage corrections"],
    featured: false,
    category: "foundation",
    description:
      "BBB A+ foundation repair contractor with a Georgetown office covering pier installation, slab stabilization, and drainage.",
    address: "555 Eastview Dr",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Olshan Foundation Solutions",
    phone: "(800) 731-0600",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Olshan+Foundation+Solutions+Georgetown+TX",
    rating: 4.6,
    reviewCount: 200,
    yearsInBusiness: 90,
    serviceArea: "Georgetown, Round Rock, Leander",
    specialties: ["Cable Lock pier systems", "Concrete leveling", "Crawl space moisture control"],
    featured: false,
    category: "foundation",
    description:
      "Long-established Texas foundation repair company servicing Georgetown clay soils with engineered pier and concrete leveling solutions.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Bats Foundation Repair",
    phone: "(512) 981-0228",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bats+Foundation+Repair+Georgetown+TX",
    rating: 4.6,
    reviewCount: 60,
    yearsInBusiness: 18,
    serviceArea: "Georgetown, Round Rock, Pflugerville",
    specialties: ["Pressed pile installation", "Engineered evaluations", "Slab crack repair"],
    featured: false,
    category: "foundation",
    description:
      "BBB A+ foundation repair company serving Georgetown; pressed pile installation, slab repair, and engineered evaluations.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "CenTex Foundation Repair",
    phone: "(512) 763-0191",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=CenTex+Foundation+Repair+Georgetown+TX",
    rating: 4.8,
    reviewCount: 371,
    yearsInBusiness: 32,
    serviceArea: "Georgetown, Austin, Round Rock",
    specialties: ["Honest foundation evaluations", "Concrete leveling", "Pier and beam repair"],
    featured: false,
    category: "foundation",
    description:
      "Austin-area foundation repair company serving Georgetown with engineer-backed evaluations and concrete leveling.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Hercules Foundation Repair",
    phone: "(512) 690-0010",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hercules+Foundation+Repair+Georgetown+TX",
    rating: 4.9,
    reviewCount: 292,
    yearsInBusiness: 45,
    serviceArea: "Georgetown, Cedar Park, Leander",
    specialties: ["Slab and pier-and-beam repair", "Foundation leak repair", "Transferable warranties"],
    featured: false,
    category: "foundation",
    description:
      "Family-owned foundation repair company serving Georgetown with slab repair, pier work, and strong warranties.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },

  // ——— House cleaning (5) ———
  {
    name: "Molly Maid of Greater Austin",
    phone: "(512) 250-0048",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Molly+Maid+Georgetown+TX",
    rating: 4.5,
    reviewCount: 220,
    yearsInBusiness: 25,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Recurring maintenance cleans", "Move-out cleaning", "Custom cleaning checklists"],
    featured: false,
    category: "cleaning",
    description:
      "National cleaning brand with Georgetown service area; recurring maintenance, deep cleans, and move-out cleaning.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "MoreHands Maid Service",
    phone: "(512) 371-4301",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=MoreHands+Maid+Service+Georgetown+TX",
    rating: 4.8,
    reviewCount: 1468,
    yearsInBusiness: 26,
    serviceArea: "Georgetown, Sun City, Round Rock",
    specialties: ["Recurring maid service", "Deep and spring cleaning", "Sun City retirement homes"],
    featured: false,
    category: "cleaning",
    description:
      "Long-running Georgetown maid service with high Google review volume for recurring and deep cleaning.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
  {
    name: "Boardwalk Cleaning Co.",
    phone: "(512) 456-9600",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Boardwalk+Cleaning+Co+Georgetown+TX",
    rating: 4.9,
    reviewCount: 1510,
    yearsInBusiness: 12,
    serviceArea: "Georgetown, Cedar Park, Leander",
    specialties: ["Two-person cleaning teams", "24-hour satisfaction guarantee", "Move-in and move-out cleans"],
    featured: false,
    category: "cleaning",
    description:
      "Northern Williamson County cleaning company serving Georgetown neighborhoods with insured two-person teams.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Swept Up Cleaning Co.",
    phone: "(512) 900-7999",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Swept+Up+Cleaning+Co+Georgetown+TX",
    rating: 5.0,
    reviewCount: 500,
    yearsInBusiness: 8,
    serviceArea: "Georgetown, Round Rock, Hutto",
    specialties: ["Move-in and move-out cleaning", "Recurring residential service", "Williamson County coverage"],
    featured: false,
    category: "cleaning",
    description:
      "Georgetown house cleaning company with hundreds of five-star Google reviews for recurring and move cleans.",
    city: "Georgetown",
    state: "TX",
    postalCode: "78628",
  },
  {
    name: "Cinderella's Cleaning Services",
    phone: "(737) 378-8754",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cinderella%27s+Cleaning+Services+Georgetown+TX",
    rating: 4.7,
    reviewCount: 52,
    yearsInBusiness: 10,
    serviceArea: "Georgetown, Round Rock, Cedar Park",
    specialties: ["Recurring home cleaning", "Deep cleans", "Move-in and move-out service"],
    featured: false,
    category: "cleaning",
    description:
      "Georgetown maid service offering recurring cleans, deep cleans, and move-in/move-out service across Williamson County.",
    address: "601 Quail Valley Dr Ste 303",
    city: "Georgetown",
    state: "TX",
    postalCode: "78626",
  },
];

export function getProvidersByCategory(category: ProviderCategory): Provider[] {
  return PROVIDERS.filter((p) => p.category === category);
}

export function getCategoryForBestSlug(slug: string): ProviderCategory | null {
  return BEST_SLUG_TO_CATEGORY[slug] ?? null;
}

export function getDirectoryProvidersForBestSlug(slug: string): Provider[] {
  const category = getCategoryForBestSlug(slug);
  if (!category) return [];
  return getProvidersByCategory(category);
}
