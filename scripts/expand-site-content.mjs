/**
 * Expands thin CMS entries in data/site-content.json.
 * Run: node scripts/expand-site-content.mjs
 */
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "data/site-content.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

function setBlog(slug, patch) {
  const post = data.blog.find((b) => b.slug === slug);
  if (!post) throw new Error(`blog not found: ${slug}`);
  Object.assign(post, patch);
}

function setService(slug, patch) {
  const svc = data.services.find((s) => s.slug === slug);
  if (!svc) throw new Error(`service not found: ${slug}`);
  Object.assign(svc, patch);
}

function setBest(slug, patch) {
  const page = data.best.find((b) => b.slug === slug);
  if (!page) throw new Error(`best not found: ${slug}`);
  Object.assign(page, patch);
}

function link(href, label) {
  return { type: "link", href, label };
}
function text(t) {
  return { type: "text", text: t };
}
function p(parts) {
  return { kind: "p", parts };
}
function para(t) {
  return { kind: "p", text: t };
}
function h2(t) {
  return { kind: "h2", text: t };
}
function h3(t) {
  return { kind: "h3", text: t };
}
function ul(items) {
  return { kind: "ul", items };
}

// —— County hail pillar ——
setBlog("hail-damage-georgetown-williamson-may-2026", {
  readTime: "12 min",
  dateModified: "2026-05-12",
  description:
    "May 9–10, 2026 hail across Georgetown and Williamson County: safe ground checks, insurance basics, HVAC pairing calls, and how to compare written roofing scopes before you sign.",
  content: [
    para(
      "Repeated hail cores crossed west and central Williamson County on May 9–10, 2026, with NWS reports of golf-ball-sized stones in several corridors. Georgetown homeowners are again facing the same pattern: most shingle bruising is hard to judge from the sidewalk, yet soft metals, gutter grit, and ridge-cap lifts often tell the story before an interior stain appears. This county-wide guide is the reference point—use the neighborhood links at the bottom for Sun City, Teravista, Wolf Ranch, and Georgetown Village specifics.",
    ),
    h2("What the May 2026 storms did across Georgetown"),
    para(
      "Spring convective weather in Central Texas trains along I-35 and the western subdivisions. May 2026 brought multiple severe watches with hail up to two inches possible, wind-driven rain, and enough follow-up moisture to clog valleys with oak tassels and storm debris. Damage is rarely uniform: one cul-de-sac may see dented mailboxes and bruised ridge caps while the next block only picks up wind-scoured granules. That uneven footprint is normal—and why dated photos matter when you talk to adjusters or roofers.",
    ),
    h2("Safe checks you can do from the ground"),
    ul([
      "Soft-metal telltales: mailboxes, gutter strips, painted flashing, window screens, and AC condenser fins often dent before shingles fail visibly.",
      "Granules at downspouts: a fresh grit pile after rain can signal mat bruising even when the field looks fine from the driveway.",
      "Lifted ridge or hip caps: wind-plus-hail events pop tabs here first—binoculars from a safe offset beat an unnecessary climb.",
      "Interior timing: note new ceiling spots or bathroom vent drips after the next rain; date-stamped photos help align causation.",
      "Stay off wet or steep roofs: lightning risk and slick shingles cause avoidable injuries; let licensed crews handle slope work.",
    ]),
    h2("Insurance and documentation in Texas"),
    para(
      "Most Texas homeowners policies cover sudden wind and hail damage, but your deductible—sometimes a dedicated wind/hail percentage—and whether the carrier pays replacement cost versus actual cash value change the math. File timely notice, photograph damage before emergency tarping, and keep NWS watch or warning timing handy. Cosmetic-only endorsements on some forms can limit payout when function is intact; functional mat bruising is a different conversation than paint scuffs on siding.",
    ),
    h2("Roofing scopes: what a written estimate should include"),
    ul([
      "Materials by name: shingle class, underlayment, drip edge, pipe boots, and ventilation plan—not just \"architectural shingles.\"",
      "Decking allowance: per-sheet rate for soft decking discovered at tear-off, and whether it is included or billed separately.",
      "Tear-off vs layover: modern Georgetown replacements usually tear off; layovers limit the next replacement and may affect warranty.",
      "Insurance coordination: who pulls permits, how supplements are handled, and whether tarping is a separate line item.",
    ]),
    h2("HVAC and other pairing checks"),
    para(
      "Hail that dents condenser fins or rooftop units does not always show up on a roof-only walk. If your outdoor unit took impacts, schedule an HVAC tech for coil photos in the same dated folder as roofing shots. Georgetown summers punish undersized or damaged coils quickly once June heat arrives.",
    ),
    h2("Neighborhood-specific guides"),
    p([
      text("For HOA timing, golf-cart traffic, fairway wind fetch, and downtown parking constraints, read the neighborhood write-ups: "),
      link("/blog/hail-damage-sun-city-georgetown-tx", "Sun City"),
      text(", "),
      link("/blog/hail-damage-teravista-georgetown-tx", "Teravista"),
      text(", "),
      link("/blog/hail-damage-wolf-ranch-georgetown-tx", "Wolf Ranch"),
      text(", and "),
      link("/blog/hail-damage-georgetown-village-tx", "Georgetown Village"),
      text(". Each links to a neighborhood hub with FAQs and roofer shortlists."),
    ]),
    h2("Related reading"),
    p([
      text("For a ground-level storm checklist, see "),
      link("/blog/after-hail-roof-checklist-georgetown-tx", "what to check after hail or wind in Georgetown"),
      text(". Compare bids on the "),
      link("/services/roofer-georgetown-tx", "Georgetown roofer hiring guide"),
      text(" and shortlist inspectors from "),
      link("/best/best-roofers-georgetown-tx", "Best Roofers in Georgetown, TX"),
      text("."),
    ]),
  ],
  faqs: [
    {
      q: "How soon should Georgetown homeowners inspect after May 2026 hail?",
      a: "Do a ground-level review once lightning risk drops, then book a licensed roofer for a documented walk within a few days—before the next heavy rain—instead of climbing a wet pitch yourself.",
    },
    {
      q: "Should I file an insurance claim after this storm?",
      a: "Document first with photos and soft-metal checks, then get an independent roofer inspection. Filing without functional damage can affect premiums; borderline cases sometimes warrant monitoring until the next storm adds clarity.",
    },
    {
      q: "Do I need to check HVAC too?",
      a: "Yes—dented condenser fins and hail impacts on rooftop units are common pairing calls with roof inspections after Central Texas storms.",
    },
  ],
});

