import type { Faq } from "./site-content";

/**
 * People Also Ask–style FAQs for trade hubs (`/services/plumbing`, `/services/hvac`, `/services/roofing`).
 * Answers stay ~40–60 words: Georgetown / Williamson County context; pair with FAQSchema + FAQList.
 */
export const PLUMBING_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does a plumber cost in Georgetown, TX?",
    a: "Georgetown TX plumbers typically charge $75–175/hr for labor. Most service calls include an $85–150 trip or diagnostic fee that may credit toward the repair. Simple fixes may be flat-priced; slab or sewer work runs higher. Evening and weekend emergency rates are commonly about 1.5–2× standard—confirm pricing before work starts.",
  },
  {
    q: "Do plumbers need to be licensed in Texas?",
    a: "Yes. Plumbing in Texas is regulated by the Texas State Board of Plumbing Examiners—verify an active license for water, drain, and gas-line work. Ask for proof of insurance and whether permits are included. Licensing does not guarantee a smooth job, but it is a baseline filter before you sign off on major repairs.",
  },
  {
    q: "What counts as a plumbing emergency in Georgetown, TX?",
    a: "Treat uncontrolled leaks, sewage backing into fixtures, a gas smell near appliances, or no water to the whole house as emergencies. Shut the main water valve when it is safe, then call a licensed plumber. Ceiling stains after storms may be roof or HVAC—still get someone out before mold or rot spreads.",
  },
  {
    q: "How much does drain cleaning cost in Georgetown, TX?",
    a: "Kitchen or bathroom line snaking in Williamson County often runs roughly $125–350 depending on access and clog depth; camera or hydro-jetting on a main line costs more if grease or roots return. If several drains gurgle together, ask about a mainline blockage so you do not pay for repeat spot clears.",
  },
  {
    q: "Does homeowners insurance cover plumbing leaks in Texas?",
    a: "Policies usually cover sudden, accidental pipe bursts—think supply-line breaks—not long-term drips insurers classify as maintenance. Slab or slow leaks are often disputed, so photo damage before cleanup when safe and read your deductible. Ask your adjuster how your specific form treats gradual seepage versus a one-time rupture.",
  },
  {
    q: "How do I choose a reliable plumber in Georgetown, TX?",
    a: "Verify TSBPE licensing, insurance, and written scopes that list what is included and excluded. Compare at least two itemized bids, not vague totals. Strong local pros explain access cuts, warranty terms, and after-hours rates up front. Cross-check recent reviews that mention the exact work you need—not just star averages.",
  },
  {
    q: "How long does a water heater replacement take?",
    a: "A like-for-like tank swap on the same footprint often finishes in a morning or afternoon if shutoffs, venting, and power or gas are straightforward. Tankless swaps, relocations, or code upgrades add time. In hard-water Georgetown, ask about expansion tanks or flushing schedules so the new unit lasts.",
  },
  {
    q: "Does Georgetown’s hard water damage plumbing?",
    a: "Georgetown’s water is moderately hard, so scale builds on aerators, cartridges, and water heaters faster than in soft-water regions. That can shorten fixture life and hide small leaks until washers fail. Routine strainer cleaning, sensible softener use, and describing chronic drips help a plumber separate scale wear from line issues.",
  },
];

