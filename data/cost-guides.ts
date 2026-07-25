import { DIRECTORY_PAGES_LAST_UPDATED } from '../lib/last-updated';

/**
 * Cost guide pages at `/costs/[slug]` — high-intent "how much does it cost" content.
 */

export type CostGuidePriceRow = {
  serviceType: string;
  low: number;
  average: number;
  high: number;
  unit?: string;
};

export type CostGuideFaq = {
  question: string;
  answer: string;
};

export type CostGuideInternalLink = {
  label: string;
  href: string;
};

export type CostGuidePage = {
  slug: string;
  serviceName: string;
  shortName: string;
  serviceLabel: string;
  parentServicePath: string;
  angiCategorySlug: string;
  thumbtackCategory: string;
  extended: boolean;
  featured: boolean;
  indexBlurb: string;
  year: string;
  h1: string;
  absoluteTitle: string;
  metaDescription: string;
  pricingIntro: string;
  bodyParagraphs: string[];
  priceRows: CostGuidePriceRow[];
  summaryRange: { low: number; high: number };
  faqs: CostGuideFaq[];
  internalLinks: CostGuideInternalLink[];
  /** ISO 8601 calendar date (YYYY-MM-DD). */
  lastUpdated: string;
};

export const COST_GUIDE_SLUGS = [
  "plumber-cost-georgetown-tx",
  "hvac-repair-cost-georgetown-tx",
  "ac-installation-cost-georgetown-tx",
  "roof-replacement-cost-georgetown-tx",
  "roof-repair-cost-georgetown-tx",
  "electrician-cost-georgetown-tx",
  "panel-upgrade-cost-georgetown-tx",
  "landscaping-cost-georgetown-tx",
  "lawn-care-cost-georgetown-tx",
  "pest-control-cost-georgetown-tx",
  "termite-treatment-cost-georgetown-tx",
  "foundation-repair-cost-georgetown-tx",
  "house-cleaning-cost-georgetown-tx",
  "water-heater-installation-cost-georgetown-tx",
  "drain-cleaning-cost-georgetown-tx",
  "hvac-maintenance-cost-georgetown-tx"
] as const;

