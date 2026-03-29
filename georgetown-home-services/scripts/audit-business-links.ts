/**
 * QA audit for business outbound URLs — run: npx tsx scripts/audit-business-links.ts
 */
import raw from "../lib/businesses.json";
import {
  getBusinessOutboundUrl,
  getBusinessMapsUrl,
  getBusinessWebsiteUrl,
  getBusinessesByCategory,
  isLikelyMapsListingUrl,
  normalizeBusinessGroup,
  normalizeOutboundHref,
  type Business,
} from "../lib/businesses";

const businesses = raw as Business[];

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

function classifyWebsiteRaw(w: string): string[] {
  const t = trim(w);
  const flags: string[] = [];
  if (!t) {
    flags.push("missing_website");
    return flags;
  }
  if (!/^https?:\/\//i.test(t)) flags.push("website_without_http_scheme");
  const norm = normalizeOutboundHref(t);
  if (!norm) flags.push("malformed_or_unusable_website");
  return flags;
}

function classifyLocationRaw(l: string): string[] {
  const t = trim(l);
  const flags: string[] = [];
  if (!t) {
    flags.push("missing_location_link");
    return flags;
  }
  if (!/^https?:\/\//i.test(t)) flags.push("location_link_without_http_scheme");
  const norm = normalizeOutboundHref(t);
  if (!norm) flags.push("malformed_or_unusable_location_link");
  return flags;
}

function suspiciousUrl(href: string): string | null {
  try {
    const u = new URL(href);
    const h = u.hostname.toLowerCase();
    if (h.includes("bit.ly") || h.includes("tinyurl") || h.includes("goo.gl")) return "shortener_or_redirect_chain";
    if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) return "ip_address_host";
    return null;
  } catch {
    return "parse_error";
  }
}

type Row = {
  name: string;
  category: string;
  flags: string[];
  websiteRaw: string;
  locationRaw: string;
  websiteNorm: string | null;
  mapsNorm: string | null;
  outbound: string | null;
};

function auditList(list: Business[], label: string): Row[] {
  const rows: Row[] = [];
  for (const b of list) {
    const wRaw = trim(b.website);
    const lRaw = trim(b.location_link);
    const wFlags = classifyWebsiteRaw(b.website);
    const lFlags = classifyLocationRaw(b.location_link);
    const websiteNorm = getBusinessWebsiteUrl(b);
    const mapsNorm = getBusinessMapsUrl(b);
    const outbound = getBusinessOutboundUrl(b);

    const flags = [...wFlags, ...lFlags.filter((f) => f !== "missing_location_link" || !websiteNorm)];

    if (!outbound) flags.push("NO_USABLE_LINK");
    if (wRaw && !websiteNorm && mapsNorm) flags.push("website_falls_back_to_maps_for_primary");
    if (websiteNorm) {
      const s = suspiciousUrl(websiteNorm);
      if (s) flags.push(`suspicious_website:${s}`);
    }
    if (mapsNorm) {
      const s = suspiciousUrl(mapsNorm);
      if (s) flags.push(`suspicious_maps:${s}`);
    }

    rows.push({
      name: b.name,
      category: b.category,
      flags: [...new Set(flags)],
      websiteRaw: wRaw.slice(0, 120) + (wRaw.length > 120 ? "…" : ""),
      locationRaw: lRaw.slice(0, 80) + (lRaw.length > 80 ? "…" : ""),
      websiteNorm,
      mapsNorm,
      outbound,
    });
  }
  return rows;
}

function main() {
  const categories = ["plumber", "hvac", "roofer"] as const;
  const byCat = Object.fromEntries(categories.map((c) => [c, getBusinessesByCategory(c)])) as Record<
    (typeof categories)[number],
    Business[]
  >;

  console.log("=== Counts per category (same as best pages) ===");
  for (const c of categories) {
    console.log(`${c}: ${byCat[c].length} businesses`);
  }

  console.log("\n=== Homepage: top 3 per category ===");
  for (const c of categories) {
    const top3 = byCat[c].slice(0, 3);
    console.log(`\n-- ${c} (top 3) --`);
    for (const b of top3) {
      const o = getBusinessOutboundUrl(b);
      console.log(`  ${b.name}: outbound=${o ? "OK" : "NONE"} website=${getBusinessWebsiteUrl(b) ? "OK" : "—"} maps=${getBusinessMapsUrl(b) ? "OK" : "—"}`);
    }
  }

  console.log("\n=== Service pages: top 5 per category ===");
  for (const c of categories) {
    const top5 = byCat[c].slice(0, 5);
    console.log(`\n-- ${c} (top 5) --`);
    for (const b of top5) {
      const o = getBusinessOutboundUrl(b);
      console.log(`  ${b.name}: outbound=${o ? "OK" : "NONE"}`);
    }
  }

  const allRows: Row[] = [];
  for (const c of categories) {
    allRows.push(...auditList(byCat[c], c));
  }

  const problems = allRows.filter(
    (r) =>
      r.flags.some(
        (f) =>
          f.includes("malformed") ||
          f.includes("NO_USABLE") ||
          f.includes("suspicious") ||
          f === "website_without_http_scheme" ||
          f === "location_link_without_http_scheme",
      ) || r.flags.includes("missing_website"),
  );

  console.log("\n=== Flagged rows (review) ===");
  const noLink = allRows.filter((r) => r.flags.includes("NO_USABLE_LINK"));
  console.log(`Total with NO usable outbound link: ${noLink.length}`);
  noLink.forEach((r) => console.log(`  - ${r.name} (${r.category})`));

  const interesting = allRows.filter(
    (r) =>
      r.flags.includes("malformed_or_unusable_website") ||
      r.flags.includes("website_falls_back_to_maps_for_primary") ||
      r.flags.includes("malformed_or_unusable_location_link"),
  );
  console.log(`\nMalformed / fallback cases: ${interesting.length}`);
  for (const r of interesting) {
    console.log(`\n  ${r.name}`);
    console.log(`    flags: ${r.flags.join(", ")}`);
    console.log(`    website raw: ${r.websiteRaw || "(empty)"}`);
    console.log(`    location raw: ${r.locationRaw || "(empty)"}`);
    console.log(`    normalized website: ${r.websiteNorm}`);
    console.log(`    normalized maps: ${r.mapsNorm}`);
    console.log(`    outbound: ${r.outbound}`);
  }

  // Businesses that appear only with issues in homepage subset
  console.log("\n=== Summary ===");
  console.log(`Total audited (all 3 categories): ${allRows.length}`);
  console.log(`Rows with any data-quality flag: ${problems.length}`);

  const websiteLooksLikeMaps = businesses.filter((b) => {
    const w = normalizeOutboundHref(b.website);
    return w ? isLikelyMapsListingUrl(w) : false;
  });
  console.log(`\nWebsite field looks like a maps URL (handled as maps, not “Visit Website”): ${websiteLooksLikeMaps.length}`);
  websiteLooksLikeMaps.forEach((b) => console.log(`  - ${b.name}`));

  const missingWebMapsOk = businesses.filter((b) => {
    if (normalizeBusinessGroup(b) === null) return false;
    return !trim(b.website) && getBusinessOutboundUrl(b);
  });
  console.log(`\nEmpty website but usable outbound (maps): ${missingWebMapsOk.length}`);
}

main();