export const HVAC_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does HVAC repair cost in Georgetown, TX?",
    a: "Expect roughly $89–200 for a weekday diagnostic, then parts and labor on top—small fixes stay modest; failed compressors or coils can approach replacement math. In Williamson County, summer demand runs high, so ask whether the trip fee credits toward approved repairs. Weekend and holiday surcharges are normal—confirm dispatch minimums first.",
  },
  {
    q: "Why is my AC running but not cooling?",
    a: "Check airflow first: dirty filters, blocked returns, or a frozen indoor coil all feel like weak cooling. Beyond that, low refrigerant, weak capacitors, or compressor issues need a licensed tech. If you see ice on the refrigerant line, turn the system off to thaw before the visit so diagnostics stay accurate and the compressor is protected.",
  },
  {
    q: "How often should I service my AC in Central Texas?",
    a: "Book professional cooling maintenance once a year before peak summer and change filters every one to three months as dust loads demand. Pollen and long cooling seasons around Georgetown punish neglected coils and drains. A spring tune-up often catches weak capacitors before July heat turns a small issue into a no-cool weekend.",
  },
  {
    q: "How long do air conditioners last in Texas?",
    a: "Well-maintained split systems in Central Texas often last about 12–18 years, though coil leaks and electrical stress can shorten that window. Consider replacement when repairs approach half the cost of new equipment or reliability fails during triple-digit weeks. National warranty timelines rarely match real attic heat and runtime here.",
  },
  {
    q: "How much does a new AC system cost near Georgetown, TX?",
    a: "Whole-system replacements in the Austin–Williamson market commonly land near $6,000–12,000 installed depending on tonnage, SEER2 tier, line-set length, duct fixes, and electrical upgrades—not a quote. Demand model numbers, warranty tiers, and line-item labor on proposals, then compare at least two licensed contractors before you decide.",
  },
  {
    q: "Do HVAC technicians need a license in Texas?",
    a: "Texas licenses air conditioning and refrigeration contractors through TDLR for regulated scopes. Refrigerant handling, new equipment installs, and major electrical or gas tie-ins belong with a licensed contractor—not a casual handyman. Ask for a license number on big-ticket work and confirm it online before authorizing refrigerant or line replacements.",
  },
  {
    q: "What thermostat setting should I use in a Texas summer?",
    a: "Most Georgetown families keep about 74–78°F while home, nudging up a few degrees when away if pets allow. Deep setbacks force long afternoon recovery when outdoor temps pass 100°F, which strains equipment. Use ceiling fans only in occupied rooms—they cool people, not the house—and shade west windows to cut solar gain.",
  },
  {
    q: "What does emergency HVAC service cost in Georgetown, TX?",
    a: "After-hours and weekend dispatches usually add roughly $100–300 beyond daytime rates, with holidays higher. Trip fees and minimum labor still apply even when the fix is a minor part—ask how multipliers work before authorizing a midnight visit you might safely reschedule. Cheap parts rarely offset overtime and fuel surcharges.",
  },
];