function hailNeighborhoodBlog(slug, hood, hoodDetail, hubPath, faqs) {
  setBlog(slug, {
    readTime: "8 min",
    dateModified: "2026-05-12",
    description: `May 2026 hail in ${hood}, Georgetown TX: safe roof checks, what to photograph, insurance basics, and how to compare written roofing scopes before you sign.`,
    content: [
      para(
        `After hail crossed west Williamson County on May 9–10, 2026, ${hood} homeowners are dealing with a familiar tension: most shingle bruising is impossible to judge from the sidewalk, yet roofs here still take hits that show up first as granule loss, soft spots on the mat, or dented flashings—not always as an obvious leak.`,
      ),
      para(hoodDetail),
      h2("Safe checks you can do from the ground"),
      ul([
        "Inspect mailboxes, gutter strips, and window screens for fresh dents—they corroborate roof impacts when shingles are hard to read.",
        "Look for granule piles at downspouts after rain; sudden grit can signal bruising before interior stains appear.",
        "Scan ridge and hip caps with binoculars; wind-plus-hail events pop tabs here first.",
        "Note new ceiling spots after the next rain and date-stamp photos for adjusters.",
      ]),
      h2("Insurance and documentation in Texas"),
      para(
        "Most homeowners policies cover sudden wind and hail damage, but your deductible—sometimes a dedicated wind/hail percentage—and whether the carrier pays replacement cost versus actual cash value change the math. File timely notice, photograph damage before emergency tarping, and keep NWS watch or warning timing handy.",
      ),
      h2(`${hood}: next steps`),
      p([
        text(`Read the longer `),
        link(hubPath, `${hood} neighborhood hail hub`),
        text(` for FAQs, then compare scopes on the `),
        link("/services/roofer-georgetown-tx", "Georgetown roofing guide"),
        text(` and county timeline in `),
        link("/blog/hail-damage-georgetown-williamson-may-2026", "our Williamson County hail pillar"),
        text("."),
      ]),
    ],
    faqs,
  });
}

