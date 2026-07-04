/**
 * Generates data/cost-guides.ts — run: node scripts/generate-cost-guides-data.mjs
 */
import fs from "node:fs";
import path from "node:path";

const YEAR = "2026";
const SITE_NAME = "Georgetown Home Services";

const GUIDES = [
  {
    slug: "plumber-cost-georgetown-tx",
    serviceName: "Plumber",
    shortName: "Plumber",
    serviceLabel: "Plumbing",
    parentServicePath: "/services/plumbing",
    angiCategorySlug: "plumbing",
    thumbtackCategory: "plumbers",
    extended: false,
    featured: true,
    indexBlurb: "Service calls, drain clearing, water heaters, and slab leaks in Williamson County.",
    summaryLow: 150,
    summaryHigh: 2500,
    priceRows: [
      { serviceType: "Service call / diagnostic", low: 89, average: 125, high: 175 },
      { serviceType: "Drain clearing (single fixture)", low: 125, average: 225, high: 400 },
      { serviceType: "Water heater replacement (tank)", low: 1200, average: 1850, high: 2800 },
      { serviceType: "Slab leak repair", low: 800, average: 2200, high: 4500 },
      { serviceType: "Emergency after-hours visit", low: 175, average: 325, high: 550, unit: "trip fee" },
    ],
    subLinks: ["/plumbing/drain-cleaning", "/plumbing/emergency-plumber", "/plumbing/water-heater-installation"],
    hoods: ["sun-city/plumber", "teravista/plumber"],
    local:
      "Georgetown plumbers price for hard Edwards Aquifer water, slab-on-grade homes in Sun City, and long horizontal drain runs in 1990s subdivisions.",
    factors:
      "Hard water scale, tree roots in clay laterals near Berry Creek, after-hours demand in active-adult communities, and whether the job needs a camera inspection before clearing.",
    included:
      "Trip or diagnostic fees, labor hours, parts, permit pulls for water heaters, and whether drywall or concrete restoration is excluded.",
    redFlags:
      "Beware flat-rate phone quotes without a site visit, cash-only requests with no license number, and any company that won't isolate a slab leak before demolition.",
    diy:
      "Plungers, P-trap cleaning, and aerator swaps are reasonable DIY; anything behind walls, under slabs, or on the sewer lateral needs a licensed Texas plumber.",
  },
  {
    slug: "hvac-repair-cost-georgetown-tx",
    serviceName: "HVAC Repair",
    shortName: "HVAC repair",
    serviceLabel: "HVAC",
    parentServicePath: "/services/hvac",
    angiCategorySlug: "hvac",
    thumbtackCategory: "hvac-contractors",
    extended: false,
    featured: true,
    indexBlurb: "AC repair, refrigerant, capacitors, and summer emergency calls in Central Texas heat.",
    summaryLow: 150,
    summaryHigh: 1200,
    priceRows: [
      { serviceType: "Diagnostic / service call", low: 79, average: 125, high: 175 },
      { serviceType: "Capacitor or contactor replacement", low: 175, average: 275, high: 425 },
      { serviceType: "Refrigerant recharge (R-410A)", low: 250, average: 400, high: 650 },
      { serviceType: "Condenser fan motor replacement", low: 350, average: 550, high: 850 },
      { serviceType: "Evaporator coil cleaning", low: 150, average: 275, high: 450 },
      { serviceType: "Emergency same-day AC repair", low: 200, average: 375, high: 600, unit: "plus parts" },
    ],
    subLinks: ["/hvac/ac-repair", "/hvac/emergency-hvac", "/hvac/hvac-maintenance"],
    hoods: ["sun-city/hvac", "wolf-ranch/hvac"],
    local:
      "Georgetown AC repair peaks when heat indexes exceed 105°F and systems in Wolf Ranch and Sun City run near continuously from June through September.",
    factors:
      "System age, attic access in two-story Teravista homes, refrigerant type, warranty status, and whether cedar pollen has clogged the coil before a part actually failed.",
    included:
      "Quotes should separate diagnostic fees, parts, refrigerant by pound, and labor. Ask if the trip fee applies toward repair if you proceed the same day.",
    redFlags:
      "Avoid techs who add refrigerant without fixing a leak, won't provide model/serial documentation, or pressure full replacement on the first visit for a $200 part.",
    diy:
      "Filter changes and clearing debris around the condenser are DIY; electrical, refrigerant, and compressor work require EPA-certified pros.",
  },
  {
    slug: "ac-installation-cost-georgetown-tx",
    serviceName: "AC Installation",
    shortName: "AC installation",
    serviceLabel: "HVAC",
    parentServicePath: "/services/hvac",
    angiCategorySlug: "hvac",
    thumbtackCategory: "hvac-contractors",
    extended: false,
    featured: true,
    indexBlurb: "Full system replacement and new AC installs sized for Georgetown summers.",
    summaryLow: 5500,
    summaryHigh: 14000,
    priceRows: [
      { serviceType: "3-ton AC + air handler (replace)", low: 5500, average: 7500, high: 9500 },
      { serviceType: "4-ton system (larger single-story)", low: 6500, average: 8500, high: 11000 },
      { serviceType: "5-ton system (large home)", low: 8000, average: 10500, high: 14000 },
      { serviceType: "Duct modifications (minor)", low: 500, average: 1200, high: 2500 },
      { serviceType: "Smart thermostat (installed)", low: 250, average: 400, high: 650 },
      { serviceType: "Permit + inspection (typical)", low: 150, average: 250, high: 400 },
    ],
    subLinks: ["/hvac/ac-installation", "/hvac/mini-split-installation", "/hvac/heat-pump-installation"],
    hoods: ["teravista/hvac", "wolf-ranch/hvac"],
    local:
      "New AC installs in Georgetown must handle 100°F+ design days; undersized equipment in Sun City guest weeks leads to comfort complaints and high bills.",
    factors:
      "Tonage, SEER2 rating, duct condition, electrical panel capacity, crane access for rooftop units, and spring/summer booking backlog across Williamson County.",
    included:
      "A complete bid lists equipment model numbers, line-set reuse or replacement, pad, thermostat, permits, haul-away, and warranty registration.",
    redFlags:
      "Reject quotes without a Manual J or load calculation reference, cash discounts that skip permits, or brands you cannot verify through a local dealer.",
    diy:
      "AC installation is not DIY—Texas requires licensed HVAC contractors for refrigerant-bearing equipment.",
  },
  {
    slug: "roof-replacement-cost-georgetown-tx",
    serviceName: "Roof Replacement",
    shortName: "Roof replacement",
    serviceLabel: "Roofing",
    parentServicePath: "/services/roofing",
    angiCategorySlug: "roofing",
    thumbtackCategory: "roofers",
    extended: false,
    featured: true,
    indexBlurb: "Full shingle and architectural roof replacements after hail or age.",
    summaryLow: 9000,
    summaryHigh: 22000,
    priceRows: [
      { serviceType: "Architectural shingle (avg home)", low: 9000, average: 14000, high: 18000 },
      { serviceType: "Larger home / steep pitch", low: 12000, average: 17000, high: 22000 },
      { serviceType: "Decking repair (per sheet)", low: 75, average: 125, high: 200 },
      { serviceType: "Ridge vent upgrade", low: 400, average: 750, high: 1200 },
      { serviceType: "Pipe boot / flashing package", low: 300, average: 550, high: 900 },
      { serviceType: "Gutters (replace, avg home)", low: 1200, average: 1800, high: 2800 },
    ],
    subLinks: ["/roofing/roof-replacement", "/roofing/hail-damage-repair", "/roofing/metal-roofing"],
    hoods: ["sun-city/roofer", "wolf-ranch/roofer"],
    local:
      "Williamson County spring hail drives replacement demand; Sun City and Wolf Ranch HOAs often require specific shingle profiles and contractor insurance certificates.",
    factors:
      "Squares of roof, pitch, layers to tear off, decking damage, skylights, insurance vs cash-pay pricing, and storm-season crew availability.",
    included:
      "Written scopes should list shingle brand/line, underlayment, ice-and-water shield at valleys, drip edge, ventilation, and disposal.",
    redFlags:
      "Storm chasers with out-of-state plates, full upfront deposits, and quotes far below neighbors without explaining cheaper materials are common red flags.",
    diy:
      "Roof replacement is not DIY—falls, code, and manufacturer warranty all require licensed roofers.",
  },
  {
    slug: "roof-repair-cost-georgetown-tx",
    serviceName: "Roof Repair",
    shortName: "Roof repair",
    serviceLabel: "Roofing",
    parentServicePath: "/services/roofing",
    angiCategorySlug: "roofing",
    thumbtackCategory: "roofers",
    extended: false,
    featured: true,
    indexBlurb: "Leak patches, shingle replacement, flashing, and post-storm tune-ups.",
    summaryLow: 300,
    summaryHigh: 2500,
    priceRows: [
      { serviceType: "Roof inspection (written report)", low: 0, average: 150, high: 300 },
      { serviceType: "Minor shingle repair (few tabs)", low: 300, average: 550, high: 850 },
      { serviceType: "Pipe boot replacement", low: 250, average: 400, high: 650 },
      { serviceType: "Chimney flashing repair", low: 400, average: 750, high: 1200 },
      { serviceType: "Valley repair (localized)", low: 500, average: 900, high: 1500 },
      { serviceType: "Emergency tarp (storm)", low: 300, average: 500, high: 900 },
    ],
    subLinks: ["/roofing/roof-repair", "/roofing/emergency-roof-repair", "/roofing/roof-inspection"],
    hoods: ["teravista/roofer", "sun-city/hail-damage"],
    local:
      "Georgetown roof repairs spike after hail; ceiling stains in Teravista two-stories often trace to boot failures rather than field shingles.",
    factors:
      "Roof pitch, tile vs shingle, matching aged shingles, insurance documentation needs, and whether decking is soft when the tech walks the slope.",
    included:
      "Repair quotes should specify number of squares touched, matching shingle source, and whether the fee includes a follow-up rain check.",
    redFlags:
      "Door-to-door 'free inspection' that ends in a full replacement recommendation without photos, or cash-only repairs with no local address.",
    diy:
      "Do not walk steep roofs yourself; interior bucket catching is temporary—call a roofer for active leaks before mold sets in Georgetown humidity.",
  },
  {
    slug: "electrician-cost-georgetown-tx",
    serviceName: "an Electrician",
    shortName: "Electrician",
    serviceLabel: "Electrical",
    parentServicePath: "/services/electrical",
    angiCategorySlug: "electrical",
    thumbtackCategory: "electricians",
    extended: true,
    featured: true,
    indexBlurb: "Service calls, outlets, breakers, and whole-home electrical work.",
    summaryLow: 125,
    summaryHigh: 4000,
    priceRows: [
      { serviceType: "Service call / diagnostic", low: 89, average: 125, high: 175 },
      { serviceType: "Outlet or switch replacement", low: 125, average: 200, high: 350 },
      { serviceType: "Ceiling fan install (existing box)", low: 150, average: 250, high: 400 },
      { serviceType: "Circuit breaker replacement", low: 150, average: 250, high: 400 },
      { serviceType: "Whole-home surge protector", low: 300, average: 500, high: 750 },
      { serviceType: "Light fixture install (per fixture)", low: 100, average: 175, high: 300 },
    ],
    subLinks: ["/electrical/outlet-installation", "/electrical/emergency-electrician", "/electrical/lighting-installation"],
    hoods: ["teravista/electrician", "wolf-ranch/electrician"],
    local:
      "Georgetown electricians stay busy with panel upgrades for EV chargers in Wolf Ranch and accessibility retrofits in Sun City.",
    factors:
      "Panel age, attic crawl length, AFCI/GFCI code updates, permit fees in Georgetown city limits, and whether the job needs a utility disconnect.",
    included:
      "Estimates should list labor rate, parts, permit, and inspection. Ask if the service call credits toward same-day repair.",
    redFlags:
      "Unlicensed handymen on panel work, quotes without a panel photo, and anyone who bypasses breakers instead of fixing the root cause.",
    diy:
      "Swap a light bulb or reset a GFCI; anything in the panel, new circuits, or aluminum wiring needs a licensed electrician.",
  },
  {
    slug: "panel-upgrade-cost-georgetown-tx",
    serviceName: "an Electrical Panel Upgrade",
    shortName: "Panel upgrade",
    serviceLabel: "Electrical",
    parentServicePath: "/services/electrical",
    angiCategorySlug: "electrical",
    thumbtackCategory: "electricians",
    extended: true,
    featured: false,
    indexBlurb: "100A to 200A upgrades for EV chargers, additions, and older Georgetown homes.",
    summaryLow: 1800,
    summaryHigh: 4500,
    priceRows: [
      { serviceType: "100A → 200A panel swap", low: 1800, average: 2800, high: 3500 },
      { serviceType: "Meter base / service entrance work", low: 500, average: 1200, high: 2500 },
      { serviceType: "Subpanel add (garage/shop)", low: 800, average: 1400, high: 2200 },
      { serviceType: "Whole-house rewire (avg home)", low: 8000, average: 12000, high: 18000 },
      { serviceType: "Permit + inspection", low: 200, average: 350, high: 500 },
    ],
    subLinks: ["/electrical/panel-upgrade", "/electrical/ev-charger-installation", "/electrical/whole-home-rewiring"],
    hoods: ["georgetown-village/electrician", "sun-city/electrician"],
    local:
      "Older Georgetown Village homes on 100A panels often need upgrades before adding heat pumps or EV chargers—utility coordination adds lead time.",
    factors:
      "Aerial vs underground service, mast damage, grounding electrode upgrades, stucco repair after wall penetrations, and Austin Energy / Oncor scheduling.",
    included:
      "Scope should list panel brand, amperage, new breakers included, labeling, permit, and whether the utility fee is separate.",
    redFlags:
      "Panel swaps without permits, used panels, or quotes that don't mention grounding upgrades on 1970s homes.",
    diy:
      "Panel work is never DIY—licensed electricians and utility disconnects are mandatory.",
  },
  {
    slug: "landscaping-cost-georgetown-tx",
    serviceName: "Landscaping",
    shortName: "Landscaping",
    serviceLabel: "Landscaping",
    parentServicePath: "/services/landscaping",
    angiCategorySlug: "landscaping",
    thumbtackCategory: "landscapers",
    extended: true,
    featured: false,
    indexBlurb: "Design, beds, sod, irrigation, and seasonal projects on clay soil.",
    summaryLow: 500,
    summaryHigh: 12000,
    priceRows: [
      { serviceType: "Landscape design (plan only)", low: 500, average: 1200, high: 2500 },
      { serviceType: "Bed refresh (mulch + plants)", low: 800, average: 2000, high: 4500 },
      { serviceType: "Sod installation", low: 1500, average: 3500, high: 7000, unit: "(avg backyard)" },
      { serviceType: "Tree planting (per tree, installed)", low: 250, average: 450, high: 800 },
      { serviceType: "Full irrigation install", low: 3500, average: 5500, high: 9000 },
      { serviceType: "Hardscape patio (basic)", low: 4000, average: 8000, high: 15000 },
    ],
    subLinks: ["/landscaping/landscape-design", "/landscaping/sod-installation", "/landscaping/sprinkler-installation"],
    hoods: ["berry-creek/landscaping", "georgetown-village/landscaping"],
    local:
      "Georgetown landscaping must account for clay soil, watering restrictions, and Bermuda vs St. Augustine maintenance windows.",
    factors:
      "Lot size, plant maturity, irrigation zones, access for equipment, and summer heat limiting install windows.",
    included:
      "Quotes should specify plant sizes, soil amendment, warranty on plant material, and irrigation controller programming.",
    redFlags:
      "Vague 'full yard makeover' pricing, no irrigation plan on sod jobs, and crews without insurance for hardscape work.",
    diy:
      "Mulch spreading and small annual beds are DIY; irrigation trenches, large trees, and retaining walls need pros.",
  },
  {
    slug: "lawn-care-cost-georgetown-tx",
    serviceName: "Lawn Care",
    shortName: "Lawn care",
    serviceLabel: "Landscaping",
    parentServicePath: "/services/landscaping",
    angiCategorySlug: "landscaping",
    thumbtackCategory: "landscapers",
    extended: true,
    featured: false,
    indexBlurb: "Mowing, fertilization, weed control, and monthly lawn plans.",
    summaryLow: 40,
    summaryHigh: 280,
    priceRows: [
      { serviceType: "Mowing (avg lot)", low: 40, average: 55, high: 75, unit: "per visit" },
      { serviceType: "Mow + edge + blow", low: 50, average: 70, high: 95, unit: "per visit" },
      { serviceType: "Monthly maintenance plan", low: 140, average: 200, high: 280, unit: "/month" },
      { serviceType: "Fertilization (per application)", low: 50, average: 75, high: 120 },
      { serviceType: "Aeration + overseed", low: 150, average: 250, high: 400 },
      { serviceType: "Leaf cleanup (seasonal)", low: 150, average: 275, high: 450 },
    ],
    subLinks: ["/landscaping/lawn-mowing", "/landscaping/seasonal-cleanup", "/landscaping/mulching"],
    hoods: ["wolf-ranch/landscaping", "berry-creek/landscaping"],
    local:
      "Georgetown lawn care peaks in growing season; clay soil in Wolf Ranch holds water and can create fungus if mow schedules slip during humid weeks.",
    factors:
      "Lot square footage, gate access, pet waste policies, frequency, and whether fertilization is bundled.",
    included:
      "Monthly plans should list visit count, edging, blowing, and what happens on rain days.",
    redFlags:
      "Door-to-door 'weed treatment' without licensing info and per-visit prices that change every invoice without scope changes.",
    diy:
      "Mowing and basic edging are DIY if you own equipment; herbicide programs and aeration are often cheaper bundled with pros.",
  },
  {
    slug: "pest-control-cost-georgetown-tx",
    serviceName: "Pest Control",
    shortName: "Pest control",
    serviceLabel: "Pest Control",
    parentServicePath: "/services/pest-control",
    angiCategorySlug: "pest-control",
    thumbtackCategory: "pest-control",
    extended: true,
    featured: false,
    indexBlurb: "Perimeter treatments, quarterly plans, and general pest programs.",
    summaryLow: 99,
    summaryHigh: 350,
    priceRows: [
      { serviceType: "Initial general pest treatment", low: 150, average: 225, high: 350 },
      { serviceType: "Quarterly perimeter plan", low: 99, average: 140, high: 185, unit: "per visit" },
      { serviceType: "Mosquito treatment (seasonal)", low: 75, average: 120, high: 175, unit: "per visit" },
      { serviceType: "Rodent exclusion package", low: 350, average: 550, high: 900 },
      { serviceType: "Wasp / hive removal", low: 150, average: 250, high: 400 },
    ],
    subLinks: ["/pest-control/ant-control", "/pest-control/mosquito-control", "/pest-control/rodent-control"],
    hoods: ["georgetown-village/pest-control", "berry-creek/pest-control"],
    local:
      "Fire ants, scorpions, and roof rats flare with Georgetown heat; cedar pollen season drives spider pressure along eaves.",
    factors:
      "Home size, crawl vs slab, pet-safe product requirements, and whether you need one-time or recurring service.",
    included:
      "Contracts should list covered pests, interior vs exterior, re-treat policy, and cancellation terms.",
    redFlags:
      "High-pressure annual contracts on the first visit and companies that won't put chemical names in writing.",
    diy:
      "Traps and gel baits for minor ant lines are DIY; scorpions, termites, and rodents usually need licensed applicators.",
  },
  {
    slug: "termite-treatment-cost-georgetown-tx",
    serviceName: "Termite Treatment",
    shortName: "Termite treatment",
    serviceLabel: "Pest Control",
    parentServicePath: "/services/pest-control",
    angiCategorySlug: "pest-control",
    thumbtackCategory: "pest-control",
    extended: true,
    featured: false,
    indexBlurb: "Liquid barriers, bait systems, and WDI reports for Georgetown homes.",
    summaryLow: 500,
    summaryHigh: 2800,
    priceRows: [
      { serviceType: "Termite inspection (WDI report)", low: 75, average: 125, high: 200 },
      { serviceType: "Subterranean treatment (avg home)", low: 800, average: 1400, high: 2200 },
      { serviceType: "Bait system installation", low: 600, average: 1000, high: 1600 },
      { serviceType: "Annual renewal / monitoring", low: 150, average: 250, high: 400, unit: "/year" },
      { serviceType: "Localized spot treatment", low: 500, average: 850, high: 1200 },
    ],
    subLinks: ["/pest-control/termite-treatment", "/pest-control/rodent-control", "/pest-control/scorpion-control"],
    hoods: ["sun-city/pest-control", "teravista/pest-control"],
    local:
      "Subterranean termites are common in Central Texas clay; pier-and-beam pockets in older Georgetown stock need inspection at sills.",
    factors:
      "Linear footage of foundation, slab vs crawl, active infestation vs preventive, and warranty length (often tied to annual renewals).",
    included:
      "Treatment proposals should show diagram of drill points or bait stations, product used, and transferable warranty terms.",
    redFlags:
      "Panic sales after a 'free' inspection, companies without TPCL license numbers, and warranties that void if you miss renewal by one day.",
    diy:
      "Termite treatment is not DIY—lenders and realtors require licensed WDI documentation in Texas.",
  },
  {
    slug: "foundation-repair-cost-georgetown-tx",
    serviceName: "Foundation Repair",
    shortName: "Foundation repair",
    serviceLabel: "Foundation",
    parentServicePath: "/services/foundation",
    angiCategorySlug: "foundation-repair",
    thumbtackCategory: "foundation-repair",
    extended: true,
    featured: true,
    indexBlurb: "Piers, leveling, drainage, and clay-soil movement fixes.",
    summaryLow: 3500,
    summaryHigh: 15000,
    priceRows: [
      { serviceType: "Foundation evaluation", low: 0, average: 200, high: 400 },
      { serviceType: "Pressed concrete pier (each)", low: 1200, average: 1500, high: 1800 },
      { serviceType: "Steel pier (each)", low: 1800, average: 2400, high: 3000 },
      { serviceType: "Typical home stabilization (8–12 piers)", low: 4500, average: 8500, high: 15000 },
      { serviceType: "Drainage correction (French drain)", low: 2000, average: 3500, high: 6000 },
      { serviceType: "Surface drainage / grading", low: 1500, average: 2800, high: 4500 },
    ],
    subLinks: ["/foundation/foundation-repair", "/foundation/pier-and-beam-repair", "/foundation/drainage-correction"],
    hoods: ["wolf-ranch/foundation-repair", "teravista/foundation-repair"],
    local:
      "Expansive clay around Georgetown shrinks in drought and swells after gully washers—Wolf Ranch and Teravista see seasonal door-gap complaints.",
    factors:
      "Pier count, interior vs exterior lift, plumbing tests after lift, landscaping restoration, and engineering letter requirements.",
    included:
      "Contracts should list pier type, depth guarantee, lift tolerance, and whether plumbing/static tests are included.",
    redFlags:
      "Single-price-per-pier quotes without a elevation survey, cash-only crews, and 'today only' discounts after a free inspection.",
    diy:
      "Monitor cracks and downspout extensions are DIY; pier installation and hydraulic leveling require specialized foundation contractors.",
  },
  {
    slug: "house-cleaning-cost-georgetown-tx",
    serviceName: "House Cleaning",
    shortName: "House cleaning",
    serviceLabel: "Cleaning",
    parentServicePath: "/services/house-cleaning",
    angiCategorySlug: "house-cleaning",
    thumbtackCategory: "house-cleaning",
    extended: true,
    featured: true,
    indexBlurb: "Standard, deep, and recurring cleans for Georgetown homes.",
    summaryLow: 120,
    summaryHigh: 400,
    priceRows: [
      { serviceType: "Standard clean (2–3 bed)", low: 120, average: 165, high: 220 },
      { serviceType: "Deep clean (same size)", low: 200, average: 275, high: 350 },
      { serviceType: "Move-in / move-out clean", low: 250, average: 350, high: 450 },
      { serviceType: "Weekly recurring (discount)", low: 110, average: 145, high: 185, unit: "per visit" },
      { serviceType: "Interior windows (add-on)", low: 75, average: 125, high: 200 },
      { serviceType: "Inside oven + fridge (add-on)", low: 50, average: 85, high: 125 },
    ],
    subLinks: ["/cleaning/house-cleaning", "/cleaning/deep-cleaning", "/cleaning/recurring-cleaning"],
    hoods: ["sun-city/house-cleaning", "georgetown-village/house-cleaning"],
    local:
      "Hard water spotting on fixtures and cedar pollen on sills make deep cleans popular in Sun City before guest weeks.",
    factors:
      "Square footage, pets, clutter level, frequency discounts, and whether supplies are included.",
    included:
      "Checklists should list rooms, baseboards, interior windows, and cancellation policy for recurring plans.",
    redFlags:
      "Quotes without a walkthrough for first cleans, cleaners without insurance, and cash payments with no service agreement.",
    diy:
      "Routine tidying is DIY; move-out cleans and post-construction dust are usually faster with a crew.",
  },
  {
    slug: "water-heater-installation-cost-georgetown-tx",
    serviceName: "Water Heater Installation",
    shortName: "Water heater installation",
    serviceLabel: "Plumbing",
    parentServicePath: "/services/plumbing",
    angiCategorySlug: "plumbing",
    thumbtackCategory: "plumbers",
    extended: false,
    featured: false,
    indexBlurb: "Tank, tankless, and heat-pump water heaters with permits.",
    summaryLow: 1200,
    summaryHigh: 4500,
    priceRows: [
      { serviceType: "40–50 gal tank (installed)", low: 1200, average: 1850, high: 2500 },
      { serviceType: "Tankless gas (installed)", low: 2800, average: 3800, high: 5000 },
      { serviceType: "Heat-pump water heater", low: 2200, average: 3200, high: 4500 },
      { serviceType: "Pan / drain line upgrade", low: 150, average: 275, high: 450 },
      { serviceType: "Gas line upsize (tankless)", low: 400, average: 750, high: 1200 },
      { serviceType: "Permit + inspection", low: 75, average: 125, high: 200 },
    ],
    subLinks: ["/plumbing/water-heater-installation", "/plumbing/pipe-repair", "/plumbing/leak-detection"],
    hoods: ["wolf-ranch/plumber", "sun-city/plumber"],
    local:
      "Hard Georgetown water eats tanks faster—Teravista garages often house heaters that need anode checks every few years.",
    factors:
      "Fuel type, venting changes, pan drains to exterior, code upgrades on gas lines, and same-day emergency premiums.",
    included:
      "Install quotes should list heater model, warranty, haul-away, permit, and whether expansion tanks are included.",
    redFlags:
      "Installers who won't pull permits, reuse flex gas lines against code, or skip pan drains on second-floor closets.",
    diy:
      "Water heater installs are not DIY in Texas—permit, gas, and venting require licensed plumbers.",
  },
  {
    slug: "drain-cleaning-cost-georgetown-tx",
    serviceName: "Drain Cleaning",
    shortName: "Drain cleaning",
    serviceLabel: "Plumbing",
    parentServicePath: "/services/plumbing",
    angiCategorySlug: "plumbing",
    thumbtackCategory: "plumbers",
    extended: false,
    featured: false,
    indexBlurb: "Snaking, hydro-jetting, and camera inspections for clogged lines.",
    summaryLow: 125,
    summaryHigh: 650,
    priceRows: [
      { serviceType: "Kitchen or bath snake", low: 125, average: 200, high: 325 },
      { serviceType: "Main line clearing", low: 250, average: 400, high: 650 },
      { serviceType: "Hydro-jet (main line)", low: 350, average: 550, high: 850 },
      { serviceType: "Camera inspection (add-on)", low: 150, average: 250, high: 400 },
      { serviceType: "Roof vent clearing", low: 175, average: 275, high: 425 },
    ],
    subLinks: ["/plumbing/drain-cleaning", "/plumbing/sewer-line-repair", "/plumbing/emergency-plumber"],
    hoods: ["berry-creek/plumber", "georgetown-village/plumber"],
    local:
      "Roots and grease backups are common in Georgetown Village mature lines; Sun City guest weeks stack shower load on older drains.",
    factors:
      "Access cleanouts, recurring clogs suggesting bellies, cast iron vs PVC, and whether hydro-jetting is warranted after camera.",
    included:
      "Quotes should state if pricing is per fixture or main line, and whether camera footage is included.",
    redFlags:
      "Flat 'any drain' pricing without access check, and companies that snake repeatedly without recommending camera after third call.",
    diy:
      "Plungers and hair traps are DIY; main line stoppages and roof vents need pro equipment.",
  },
  {
    slug: "hvac-maintenance-cost-georgetown-tx",
    serviceName: "HVAC Maintenance",
    shortName: "HVAC maintenance",
    serviceLabel: "HVAC",
    parentServicePath: "/services/hvac",
    angiCategorySlug: "hvac",
    thumbtackCategory: "hvac-contractors",
    extended: false,
    featured: false,
    indexBlurb: "Spring/fall tune-ups, filter plans, and preventive AC service.",
    summaryLow: 89,
    summaryHigh: 450,
    priceRows: [
      { serviceType: "Spring AC tune-up", low: 89, average: 129, high: 175 },
      { serviceType: "Fall heating check", low: 89, average: 125, high: 165 },
      { serviceType: "Annual maintenance plan (2 visits)", low: 180, average: 250, high: 350, unit: "/year" },
      { serviceType: "Coil cleaning (add-on)", low: 125, average: 200, high: 325 },
      { serviceType: "Duct cleaning (whole home)", low: 350, average: 550, high: 900 },
      { serviceType: "UV light install (add-on)", low: 400, average: 600, high: 850 },
    ],
    subLinks: ["/hvac/hvac-maintenance", "/hvac/air-duct-cleaning", "/hvac/ac-repair"],
    hoods: ["sun-city/hvac", "teravista/hvac"],
    local:
      "Cedar pollen clogs condenser coils fast—Sun City homes near golf courses often need mid-summer rinse between tune-ups.",
    factors:
      "Number of systems, attic accessibility, filter size upgrades, and whether maintenance credits apply to future repairs.",
    included:
      "Tune-up checklists should cover amp draws, delta-T, drain clearing, and written findings—not just a filter swap.",
    redFlags:
      "Maintenance visits that always end in upsell parts without measurements, or plans that auto-renew without clear cancellation.",
    diy:
      "Filter changes and condenser rinses are DIY; refrigerant, electrical testing, and gas heat exchanger checks belong to HVAC techs.",
  },
];

