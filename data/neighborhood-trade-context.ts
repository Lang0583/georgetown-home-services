/**
 * Extra neighborhood × trade body copy (2 paragraphs each) so each landing reaches ~300–400 words
 * when combined with intro, whyLocal, and commonIssues in `data/neighborhoods.ts`.
 */
import { getNeighborhoodTradeContextExtra } from "@/data/neighborhood-trade-context-extra";
import { getNeighborhoodTradeTopup } from "@/data/neighborhood-trade-context-topup";
import type { NeighborhoodServicePage } from "@/data/neighborhoods";
const NEIGHBORHOOD_TRADE_CONTEXT: Readonly<Record<string, readonly [string, string]>> = {
  // —— Sun City ——
  "sun-city:plumber": [
    "Sun City’s HOA landscape rules and retirement-friendly floor plans mean most plumbing runs sit under post-tension slabs with limited cleanout visibility along fairway-facing lots. When a kitchen island backs up during a guest week, the fix is rarely a single fixture—it is often a main-line restriction aggravated by simultaneous laundry, dishwasher, and shower use that the original 1990s layout never modeled for tournament weekends. Before approving jackhammer access, ask whether isolation testing can separate irrigation cross-connection from domestic lines; many Sun City homeowners pay for slab work when the real issue was a weeping hose bib or a failed PRV creeping pressure overnight.",
    "Hiring in an active-adult community also means respecting quiet-hour norms, golf-cart paths, and club-event traffic when scheduling trenchless or hydro-jetting trucks. Look for plumbers who document camera findings, explain warranty terms on repipes versus spot repairs, and carry Williamson County-appropriate licensing for water-heater swaps that must vent correctly through low-slope attic chases common on one-story ranches here.",
  ],
  "sun-city:hvac": [
    "Sun City homes are overwhelmingly single-story slabs with long roof lines and extended duct runs that punish undersized returns when pollen loads spike in April. The 55+ community’s guest-week pattern—extra showers, laundry, and cooking during tournaments—pushes latent removal harder than a typical two-person household, which is why “the AC is fine but the house feels sticky” complaints cluster here before compressor failures ever show up. HOA rules on condenser placement and fence-line screening can also restrict airflow more than owners realize until a tech measures static pressure across the living wing versus the guest suite.",
    "When comparing HVAC quotes in Sun City, insist on load-aware diagnostics rather than refrigerant top-offs alone. Technicians familiar with retirement-community homes know to check condensate safety switches tripping during humid visitor weeks, capacitor wear after back-to-back 100°F afternoons, and filter sizing that matches how often fairway-adjacent lots pull fine oak dust through low returns.",
  ],
  "sun-city:roofer": [
    "Sun City roofs age in a specific rhythm: relentless Central Texas UV on south-facing slopes, oak pollen packing valleys after skipped gutter maintenance, and wind uplift at hips along open fairways where there is little tree buffer. Many patio enclosures and solar-tube retrofits created new wall-to-roof transitions years after the original shingle pass—exactly where slow leaks start while field shingles still look acceptable from the driveway. In a 55+ community where ladder work is a real safety concern, professional ridge-level photos matter more than verbal assurances.",
    "HOA architectural review for roof color and material class can extend project timelines, so Sun City homeowners benefit from roofers who submit supplement documentation early when hail hits Williamson County. Compare repair-versus-replacement thresholds in writing, and ask how crews protect landscaping and irrigation heads along heavily maintained fairway perimeters during tear-off.",
  ],
  "sun-city:electrician": [
    "Original Sun City electrical trim-outs often assumed moderate appliance loads, but downsizing homeowners frequently add wall ovens, wine fridges, golf-cart trickle circuits, and patio kitchens without anyone revisiting feeder capacity. Split-bus panels and push-in heavy branch circuits from the 1990s build era are still common behind freshly painted garage interiors—exactly where dimming on microwave start or breaker trips during oven preheat plus AC compressor overlap first appear. Outdoor living expansions along fairway lots also mean more GFCIs exposed to sprinkler overspray seasons.",
    "Electricians who serve Sun City regularly map measured loads before swapping breakers to “make it fit.” Ask about permit paths for EV-ready outlets, generator interlocks that respect HOA generator placement rules, and AFCI nuisance trips tied to aging neutrals rather than blaming “old wiring” without testing.",
  ],
  "sun-city:landscaping": [
    "Sun City HOA standards reward consistent curb appeal for resale and club life, but thin Hill Country soil and irrigation overlap with slab perimeters make decorative beds expensive when mulch piles against weep screed on post-tension foundations. Fairway-facing lots get extra scrutiny for turf color and head alignment, while mature live oaks drop catkins that clog emitters every May—killing drip zones right before guest weeks when you need reliable irrigation most.",
    "Local crews who understand active-adult scheduling avoid blocking cart paths during morning tee times and know which turf cultivars survive HOA inspections without baking foundation vents closed. Request plans that grade runoff away from slab edges and keep pop-up spray off stucco low lines where water has wicked into drywall in neighboring Sun City streets.",
  ],
  "sun-city:pest-control": [
    "Sun City’s mix of irrigated fairways, mature oaks, and slab homes creates predictable pest pressure: fire ants along drip lines, occasional roof rats exploiting soffit gaps after wind events, and scorpion sightings where landscape rock meets slab cracks on west-facing lots. Retirement homeowners often notice activity first in guest baths and garage entries where clutter accumulates during extended visits rather than in primary suites used daily.",
    "Pest programs here work best when technicians coordinate with landscaping resets—trimming branches off roof lines and sealing weep gaps after irrigation audits. Ask about pet-safe interior treatments before tournament guest weeks and whether the company documents conducive conditions (wood-to-soil contact, standing water in catch basins) instead of only spraying perimeters.",
  ],
  "sun-city:foundation-repair": [
    "Post-tension slabs dominate Sun City, so differential movement often telegraphs as sticking interior doors and hairline drywall cracks long before exterior brick shows dramatic stair-steps. Irrigation overspray against slab perimeters and negative grade toward rear patios—common where fairway views drove landscape design—can concentrate moisture along one edge of a ranch footprint while the opposite side stays dry, producing twist that inexperienced crews misread as “normal Texas clay.”",
    "Foundation specialists serving Sun City should baseline elevations during stable weather, not during saturated weeks after heavy guest-party irrigation use. Compare pier counts, lifetime transferable warranties, and whether plumbing isolation tests precede any interior stem-wall cutting—slab leaks and soil movement get conflated often in this neighborhood.",
  ],
  "sun-city:house-cleaning": [
    "Sun City homes see burst cleaning demand when adult children visit for holidays or tournament weekends—guest suites, second kitchens, and lanai tracks that sat quiet suddenly need deep attention. Hard-water spotting on glass shower doors and fixture scale build faster here than owners remember from softer-water states, while fairway pollen films sills within days of a thorough dusting if windows stay cracked during pleasant spring mornings.",
    "Cleaning teams experienced with retirement communities respect quiet hours, minimize trip hazards from hoses across garage entries, and know which fragile trim finishes in older Sun City baths cannot tolerate harsh descalers. Recurring service often works better than heroic one-time deep cleans before every guest wave.",
  ],

  // —— Wolf Ranch ——
  "wolf-ranch:plumber": [
    "Wolf Ranch’s newer manifolds and PEX layouts behave differently from Sun City slab copper when three showers, a dishwasher, and a laundry pair run simultaneously on a Saturday morning. Builder-grade angle stops and hose bibs from the 2010s–2020s build waves are now entering the failure window—often showing up as pressure fluctuations mistaken for municipal supply problems. Open-plan kitchens with island sinks add long horizontal runs that make venting and drain gurgles more common than in compact older footprints.",
    "When a Wolf Ranch plumber recommends repiping, ask whether PRV creep, recirculation pump settings, or irrigation cross-talk were ruled out first. Newer subdivisions also mean tighter insurer expectations on documented repairs after water losses—photos and permit cards matter at resale even when the home still feels “new.”",
  ],
  "wolf-ranch:hvac": [
    "Wolf Ranch HVAC systems were sized for model-home occupancy, not families working from home with every bedroom occupied daily. Flex duct in hot attics, long runs to bonus rooms, and builder-spec filters that homeowners never change on schedule produce the classic pattern: thermostat satisfied while far bedrooms drift during July latent load. Equipment that is only seven to twelve years old can still behave like it is failing when static pressure and coil cleanliness were never benchmarked.",
    "Technicians who know newer Georgetown subdivisions measure subcool and superheat trends instead of defaulting to refrigerant adds. Ask about zoning options for open great rooms, condensate drain routing on second-story furnaces where present, and whether your maintenance contract includes coil cleaning before the first serious heat wave—not after the compressor locks rotor.",
  ],
  "wolf-ranch:roofer": [
    "Wolf Ranch roofs are exiting the “builder bundle” era: ridge vent continuity gaps, rear greenbelt wind channels, and hip metal that was acceptable at certificate of occupancy but marginal after a decade of Central Texas UV. Homeowners often assume hail damage is obvious from the street; in practice, lifted tabs and creased ridge caps hide along rear elevations facing open fields.",
    "Compare Wolf Ranch roofing quotes on inspection discipline—valley close-ups, pipe boot ages, and whether repairs use matching shingle classes approved for your build phase. Because many homes here are still within first resale windows, documented storm dates and supplement photos protect claim conversations with insurers tightening roof age rules.",
  ],
  "wolf-ranch:electrician": [
    "Wolf Ranch panels are newer than Sun City’s but frequently undersized for real life: double ovens, beverage fridges, home offices, and EV chargers stack on 200-amp services that passed inspection with minimal margin. Outdoor kitchens and landscape lighting added post-closing often land on circuits never intended for continuous load in summer heat.",
    "Electricians serving newer Williamson County builds should verify AFCI/GFCI compliance on expanded outdoor living, explain surge protection for electronics-dense great rooms, and pull permits when panel upgrades affect service entrance ratings—resale inspectors in Wolf Ranch increasingly flag unpermitted work.",
  ],
  "wolf-ranch:landscaping": [
    "Wolf Ranch lots were graded quickly during build-out, and many still show subtle negative pitch toward rear patios where sod established before final irrigation tuning. Builder landscapes with young trees are maturing into shade patterns that change Bermuda sun exposure year over year, while HOA requirements keep front yards presentation-ready even when side yards bake.",
    "Crews who work newer Georgetown subdivisions adjust emitter schedules as clay dries and cracks in late summer, keep mulch off weep screed on slab-on-grade plans, and coordinate hardscape installs with drainage that does not dump toward neighbor fences along greenbelt lines.",
  ],
  "wolf-ranch:pest-control": [
    "Wolf Ranch’s still-maturing tree canopy and construction-disturbed soil produce ant mounds along new sod seams and occasional rodent activity where greenbelt interfaces meet fence lines. Newer homes have tighter envelopes, but garage-to-interior gaps and weep-hole screens left open after build often admit the first scorpion or wasp nest before landscaping fills in.",
    "Preventive pest plans here should include slab perimeter treatments timed before summer, attic checks for roofline entry after wind events, and documentation for HOA violations when wood-to-soil contact appears on DIY planter boxes added after move-in.",
  ],
  "wolf-ranch:foundation-repair": [
    "Wolf Ranch soils still settle on young lots, and homeowners sometimes confuse normal cosmetic drywall shrinkage with structural movement in the first five years. The risk rises when irrigation keeps one side of the slab wet while the other dries in full sun—common on west-facing rear patios with outdoor kitchens.",
    "Before accepting pier quotes, compare elevation surveys taken in dry and wet weeks, review whether plumbing leaks were excluded, and ask how warranty transfer works for buyers still within builder warranty windows who need independent documentation.",
  ],
  "wolf-ranch:house-cleaning": [
    "Wolf Ranch interiors feature more open shelving, matte finishes, and light-toned LVP that shows pet hair and construction dust for years after move-in if HVAC filters were neglected during build. High ceilings and tall foyer windows demand equipment many generic maid services do not carry.",
    "Cleaning crews familiar with newer Georgetown homes use pH-appropriate products on quartz and engineered stone common in Wolf Ranch kitchens, and they schedule around delivery traffic on narrow subdivision streets during school hours.",
  ],

  // —— Teravista ——
  "teravista:plumber": [
    "Teravista’s mix of early-2000s streets and newer legs means two homes on the same cul-de-sac can have entirely different drain layouts, cleanout access, and water-heater placements. Golf-course adjacency adds irrigation complexity: mist and overnight watering raise humidity that does not cause plumbing failures directly but masks slow leaks until a water bill spikes. Hard water still drives scale across vintages, so cartridge and heater life questions show up in both older and newer manifolds.",
    "Teravista plumbers worth hiring write camera findings before recommending main-line replacements, especially where mature landscape hides cleanouts installed decades ago. If pressure drops only on hot taps, suspect recirc lines or heater sediment before assuming street supply issues.",
  ],
  "teravista:hvac": [
    "Teravista microclimates change block by block: fairway lots pull humid air across pools and irrigation while interior streets behave drier but dustier. Vaulted entries and long duct runs produce rooms that lag during July even when equipment is mid-life, and golf-community pollen loads foul coils faster than owners expect from curb appeal alone.",
    "HVAC comparisons in Teravista should include return sizing for high-MERV upgrades, condensate path checks in attics that were reworked during remodels, and honest backlog expectations after regional heat waves—this neighborhood books reputable shops quickly once the first 100°F week hits.",
  ],
  "teravista:roofer": [
    "Teravista roof ages vary door-to-door after years of localized hail and wind, while tree litter from greenbelts packs valleys on north slopes. Second-story additions and dormers from the 2010s remodel wave created flashing transitions that fail before field shingles show their age.",
    "Roofers serving Teravista should document hail dates, photograph hip and valley metal closely, and separate gutter overflow stains from true deck leaks—especially on homes where fairway irrigation overspray keeps algae active on shaded slopes.",
  ],
  "teravista:electrician": [
    "Teravista homes span split-bus eras and modern 200-amp panels, so electrical symptoms that look identical can have different root causes on the same street. Outdoor living and pool equipment on golf-adjacent lots add load that interior-only electricians underestimate.",
    "Ask Teravista electricians about surge protection for home offices, generator interlocks where overhead service feeds long driveways, and permit discipline on panel upgrades that affect resale in a neighborhood with strong equity expectations.",
  ],
  "teravista:landscaping": [
    "Teravista landscaping must balance golf-course sight lines, HOA turf standards, and trees that have grown from saplings into shade engines rewriting sun exposure. Irrigation zones designed for new sod often need reprogramming once roots matured and beds expanded into former lawn.",
    "Local crews adjust for fairway overspray drifting onto fence-line plantings, aerate compacted approaches to driveways where golf carts and family traffic overlap, and keep debris cleared from storm drains before spring outbreaks.",
  ],
  "teravista:pest-control": [
    "Teravista’s water features and greenbelts support mosquitoes, ants along irrigated beds, and occasional wildlife interface at rear fences. Older homes with mature soffits may have rodent paths newer builds lack, while newer homes see scorpions until landscape rock settles.",
    "Integrated pest plans should coordinate with tree trimming near roofs and address standing water in catch basins after storms—fairway drainage can push debris into neighborhood inlets overnight.",
  ],
  "teravista:foundation-repair": [
    "Teravista’s clay and mixed fill profiles produce door-stick seasons that correlate with irrigation habits more than dramatic foundation headlines. Homes near greenbelt drainage sometimes see one corner soften when downspouts terminate too close to slab edges after landscape remodels.",
    "Compare foundation proposals on elevation maps, plumbing leak exclusions, and whether interior pier plans account for post-tension versus conventional slabs found in different Teravista build phases.",
  ],
  "teravista:house-cleaning": [
    "Teravista homes mix travertine, carpeted media rooms, and second-story lofts that trap dust when returns sit only on the first floor. Golf-community pollen seasons leave fine films on black hardware and balcony rails within days of cleaning.",
    "Experienced cleaners route around tee-time traffic on adjacent streets, use HEPA vacuums on allergy-sensitive households, and know which fairway-facing screens cannot tolerate pressure washing overspray.",
  ],

  // —— Berry Creek ——
  "berry-creek:plumber": [
    "Berry Creek’s mature canopy and older laterals mean root intrusion and slow-building backups appear on camera lines more often than in Wolf Ranch manifolds. Cleanouts buried under decades of landscape evolution slow emergency response when a main line fails during a storm week with organic debris in storm drains.",
    "Plumbers serving Berry Creek should prioritize access restoration before quoting full replacements, and they should test whether gutter overflow saturating foundation edges is masquerading as slab leaks on older brick-and-slab combinations common here.",
  ],
  "berry-creek:hvac": [
    "Shade from Berry Creek’s canopy helps some rooms while starving condensers of airflow where shrubs grew unchecked for fifteen years. Attic flex sags after years of heat cycling, and high-MERV filters without return upgrades produce freeze-ups that technicians misdiagnose as refrigerant loss.",
    "HVAC maintenance in tree-heavy neighborhoods must include coil cleaning before pollen season and verification that condensate drains stay clear when humidity spikes after thunderstorm weeks.",
  ],
  "berry-creek:roofer": [
    "Berry Creek roofs collect moss on north faces, valley dams after skipped gutter maintenance, and localized wind damage hidden under oak limbs. Granule loss accelerates where branches scrape low slopes during storms, and older ridge vent systems may be incompatible with modern shingle classes.",
    "Roofers should walk ridge lines, not just street-facing elevations, and explain how tree trimming partners with roofing maintenance to extend shingle life in this canopy-forward neighborhood.",
  ],
  "berry-creek:electrician": [
    "Berry Creek’s older homes mix updated kitchens with legacy panels, buried underground feeds damaged by root growth, and outdoor circuits added for deck lighting without modern GFCI protection. Storm weeks expose surge damage on aging equipment grounding.",
    "Electricians familiar with mature Georgetown neighborhoods test neutrals on circuits serving outbuildings and pool equipment where previous owners DIY’d expansions.",
  ],
  "berry-creek:landscaping": [
    "Berry Creek landscaping is tree management as much as aesthetics: root plates lift walks, shade rewrites turf species, and storm debris buries drip emitters every October. Soil organic matter is higher than on new subdivisions, which changes irrigation timing but not HOA expectations for front presentation.",
    "Crews should stage pruning before roof and gutter seasons, aerate compacted root zones, and avoid piling mulch against wood siding common on older Berry Creek elevations.",
  ],
  "berry-creek:pest-control": [
    "Dense canopy in Berry Creek supports squirrels in soffits, raccoons in chimneys, and insect swarms after rotting limb piles sit too long. Older crawl and pier configurations—where present—add entry points newer slab neighborhoods rarely see.",
    "Pest programs need roofline exclusion paired with interior monitoring, especially after wind events drop limbs on roof valleys that open flashing gaps.",
  ],
  "berry-creek:foundation-repair": [
    "Berry Creek foundations interact with tree roots and decades of gutter neglect: moisture wedges along one side of a footprint while roots desiccate soil on another. Stair-step brick cracks near mature oaks should trigger elevation studies, not cosmetic tuckpointing alone.",
    "Compare pier designs on whether tree removal or root barriers are part of the long-term moisture strategy—not every Berry Creek lot needs identical pier counts.",
  ],
  "berry-creek:house-cleaning": [
    "Berry Creek interiors track pollen, leaf dust, and fireplace ash seasons more aggressively than open subdivisions. Older wood windows with fragile putty lines and mixed flooring transitions demand slower, detail-oriented crews.",
    "Cleaning schedules often align with gutter and roof maintenance so fresh debris does not reset the house the week after a deep clean.",
  ],

  // —— Georgetown Village ——
  "georgetown-village:plumber": [
    "Georgetown Village’s proximity to downtown events means plumbing surges when every bath and kitchen runs during festival weekends or when short-term guests fill alley-access rentals. Older shared-wall configurations and mixed-era laterals complicate access when a backup affects more than one unit’s cleanout path.",
    "Village plumbers should coordinate quiet hours with neighbors, document shutoff locations in tight lots, and test whether city drainage projects shifted stormwater toward older footers after downtown regrades.",
  ],
  "georgetown-village:hvac": [
    "Village homes near walkable Georgetown absorb urban dust, event-week noise-adjacent door traffic, and humidity from alley HVAC condensate that does not drain as cleanly as on wide suburban lots. Mixed-decade equipment in the same hallway can mean one side of a duplex needs replacement while a neighbor’s unit is mid-life.",
    "HVAC service calls should account for parking constraints on event Saturdays and filter changes that must happen more often when windows stay open during pleasant Square nights.",
  ],
  "georgetown-village:roofer": [
    "Georgetown Village roofs cope with urban heat island effects, mature street trees, and wind funneled along alleys differently than fairway subdivisions. Historic-influenced rooflines may mix materials across additions built before modern wind codes.",
    "Roofers need ladder plans that respect alley parking and neighbor privacy, plus documentation for insurers who scrutinize roof age on homes walking distance to downtown.",
  ],
  "georgetown-village:electrician": [
    "Village electrical upgrades compete with tight lot lines and shared easements: panel swaps may need utility coordination when alleys host multiple meters. Event lighting and short-term rental turnover increase wear on GFCI circuits serving rear patios.",
    "Electricians should verify grounding on older services where downtown-adjacent moisture corrodes meter bases faster than inland Wolf Ranch builds.",
  ],
  "georgetown-village:landscaping": [
    "Georgetown Village yards prioritize discrete maintenance over sprawling irrigation: tight side yards, alley access, and event-week parking limit equipment size. Downtown pollen and foot traffic deposit grit on stoops that fairway homes rarely see.",
    "Landscapers familiar with Village constraints schedule early finishes before street closures, use quiet blowers, and grade positively toward alleys where city drainage improvements changed flow patterns.",
  ],
  "georgetown-village:pest-control": [
    "Urban-adjacent Village homes see roaches and ants drawn to alley dumpsters after downtown events, plus rodents exploiting old brick weeps and crawl entries on pre-war influenced structures. Short-term rental turnover spreads infestations block-to-block if treatments are reactive only.",
    "Pest plans should include stoop and alley perimeter focus, sealed entry points on shared walls, and coordination with neighbors when row-style lots share conducive conditions.",
  ],
  "georgetown-village:foundation-repair": [
    "Georgetown Village foundations respond to downtown drainage shifts, shared footers on adjoined units, and vibration from festival infrastructure that accelerates minor differential on already fatigued stoops. Door stickiness after city alley repaving should trigger level checks, not just hinge adjustments.",
    "Specialists should baseline during quiet weeks, compare to pre-event measurements when possible, and separate plumbing under-slab leaks from hydrology changes after municipal projects.",
  ],
  "georgetown-village:house-cleaning": [
    "Village cleaning routines must handle festival dust on sills, historic trim that rejects harsh chemistry, and alley parking that limits truck access during Red Poppy weekends. Mixed finishes in the same hallway—polished concrete beside original wood—need product discipline.",
    "Local maid teams route around downtown closures, finish before block parties, and protect fragile hardware common on homes walking distance to the Square.",
  ],
};