hailNeighborhoodBlog(
  "hail-damage-sun-city-georgetown-tx",
  "Sun City",
  "Sun City skews toward 55+ living, so storm weeks collide with clinic visits, guest traffic, and golf-cart circulation on interior paths. Expect longer drive times for ladder crews and occasional gate delays. Save your roofer shortlist before the storm passes so you are not choosing from whoever parks longest at a mailbox kiosk.",
  "/neighborhoods/sun-city/hail-damage",
  [
    {
      q: "How soon should Sun City homeowners inspect after hail?",
      a: "Do a ground-level review once lightning risk drops, then book a licensed roofer for a documented walk within a few days—before the next heavy rain.",
    },
    {
      q: "Should I also check HVAC after hail?",
      a: "Yes—dented condenser fins and hail impacts on rooftop units are common pairing calls with roof inspections after Central Texas storms.",
    },
  ],
);

hailNeighborhoodBlog(
  "hail-damage-teravista-georgetown-tx",
  "Teravista",
  "Teravista mixes tree-lined streets, golf-course adjacency, and several build eras—so hail rarely hits every lot the same way. Wind channeling around ponds can lift ridge shingles on one block while another sees only scattered bruising. Note storm motion on radar so your roofer has orientation photos, not hypotheticals.",
  "/neighborhoods/teravista/hail-damage",
  [
    {
      q: "How soon should Teravista homeowners inspect after hail?",
      a: "Complete a ground-level review after lightning risk drops, then book a roofer within days so bruised mats are documented before the next storm.",
    },
    {
      q: "Will insurance pay for hail roof repair in Teravista?",
      a: "When adjusters document functional damage tied to a covered storm, payment is common subject to deductible and policy terms; photo correlation with soft-metal hits matters.",
    },
  ],
);

hailNeighborhoodBlog(
  "hail-damage-wolf-ranch-georgetown-tx",
  "Wolf Ranch",
  "Wolf Ranch is filled with newer architectural roofs that can look pristine from the curb even after a harsh hail core. Builder-era bundles sometimes hide nail-line bruising until the next wind event. HOA design review can add a week if shingle class or color changes—start paperwork in parallel with insurance notice.",
  "/neighborhoods/wolf-ranch/hail-damage",
  [
    {
      q: "How soon should Wolf Ranch homeowners inspect after hail?",
      a: "Schedule a licensed inspection as soon as crews can work safely—ideally before the next widespread rain—because latent bruising on newer laminates may not leak immediately.",
    },
    {
      q: "Will insurance pay for hail roof repair in Wolf Ranch?",
      a: "When functional damage is verified, many Williamson County homeowners receive coverage toward replacement or repair minus deductible; widespread bruising can still warrant replacement.",
    },
  ],
);

hailNeighborhoodBlog(
  "hail-damage-georgetown-village-tx",
  "Georgetown Village",
  "Georgetown Village sits close to the historic core—tighter setbacks, mature street trees, and renovation-heavy homes mean hail shows up as dented mailboxes on narrow sidewalks and bruises hidden until the next steady rain. Event-week parking near the Square can block alley access for ladder trucks; weekday estimate slots often work better.",
  "/neighborhoods/georgetown-village/hail-damage",
  [
    {
      q: "How soon should Georgetown Village homeowners inspect after hail?",
      a: "After the watch clears, perform a safe exterior pass the same day if possible, then secure a roofer within a few days before clogged gutters multiply damage.",
    },
    {
      q: "Will insurance pay for hail roof repair near downtown?",
      a: "Functional storm damage is typically covered subject to deductible and policy type; older roofs may see depreciation applied unless endorsed otherwise.",
    },
  ],
);