function hoodLabel(path) {
  const [hood, svc] = path.split("/");
  const names = {
    "sun-city": "Sun City",
    teravista: "Teravista",
    "wolf-ranch": "Wolf Ranch",
    "berry-creek": "Berry Creek",
    "georgetown-village": "Georgetown Village",
  };
  const svcNames = {
    plumber: "Plumbing",
    hvac: "HVAC",
    roofer: "Roofing",
    electrician: "Electrical",
    landscaping: "Landscaping",
    "pest-control": "Pest control",
    "foundation-repair": "Foundation",
    "house-cleaning": "House cleaning",
  };
  return { label: `${names[hood] ?? hood} home services`, href: `/neighborhoods/${hood}/home-services` };
}

const LICENSE_HINT = {
  Plumbing: "a valid TSBPE plumbing license",
  HVAC: "a TDLR HVAC license",
  Roofing: "proof of insurance and local references (Texas does not license roofers at the state level)",
  Electrical: "a Texas licensed electrician",
  Landscaping: "general liability insurance and a written scope",
  "Pest Control": "a TPCL applicator license",
  Foundation: "a documented repair plan and transferable warranty terms",
  Cleaning: "workers’ compensation and liability insurance",
};

function budgetPhrase(g) {
  const n = g.serviceName.toLowerCase();
  if (n.startsWith("a ") || n.startsWith("an ")) return g.serviceName;
  return `${g.serviceLabel.toLowerCase()} work`;
}

