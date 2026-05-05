import { CORE_BEST_SLUGS } from "./pageContentRegistry";
import type { Faq } from "./site-content";

type CoreBestSlug = (typeof CORE_BEST_SLUGS)[number];

/**
 * Homepage + JSON-LD for `/best/[slug]` core guides. Single source: visible FAQ accordion matches FAQPage schema.
 */
const FAQs_BY_SLUG: Record<CoreBestSlug, Faq[]> = {
  "best-plumbers-georgetown-tx": [
    {
      q: "How much does a plumber cost in Georgetown TX?",
      a: "Most plumbing service calls in Georgetown TX range from $150–$400 for standard repairs. Emergency and after-hours visits often add $75–$150 to the base fee. Slab leak repairs and main-line work commonly run $500–$2,000+ depending on access, materials, and whether walls or flooring must be opened.",
    },
    {
      q: "How do I find a reliable plumber in Georgetown TX?",
      a: "Start with licensed providers who regularly serve Georgetown, have consistent recent reviews, and can explain your issue in plain language. Compare at least two written scopes for larger jobs, confirm insurance and warranty terms, and avoid anyone who pressures you to decide before you’ve seen a clear estimate.",
    },
    {
      q: "What should I look for when hiring a plumber?",
      a: "Look for a Texas plumbing license in good standing, clear written estimates, transparent trip or diagnostic fees, and documentation of scope (what is included, what could change the price). Strong plumbers answer questions about permits, cleanup, and how they handle callbacks if something fails soon after the visit.",
    },
    {
      q: "How long does a typical drain cleaning or plumbing service call take in Georgetown TX?",
      a: "Many straightforward service calls—like clearing a single clog or replacing a fixture—take about one to three hours once a tech is on site. Complex leak tracing, camera inspections, or slab-related work can take longer or require a return visit after the full scope is confirmed.",
    },
    {
      q: "Are permits required for plumbing work in Georgetown TX?",
      a: "Water heater replacements, sewer line work, major repipes, and other work that affects public systems or safety often require permits and inspections. A reputable Georgetown plumber should tell you when a permit is needed, who pulls it, and how inspections fit the timeline—never treat permits as optional for code-affected work.",
    },
  ],
  "top-hvac-companies-georgetown-tx": [
    {
      q: "How much does HVAC service cost in Georgetown TX?",
      a: "Routine tune-ups and small repairs in Georgetown TX often start in the low-to-mid hundreds once you’re on site, with larger repairs scaling up if coils, motors, or refrigerant work is involved. Full system replacement is typically quoted in the many-thousands depending on tonnage, efficiency, and duct or electrical corrections.",
    },
    {
      q: "How do I find a reliable HVAC company in Georgetown TX?",
      a: "Prioritize licensed, insured companies with strong local review history and clear communication in peak summer heat. Ask how they handle warranty parts, who performs the work, and whether quotes include duct, electrical, or thermostat changes—then compare written proposals, not just the headline price.",
    },
    {
      q: "What should I look for when hiring an HVAC company?",
      a: "Look for detailed written scopes (equipment model numbers when relevant), efficiency ratings, labor and manufacturer warranty terms, and realistic timelines. Good providers explain what they measured, what they ruled out, and what you should monitor after the visit instead of jumping straight to replacement without diagnosis.",
    },
    {
      q: "How long does an AC repair visit usually take in Georgetown TX?",
      a: "Many single-issue repairs—capacitor swaps, simple drain line fixes, or straightforward part replacements—can be completed in about one to three hours. Complex refrigerant issues, coil problems, or repeated failures may take longer or require a follow-up once parts arrive.",
    },
    {
      q: "When should I repair versus replace my HVAC system in Central Texas?",
      a: "Repair usually makes sense when the system is newer, the fix is modest relative to replacement, and efficiency still matches your comfort goals. Replacement is often worth discussing when equipment is old, repairs are frequent or expensive, refrigerant is obsolete, or summer reliability in Georgetown’s heat is no longer acceptable.",
    },
  ],
  "best-roofers-georgetown-tx": [
    {
      q: "How much does a roofer cost in Georgetown TX?",
      a: "Small repairs in Georgetown TX often start in the low-to-mid hundreds; flashing, boot, or section repairs can land higher depending on pitch and access. Full replacements vary widely—commonly many-thousands—based on square footage, material, decking condition, and ventilation or flashing scope.",
    },
    {
      q: "How do I find a reliable roofer in Georgetown TX?",
      a: "Focus on local companies with documented storm-season experience, strong review patterns, and willingness to put materials, underlayment, and edge details in writing. After hail or wind events, compare scopes line-by-line and be cautious of high-pressure door-to-door solicitations.",
    },
    {
      q: "What should I look for when hiring a roofer?",
      a: "Expect a written estimate that lists tear-off, underlayment, flashing, ventilation, decking allowances, disposal, timelines, and workmanship plus manufacturer warranties. Ask how they document leaks, who supervises crews, and how change orders are handled if decking or structure surprises appear mid-job.",
    },
    {
      q: "How long does a roof replacement take in Georgetown TX?",
      a: "Many residential re-roofs are completed in one to three days depending on size, complexity, and weather. Rain delays, decking replacement, or detailed chimney and valley work can extend the schedule—a good roofer gives a realistic range and explains what could add days.",
    },
    {
      q: "Does homeowners insurance cover roof repairs in Texas?",
      a: "Insurance may cover sudden, direct physical losses—like wind or hail damage—when your policy includes that peril and a covered claim is approved. Wear-and-tear, deferred maintenance, and gradual leaks are often excluded. Always review your policy with your carrier or agent and document damage with photos before repairs begin.",
    },
  ],
  "best-electricians-georgetown-tx": [
    {
      q: "How much does an electrician cost in Georgetown TX?",
      a: "Service calls and small tasks in Georgetown TX often start with a trip or diagnostic fee plus labor in the low-to-mid hundreds for straightforward work. Panel upgrades, rewiring, EV circuits, or whole-home projects scale into the thousands depending on materials, access, utility requirements, and how much wall finish repair is involved.",
    },
    {
      q: "How do I find a reliable electrician in Georgetown TX?",
      a: "Choose a licensed journeyman or master electrician with liability insurance and a pattern of detailed estimates. For larger jobs, compare at least two written bids and confirm who obtains permits, schedules inspections, and handles fire-stopping or drywall coordination.",
    },
    {
      q: "What should I look for when hiring an electrician?",
      a: "Verify license status, insurance, and whether the scope includes permits when required. Strong electricians label panels clearly, explain overload risks, and specify brand or spec for critical components like panels, breakers, and GFCIs when those choices affect safety and code compliance.",
    },
    {
      q: "How long does a typical electrical service call take in Georgetown TX?",
      a: "Simple jobs—replacing devices, diagnosing a single circuit, or minor troubleshooting—often take one to three hours. Panel upgrades, new circuit pulls across long runs, or correction of multiple hazards can take a full day or span multiple visits, especially if utility coordination is required.",
    },
    {
      q: "Do I need a permit for electrical work in Georgetown TX?",
      a: "Many alterations—new circuits, panel changes, service upgrades, and most work beyond like-for-like device swaps—require permits and inspection under local adoption of the electrical code. Your electrician should identify permit needs up front; skipping required permits can void insurance coverage and create resale problems.",
    },
  ],
  "best-landscaping-companies-georgetown-tx": [
    {
      q: "How much does landscaping cost in Georgetown TX?",
      a: "Basic lawn maintenance or small bed refreshes in Georgetown TX may start in the low hundreds per visit or month depending on lot size. Installs involving irrigation tuning, significant planting, hardscape, or drainage corrections can range from several thousand to much more based on materials and site conditions.",
    },
    {
      q: "How do I find a reliable landscaping company in Georgetown TX?",
      a: "Look for crews with consistent local portfolios, transparent quotes that separate labor and materials, and realistic timelines for Central Texas heat and clay soil. Ask how they handle plant warranties, irrigation adjustments, and ongoing maintenance after the initial install.",
    },
    {
      q: "What should I look for when hiring a landscaping company?",
      a: "Expect a written scope that lists plant sizes or counts, soil amendments, mulch depth, drainage intent, and irrigation changes. Good landscapers explain sun exposure, water budgets, and maintenance burden—especially in new subdivisions with HOA rules in Georgetown.",
    },
    {
      q: "How long does a typical landscaping project take in Georgetown TX?",
      a: "A seasonal refresh or small planting job may finish in a day. Larger designs with grading, beds, trees, or patio elements can take several days to weeks depending on material lead times, crew size, and weather—your contract should spell out phasing and what happens if rain delays work.",
    },
    {
      q: "When is the best time to plant or renovate in Central Texas?",
      a: "Fall through early spring is often ideal for transplanting trees and shrubs so roots establish before peak summer heat. That said, irrigation-heavy projects and some hardscape work can be scheduled year-round if watering and crew safety plans account for Georgetown’s hottest months.",
    },
  ],
  "best-pest-control-georgetown-tx": [
    {
      q: "How much does pest control cost in Georgetown TX?",
      a: "Initial treatments and single-issue visits in Georgetown TX often land in the low-to-mid hundreds, while quarterly perimeter plans are usually priced as an annual or per-visit package. Severe infestations, attic or rodent work, and specialty treatments can cost more after inspection confirms scope.",
    },
    {
      q: "How do I find a reliable pest control company in Georgetown TX?",
      a: "Choose licensed applicators who identify the pest before selling a program, explain treatment options in writing, and provide clear re-treatment or guarantee language. Compare companies that document entry points and moisture issues, not just spray schedules.",
    },
    {
      q: "What should I look for when hiring a pest control company?",
      a: "Look for Texas licensing, label-compliant products, integrated approaches (exclusion + environment + targeted treatment), and straightforward pricing for follow-ups. Ask how they protect pets, how soon you can re-enter treated areas, and what you should do between visits.",
    },
    {
      q: "How long does a standard pest control treatment take in Georgetown TX?",
      a: "A typical perimeter and interior baseboard treatment often takes about 30–60 minutes for an average home, plus a short safety briefing. Structural fumigation, heavy German roach programs, or rodent exclusion may take longer or require multiple visits.",
    },
    {
      q: "How often should I schedule pest control in Central Texas?",
      a: "Many Georgetown homeowners use quarterly perimeter service to stay ahead of ants, spiders, and seasonal pressure, with indoor visits as needed. High-moisture summers and new construction zones can warrant tighter intervals until the home’s exterior is fully sealed.",
    },
  ],
  "best-foundation-repair-georgetown-tx": [
    {
      q: "How much does foundation repair cost in Georgetown TX?",
      a: "Minor crack stitching or drainage-related corrections may stay in the low thousands, while piering, beam replacement, or widespread leveling in Georgetown clay soils can climb quickly based on lift height, access, and engineering requirements. Always insist on a written scope tied to measurements, not a drive-by estimate.",
    },
    {
      q: "How do I find a reliable foundation repair company in Georgetown TX?",
      a: "Prioritize engineers or contractors who document elevations, explain movement causes (moisture cycles, drainage, plumbing leaks), and separate cosmetic cracking from structural risk. Compare methods and warranties, and be skeptical of one-size-fits-all sales pitches without measurements.",
    },
    {
      q: "What should I look for when hiring a foundation repair company?",
      a: "Look for clear engineering letters when required, pier or shim specifications, warranty transfer terms, and post-repair maintenance guidance (watering, drainage, gutters). Strong companies coordinate plumbing tests when slab leaks are suspected instead of lifting first and asking questions later.",
    },
    {
      q: "How long does a foundation repair project take in Georgetown TX?",
      a: "Smaller stabilization jobs may take a few days; larger lifts with tunneling or extensive pier runs can take a week or more depending on weather, access, and utility conflicts. Your proposal should state working hours, dust control expectations, and inspection milestones.",
    },
    {
      q: "Does homeowners insurance cover foundation repair in Texas?",
      a: "Policies usually exclude gradual settlement and typical soil movement but may cover sudden, named perils—like plumbing leaks or fire—that directly damage the foundation, subject to your deductible and policy wording. Read your declarations and endorsements with your agent; do not assume coverage without a formal claim evaluation.",
    },
  ],
  "best-house-cleaning-services-georgetown-tx": [
    {
      q: "How much does house cleaning cost in Georgetown TX?",
      a: "Standard cleans for typical Georgetown homes often range from roughly $100–$200+ per visit depending on square footage, frequency, and team size. Deep cleans, move-in/move-out services, and post-construction detail work usually cost more because of hours, supplies, and baseboard or appliance focus.",
    },
    {
      q: "How do I find a reliable house cleaner in Georgetown TX?",
      a: "Hire bonded and insured teams with background checks, clear cancellation policies, and consistent review history. Ask whether the same crew is assigned, what products they use, and how they handle pets, alarms, and access so expectations match reality week to week.",
    },
    {
      q: "What should I look for when hiring a house cleaning service?",
      a: "Look for a checklist or scope document, pricing that states hourly versus flat-rate assumptions, and policies for breakage or damage. Good services clarify what is excluded (heavy clutter, biohazards, exterior windows) and how they secure keys or codes.",
    },
    {
      q: "How long does a standard house cleaning take in Georgetown TX?",
      a: "A recurring maintenance clean for a midsize home often takes two to four person-hours; first-time or deep cleans can take longer. Exact timing depends on tidiness, pets, flooring mix, and whether you add tasks like ovens, blinds, or inside refrigerators.",
    },
    {
      q: "What is included in a deep clean versus a standard cleaning?",
      a: "Standard cleaning usually covers routine dusting, vacuuming, mopping, kitchen and bath surfaces, and general tidying. Deep cleaning adds detail work—baseboards, interior appliances, light fixtures, grout touch-ups, and inside cabinets—on a preset checklist so both sides agree before booking.",
    },
  ],
};

export function getBestOfPageFaqs(slug: string): Faq[] {
  if (!(CORE_BEST_SLUGS as readonly string[]).includes(slug)) return [];
  return FAQs_BY_SLUG[slug as CoreBestSlug];
}