// —— Extended trade service guides ——
setService("electrician-georgetown-tx", {
  title: "Electricians in Georgetown, TX: Panels, Circuits, and Safety Repairs",
  h1: "Hiring an Electrician in Georgetown, TX: Panels, Circuits, and Code-Compliant Work",
  description:
    "A homeowner's guide to electrical repairs, panel upgrades, and new circuits in Georgetown, TX. When symptoms are urgent, what permits apply, EV and appliance loads in newer subdivisions, and how to compare written scopes.",
  heroBullets: [
    "Breaker trips, warm outlets, and burning odors",
    "Panel upgrades and EV circuit planning",
    "Permits, grounding, and written scopes",
  ],
  relatedServiceSlugs: [],
  content: [
    para(
      "Electrical work in Georgetown homes spans decades of code evolution—from 100-amp panels in central Georgetown bungalows to 200-amp service and generator interlocks in Wolf Ranch and Teravista builds. Central Texas heat, limestone dust, and storm-season power blips stress connections that looked fine last year. This guide covers common symptoms, what is genuinely urgent, and how to compare electrician bids without guessing at scope.",
    ),
    h2("When to call an electrician immediately"),
    ul([
      "Burning odor, scorch marks, or buzzing from an outlet, panel, or appliance circuit.",
      "Breakers that trip repeatedly after reset, especially on kitchen, HVAC, or dryer circuits.",
      "Flickering lights across multiple rooms—not just one fixture—which can indicate a loose neutral or panel issue.",
      "Any shock, tingling, or GFCI that will not reset after you've ruled out a ground-fault appliance.",
    ]),
    h2("Common non-emergency projects"),
    h3("Panel upgrades and service changes"),
    para(
      "Tankless water heaters, EV chargers, pool equipment, and backup generators often need more capacity than a 100- or 125-amp panel can spare. A load calculation should precede any upgrade quote; \"same size as the old panel\" is not a plan when you're adding 40-amp circuits in a Teravista garage.",
    ),
    h3("Outlets, lighting, and kitchen or bath remodels"),
    para(
      "Kitchen islands, bathroom remodels, and outdoor kitchens in Georgetown Village and Berry Creek frequently trigger arc-fault and GFCI requirements that older circuits lack. Retrofit work is slower than new construction because walls are finished and paths are tight.",
    ),
    h3("EV charging and large appliances"),
    para(
      "Level 2 EV chargers typically need a dedicated 240-volt circuit and sometimes a panel upgrade. Wolf Ranch and Sun City garages built before EV adoption may have marginal spare capacity—verify breaker spaces and bus rating before buying hardware.",
    ),
    h2("What changes electrical costs in Georgetown"),
    ul([
      "Access: attic runs in two-story Teravista homes vs single-story slab ranches in Sun City.",
      "Permits and inspections: incorporated Georgetown work on panels and new circuits usually requires permits pulled by the contractor.",
      "Materials: copper wire pricing, AFCI/GFCI device counts, and whether conduit is required in exposed areas.",
      "Emergency vs scheduled: after-hours dispatch fees apply to true safety issues; a non-working bedroom outlet can wait for business hours.",
    ]),
    h2("How to evaluate a Georgetown electrician"),
    ul([
      "Texas electrical license and insurance certificate before work starts.",
      "Written scope listing circuits affected, wire gauge, device types, and permit responsibility.",
      "Warranty on labor—many reputable shops offer one year minimum on installs.",
      "Clear change-order policy if opening walls reveals knob-and-tube or aluminum branch wiring in older stock.",
    ]),
  ],
  faqs: [
    {
      q: "Do I need a permit for a panel upgrade in Georgetown?",
      a: "Panel and service upgrades in incorporated Georgetown typically require a permit and inspection. Verify requirements for your address; reputable electricians pull permits routinely.",
    },
    {
      q: "Can I install an EV charger myself?",
      a: "Texas requires licensed electricians for permanent 240-volt circuits. Plug-in Level 1 charging on an existing outlet is different from a hardwired Level 2 install that needs correct breaker sizing and wire gauge.",
    },
    {
      q: "Why do breakers trip more in summer?",
      a: "HVAC compressors, pool pumps, and attic heat load the panel harder. A breaker that trips only on the hottest afternoons may be doing its job—or may be undersized for a failing compressor drawing high amps.",
    },
    {
      q: "What should a written estimate include?",
      a: "Labor hours or flat task pricing, parts by description, permit fees, disposal of old equipment, and whether drywall repair is included after fishing wire.",
    },
  ],
});