export const ROOFING_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does a new roof cost in Georgetown, TX?",
    a: "Asphalt re-roofs on typical Williamson County single-families often land in the mid-four- to low-five-figure range depending on squares, pitch, tear-off layers, decking repairs, and accessory metal—not a bid here. Steep cuts, detached structures, and skylights add labor. Compare line-item scopes with the same shingle class, not one vague total.",
  },
  {
    q: "How long does a shingle roof last in Central Texas?",
    a: "Dimensional shingles may quote thirty-year warranties yet commonly deliver roughly 18–25 years before granule loss or seal fatigue appears. Hail can damage younger roofs quietly. After storms, check soft metals and gutters, keep valleys clear, and photograph changes so you can separate normal aging from weather-related wear.",
  },
  {
    q: "Does homeowners insurance cover hail roof damage in Texas?",
    a: "Wind and hail are usually covered perils, but many Texas policies use percentage or named-storm deductibles that can exceed flat-dollar copays. Document the storm date, gutter dents, and interior signs, keep tarp receipts, and file notice quickly. Final payment still follows your adjuster, endorsements, and maintenance disputes.",
  },
  {
    q: "How do I know if my roof needs to be replaced?",
    a: "Look for widespread granule loss, lifted tabs, daylight in the attic after rain, spongy decking, or stains that return after patches. Neighborhood hail outbreaks warrant an independent inspection with photos—not a driveway estimate alone. Replacement makes sense when repairs cannot restore watertight performance or match across slopes.",
  },
  {
    q: "Do roofers need a license in Texas?",
    a: "Texas does not issue a statewide residential roofer license, so vet proof of liability insurance, workmanship warranties, manufacturer certifications, and any City of Georgetown registration requirements. Programs like RCAT signal training but never replace insurance verification, local references, and documented scopes before you pay deposits.",
  },
  {
    q: "How long does roof replacement take?",
    a: "Straightforward asphalt jobs near Georgetown often finish in one to three days after materials arrive if weather holds. Steep pitches, multiple tear-off layers, decking repairs, or skylight work extend the schedule. Expect daily cleanup, drip-edge and flashing details finished before overnight exposure, and a final nail sweep before payment.",
  },
  {
    q: "What roofing material is best for Texas heat and hail?",
    a: "Impact-rated asphalt—often Class 4 when budget allows—balances hail resistance and cost for many Central Texas homes. Metal performs well with correct underlayment but costs more up front. Match HOA rules, insurer incentives, and wind ratings to your lot’s tree cover and sun exposure rather than choosing from photos alone.",
  },
  {
    q: "Should I get multiple roofing estimates in Georgetown, TX?",
    a: "Yes—secure at least two bids that name shingle brand, underlayment, starter, ridge, valleys, and ventilation. Flag vague allowances and storm-chaser pressure. Prefer established Williamson County crews with traceable addresses, check permit rules with Georgetown, and never pay large deposits before you verify insurance and lien-risk practices.",
  },
  {
    q: "How do I schedule a hail damage roof inspection in Georgetown, TX?",
    a: "After county-wide hail, book two or three established local roofers for written inspections—not same-day driveway sales. Ask for slope-by-slope photos, soft-metal notes, and whether they recommend repair, monitor, or replacement. Respect lightning and ladder safety; ground-level documentation still helps timelines before the next soaking rain.",
  },
  {
    q: "What should I photograph for a roof hail insurance claim in Williamson County?",
    a: "Take wide elevation shots, dented gutters, fence caps and mailbox posts, shingle closes with scale when safe, outdoor HVAC fins from the ground, and any ceiling stains—all time-stamped. Pair images with local storm statements so carriers can tie damage to specific weather, not guesses after cleanup.",
  },
  {
    q: "How can I tell hail damage on shingles versus normal wear?",
    a: "Hail bruising tends to scatter randomly with crushed granules and exposed mat spots, while aging often tracks sun and traffic patterns uniformly. Matching soft-metal hits the same night adds credibility—but only a cautious walk determines functional damage versus cosmetic chatter you can monitor.",
  },
  {
    q: "What line items should a written hail estimate include?",
    a: "Demand tear-off allowances, decking rules, synthetic or felt spec, valleys, drip edge and flashing transitions, chimney or skylight detail, ridge and starter courses, ventilation math, dumpsters, permits, and code upgrades if quoted—not a single vague per-square rate. Align language with insurer scopes before signing.",
  },
  {
    q: "How do I align a carrier adjuster’s scope with a roofer’s estimate after hail?",
    a: "Export both PDFs, diff decking allowances, ridge vent replacements, drip edge resets, flashing at walls/boots, waste factors, permit fees. Ask roofers for an annotated discrepancy memo citing manufacturer or IRC language so supplements cite specifics—not narrative-only pushback.",
  },
  {
    q: "Should I photograph ridge vents and wall flashings even if shingles look fine?",
    a: "Yes—wind plus hail fractures plastic ridge vents, pops hip/ridge caps, and lifts counter-flashing before field bruising reveals itself. Shoot context + close-ups; attic pinholes near penetrations help justify those line items.",
  },
  {
    q: "Why does clogged gutter debris matter for Williamson County hail timelines?",
    a: "Because overflow dams water against fascia and soaks sheathings—paths carriers might mis-attribute to maintenance if you rake leaves before photographing. Timestamp gutter blockage next to hail-dented metal.",
  },
  {
    q: "Do Texas HO policies automatically cover ridge vents or drip edge resets after hail?",
    a: "Only when documented storm compromise exists and your form lacks cosmetic carve-outs denying functional metal. Matching and code-upgrade endorsements also shift payouts—tie photos to estimator line items explicitly.",
  },
];

/**
 * Electrical hub FAQs — Georgetown TX context: older Sun City panels, fast new construction (Wolf Ranch),
 * EV/solar growth, and Texas TDLR licensing rules. Answers stay ~40–60 words for FAQSchema compatibility.
 */