export const costGuidePages: CostGuidePage[] = [
  {
    "slug": "plumber-cost-georgetown-tx",
    "serviceName": "Plumber",
    "shortName": "Plumber",
    "serviceLabel": "Plumbing",
    "parentServicePath": "/services/plumbing",
    "angiCategorySlug": "plumbing",
    "thumbtackCategory": "plumbers",
    "extended": false,
    "featured": true,
    "indexBlurb": "Service calls, drain clearing, water heaters, and slab leaks in Williamson County.",
    "year": "2026",
    "h1": "How Much Does a Plumber Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Plumber Cost in Georgetown, TX (2026): Service Calls to Slab Leaks",
    "metaDescription": "Typical 2026 plumbing prices in Georgetown — service calls, drains, water heaters, slab leaks — and what changes the number. No lead forms.",
    "pricingIntro": "Typical Plumber price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for plumbing work in Georgetown, TX, most jobs fall between $150 and $2,500—use the table below as a 2026 planning band before you sign anything. Georgetown plumbers price for hard Edwards Aquifer water, slab-on-grade homes in Sun City, and long horizontal drain runs in 1990s subdivisions.",
      "What moves the number in Williamson County: Hard water scale, tree roots in clay laterals near Berry Creek, after-hours demand in active-adult communities, and whether the job needs a camera inspection before clearing.",
      "Solid quotes clearly list trip or diagnostic fees, labor hours, parts, permit pulls for water heaters, and whether drywall or concrete restoration is excluded. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Beware flat-rate phone quotes without a site visit, cash-only requests with no license number, and any company that won't isolate a slab leak before demolition. Compare two estimates and verify a valid TSBPE plumbing license.",
      "DIY or pro? Plungers, P-trap cleaning, and aerator swaps are reasonable DIY; anything behind walls, under slabs, or on the sewer lateral needs a licensed Texas plumber.",
      "Guest weeks in Sun City and holiday cooking loads spike drain calls—schedule non-emergency work between peaks when you can.",
      "Neighborhood context: sun-city — plumber; teravista — plumber pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the plumbing hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Service call / diagnostic",
        "low": 89,
        "average": 125,
        "high": 175
      },
      {
        "serviceType": "Drain clearing (single fixture)",
        "low": 125,
        "average": 225,
        "high": 400
      },
      {
        "serviceType": "Water heater replacement (tank)",
        "low": 1200,
        "average": 1850,
        "high": 2800
      },
      {
        "serviceType": "Slab leak repair",
        "low": 800,
        "average": 2200,
        "high": 4500
      },
      {
        "serviceType": "Emergency after-hours visit",
        "low": 175,
        "average": 325,
        "high": 550,
        "unit": "trip fee"
      }
    ],
    "summaryRange": {
      "low": 150,
      "high": 2500
    },
    "faqs": [
      {
        "question": "How much does Plumber cost in Georgetown, TX?",
        "answer": "Most Plumber projects in Georgetown fall between $150 and $2,500. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Plumber cost more in Georgetown than national averages?",
        "answer": "Georgetown plumbers price for hard Edwards Aquifer water, slab-on-grade homes in Sun City, and long horizontal drain runs in 1990s subdivisions. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Plumber quotes fairly?",
        "answer": "Request the same scope from each bidder: Trip or diagnostic fees, labor hours, parts, permit pulls for water heaters, and whether drywall or concrete restoration is excluded. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Plumber covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Plumbing service hub",
        "href": "/services/plumbing"
      },
      {
        "label": "Drain Cleaning",
        "href": "/plumbing/drain-cleaning"
      },
      {
        "label": "Emergency Plumber",
        "href": "/plumbing/emergency-plumber"
      },
      {
        "label": "Water Heater Installation",
        "href": "/plumbing/water-heater-installation"
      },
      {
        "label": "Plumbing in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      },
      {
        "label": "Plumbing in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "hvac-repair-cost-georgetown-tx",
    "serviceName": "HVAC Repair",
    "shortName": "HVAC repair",
    "serviceLabel": "HVAC",
    "parentServicePath": "/services/hvac",
    "angiCategorySlug": "hvac",
    "thumbtackCategory": "hvac-contractors",
    "extended": false,
    "featured": true,
    "indexBlurb": "AC repair, refrigerant, capacitors, and summer emergency calls in Central Texas heat.",
    "year": "2026",
    "h1": "How Much Does HVAC repair Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "HVAC Repair Cost in Georgetown, TX (2026): AC & Heating",
    "metaDescription": "Real 2026 HVAC repair ranges for Georgetown — capacitors, refrigerant, summer emergency calls — and when repair beats replacement. No lead forms.",
    "pricingIntro": "Typical HVAC repair price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for hvac work in Georgetown, TX, most jobs fall between $150 and $1,200—use the table below as a 2026 planning band before you sign anything. Georgetown AC repair peaks when heat indexes exceed 105°F and systems in Wolf Ranch and Sun City run near continuously from June through September.",
      "What moves the number in Williamson County: System age, attic access in two-story Teravista homes, refrigerant type, warranty status, and whether cedar pollen has clogged the coil before a part actually failed.",
      "Solid quotes clearly list quotes should separate diagnostic fees, parts, refrigerant by pound, and labor. Ask if the trip fee applies toward repair if you proceed the same day. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Avoid techs who add refrigerant without fixing a leak, won't provide model/serial documentation, or pressure full replacement on the first visit for a $200 part. Compare two estimates and verify a TDLR HVAC license.",
      "DIY or pro? Filter changes and clearing debris around the condenser are DIY; electrical, refrigerant, and compressor work require EPA-certified pros.",
      "July heat and first cold snaps fill HVAC calendars—spring and fall tune-ups book easier than emergency August slots.",
      "Neighborhood context: sun-city — hvac; wolf-ranch — hvac pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the hvac hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Diagnostic / service call",
        "low": 79,
        "average": 125,
        "high": 175
      },
      {
        "serviceType": "Capacitor or contactor replacement",
        "low": 175,
        "average": 275,
        "high": 425
      },
      {
        "serviceType": "Refrigerant recharge (R-410A)",
        "low": 250,
        "average": 400,
        "high": 650
      },
      {
        "serviceType": "Condenser fan motor replacement",
        "low": 350,
        "average": 550,
        "high": 850
      },
      {
        "serviceType": "Evaporator coil cleaning",
        "low": 150,
        "average": 275,
        "high": 450
      },
      {
        "serviceType": "Emergency same-day AC repair",
        "low": 200,
        "average": 375,
        "high": 600,
        "unit": "plus parts"
      }
    ],
    "summaryRange": {
      "low": 150,
      "high": 1200
    },
    "faqs": [
      {
        "question": "How much does HVAC repair cost in Georgetown, TX?",
        "answer": "Most HVAC repair projects in Georgetown fall between $150 and $1,200. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does HVAC repair cost more in Georgetown than national averages?",
        "answer": "Georgetown AC repair peaks when heat indexes exceed 105°F and systems in Wolf Ranch and Sun City run near continuously from June through September. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare HVAC repair quotes fairly?",
        "answer": "Request the same scope from each bidder: Quotes should separate diagnostic fees, parts, refrigerant by pound, and labor. Ask if the trip fee applies toward repair if you proceed the same day. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is HVAC repair covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "HVAC service hub",
        "href": "/services/hvac"
      },
      {
        "label": "Ac Repair",
        "href": "/hvac/ac-repair"
      },
      {
        "label": "Emergency Hvac",
        "href": "/hvac/emergency-hvac"
      },
      {
        "label": "Hvac Maintenance",
        "href": "/hvac/hvac-maintenance"
      },
      {
        "label": "HVAC in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      },
      {
        "label": "HVAC in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "ac-installation-cost-georgetown-tx",
    "serviceName": "AC Installation",
    "shortName": "AC installation",
    "serviceLabel": "HVAC",
    "parentServicePath": "/services/hvac",
    "angiCategorySlug": "hvac",
    "thumbtackCategory": "hvac-contractors",
    "extended": false,
    "featured": true,
    "indexBlurb": "Full system replacement and new AC installs sized for Georgetown summers.",
    "year": "2026",
    "h1": "How Much Does AC installation Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "AC Installation Cost in Georgetown, TX (2026): Full System Prices",
    "metaDescription": "What a new AC or full system replacement costs in Georgetown, sized for Central Texas summers — plus what drives the quote and how to compare bids.",
    "pricingIntro": "Typical AC installation price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for hvac work in Georgetown, TX, most jobs fall between $5,500 and $14,000—use the table below as a 2026 planning band before you sign anything. New AC installs in Georgetown must handle 100°F+ design days; undersized equipment in Sun City guest weeks leads to comfort complaints and high bills.",
      "What moves the number in Williamson County: Tonage, SEER2 rating, duct condition, electrical panel capacity, crane access for rooftop units, and spring/summer booking backlog across Williamson County.",
      "Solid quotes clearly list a complete bid lists equipment model numbers, line-set reuse or replacement, pad, thermostat, permits, haul-away, and warranty registration. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Reject quotes without a Manual J or load calculation reference, cash discounts that skip permits, or brands you cannot verify through a local dealer. Compare two estimates and verify a TDLR HVAC license.",
      "DIY or pro? AC installation is not DIY—Texas requires licensed HVAC contractors for refrigerant-bearing equipment.",
      "July heat and first cold snaps fill HVAC calendars—spring and fall tune-ups book easier than emergency August slots.",
      "Neighborhood context: teravista — hvac; wolf-ranch — hvac pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the hvac hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "3-ton AC + air handler (replace)",
        "low": 5500,
        "average": 7500,
        "high": 9500
      },
      {
        "serviceType": "4-ton system (larger single-story)",
        "low": 6500,
        "average": 8500,
        "high": 11000
      },
      {
        "serviceType": "5-ton system (large home)",
        "low": 8000,
        "average": 10500,
        "high": 14000
      },
      {
        "serviceType": "Duct modifications (minor)",
        "low": 500,
        "average": 1200,
        "high": 2500
      },
      {
        "serviceType": "Smart thermostat (installed)",
        "low": 250,
        "average": 400,
        "high": 650
      },
      {
        "serviceType": "Permit + inspection (typical)",
        "low": 150,
        "average": 250,
        "high": 400
      }
    ],
    "summaryRange": {
      "low": 5500,
      "high": 14000
    },
    "faqs": [
      {
        "question": "How much does AC installation cost in Georgetown, TX?",
        "answer": "Most AC installation projects in Georgetown fall between $5,500 and $14,000. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does AC installation cost more in Georgetown than national averages?",
        "answer": "New AC installs in Georgetown must handle 100°F+ design days; undersized equipment in Sun City guest weeks leads to comfort complaints and high bills. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare AC installation quotes fairly?",
        "answer": "Request the same scope from each bidder: A complete bid lists equipment model numbers, line-set reuse or replacement, pad, thermostat, permits, haul-away, and warranty registration. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is AC installation covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "HVAC service hub",
        "href": "/services/hvac"
      },
      {
        "label": "Ac Installation",
        "href": "/hvac/ac-installation"
      },
      {
        "label": "Mini Split Installation",
        "href": "/hvac/mini-split-installation"
      },
      {
        "label": "Heat Pump Installation",
        "href": "/hvac/heat-pump-installation"
      },
      {
        "label": "HVAC in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      },
      {
        "label": "HVAC in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "roof-replacement-cost-georgetown-tx",
    "serviceName": "Roof Replacement",
    "shortName": "Roof replacement",
    "serviceLabel": "Roofing",
    "parentServicePath": "/services/roofing",
    "angiCategorySlug": "roofing",
    "thumbtackCategory": "roofers",
    "extended": false,
    "featured": true,
    "indexBlurb": "Full shingle and architectural roof replacements after hail or age.",
    "year": "2026",
    "h1": "How Much Does Roof replacement Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Roof Replacement Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Roof replacement cost in Georgetown TX? 2026 range $9,000–$22,000. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Roof replacement price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for roofing work in Georgetown, TX, most jobs fall between $9,000 and $22,000—use the table below as a 2026 planning band before you sign anything. Williamson County spring hail drives replacement demand; Sun City and Wolf Ranch HOAs often require specific shingle profiles and contractor insurance certificates.",
      "What moves the number in Williamson County: Squares of roof, pitch, layers to tear off, decking damage, skylights, insurance vs cash-pay pricing, and storm-season crew availability.",
      "Solid quotes clearly list written scopes should list shingle brand/line, underlayment, ice-and-water shield at valleys, drip edge, ventilation, and disposal. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Storm chasers with out-of-state plates, full upfront deposits, and quotes far below neighbors without explaining cheaper materials are common red flags. Compare two estimates and verify proof of insurance and local references (Texas does not license roofers at the state level).",
      "DIY or pro? Roof replacement is not DIY—falls, code, and manufacturer warranty all require licensed roofers.",
      "Hail season stacks roofing demand across Williamson County; documented photos help you compare scopes without rush signing.",
      "Neighborhood context: sun-city — roofer; wolf-ranch — roofer pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the roofing hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Architectural shingle (avg home)",
        "low": 9000,
        "average": 14000,
        "high": 18000
      },
      {
        "serviceType": "Larger home / steep pitch",
        "low": 12000,
        "average": 17000,
        "high": 22000
      },
      {
        "serviceType": "Decking repair (per sheet)",
        "low": 75,
        "average": 125,
        "high": 200
      },
      {
        "serviceType": "Ridge vent upgrade",
        "low": 400,
        "average": 750,
        "high": 1200
      },
      {
        "serviceType": "Pipe boot / flashing package",
        "low": 300,
        "average": 550,
        "high": 900
      },
      {
        "serviceType": "Gutters (replace, avg home)",
        "low": 1200,
        "average": 1800,
        "high": 2800
      }
    ],
    "summaryRange": {
      "low": 9000,
      "high": 22000
    },
    "faqs": [
      {
        "question": "How much does Roof replacement cost in Georgetown, TX?",
        "answer": "Most Roof replacement projects in Georgetown fall between $9,000 and $22,000. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Roof replacement cost more in Georgetown than national averages?",
        "answer": "Williamson County spring hail drives replacement demand; Sun City and Wolf Ranch HOAs often require specific shingle profiles and contractor insurance certificates. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Roof replacement quotes fairly?",
        "answer": "Request the same scope from each bidder: Written scopes should list shingle brand/line, underlayment, ice-and-water shield at valleys, drip edge, ventilation, and disposal. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Roof replacement covered by homeowners insurance?",
        "answer": "Sudden hail or wind damage may be covered subject to your wind/hail deductible; cosmetic-only endorsements can limit payout—photograph soft metals and file timely notice."
      }
    ],
    "internalLinks": [
      {
        "label": "Roofing service hub",
        "href": "/services/roofing"
      },
      {
        "label": "Roof Replacement",
        "href": "/roofing/roof-replacement"
      },
      {
        "label": "Hail Damage Repair",
        "href": "/roofing/hail-damage-repair"
      },
      {
        "label": "Metal Roofing",
        "href": "/roofing/metal-roofing"
      },
      {
        "label": "Roofing in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      },
      {
        "label": "Roofing in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "roof-repair-cost-georgetown-tx",
    "serviceName": "Roof Repair",
    "shortName": "Roof repair",
    "serviceLabel": "Roofing",
    "parentServicePath": "/services/roofing",
    "angiCategorySlug": "roofing",
    "thumbtackCategory": "roofers",
    "extended": false,
    "featured": true,
    "indexBlurb": "Leak patches, shingle replacement, flashing, and post-storm tune-ups.",
    "year": "2026",
    "h1": "How Much Does Roof repair Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Roof Repair Cost in Georgetown, TX (2026 Price Ranges)",
    "metaDescription": "Real 2026 roof repair price ranges for Georgetown: leaks, shingles, flashing, storm tune-ups, and what drives the cost. No lead forms.",
    "pricingIntro": "Typical Roof repair price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for roofing work in Georgetown, TX, most jobs fall between $300 and $2,500—use the table below as a 2026 planning band before you sign anything. Georgetown roof repairs spike after hail; ceiling stains in Teravista two-stories often trace to boot failures rather than field shingles.",
      "What moves the number in Williamson County: Roof pitch, tile vs shingle, matching aged shingles, insurance documentation needs, and whether decking is soft when the tech walks the slope.",
      "Solid quotes clearly list repair quotes should specify number of squares touched, matching shingle source, and whether the fee includes a follow-up rain check. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Door-to-door 'free inspection' that ends in a full replacement recommendation without photos, or cash-only repairs with no local address. Compare two estimates and verify proof of insurance and local references (Texas does not license roofers at the state level).",
      "DIY or pro? Do not walk steep roofs yourself; interior bucket catching is temporary—call a roofer for active leaks before mold sets in Georgetown humidity.",
      "Hail season stacks roofing demand across Williamson County; documented photos help you compare scopes without rush signing.",
      "Neighborhood context: teravista — roofer; sun-city — hail-damage pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the roofing hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Roof inspection (written report)",
        "low": 0,
        "average": 150,
        "high": 300
      },
      {
        "serviceType": "Minor shingle repair (few tabs)",
        "low": 300,
        "average": 550,
        "high": 850
      },
      {
        "serviceType": "Pipe boot replacement",
        "low": 250,
        "average": 400,
        "high": 650
      },
      {
        "serviceType": "Chimney flashing repair",
        "low": 400,
        "average": 750,
        "high": 1200
      },
      {
        "serviceType": "Valley repair (localized)",
        "low": 500,
        "average": 900,
        "high": 1500
      },
      {
        "serviceType": "Emergency tarp (storm)",
        "low": 300,
        "average": 500,
        "high": 900
      }
    ],
    "summaryRange": {
      "low": 300,
      "high": 2500
    },
    "faqs": [
      {
        "question": "How much does Roof repair cost in Georgetown, TX?",
        "answer": "Most Roof repair projects in Georgetown fall between $300 and $2,500. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Roof repair cost more in Georgetown than national averages?",
        "answer": "Georgetown roof repairs spike after hail; ceiling stains in Teravista two-stories often trace to boot failures rather than field shingles. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Roof repair quotes fairly?",
        "answer": "Request the same scope from each bidder: Repair quotes should specify number of squares touched, matching shingle source, and whether the fee includes a follow-up rain check. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Roof repair covered by homeowners insurance?",
        "answer": "Sudden hail or wind damage may be covered subject to your wind/hail deductible; cosmetic-only endorsements can limit payout—photograph soft metals and file timely notice."
      }
    ],
    "internalLinks": [
      {
        "label": "Roofing service hub",
        "href": "/services/roofing"
      },
      {
        "label": "Roof Repair",
        "href": "/roofing/roof-repair"
      },
      {
        "label": "Emergency Roof Repair",
        "href": "/roofing/emergency-roof-repair"
      },
      {
        "label": "Roof Inspection",
        "href": "/roofing/roof-inspection"
      },
      {
        "label": "Roofing in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      },
      {
        "label": "hail-damage in Sun City",
        "href": "/neighborhoods/sun-city/hail-damage"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "electrician-cost-georgetown-tx",
    "serviceName": "an Electrician",
    "shortName": "Electrician",
    "serviceLabel": "Electrical",
    "parentServicePath": "/services/electrical",
    "angiCategorySlug": "electrical",
    "thumbtackCategory": "electricians",
    "extended": true,
    "featured": true,
    "indexBlurb": "Service calls, outlets, breakers, and whole-home electrical work.",
    "year": "2026",
    "h1": "How Much Does an Electrician Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Electrician Cost in Georgetown, TX (2026): Service Calls to Panels",
    "metaDescription": "2026 electrical pricing in Georgetown — service calls, outlets, breakers, panels, EV chargers — and what drives the total. No lead forms.",
    "pricingIntro": "Typical Electrician price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for an Electrician in Georgetown, TX, most jobs fall between $125 and $4,000—use the table below as a 2026 planning band before you sign anything. Georgetown electricians stay busy with panel upgrades for EV chargers in Wolf Ranch and accessibility retrofits in Sun City.",
      "What moves the number in Williamson County: Panel age, attic crawl length, AFCI/GFCI code updates, permit fees in Georgetown city limits, and whether the job needs a utility disconnect.",
      "Solid quotes clearly list estimates should list labor rate, parts, permit, and inspection. Ask if the service call credits toward same-day repair. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Unlicensed handymen on panel work, quotes without a panel photo, and anyone who bypasses breakers instead of fixing the root cause. Compare two estimates and verify a Texas licensed electrician.",
      "DIY or pro? Swap a light bulb or reset a GFCI; anything in the panel, new circuits, or aluminum wiring needs a licensed electrician.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: teravista — electrician; wolf-ranch — electrician pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the electrical hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Service call / diagnostic",
        "low": 89,
        "average": 125,
        "high": 175
      },
      {
        "serviceType": "Outlet or switch replacement",
        "low": 125,
        "average": 200,
        "high": 350
      },
      {
        "serviceType": "Ceiling fan install (existing box)",
        "low": 150,
        "average": 250,
        "high": 400
      },
      {
        "serviceType": "Circuit breaker replacement",
        "low": 150,
        "average": 250,
        "high": 400
      },
      {
        "serviceType": "Whole-home surge protector",
        "low": 300,
        "average": 500,
        "high": 750
      },
      {
        "serviceType": "Light fixture install (per fixture)",
        "low": 100,
        "average": 175,
        "high": 300
      }
    ],
    "summaryRange": {
      "low": 125,
      "high": 4000
    },
    "faqs": [
      {
        "question": "How much does Electrician cost in Georgetown, TX?",
        "answer": "Most Electrician projects in Georgetown fall between $125 and $4,000. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Electrician cost more in Georgetown than national averages?",
        "answer": "Georgetown electricians stay busy with panel upgrades for EV chargers in Wolf Ranch and accessibility retrofits in Sun City. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Electrician quotes fairly?",
        "answer": "Request the same scope from each bidder: Estimates should list labor rate, parts, permit, and inspection. Ask if the service call credits toward same-day repair. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Electrician covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Electrical service hub",
        "href": "/services/electrical"
      },
      {
        "label": "Outlet Installation",
        "href": "/electrical/outlet-installation"
      },
      {
        "label": "Emergency Electrician",
        "href": "/electrical/emergency-electrician"
      },
      {
        "label": "Lighting Installation",
        "href": "/electrical/lighting-installation"
      },
      {
        "label": "Electrical in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      },
      {
        "label": "Electrical in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "panel-upgrade-cost-georgetown-tx",
    "serviceName": "an Electrical Panel Upgrade",
    "shortName": "Panel upgrade",
    "serviceLabel": "Electrical",
    "parentServicePath": "/services/electrical",
    "angiCategorySlug": "electrical",
    "thumbtackCategory": "electricians",
    "extended": true,
    "featured": false,
    "indexBlurb": "100A to 200A upgrades for EV chargers, additions, and older Georgetown homes.",
    "year": "2026",
    "h1": "How Much Does an Electrical Panel Upgrade Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Panel Upgrade Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Panel upgrade cost in Georgetown TX? 2026 range $1,800–$4,500. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Panel upgrade price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for an Electrical Panel Upgrade in Georgetown, TX, most jobs fall between $1,800 and $4,500—use the table below as a 2026 planning band before you sign anything. Older Georgetown Village homes on 100A panels often need upgrades before adding heat pumps or EV chargers—utility coordination adds lead time.",
      "What moves the number in Williamson County: Aerial vs underground service, mast damage, grounding electrode upgrades, stucco repair after wall penetrations, and Austin Energy / Oncor scheduling.",
      "Solid quotes clearly list scope should list panel brand, amperage, new breakers included, labeling, permit, and whether the utility fee is separate. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Panel swaps without permits, used panels, or quotes that don't mention grounding upgrades on 1970s homes. Compare two estimates and verify a Texas licensed electrician.",
      "DIY or pro? Panel work is never DIY—licensed electricians and utility disconnects are mandatory.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: georgetown-village — electrician; sun-city — electrician pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the electrical hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "100A → 200A panel swap",
        "low": 1800,
        "average": 2800,
        "high": 3500
      },
      {
        "serviceType": "Meter base / service entrance work",
        "low": 500,
        "average": 1200,
        "high": 2500
      },
      {
        "serviceType": "Subpanel add (garage/shop)",
        "low": 800,
        "average": 1400,
        "high": 2200
      },
      {
        "serviceType": "Whole-house rewire (avg home)",
        "low": 8000,
        "average": 12000,
        "high": 18000
      },
      {
        "serviceType": "Permit + inspection",
        "low": 200,
        "average": 350,
        "high": 500
      }
    ],
    "summaryRange": {
      "low": 1800,
      "high": 4500
    },
    "faqs": [
      {
        "question": "How much does Panel upgrade cost in Georgetown, TX?",
        "answer": "Most Panel upgrade projects in Georgetown fall between $1,800 and $4,500. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Panel upgrade cost more in Georgetown than national averages?",
        "answer": "Older Georgetown Village homes on 100A panels often need upgrades before adding heat pumps or EV chargers—utility coordination adds lead time. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Panel upgrade quotes fairly?",
        "answer": "Request the same scope from each bidder: Scope should list panel brand, amperage, new breakers included, labeling, permit, and whether the utility fee is separate. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Panel upgrade covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Electrical service hub",
        "href": "/services/electrical"
      },
      {
        "label": "Panel Upgrade",
        "href": "/electrical/panel-upgrade"
      },
      {
        "label": "Ev Charger Installation",
        "href": "/electrical/ev-charger-installation"
      },
      {
        "label": "Whole Home Rewiring",
        "href": "/electrical/whole-home-rewiring"
      },
      {
        "label": "Electrical in Georgetown Village",
        "href": "/neighborhoods/georgetown-village/home-services"
      },
      {
        "label": "Electrical in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "landscaping-cost-georgetown-tx",
    "serviceName": "Landscaping",
    "shortName": "Landscaping",
    "serviceLabel": "Landscaping",
    "parentServicePath": "/services/landscaping",
    "angiCategorySlug": "landscaping",
    "thumbtackCategory": "landscapers",
    "extended": true,
    "featured": false,
    "indexBlurb": "Design, beds, sod, irrigation, and seasonal projects on clay soil.",
    "year": "2026",
    "h1": "How Much Does Landscaping Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Landscaping Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Landscaping cost in Georgetown TX? 2026 range $500–$12,000. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Landscaping price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for landscaping work in Georgetown, TX, most jobs fall between $500 and $12,000—use the table below as a 2026 planning band before you sign anything. Georgetown landscaping must account for clay soil, watering restrictions, and Bermuda vs St. Augustine maintenance windows.",
      "What moves the number in Williamson County: Lot size, plant maturity, irrigation zones, access for equipment, and summer heat limiting install windows.",
      "Solid quotes clearly list quotes should specify plant sizes, soil amendment, warranty on plant material, and irrigation controller programming. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Vague 'full yard makeover' pricing, no irrigation plan on sod jobs, and crews without insurance for hardscape work. Compare two estimates and verify general liability insurance and a written scope.",
      "DIY or pro? Mulch spreading and small annual beds are DIY; irrigation trenches, large trees, and retaining walls need pros.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: berry-creek — landscaping; georgetown-village — landscaping pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the landscaping hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Landscape design (plan only)",
        "low": 500,
        "average": 1200,
        "high": 2500
      },
      {
        "serviceType": "Bed refresh (mulch + plants)",
        "low": 800,
        "average": 2000,
        "high": 4500
      },
      {
        "serviceType": "Sod installation",
        "low": 1500,
        "average": 3500,
        "high": 7000,
        "unit": "(avg backyard)"
      },
      {
        "serviceType": "Tree planting (per tree, installed)",
        "low": 250,
        "average": 450,
        "high": 800
      },
      {
        "serviceType": "Full irrigation install",
        "low": 3500,
        "average": 5500,
        "high": 9000
      },
      {
        "serviceType": "Hardscape patio (basic)",
        "low": 4000,
        "average": 8000,
        "high": 15000
      }
    ],
    "summaryRange": {
      "low": 500,
      "high": 12000
    },
    "faqs": [
      {
        "question": "How much does Landscaping cost in Georgetown, TX?",
        "answer": "Most Landscaping projects in Georgetown fall between $500 and $12,000. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Landscaping cost more in Georgetown than national averages?",
        "answer": "Georgetown landscaping must account for clay soil, watering restrictions, and Bermuda vs St. Augustine maintenance windows. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Landscaping quotes fairly?",
        "answer": "Request the same scope from each bidder: Quotes should specify plant sizes, soil amendment, warranty on plant material, and irrigation controller programming. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Landscaping covered by homeowners insurance?",
        "answer": "Routine cleaning and lawn care are maintenance expenses and are not typically covered by homeowners insurance."
      }
    ],
    "internalLinks": [
      {
        "label": "Landscaping service hub",
        "href": "/services/landscaping"
      },
      {
        "label": "Landscape Design",
        "href": "/landscaping/landscape-design"
      },
      {
        "label": "Sod Installation",
        "href": "/landscaping/sod-installation"
      },
      {
        "label": "Sprinkler Installation",
        "href": "/landscaping/sprinkler-installation"
      },
      {
        "label": "Landscaping in Berry Creek",
        "href": "/neighborhoods/berry-creek/home-services"
      },
      {
        "label": "Landscaping in Georgetown Village",
        "href": "/neighborhoods/georgetown-village/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "lawn-care-cost-georgetown-tx",
    "serviceName": "Lawn Care",
    "shortName": "Lawn care",
    "serviceLabel": "Landscaping",
    "parentServicePath": "/services/landscaping",
    "angiCategorySlug": "landscaping",
    "thumbtackCategory": "landscapers",
    "extended": true,
    "featured": false,
    "indexBlurb": "Mowing, fertilization, weed control, and monthly lawn plans.",
    "year": "2026",
    "h1": "How Much Does Lawn care Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Lawn Care Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Lawn care cost in Georgetown TX? 2026 range $40–$280. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Lawn care price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for landscaping work in Georgetown, TX, most jobs fall between $40 and $280—use the table below as a 2026 planning band before you sign anything. Georgetown lawn care peaks in growing season; clay soil in Wolf Ranch holds water and can create fungus if mow schedules slip during humid weeks.",
      "What moves the number in Williamson County: Lot square footage, gate access, pet waste policies, frequency, and whether fertilization is bundled.",
      "Solid quotes clearly list monthly plans should list visit count, edging, blowing, and what happens on rain days. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Door-to-door 'weed treatment' without licensing info and per-visit prices that change every invoice without scope changes. Compare two estimates and verify general liability insurance and a written scope.",
      "DIY or pro? Mowing and basic edging are DIY if you own equipment; herbicide programs and aeration are often cheaper bundled with pros.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: wolf-ranch — landscaping; berry-creek — landscaping pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the landscaping hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Mowing (avg lot)",
        "low": 40,
        "average": 55,
        "high": 75,
        "unit": "per visit"
      },
      {
        "serviceType": "Mow + edge + blow",
        "low": 50,
        "average": 70,
        "high": 95,
        "unit": "per visit"
      },
      {
        "serviceType": "Monthly maintenance plan",
        "low": 140,
        "average": 200,
        "high": 280,
        "unit": "/month"
      },
      {
        "serviceType": "Fertilization (per application)",
        "low": 50,
        "average": 75,
        "high": 120
      },
      {
        "serviceType": "Aeration + overseed",
        "low": 150,
        "average": 250,
        "high": 400
      },
      {
        "serviceType": "Leaf cleanup (seasonal)",
        "low": 150,
        "average": 275,
        "high": 450
      }
    ],
    "summaryRange": {
      "low": 40,
      "high": 280
    },
    "faqs": [
      {
        "question": "How much does Lawn care cost in Georgetown, TX?",
        "answer": "Most Lawn care projects in Georgetown fall between $40 and $280. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Lawn care cost more in Georgetown than national averages?",
        "answer": "Georgetown lawn care peaks in growing season; clay soil in Wolf Ranch holds water and can create fungus if mow schedules slip during humid weeks. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Lawn care quotes fairly?",
        "answer": "Request the same scope from each bidder: Monthly plans should list visit count, edging, blowing, and what happens on rain days. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Lawn care covered by homeowners insurance?",
        "answer": "Routine cleaning and lawn care are maintenance expenses and are not typically covered by homeowners insurance."
      }
    ],
    "internalLinks": [
      {
        "label": "Landscaping service hub",
        "href": "/services/landscaping"
      },
      {
        "label": "Lawn Mowing",
        "href": "/landscaping/lawn-mowing"
      },
      {
        "label": "Seasonal Cleanup",
        "href": "/landscaping/seasonal-cleanup"
      },
      {
        "label": "Mulching",
        "href": "/landscaping/mulching"
      },
      {
        "label": "Landscaping in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      },
      {
        "label": "Landscaping in Berry Creek",
        "href": "/neighborhoods/berry-creek/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "pest-control-cost-georgetown-tx",
    "serviceName": "Pest Control",
    "shortName": "Pest control",
    "serviceLabel": "Pest Control",
    "parentServicePath": "/services/pest-control",
    "angiCategorySlug": "pest-control",
    "thumbtackCategory": "pest-control",
    "extended": true,
    "featured": false,
    "indexBlurb": "Perimeter treatments, quarterly plans, and general pest programs.",
    "year": "2026",
    "h1": "How Much Does Pest control Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Pest Control Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Pest control cost in Georgetown TX? 2026 range $99–$350. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Pest control price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for pest control work in Georgetown, TX, most jobs fall between $99 and $350—use the table below as a 2026 planning band before you sign anything. Fire ants, scorpions, and roof rats flare with Georgetown heat; cedar pollen season drives spider pressure along eaves.",
      "What moves the number in Williamson County: Home size, crawl vs slab, pet-safe product requirements, and whether you need one-time or recurring service.",
      "Solid quotes clearly list contracts should list covered pests, interior vs exterior, re-treat policy, and cancellation terms. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: High-pressure annual contracts on the first visit and companies that won't put chemical names in writing. Compare two estimates and verify a TPCL applicator license.",
      "DIY or pro? Traps and gel baits for minor ant lines are DIY; scorpions, termites, and rodents usually need licensed applicators.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: georgetown-village — pest-control; berry-creek — pest-control pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the pest control hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Initial general pest treatment",
        "low": 150,
        "average": 225,
        "high": 350
      },
      {
        "serviceType": "Quarterly perimeter plan",
        "low": 99,
        "average": 140,
        "high": 185,
        "unit": "per visit"
      },
      {
        "serviceType": "Mosquito treatment (seasonal)",
        "low": 75,
        "average": 120,
        "high": 175,
        "unit": "per visit"
      },
      {
        "serviceType": "Rodent exclusion package",
        "low": 350,
        "average": 550,
        "high": 900
      },
      {
        "serviceType": "Wasp / hive removal",
        "low": 150,
        "average": 250,
        "high": 400
      }
    ],
    "summaryRange": {
      "low": 99,
      "high": 350
    },
    "faqs": [
      {
        "question": "How much does Pest control cost in Georgetown, TX?",
        "answer": "Most Pest control projects in Georgetown fall between $99 and $350. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Pest control cost more in Georgetown than national averages?",
        "answer": "Fire ants, scorpions, and roof rats flare with Georgetown heat; cedar pollen season drives spider pressure along eaves. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Pest control quotes fairly?",
        "answer": "Request the same scope from each bidder: Contracts should list covered pests, interior vs exterior, re-treat policy, and cancellation terms. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Pest control covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Pest Control service hub",
        "href": "/services/pest-control"
      },
      {
        "label": "Ant Control",
        "href": "/pest-control/ant-control"
      },
      {
        "label": "Mosquito Control",
        "href": "/pest-control/mosquito-control"
      },
      {
        "label": "Rodent Control",
        "href": "/pest-control/rodent-control"
      },
      {
        "label": "Pest control in Georgetown Village",
        "href": "/neighborhoods/georgetown-village/home-services"
      },
      {
        "label": "Pest control in Berry Creek",
        "href": "/neighborhoods/berry-creek/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "termite-treatment-cost-georgetown-tx",
    "serviceName": "Termite Treatment",
    "shortName": "Termite treatment",
    "serviceLabel": "Pest Control",
    "parentServicePath": "/services/pest-control",
    "angiCategorySlug": "pest-control",
    "thumbtackCategory": "pest-control",
    "extended": true,
    "featured": false,
    "indexBlurb": "Liquid barriers, bait systems, and WDI reports for Georgetown homes.",
    "year": "2026",
    "h1": "How Much Does Termite treatment Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Termite Treatment Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Termite treatment cost in Georgetown TX? 2026 range $500–$2,800. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Termite treatment price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for pest control work in Georgetown, TX, most jobs fall between $500 and $2,800—use the table below as a 2026 planning band before you sign anything. Subterranean termites are common in Central Texas clay; pier-and-beam pockets in older Georgetown stock need inspection at sills.",
      "What moves the number in Williamson County: Linear footage of foundation, slab vs crawl, active infestation vs preventive, and warranty length (often tied to annual renewals).",
      "Solid quotes clearly list treatment proposals should show diagram of drill points or bait stations, product used, and transferable warranty terms. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Panic sales after a 'free' inspection, companies without TPCL license numbers, and warranties that void if you miss renewal by one day. Compare two estimates and verify a TPCL applicator license.",
      "DIY or pro? Termite treatment is not DIY—lenders and realtors require licensed WDI documentation in Texas.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: sun-city — pest-control; teravista — pest-control pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the pest control hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Termite inspection (WDI report)",
        "low": 75,
        "average": 125,
        "high": 200
      },
      {
        "serviceType": "Subterranean treatment (avg home)",
        "low": 800,
        "average": 1400,
        "high": 2200
      },
      {
        "serviceType": "Bait system installation",
        "low": 600,
        "average": 1000,
        "high": 1600
      },
      {
        "serviceType": "Annual renewal / monitoring",
        "low": 150,
        "average": 250,
        "high": 400,
        "unit": "/year"
      },
      {
        "serviceType": "Localized spot treatment",
        "low": 500,
        "average": 850,
        "high": 1200
      }
    ],
    "summaryRange": {
      "low": 500,
      "high": 2800
    },
    "faqs": [
      {
        "question": "How much does Termite treatment cost in Georgetown, TX?",
        "answer": "Most Termite treatment projects in Georgetown fall between $500 and $2,800. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Termite treatment cost more in Georgetown than national averages?",
        "answer": "Subterranean termites are common in Central Texas clay; pier-and-beam pockets in older Georgetown stock need inspection at sills. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Termite treatment quotes fairly?",
        "answer": "Request the same scope from each bidder: Treatment proposals should show diagram of drill points or bait stations, product used, and transferable warranty terms. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Termite treatment covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Pest Control service hub",
        "href": "/services/pest-control"
      },
      {
        "label": "Termite Treatment",
        "href": "/pest-control/termite-treatment"
      },
      {
        "label": "Rodent Control",
        "href": "/pest-control/rodent-control"
      },
      {
        "label": "Scorpion Control",
        "href": "/pest-control/scorpion-control"
      },
      {
        "label": "Pest control in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      },
      {
        "label": "Pest control in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "foundation-repair-cost-georgetown-tx",
    "serviceName": "Foundation Repair",
    "shortName": "Foundation repair",
    "serviceLabel": "Foundation",
    "parentServicePath": "/services/foundation",
    "angiCategorySlug": "foundation-repair",
    "thumbtackCategory": "foundation-repair",
    "extended": true,
    "featured": true,
    "indexBlurb": "Piers, leveling, drainage, and clay-soil movement fixes.",
    "year": "2026",
    "h1": "How Much Does Foundation repair Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Foundation Repair Cost in Georgetown, TX (2026 Ranges)",
    "metaDescription": "What foundation repair costs in Georgetown — piers, leveling, drainage on Williamson County clay — plus what drives price and how to compare bids.",
    "pricingIntro": "Typical Foundation repair price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for foundation work in Georgetown, TX, most jobs fall between $3,500 and $15,000—use the table below as a 2026 planning band before you sign anything. Expansive clay around Georgetown shrinks in drought and swells after gully washers—Wolf Ranch and Teravista see seasonal door-gap complaints.",
      "What moves the number in Williamson County: Pier count, interior vs exterior lift, plumbing tests after lift, landscaping restoration, and engineering letter requirements.",
      "Solid quotes clearly list contracts should list pier type, depth guarantee, lift tolerance, and whether plumbing/static tests are included. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Single-price-per-pier quotes without a elevation survey, cash-only crews, and 'today only' discounts after a free inspection. Compare two estimates and verify a documented repair plan and transferable warranty terms.",
      "DIY or pro? Monitor cracks and downspout extensions are DIY; pier installation and hydraulic leveling require specialized foundation contractors.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: wolf-ranch — foundation-repair; teravista — foundation-repair pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the foundation hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Foundation evaluation",
        "low": 0,
        "average": 200,
        "high": 400
      },
      {
        "serviceType": "Pressed concrete pier (each)",
        "low": 1200,
        "average": 1500,
        "high": 1800
      },
      {
        "serviceType": "Steel pier (each)",
        "low": 1800,
        "average": 2400,
        "high": 3000
      },
      {
        "serviceType": "Typical home stabilization (8–12 piers)",
        "low": 4500,
        "average": 8500,
        "high": 15000
      },
      {
        "serviceType": "Drainage correction (French drain)",
        "low": 2000,
        "average": 3500,
        "high": 6000
      },
      {
        "serviceType": "Surface drainage / grading",
        "low": 1500,
        "average": 2800,
        "high": 4500
      }
    ],
    "summaryRange": {
      "low": 3500,
      "high": 15000
    },
    "faqs": [
      {
        "question": "How much does Foundation repair cost in Georgetown, TX?",
        "answer": "Most Foundation repair projects in Georgetown fall between $3,500 and $15,000. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Foundation repair cost more in Georgetown than national averages?",
        "answer": "Expansive clay around Georgetown shrinks in drought and swells after gully washers—Wolf Ranch and Teravista see seasonal door-gap complaints. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Foundation repair quotes fairly?",
        "answer": "Request the same scope from each bidder: Contracts should list pier type, depth guarantee, lift tolerance, and whether plumbing/static tests are included. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Foundation repair covered by homeowners insurance?",
        "answer": "Gradual soil movement and maintenance cracks are usually excluded; sudden plumbing leaks under a slab may be a separate claim—document dates and get plumber findings in writing."
      }
    ],
    "internalLinks": [
      {
        "label": "Foundation service hub",
        "href": "/services/foundation"
      },
      {
        "label": "Foundation Repair",
        "href": "/foundation/foundation-repair"
      },
      {
        "label": "Pier And Beam Repair",
        "href": "/foundation/pier-and-beam-repair"
      },
      {
        "label": "Drainage Correction",
        "href": "/foundation/drainage-correction"
      },
      {
        "label": "Foundation in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      },
      {
        "label": "Foundation in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "house-cleaning-cost-georgetown-tx",
    "serviceName": "House Cleaning",
    "shortName": "House cleaning",
    "serviceLabel": "Cleaning",
    "parentServicePath": "/services/house-cleaning",
    "angiCategorySlug": "house-cleaning",
    "thumbtackCategory": "house-cleaning",
    "extended": true,
    "featured": true,
    "indexBlurb": "Standard, deep, and recurring cleans for Georgetown homes.",
    "year": "2026",
    "h1": "How Much Does House cleaning Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "House Cleaning Cost in Georgetown, TX (2026): Standard to Deep",
    "metaDescription": "What house cleaning costs in Georgetown — standard, deep, recurring, and move-out cleans — and what changes the price. Local 2026 ranges.",
    "pricingIntro": "Typical House cleaning price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for cleaning work in Georgetown, TX, most jobs fall between $120 and $400—use the table below as a 2026 planning band before you sign anything. Hard water spotting on fixtures and cedar pollen on sills make deep cleans popular in Sun City before guest weeks.",
      "What moves the number in Williamson County: Square footage, pets, clutter level, frequency discounts, and whether supplies are included.",
      "Solid quotes clearly list checklists should list rooms, baseboards, interior windows, and cancellation policy for recurring plans. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Quotes without a walkthrough for first cleans, cleaners without insurance, and cash payments with no service agreement. Compare two estimates and verify workers’ compensation and liability insurance.",
      "DIY or pro? Routine tidying is DIY; move-out cleans and post-construction dust are usually faster with a crew.",
      "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.",
      "Neighborhood context: sun-city — house-cleaning; georgetown-village — house-cleaning pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the cleaning hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Standard clean (2–3 bed)",
        "low": 120,
        "average": 165,
        "high": 220
      },
      {
        "serviceType": "Deep clean (same size)",
        "low": 200,
        "average": 275,
        "high": 350
      },
      {
        "serviceType": "Move-in / move-out clean",
        "low": 250,
        "average": 350,
        "high": 450
      },
      {
        "serviceType": "Weekly recurring (discount)",
        "low": 110,
        "average": 145,
        "high": 185,
        "unit": "per visit"
      },
      {
        "serviceType": "Interior windows (add-on)",
        "low": 75,
        "average": 125,
        "high": 200
      },
      {
        "serviceType": "Inside oven + fridge (add-on)",
        "low": 50,
        "average": 85,
        "high": 125
      }
    ],
    "summaryRange": {
      "low": 120,
      "high": 400
    },
    "faqs": [
      {
        "question": "How much does House cleaning cost in Georgetown, TX?",
        "answer": "Most House cleaning projects in Georgetown fall between $120 and $400. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does House cleaning cost more in Georgetown than national averages?",
        "answer": "Hard water spotting on fixtures and cedar pollen on sills make deep cleans popular in Sun City before guest weeks. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare House cleaning quotes fairly?",
        "answer": "Request the same scope from each bidder: Checklists should list rooms, baseboards, interior windows, and cancellation policy for recurring plans. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is House cleaning covered by homeowners insurance?",
        "answer": "Routine cleaning and lawn care are maintenance expenses and are not typically covered by homeowners insurance."
      }
    ],
    "internalLinks": [
      {
        "label": "Cleaning service hub",
        "href": "/services/house-cleaning"
      },
      {
        "label": "House Cleaning",
        "href": "/cleaning/house-cleaning"
      },
      {
        "label": "Deep Cleaning",
        "href": "/cleaning/deep-cleaning"
      },
      {
        "label": "Recurring Cleaning",
        "href": "/cleaning/recurring-cleaning"
      },
      {
        "label": "House cleaning in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      },
      {
        "label": "House cleaning in Georgetown Village",
        "href": "/neighborhoods/georgetown-village/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "water-heater-installation-cost-georgetown-tx",
    "serviceName": "Water Heater Installation",
    "shortName": "Water heater installation",
    "serviceLabel": "Plumbing",
    "parentServicePath": "/services/plumbing",
    "angiCategorySlug": "plumbing",
    "thumbtackCategory": "plumbers",
    "extended": false,
    "featured": false,
    "indexBlurb": "Tank, tankless, and heat-pump water heaters with permits.",
    "year": "2026",
    "h1": "How Much Does Water heater installation Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Water Heater Installation Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Water heater installation cost in Georgetown TX? 2026 range $1,200–$4,500. Local low, average & high tables, hiring tips, and FAQs for Williams…",
    "pricingIntro": "Typical Water heater installation price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for plumbing work in Georgetown, TX, most jobs fall between $1,200 and $4,500—use the table below as a 2026 planning band before you sign anything. Hard Georgetown water eats tanks faster—Teravista garages often house heaters that need anode checks every few years.",
      "What moves the number in Williamson County: Fuel type, venting changes, pan drains to exterior, code upgrades on gas lines, and same-day emergency premiums.",
      "Solid quotes clearly list install quotes should list heater model, warranty, haul-away, permit, and whether expansion tanks are included. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Installers who won't pull permits, reuse flex gas lines against code, or skip pan drains on second-floor closets. Compare two estimates and verify a valid TSBPE plumbing license.",
      "DIY or pro? Water heater installs are not DIY in Texas—permit, gas, and venting require licensed plumbers.",
      "Guest weeks in Sun City and holiday cooking loads spike drain calls—schedule non-emergency work between peaks when you can.",
      "Neighborhood context: wolf-ranch — plumber; sun-city — plumber pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the plumbing hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "40–50 gal tank (installed)",
        "low": 1200,
        "average": 1850,
        "high": 2500
      },
      {
        "serviceType": "Tankless gas (installed)",
        "low": 2800,
        "average": 3800,
        "high": 5000
      },
      {
        "serviceType": "Heat-pump water heater",
        "low": 2200,
        "average": 3200,
        "high": 4500
      },
      {
        "serviceType": "Pan / drain line upgrade",
        "low": 150,
        "average": 275,
        "high": 450
      },
      {
        "serviceType": "Gas line upsize (tankless)",
        "low": 400,
        "average": 750,
        "high": 1200
      },
      {
        "serviceType": "Permit + inspection",
        "low": 75,
        "average": 125,
        "high": 200
      }
    ],
    "summaryRange": {
      "low": 1200,
      "high": 4500
    },
    "faqs": [
      {
        "question": "How much does Water heater installation cost in Georgetown, TX?",
        "answer": "Most Water heater installation projects in Georgetown fall between $1,200 and $4,500. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Water heater installation cost more in Georgetown than national averages?",
        "answer": "Hard Georgetown water eats tanks faster—Teravista garages often house heaters that need anode checks every few years. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Water heater installation quotes fairly?",
        "answer": "Request the same scope from each bidder: Install quotes should list heater model, warranty, haul-away, permit, and whether expansion tanks are included. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Water heater installation covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Plumbing service hub",
        "href": "/services/plumbing"
      },
      {
        "label": "Water Heater Installation",
        "href": "/plumbing/water-heater-installation"
      },
      {
        "label": "Pipe Repair",
        "href": "/plumbing/pipe-repair"
      },
      {
        "label": "Leak Detection",
        "href": "/plumbing/leak-detection"
      },
      {
        "label": "Plumbing in Wolf Ranch",
        "href": "/neighborhoods/wolf-ranch/home-services"
      },
      {
        "label": "Plumbing in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "drain-cleaning-cost-georgetown-tx",
    "serviceName": "Drain Cleaning",
    "shortName": "Drain cleaning",
    "serviceLabel": "Plumbing",
    "parentServicePath": "/services/plumbing",
    "angiCategorySlug": "plumbing",
    "thumbtackCategory": "plumbers",
    "extended": false,
    "featured": false,
    "indexBlurb": "Snaking, hydro-jetting, and camera inspections for clogged lines.",
    "year": "2026",
    "h1": "How Much Does Drain cleaning Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "Drain Cleaning Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does Drain cleaning cost in Georgetown TX? 2026 range $125–$650. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical Drain cleaning price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for plumbing work in Georgetown, TX, most jobs fall between $125 and $650—use the table below as a 2026 planning band before you sign anything. Roots and grease backups are common in Georgetown Village mature lines; Sun City guest weeks stack shower load on older drains.",
      "What moves the number in Williamson County: Access cleanouts, recurring clogs suggesting bellies, cast iron vs PVC, and whether hydro-jetting is warranted after camera.",
      "Solid quotes clearly list quotes should state if pricing is per fixture or main line, and whether camera footage is included. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Flat 'any drain' pricing without access check, and companies that snake repeatedly without recommending camera after third call. Compare two estimates and verify a valid TSBPE plumbing license.",
      "DIY or pro? Plungers and hair traps are DIY; main line stoppages and roof vents need pro equipment.",
      "Guest weeks in Sun City and holiday cooking loads spike drain calls—schedule non-emergency work between peaks when you can.",
      "Neighborhood context: berry-creek — plumber; georgetown-village — plumber pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the plumbing hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Kitchen or bath snake",
        "low": 125,
        "average": 200,
        "high": 325
      },
      {
        "serviceType": "Main line clearing",
        "low": 250,
        "average": 400,
        "high": 650
      },
      {
        "serviceType": "Hydro-jet (main line)",
        "low": 350,
        "average": 550,
        "high": 850
      },
      {
        "serviceType": "Camera inspection (add-on)",
        "low": 150,
        "average": 250,
        "high": 400
      },
      {
        "serviceType": "Roof vent clearing",
        "low": 175,
        "average": 275,
        "high": 425
      }
    ],
    "summaryRange": {
      "low": 125,
      "high": 650
    },
    "faqs": [
      {
        "question": "How much does Drain cleaning cost in Georgetown, TX?",
        "answer": "Most Drain cleaning projects in Georgetown fall between $125 and $650. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does Drain cleaning cost more in Georgetown than national averages?",
        "answer": "Roots and grease backups are common in Georgetown Village mature lines; Sun City guest weeks stack shower load on older drains. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare Drain cleaning quotes fairly?",
        "answer": "Request the same scope from each bidder: Quotes should state if pricing is per fixture or main line, and whether camera footage is included. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is Drain cleaning covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "Plumbing service hub",
        "href": "/services/plumbing"
      },
      {
        "label": "Drain Cleaning",
        "href": "/plumbing/drain-cleaning"
      },
      {
        "label": "Sewer Line Repair",
        "href": "/plumbing/sewer-line-repair"
      },
      {
        "label": "Emergency Plumber",
        "href": "/plumbing/emergency-plumber"
      },
      {
        "label": "Plumbing in Berry Creek",
        "href": "/neighborhoods/berry-creek/home-services"
      },
      {
        "label": "Plumbing in Georgetown Village",
        "href": "/neighborhoods/georgetown-village/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  },
  {
    "slug": "hvac-maintenance-cost-georgetown-tx",
    "serviceName": "HVAC Maintenance",
    "shortName": "HVAC maintenance",
    "serviceLabel": "HVAC",
    "parentServicePath": "/services/hvac",
    "angiCategorySlug": "hvac",
    "thumbtackCategory": "hvac-contractors",
    "extended": false,
    "featured": false,
    "indexBlurb": "Spring/fall tune-ups, filter plans, and preventive AC service.",
    "year": "2026",
    "h1": "How Much Does HVAC maintenance Cost in Georgetown, TX? (2026 Guide)",
    "absoluteTitle": "HVAC Maintenance Cost in Georgetown, TX (2026) | Georgetown Home Services",
    "metaDescription": "How much does HVAC maintenance cost in Georgetown TX? 2026 range $89–$450. Local low, average & high tables, hiring tips, and FAQs for Williamson County.",
    "pricingIntro": "Typical HVAC maintenance price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (2026).",
    "bodyParagraphs": [
      "If you are budgeting for hvac work in Georgetown, TX, most jobs fall between $89 and $450—use the table below as a 2026 planning band before you sign anything. Cedar pollen clogs condenser coils fast—Sun City homes near golf courses often need mid-summer rinse between tune-ups.",
      "What moves the number in Williamson County: Number of systems, attic accessibility, filter size upgrades, and whether maintenance credits apply to future repairs.",
      "Solid quotes clearly list tune-up checklists should cover amp draws, delta-T, drain clearing, and written findings—not just a filter swap. Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.",
      "Watch for trouble: Maintenance visits that always end in upsell parts without measurements, or plans that auto-renew without clear cancellation. Compare two estimates and verify a TDLR HVAC license.",
      "DIY or pro? Filter changes and condenser rinses are DIY; refrigerant, electrical testing, and gas heat exchanger checks belong to HVAC techs.",
      "July heat and first cold snaps fill HVAC calendars—spring and fall tune-ups book easier than emergency August slots.",
      "Neighborhood context: sun-city — hvac; teravista — hvac pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.",
      "Use the hvac hub and linked sub-service pages below to compare scopes before you authorize work."
    ],
    "priceRows": [
      {
        "serviceType": "Spring AC tune-up",
        "low": 89,
        "average": 129,
        "high": 175
      },
      {
        "serviceType": "Fall heating check",
        "low": 89,
        "average": 125,
        "high": 165
      },
      {
        "serviceType": "Annual maintenance plan (2 visits)",
        "low": 180,
        "average": 250,
        "high": 350,
        "unit": "/year"
      },
      {
        "serviceType": "Coil cleaning (add-on)",
        "low": 125,
        "average": 200,
        "high": 325
      },
      {
        "serviceType": "Duct cleaning (whole home)",
        "low": 350,
        "average": 550,
        "high": 900
      },
      {
        "serviceType": "UV light install (add-on)",
        "low": 400,
        "average": 600,
        "high": 850
      }
    ],
    "summaryRange": {
      "low": 89,
      "high": 450
    },
    "faqs": [
      {
        "question": "How much does HVAC maintenance cost in Georgetown, TX?",
        "answer": "Most HVAC maintenance projects in Georgetown fall between $89 and $450. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher."
      },
      {
        "question": "Why does HVAC maintenance cost more in Georgetown than national averages?",
        "answer": "Cedar pollen clogs condenser coils fast—Sun City homes near golf courses often need mid-summer rinse between tune-ups. Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth."
      },
      {
        "question": "How do I compare HVAC maintenance quotes fairly?",
        "answer": "Request the same scope from each bidder: Tune-up checklists should cover amp draws, delta-T, drain clearing, and written findings—not just a filter swap. Match warranty terms, permit responsibility, and cleanup—not just the bottom line."
      },
      {
        "question": "Is HVAC maintenance covered by homeowners insurance?",
        "answer": "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work."
      }
    ],
    "internalLinks": [
      {
        "label": "HVAC service hub",
        "href": "/services/hvac"
      },
      {
        "label": "Hvac Maintenance",
        "href": "/hvac/hvac-maintenance"
      },
      {
        "label": "Air Duct Cleaning",
        "href": "/hvac/air-duct-cleaning"
      },
      {
        "label": "Ac Repair",
        "href": "/hvac/ac-repair"
      },
      {
        "label": "HVAC in Sun City",
        "href": "/neighborhoods/sun-city/home-services"
      },
      {
        "label": "HVAC in Teravista",
        "href": "/neighborhoods/teravista/home-services"
      }
    ],
    "lastUpdated": DIRECTORY_PAGES_LAST_UPDATED
  }
];

const pageMap = new Map(costGuidePages.map((p) => [p.slug, p]));

export function getCostGuidePage(slug: string): CostGuidePage | undefined {
  return pageMap.get(slug);
}

export function getCostGuideStaticParams(): { slug: string }[] {
  return costGuidePages.map((p) => ({ slug: p.slug }));
}

export function getCostGuidePaths(): string[] {
  return costGuidePages.map((p) => `/costs/${p.slug}`);
}

export function getFeaturedCostGuides(): CostGuidePage[] {
  return costGuidePages.filter((p) => p.featured);
}