setService("landscaping-georgetown-tx", {
  title: "Landscaping & Lawn Care in Georgetown, TX",
  h1: "Hiring a Landscaper in Georgetown, TX: Turf, Beds, and Irrigation",
  description:
    "A practical guide to lawn care, bed maintenance, and irrigation in Georgetown, TX. Central Texas heat and clay soil, seasonal timing, watering rules, and how to compare landscape bids apples to apples.",
  heroBullets: [
    "Mowing, edging, and seasonal cleanups",
    "Beds, mulch, and planting windows",
    "Irrigation tuning and drainage basics",
  ],
  relatedServiceSlugs: [],
  content: [
    para(
      "Georgetown yards sit on expansive clay, face long dry spells broken by gully-washer rains, and deal with cedar pollen and oak leaf drop that clog beds and gutters alike. Landscaping here is less about magazine perfection and more about sustainable turf, controlled water use, and drainage that keeps foundation moisture swings in check. This guide walks through what most homeowners need, when to schedule work, and how to compare crews without vague \"make it look nice\" scopes.",
    ),
    h2("What homeowners usually hire for"),
    h3("Routine lawn care"),
    para(
      "Weekly or biweekly mowing, edging, and blowing are the baseline in Wolf Ranch and Teravista. Berry Creek and Georgetown Village lots with mature trees often need seasonal leaf removal and aeration to fight compaction.",
    ),
    h3("Beds, mulch, and planting"),
    para(
      "Fall and spring are the practical planting windows for many shrubs and perennials, but drought timing matters more than the calendar. Mulch depth, weed barrier choices, and drip vs spray irrigation change maintenance load for years.",
    ),
    h3("Irrigation and drainage"),
    para(
      "Misaligned heads, cracked laterals, and controllers still on winter schedules are common after freeze-thaw cycles. Poor drainage along one side of a slab can worsen foundation movement—landscapers and foundation specialists sometimes need to coordinate grading and downspout extensions.",
    ),
    h2("Seasonal realities in Williamson County"),
    ul([
      "Summer: heat stress on St. Augustine and Bermuda; adjust mowing height and watering depth rather than daily light sprinkles.",
      "Spring: pollen and weed pressure; pre-emergent timing is narrow—ask what product and when it was applied.",
      "Fall: overseeding and bed refresh before holiday guest weeks in Sun City.",
      "Freeze events: protect tender plants; inspect irrigation backflow and exposed PVC after hard freezes.",
    ]),
    h2("How to compare landscape quotes"),
    ul([
      "Same visit frequency and task list across bidders—mow, edge, blow, bed weeding, and debris haul-away defined.",
      "Insurance: workers' compensation and liability for crews on your property.",
      "Irrigation: whether diagnosis is included or billed separately; ask for zone maps after repairs.",
      "Plant warranties: many companies guarantee install for 30–90 days if watering instructions are followed.",
    ]),
  ],
  faqs: [
    {
      q: "When should I plant shrubs in Georgetown?",
      a: "Fall and early spring are common windows, but species and irrigation matter more than a fixed date. Native and adapted plants generally handle Central Texas swings better than imports that need constant pampering.",
    },
    {
      q: "How often should irrigation run in summer?",
      a: "Deep, infrequent cycles beat daily misting. Many homeowners overwater while still showing dry spots because heads are misaligned—an irrigation audit often saves more than upgrading plants.",
    },
    {
      q: "Does landscaping affect foundation health?",
      a: "Yes—negative grade toward the slab and overflowing gutters concentrate water on one side. Coordinating landscape grading with foundation drainage recommendations is common in clay-soil neighborhoods.",
    },
  ],
});

