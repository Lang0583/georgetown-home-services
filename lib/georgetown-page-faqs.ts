import type { NeighborhoodHomeServicesHub } from "@/data/neighborhood-home-services-hubs";
import type { NeighborhoodServicePage } from "@/data/neighborhoods";
import type { ProviderGroup } from "./businesses";
import { inferProviderGroupFromServicePage } from "./businesses";
import type { Faq, ServicePage } from "./site-content";

const MIN_FAQS = 4;
const MAX_FAQS = 6;

function normQuestion(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Pad with neutral copy when a trade template set is thin after merge. */
const GENERIC_GEORGETOWN_FAQS: Faq[] = [
  {
    q: "Does Georgetown Home Services dispatch contractors to my address?",
    a: "No. Georgetown Home Services is an editorial directory and homeowner guide for the Georgetown, TX area. We don’t schedule jobs, quote work, or receive repair requests. Use our service guides and Best Of pages to compare companies, then contact providers directly for availability and written estimates.",
  },
  {
    q: "Why do prices vary so much between Georgetown contractors?",
    a: "Labor rates, overhead, material tiers, warranty length, and how crews document scope (photos, line-item bids) all move the number. In Williamson County, travel time, attic or slab access, and peak summer HVAC demand can also widen bids for the same headline job. Always compare written scopes—not just the bottom line.",
  },
  {
    q: "Should I get more than one estimate in Georgetown, TX?",
    a: "For discretionary or high-ticket work (replacement equipment, re-roofs, foundation work), two or three written estimates usually clarifies what is—and isn’t—in scope. For true emergencies (active water infiltration, no heat in extreme cold, unsafe electrical), prioritize stabilization first, then circle back for comparison once the home is safe.",
  },
  {
    q: "How do I verify a contractor is legitimate in Texas?",
    a: "Ask for current insurance certificates, Texas licensing where the trade requires it (e.g. electrical, plumbing), and local references with similar job types. Cross-check the business name with the Texas Department of Licensing and Regulation or applicable boards, and read recent reviews for how companies handle callbacks and warranty issues—not only star averages.",
  },
];

const TRADE_FAQ_TEMPLATES: Record<ProviderGroup, Faq[]> = {
  plumber: [
    {
      q: "What plumbing problems are most common for Georgetown, TX homes?",
      a: "Hard water from the Edwards Aquifer accelerates faucet and water-heater wear, while slab-on-grade construction can hide slow leaks until you see drywall staining or a spike in usage. Older angle stops, irrigation cross-talk, and sewer line root intrusion also show up often after wet seasons.",
    },
    {
      q: "When is a plumbing issue an emergency in Georgetown?",
      a: "Treat uncontained water, sewage backing into fixtures, a water heater relief valve discharging continuously, or any gas smell (if your plumber also works gas lines) as urgent. Active slab leaks and burst hose bibs during freezes should be shut down at the meter or main and addressed quickly to limit foundation and cabinet damage.",
    },
    {
      q: "Why does my water heater fail sooner in Georgetown than in other cities?",
      a: "Central Texas water is typically mineral-rich. That scale collects on elements and tank bottoms, strains relief valves, and encourages premature tank noise or failure. Flushing on a sensible schedule and replacing sacrificial anodes per manufacturer guidance can extend life, but many Georgetown replacements still land earlier than soft-water markets.",
    },
    {
      q: "Do I need a Georgetown plumber for a slab leak?",
      a: "You want a licensed plumber experienced with slab logistics in Williamson County—someone who can isolate domestic versus irrigation lines, use listening or thermal tools responsibly, and explain repair options (spot repair versus repipe) with realistic dust and access impacts before work starts.",
    },
    {
      q: "How should I compare drain cleaning or sewer estimates?",
      a: "Ask whether the quote includes camera verification after clearing, how they handle roots or collapsed spots, and what happens if the cleanout isn’t accessible. Written video or photo documentation protects you from paying twice when the first pass only punches a partial hole through a blockage.",
    },
    {
      q: "Will Georgetown Home Services recommend a single plumber?",
      a: "We don’t steer you to one company. Use the Georgetown plumbing Best Of guide to compare multiple licensed operators, read how they document scope, then hire based on fit, availability, and transparent pricing—not a directory ranking alone.",
    },
  ],
  hvac: [
    {
      q: "Why is my AC struggling during Georgetown summers even if it ran fine last year?",
      a: "Triple-digit weeks in Georgetown mean systems run longer and latent load climbs. Dirty filters, blower wheels, or condenser coils often masquerade as “low refrigerant.” Weak airflow from undersized or leaky ducts and failing capacitors also peak under extreme heat—exactly when homeowners notice comfort drift.",
    },
    {
      q: "When should I repair versus replace HVAC equipment in Central Texas?",
      a: "Repairs usually make sense when the system is younger, the fix is well-defined (capacitor, condensate switch, minor leak), and efficiency is still reasonable for your home’s loads. Consider replacement when you’re facing major heat-exchanger or compressor work on aged equipment, refrigerant is legacy R-22 with a high leak risk, or bills and comfort no longer track neighbors with similar homes.",
    },
    {
      q: "How often should HVAC maintenance happen in Georgetown, TX?",
      a: "Most single-family homes benefit from spring cooling-focused service and fall heating checks—before the heaviest months. In dusty pollen periods, filter changes may be more frequent than the national “quarterly” advice. Ask your tech to record subcool/superheat or static pressure trends year over year when possible.",
    },
    {
      q: "What questions should I ask before an AC recharge in Texas?",
      a: "Refrigerant isn’t a wear item—if you’re low, there’s usually a leak or a past charging mistake. Ask how they’ll locate the leak, whether nitrogen pressure tests are warranted, and whether the repair includes warranty on related labor. Get the before/after pressures or weights in writing when ethical providers are happy to document work.",
    },
    {
      q: "Do I need a bigger AC because Georgetown is hotter than where I moved from?",
      a: "Not automatically. Oversized equipment short-cycles, dehumidifies poorly, and can wear faster. Manual J–style load thinking, duct design, insulation, and shade matter as much as nominal tonnage. If a salesperson sizes up without explaining latent vs sensible load, get another opinion.",
    },
    {
      q: "Can Georgetown Home Services book my HVAC appointment?",
      a: "No. We publish guides and a provider directory so you can compare Georgetown-area HVAC companies yourself. Contact businesses directly for scheduling, dispatch fees, and seasonal openings.",
    },
  ],
  roofer: [
    {
      q: "What roof issues are most common after Williamson County storms?",
      a: "Lifted or creased shingles, hail bruising on soft metals, granule loss in gutters, and flashing pulls around penetrations are typical hail and wind signatures. Interior stains often lag days behind the storm as insulation slowly saturates—document the roof exterior quickly when safe.",
    },
    {
      q: "How do I tell a roof leak from a plumbing or AC stain on my ceiling?",
      a: "Roof leaks often track along deck seams and may align with valleys, dormers, or penetrations after wind-driven rain. Plumbing or condensate stains may appear below baths or near attic air handlers. A qualified roofer can water-test suspicious roof areas; plumbers rule out pressurized lines—don’t assume the trade without evidence.",
    },
    {
      q: "What should be in a roof replacement quote in Georgetown, TX?",
      a: "Expect line items for tear-off, decking repair limits, underlayment type, starter and ridge, ventilation adjustments, flashing detail, and disposal. Ask about drip edge, valley metal, and ice/water barrier applicability for your deck pitch. Vague lump sums make change-order risk higher after tear-off.",
    },
    {
      q: "Do I always need a full replacement if I see a leak?",
      a: "No—localized repairs work when decking is sound, membrane or shingle damage is isolated, and flashing detail fixes the entry path. Replacement tends to make sense when multiple failure planes exist, decking is compromised in wide areas, or the system is near end-of-life with repeated return visits.",
    },
    {
      q: "How does insurance differ from cash-pay roofing work?",
      a: "Carrier-covered storm claims follow adjusters’ scopes, supplements, and depreciation rules; cash jobs trade flexibility for potentially faster scheduling but lack carrier-funded upgrades unless you fund them. Ethical roofers in Georgetown still document damage photos and scope the same whether insurance or retail—avoid anyone who offers to “cover your deductible” unlawfully.",
    },
    {
      q: "Where can I compare roofers near Georgetown?",
      a: "Use our Best Roofers in Georgetown, TX directory for vetted listings and hiring context, then request written proposals from multiple companies before you commit.",
    },
  ],
  electrician: [
    {
      q: "When should I call an electrician urgently in Georgetown, TX?",
      a: "Burning smells from a panel, buzzing breakers, outlets that spark, tingling from appliances, or power loss affecting medical equipment warrant immediate attention. Turn off the affected circuit at the panel if you can do so safely and call a licensed electrician—don’t wait for “normal business hours” on fire-safety signals.",
    },
    {
      q: "Why are panel upgrades common in older Georgetown neighborhoods?",
      a: "Many homes were built before today’s EV chargers, heat-pump HVAC, and kitchen appliance loads. An undersized or recalled panel can’t safely carry added breakers. Georgetown Village and similar areas often see 100A→200A upgrades when remodels add amps; expect scope to include grounding, bonding, and permit inspections.",
    },
    {
      q: "What does EV charger installation typically involve?",
      a: "A dedicated circuit from the panel, appropriate wire gauge and breaker, GFCI protection where required, and sometimes a service upgrade if your load calculation is tight. Wall connector choice and Wi-Fi features matter less than correct ampacity and clean terminations—verify the electrician calculates load before promising same-day adds.",
    },
    {
      q: "Should I DIY minor electrical fixes in Texas?",
      a: "Texas law restricts electrical work to licensed professionals in many scenarios. Even “small” swaps can violate code on box fill, grounding, AFCI/GFCI protection, or aluminum-to-copper transitions. Mistakes here aren’t cosmetic—hire for anything beyond changing a known-good bulb or flipping a labeled breaker after an overload.",
    },
    {
      q: "How do I compare electrical quotes fairly?",
      a: "Match materials (copper only vs mixed), whether permits and inspections are included, and whether trenching or drywall repair is in or out of scope. Ask for photos of completed panels they’ve built and how they document arc-fault protection on bedroom and living circuits per current code cycles.",
    },
    {
      q: "Does this site schedule electricians?",
      a: "No—we’re a homeowner resource. Compare electricians on our Best Electricians guide and book directly with the businesses you choose.",
    },
  ],
  landscaping: [
    {
      q: "What lawn issues are specific to Georgetown’s climate?",
      a: "Heat stress, chinch bugs in St. Augustine, take-all root rot after wet-cool snaps, and drought cracking on clay soils all appear in Georgetown lawns. Irrigation schedules that ignore ET loss or spray onto sidewalks waste water without fixing brown patches.",
    },
    {
      q: "How often should irrigation systems be checked locally?",
      a: "At minimum once before peak summer and once before fall establishment periods—more if you have mature tree root intrusion, pressure swings, or visible dry arcs. A tune-up should include pressure regulation, head alignment, and leak checks at valves—not only “turn it on.”",
    },
    {
      q: "Is Bermuda or St. Augustine better for Georgetown yards?",
      a: "Most established Georgetown neighborhoods run St. Augustine for shade tolerance, while full-sun athletic Bermuda is common on open lots. Your microclimate (tree canopy hours, grade drainage) matters more than blanket advice. A local crew should soil-test compaction before promising sod success.",
    },
    {
      q: "When is the best time for major planting or sod?",
      a: "Spring after frost risk and early fall (warm soil, cooler nights) are generally kinder to establishment than midsummer lay-down. If you must sod in heat, expect heavy irrigation discipline and possible nursery warranties voided without proof of watering.",
    },
    {
      q: "How should I compare landscaping bids?",
      a: "Align plant sizes, soil amendments, mulch depth, and whether bed edging or irrigation reroutes are included. Ask for a simple plant list with botanical names so you’re not comparing “color spots” against a real design plan.",
    },
    {
      q: "Can Georgetown Home Services book my mower or landscaper?",
      a: "No. Use our landscaping Best Of page to pick providers, then schedule mowing, design, or irrigation work directly with them.",
    },
  ],
  pest_control: [
    {
      q: "What pests drive the most calls in Georgetown homes?",
      a: "Fire ants, German cockroaches in warm kitchens, roof rats after fruit drop, mosquitoes near standing water, and subterranean termites in slab-adjacent soil are repeat callers. Seasonal spider and scorpion inquiries spike after dry stretches push insects indoors.",
    },
    {
      q: "How often should perimeter pest service happen?",
      a: "Quarterly perimeter plans are common for ant and roach pressure; heavy tree-canopy homes may need more frequent exterior sweeps during peak breeding months. Avoid vendors who won’t explain active ingredients or resistance rotation—labels and re-entry times matter for kids and pets.",
    },
    {
      q: "Do I need a full house tent for termites?",
      a: "Not usually for localized subterranean activity—liquid or bait systems often fit when activity is confined and monitoring stations show viable colony paths. Fumigation targets drywood termites in inaccessible voids. Your vendor should show shelter tubes, frass, or acoustic evidence—not guess.",
    },
    {
      q: "Are “natural only” treatments enough in Central Texas?",
      a: "Some botanical or desiccant options help lightly infested pockets, but heavy ant mounds or resilient roach strains often need labeled synthetic rotations used lawfully. Ask for Integrated Pest Management: exclusion, moisture fixes, and targeted apps rather than monthly blind perimeter fogging.",
    },
    {
      q: "What should a pest proposal include?",
      a: "Pests covered, products/classes used (not vague “eco spray”), retreatment window, prep steps, and warranty language for bed bugs or termites when applicable. Texas homeowners should see clearly whether interior access is included or exterior-only.",
    },
    {
      q: "Does this site schedule pest service?",
      a: "No—browse our Best Pest Control guide for Georgetown and contact companies directly.",
    },
  ],
  foundation_repair: [
    {
      q: "Why is foundation movement so common in Georgetown, TX?",
      a: "Expansive clay soils around Georgetown swell when wet and shrink in drought, exerting uneven uplift on slabs and perimeter beams. Mature trees, poor drainage, and irrigation overspray compound the cycle—cracks aren’t always emergencies but should be contextualized with elevation or crack monitoring.",
    },
    {
      q: "When is a foundation crack cosmetic versus structural?",
      a: "Hairline veneer cracks in brick with no width change seasonally differ from stair-stepping through mortar, widening horizontal breaks, or doors that progressively bind. Engineers and reputable foundation contractors measure deflection and patterns—phone photos alone rarely suffice for big pier plans.",
    },
    {
      q: "What methods do Georgetown contractors use for stabilization?",
      a: "Pressed concrete piers, steel piers, helical options, and drainage corrections appear in local bids. The right fix depends on depth to bearing strata, plumbing paths, landscaping limits, and whether heave versus settlement dominates. Be skeptical of one-size “all piers today” pitches without investigation.",
    },
    {
      q: "Should I fix drainage before piers?",
      a: "Often yes—if water still pools against the footing after repairs, pier work fights a moving target. Gutters, grades, French drains, and irrigation setbacks frequently belong in the same conversation as structural lifts.",
    },
    {
      q: "How do I compare foundation bids?",
      a: "Match pier counts and depths—not just totals. Ask how they’ll protect plumbing penetrations, whether interior floor levels are part of warranty criteria, and what post-job monitoring is included. Walk away from high-pressure same-day discounts.",
    },
    {
      q: "Can Georgetown Home Services book foundation inspection?",
      a: "No. Use our foundation repair Best Of guide to choose engineers or contractors and schedule directly.",
    },
  ],
  house_cleaning: [
    {
      q: "How is house cleaning priced in Georgetown, TX?",
      a: "Rates usually scale with livable square footage, number of baths, pets, clutter, and whether you want products supplied. Hard water spotting and lime on glass may add time versus soft-water regions; recurring service often credits loyalty versus one-time deep cleans.",
    },
    {
      q: "What’s the difference between standard and deep cleaning?",
      a: "Standard visits hit surfaced traffic areas and sanitary tasks on a rotation. Deep cleaning adds baseboards, interior appliances, grout brushing, and detailed bath descaling. If you’re post-construction or move-out, disclose heavy dust so crews schedule extra hours.",
    },
    {
      q: "Should cleaners use my supplies or theirs?",
      a: "Either works if expectations are clear. Hypoallergenic homes may require your products; pros often prefer calibrated dilutions they trust on finishes. Document any antique wood or specialty stone so the crew avoids damaging sealers.",
    },
    {
      q: "How do I prepare for a first visit?",
      a: "Declutter floors and counters, secure valuables, note broken blinds or pet anxiety triggers, and leave a note on off-limit rooms. Clear sink dishes if you want interiors scrubbed—hourly teams shouldn’t spend half the block loading your dishwasher unless agreed.",
    },
    {
      q: "Are cleaning crews insured and background-checked?",
      a: "Reputable Georgetown services carry liability and workers’ comp and can show it. Ask whether individuals are employees versus 1099 teams—training consistency differs. Read reviews mentioning no-shows and breakage handling, not only sparkle photos.",
    },
    {
      q: "Does this site book maid service?",
      a: "No. Compare cleaners on our Best House Cleaning guide and schedule with providers directly.",
    },
  ],
};

function mergeFaqs(existing: Faq[], templates: Faq[]): Faq[] {
  const out: Faq[] = [];
  const seen = new Set<string>();

  for (const f of existing) {
    const k = normQuestion(f.q);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(f);
    if (out.length >= MAX_FAQS) return out;
  }

  for (const t of templates) {
    if (out.length >= MAX_FAQS) break;
    const k = normQuestion(t.q);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
  }

  for (const g of GENERIC_GEORGETOWN_FAQS) {
    if (out.length >= MAX_FAQS) break;
    const k = normQuestion(g.q);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(g);
  }

  return out;
}

/**
 * 4–6 FAQs for `/services/[slug]`: preserves CMS `service.faqs`, fills with Georgetown trade templates, then generics.
 */
export function resolveServiceGuideFaqs(service: ServicePage): Faq[] {
  const group = inferProviderGroupFromServicePage(service.slug, service.bestSlugs);
  const merged = mergeFaqs(service.faqs ?? [], TRADE_FAQ_TEMPLATES[group]);
  if (merged.length >= MIN_FAQS) return merged.slice(0, MAX_FAQS);

  // Should not happen — templates + generics exceed MIN — but guard anyway.
  const pad = [...merged];
  const seen = new Set(pad.map((f) => normQuestion(f.q)));
  for (const g of GENERIC_GEORGETOWN_FAQS) {
    if (pad.length >= MIN_FAQS) break;
    const k = normQuestion(g.q);
    if (seen.has(k)) continue;
    seen.add(k);
    pad.push(g);
  }
  return pad.slice(0, MAX_FAQS);
}

/** Map neighborhood service route segment → trade for tailored FAQs. */
function neighborhoodServiceToGroup(serviceSlug: string): ProviderGroup {
  const map: Record<string, ProviderGroup> = {
    plumber: "plumber",
    hvac: "hvac",
    roofer: "roofer",
    electrician: "electrician",
    landscaping: "landscaping",
    "pest-control": "pest_control",
    "foundation-repair": "foundation_repair",
    "house-cleaning": "house_cleaning",
  };
  return map[serviceSlug] ?? "plumber";
}

/**
 * 5–6 FAQs for `/neighborhoods/[area]/[service]` landings — localized to the subdivision + trade.
 */
export function buildNeighborhoodGuideFaqs(page: NeighborhoodServicePage): Faq[] {
  const { neighborhoodName, serviceName, serviceCategory, bestOfHref } = page;
  const group = neighborhoodServiceToGroup(page.serviceSlug);
  const tradeLabel =
    group === "plumber"
      ? "plumbing"
      : group === "hvac"
        ? "HVAC"
        : group === "roofer"
          ? "roofing"
          : group === "electrician"
            ? "electrical"
            : group === "landscaping"
              ? "landscaping"
              : group === "pest_control"
                ? "pest control"
                : group === "foundation_repair"
                  ? "foundation repair"
                  : "house cleaning";

  const localized: Faq[] = [
    {
      q: `Is ${serviceName.toLowerCase()} in ${neighborhoodName} different from other parts of Georgetown, TX?`,
      a: `Often, yes. ${neighborhoodName} homes see patterns tied to build era, lot grading, tree canopy, and daily-use habits that differ from elsewhere in Georgetown. ${page.whyLocal} Always confirm any diagnosis with a licensed ${tradeLabel} professional who has inspected your specific home.`,
    },
    {
      q: `What ${serviceCategory} symptoms should ${neighborhoodName} homeowners watch for first?`,
      a: `Start with the “Common issues” list on this page—they reflect repeat calls we see tied to ${neighborhoodName}’s housing stock. Early documentation (photos, video, dates) helps contractors separate progressive problems from one-off weather spikes and makes written estimates easier to compare.`,
    },
    {
      q: "How does Williamson County weather affect timing and pricing?",
      a: "Peak summer heat, hail season, freeze-thaw swings, and clay soil moisture swings all influence how fast contractors can schedule and what materials cost. After widespread storms, demand spikes—plan ahead for longer lead times unless you have a true emergency.",
    },
    {
      q: "Should I get multiple estimates for work in my neighborhood?",
      a: `For non-emergency repairs or replacements, comparing two or three written scopes is still the best hedge against scope gaps. Make sure each bid lists materials, warranty length, and what happens if hidden conditions appear mid-job—especially for ${tradeLabel} work tied to concealed cavities or soil movement.`,
    },
    {
      q: "Does Georgetown Home Services schedule or dispatch contractors to my home?",
      a: `No. We publish neighborhood context and educational guides only. Use our provider directory at ${bestOfHref} to compare companies, then contact them directly for estimates and scheduling.`,
    },
    {
      q: `Where can I compare top-rated ${serviceName.toLowerCase()} serving Georgetown, TX?`,
      a: `Open our Georgetown-area directory (${bestOfHref}) for listings, hiring notes, and links to providers. Stick with written scopes and verifiable licensing—not high-pressure same-day sales tactics.`,
    },
  ];

  return localized.slice(0, MAX_FAQS);
}

/** FAQs for `/neighborhoods/[area]/home-services` tri-trade hubs (plumbing + HVAC + roofing). */
export function buildNeighborhoodHomeServicesHubFaqs(hub: NeighborhoodHomeServicesHub): Faq[] {
  const { neighborhoodName } = hub;
  return [
    {
      q: `Why is ${neighborhoodName} plumbing different from “generic” Georgetown plumbing?`,
      a: `Build era, lot grading, tree canopy, irrigation habits, and slab or foundation behavior change what fails first—even inside the same ZIP code. ${neighborhoodName} homes often show recurring symptom clusters (hard-water fixtures, drain performance after storms, guest-week demand spikes) that deserve context-specific questions when you call a licensed plumber. This page outlines higher-level patterns; the neighborhood plumbing-only guide drills into typical failure modes for your streets.`,
    },
    {
      q: `What HVAC issues show up most around ${neighborhoodName} during peak summer?`,
      a: `Long cooling seasons, pollen and dust loading, latent humidity, and duct layouts that favor aesthetics over return strategy all contribute to comfort complaints that look like “low refrigerant” from the curb. Ask technicians to document airflow and coil condition—not only pressures—and compare maintenance plans that include condensate paths and safe float switches when equipment lives in hot attics.`,
    },
    {
      q: `How should ${neighborhoodName} homeowners think about roofing after Central Texas wind or hail seasons?`,
      a: `Document exterior photos quickly after safe weather, then prioritize a detailed inspection that includes valleys, ridges, penetrations, and flashing transitions—especially where tree litter can dam water. Compare repair scopes and replacement scopes in writing, and separate cosmetic algae streaks from mechanical wind damage. If insurance is involved, align supplements with photographic evidence rather than verbal promises.`,
    },
    {
      q: "Should I get multiple estimates for plumbing, HVAC, or roofing work?",
      a: `For non-emergency replacements or repairs with hidden access, two or three written bids usually clarifies what each vendor includes. Emergencies (active water infiltration, unsafe electrical conditions, no heat in dangerous cold, or obvious structural risk) should be stabilized first—then circle back for comparison once the home is safe.`,
    },
    {
      q: "Does Georgetown Home Services schedule jobs or recommend a single contractor?",
      a: "No. We publish homeowner education and directories. Use our Best Of pages for each trade and Angi’s Georgetown lists if you want an additional comparison lens—then hire based on licensing fit, transparent scope, and verified insurance.",
    },
    {
      q: `Where can I read ${neighborhoodName}-specific guides for one trade only?`,
      a: `Use the neighborhood drill-down links on this page for dedicated plumbing, HVAC, or roofing landings that expand common issues and local context beyond this overview.`,
    },
  ];
}
