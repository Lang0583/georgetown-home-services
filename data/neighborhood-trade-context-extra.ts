/**
 * Third body paragraph per neighborhood × trade (merged in `getNeighborhoodTradeContext`).
 */
const NEIGHBORHOOD_TRADE_CONTEXT_EXTRA: Readonly<Record<string, string>> = {
  "sun-city:plumber":
    "Before you sign a Sun City plumbing scope, compare at least two written estimates that list pipe material, access method, and who patches concrete after slab work. Ask whether the company carries workers’ comp and general liability certificates naming your HOA if required, and confirm they will pull a permit when Georgetown or Williamson County rules apply to water-heater replacements. Sun City neighbors who document meter tests and photos before and after repairs have smoother conversations with insurers if a supply line failure ever wets drywall along fairway-facing walls.",
  "sun-city:hvac":
    "A fair Sun City HVAC quote includes delivered capacity notes, filter size, and whether the condensate line was cleared—not just a one-line “system OK.” If a contractor recommends full replacement, ask for load calculations or clear evidence of compressor failure rather than age alone. Many 55+ homeowners here prefer morning appointments before afternoon tee traffic peaks; reputable shops will schedule around club events when you request it.",
  "sun-city:roofer":
    "Sun City roof decisions should include attic photos showing deck condition, not only shingle surface shots from the driveway. If hail hit Williamson County, document the date and compare repair unit costs against your deductible before signing. Because ladder safety is a real concern in this community, favor companies that include ridge-level inspection in the base fee rather than treating it as an upsell.",
  "sun-city:electrician":
    "Panel upgrades in Sun City often require coordinating with the utility on overhead service clearances along golf-cart routes and pedestrian paths. Get permit numbers in writing for work that touches the service entrance, and ask how the electrician labels new circuits so future techs understand guest-suite additions. If you are adding EV charging, confirm whether your HOA requires concealed conduit along alley-facing walls.",
  "sun-city:landscaping":
    "Request a written irrigation audit before accepting a blanket “full yard” replant in Sun City—fairway lots often need zone separation between turf and bed drip. HOA violation callbacks are expensive; ask whether the company will return for free adjustments within thirty days of installation. Compare mulching plans that keep six inches of clearance at weep screed on slab perimeters.",
  "sun-city:pest-control":
    "Sun City pest contracts should spell out interior treatment frequency, products used near pet areas, and whether attic dusting is included for roofline entry after windstorms. If you see rodents, insist on exclusion quotes alongside trapping—traps alone rarely solve soffit gaps on mature homes. Neighbors comparing notes on fairway blocks often spot seasonal patterns faster than any single visit reveals.",
  "sun-city:foundation-repair":
    "Get elevation readings in writing with date stamps before and after any Sun City pier install. Ask whether plumbing hydrostatic tests are included when cracks appear near wet walls, and compare warranty transfer terms if you may sell within five years. Avoid companies that pressure same-day contracts during guest weeks when you cannot calmly review engineering notes.",
  "sun-city:house-cleaning":
    "Sun City cleaning quotes should list team size, products safe for hard-water glass, and whether inside oven and refrigerator are included in a deep clean. If you host often, recurring service every two weeks usually beats monthly deep cleans before each visit. Confirm the company is insured for slip claims on wet lanai tile common after pool use.",

  "wolf-ranch:plumber":
    "Wolf Ranch plumbing estimates should state whether PEX sections will match existing manifold brands and if drywall access is included in the price. Builder-era homes here often have cleanouts in garage walls behind storage—ask if locating access is part of the diagnostic fee. Compare companies that offer after-hours emergency rates in writing before a holiday weekend backup.",
  "wolf-ranch:hvac":
    "Wolf Ranch HVAC replacements should include thermostat compatibility with your phone app plans and whether old flex will be replaced in hot attic sections. Ask for SEER2 documentation suitable for federal credit questions if applicable. If one room drifts, request static pressure readings—not just a refrigerant charge—to avoid paying twice.",
  "wolf-ranch:roofer":
    "Wolf Ranch roofing proposals should list shingle class, underlayment type, and whether drip edge replacement is included—builder installs sometimes skipped extras that matter at year twelve. Compare hail supplement experience if storms recently tracked north of Austin. Document before photos for resale; buyers here increasingly ask for roof age proof.",
  "wolf-ranch:electrician":
    "Wolf Ranch electrical bids should clarify panel brand, surge protection, and permit fees for EV circuits on exterior walls facing greenbelts. If your home is under ten years old, verify whether builder warranty still covers any defects before paying out of pocket. Ask for labeled circuits on the new panel schedule.",
  "wolf-ranch:landscaping":
    "Wolf Ranch landscape installs should include drainage notes for rear patios that slope toward neighbor fences. Compare sod versus seed timelines against HOA deadlines for bare soil coverage. Ask whether irrigation controllers are Wi-Fi models you can adjust from travel when summer heat spikes.",
  "wolf-ranch:pest-control":
    "Wolf Ranch pest plans should address greenbelt interfaces where ants and rodents cross fence lines. New homes still have weep holes that need screening—confirm whether exclusion is quoted or only spraying. Seasonal fire ant treatments along driveway seams prevent mounds before summer pool use.",
  "wolf-ranch:foundation-repair":
    "Wolf Ranch foundation quotes should explain how pier depth accounts for younger clay profiles versus mature Berry Creek soils. If cracks appeared after irrigation changes, ask for moisture management advice alongside mechanical lifts. Compare transferable warranties for buyers still in their first resale window.",
  "wolf-ranch:house-cleaning":
    "Wolf Ranch maid service estimates should note tall foyer ladder work and whether baseboards on open staircases are included. New construction dust lingers in returns—ask if vent wiping is available. Confirm parking rules on narrow streets during school pickup hours.",

  "teravista:plumber":
    "Teravista plumbing comparisons should require camera footage you can keep, especially where mature landscape hides cleanouts. Ask whether hydro-jetting includes access restoration if a buried box must be exposed. Golf-course irrigation cross-talk is common—insist on isolation tests before slab recommendations.",
  "teravista:hvac":
    "Teravista HVAC quotes should address fairway humidity loads and whether returns can be added without major drywall work. Compare maintenance plans that include coil cleaning before April pollen. If your home has vaulted areas, ask how the company balances airflow without oversized equipment.",
  "teravista:roofer":
    "Teravista roofing estimates should include valley and chimney close-ups on golf-adjacent elevations where wind channels. Ask how debris is kept off fairway fences during tear-off. Hail date documentation helps when multiple storm seasons stacked damage on different slopes.",
  "teravista:electrician":
    "Teravista electrical work near pools or outdoor kitchens needs GFCI and bonding verified against current code. Compare surge protection for homes with frequent electronics upgrades. Alley or long-driveway meter setups may need utility coordination—confirm who schedules that.",
  "teravista:landscaping":
    "Teravista landscape bids should reprogram irrigation for mature trees that now shade former full-sun zones. Compare aeration schedules for compacted approaches near cart paths. Ask whether fertilization plans account for golf-course overspray drifting onto fence-line beds.",
  "teravista:pest-control":
    "Teravista pest service should monitor greenbelt edges and pool equipment pads where moisture concentrates. Compare mosquito treatments if you use patios near water features. Rodent exclusion on older Teravista legs may need soffit mesh upgrades after tree trimming.",
  "teravista:foundation-repair":
    "Teravista foundation proposals should map elevation changes relative to irrigation zones, not just interior cracks. Mixed build phases mean pier specs differ—ask for engineering rationale. Compare plumbing leak tests before interior pier cuts near wet walls.",
  "teravista:house-cleaning":
    "Teravista cleaning services should handle second-story lofts, balcony tracks, and fairway pollen on screens. Ask whether HEPA vacuums are standard for allergy seasons. Schedule around tee-time traffic on adjacent streets when crews need curb parking.",

  "berry-creek:plumber":
    "Berry Creek plumbing scopes should budget time for cleanout discovery under established beds and root cutting if camera shows intrusion. Compare trenchless options when driveways and mature oaks limit excavation. Ask whether the company coordinates with gutter repairs if overflow saturated soil near the slab.",
  "berry-creek:hvac":
    "Berry Creek HVAC maintenance must include coil cleaning when canopy shade hides condenser debris until efficiency collapses. Compare filter plans that match high pollen without choking returns. Attic flex inspections belong in any quote when rooms lag despite “new” equipment.",
  "berry-creek:roofer":
    "Berry Creek roof work should plan for tree trimming coordination before ridge walks—limbs hide lifted tabs. Compare moss treatment on north slopes with gutter cleaning bundled. Ask how crews protect mature plantings during material staging on tight drives.",
  "berry-creek:electrician":
    "Berry Creek electrical upgrades on older homes should include grounding checks on two-prong legacy circuits before kitchen remodels. Compare panel labels after work in case of future storm surge claims. Underground feeds damaged by roots need locates before trenching.",
  "berry-creek:landscaping":
    "Berry Creek tree care quotes should address root plates lifting walks and storm debris clearing from drains. Compare irrigation cuts when shade reduced turf needs. HOA frontage standards still apply even when side yards are jungle-thick—ask for phased plans.",
  "berry-creek:pest-control":
    "Berry Creek pest programs need roofline exclusion paired with attic monitoring after limb falls. Compare wildlife handling credentials if squirrels are in soffits. Standing water in clogged valleys breeds mosquitoes—integrate gutter advice with spraying.",
  "berry-creek:foundation-repair":
    "Berry Creek foundation work should consider root moisture cycles—not only pier counts. Compare gutter downspout extensions as part of moisture management. Elevation maps taken in dry September versus wet April tell different stories; ask for both when possible.",
  "berry-creek:house-cleaning":
    "Berry Creek house cleaning should plan for pollen seasons that reset interiors within days of open windows. Ask about fragile wood window care and fireplace ash after winter use. Coordinating with gutter cleans reduces repeat dust on sills.",

  "georgetown-village:plumber":
    "Georgetown Village plumbing visits should confirm alley access and quiet-hour constraints before jackhammer work near shared walls. Compare shutoff labeling when multiple units share laterals. Downtown festival weekends fill guest baths—schedule diagnostics before event surges if possible.",
  "georgetown-village:hvac":
    "Georgetown Village HVAC service should account for alley condensate drainage and urban dust loading filters faster than suburban homes. Compare parking plans for event Saturdays when trucks cannot idle on the Square. Mixed-era equipment in duplex layouts may need zone-by-zone quotes.",
  "georgetown-village:roofer":
    "Georgetown Village roof quotes should respect alley ladder setups and neighbor sight lines. Compare documentation for insurers skeptical of roof age near downtown. Wind funneled along alleys lifts edges differently than open fairway homes—insist on rear elevation photos.",
  "georgetown-village:electrician":
    "Georgetown Village electrical upgrades may need alley meter coordination and corrosion checks on older services near downtown moisture. Compare permit paths when panels face public ROW. Short-term rental turnover increases wear—ask about AFCI troubleshooting on patio circuits.",
  "georgetown-village:landscaping":
    "Georgetown Village landscape work should finish before street closures and use quiet equipment near alleys. Compare positive grading toward drains after city projects altered flow. Small yards need precise irrigation—avoid overspray onto neighbor brick.",
  "georgetown-village:pest-control":
    "Georgetown Village pest control should focus on alley dumpsters and stoop gaps after events. Compare rodent exclusion on shared walls in row-style lots. Roach pressure rises near food service downtown—perimeter treatments timed weekly during festival season help.",
  "georgetown-village:foundation-repair":
    "Georgetown Village foundation studies should baseline during quiet weeks, not festival weekends when vibration and foot traffic spike readings. Compare plumbing tests on shared laterals. City drainage changes can shift hydrostatic pressure—ask if hydrology notes are included.",
  "georgetown-village:house-cleaning":
    "Georgetown Village maid quotes should cover festival dust, historic trim care, and alley parking limits during Red Poppy. Compare products safe for mixed flooring in the same hall. Early-morning starts beat afternoon heat on upper stories without central returns.",
};

export function getNeighborhoodTradeContextExtra(
  neighborhoodSlug: string,
  serviceSlug: string,
): string[] {
  const paragraph = NEIGHBORHOOD_TRADE_CONTEXT_EXTRA[`${neighborhoodSlug}:${serviceSlug}`];
  return paragraph ? [paragraph] : [];
}