setService("pest-control-georgetown-tx", {
  title: "Pest Control in Georgetown, TX",
  h1: "Hiring Pest Control in Georgetown, TX: Inspections, Treatment, and Follow-Up",
  description:
    "Ants, roaches, rodents, and seasonal pests in Georgetown, TX. How inspections work, what maintenance plans include, pet and kid safety, and how to compare providers without one-size chemical blankets.",
  heroBullets: [
    "Inspection-first treatment plans",
    "Perimeter, interior, and rodent entry work",
    "Re-service terms and seasonal pressure",
  ],
  relatedServiceSlugs: [],
  content: [
    para(
      "Georgetown's mix of limestone edges, mature trees, and slab-on-grade construction gives pests plenty of routes inside—fire ants after rain, roof rats along fence lines, German roaches in moisture zones, and scorpions near patio lights on warm evenings. Effective control pairs identification with targeted treatment and realistic follow-up, not a single perimeter spray billed as a cure-all.",
    ),
    h2("Typical pest pressure locally"),
    h3("Ants and seasonal invaders"),
    para(
      "Rain pushes fire ants and rover ants toward foundations and kitchens. Recurring trails after DIY sprays often mean the colony was never addressed—baits and perimeter barriers work differently than contact kills.",
    ),
    h3("Roaches and moisture pests"),
    para(
      "German roaches need kitchen and bath focus; American roaches often trace to drains, irrigation boxes, or heavy mulch against the slab. Fixing moisture beats repeating sprays alone.",
    ),
    h3("Rodents and wildlife entry"),
    para(
      "Garage door gaps, weep holes, and uncapped fence lines are common entry points. Exclusion—steel wool, door sweeps, and secured vents—should appear in the written plan, not just traps.",
    ),
    h2("What a good plan includes"),
    ul([
      "Target pests named explicitly with interior vs exterior strategy.",
      "Product classes explained and drying or re-entry times for pets and kids.",
      "Re-service terms if pests return within a stated window.",
      "TPCL license verification for Texas pesticide applicators.",
    ]),
    h2("Maintenance vs one-time treatments"),
    para(
      "Quarterly perimeter plans suit many Georgetown homes with recurring ant or spider pressure. Termite bonds and bed-bug jobs are separate contracts with their own warranties—do not assume a general pest plan covers them.",
    ),
  ],
  faqs: [
    {
      q: "Are treatments safe for pets?",
      a: "Reputable companies explain product choices, drying times, and temporary precautions. Tell them about pet access areas before service.",
    },
    {
      q: "Why do ants come back after rain?",
      a: "Colonies relocate when soil saturates. Baits and barrier timing matter; a quick spray without colony targeting often looks like failure within a week.",
    },
    {
      q: "Do I need pest control if I see one scorpion?",
      a: "One sighting may not warrant a full program, but inspecting weep holes, door seals, and exterior lighting that attracts insects is worthwhile in limestone-edge neighborhoods.",
    },
  ],
});

setService("foundation-repair-georgetown-tx", {
  title: "Foundation Repair in Georgetown, TX",
  h1: "Foundation Repair in Georgetown, TX: Clay Soil, Drainage, and Evaluation",
  description:
    "Foundation warning signs, pier and slab repair methods, and moisture management for Georgetown, TX homes on expansive Williamson County clay. How to evaluate contractors and avoid fear-based sales.",
  heroBullets: [
    "Crack patterns and floor slope checks",
    "Pier, beam, and slab stabilization",
    "Drainage and gutter coordination",
  ],
  relatedServiceSlugs: [],
  content: [
    para(
      "Williamson County's expansive clay swells when wet and shrinks in drought, stressing slabs and pier-and-beam footings across Georgetown—from downtown bungalows to Wolf Ranch builds. Not every crack is structural, but patterns that widen seasonally, sticking doors on a diagonal, and floor slope changes deserve measured evaluation rather than a single photo and a sales pitch.",
    ),
    h2("Warning signs worth documenting"),
    ul([
      "Diagonal cracks at door or window corners that grow after rain cycles.",
      "Doors or windows that stick only in summer or only in winter.",
      "Visible floor slope or gaps between baseboards and flooring.",
      "Exterior brick cracks in stair-step patterns tied to one corner of the home.",
    ]),
    h2("Repair methods you may hear about"),
    h3("Pressed steel or concrete piers"),
    para(
      "Interior or exterior piers lift and stabilize portions of a slab. Quotes should list pier count, depth guarantees, and lift tolerances—not a flat price per pier without a elevation survey.",
    ),
    h3("Pier-and-beam adjustments"),
    para(
      "Older Georgetown stock may need shim replacement, sill repair, and ventilation improvements under the crawl space. Moisture and wood rot must be addressed before leveling sticks.",
    ),
    h3("Drainage and moisture management"),
    para(
      "Gutters that dump at the foundation, negative grade, and irrigation against the slab can mimic foundation failure. Many durable fixes pair limited pier work with drainage correction.",
    ),
    h2("How to evaluate foundation companies"),
    ul([
      "Elevation or crack monitoring data—not just a walk-through opinion.",
      "Written repair plan with pier type, locations, and plumbing/static test responsibilities.",
      "Transferable warranty terms and what maintenance voids coverage.",
      "Refusal to pressure same-day contracts after a \"free inspection.\"",
    ]),
  ],
  faqs: [
    {
      q: "Do I always need piers if I see cracks?",
      a: "No—hairline shrinkage cracks differ from widening structural gaps. Ask how the company documents movement over time before authorizing pier installs.",
    },
    {
      q: "Should I fix drainage before foundation work?",
      a: "Often yes. Managing water around the slab is part of a durable solution in expansive clay; piers alone without drainage may not hold alignment.",
    },
    {
      q: "Will insurance cover foundation repair?",
      a: "Gradual soil movement and maintenance issues are usually excluded. Sudden plumbing leaks under a slab may be a separate claim—document dates and plumber findings.",
    },
  ],
});

