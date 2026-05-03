/**
 * Static neighborhood × service landing pages under `/neighborhoods/[neighborhood]/[service]`.
 * `metaTitle` is the segment before the site title template (`… | Georgetown Home Services`).
 */

export type NeighborhoodServicePage = {
  neighborhoodSlug: string;
  neighborhoodName: string;
  serviceSlug: string;
  serviceName: string;
  serviceCategory: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whyLocal: string;
  commonIssues: string[];
  internalLinks: { label: string; href: string }[];
  bestOfHref: string;
  serviceHref: string;
};

/** Alias for consumers that prefer the shorter type name. */
export type NeighborhoodPage = NeighborhoodServicePage;

const SVC = {
  plumber: { serviceHref: "/services/plumber-georgetown-tx", best: "/best/best-plumbers-georgetown-tx", cat: "plumbing" },
  hvac: { serviceHref: "/services/hvac-georgetown-tx", best: "/best/top-hvac-companies-georgetown-tx", cat: "hvac" },
  roofer: { serviceHref: "/services/roofer-georgetown-tx", best: "/best/best-roofers-georgetown-tx", cat: "roofing" },
  electrician: {
    serviceHref: "/services/electrician-georgetown-tx",
    best: "/best/best-electricians-georgetown-tx",
    cat: "electrical",
  },
  landscaping: {
    serviceHref: "/services/landscaping-georgetown-tx",
    best: "/best/best-landscaping-companies-georgetown-tx",
    cat: "landscaping",
  },
  "pest-control": {
    serviceHref: "/services/pest-control-georgetown-tx",
    best: "/best/best-pest-control-georgetown-tx",
    cat: "pest control",
  },
  "foundation-repair": {
    serviceHref: "/services/foundation-repair-georgetown-tx",
    best: "/best/best-foundation-repair-georgetown-tx",
    cat: "foundation",
  },
  "house-cleaning": {
    serviceHref: "/services/house-cleaning-georgetown-tx",
    best: "/best/best-house-cleaning-services-georgetown-tx",
    cat: "cleaning",
  },
} as const;

function linksFor(
  key: keyof typeof SVC,
  extras: { label: string; href: string }[],
): { label: string; href: string }[] {
  const s = SVC[key];
  return [
    { label: "Service guide (Georgetown, TX)", href: s.serviceHref },
    { label: "Best-of directory & provider list", href: s.best },
    ...extras,
  ];
}