export const ELECTRICAL_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does an electrician cost in Georgetown, TX?",
    a: "Most Georgetown electricians charge $100–175 for a service call or diagnostic, then $85–125/hr labor on top. Simple outlet, switch, or breaker swaps often flat-price between $150–300. Panel upgrades and EV chargers run into four figures. Confirm whether the trip fee credits toward the repair before you authorize work.",
  },
  {
    q: "Do electricians need to be licensed in Texas?",
    a: "Yes—Texas regulates electrical work through TDLR, and any wiring beyond simple plug-in fixtures should be performed by a licensed Master or Journeyman Electrician. Verify the license number online before signing for panel, service, or generator work. Unlicensed electrical can void homeowners insurance and complicate future Georgetown permit pulls.",
  },
  {
    q: "How much does a panel upgrade cost in Georgetown, TX?",
    a: "Upgrading a 100A to 200A panel in a Williamson County home typically runs $1,500–4,000 installed, depending on meter location, mast condition, and whether Oncor coordination or city inspection is required. Older Georgetown Village and historic district homes can push higher when grounding electrodes or service mast also need replacement.",
  },
  {
    q: "How much does an EV charger install cost in Georgetown, TX?",
    a: "A typical Level 2 EV charger install in Georgetown runs $500–1,200, mostly driven by panel headroom and conduit run length to the garage. Wolf Ranch and Sun City homes with attached garages and adequate panel capacity sit near the low end; long detached runs or panel upgrades push costs higher.",
  },
  {
    q: "Why do older Georgetown homes need rewiring or panel work?",
    a: "Many 1980s–1990s Georgetown Village and original Sun City homes were built with 100-amp panels, aluminum branch wiring, or undersized service for today's loads—central AC, EVs, induction ranges, and tankless water heaters. Heat-stressed Texas attics also degrade old THHN insulation faster than national averages.",
  },
  {
    q: "Do I need a permit for electrical work in Georgetown, TX?",
    a: "Yes—the City of Georgetown requires permits for panel changes, new circuits, service upgrades, generators, and EV chargers, with inspections by city or Oncor depending on the scope. A licensed electrician pulls the permit; insist on it for resale-protection. Sun City homes inside Williamson County jurisdiction follow the same rules.",
  },
  {
    q: "What's a fair price for whole-home surge protection in Georgetown?",
    a: "Whole-home surge protective devices installed at the panel typically run $300–700 in Williamson County—worth it given Central Texas thunderstorm and grid-switching transients. Pair with point-of-use strips for AV gear and computer offices. Ask for a device with at least a 5-year manufacturer warranty and a visible status LED.",
  },
];

/**
 * Landscaping hub FAQs — Georgetown TX context: clay soil, summer triple digits, watering restrictions,
 * Bermuda vs St. Augustine, Sun City HOA expectations. Answers stay ~40–60 words for FAQSchema compatibility.
 */
export const LANDSCAPING_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does lawn care cost in Georgetown, TX?",
    a: "A typical Georgetown lawn-mowing visit runs $40–80 for an average lot; monthly recurring maintenance bundles edging, blowing, and basic bed care for $120–250. Larger Wolf Ranch and Berry Creek lots, or estates inside the historic district, run higher. Confirm whether bagging, fertilization, and weed control are included.",
  },
  {
    q: "Should I plant Bermuda or St. Augustine in Georgetown, TX?",
    a: "Bermuda handles Georgetown's full sun and triple-digit Julys well but struggles under live oaks; St. Augustine tolerates Sun City and Georgetown Village shade but needs more water and is prone to chinch bug and gray leaf spot. Match the grass to your light, irrigation, and HOA rules—not just the showroom photo.",
  },
  {
    q: "How does Georgetown's clay soil affect landscaping?",
    a: "Williamson County's expansive clay swells when wet and cracks during drought, which heaves beds, breaks irrigation glue joints, and stresses tree roots. Good crews amend planting holes with compost, set drip lines on flexible loops, and avoid raised beds over slab edges where soil movement is highest.",
  },
  {
    q: "When does Georgetown enforce watering restrictions?",
    a: "The City of Georgetown utility customers run on a year-round twice-weekly watering schedule by address—stricter in declared drought stages. Sun City and other Williamson County water suppliers may follow different schedules. Check your provider before installing irrigation; a Texas-licensed irrigator will program controllers to comply automatically.",
  },
  {
    q: "How much does irrigation installation cost in Georgetown, TX?",
    a: "A full residential irrigation install in Georgetown typically runs $3,000–8,000, depending on zones, head type, and clay-soil trenching difficulty. Spring tune-ups run $75–150. Texas requires a licensed irrigator (LI) for installs—verify the license, ask for a zone map, and confirm rain/freeze sensors are included for code compliance.",
  },
  {
    q: "When should I overseed or fertilize in Georgetown?",
    a: "Most Georgetown Bermuda lawns get pre-emergent in February and September, light nitrogen in April–May once soil temps stay above 65°F, and a fall potassium feed in October. St. Augustine prefers slow-release nitrogen in late spring and early fall. Skip summer fertilization during 100°F stretches—you'll burn turf you're trying to feed.",
  },
  {
    q: "Do Sun City and HOA neighborhoods restrict landscaping?",
    a: "Yes—Sun City, Wolf Ranch, Teravista, and Berry Creek all enforce HOA design rules covering grass type, front-yard tree species, mulch color, and visible irrigation. Submit landscape plans before installing turf or beds; using an HOA-experienced Georgetown landscaper avoids stop-work letters and forced replacements after the fact.",
  },
];