setService("house-cleaning-georgetown-tx", {
  title: "House Cleaning Services in Georgetown, TX",
  h1: "Hiring House Cleaning in Georgetown, TX: Recurring, Deep, and Move-Out Service",
  description:
    "How Georgetown cleaners structure recurring visits, deep cleans, and move-out work. Hard-water film, pollen dust, pricing by scope, and questions that prevent surprise exclusions.",
  heroBullets: [
    "Recurring vs deep-clean scopes",
    "Kitchens, baths, and high-dust zones",
    "Insurance, supplies, and checklists",
  ],
  relatedServiceSlugs: [],
  content: [
    para(
      "Cleaning services in Georgetown succeed on predictable scope: which rooms, how often, whether supplies are included, and what \"deep clean\" means on paper. Hard water leaves film on fixtures, cedar pollen coats sills after spring storms, and Sun City guest weeks push many households toward pre-visit deep cleans. This guide explains service types, pricing drivers, and how to compare bids without \"that wasn't included\" disputes.",
    ),
    h2("Popular service types"),
    h3("Recurring maintenance"),
    para(
      "Biweekly or monthly visits typically cover kitchens, baths, floors, and dusting on a rotating basis for lesser-used rooms. Clarify whether inside ovens, fridges, and baseboards are standard or add-ons.",
    ),
    h3("Deep and seasonal cleans"),
    para(
      "Deep cleans before holidays or after pollen season address blinds, baseboards, and mineral buildup on showers. Expect higher pricing and longer on-site time than a maintenance visit.",
    ),
    h3("Move-in and move-out"),
    para(
      "Empty homes still need cabinet interiors, appliance fronts, and garage sweeps defined. Post-construction dust may require HEPA vacuums and multiple passes—confirm experience before booking.",
    ),
    h2("What affects pricing"),
    ul([
      "Square footage, bedroom and bath counts, and clutter level.",
      "Pets and hair volume—some teams charge modest surcharges.",
      "Frequency discounts on recurring plans vs one-time deep cleans.",
      "Whether you provide products or the team brings supplies.",
    ]),
    h2("Green flags when hiring"),
    ul([
      "Liability insurance and background-check policy stated upfront.",
      "Written checklist for standard vs deep scopes.",
      "Cancellation and rescheduling rules, especially for recurring plans.",
      "Consistent teams when possible so cleaners learn your home's quirks.",
    ]),
  ],
  faqs: [
    {
      q: "Should a cleaning company be insured?",
      a: "Reputable companies carry liability coverage and can explain what happens if something is damaged during service.",
    },
    {
      q: "How is pricing usually calculated?",
      a: "Many cleaners price by square footage, room count, or time blocks. Compare the same frequency and task list across bids.",
    },
    {
      q: "Do I need to be home?",
      a: "Many Georgetown clients provide garage or lockbox access for recurring service. Clarify security expectations and how teams log arrivals.",
    },
  ],
});

// —— Extended best-of pages ——
function expandBest(slug, intro, sections, closing) {
  const content = [para(intro), ...sections.flat(), para(closing)];
  setBest(slug, { content });
}