function genericClosingParagraph(
  neighborhoodName: string,
  serviceCategory: string,
): string {
  return `Use this ${neighborhoodName} ${serviceCategory} guide to prepare questions before you call—written scopes beat phone estimates when Georgetown contractor queues lengthen after heat waves or hail outbreaks. Compare our Georgetown cost guide and full best-of directory for citywide pricing context, then shortlist pros who document findings with photos you can keep for insurance, HOA, or resale files. Neighbors who align on scope language before inviting bids tend to spot padded line items faster than those rushing the first available appointment slot.`;
}

export function getNeighborhoodTradeContext(
  neighborhoodSlug: string,
  serviceSlug: string,
  page?: Pick<NeighborhoodServicePage, "intro" | "whyLocal" | "commonIssues" | "neighborhoodName" | "serviceCategory">,
): string[] {
  const entry = NEIGHBORHOOD_TRADE_CONTEXT[`${neighborhoodSlug}:${serviceSlug}`];
  let paragraphs = entry ? [...entry] : [];
  paragraphs = [...paragraphs, ...getNeighborhoodTradeContextExtra(neighborhoodSlug, serviceSlug)];

  if (page) {
    const topup = getNeighborhoodTradeTopup(neighborhoodSlug, serviceSlug);
    if (topup) paragraphs = [...paragraphs, topup];

    let wc = neighborhoodTradeWordCount({
      intro: page.intro,
      whyLocal: page.whyLocal,
      commonIssues: page.commonIssues,
      contextParagraphs: paragraphs,
    });

    while (wc < 300 && page.neighborhoodName && page.serviceCategory) {
      paragraphs = [...paragraphs, genericClosingParagraph(page.neighborhoodName, page.serviceCategory)];
      wc = neighborhoodTradeWordCount({
        intro: page.intro,
        whyLocal: page.whyLocal,
        commonIssues: page.commonIssues,
        contextParagraphs: paragraphs,
      });
      if (paragraphs.length > 12) break;
    }
  }

  return paragraphs;
}

export function neighborhoodTradeWordCount(parts: {
  intro: string;
  whyLocal: string;
  commonIssues: string[];
  contextParagraphs: string[];
}): number {
  return [parts.intro, parts.whyLocal, ...parts.commonIssues, ...parts.contextParagraphs]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}
