import type { ProviderGroup } from "./businesses";
import { inferProviderGroupFromServicePage } from "./businesses";
import {
  PRICING_YEAR,
  findCategory,
  formatPricingRange,
  type PricingCategory,
} from "./pricing-data";
import type { ServicePage } from "./site-content";

const PROVIDER_TO_PRICING: Record<ProviderGroup, PricingCategory["key"]> = {
  plumber: "plumbing",
  hvac: "hvac",
  roofer: "roofing",
  electrician: "electrical",
  landscaping: "landscaping",
  pest_control: "pest",
  foundation_repair: "foundation",
  house_cleaning: "cleaning",
};

/** Visible service noun for titles (matches `site-content.json` `serviceType` when set). */
export function serviceLabelForMeta(service: ServicePage): string {
  const t = service.serviceType?.trim();
  if (t) return t;
  return "Home services";
}

function trimForMeta(text: string, max: number): string {
  const s = text.trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = cut.lastIndexOf(" ");
  return `${(i > 48 ? cut.slice(0, i) : cut).trim()}…`;
}

/** First sentence of local copy; avoids naive `.split(".")` breaking `U.S.` and `St.`. */
function firstSentenceFromLocalContext(localContext: string): string {
  const masked = localContext
    .replace(/\bU\.S\./g, "__US__")
    .replace(/\bSt\./g, "__ST__");
  const first = masked.split(/\.\s+/)[0]?.trim() ?? "";
  return first.replaceAll("__US__", "U.S.").replaceAll("__ST__", "St.");
}

/** Two concrete price lines for meta (planning ranges, not quotes). */
function metaPricePhrase(cat: PricingCategory, serviceLabelLower: string): string {
  const usable = cat.rows.filter((r) => {
    if (r.low === 0 && r.high === 0 && !r.displayRange) return false;
    if (r.excludeFromEstimatorSum && r.displayRange?.includes("sq ft")) return false;
    return true;
  });
  const a = usable[0];
  const b = usable[1];
  if (!a) return `see our ${serviceLabelLower} cost table on this page`;
  const p1 = `${a.job.toLowerCase()} (${formatPricingRange(a)})`;
  if (!b) return p1;
  const p2 = `${b.job.toLowerCase()} (${formatPricingRange(b)})`;
  return `${p1} and ${p2}`;
}

const DEFAULT_CTA =
  "Compare vetted Georgetown companies in our Best Of directory and request written estimates before you hire.";

/**
 * Title: `[Service] Georgetown TX | Prices, Reviews & Local Pros [2026]` (absolute, no layout suffix).
 * Description: Williamson County hook + two price bands + CTA.
 */
export function buildServicePageSeo(service: ServicePage): { absoluteTitle: string; description: string } {
  const label = serviceLabelForMeta(service);
  const year = PRICING_YEAR;
  const absoluteTitle = `${label} Georgetown TX | Prices, Reviews & Local Pros [${year}]`;

  const group = inferProviderGroupFromServicePage(service.slug, service.bestSlugs);
  const pKey = PROVIDER_TO_PRICING[group];
  const cat = findCategory(pKey);
  const hookRaw = firstSentenceFromLocalContext(cat.localContext);
  const hook = trimForMeta(hookRaw, 220);
  const afterHook = hook.endsWith("…") ? " " : hook.match(/[.!?]$/) ? " " : ". ";
  const prices = metaPricePhrase(cat, label.toLowerCase());
  const description = trimForMeta(
    `${hook}${afterHook}Typical Georgetown ${label.toLowerCase()} planning ranges include ${prices}. ${DEFAULT_CTA}`,
    320,
  );

  return { absoluteTitle, description };
}

/** Trade hub routes under `/services/plumbing`, etc. */
export function buildTradeHubSeo(opts: {
  label: string;
  pricingKey: PricingCategory["key"];
}): { absoluteTitle: string; description: string } {
  const { label, pricingKey } = opts;
  const year = PRICING_YEAR;
  const absoluteTitle = `${label} Georgetown TX | Prices, Reviews & Local Pros [${year}]`;
  const cat = findCategory(pricingKey);
  const hookRaw = firstSentenceFromLocalContext(cat.localContext);
  const hook = trimForMeta(hookRaw, 220);
  const afterHook = hook.endsWith("…") ? " " : hook.match(/[.!?]$/) ? " " : ". ";
  const prices = metaPricePhrase(cat, label.toLowerCase());
  const description = trimForMeta(
    `${hook}${afterHook}Typical Georgetown ${label.toLowerCase()} planning ranges include ${prices}. ${DEFAULT_CTA}`,
    320,
  );
  return { absoluteTitle, description };
}