expandBest(
  "best-electricians-georgetown-tx",
  "Electrical work is safety-critical and permit-sensitive. The best Georgetown electricians explain symptoms clearly, document findings, and provide written scopes before panels or circuits are opened.",
  [
    h2("What to look for"),
    ul([
      "Active Texas electrical license and proof of insurance.",
      "Load calculations or clear justification before panel upgrades.",
      "Written estimates listing circuits, wire gauge, and device types.",
      "Respect for AFCI, GFCI, and grounding requirements on remodel work.",
    ]),
    h2("Red flags"),
    ul([
      "Cash-only offers to skip permits on panel or service work.",
      "Vague \"we'll see when we open the wall\" pricing without change-order rules.",
      "Pressure to replace panels without documenting trip causes or load data.",
    ]),
  ],
  "Start with the electrician service guide for common projects and permit notes, then request two written estimates you can compare line-by-line.",
);

expandBest(
  "best-landscaping-companies-georgetown-tx",
  "Strong landscaping companies in Georgetown communicate visit frequency, bed scope, and how they handle irrigation and drainage—not just mowing height.",
  [
    h2("Questions to ask"),
    ul([
      "What is included each visit vs priced as add-ons?",
      "How do you adjust irrigation during drought and after heavy rain?",
      "Do you carry workers' compensation and liability insurance?",
      "How do you price mulch, seasonal color, and bed weed control?",
    ]),
    h2("Compare apples to apples"),
    ul([
      "Same mowing frequency, edging, and debris haul-away across bids.",
      "Clarify who owns plant replacement risk in the first 30–90 days.",
      "Ask whether fertilization and pre-emergent are bundled or separate.",
    ]),
  ],
  "Read the landscaping service guide for seasonal timing, then shortlist companies below for walkthroughs and written proposals.",
);

expandBest(
  "best-pest-control-georgetown-tx",
  "The best pest plans combine inspection, targeted treatment, and honest re-service terms—not a one-size chemical blanket sold on the first visit.",
  [
    h2("What to verify"),
    ul([
      "Target pests identified with interior vs perimeter strategy.",
      "TPCL license and product labels explained in plain language.",
      "Re-service window if pests return after treatment.",
      "Pet, kid, and drying-time instructions in writing.",
    ]),
    h2("Maintenance vs specialty work"),
    ul([
      "General quarterly plans differ from termite bonds and bed-bug protocols.",
      "Rodent jobs should include exclusion, not only traps.",
      "Ask how techs document entry points and follow-up visits.",
    ]),
  ],
  "Use the pest control service guide to understand local species pressure, then contact a short list for inspection and plan pricing.",
);

expandBest(
  "best-foundation-repair-georgetown-tx",
  "Foundation repair in Georgetown should account for clay soil movement and moisture swings. Look for documentation, monitoring, and drainage guidance—not fear-based same-day contracts.",
  [
    h2("What to ask"),
    ul([
      "How do you document elevation or crack changes over time?",
      "What repair methods fit slab vs pier-and-beam homes here?",
      "How should gutters, grading, and irrigation be adjusted?",
      "What do warranties cover—and what maintenance voids them?",
    ]),
    h2("Evaluation standards"),
    ul([
      "Written repair plan with pier count and depth guarantees.",
      "Plumbing and static test responsibilities spelled out.",
      "Refusal to quote unlimited piers without survey data.",
    ]),
  ],
  "Pair this directory with the foundation repair service guide for warning signs, then compare two documented evaluations before authorizing pier work.",
);

expandBest(
  "best-house-cleaning-services-georgetown-tx",
  "Reliable Georgetown cleaners provide checklists, supply policies, and transparent pricing for the same scope across visits—especially for deep and move-out work.",
  [
    h2("Green flags"),
    ul([
      "Background-checked teams and liability insurance.",
      "Written task lists for standard vs deep cleans.",
      "Clear cancellation and rescheduling rules.",
      "Consistent crews when possible.",
    ]),
    h2("Scope questions"),
    ul([
      "Are ovens, fridges, baseboards, and interior windows included?",
      "Who brings supplies and are green products available?",
      "How do you price post-construction or move-out dust?",
    ]),
  ],
  "Use the house cleaning guide to define your scope, then compare providers here on the same bedroom, bath, and frequency assumptions.",
);

fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("Expanded site-content.json");