export const neighborhoodServicePages: NeighborhoodServicePage[] = [
  // —— Sun City ——
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "plumber",
    serviceName: "Plumbers",
    serviceCategory: SVC.plumber.cat,
    h1: "Plumbing for Sun City homes: slabs, hard water, and real daily use",
    metaTitle: "Plumbers near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX plumbing: slab homes, hard water, guest-week surges—scope lines before jackhammer work near tied-in irrigation systems.",
    intro:
      "Sun City is a high-amenity 55+ community with older slab homes, heavy fixture rotation during visiting weeks, and irrigation systems tied into the same water habits that stress kitchen and bath drains. Small leaks and slow drains are rarely “random”—they usually trace to water quality, outdoor hose bibs, or decades-old stops that finally give way.",
    whyLocal:
      "Williamson County hard water eats cartridges and water heaters faster than coastal markets, and slab plumbing means wet spots on drywall may be feet away from the actual breach. A Sun City–aware plumber isolates irrigation versus domestic lines before committing you to a slab jack-and-patch story.",
    commonIssues: [
      "Guest-bath and kitchen drains that surge slow after holidays or tournaments because multiple showers stack at once",
      "Angle stops that weep behind lavatories when original valves outlast the trim kits you replaced five years ago",
      "Water heaters that run out faster in winter guest weeks while cold inlet temperature magnifies short cycling",
      "Irrigation backflow or hose-bib weeps that mimic slab leaks until a meter-side isolation test separates the systems",
    ],
    internalLinks: linksFor("plumber", [
      { label: "HVAC service guide (shared wall/crawl moisture clues)", href: SVC.hvac.serviceHref },
      { label: "Best roofers (ceiling stains often start as plumbing, not shingles)", href: SVC.roofer.best },
    ]),
    bestOfHref: SVC.plumber.best,
    serviceHref: SVC.plumber.serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "hvac",
    serviceName: "HVAC",
    serviceCategory: SVC.hvac.cat,
    h1: "HVAC reality checks for Sun City homes in Georgetown heat",
    metaTitle: "HVAC near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX HVAC: humid attics, packed filters, flex leaks faking low charge in 55+ homes—verify static pressure before adding refrigerant.",
    intro:
      "Sun City runs a lot of single-level homes with extended roof lines and mature landscaping that can starve outdoor units of airflow. Add triple-digit Georgetown summers and visitor-heavy weeks, and you get comfort complaints that look like “low refrigerant” but are often airflow, charge balance, or an aging blower that only fails under load.",
    whyLocal:
      "Comfort calls spike when everyone stays home during amenity events or family visits—exactly when your duct system sees maximum latent load. Technicians who treat Sun City as “just another ranch” miss how long duct runs and return placement drive upstairs-to-living wing deltas even on one-story plans.",
    commonIssues: [
      "Rooms that bake on the west side while the thermostat reads satisfied because the sensor sits in a cooler core hall",
      "Coils that freeze after a dirty filter marathon during dusty dry weeks when pollen clogs low returns",
      "Condensate safety switches tripping in high-humidity visitor weeks when drains aren’t clearing fast enough",
      "Capacitor or contactor wear that shows up as humming condensers during back-to-back 100°F afternoons",
    ],
    internalLinks: linksFor("hvac", [
      { label: "Plumbing guide (condensate and pan leaks vs supply leaks)", href: SVC.plumber.serviceHref },
      { label: "Electrical guide (breaker trips that look like HVAC failures)", href: SVC.electrician.serviceHref },
    ]),
    bestOfHref: SVC.hvac.best,
    serviceHref: SVC.hvac.serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "roofer",
    serviceName: "Roofers",
    serviceCategory: SVC.roofer.cat,
    h1: "Roof wear patterns Sun City homeowners should watch in Georgetown storms",
    metaTitle: "Roofers near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX roofing by fairways: aging shingles, pollen dams, wind at hips—inspect flashing early so spring storms do not stain ceilings.",
    intro:
      "Sun City roofs take relentless UV, oak pollen dumps, and wind ridges that stress hip and valley metal more than many owners realize. Because many homes here are older, granule loss and brittle ridge cap often precede obvious leaks—especially where patio add-ons created new wall-to-roof transitions.",
    whyLocal:
      "Tree-lined fairway views are great until clogged valleys hold moisture after a norther. Roofers who quote gutter cleans as “optional” on Sun City homes are missing how often overflow stains mimic attic leaks on low-slope rear patios facing the course.",
    commonIssues: [
      "Lifted ridge or hip shingles after spring wind events that homeowners don’t see from the driveway",
      "Flashing gaps around patio enclosures added after original shingle installation",
      "Skylight or solar-tube boots aging in sync with the field—even when the shingles look “fine” from the curb",
      "Attic intake that gets blocked when blown debris packs bird screens after April pollen weeks",
    ],
    internalLinks: linksFor("roofer", [
      { label: "Pest control (soffit gaps that let squirrels ahead of the next rain)", href: SVC["pest-control"].serviceHref },
      { label: "Landscaping (limbs brushing low slopes and granule loss)", href: SVC.landscaping.serviceHref },
    ]),
    bestOfHref: SVC.roofer.best,
    serviceHref: SVC.roofer.serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "electrician",
    serviceName: "Electricians",
    serviceCategory: SVC.electrician.cat,
    h1: "Electrical safety and upgrades for Sun City’s older Georgetown builds",
    metaTitle: "Electricians near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX electrical: legacy panels, EV adds, outdoor AFCIs tripping—hire permitted electricians who map neutrals on adult-community streets.",
    intro:
      "Many Sun City homes still run original split-bus or undersized panels that were perfect for 1990s loads but struggle with larger HVAC, tankless electric decisions, and kitchen appliance upgrades popular in active-adult downsizing moves. Flicker isn’t “normal Texas”—it’s often a loose bus or aging breaker that needs deliberate testing, not another power strip.",
    whyLocal:
      "Outdoor living circuits get expanded piecemeal—new patio lighting, holiday string plugs, golf cart chargers—without anyone recalculating feeder capacity. Sun City homes reward electricians who map actual measured loads, not just swap breakers until the panel “fits.”",
    commonIssues: [
      "Breaker trips when the oven preheats while the AC compressor starts on a hot visitor weekend",
      "Dimming on microwave start tied to weak neutrals in push-in heavy branch circuits from original trim-outs",
      "Garage corner plugs that never met code for continuous EV trickle charging in summer heat",
      "Outdoor GFCIs nuisance-tripping after sprinkler overspray seasons corrode device internals",
    ],
    internalLinks: linksFor("electrician", [
      { label: "HVAC service guide (locked rotors vs true electrical faults)", href: SVC.hvac.serviceHref },
      { label: "Foundation repair (wall cracks near meter feeds and conduit)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.electrician.best,
    serviceHref: SVC.electrician.serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "landscaping",
    serviceName: "Landscaping",
    serviceCategory: SVC.landscaping.cat,
    h1: "Landscaping that survives Sun City sun and water rules",
    metaTitle: "Landscaping near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX landscaping: HOA turf rules, drip at slabs, mulch off weeps—grade runoff away from post-tension edges before moisture wicks inward.",
    intro:
      "Sun City lots prize curb appeal for resale and club life, but thin Hill Country soil and irrigation overlap with foundation moisture make “pretty beds” expensive if crews pile mulch against bare slab perimeters. You need plans that keep grade away from weeps, reduce head-to-wall spray, and survive HOA scrutiny without baking foundation vents closed.",
    whyLocal:
      "Mature live oaks drop catkins that kill mower decks and clog emitters at the worst part of May. Sun City homeowners benefit from crews that schedule deep watering resets before visitor weeks—not generic “mow and blow” programs tuned to new suburbs with deeper loam.",
    commonIssues: [
      "Bermuda invading beds along fairway-facing fences where runoff and line-of-sight privacy plantings trap humidity",
      "Pop-up heads spraying stucco low and funneling water toward weep screed gaps on slab homes",
      "Rainbird-style controllers losing zone mapping after lightning events common west of I-35",
      "tree wells holding moisture against post-tension cables in ways newer Wolf Ranch clay never sees",
    ],
    internalLinks: linksFor("landscaping", [
      { label: "Pest control (fire ant berms attacking drip lines)", href: SVC["pest-control"].best },
      { label: "House cleaning (pollen films on porches after April events)", href: SVC["house-cleaning"].serviceHref },
    ]),
    bestOfHref: SVC.landscaping.best,
    serviceHref: SVC.landscaping.serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "pest-control",
    serviceName: "Pest control",
    serviceCategory: SVC["pest-control"].cat,
    h1: "Pest pressure Sun City homeowners feel before guests arrive",
    metaTitle: "Pest control near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX pests: slab ants, fairway rodents, patio wasps—treat boxes, gaps, and eaves with IPM, not blanket perimeter spray drift near patios.",
    intro:
      "Active-adult communities move food and foot traffic patterns in waves—club nights, bridge tournaments, and holiday grandkids—exactly when Argentine ants scout slab expansion joints and roof rats exploit unfenced fruit near cart paths. Spray-only programs fail here because they ignore entry physics on older homes with soft eaves.",
    whyLocal:
      "Sun City’s density means your neighbor’s mulch pile can be your ant superhighway in forty-eight hours. Technicians should perimeter-treat with attention to irrigation boxes and outdoor kitchen plumbing penetrations—not just broadcast the fence line.",
    commonIssues: [
      "Nighttime pantry ants following dishwasher supply lines behind cabinets on slab homes",
      "Paper wasps building under covered entries where recessed lights trap heat",
      "Norway or roof rats exploiting palm skirts and uncapped roof returns after mild winters",
      "Millipedes flooding patios when sprinkler runoff keeps bath rock perpetually damp",
    ],
    internalLinks: linksFor("pest-control", [
      { label: "Landscaping (mulch volcanoes and stem girdling invite pest bridges)", href: SVC.landscaping.serviceHref },
      { label: "Foundation repair (termite shelter tubes on older stem walls)", href: SVC["foundation-repair"].best },
    ]),
    bestOfHref: SVC["pest-control"].best,
    serviceHref: SVC["pest-control"].serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "foundation-repair",
    serviceName: "Foundation repair",
    serviceCategory: SVC["foundation-repair"].cat,
    h1: "Foundation clues Sun City owners should not blame on “settling”",
    metaTitle: "Foundation repair near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX foundations: post-tension slabs, tree moisture, irrigation creep—elevations before sales chase drought cycles without slope maps.",
    intro:
      "Sun City homes span early post-tension slabs with thinner perimeter beams and decades of seasonal soil shrink-swell amplified by tree rows and cart-path drainage. Diagonal drywall cracks above door headers, sticky interior doors after rain, and exterior brick step-cracks are data—not drama—when you know baseline slab elevation.",
    whyLocal:
      "Active landscaping and drip migration changes moisture profiles fifteen feet from where you notice drywall nail pops. Sun City evaluations should correlate recent irrigation reprogramming with crack acceleration windows, not sell piers because July was hot.",
    commonIssues: [
      "Doors that stick only after heavy rain followed by fast dry north wind weeks typical of Williamson County spring",
      "Veneer stair-steps tracking toward tree rows with aggressive surface roots near fairway lots",
      "Garage slab cracks widening where downspouts were removed during patio regrades",
      "Interior west-wall separation where afternoon sun bakes one exposure while shade keeps the opposite moist",
    ],
    internalLinks: linksFor("foundation-repair", [
      { label: "Plumbing (under-slab leak vs soil movement—test before piers)", href: SVC.plumber.best },
      { label: "Landscaping (negative grade and French drain misroutes)", href: SVC.landscaping.best },
    ]),
    bestOfHref: SVC["foundation-repair"].best,
    serviceHref: SVC["foundation-repair"].serviceHref,
  },
  {
    neighborhoodSlug: "sun-city",
    neighborhoodName: "Sun City",
    serviceSlug: "house-cleaning",
    serviceName: "House cleaning",
    serviceCategory: SVC["house-cleaning"].cat,
    h1: "House cleaning rhythms that fit Sun City travel and event weeks",
    metaTitle: "House cleaning near Sun City Georgetown TX (2026)",
    metaDescription:
      "Sun City Georgetown TX cleaning: oak pollen, limestone dust, delicate glass—deep-clean shutters, returns, and guest spaces without etching stone or brass.",
    intro:
      "Between club calendars and out-of-town grandkids, Sun City homes swing from barely lived-in quiet to high-traffic weekends fast. Hard water spots on glass, limestone dust on black porcelain, and fine oak pollen in returns are cosmetic nuisances that become move-out penalties if your crew treats this like a generic suburban tract clean.",
    whyLocal:
      "Many Sun City homes have textured ceilings and plantation shutters that cheap rotations skip—then you see fringe dust at eye level in raking winter light. Local teams know which guard gates need placards and what time pressure-wash crews flood driveways after tournaments.",
    commonIssues: [
      "Shower glass etching from minerals when cleaning sprays sit through Sunday crossword marathons in steam",
      "Baseboards that show white trails after blower door leaks pull golf-course dust through older weatherstripping",
      "Kitchen quartz that hazes from wrong pH cleaners after chili cook-offs",
      "Guest bedrooms that haven’t seen a deep vacuum belt change since downsizing moved in",
    ],
    internalLinks: linksFor("house-cleaning", [
      { label: "HVAC (returns packed with pollen—coordinate filter swaps)", href: SVC.hvac.best },
      { label: "Pest control (cleaning out pantry spills before ant scouts return)", href: SVC["pest-control"].serviceHref },
    ]),
    bestOfHref: SVC["house-cleaning"].best,
    serviceHref: SVC["house-cleaning"].serviceHref,
  },

  // —— Wolf Ranch ——
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "plumber",
    serviceName: "Plumbers",
    serviceCategory: SVC.plumber.cat,
    h1: "Plumbing in newer Wolf Ranch builds: volume, layout, and manufacturer quirks",
    metaTitle: "Plumbers near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX plumbing: newer PEX manifolds, stacked baths, drifting PRVs—test recirc and pressure before a whole-home repipe is sold to you.",
    intro:
      "Wolf Ranch’s newer homes pack open kitchens, pantry fillers, and four-bath plans that push simultaneous demand on manifolds and hose bibs the original calculator never modeled for real families. What reads as “low pressure everywhere” is often a PRV creeping down or recirc pumps mis-set—not a city main issue.",
    whyLocal:
      "Builder-era poly-to-Stab-OUT transitions and attic PEX bends fail first when attic temps exceed design during August relocation weeks. Wolf Ranch plumbers who’ve worked this specific vintages ask about recirc comfort setting before quoting whole-home repiping panic.",
    commonIssues: [
      "Tankless complaints tied to simultaneous bath draws exceeding installed gallons-per-minute spec from 2017 brochures",
      "Kitchen prep sinks gurgling when island vents share wet walls with powder rooms lacking proper vent height",
      "Irrigation yokes cracking at brass adapters because torque spec was “tight enough” during fast rough-in cycles",
      "Guest-suite showers scald-risk when mixing valves shipped without balancing checks during warranty rush periods",
    ],
    internalLinks: linksFor("plumber", [
      { label: "HVAC (condensate in tray pans masquerading as supply leaks)", href: SVC.hvac.serviceHref },
      { label: "Foundation repair (slab heave after negative final grade near rear lots)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.plumber.best,
    serviceHref: SVC.plumber.serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "hvac",
    serviceName: "HVAC",
    serviceCategory: SVC.hvac.cat,
    h1: "Wolf Ranch comfort: open plans, latent loads, and tight thermostat expectations",
    metaTitle: "HVAC near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX HVAC: open plans, long flex, sticky July humidity in 2015+ builds—balance returns and latent load before upsizing tons blindly.",
    intro:
      "Wolf Ranch floorplans prize sightlines over return strategy, so upstairs bonus rooms and pocket offices lag during July dew points even when tonnage matches Manual J on paper. Your system can be “correctly sized” and still feel weak if bypass dampers, flex sags, or builder-grade sealant failed in year five.",
    whyLocal:
      "Northwest sun exposure on rear game walls stacks heat faster than mid-block neighbors because setbacks differ lot-to-lot. Wolf Ranch–familiar techs map which elevations need dehumidify focus versus a raw tonnage bump that kills humidity control elsewhere.",
    commonIssues: [
      "Energy-star “comfort routines” masking blower underperformance until filter collapse during cedar season",
      "Zoning calls where dampers never fully sealed because flex pulled loose in attic heat",
      "High humidity in laundry-mud rooms tied to vent lines pinched over truss webs at rough-in",
      "Hard starts after brief winter freezes when heat kits lack staged sequencing tuned for Central Texas snap weeks",
    ],
    internalLinks: linksFor("hvac", [
      { label: "Electrical (weak 240V lug torque shows as intermittent outdoor unit cutout)", href: SVC.electrician.serviceHref },
      { label: "Plumbing (primary condensate vs pan overflow—rule out drain kill)", href: SVC.plumber.best },
    ]),
    bestOfHref: SVC.hvac.best,
    serviceHref: SVC.hvac.serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "roofer",
    serviceName: "Roofers",
    serviceCategory: SVC.roofer.cat,
    h1: "Roof specifics on Wolf Ranch architectural bundles and wind exposure",
    metaTitle: "Roofers near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX roofs: builder bundles, ridge vents, greenbelt wind—photo starters and hip metal for adjusters after Central Texas spring gusts.",
    intro:
      "Most Wolf Ranch roofs are builder bundles with acceptable wind ratings on paper but fast nailing schedules on hip intersections that reveal themselves after the first spring outbreak with 50 mph gusts. You care about ridge vent cut continuity and starter course exposure along two-story front walls, not a brochure wind number alone.",
    whyLocal:
      "Lot premiums face preserved greenbelts where wind tunneling accelerates uplift on rear slopes. Roofers quoting “spot repair” without lifting six courses uphill from the leak seldom survive two Georgetown May storm weeks.",
    commonIssues: [
      "Lifted starter along two-story front walls where drip edge wasn’t hemmed for local supplier coil",
      "Collar failures around bath stacks hidden under hip fields until humid summer drives condensate to drywall",
      "Gutter hangers missing structural screws into fascia sub, so runoff dumps behind brick weeps",
      "Solar readiness standoffs nailed through decking without renailing pattern upgrades leaving pucker points",
    ],
    internalLinks: linksFor("roofer", [
      { label: "Landscaping (limb abrasion on low rear pitches after greenbelt freeze breaks)", href: SVC.landscaping.best },
      { label: "Pest control (soffit rot entry after wind-driven rain lifts fiber vents)", href: SVC["pest-control"].serviceHref },
    ]),
    bestOfHref: SVC.roofer.best,
    serviceHref: SVC.roofer.serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "electrician",
    serviceName: "Electricians",
    serviceCategory: SVC.electrician.cat,
    h1: "Electrical headroom when Wolf Ranch homes add toys, offices, and backup thinking",
    metaTitle: "Electricians near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX electrical: tandem subs, EV Level 2, heat-pump water heaters—torque lugs and label neutrals before skinny-bus mistakes hide heat.",
    intro:
      "Model-home trim electrical looked generous until you added a wall oven swap, dual fridges for holidays, and a Level-2 charger because Georgetown finally caught up with your last house. Heat-pump water heaters and future battery gateways suddenly make a 200A service feel tight if your feeder isn’t load-managed intelligently.",
    whyLocal:
      "Many Wolf Ranch builds spec tandem 30A garage subs “for future” that were never landed heavy enough for continuous EV duty. You need an electrician who measures lugs, not one who adds tandem breakers until the cover barely closes.",
    commonIssues: [
      "AFCI nuisance trips tied to brushless compressor harmonics on newer fridge lines sharing MWBC mistakes",
      "Underground pool light conduits holding groundwater that wicks GFCI panels on equipment pads",
      "Generator interlock quotes that ignore NEC tap rules on meter-main combos common in this subdivision phase",
      "Ceiling fan installs discovering cut-in boxes not rated for paddle load in “upgrade” bonus rooms",
    ],
    internalLinks: linksFor("electrician", [
      { label: "HVAC (heat kit amperage and surge LRA on marginal services)", href: SVC.hvac.best },
      { label: "Foundation repair (conduit shears at stem walls from minor differential)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.electrician.best,
    serviceHref: SVC.electrician.serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "landscaping",
    serviceName: "Landscaping",
    serviceCategory: SVC.landscaping.cat,
    h1: "Landscapes that perform on Wolf Ranch’s thin soil and HOA design codes",
    metaTitle: "Landscaping near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX landscaping: caliche, HOA turf ratios, shared swales—engineer drainage that survives review when neighbor grades shift overnight.",
    intro:
      "Wolf Ranch lots often ship with builder bermuda and minimal topsoil over rock—you see drought tan by late June unless irrigation coverage is audited with catch cans, not eyeballing from the sidewalk. HOAs here care about sight triangles at corners and street trees that won’t heave sidewalks into trip hazards.",
    whyLocal:
      "Greenbelt setbacks channel stormwater across three lots in an hour during Texas thunderstorms. Landscapers need to blend swale grass species that take velocity without turning into mosquito ponds against your neighbor’s fence.",
    commonIssues: [
      "Rear patios holding water because perf pipe was never daylighted after upstream neighbor regraded",
      "Street trees raising drive aprons because root barriers weren’t spec’d on corner premiums",
      "Drip zones dumping clay against fiber-cement siding laps after flower “make ready” photo shoots",
      "Builder sod layering that masks sprinkler head grade until roots desiccate in year two",
    ],
    internalLinks: linksFor("landscaping", [
      { label: "Pest control (fire ants in new sand under fresh sod)", href: SVC["pest-control"].best },
      { label: "House cleaning (limestone dust on black trim from unstabilized alley kicks)", href: SVC["house-cleaning"].best },
    ]),
    bestOfHref: SVC.landscaping.best,
    serviceHref: SVC.landscaping.serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "pest-control",
    serviceName: "Pest control",
    serviceCategory: SVC["pest-control"].cat,
    h1: "Pest routes in denser Wolf Ranch blocks and greenbelt-adjacent lots",
    metaTitle: "Pest control near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX pests: tight blocks, greenbelt rodents, mulch at weeps—walk fences; skip front-only sprays that miss Georgetown slab entry points.",
    intro:
      "Tighter side setbacks mean one home’s construction debris becomes three homes’ ant berms within days when summer heat drives colonies to slab expansion joints. Greenbelt lots add raccoon and snake movement corridors that cookie-cutter quarterly sprays ignore because techs won’t walk the full fence line.",
    whyLocal:
      "Stucco weep screed depth and tight mulch against foam-backed CI systems create hidden termite and moisture highways unique to 2018–2022 envelopes. Wolf Ranch needs tighter visual inspections at foam transitions than Old Town brick cottages ever required.",
    commonIssues: [
      "Argentine ants broadcasting from unmaintained neighbor gutters two doors down",
      "Mud daubers clogging fresh gas fireplace vents after first cool snap",
      "Norway rats exploiting irrigation valve boxes as hydration stops along alley servitudes",
      "Brown recluse rumors after cardboard staging piles sat in garages through move-in heat",
    ],
    internalLinks: linksFor("pest-control", [
      { label: "Landscaping (rock piles against weeps)", href: SVC.landscaping.serviceHref },
      { label: "Roofing (loose soffit panels after builder nail pops)", href: SVC.roofer.serviceHref },
    ]),
    bestOfHref: SVC["pest-control"].best,
    serviceHref: SVC["pest-control"].serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "foundation-repair",
    serviceName: "Foundation repair",
    serviceCategory: SVC["foundation-repair"].cat,
    h1: "Foundation performance when Wolf Ranch soils meet aggressive landscaping",
    metaTitle: "Foundation repair near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX foundations: engineered fill, tree moisture, negative patios—map elevations before piers chase one garage stairstep crack alone.",
    intro:
      "Wolf Ranch pads often sit on structural fill over limestone shelves—fine until someone runs irrigation 24/7 to keep nursery plants alive the first summer or piles river rock 8 inches up the veneer. You need differential measurements across slab high points, not panic sales the first time a sheetrock crack opens during cotton harvesting vibration weeks.",
    whyLocal:
      "Post-tension signatures differ by phase: some have heavier edge beams that mask interior slab curling until door weatherstripping shreds. Local engineers familiar with builder phases spot which vintages telegraph moisture first on north garage aprons.",
    commonIssues: [
      "Step-cracks tracking from garage wing toward rear greenbelt after neighbor sump discharges across property line",
      "Veneer bond breaks at weep heights tied to splashback from unstabilized decomposed granite paths",
      "Interior baseboard gaps that widen only when rear beds hold water after controller failures",
      "Slab humps under LVP installs where vapor barrier wasn’t sealed at exterior doors during 2019 phase rush",
    ],
    internalLinks: linksFor("foundation-repair", [
      { label: "Plumbing (hydrostatic vs soil—rule leaks before piers)", href: SVC.plumber.serviceHref },
      { label: "Landscaping (regrade plans that steal slope from city ROW)", href: SVC.landscaping.best },
    ]),
    bestOfHref: SVC["foundation-repair"].best,
    serviceHref: SVC["foundation-repair"].serviceHref,
  },
  {
    neighborhoodSlug: "wolf-ranch",
    neighborhoodName: "Wolf Ranch",
    serviceSlug: "house-cleaning",
    serviceName: "House cleaning",
    serviceCategory: SVC["house-cleaning"].cat,
    h1: "Move-in quality cleans and upkeep for busy Wolf Ranch households",
    metaTitle: "House cleaning near Wolf Ranch Georgetown TX (2026)",
    metaDescription:
      "Wolf Ranch Georgetown TX cleaning: drywall dust in returns, builder film on floors—quartz-safe crews who respect HOA gates after fast Georgetown move-ins.",
    intro:
      "Many Wolf Ranch owners still fight drywall dust in pillowcases a year after COVID-era fast closings because builder cleans skipped can-light rims and top-door headers where Arizona blows in during first summer. You need rotation plans that reset baseboards after cedar—not vinegar on stone that voids sealers.",
    whyLocal:
      "Two-story foyers with tall glass and iron railing spindles punish cheap ladder policies. Local crews carry correct COOs for Wolf Ranch gate vendors and won’t blow schedules when Dell Diamond traffic locks Ronald Reagan.",
    commonIssues: [
      "Haze on wide-plank floors from wrong pH on initial “make ready” vendor spray",
      "Quartz islands dulling near induction spills because cleaners confused polished vs leathered finish",
      "Dog hair packing under floating vanities with wall-hung P-traps techs fear to move",
      "Black door hardware streaking from chloride-heavy glass cleaners after pool towels hang nearby",
    ],
    internalLinks: linksFor("house-cleaning", [
      { label: "HVAC (register dust blow-down before guests)", href: SVC.hvac.serviceHref },
      { label: "Pest control (pantry moth deep clean before perimeter spray)", href: SVC["pest-control"].best },
    ]),
    bestOfHref: SVC["house-cleaning"].best,
    serviceHref: SVC["house-cleaning"].serviceHref,
  },

  // —— Teravista ——
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "plumber",
    serviceName: "Plumbers",
    serviceCategory: SVC.plumber.cat,
    h1: "Plumbing across Teravista’s mixed vintages—golf views, guest pressure, and line age",
    metaTitle: "Plumbers near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX plumbing: fairway mains vs interior legs, hard water, guest peaks—camera laterals near oaks before trenching interior finishes.",
    intro:
      "Teravista mixes early-2000s legs with fresh builds near the course, so a “neighborhood average” story about pipes rarely fits your cul-de-sac. Golf-front homes see higher guest weeks and outdoor kitchens that stress cold-water manifolds built for quieter retiree use in other sections.",
    whyLocal:
      "Homes backing the courses contend with vibration from maintenance traffic and occasional reclaimed-water signage confusion on irrigation—both correlate with mysterious pressure swings mistaken for city work. Teravista-aware plumbers check PRV history and irrigation backflow before blaming municipal mains.",
    commonIssues: [
      "Guest-house hose bibs cross-feeding cold manifolds during tournament weekends",
      "Older copper branch pinholes near slab penetrations accelerated by voltage stray on bonded grounds",
      "Outdoor kitchen grease interceptors slowing sink trains not vented to modern code stacks",
      "Recurring master shower slow drains tied to long horizontal PVC runs in older Tuscan rooflines",
    ],
    internalLinks: linksFor("plumber", [
      { label: "HVAC (attic unit condensate tied into suspect branch drains)", href: SVC.hvac.serviceHref },
      { label: "House cleaning (descale fixtures before blaming cartridge failures)", href: SVC["house-cleaning"].serviceHref },
    ]),
    bestOfHref: SVC.plumber.best,
    serviceHref: SVC.plumber.serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "hvac",
    serviceName: "HVAC",
    serviceCategory: SVC.hvac.cat,
    h1: "HVAC comfort when Teravista floorplans mix vaulted entries with long duct runs",
    metaTitle: "HVAC near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX HVAC: vaulted foyers, golf humidity, mixed ducts—measure upstairs airflow before topping off charge on hunches in mixed-era homes.",
    intro:
      "Stair-split and two-story pockets in Teravista often fight latent July air because original flex layouts prioritized ceiling aesthetics over return area. Systems that “worked fine for ten years” start failing visibly when tree canopy loss after ice events changes solar load on west glass you didn’t shade yet.",
    whyLocal:
      "Course-adjacent lots see overnight humidity spikes from irrigation mist drift that raises overnight indoor dew points. Teravista comfort tuning needs dehumidification strategy on those legs—even if neighbors one block away don’t.",
    commonIssues: [
      "Second-floor game rooms lagging because bypass dampers default open after power blinks",
      "Outdoor coils fouling faster on fairway legs from cottonwood seed years after drought breaks",
      "Short cycling tied to oversize replacements that never downsized when reflective roofing upgrades happened",
      "Noise complaints from pad-mounted condensers on zero-lot lines where vibration transfers through fence posts",
    ],
    internalLinks: linksFor("hvac", [
      { label: "Electrical (weak outdoor disconnect lugs under continuous load)", href: SVC.electrician.best },
      { label: "Roofing (attic intake leaks that look like coil freeze-ups)", href: SVC.roofer.serviceHref },
    ]),
    bestOfHref: SVC.hvac.best,
    serviceHref: SVC.hvac.serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "roofer",
    serviceName: "Roofers",
    serviceCategory: SVC.roofer.cat,
    h1: "Roofs on Teravista streets: tree litter, wind channeling, and mixed shingle ages",
    metaTitle: "Roofers near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX roofing: oak valleys, fairway gusts, mixed shingle ages—ridge and cricket photos insurers want after Williamson County wind events.",
    intro:
      "Teravista’s tree canopy is an amenity until April leaves paste valleys and April wind tests lifted tabs nobody saw from the curb. Older sections can carry 18-year laminates next door to 8-year architectural—your insurance scope needs segment-aware inspection, not a drone flyover only.",
    whyLocal:
      "Golf cart paths change localized wind vectors at corner premiums; hip bundles there often lose nails first. Roofers walking the actual ridges—not quoting satellite—catch nail-line deviations that matter in Williamson County spring outbreak patterns.",
    commonIssues: [
      "Valley leaks after pollen dams hold moisture against low-slope tie-ins",
      "Ridge vent shiners next to older passive turtle vents creating bi-directional weather wash",
      "Lifted flashing at second-story bump-outs where original crews short-sheeted starter rows",
      "Attic nail pops in OSB after repeated wet-dry cycles from slow drip at chimney cricket laps",
    ],
    internalLinks: linksFor("roofer", [
      { label: "Landscaping (limb strikes and granule trails on north slopes)", href: SVC.landscaping.serviceHref },
      { label: "Pest control (soffit gaps after fascia softening)", href: SVC["pest-control"].serviceHref },
    ]),
    bestOfHref: SVC.roofer.best,
    serviceHref: SVC.roofer.serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "electrician",
    serviceName: "Electricians",
    serviceCategory: SVC.electrician.cat,
    h1: "Electrical upgrades as Teravista homes age into EV, pool, and remote-work loads",
    metaTitle: "Electricians near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX electrical: legacy panels, pool heat, course-side surges—permitted load math before stacking EV chargers on marginal home services.",
    intro:
      "Older Teravista legs shipped with generous outdoor lighting circuits that now fight arc-fault rules when you add motorized shades, heat tape, and holiday controllers on the same homerun. Pulling a permit for a panel swap here isn’t busywork—it’s how you avoid insurer denials after a lightning strike fries partial-bus skus.",
    whyLocal:
      "Lots near amenities see more transient surge events from utility switching during peak tournament weekends. Whole-home surge isn’t marketing fluff on those streets—it’s differential risk tied to proximity feeders.",
    commonIssues: [
      "Underground landscape lighting cables nicked by aeration pulls shorting after monsoon weeks",
      "Subpanel feeders underrated for pool heat pumps added after HOA pool renovations nearby",
      "Loose neutrals in outdoor kitchens mistaken for appliance brand defects",
      "Generator quotes ignoring meter-main bonding paths required by local AHJ clarifications",
    ],
    internalLinks: linksFor("electrician", [
      { label: "HVAC (LRA documentation before service upgrades)", href: SVC.hvac.serviceHref },
      { label: "Foundation repair (stem-wall conduit shears near older stoops)", href: SVC["foundation-repair"].best },
    ]),
    bestOfHref: SVC.electrician.best,
    serviceHref: SVC.electrician.serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "landscaping",
    serviceName: "Landscaping",
    serviceCategory: SVC.landscaping.cat,
    h1: "Landscaping on Teravista lots: course sightlines, berms, and realistic water budgets",
    metaTitle: "Landscaping near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX landscaping: HOA tee lines, mist drift, berm drainage—keep views, footers, and walks dry without sending runoff across cart paths.",
    intro:
      "Teravista HOAs enforce height screens that can’t block tee sightlines, so you layer evergreen stepping under deciduous canopy—a choreography generic installers get wrong and fine. Fairway lots also inherit subtle sheet flow from common-area grading that overwhelms cheap French drains after one supersoaker storm.",
    whyLocal:
      "Bermuda transition timing differs on north versus south exposures around the loop; crews from outside 78665 often scalp too early and invite chinch bugs the August Georgetown always delivers.",
    commonIssues: [
      "Rear privacy walls trapping heat on west patios that cook foundation planters",
      "Irrigation heads aimed at decorative rock that deflects spray back onto window weeps",
      "Tree wells holding moisture against post-tension signatures on early-Teravista slabs",
      "Decomposed granite paths migrating into storm inlets after tournament cart detours",
    ],
    internalLinks: linksFor("landscaping", [
      { label: "Pest control (ant highways along hardscape joints)", href: SVC["pest-control"].serviceHref },
      { label: "Roofing (valley splash from mis-aimed heads)", href: SVC.roofer.best },
    ]),
    bestOfHref: SVC.landscaping.best,
    serviceHref: SVC.landscaping.serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "pest-control",
    serviceName: "Pest control",
    serviceCategory: SVC["pest-control"].cat,
    h1: "Teravista pest maps where golf edges, irrigation, and mixed construction meet",
    metaTitle: "Pest control near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX pests: swale mosquitoes, fairway ants, palm-skirt rats—time IPM with irrigation clocks and busy nights on Georgetown golf loops.",
    intro:
      "Fairway moisture and cart-path lighting create different insect pressure than interior blocks—outdoor dining here invites fly spikes your inland Williamson friends won’t recognize. Mixed lot ages mean one street can harbor Formosan risk pockets while another only needs Argentine perimeter discipline.",
    whyLocal:
      "Older palms and untrimmed skirts bridge soffits on homes that look “new enough” until December when rats use seed heads as ladders. Teravista providers walk fence tops, not just tick boxes on route sheets.",
    commonIssues: [
      "Mosquito spikes tied to common-area pump failures the HOA board hasn’t posted yet",
      "Carpenter ants in wet window bucks from mis-flashed bump-outs in early builds",
      "Paper wasp nests under retractable awnings after calm springs",
      "Scorpion false alarms from bark scorpions riding palm frond debris near pool cages",
    ],
    internalLinks: linksFor("pest-control", [
      { label: "Landscaping (eliminate bridge mulch)", href: SVC.landscaping.best },
      { label: "House cleaning (food debris on outdoor kitchens attracting dusk flies)", href: SVC["house-cleaning"].serviceHref },
    ]),
    bestOfHref: SVC["pest-control"].best,
    serviceHref: SVC["pest-control"].serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "foundation-repair",
    serviceName: "Foundation repair",
    serviceCategory: SVC["foundation-repair"].cat,
    h1: "Foundation signals on Teravista lots with fill, trees, and golf-course hydrology",
    metaTitle: "Foundation repair near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX foundations: course drainage, fill pads, tree wedges—pair rain with leak checks before piers chase cracks that track wet seasons.",
    intro:
      "Teravista elevations were sculpted for views and play, not always for perfect perimeter moisture symmetry—some legs dry-fast on south fronts while north planter beds stay damp enough to rotate interior slab corners. Measure first; fear sells fast here when a neighbor three doors down already signed a pier contract.",
    whyLocal:
      "Common-area irrigation overruns migrate through alley swales and can saturate one wing of your footer while the garage stays powder-dry. Engineers want hydrographs correlated with HOA water window changes, not crack photos alone.",
    commonIssues: [
      "Garage slab breaks telegraphing to interior gypsum when drive aprons settle differentially after heavy cart detours",
      "Diagonal interior cracks opening after neighbor pool vibratory compaction",
      "Exterior brick ledges shearing at soft-story window bands on two-story transitional plans",
      "French drains that outlet into common turf lower than your footer during El Niño seasons",
    ],
    internalLinks: linksFor("foundation-repair", [
      { label: "Plumbing (under-slab leak surveillance before lifting)", href: SVC.plumber.serviceHref },
      { label: "Landscaping (swale reversals after neighbor berms)", href: SVC.landscaping.serviceHref },
    ]),
    bestOfHref: SVC["foundation-repair"].best,
    serviceHref: SVC["foundation-repair"].serviceHref,
  },
  {
    neighborhoodSlug: "teravista",
    neighborhoodName: "Teravista",
    serviceSlug: "house-cleaning",
    serviceName: "House cleaning",
    serviceCategory: SVC["house-cleaning"].cat,
    h1: "Cleaning plans for Teravista homes with golf traffic dust and mixed finishes",
    metaTitle: "House cleaning near Teravista Georgetown TX (2026)",
    metaDescription:
      "Teravista Georgetown TX cleaning: cart dust, fairway pollen, mixed exterior stone—reset sliders, tracks, and outdoor kitchens before packed host weekends.",
    intro:
      "Fairway dust loads and oak pollen hit covered patios that you treat like interior space nine months a year—baseboards gray out faster than inland suburbs. Mixed vintages mean travertine in one wing and large-format porcelain in another; one chemistry mistake etches thousands.",
    whyLocal:
      "Homes near tee boxes see fine bunker sand infiltration through sliders after windy March rounds—crews should pull tracks, not just Swiffer visible tile.",
    commonIssues: [
      "Matte black faucets spotting from mineral-heavy mist off pool heat exchangers",
      "Glass railing streaks from incorrect squeegee blades on low-iron panels",
      "Cabinet grooves loading pollen because positive-pressure HVAC wasn’t commissioned post remodel",
      "Outdoor kitchen vent hood grease drifting onto ceiling tongue-and-groove soffits",
    ],
    internalLinks: linksFor("house-cleaning", [
      { label: "HVAC (filter cadence before host weeks)", href: SVC.hvac.best },
      { label: "Pest control (deep pantry pulls before perimeter season)", href: SVC["pest-control"].best },
    ]),
    bestOfHref: SVC["house-cleaning"].best,
    serviceHref: SVC["house-cleaning"].serviceHref,
  },

  // —— Berry Creek ——
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "plumber",
    serviceName: "Plumbers",
    serviceCategory: SVC.plumber.cat,
    h1: "Plumbing through Berry Creek’s mature trees, older lines, and seasonal leaf loads",
    metaTitle: "Plumbers near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX plumbing: canopy roots, buried cleanouts, storm-stressed mains—camera first before acid or main-line guesses from one slow drain.",
    intro:
      "Berry Creek’s canopy is the reason you bought here—and why lateral access points disappear under decades of landscape evolution. Slow mains after a storm week are rarely “the city’s problem” first; they’re often branch cleanouts buried under beds or roots shearing old clay connections at the property edge.",
    whyLocal:
      "Mature trees move more water through transpiration but also chase meter-box moisture during drought snaps, cracking small-diameter irrigation laterals that cross domestic cold lines. Berry Creek plumbers map outdoor bibs and cleanouts before they open your hall bath expecting a simple clog.",
    commonIssues: [
      "Kitchen stacks failing vent tests after squirrels dislodged roof boots nobody has touched since 2007",
      "Main cleanouts buried under raised deck rebuilds that skipped permit drawings",
      "Galvanized nipples finally sacrificial after thirty summers of electrolysis with brass imports",
      "Septic-free city sewers still backing up when lateral roots dance after creek floodplain surges",
    ],
    internalLinks: linksFor("plumber", [
      { label: "Landscaping (root barrier coordination)", href: SVC.landscaping.serviceHref },
      { label: "Foundation repair (slab heave vs drain failure)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.plumber.best,
    serviceHref: SVC.plumber.serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "hvac",
    serviceName: "HVAC",
    serviceCategory: SVC.hvac.cat,
    h1: "HVAC loads in shaded Berry Creek homes that still roast on tricky geometry",
    metaTitle: "HVAC near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX HVAC: oak-packed coils, sagging flex, weak airflow—prove statics and charge before age alone gets blamed for weak summer cooling.",
    intro:
      "Shade buys you time until a week of calm humidity makes the house feel “cold but clammy.” Berry Creek attics often carry retrofitted flex that sagged over years—not botched day-one work—and blower doors prove return leakage pulling attic dust you blame on the dog until someone measures.",
    whyLocal:
      "Tree debris packs condenser fins differently on cul-de-sac legs where nightly dew re-wets cottonwood fuzz. Cleaning schedules here aren’t the same as open-sun Wolf Ranch lots with the same tonnage sticker.",
    commonIssues: [
      "Low static on high-MERV retrofits without widening returns after allergy upgrades",
      "Drain pans corroding on older AHUs mounted on plank platforms with seasonal skew",
      "Capacitors dying in August after voltage sags from overloaded older feeders shared on loop streets",
      "Hard shutdowns from high-pressure switches when condensers can’t reject heat under pollen cakes",
    ],
    internalLinks: linksFor("hvac", [
      { label: "Electrical (service dips under start amps)", href: SVC.electrician.serviceHref },
      { label: "House cleaning (return grille dust after renovation sanding)", href: SVC["house-cleaning"].serviceHref },
    ]),
    bestOfHref: SVC.hvac.best,
    serviceHref: SVC.hvac.serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "roofer",
    serviceName: "Roofers",
    serviceCategory: SVC.roofer.cat,
    h1: "Berry Creek roofs: tree damage, organic growth, and valley work that lasts",
    metaTitle: "Roofers near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX roofs: mossy north faces, clogged valleys, limb wear—flash sharply; packed gutters beat soft-wash bids after heavy spring rains.",
    intro:
      "North slopes under live oak umbrellas stay damp enough for algae streaks that void shingle warranty language if cleaners pressure-wash wrong. Berry Creek needs surgical valley unbuys and copper ribbon at crickets—not “roof shampoo” sales after one hail photo from a door knocker.",
    whyLocal:
      "Older staggered shake-look installs here used wider exposures that lift in channeling wind down Berry Creek Boulevard. Inspectors who know local wind rose patterns walk upslope nails, not just count missing tabs from the sidewalk.",
    commonIssues: [
      "Squirrel-chewed lead at chimney saddles mistaken for flashing “fatigue”",
      "Organic dam at dead valley low points after three skipped gutter cleans",
      "Ice dam false alarms that were actually condensate from bath exhausts hitting cold sheathing",
      "Lifted ridge shingles after cedar elm drops brace wood onto cable runs techs stepped on",
    ],
    internalLinks: linksFor("roofer", [
      { label: "Landscaping (limb reduction plans that protect warranty)", href: SVC.landscaping.best },
      { label: "Pest control (entry via softened rake boards)", href: SVC["pest-control"].serviceHref },
    ]),
    bestOfHref: SVC.roofer.best,
    serviceHref: SVC.roofer.serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "electrician",
    serviceName: "Electricians",
    serviceCategory: SVC.electrician.cat,
    h1: "Electrical updates when Berry Creek’s original loads meet modern life",
    metaTitle: "Electricians near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX electrical: tired meter jaws, nicked LV neutrals, MWBC trips—label neutrals, add surge before heavy holiday loads on older buses.",
    intro:
      "Berry Creek’s sweet spot is mature equity—finished attics, shop tools in garages, and holiday lighting that laughs at 100-amp nostalgia. Knob-and-tube isn’t the issue here as much as 1990s remodels that doubled kitchen circuits without updating bond integrity at the meter.",
    whyLocal:
      "Tree-strike frequency correlates with aerial service drops still active on some cul-de-sac legs; surge protection and proper grounding tests matter more than in buried-UDR Wolf Ranch phases.",
    commonIssues: [
      "Flicker tied to loose lugs on meter cans after decades of heat cycling",
      "UF buried romex nicked by stump grinding along legacy landscape lighting runs",
      "Kitchen island receptacle MWBC mis-identity causing AFCI mystery trips",
      "Outbuilding subs fed with 10/3 that can’t carry continuous dust collector loads",
    ],
    internalLinks: linksFor("electrician", [
      { label: "HVAC (compressor LRA vs marginal service)", href: SVC.hvac.serviceHref },
      { label: "Foundation repair (conduit strain at settling stoops)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.electrician.best,
    serviceHref: SVC.electrician.serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "landscaping",
    serviceName: "Landscaping",
    serviceCategory: SVC.landscaping.cat,
    h1: "Landscaping that respects Berry Creek’s trees, drainage, and older hardscape",
    metaTitle: "Landscaping near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX landscaping: oak TPZs, mulch volcanoes, neighbor regrades—fix swales so sheet flow skips new walks and heritage roots stay dry.",
    intro:
      "Every “low-maintenance rock bed” someone stacked against your trunk line is a decade of cambium insult waiting to invoice you. Berry Creek landscapes need permeable air gaps, realistic irrigation that doesn’t suffocate feeder roots, and storm designs that don’t shove water onto your neighbor’s 1998 addition slab.",
    whyLocal:
      "Mature canopy changes microclimates—north beds stay slick while south fry. Crews blindly pushing sod type from a single pallet across both exposures fail by August when Georgetown snaps back to desert humidity.",
    commonIssues: [
      "French drains that daylight too high after neighbor upstream regraded without survey",
      "Compaction under new flagstone that redirects sheet flow against garage aprons",
      "Volcano mulch accelerating trunk decay on centerpiece oaks",
      "Head-to-trunk spray rotting flare wood while owners blame “just a wet year”",
    ],
    internalLinks: linksFor("landscaping", [
      { label: "Pest control (fire ants after fresh sand imports)", href: SVC["pest-control"].best },
      { label: "Foundation repair (negative grade reveals)", href: SVC["foundation-repair"].best },
    ]),
    bestOfHref: SVC.landscaping.best,
    serviceHref: SVC.landscaping.serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "pest-control",
    serviceName: "Pest control",
    serviceCategory: SVC["pest-control"].cat,
    h1: "Pest biology when Berry Creek’s canopy meets older home envelopes",
    metaTitle: "Pest control near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX pests: damp sills, canopy roof rats, basin mosquitoes—exclusion and moisture beat fogging when local humidity seldom ever breaks.",
    intro:
      "Decay-softened cedar trim under north eaves is an open invitation for carpenter ants that aerosol cans just anger. Berry Creek’s roof rats use phone-line heights through canopy gaps your dog never hears until insulation starts pattering at 3 a.m.",
    whyLocal:
      "Storm debris piles after April wind weeks become harborage until the HOA pickup truck runs—perimeter programs timed without yard debris awareness fail here more than in sterile new builds.",
    commonIssues: [
      "Moisture ants mistaken for termites when bath fan ducts terminate into soffit bays",
      "Raccoon ingress at loose dormer cheeks after ice-loading flexed rake metal",
      "Mosquito counts exploding when neglected catch basins back up two streets over",
      "Brown recluse sampling bias after box storage in garages with poor door seals",
    ],
    internalLinks: linksFor("pest-control", [
      { label: "Roofing (exclusion after flashing repair)", href: SVC.roofer.serviceHref },
      { label: "Landscaping (remove bridge mulch first)", href: SVC.landscaping.serviceHref },
    ]),
    bestOfHref: SVC["pest-control"].best,
    serviceHref: SVC["pest-control"].serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "foundation-repair",
    serviceName: "Foundation repair",
    serviceCategory: SVC["foundation-repair"].cat,
    h1: "Foundation movement patterns tied to Berry Creek trees, age, and moisture swings",
    metaTitle: "Foundation repair near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX foundations: tree wick, brick ledges, creek-side wet weeks—map lift before pier pitches follow one new drywall zipper crack.",
    intro:
      "You live where roots drink on one corner and sun bakes the opposite wing—differential isn’t paranoia, it’s physics. Berry Creek homeowners deserve elevation shots across multiple seasons before financing steel when the fix might be surgical drainage and root pruning with an arborist sign-off.",
    whyLocal:
      "Creek-adjacent legs see capillary moisture during long rainy spans that mimic plumbing leaks on slab instruments. Local evaluators correlate rain graphs with crack acceleration dates instead of selling fear after one July heat burst.",
    commonIssues: [
      "Brick ledge rotation after downspout removals during deck remodels",
      "Interior slab cracking radiating from removed load-bearing pony walls in 1990s renovations",
      "Garage wing tilt from heavy RV storage on unreinforced aprons",
      "Stem-wall step-cracking following aggressive laurel hedgerow roots chasing sewer warmth",
    ],
    internalLinks: linksFor("foundation-repair", [
      { label: "Plumbing (hydrostatic vs geotech—dual test)", href: SVC.plumber.best },
      { label: "Landscaping (regrade + root barrier sequences)", href: SVC.landscaping.best },
    ]),
    bestOfHref: SVC["foundation-repair"].best,
    serviceHref: SVC["foundation-repair"].serviceHref,
  },
  {
    neighborhoodSlug: "berry-creek",
    neighborhoodName: "Berry Creek",
    serviceSlug: "house-cleaning",
    serviceName: "House cleaning",
    serviceCategory: SVC["house-cleaning"].cat,
    h1: "Deep cleaning rhythms for Berry Creek homes with pollen, pets, and older finishes",
    metaTitle: "House cleaning near Berry Creek Georgetown TX (2026)",
    metaDescription:
      "Berry Creek Georgetown TX cleaning: storm pollen, site-finished wood, vintage tile—safe chemistry for shaded canopy-era finishes near Georgetown Square.",
    intro:
      "Triple-track storm windows, real wood baseboards, and stone that drinks oils differently than big-box quartz—these homes punish one-product-fits-all janitorial apps. Your spring pollen week here is a surface science problem, not “dusty house syndrome.”",
    whyLocal:
      "Dogs that use the doggy door after creek walks grind fine silt into low-pitch carpet in ways robot vacs smear—rotation cleaning that lifts pile matters more than fragrance marketing.",
    commonIssues: [
      "Cloudy leaded glass from vinegar habits imported from Pinterest boards",
      "Wax buildup on older site-finished hardwood near kitchen pivots",
      "Soap scum etching on 2000s cultured marble surrounds",
      "Ceiling fan blades flinging pollen rings after incorrect blade-pitch cleaning",
    ],
    internalLinks: linksFor("house-cleaning", [
      { label: "Allergen season HVAC filter upgrade pairing", href: SVC.hvac.serviceHref },
      { label: "Pest control (clean pet bowls before ant programs)", href: SVC["pest-control"].serviceHref },
    ]),
    bestOfHref: SVC["house-cleaning"].best,
    serviceHref: SVC["house-cleaning"].serviceHref,
  },

  // —— Georgetown Village ——
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "plumber",
    serviceName: "Plumbers",
    serviceCategory: SVC.plumber.cat,
    h1: "Central Georgetown plumbing: mixed ages, tight lots, and Square-week guest peaks",
    metaTitle: "Plumbers near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village TX plumbing: square nights, mixed-era homes, hidden cleanouts—written scopes before opening walls blocks from downtown festival crowds.",
    intro:
      "Georgetown Village sits close enough to the Square that parade weeks and festival parking change how your house performs—guest baths run harder, kitchen disposals see catering abuse, and older legs still whisper with galvanized oddities newer suburbs skipped. You want plumbers who write scopes, not ones who ghost after opening a wall.",
    whyLocal:
      "Tight side setbacks mean lateral cleanouts hide under heritage hardscape pavers someone mortared for “curb appeal.” Village plumbers carry locators and patience before proposing front-yard dig days downtown traffic will punish.",
    commonIssues: [
      "Vintage hose bibs cross-threaded after DIY washer swaps before market Saturdays",
      "Thermal expansion knocking on older PRVs when tankless retrofits slam closed valves",
      "Partially shared drain behavior on duplex-style sections misunderstood as “main clog”",
      "Slab pinhole sprays mistaken for overhead condensate because HVAC and bath stacks share wet walls",
    ],
    internalLinks: linksFor("plumber", [
      { label: "HVAC (shared wet wall investigations)", href: SVC.hvac.serviceHref },
      { label: "House cleaning (post-event deep kitchen resets)", href: SVC["house-cleaning"].serviceHref },
    ]),
    bestOfHref: SVC.plumber.best,
    serviceHref: SVC.plumber.serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "hvac",
    serviceName: "HVAC",
    serviceCategory: SVC.hvac.cat,
    h1: "Urban-edge AC: Georgetown Village heat islands, noise limits, and retrofit ducts",
    metaTitle: "HVAC near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village Georgetown TX HVAC: urban heat, tight setbacks, noise rules—quiet gear and balanced returns when festivals pack streets by the square.",
    intro:
      "Closer to the core means more radiant street asphalt, tighter compressor setbacks, and neighbors who absolutely hear every hard start after Wine Walk lets out. Comfort here is politic: you need equipment that meets noise expectations and installs that don’t steal your one narrow side-yard return path.",
    whyLocal:
      "Older Village sections mix rooftop package histories with modern minisplit thinking—without load calc discipline you trade one loud condenser for three humming heads a neighbor will challenge at ARC.",
    commonIssues: [
      "High nighttime latent load from nearby hardscape roasting south bedrooms",
      "Return starvation after built-ins enclosed old low returns during interior remodels",
      "TXV hunting audible on zero-lot lines during shoulder seasons",
      "Permit-sensitive refrigerant line hides that lazy crews wrap through vented soffit bays wrong",
    ],
    internalLinks: linksFor("hvac", [
      { label: "Electrical (service limits on stacked townhome legs)", href: SVC.electrician.serviceHref },
      { label: "Foundation repair (vibration transmission on older duplex slabs)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.hvac.best,
    serviceHref: SVC.hvac.serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "roofer",
    serviceName: "Roofers",
    serviceCategory: SVC.roofer.cat,
    h1: "Roofs bridging old and new construction DNA in Georgetown Village",
    metaTitle: "Roofers near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village Georgetown TX roofing: mixed eras, parade wind, HOA metal rules—photo hips and valleys so carriers match scopes on tight downtown lots.",
    intro:
      "You might have a 1995 hip bundle stitched to a 2014 second-story pop-top—each segment carries different nail patterns, valley metal, and insurance depreciation math. Village neighbors walk their dogs past your dumpster; crews here need tarps and etiquette, not storm-chaser theater.",
    whyLocal:
      "Historic-adjacent aesthetics sometimes banned visible metals; roofers must match HOA board minutes on color and profile before nailing-off, not after the inspector tags you.",
    commonIssues: [
      "Cricket ponding after downtown microburst wind spun debris into drains",
      "Step-flashing rot at second-story additions where original masons skipped drip edge continuity",
      "Low-slope porch membranes aging faster than field shingles on hybrid plans",
      "Lifted ridge after parade-week wind tunnels down grid streets",
    ],
    internalLinks: linksFor("roofer", [
      { label: "Electrical (mast guy-wire roof penetrations on older services)", href: SVC.electrician.best },
      { label: "Landscaping (limb management without ARC drama)", href: SVC.landscaping.serviceHref },
    ]),
    bestOfHref: SVC.roofer.best,
    serviceHref: SVC.roofer.serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "electrician",
    serviceName: "Electricians",
    serviceCategory: SVC.electrician.cat,
    h1: "Electrical modernization blocks from Georgetown’s core events and grid demand",
    metaTitle: "Electricians near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village TX electrical: aerial feeds, holiday loads, EV adds—panel math before square nights overload alley-fed mixed-era Village circuits.",
    intro:
      "Downtown events mean feeder demand spikes you feel as brief voltage sags when everyone’s AC and string lights stack—your 1970s aerial service doesn’t owe you optimism. Modern life wants grounded, labeled, inspected work tucked into houses never drafted for dual ovens plus EV duty.",
    whyLocal:
      "Alley-fed garages and zero-clearance fronts change where utilities can enter without grandfathered violations. Village electricians read plat notes before promising “same-day panel swap.”",
    commonIssues: [
      "Overloaded holiday circuits on nostalgia breaker panels sharing neutrals",
      "Old BX transitions to Romex in remodel voids never AFCI-identified",
      "Meter-main combos too tight for surge devices city rebates encourage",
      "Post-light shorting on front walks after parade moisture wicked into cast boxes",
    ],
    internalLinks: linksFor("electrician", [
      { label: "HVAC (heat kit permits tied to load calc filings)", href: SVC.hvac.best },
      { label: "House cleaning (post-install dust control expectations)", href: SVC["house-cleaning"].serviceHref },
    ]),
    bestOfHref: SVC.electrician.best,
    serviceHref: SVC.electrician.serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "landscaping",
    serviceName: "Landscaping",
    serviceCategory: SVC.landscaping.cat,
    h1: "Courtyard-friendly landscaping with Georgetown Village scale and walkability",
    metaTitle: "Landscaping near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village Georgetown TX landscaping: walkable lots, ROW splash, heritage trees—grade stoops so festival crowds and storms do not pond at entries.",
    intro:
      "Front walks here carry real foot traffic during festivals—berms that shrug water onto the sidewalk buy you a city callback, not compliments. You need plant palettes tolerating reflected heat off parked cars and tight root volumes between foundation and mews-style alleys.",
    whyLocal:
      "Some Village legs sit on older curb grades that sheet toward stoops after Georgetown repaves downtown drains upstream—swales need to honor both your lot and ADA crossing constraints neighbors already fought for.",
    commonIssues: [
      "Neighbor splash hardscape funneling July storms against common-wall stoops",
      "Heritage tree TPZ conflicts when widening drive aprons for EV charging pulls",
      "Automatic irrigation misting sidewalks during drought ordinances",
      "Turf collapse on narrow parkways after utility trench reinstatement compacted wrong",
    ],
    internalLinks: linksFor("landscaping", [
      { label: "Pest control (outdoor dining spill vectors)", href: SVC["pest-control"].serviceHref },
      { label: "Foundation repair (stoop settlement near walkable ROW)", href: SVC["foundation-repair"].serviceHref },
    ]),
    bestOfHref: SVC.landscaping.best,
    serviceHref: SVC.landscaping.serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "pest-control",
    serviceName: "Pest control",
    serviceCategory: SVC["pest-control"].cat,
    h1: "Pest pressure where walkable Georgetown meets older entry points",
    metaTitle: "Pest control near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village Georgetown TX pests: alley rats, event scraps, limestone weeps—discreet IPM beside foot traffic without careless bait on busy sidewalks.",
    intro:
      "Walkability means your garbage day competes with food-truck nights—fly and ant pressure spike predictably if dumpsters linger half-open behind cafés three blocks away. Older brick weeps and limestone mortar invite moisture pests that new stucco tracts rarely see.",
    whyLocal:
      "Event parking pushes rodents along alley utility easements; perimeter programs must include bait station ethics near pet walks and stroller traffic—not broadcast poison in open beds.",
    commonIssues: [
      "Norway rats tracking sewer cleanout venting after downtown main flushes",
      "Odorous house ants exploiting sidewalk expansion joints abutting patios",
      "Stored product moths after bulk dry goods bought during market pop-ups",
      "Spider spikes on uplighting aimed at heritage brick textures",
    ],
    internalLinks: linksFor("pest-control", [
      { label: "Landscaping (hardscape joint sealing)", href: SVC.landscaping.best },
      { label: "House cleaning (commercial-food foot traffic residue on stoops)", href: SVC["house-cleaning"].best },
    ]),
    bestOfHref: SVC["pest-control"].best,
    serviceHref: SVC["pest-control"].serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "foundation-repair",
    serviceName: "Foundation repair",
    serviceCategory: SVC["foundation-repair"].cat,
    h1: "Foundation questions on older Village lots next to Urban Georgetown hydrology",
    metaTitle: "Foundation repair near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village Georgetown TX foundations: shared footers, shifting drainage, parade rumble—baselines before piers pitch after one festival downtown.",
    intro:
      "Downtown drainage projects occasionally move catchment faster toward older residential legs than owners realize until a crack telegraphs after the first supersoaker post-construction. Village homes can show mystifying stickiness on doors that isn’t “just humidity”—it’s microns of slab movement near legacy sand-clay transitions.",
    whyLocal:
      "Event-week vibration from heavy equipment reroutes and concert low-frequency hum can accelerate minor differential on already fatigued stoops. Measure baseline during quiet weeks, not festival Saturday nights.",
    commonIssues: [
      "Front walk trip hazards from tree-heaved panels tied to city root pruning delays",
      "Common-wall cracks between adjoined units with mismatched footer depths",
      "Sump-less basements nonexistent but crawl moisture via alley HVAC conduits mistaken for plumbing",
      "Veneer stair-steps aligning with historic regrade after alley repaving",
    ],
    internalLinks: linksFor("foundation-repair", [
      { label: "Plumbing (under-slab testing near shared laterals)", href: SVC.plumber.serviceHref },
      { label: "Landscaping (ROW-positive grade restoration)", href: SVC.landscaping.serviceHref },
    ]),
    bestOfHref: SVC["foundation-repair"].best,
    serviceHref: SVC["foundation-repair"].serviceHref,
  },
  {
    neighborhoodSlug: "georgetown-village",
    neighborhoodName: "Georgetown Village",
    serviceSlug: "house-cleaning",
    serviceName: "House cleaning",
    serviceCategory: SVC["house-cleaning"].cat,
    h1: "Cleaning routines for Village homes between events, guests, and walk-in dust",
    metaTitle: "House cleaning near Georgetown Village Georgetown TX (2026)",
    metaDescription:
      "Georgetown Village Georgetown TX cleaning: festival dust, mixed finishes, alleys—crews protecting fragile trims when square nights run late by downtown.",
    intro:
      "Living near walkable Georgetown means fine urban dust, pollen, and occasional music-night grit that lands on sills you only notice Sunday morning. Mixed-decade finishes in the same hallway demand chemistry discipline and scheduling that doesn’t fight your alley parking realities during events.",
    whyLocal:
      "Residents here value discrete trucks and early finishes before block closures—local ops teams route around Red Poppy, not through it.",
    commonIssues: [
      "Historic wood windows with fragile putty lines that modern razor scrapers destroy",
      "Polished concrete haze from wrong pH after downtown mud tracked post-rain",
      "Open shelving in kitchens that loads grease film during vent hood underspec months",
      "Black door hardware pitting when chloride from salted walks downtown gets tracked in on shoes after rare ice nights",
    ],
    internalLinks: linksFor("house-cleaning", [
      { label: "HVAC (event-week filter swaps)", href: SVC.hvac.serviceHref },
      { label: "Pest control (stoop food debris before ant swarms)", href: SVC["pest-control"].best },
    ]),
    bestOfHref: SVC["house-cleaning"].best,
    serviceHref: SVC["house-cleaning"].serviceHref,
  },
];

/** Alias export matching the `NeighborhoodPage` type name (same reference as `neighborhoodServicePages`). */
export const neighborhoodPages = neighborhoodServicePages;

export function getNeighborhoodServiceStaticParams(): { neighborhood: string; service: string }[] {
  return neighborhoodServicePages.map((p) => ({
    neighborhood: p.neighborhoodSlug,
    service: p.serviceSlug,
  }));
}

export function getNeighborhoodServicePage(
  neighborhoodSlug: string,
  serviceSlug: string,
): NeighborhoodServicePage | undefined {
  return neighborhoodServicePages.find(
    (p) => p.neighborhoodSlug === neighborhoodSlug && p.serviceSlug === serviceSlug,
  );
}
