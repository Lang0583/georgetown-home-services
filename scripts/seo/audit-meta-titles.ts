/**
 * Print unified-diff-style before/after for page `<title>` and meta descriptions.
 *
 * "Before" = last known pre–CTR-template behavior (git parent of 03da5d9) for
 * services, blog, and neighborhood × service listings; neighborhood hubs use
 * hub `metaTitle` without the `[year]` segment as the baseline.
 *
 * Run: npx tsx scripts/seo/audit-meta-titles.ts
 */
import { neighborhoodServicePages } from "../../data/neighborhoods";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "../../data/neighborhood-home-services-hubs";
import {
  getNeighborhoodHailPage,
  neighborhoodHailDamageStaticParams,
} from "../../data/neighborhood-hail-pages";
import { buildBlogPostMeta } from "../../lib/blog-seo";
import { buildNeighborhoodHailMeta, buildNeighborhoodServiceListingMeta } from "../../lib/neighborhood-seo";
import { documentTitleFromSegment } from "../../lib/page-seo";
import { PRICING_YEAR } from "../../lib/pricing-data";
import { buildServicePageSeo } from "../../lib/service-page-seo";
import { clipMetaDescription } from "../../lib/seo-meta";
import { getBlogBySlug, getBlogSlugs, getServiceBySlug, getServiceSlugs } from "../../lib/site-content";

const OLD_SERVICE_OVERRIDES: Record<string, { title?: string; absoluteTitle?: string; description: string }> = {
  "plumber-georgetown-tx": {
    absoluteTitle: "Plumber Georgetown TX (2026) — Repairs, Leaks & Emergency Calls",
    description:
      "Find a licensed plumber in Georgetown TX for slab leaks, drain clogs, water heaters, and emergency calls. Compare local providers with verified reviews and real pricing ranges.",
  },
  "hvac-georgetown-tx": {
    absoluteTitle: "HVAC Companies Georgetown TX (2026) — AC Repair & Replacement",
    description:
      "Compare Georgetown TX HVAC companies for AC repair, replacement, and maintenance. Local picks rated for Central Texas heat, fast response, and honest pricing. Updated 2026.",
  },
  "roofer-georgetown-tx": {
    absoluteTitle: "Roofers Georgetown TX (2026) — Repairs, Storm Damage & Replacement",
    description:
      "Find a trusted roofer in Georgetown TX for shingle repair, storm damage, and full replacement. Local picks with verified reviews and Williamson County experience.",
  },
  "electrician-georgetown-tx": {
    absoluteTitle: "Electrician Georgetown TX (2026) — Panels, Circuits & EV Chargers",
    description:
      "Compare licensed electricians in Georgetown TX for panel upgrades, new circuits, outlet repair, and EV charger installation. Verified local providers.",
  },
  "landscaping-georgetown-tx": {
    absoluteTitle: "Landscaping Georgetown TX (2026) — Lawn Care, Beds & Irrigation",
    description:
      "Find Georgetown TX landscaping companies for lawn maintenance, bed work, mulch, and irrigation tuning. Compare local crews by service type and ratings.",
  },
  "pest-control-georgetown-tx": {
    absoluteTitle: "Pest Control Georgetown TX (2026) — Ants, Roaches & Rodents",
    description:
      "Compare Georgetown TX pest control companies for perimeter plans, termite treatment, and rodent exclusion. Local providers with real customer ratings.",
  },
  "foundation-repair-georgetown-tx": {
    absoluteTitle: "Foundation Repair Georgetown TX (2026) — Clay Soil Specialists",
    description:
      "Georgetown TX foundation repair guide: spot warning signs, compare pier and slab contractors, and understand what Central Texas clay soil does to your home.",
  },
  "house-cleaning-georgetown-tx": {
    absoluteTitle: "House Cleaning Georgetown TX (2026) — Recurring & Deep Clean",
    description:
      "Compare Georgetown TX house cleaning services for recurring maid service, deep cleans, and move-out cleaning. Local picks with verified reviews and transparent pricing.",
  },
};

function oldServiceDocumentMeta(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  const o = OLD_SERVICE_OVERRIDES[slug];
  const description = clipMetaDescription(o?.description ?? service.description);
  const title = o?.absoluteTitle ?? documentTitleFromSegment(o?.title ?? service.title);
  return { title, description };
}