/**
 * Pest control hub FAQs — Georgetown TX context: fire ants, termites in expansive clay, scorpions,
 * mosquitoes near the San Gabriel river corridor, rodents in fast-growth construction edges.
 */
export const PEST_CONTROL_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does pest control cost in Georgetown, TX?",
    a: "An initial inspection-and-treatment visit typically runs $150–300 in Georgetown; quarterly perimeter plans land around $75–150 per visit. Annual termite monitoring contracts run $200–400 per year, while full termite treatment on an average Williamson County home can range $500–2,500 depending on linear feet and slab access.",
  },
  {
    q: "Are termites a real risk in Georgetown, TX?",
    a: "Yes—Eastern subterranean termites are widespread across Williamson County and thrive against slabs that sit on damp expansive clay. Annual inspections matter on older Georgetown Village and historic-district homes especially. Look for mud tubes on pier-and-beam footings or interior baseboards; pair any treatment with drainage and grading fixes.",
  },
  {
    q: "What pests are most common in Georgetown, TX?",
    a: "Fire ants, scorpions, brown recluse spiders, German roaches, rodents during fall cool-downs, and mosquito surges after spring rain are the year-round Georgetown roster. Sun City's irrigated greenbelts increase mosquito and snake pressure, while fast-growth Wolf Ranch and Teravista construction edges push rodents into garages and attics.",
  },
  {
    q: "How do I get rid of fire ants in a Georgetown yard?",
    a: "A two-step program works best in Williamson County: broadcast a bait like hydramethylnon or indoxacarb in spring and fall, then spot-treat visible mounds. Watering bait in defeats the strategy—apply on dry soil with no rain forecast. Most Georgetown pest plans include fire-ant programs in their quarterly tier.",
  },
  {
    q: "Do scorpions and snakes show up in Georgetown homes?",
    a: "Yes—Texas bark scorpions and rat snakes both turn up in Sun City, Berry Creek, and rural Georgetown homes near cedar breaks and limestone outcrops. Reduce harborage by sealing weep holes with stainless mesh, trimming foundation plantings, and keeping firewood off slab. Pest pros can add IGR-based scorpion treatments to quarterly plans.",
  },
  {
    q: "Is mosquito control worth it in Georgetown, TX?",
    a: "If you back up to greenbelt, drainage easements, or the San Gabriel river corridor, yes. Most Georgetown providers spray IGR plus contact treatments to foliage every 21–28 days April–October for roughly $60–120 per visit. Skip foggers right before rain; reapplication after >0.5 inch storms keeps coverage usable.",
  },
  {
    q: "What should a pest control warranty cover in Georgetown?",
    a: "Look for written re-service guarantees inside the contract period, named pests included versus excluded (carpenter ants, bed bugs, and termites often carve out), and clear termite renewal pricing. Verify the company's TDA structural pest license number, and require notice before any chemistry change to your home environment.",
  },
];

/**
 * Foundation repair hub FAQs — Georgetown TX context: Central Texas expansive Houston Black clay,
 * drought-rain cycles, slab-on-grade construction in Sun City and Wolf Ranch, historic pier-and-beam.
 */