function buildBody(g) {
  const license = LICENSE_HINT[g.serviceLabel] ?? "appropriate licensing and insurance";
  const includedLine = g.included.endsWith(".") ? g.included : `${g.included}.`;
  const season =
    g.serviceLabel === "HVAC"
      ? "July heat and first cold snaps fill HVAC calendars—spring and fall tune-ups book easier than emergency August slots."
      : g.serviceLabel === "Roofing"
        ? "Hail season stacks roofing demand across Williamson County; documented photos help you compare scopes without rush signing."
        : g.serviceLabel === "Plumbing"
          ? "Guest weeks in Sun City and holiday cooking loads spike drain calls—schedule non-emergency work between peaks when you can."
          : "Off-peak weeks outside major storms and holidays usually mean better availability and steadier pricing.";
  return [
    `If you are budgeting for ${budgetPhrase(g)} in Georgetown, TX, most jobs fall between ${fmt(g.summaryLow)} and ${fmt(g.summaryHigh)}—use the table below as a ${YEAR} planning band before you sign anything. ${g.local}`,
    `What moves the number in Williamson County: ${g.factors}`,
    `Solid quotes clearly list ${includedLine.charAt(0).toLowerCase()}${includedLine.slice(1)} Ask how change orders are handled if the scope grows after opening a roof deck, panel, or slab access.`,
    `Watch for trouble: ${g.redFlags} Compare two estimates and verify ${license}.`,
    `DIY or pro? ${g.diy}`,
    season,
    `Neighborhood context: ${g.hoods.map((p) => p.replace("/", " — ")).join("; ")} pricing can differ from downtown Georgetown bungalows when access, HOA rules, or lot size change crew time.`,
    `Use the ${g.serviceLabel.toLowerCase()} hub and linked sub-service pages below to compare scopes before you authorize work.`,
  ];
}