const OLD_BLOG_OVERRIDES: Record<string, { title?: string; absoluteTitle?: string; description: string }> = {
  "ac-not-cooling-georgetown-tx": {
    absoluteTitle: "AC Not Cooling in Georgetown TX? Do This First (2026 Guide)",
    description:
      "Georgetown TX AC not working? Follow this homeowner checklist to diagnose the issue fast — common causes, safe DIY checks, and when to call an HVAC company.",
  },
  "why-your-ac-is-not-cooling-georgetown-tx": {
    absoluteTitle: "Why Is My AC Not Cooling in Georgetown TX? 8 Common Causes",
    description:
      "Georgetown homeowners: find out why your AC is blowing warm air. From dirty filters to low refrigerant to failed capacitors — what to check and when to call.",
  },
  "ac-repair-cost-georgetown-tx": {
    absoluteTitle: "AC Repair Cost Georgetown TX (2026) — Real Price Ranges",
    description:
      "How much does AC repair cost in Georgetown TX? Realistic price ranges by repair type, what drives cost in Central Texas, and when repair makes more sense than replacement.",
  },
  "cost-to-replace-hvac-georgetown": {
    absoluteTitle: "HVAC Replacement Cost Georgetown TX (2026) — What to Expect",
    description:
      "HVAC replacement in Georgetown TX costs $5,000–$14,000+. See what affects your price, what to include in quotes, and how Central Texas heat impacts equipment selection.",
  },
  "signs-you-need-hvac-repair-georgetown-tx": {
    absoluteTitle: "9 Signs You Need HVAC Repair in Georgetown TX (2026)",
    description:
      "Spot HVAC trouble before it becomes a no-cool emergency. Georgetown homeowners: warning signs that mean call now vs. wait — and what each symptom usually costs.",
  },
  "emergency-plumber-cost-georgetown-tx": {
    absoluteTitle: "Emergency Plumber Cost Georgetown TX (2026) — Honest Ranges",
    description:
      "Emergency plumber in Georgetown TX costs $150–$500+ for most calls. Real price ranges by issue type, what triggers after-hours fees, and how to avoid overpaying.",
  },
  "water-heater-not-working-georgetown-tx": {
    absoluteTitle: "Water Heater Not Working in Georgetown TX? Do This First (2026)",
    description:
      "Georgetown TX water heater stopped working? Check these causes before calling a plumber — pilot light, thermostat, sediment buildup — and when to replace vs. repair.",
  },
  "how-to-choose-a-reliable-plumber-georgetown-tx": {
    absoluteTitle: "How to Choose a Plumber in Georgetown TX (2026 Checklist)",
    description:
      "Don't hire the first plumber you find. This Georgetown TX checklist covers licensing, insurance, what to ask before they start, and red flags to watch for.",
  },
  "roof-replacement-cost-georgetown-tx": {
    absoluteTitle: "Roof Replacement Cost Georgetown TX (2026) — Price Ranges",
    description:
      "Roof replacement in Georgetown TX costs $9,000–$20,000+. See what drives your price, how Williamson County weather affects material choices, and how to compare bids.",
  },
  "roof-repair-cost-georgetown-tx": {
    absoluteTitle: "Roof Repair Cost Georgetown TX (2026) — Repair vs. Replace",
    description:
      "Georgetown TX roof repair costs $300–$1,500 for most jobs. Real price ranges by repair type, what hail damage typically costs, and when repair is enough vs. replacement.",
  },
  "signs-you-may-need-a-new-roof-georgetown-tx": {
    absoluteTitle: "8 Signs You Need a New Roof in Georgetown TX (2026)",
    description:
      "Georgetown homeowners: these roof warning signs mean it's time to call. Check for storm damage, shingle wear, and age indicators before the next Texas hail season.",
  },
  "foundation-crack-georgetown-tx": {
    absoluteTitle: "Foundation Crack Georgetown TX — When to Worry (2026 Guide)",
    description:
      "Not all foundation cracks are serious — but some are. Georgetown TX homeowners: how to tell the difference, what causes cracking in clay soil, and when to call.",
  },
  "hvac-making-noise-georgetown-tx": {
    absoluteTitle: "HVAC Making Noise Georgetown TX? What Each Sound Means (2026)",
    description:
      "Banging, squealing, clicking, or rattling from your Georgetown TX HVAC? What each noise usually means, whether it's urgent, and what a repair typically costs.",
  },
  "after-hail-roof-checklist-georgetown-tx": {
    title: "Georgetown Roof Storm Checklist: After Hail or Wind Damage",
    description:
      "Safe ground-level inspection steps, photos to take for claims, when tarping helps, and how to compare roofer scopes in Williamson County.",
  },
};