export const FOUNDATION_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does foundation repair cost in Georgetown, TX?",
    a: "Most Williamson County foundation jobs land $4,000–15,000 for a typical slab home. Pressed concrete piers run $1,200–1,800 each; steel piers $1,800–3,000. Drainage corrections add $1,500–5,000. Engineer inspections often run $0–300 (many contractors offer free, but an independent structural engineer is worth the cost on six-figure homes).",
  },
  {
    q: "Why is clay soil such a problem for Georgetown foundations?",
    a: "The Houston Black and similar clays under Georgetown swell up to 30% volume when wet and shrink in drought, lifting and dropping slabs season by season. After the 2011 and 2022 droughts, repair calls spiked across Sun City, Berry Creek, and Georgetown Village. Moisture management often matters more than pier counts.",
  },
  {
    q: "What are warning signs my Georgetown home needs foundation work?",
    a: "Watch for stair-step brick cracks wider than a nickel, doors that bind seasonally on the same hinge, sloped floors you can feel barefoot, separating crown molding, or fresh sheetrock cracks above doors and windows. Photograph and date them—movement that recurs after wet/dry cycles signals soil rather than settlement.",
  },
  {
    q: "Should I get an independent engineer or rely on a contractor's inspection?",
    a: "For repairs over $5,000, hire an independent Texas-licensed Professional Engineer ($400–800) to write the scope—contractor 'free inspections' often default to maximum pier counts. The engineer designs to your specific elevations and soil; contractors then bid the same scope, which makes apples-to-apples comparison realistic.",
  },
  {
    q: "Are foundation problems worse in older Georgetown neighborhoods?",
    a: "Yes—original Sun City sections (early-1990s), Berry Creek, and historic district pier-and-beam homes have had decades of soil cycling. But fast-growth Wolf Ranch and Teravista slabs aren't immune; cut-and-fill grading on newer lots can create early movement when builders skip drainage detail. Age matters less than drainage and soil prep.",
  },
  {
    q: "Does homeowners insurance cover foundation repair in Texas?",
    a: "Standard Texas HO-3 policies exclude earth movement, settling, and expansive soil damage, which is most Georgetown foundation work. Plumbing leaks under the slab that cause movement may be partially covered—document with leak-detection reports. Foundation warranties from prior repairs typically transfer with the home; verify before purchase.",
  },
  {
    q: "What drainage fixes help Georgetown foundations?",
    a: "Most Williamson County homes benefit from extended downspouts (6+ feet from the slab), regrading to 6 inches of fall in the first 10 feet, French drains on low sides, and root barriers between mature trees and slab. Skip flower beds against the foundation—they trap moisture against the very edge that matters.",
  },
];

/**
 * House cleaning hub FAQs — Georgetown TX context: hard water from Edwards Aquifer, Sun City visit
 * weeks, vacation rentals near the square, large Wolf Ranch new builds, fast-growth move-in cleans.
 */
export const HOUSE_CLEANING_TRADE_HUB_FAQS: Faq[] = [
  {
    q: "How much does house cleaning cost in Georgetown, TX?",
    a: "A standard recurring clean on an average Georgetown home runs $120–200; deep cleans land $200–350; move-out or move-in cleans typically $250–400. Recurring weekly service usually prices 15–20% below one-time rates; bi-weekly 10–15% below. Larger Wolf Ranch and Berry Creek homes price higher by square footage or bedroom count.",
  },
  {
    q: "Why does Georgetown water leave so much buildup on glass and fixtures?",
    a: "Georgetown's municipal water draws from the Edwards Aquifer and is moderately hard, so calcium and magnesium scale build on shower glass, faucet aerators, and toilet rims faster than softer markets. Ask cleaners whether they use a CLR-type descaler in their standard rotation or charge it as a deep-clean upgrade.",
  },
  {
    q: "What's the difference between a standard clean and a deep clean?",
    a: "Standard cleans cover surfaces, floors, kitchens, baths, and quick dusting on a 2–4 hour visit. Deep cleans add baseboards, blinds, fan blades, inside the oven and fridge, grout scrubbing, hard-water descaling, and detailed bath buildup removal. First visits, post-construction Wolf Ranch homes, and seasonal resets almost always justify the deep option.",
  },
  {
    q: "Should I tip my house cleaner in Georgetown, TX?",
    a: "Tipping isn't required, but $10–30 per visit (or 15–20% on deep and move-out jobs) is common in Georgetown. For recurring teams, holiday cash bonuses equal to one visit are typical. Independent owner-operators often prefer reviews and referrals over cash—ask which helps their Sun City or Wolf Ranch route more.",
  },
  {
    q: "Are cleaners insured and bonded—does it matter in Georgetown?",
    a: "Yes—ask for proof of general liability and a bond before letting any company carry keys or codes. Georgetown's growing short-term rental market near the historic square has seen more theft and damage claims, so insurance matters for both sides. Reputable cleaners email a certificate of insurance on request.",
  },
  {
    q: "How often should I schedule cleaning in Georgetown, TX?",
    a: "Most Georgetown households land on bi-weekly. Sun City retirees with low traffic often stretch to monthly with quarterly deep cleans; growing families in Wolf Ranch and Teravista often need weekly. Texas dust loads (cedar, cottonwood, construction sites) push frequency higher in spring and early summer—plan ahead during allergy season.",
  },
  {
    q: "What should a move-out clean include for a Georgetown sale or rental?",
    a: "Expect inside cabinets and drawers, oven and microwave, fridge and freezer, blinds and ceiling fans, baseboards, window tracks, garage sweeps, and deep bathroom descaling. Confirm patio and entry door details if listing photos are coming. Williamson County title companies sometimes require move-out cleans before closing—document with photos.",
  },
];
