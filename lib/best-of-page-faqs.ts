import { CORE_BEST_SLUGS } from "./pageContentRegistry";
import type { Faq } from "./site-content";

type CoreBestSlug = (typeof CORE_BEST_SLUGS)[number];

/** Shared Q2 — matches hiring guidance used across service guides; TDLR + TSBPE where applicable. */
const FIND_RELIABLE_A =
  "Check Google reviews for providers with 4.5+ stars and 50+ reviews. Verify state credentials where they apply (TDLR for electrical and HVAC contractors, TSBPE for licensed plumbers), confirm insurance, and ask how permits will be handled for your job. Get at least two written quotes before committing.";

/**
 * Exactly four FAQs per `/best/[slug]` core guide. Single source: visible accordion and FAQPage JSON-LD must match.
 */
const FAQs_BY_SLUG: Record<CoreBestSlug, Faq[]> = {
  "best-plumbers-georgetown-tx": [
    {
      q: "How much does plumbing cost in Georgetown TX?",
      a: "Most routine plumbing repairs in Georgetown run about $150–$400 for a standard visit, in line with typical emergency call bands of $150–$500+ once trip and after-hours fees apply. Water-heater work and tougher repairs often land higher; slab leaks and main-line jobs commonly reach $500–$2,000+ depending on access, materials, and how much finish work must be opened.",
    },
    {
      q: "How do I find a reliable plumber in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring a plumber in Georgetown TX?",
      a: "Ask whether they have slab leak detection experience on Williamson County slab homes, how camera inspections are priced, and what warranty applies to parts versus labor. Confirm who pulls permits for water heaters or sewer replacements, how they isolate irrigation from domestic lines in older Sun City–style yards, and what the estimate includes if concrete or flooring must be restored.",
    },
    {
      q: "How long does a typical drain cleaning or plumbing service call take in Georgetown TX?",
      a: "A straightforward single-line clear or fixture repair is often done in about one to three hours on site. Camera work, leak tracing under a slab, or jobs that need a return visit after parts are ordered can stretch across a full day or a second appointment—especially during peak summer or holiday weeks when crews are booked tight.",
    },
  ],
  "top-hvac-companies-georgetown-tx": [
    {
      q: "How much does HVAC service cost in Georgetown TX?",
      a: "Many AC repairs fall in a few hundred to low-thousands range once you account for diagnosis, refrigerant-related work, or motor and coil repairs—exactly which band you’re in depends on parts and accessibility. Full system replacements in Georgetown commonly align with the $5,000–$14,000+ range from our replacement cost guide for mid-efficiency split systems, before major duct or electrical upgrades.",
    },
    {
      q: "How do I find a reliable HVAC company in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring an HVAC contractor in Georgetown TX?",
      a: "Ask what measurements they took (static pressure, delta-T, subcool/superheat when relevant) and whether the quote lists equipment model numbers and efficiency ratings. Confirm thermostat compatibility, warranty on labor versus manufacturer coverage, and how they handle hard-start conditions in July-August heat. If humidity is an issue, ask about coil, drain line, and airflow plans—not only refrigerant charge.",
    },
    {
      q: "How long does an AC repair visit usually take in Georgetown TX?",
      a: "Simple fixes—capacitors, contactors, condensate drains, or swapping a common part—often finish in one to three hours. Coil issues, refrigerant leaks that need leak search and repair, or ordering OEM parts can turn into a half-day visit or require a follow-up once the part arrives, which is common in peak season.",
    },
  ],
  "best-roofers-georgetown-tx": [
    {
      q: "How much does roofing cost in Georgetown TX?",
      a: "Typical shingle repairs often fall around $300–$1,500 depending on pitch, access, and how much flashing or decking is involved—the same band we cite in our repair cost guide. Full replacements for many Georgetown homes often track into the $9,000–$20,000+ range from our replacement guide, driven by square footage, material, decking condition, and ventilation or code updates.",
    },
    {
      q: "How do I find a reliable roofer in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring a roofer in Georgetown TX?",
      a: "Ask which shingle or flat-roof manufacturer systems they install most, whether they hold preferred or certified installer status, and how they document hail or wind damage for insurance. Confirm who pulls the permit, how tear-off and decking replacements are priced if rotten wood is found, and whether the crew has supplement experience when adjuster scopes are tight after Williamson County storms.",
    },
    {
      q: "How long does a roof replacement take in Georgetown TX?",
      a: "Many residential re-roofs take one to three days once weather holds and materials are on site. Steeper pitches, complex valleys, full decking replacement, or rain delays in spring can add time—a good contractor should give a realistic range and explain what pushes the schedule.",
    },
  ],
  "best-electricians-georgetown-tx": [
    {
      q: "How much does electrical work cost in Georgetown TX?",
      a: "Trip or diagnostic fees plus small-device swaps or short troubleshooting visits often land in the low-to-mid hundreds. Panel upgrades, whole-home rewiring segments, or new 240V runs for EV chargers typically scale into the low- to mid-thousands and beyond, depending on panel capacity, conduit paths, drywall repair scope, and whether the utility requires a service upgrade.",
    },
    {
      q: "How do I find a reliable electrician in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring an electrician in Georgetown TX?",
      a: "Ask for license verification (TDLR), proof of insurance, and whether your job requires a permit and inspection. For panel work, ask if the bid covers breakers, grounding updates, AFCI/GFCI code requirements, and labeling. For EV or kitchen additions, ask about load calculations and whether the utility needs advance notice before energizing new equipment.",
    },
    {
      q: "How long does a typical electrical service call take in Georgetown TX?",
      a: "Straightforward device replacements or single-circuit troubleshooting often takes one to three hours. Panel swaps or multi-circuit projects commonly take most of a day or span two visits when inspections, utility coordination, or sheetrock patching is sequenced separately.",
    },
  ],
  "best-landscaping-companies-georgetown-tx": [
    {
      q: "How much does landscaping cost in Georgetown TX?",
      a: "Routine lawn and bed maintenance often starts in the low hundreds per visit for typical Williamson County lots, with monthly packages varying by crew size and scope. Installs that add irrigation tweaks, significant planting, mulch at depth, or small hardscape can jump into the low thousands and beyond depending on materials, slope, and how much soil amendment Central Texas clay needs.",
    },
    {
      q: "How do I find a reliable landscaping company in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring a landscaping company in Georgetown TX?",
      a: "Ask for plant sizes or counts, mulch depth, soil amendment type, and whether drip or spray zones will be adjusted. Request drainage intent for downspouts and low spots, how they’ll protect existing tree roots on established streets like Berry Creek, and what happens if plants fail under warranty. Clarify HOA timing rules in master-planned sections before work starts.",
    },
    {
      q: "How long does a typical landscaping project take in Georgetown TX?",
      a: "A seasonal refresh or small planting job may finish in a day. Larger plans with grading, beds, trees, or patio tie-ins can run several days to a few weeks depending on crew availability, material lead times, and rain delays during spring storm weeks.",
    },
  ],
  "best-pest-control-georgetown-tx": [
    {
      q: "How much does pest control cost in Georgetown TX?",
      a: "Initial visits and targeted treatments for common perimeter pests often land in the low-to-mid hundreds, while quarterly perimeter programs are usually sold as an annual or per-visit plan. Heavy German roach cleanouts, attic rodent work, or termite monitoring add scope after inspection—expect a written program price rather than a phone guess.",
    },
    {
      q: "How do I find a reliable pest control company in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring a pest control company in Georgetown TX?",
      a: "Ask which pests they identified before quoting, which products fit the label for your structure, and how re-treats are handled if activity returns. Request clarity on pet and kid re-entry times, whether they seal entry routes versus only spraying, and how they document exterior grading or moisture issues that invite ants and millipedes after Georgetown rains.",
    },
    {
      q: "How long does a standard pest control treatment take in Georgetown TX?",
      a: "A typical perimeter and targeted interior baseboard service for an average home often takes about 30–60 minutes including walkthrough notes. Larger German roach programs, attic rodent trapping, or crawlspace work can take longer or require scheduled return visits.",
    },
  ],
  "best-foundation-repair-georgetown-tx": [
    {
      q: "How much does foundation repair cost in Georgetown TX?",
      a: "Minor crack repairs or drainage-first corrections might stay in the low thousands when scope is tight and engineering is straightforward. Widespread piering, beam work, or major leveling on expansive clay in Georgetown and Teravista-style lots can escalate quickly based on lift plan, access tunnels, plumbing tests, and engineering letters—always insist on measurements tied to the quote, not a flat phone price.",
    },
    {
      q: "How do I find a reliable foundation repair company in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring a foundation repair company in Georgetown TX?",
      a: "Ask for elevation documentation, whether a third-party engineer is involved when required, and how they separate cosmetic cracking from structural movement. Confirm pier or shim specs, warranty transfer rules, post-repair watering guidance for clay soil, and whether plumbing leak tests are recommended before lifts. Request photos and a written maintenance plan for gutters and drainage.",
    },
    {
      q: "How long does a foundation repair project take in Georgetown TX?",
      a: "Smaller stabilization jobs may take a few days of crew time. Larger installs with tunneling, many piers, or weather delays in wet weeks can stretch past a week—your proposal should spell out phases, dust control, and inspection milestones.",
    },
  ],
  "best-house-cleaning-services-georgetown-tx": [
    {
      q: "How much does house cleaning cost in Georgetown TX?",
      a: "Recurring cleans for typical Georgetown homes often run roughly $100–$200+ per visit depending on square footage, bathrooms, and team size, with first-time or deep cleans higher because of hours and detail work. Move-out and post-renovation cleans scale with condition—heavy oven, blind, and baseboard focus adds labor every time.",
    },
    {
      q: "How do I find a reliable house cleaner in Georgetown TX?",
      a: FIND_RELIABLE_A,
    },
    {
      q: "What should I ask before hiring a house cleaning service in Georgetown TX?",
      a: "Ask for a checklist that separates standard versus deep tasks, whether supplies and equipment are included, and how they handle alarms, pets, and lockboxes in central neighborhoods like Georgetown Village. Confirm hourly versus flat-rate assumptions, cancellation windows, breakage policies, and whether the same crew is assigned for recurring service.",
    },
    {
      q: "How long does a standard house cleaning take in Georgetown TX?",
      a: "Maintenance cleans for a midsize home often take about two to four person-hours; first visits or deep cleans with appliance interiors and neglected baseboards can run much longer. Timing shifts with kids, pets, and cluttered surfaces—even a reliable crew slows down when pick-up isn’t done first.",
    },
  ],
};

export function getBestOfPageFaqs(slug: string): Faq[] {
  if (!(CORE_BEST_SLUGS as readonly string[]).includes(slug)) return [];
  return FAQs_BY_SLUG[slug as CoreBestSlug];
}