function appendYearSignalIfApplicable(title: string, slug: string): string {
  if (/\b20\d{2}\b/.test(title)) return title;
  const isCost = /cost|price|how[- ]much/i.test(slug) || /cost|price|how much/i.test(title);
  const isHowTo = /how[- ]to|guide|checklist|signs/i.test(slug);
  if (!isCost && !isHowTo) return title;
  const suffix = isCost ? `${PRICING_YEAR} Guide` : `${PRICING_YEAR}`;
  return `${title} (${suffix})`;
}

function oldBlogDocumentMeta(slug: string) {
  const post = getBlogBySlug(slug);
  if (!post) return null;
  const o = OLD_BLOG_OVERRIDES[slug];
  const description = clipMetaDescription(o?.description ?? post.description);
  const title = o?.absoluteTitle
    ? o.absoluteTitle
    : documentTitleFromSegment(appendYearSignalIfApplicable(o?.title ?? post.title, slug));
  return { title, description };
}

function printDiff(path: string, before: { title: string; description: string }, after: { title: string; description: string }) {
  console.log(`--- a${path} (before)`);
  console.log(`+++ b${path} (after)`);
  if (before.title !== after.title) {
    console.log(`-title: ${before.title}`);
    console.log(`+title: ${after.title}`);
  } else {
    console.log(` title: (unchanged) ${after.title}`);
  }
  if (before.description !== after.description) {
    console.log(`-meta:  ${before.description}`);
    console.log(`+meta:  ${after.description}`);
  } else {
    console.log(` meta:  (unchanged) ${after.description}`);
  }
  console.log("");
}

function main() {
  console.log("# Meta title & description audit (document `<title>` = emitted full title)\n");

  for (const slug of getServiceSlugs()) {
    const before = oldServiceDocumentMeta(slug);
    const service = getServiceBySlug(slug);
    if (!before || !service) continue;
    const after = buildServicePageSeo(service);
    printDiff(`/services/${slug}`, before, { title: after.absoluteTitle, description: after.description });
  }

  for (const slug of getBlogSlugs()) {
    const before = oldBlogDocumentMeta(slug);
    const post = getBlogBySlug(slug);
    if (!before || !post) continue;
    const after = buildBlogPostMeta(post);
    printDiff(`/blog/${slug}`, before, { title: after.absoluteTitle, description: after.description });
  }

  for (const page of neighborhoodServicePages) {
    const path = `/neighborhoods/${page.neighborhoodSlug}/${page.serviceSlug}`;
    const before = {
      title: documentTitleFromSegment(page.metaTitle),
      description: clipMetaDescription(page.metaDescription),
    };
    const { titleSegment, description } = buildNeighborhoodServiceListingMeta(page);
    const after = {
      title: documentTitleFromSegment(titleSegment),
      description,
    };
    printDiff(path, before, after);
  }

  for (const hub of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    const path = `/neighborhoods/${hub.neighborhoodSlug}/home-services`;
    const before = {
      title: documentTitleFromSegment(hub.metaTitle),
      description: clipMetaDescription(hub.metaDescription),
    };
    const titleSegment = `${hub.neighborhoodName} Plumber/HVAC/Roofer | Georgetown TX Home Services [${PRICING_YEAR}]`;
    const after = {
      title: documentTitleFromSegment(titleSegment),
      description: clipMetaDescription(hub.metaDescription),
    };
    printDiff(path, before, after);
  }

  for (const { neighborhood } of neighborhoodHailDamageStaticParams()) {
    const page = getNeighborhoodHailPage(neighborhood);
    if (!page) continue;
    const path = `/neighborhoods/${neighborhood}/hail-damage`;
    const after = buildNeighborhoodHailMeta(page);
    console.log(`--- a${path} (before: n/a — route added with CTR template)`);
    console.log(`+++ b${path} (after)`);
    console.log(`+title: ${after.absoluteTitle}`);
    console.log(`+meta:  ${after.description}`);
    console.log("");
  }
}

main();
