import type { PricingCategory } from "../lib/pricing-data";

type ServiceKey = PricingCategory["key"];

type WhyHireContent = {
  label: string;
  /** Used in section heading: "Why hire a {label} in Georgetown TX" */
  heading: string;
  lede: string;
  bullets: { title: string; body: string }[];
  closing: string;
};

/**
 * Editorial "Why hire a {service} in Georgetown TX" copy bank.
 * Every entry weaves in at least one of: expansive clay soil, Central Texas heat,
 * Sun City 55+ community, historic district / older housing stock, or the
 * Williamson County fast-growth corridor (Wolf Ranch, Teravista, Berry Creek).
 */
const WHY_HIRE_CONTENT: Record<ServiceKey, WhyHireContent> = {
  plumbing: {
    label: "plumber",
    heading: "Why hire a plumber in Georgetown, TX",
    lede:
      "Georgetown plumbing isn't generic Texas plumbing. The same calcium-rich Edwards Aquifer water that you taste in the kitchen also chews through cartridges, scales water heater elements, and hides slow drips behind angle stops faster than the national average. A licensed Georgetown plumber knows those tells without a long diagnostic — and they know when wet drywall on a slab foundation is actually irrigation backfeed, not a real leak.",
    bullets: [
      {
        title: "Expansive clay soil moves your supply lines",
        body:
          "Williamson County's Houston Black clay swells in spring rain and contracts during drought, which stresses slab-routed copper and PEX manifolds. A local plumber starts isolation at the meter and the manifold instead of cutting drywall on day one. That single habit saves Sun City and Wolf Ranch homeowners thousands per false alarm.",
      },
      {
        title: "Hard water shortens fixture and water-heater life",
        body:
          "Most Georgetown water heaters lose 2–4 years of expected life to scale unless they're flushed annually. Faucet aerators and shower cartridges that should last a decade fail in three to five. A pro who works the area daily already sources the parts that hold up best under Edwards Aquifer mineral loads.",
      },
      {
        title: "Sun City and historic-district plumbing are different worlds",
        body:
          "Sun City slabs need accessibility-aware fixture swaps and quiet shutoffs around guest weeks. Historic-district homes near the square may still hide galvanized risers and cast-iron drains that demand careful planning before a simple kitchen remodel turns into a repipe.",
      },
      {
        title: "Fast-growth pressure means after-hours availability matters",
        body:
          "Williamson County added thousands of homes in 2024 alone, and that demand spread thin the pool of licensed plumbers willing to take 9 p.m. emergency calls. Local-first companies hold dispatch capacity for storm bursts and Sun City medical-need priorities that national chains can't match.",
      },
    ],
    closing:
      "When you hire a Georgetown plumber, you're buying local context as much as labor — soil knowledge, water-chemistry reflexes, neighborhood permit fluency, and the willingness to scope before they swing a wrench.",
  },
  hvac: {
    label: "HVAC company",
    heading: "Why hire an HVAC company in Georgetown, TX",
    lede:
      "Central Texas runs cooling-dominant systems harder than almost any U.S. market. Georgetown's typical 4–5 month stretch of 95°F+ afternoons, regular 100°F+ weeks in July and August, and warm overnight lows mean residential equipment racks up real-world runtime that ages compressors and coils faster than national averages. A Georgetown HVAC contractor sizes, installs, and maintains for that reality — not generic spec-sheet conditions.",
    bullets: [
      {
        title: "Texas heat shortens equipment life",
        body:
          "Most Georgetown split systems land in the 12–15 year window for full replacement rather than the 15–20 year national average. Attic-mounted air handlers in Wolf Ranch and Teravista see 140°F+ summer temperatures that punish blower motors and condensate drains a local tech is already watching for.",
      },
      {
        title: "Sun City retiree priorities are not the same as growing-family needs",
        body:
          "Sun City customers often value zoning, dehumidification, and ultra-quiet equipment for hearing aids and afternoon naps. Family homes in Wolf Ranch may prioritize two-stage compressors and smart thermostats for bill control. A Georgetown HVAC pro asks before they quote.",
      },
      {
        title: "Hail seasons and electrical surges chew up condensers",
        body:
          "Williamson County's spring hail events bend condenser fins, dent line-set covers, and pit refrigerant copper. Pair that with grid switching transients and you get the capacitor-failure pattern local techs see every June. They carry hail-guard recommendations and surge protection options without being asked.",
      },
      {
        title: "Historic and Sun City attics each pose their own access problems",
        body:
          "Historic district homes near the square often have steep, narrow attics that require split-system equipment choices a national chain may not stock. Sun City attics need ladder safety plans and accessibility considerations for any return-grate or filter changes the homeowner will manage themselves.",
      },
    ],
    closing:
      "A Georgetown HVAC contractor brings runtime intuition you can't get from a spec sheet — they've already seen what fails first under Central Texas heat, and they design service plans around the months that matter.",
  },
  roofing: {
    label: "roofer",
    heading: "Why hire a roofer in Georgetown, TX",
    lede:
      "Williamson County sits in one of the most active hail and wind corridors in Texas. From late March through early June, supercells regularly drop 1–2 inch hail across Georgetown — and storm-chaser crews follow the radar in within hours. Hiring a Georgetown-based roofer means working with someone who lives with the consequences of bad workmanship and won't disappear three states away after the final payment.",
    bullets: [
      {
        title: "Texas hail and UV destroy shingles faster than warranties suggest",
        body:
          "Dimensional shingles sold with 30-year warranties commonly deliver 18–25 years of real performance in Central Texas before granule loss and seal failure show up. A Georgetown roofer knows when a 12-year-old roof is genuinely storm-damaged versus aging out, which protects honest insurance claims.",
      },
      {
        title: "Permit and HOA fluency saves weeks",
        body:
          "City of Georgetown permits, Williamson County rules for areas like Sun City, and Wolf Ranch / Berry Creek HOA shingle-color approvals each have their own quirks. A local roofer files paperwork on the right portal the first time instead of learning on your dime.",
      },
      {
        title: "Historic district roofs come with extra rules",
        body:
          "Roofs in the historic district require Historic and Architectural Review Commission (HARC) approval for material and color changes. Even tear-off methods can be regulated. Out-of-town crews often skip this step and trigger stop-work orders that delay you weeks deeper into hurricane-feeder season.",
      },
      {
        title: "Sun City and fast-growth Wolf Ranch lots have hidden access challenges",
        body:
          "Sun City driveways need careful tear-off staging to avoid blocking emergency access on cul-de-sacs. New Wolf Ranch builds with steep architectural features need brand-certified installers to keep manufacturer warranties intact. Both details get missed by storm-chaser crews working on volume.",
      },
    ],
    closing:
      "A locally based Georgetown roofer carries reputational risk you can verify — physical address, county references, photographed past jobs across the same neighborhoods you live in, and the willingness to come back if a flashing detail leaks two seasons later.",
  },
  electrical: {
    label: "electrician",
    heading: "Why hire an electrician in Georgetown, TX",
    lede:
      "Electrical work in Georgetown sits at the intersection of older Sun City and Georgetown Village panels that weren't sized for today's loads, brand-new Wolf Ranch and Teravista homes wired for EV chargers and solar tie-ins, and a humid Texas attic environment that ages branch insulation faster than catalog specs. A licensed Texas electrician who works Williamson County daily already speaks all three dialects.",
    bullets: [
      {
        title: "Older Georgetown panels often can't carry modern loads",
        body:
          "Many 1990s-era Sun City homes and original Georgetown Village houses still run 100-amp panels meant for one HVAC unit, an electric range, and a water heater. Add an EV charger, induction range, or backup generator and you're flirting with main-breaker trips. A local electrician knows when to upgrade the panel before adding the load.",
      },
      {
        title: "Texas attic heat ages wiring insulation",
        body:
          "Branch wiring run through Georgetown attics sees 140°F summer temperatures for months on end. THHN insulation rated for 90°C handles it, but older Romex or aluminum branch runs degrade faster. An electrician familiar with Central Texas inspections checks junction boxes and splices before they become resale-disclosure issues.",
      },
      {
        title: "Sun City accessibility work needs experienced hands",
        body:
          "Aging-in-place upgrades — rocker switches at chair-height, grab-bar circuits with GFCI protection, doorbell cameras tied into hearing-aid systems — aren't a checkbox. A Georgetown electrician who serves Sun City regularly understands those nuances and won't sell you smart-home gear you can't actually use.",
      },
      {
        title: "EV and solar growth means coordinating with Oncor",
        body:
          "Wolf Ranch, Teravista, and Berry Creek homeowners are adding EV chargers and solar tie-ins at record rates. Permitting through the City of Georgetown plus Oncor service coordination requires a licensed electrician who handles it weekly — not a handyman who hopes the inspector signs off.",
      },
    ],
    closing:
      "Hiring a Georgetown electrician means hiring someone who already knows whether your panel can take what you're asking, which permit office to call, and which inspector wants what kind of bonding documentation before they'll sign you off.",
  },
  landscaping: {
    label: "landscaper",
    heading: "Why hire a landscaper in Georgetown, TX",
    lede:
      "Landscaping in Georgetown means working with Williamson County's expansive clay soil, twice-weekly watering restrictions, triple-digit summer afternoons, and HOA design standards that vary block by block across Sun City, Wolf Ranch, Teravista, and Berry Creek. A Georgetown landscaping crew that works the area daily delivers more than mowing — they bring grass-selection, irrigation, and bed-design judgment tuned to your specific subdivision.",
    bullets: [
      {
        title: "Clay soil and Texas heat dictate plant choices",
        body:
          "Plants that thrive in Houston don't survive a Georgetown summer drought, and plants that handle Dallas alkaline pH may rot in our clay. A local landscaper steers you toward Texas Superstars and natives that handle the Edwards Plateau microclimate — saving you replacement costs after the first 100°F week.",
      },
      {
        title: "Watering restrictions reward smart irrigation design",
        body:
          "Georgetown enforces year-round twice-weekly watering by address — stricter during drought stages. A landscaper who is also a Texas-licensed irrigator designs drip-first zones with rain and freeze sensors that comply automatically and save 30–40% on water bills versus the spray-everywhere setups builders install.",
      },
      {
        title: "Sun City and HOA neighborhoods enforce design standards",
        body:
          "Sun City, Wolf Ranch, Teravista, and Berry Creek all have HOA architectural rules covering turf type, front-yard tree species, mulch color, and visible equipment. A local crew submits plans for approval before installing — saving you from forced replacements and stop-work letters.",
      },
      {
        title: "Historic district landscaping has its own rules",
        body:
          "Homes inside Georgetown's historic district answer to HARC for visible front-yard changes. Removing or replacing mature trees, adding hardscape, or installing fencing can require review. A landscaper familiar with the process keeps your project on schedule and protects resale value.",
      },
    ],
    closing:
      "A Georgetown landscaper brings local soil, water, plant, and permit fluency together — so your investment in curb appeal survives the next drought, the next freeze, and the next HOA inspection.",
  },
  pest: {
    label: "pest control company",
    heading: "Why hire a pest control company in Georgetown, TX",
    lede:
      "Pest pressure in Georgetown shifts month to month — fire ant mounds in spring, scorpions in stone-faced Sun City and Berry Creek homes, mosquito surges after San Gabriel river floods, termites against drought-cracked slabs, and rodents pushed by every new Wolf Ranch and Teravista construction edge. A local pest control company already knows what's pressing this week, which national chains can't anticipate from a call center two states away.",
    bullets: [
      {
        title: "Expansive clay creates pathways for termites and ants",
        body:
          "Williamson County's clay cracks open in summer drought, creating direct soil-to-slab pathways subterranean termites and crazy ants exploit. A Georgetown pest tech inspects expansion joints and plumbing penetrations on every visit — not just a perimeter spray that misses the real entry points.",
      },
      {
        title: "Sun City and Berry Creek harbor more scorpions and snakes",
        body:
          "Cedar-rich limestone outcrops near Sun City, Berry Creek, and rural Georgetown attract Texas bark scorpions and rat snakes year-round. Local pest pros bring IGR-based scorpion programs and exclusion services tuned for those neighborhoods — generic quarterly plans miss both.",
      },
      {
        title: "Fast-growth construction pushes rodents into established homes",
        body:
          "Wolf Ranch and Teravista build-outs displace rats and mice into adjacent established neighborhoods every fall. A Georgetown company tracks construction edges and proactively schedules exclusion work for homes within a few blocks of new pads — before customers find droppings in the attic.",
      },
      {
        title: "Historic homes need careful chemistry",
        body:
          "Historic district homes with original lath-and-plaster walls or pier-and-beam crawlspaces require different bait stations, dust formulations, and crack-and-crevice treatments than modern slab construction. A local pest tech adjusts product selection accordingly instead of defaulting to a single perimeter spray.",
      },
    ],
    closing:
      "A Georgetown pest control company brings seasonal intuition you can't fake — they know what's hatching now, what's migrating, and what neighborhoods are about to flare up based on weather and construction patterns nationals never see.",
  },
  foundation: {
    label: "foundation repair company",
    heading: "Why hire a foundation repair company in Georgetown, TX",
    lede:
      "Foundation work in Georgetown is fundamentally a soil-management problem. Williamson County's Houston Black clay can swell up to 30% in volume after wet weeks and shrink dramatically in drought, lifting and dropping slabs in cycles that no national contractor's standard pier-count formula handles correctly. A Georgetown foundation repair company starts with the soil and drainage — not with a sales pitch for the highest-margin pier system.",
    bullets: [
      {
        title: "Expansive clay drives almost every Georgetown foundation call",
        body:
          "After the 2011 and 2022 droughts, foundation movement spiked across Sun City, Berry Creek, and Georgetown Village. A local company tracks those drought cycles and knows when stair-step cracks are seasonal versus structural. That experience prevents both over-treatment and under-treatment.",
      },
      {
        title: "Drainage corrections often matter more than piers",
        body:
          "Many Williamson County homes need extended downspouts, regrading, root barriers, or French drains before any pier work — sometimes instead of pier work. A local foundation pro evaluates drainage first; a high-pressure sales crew skips straight to installing piers your soil may not need.",
      },
      {
        title: "Sun City and historic homes need engineer-led scopes",
        body:
          "Older Sun City sections built in the early 1990s and historic-district pier-and-beam homes near the square benefit from an independent Texas Professional Engineer designing the scope before any contractor bids. Local foundation companies routinely coordinate with the same regional engineers — saving you the search.",
      },
      {
        title: "Fast-growth Wolf Ranch and Teravista lots aren't immune",
        body:
          "Cut-and-fill grading on newer lots, plus skipped drainage details under builder warranties, create early movement in homes that look brand new. A Georgetown foundation pro distinguishes builder-warranty issues from genuine soil failure — which protects your claim against the original builder.",
      },
    ],
    closing:
      "A Georgetown foundation repair company brings the soil science, drainage judgment, and engineer relationships that turn six-figure decisions into measurable, warranty-backed repairs — instead of the maximum pier count a national sales pitch wants you to sign.",
  },
  cleaning: {
    label: "house cleaning service",
    heading: "Why hire a house cleaning service in Georgetown, TX",
    lede:
      "Georgetown cleaning is shaped by hard water from the Edwards Aquifer, dust from spring cedar and fall cottonwood, construction debris near every Wolf Ranch and Teravista build site, Sun City households juggling visiting weeks, and a growing short-term rental market near the historic square. A local Georgetown cleaning service brings products and scheduling that match — not a one-size-fits-all national template.",
    bullets: [
      {
        title: "Hard water demands aggressive descaling",
        body:
          "Glass shower doors, faucet aerators, and toilet rims build calcium scale faster in Georgetown than softer markets. A local cleaning company includes CLR-type descaling in standard rotations or flags it as a deep-clean upgrade — instead of leaving you with cloudy glass after every visit.",
      },
      {
        title: "Sun City visit weeks need flexible scheduling",
        body:
          "Sun City households often cycle through grandkids, holiday guests, and tournament weeks that require bumped-up clean schedules and post-visit resets. A local cleaning company keeps that calendar history and arrives with extra hands when it matters — not the same crew running the same lazy template.",
      },
      {
        title: "Construction dust hits Wolf Ranch and Teravista hard",
        body:
          "Active build sites push fine drywall dust and cedar pollen into nearby homes year-round. Georgetown cleaners who work these neighborhoods carry HEPA vacuums and treat air-return grates and ceiling fans as standard surfaces — not deep-clean extras.",
      },
      {
        title: "Historic and short-term rental homes need photo-ready turnovers",
        body:
          "Listings on the historic square book back to back. Cleaners who do those turnovers know which baseboard, window-track, and patio details photograph as 'not clean enough' on a guest's smartphone. That eye protects your review score in a way generic services don't.",
      },
    ],
    closing:
      "A Georgetown house cleaning service brings the products, schedules, and local detail-eye that turn recurring cleans into reliable curb appeal — for residents, retirees, and short-term rental hosts alike.",
  },
};

export default function WhyHireServiceSection({ categoryKey }: { categoryKey: ServiceKey }) {
  const content = WHY_HIRE_CONTENT[categoryKey];

  return (
    <section
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
      aria-labelledby={`why-hire-${categoryKey}-heading`}
    >
      <h2
        id={`why-hire-${categoryKey}-heading`}
        className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
      >
        {content.heading}
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-700">{content.lede}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {content.bullets.map((b) => (
          <div key={b.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h3 className="text-base font-semibold text-gray-900">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{b.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-gray-700">{content.closing}</p>
    </section>
  );
}
