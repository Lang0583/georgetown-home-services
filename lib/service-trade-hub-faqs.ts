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
