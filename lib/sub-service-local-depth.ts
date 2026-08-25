/**
 * Extra Georgetown-local depth paragraphs for thin sub-service pages.
 * Keyed by `${serviceSlug}/${slug}` — appended after CMS body paragraphs.
 */
const LOCAL_DEPTH: Record<string, string[]> = {
  "plumbing/drain-cleaning": [
    "In Georgetown’s older in-town stock and many slab-on-grade subdivisions, slow drains often start as grease and soap film, then worsen when live-oak roots find clay joints in lateral lines. Camera inspections matter when a cleaning clears briefly and the backup returns within days—especially after heavy May–June rain that raises sewer levels.",
    "Ask for a written scope that separates a basic cable cleanout from hydro-jetting, root cutting, and any camera report you keep for insurance or a future remodel. Emergency night rates and after-hours trip fees are common during holiday weekends when guest bathrooms see sudden load.",
  ],
  "plumbing/water-heater-installation": [
    "Hard Edwards Aquifer water shortens tank life across Sun City, Teravista, and Wolf Ranch when anode rods and sediment are ignored. Tankless installs need correct gas line sizing and condensate handling; many Georgetown permits also expect expansion tanks on closed municipal systems.",
    "Compare like-for-like: gallon capacity or GPM, warranty years, haul-away of the old unit, and whether the quote includes code-required drip pans and seismic/strapping details—not just the equipment SKU.",
  ],
  "hvac/ac-repair": [
    "Triple-digit stretches put compressors and capacitors under continuous load. A repair that ignores dirty coils, low airflow from clogged filters, or an undersized return often returns as another no-cool call within a week. Document refrigerant type (R-410A vs older) before authorizing major component swaps.",
    "Get line-item prices for diagnostic fee, parts, labor, and whether the tech recovers refrigerant per EPA rules. Same-day emergency premiums spike when Round Rock and Georgetown both hit peak heat.",
  ],
  "hvac/ac-installation": [
    "Spring tune-ups before pollen peaks and fall checks before cold snaps are the Georgetown rhythm that prevents mid-July emergency boardings. Ask what the tech measures—static pressure, superheat/subcool, and amp draw—not just “cleaned and checked.”",
    "Filter changes every one to three months during cooling season matter more here than in milder climates; homes near construction corridors (new Wolf Ranch phases) see dust loads rise fast. New installs should document Manual J sizing assumptions for Sun City single-story loads vs two-story Teravista envelopes.",
  ],
  "roofing/roof-inspection": [
    "Williamson County hail seasons turn ground-level “looks fine” into adjuster-ready photo sets. A useful inspection notes slope, shingle age, flashing at chimneys and skylights, and soft decking—not a verbal “you need a new roof” with no photos.",
    "Schedule inspections after storms once lightning risk drops, and keep each contractor’s gallery separate so insurance packets stay coherent. Coordinate HVAC condenser coil photos if hail also dented outdoor units.",
  ],
  "roofing/roof-repair": [
    "Isolated leak repairs after oak debris or nail pops differ from full replacements driven by widespread hail bruising. Written scopes should list squares of shingles, underlayment type, and whether ridge vents or pipe boots are included.",
    "Two-story Teravista and Wolf Ranch homes often need fall-protection time in the bid; cheap cash offers that skip permits or dumpster fees usually shift cost onto you mid-job.",
  ],
  "electrical/panel-upgrade": [
    "EV chargers, heat pumps, and workshop loads push 100–150A panels past comfort in renovated Georgetown homes. TDLR-licensed contractors should explain AFCI/GFCI requirements and whether the utility needs a service upgrade appointment.",
    "Get a load calculation summary with the quote. Panel swaps that ignore aluminum branch circuits or shared neutrals in older houses create callbacks—ask how those conditions will be handled before walls open.",
  ],
  "pest-control/termite-treatment": [
    "Subterranean termite pressure is real around Georgetown’s clay soils and slab edges. A useful inspection maps conducive conditions (wood-to-soil contact, irrigation overspray) and distinguishes monitoring stations from full treatments.",
    "Confirm the company’s TPCL number and whether the proposal is a one-time treatment, baiting system, or renewable warranty—and what voids coverage after landscaping or addition work.",
  ],
};

export function localDepthParagraphs(serviceSlug: string, slug: string): string[] {
  return LOCAL_DEPTH[`${serviceSlug}/${slug}`] ?? [];
}