function buildFaqs(g) {
  const whyLocal =
    g.whyLocal ??
    `${g.local} Labor, materials, and scheduling in Georgetown and Williamson County sit above many national averages because of heat load, clay soil, and population growth.`;
  const insurance =
    g.insuranceFaq ??
    (g.serviceLabel === "Foundation"
      ? "Gradual soil movement and maintenance cracks are usually excluded; sudden plumbing leaks under a slab may be a separate claim—document dates and get plumber findings in writing."
      : g.serviceLabel === "Roofing"
        ? "Sudden hail or wind damage may be covered subject to your wind/hail deductible; cosmetic-only endorsements can limit payout—photograph soft metals and file timely notice."
        : g.serviceLabel === "Cleaning" || g.serviceLabel === "Landscaping"
          ? "Routine cleaning and lawn care are maintenance expenses and are not typically covered by homeowners insurance."
          : "Sudden and accidental damage—like certain storm or pipe burst events—may be covered, while wear and gradual failures usually are not. Call your adjuster before major work.");
  return [
    {
      question: `How much does ${g.shortName} cost in Georgetown, TX?`,
      answer: `Most ${g.shortName} projects in Georgetown fall between ${fmt(g.summaryLow)} and ${fmt(g.summaryHigh)}. The table above breaks out common job types; emergencies, permits, and access issues can push totals higher.`,
    },
    {
      question: `Why does ${g.shortName} cost more in Georgetown than national averages?`,
      answer: whyLocal,
    },
    {
      question: `How do I compare ${g.shortName} quotes fairly?`,
      answer: `Request the same scope from each bidder: ${g.included} Match warranty terms, permit responsibility, and cleanup—not just the bottom line.`,
    },
    {
      question: `Is ${g.shortName} covered by homeowners insurance?`,
      answer: insurance,
    },
  ];
}

