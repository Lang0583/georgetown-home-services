import type { ProviderGroup } from "./businesses";
import { inferProviderGroupFromServicePage } from "./businesses";
import {
  PRICING_YEAR,
  findCategory,
  formatPricingRange,
  type PricingCategory,
} from "./pricing-data";
import type { ServicePage } from "./site-content";
import { clipMetaDescription } from "./seo-meta";

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
  return `${p1}; ${p2}`;
}

/** Flagship geo guides — match CTR audit headline hooks. */
const SERVICE_SLUG_ABSOLUTE_TITLE: Record<string, string> = {
  "plumber-georgetown-tx": `Plumbers in Georgetown, TX (${PRICING_YEAR}) | Reviews, Costs & Local Pros`,
  "hvac-georgetown-tx": `HVAC Repair Georgetown TX — $85-175/hr | AC & Heating [${PRICING_YEAR}]`,
  "roofer-georgetown-tx": `Roofer Georgetown TX — $350-600/sq | Free Estimates [${PRICING_YEAR}]`,
};

const SERVICE_SLUG_META_LEAD: Record<string, string> = {
  "plumber-georgetown-tx":
    "Licensed Georgetown plumbers often charge ~$75-250/hr on repairs; service calls commonly ~$100-175.",
  "hvac-georgetown-tx":
    "Georgetown HVAC repairs often run ~$85-175/hr plus parts; diagnostics commonly ~$75-150.",
  "roofer-georgetown-tx":
    "Georgetown roofing often runs ~$350-600/sq on replacements; repairs commonly several hundred up.",
};

function defaultServiceAbsoluteTitle(service: ServicePage): string {
  const label = serviceLabelForMeta(service);
  const year = PRICING_YEAR;
  return `${label} Georgetown TX — Costs, Reviews & Local Pros [${year}]`;
}

function serviceMetaDescription155(service: ServicePage, cat: PricingCategory, label: string): string {
  const slugLead = SERVICE_SLUG_META_LEAD[service.slug];
  const prices = metaPricePhrase(cat, label.toLowerCase());
  const hookRaw = firstSentenceFromLocalContext(cat.localContext);
  const trust = trimForMeta(hookRaw, 72);
  const cta = "Get 3 free quotes from vetted local pros in minutes. No obligation.";
  const body = slugLead
    ? `${slugLead} ${trust} ${cta}`
    : `Typical ${label.toLowerCase()} planning ranges: ${prices}. ${trust} ${cta}`;
  return clipMetaDescription(body);
}

/**
 * Title: `[Service] Georgetown TX — Costs, Reviews & Local Pros [2026]` (or flagship hook variants).
 * Description: ≤155 chars — price band + Williamson context + CTA.
 */
export function buildServicePageSeo(service: ServicePage): { absoluteTitle: string; description: string } {
  const label = serviceLabelForMeta(service);
  const absoluteTitle = SERVICE_SLUG_ABSOLUTE_TITLE[service.slug] ?? defaultServiceAbsoluteTitle(service);

  const group = inferProviderGroupFromServicePage(service.slug, service.bestSlugs);
  const pKey = PROVIDER_TO_PRICING[group];
  const cat = findCategory(pKey);
  const description = serviceMetaDescription155(service, cat, label);

  return { absoluteTitle, description };
}

/** Trade hub routes under `/services/plumbing`, etc. */
export function buildTradeHubSeo(opts: {
  label: string;
  pricingKey: PricingCategory["key"];
}): { absoluteTitle: string; description: string } {
  const { label, pricingKey } = opts;
  const year = PRICING_YEAR;
  const absoluteTitle = `${label} Georgetown TX — Costs, Reviews & Local Pros [${year}]`;
  const cat = findCategory(pricingKey);
  const prices = metaPricePhrase(cat, label.toLowerCase());
  const hookRaw = firstSentenceFromLocalContext(cat.localContext);
  const trust = trimForMeta(hookRaw, 72);
  const cta = "Get 3 free quotes from vetted local pros in minutes. No obligation.";
  const description = clipMetaDescription(
    `Typical ${label.toLowerCase()} planning ranges: ${prices}. ${trust} ${cta}`,
  );
  return { absoluteTitle, description };
}