function fmt(n) {
  return `$${n.toLocaleString("en-US")}`;
}

function metaDesc(g) {
  const base = `How much does ${g.shortName} cost in Georgetown TX? ${YEAR} range ${fmt(g.summaryLow)}–${fmt(g.summaryHigh)}. Local low, average & high tables, hiring tips, and FAQs for Williamson County.`;
  return base.length <= 160 ? base : base.slice(0, 157) + "…";
}

function titleCaseShort(short) {
  return short.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bAc\b/g, "AC").replace(/\bHvac\b/g, "HVAC");
}

const pages = GUIDES.map((g) => {
  const absoluteTitle = `${titleCaseShort(g.shortName)} Cost in Georgetown, TX (${YEAR}) | ${SITE_NAME}`;
  const internalLinks = [
    { label: `${g.serviceLabel} service hub`, href: g.parentServicePath },
    ...g.subLinks.map((href) => ({
      label: href.split("/").pop().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href,
    })),
    ...g.hoods.map((h) => hoodLabel(h)),
  ];
  return {
    slug: g.slug,
    serviceName: g.serviceName,
    shortName: g.shortName,
    serviceLabel: g.serviceLabel,
    parentServicePath: g.parentServicePath,
    angiCategorySlug: g.angiCategorySlug,
    thumbtackCategory: g.thumbtackCategory,
    extended: g.extended,
    featured: g.featured,
    indexBlurb: g.indexBlurb,
    year: YEAR,
    h1: `How Much Does ${costGuideHeading(g)} Cost in Georgetown, TX? (${YEAR} Guide)`,
    absoluteTitle,
    metaDescription: metaDesc(g),
    pricingIntro: `Typical ${g.shortName} price bands reported by Georgetown-area homeowners and aligned with Williamson County contractor estimates (${YEAR}).`,
    bodyParagraphs: buildBody(g),
    priceRows: g.priceRows,
    summaryRange: { low: g.summaryLow, high: g.summaryHigh },
    faqs: buildFaqs(g),
    internalLinks,
  };
});

function capitalizeService(name) {
  if (name.startsWith("a ") || name.startsWith("an ")) {
    const article = name.split(" ")[0];
    const rest = name.slice(article.length + 1);
    return `${article} ${rest.charAt(0).toUpperCase()}${rest.slice(1)}`;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function costGuideHeading(g) {
  if (g.shortName.toLowerCase() === "plumber") return "a Plumber";
  if (g.serviceName.startsWith("a ") || g.serviceName.startsWith("an ")) {
    return capitalizeService(g.serviceName);
  }
  return capitalizeService(g.shortName);
}

const out = `/**
 * Cost guide pages at \`/costs/[slug]\` — high-intent "how much does it cost" content.
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
};

export const COST_GUIDE_SLUGS = ${JSON.stringify(GUIDES.map((g) => g.slug), null, 2)} as const;

export const costGuidePages: CostGuidePage[] = ${JSON.stringify(pages, null, 2)};

const pageMap = new Map(costGuidePages.map((p) => [p.slug, p]));

export function getCostGuidePage(slug: string): CostGuidePage | undefined {
  return pageMap.get(slug);
}

export function getCostGuideStaticParams(): { slug: string }[] {
  return costGuidePages.map((p) => ({ slug: p.slug }));
}

export function getCostGuidePaths(): string[] {
  return costGuidePages.map((p) => \`/costs/\${p.slug}\`);
}

export function getFeaturedCostGuides(): CostGuidePage[] {
  return costGuidePages.filter((p) => p.featured);
}
`;

const paths = pages.map((p) => `/costs/${p.slug}`);
paths.push("/costs");

fs.writeFileSync(path.join(process.cwd(), "data/cost-guides.ts"), out, "utf8");
fs.writeFileSync(path.join(process.cwd(), "data/cost-guide-paths.json"), JSON.stringify(paths, null, 2), "utf8");
console.log(`Wrote ${pages.length} cost guides`);
