import { PROVIDERS, PROVIDERS_LAST_VERIFIED, PROVIDER_CATEGORY_LABELS } from "@/data/providers";
import { verifiedLicenseInfo, stateLicenseExemptInfo } from "@/lib/verified-license";
import { SITE_URL } from "@/lib/page-seo";
import { AUTHOR_BYLINE, PUBLISHER_NAME } from "@/lib/site-author";

export const dynamic = "force-static";

function licenseReportMarkdown(): string {
  const base = SITE_URL.replace(/\/$/, "");
  const licensed = PROVIDERS.filter((p) => verifiedLicenseInfo(p) != null);
  const exempt = PROVIDERS.filter((p) => stateLicenseExemptInfo(p) != null);

  const byCat = new Map<string, typeof licensed>();
  for (const p of licensed) {
    const label = PROVIDER_CATEGORY_LABELS[p.category];
    const list = byCat.get(label) ?? [];
    list.push(p);
    byCat.set(label, list);
  }

  const sections = [...byCat.entries()]
    .map(([label, rows]) => {
      const lines = rows
        .map((p) => {
          const info = verifiedLicenseInfo(p)!;
          return `- ${p.name}: ${info.authority} ${info.licenseNumber} (checked ${info.licenseVerifiedDate})`;
        })
        .join("\n");
      return `### ${label}\n\n${lines}`;
    })
    .join("\n\n");

  return `# Williamson County License Check Report

Publisher: ${PUBLISHER_NAME}
Author: ${AUTHOR_BYLINE}
Canonical: ${base}/reports/williamson-county-license-check
Directory batch: ${PROVIDERS_LAST_VERIFIED}

This report summarizes primary-source Texas license checks for directory providers serving Georgetown / Williamson County. It is not a state roster and not proof that unchecked companies are unlicensed.

## Summary

- Providers with license badge data: ${licensed.length}
- State-license-exempt trades confirmed in data: ${exempt.length}
- Total directory providers: ${PROVIDERS.length}

## Licensed providers (badge-eligible)

${sections}

## Notes

- Plumbing licenses are individual RMP numbers (TSBPE), not company charters.
- Roofing, landscaping, foundation, and house cleaning are not Texas state-licensed trades; cards may show an exemption confirmation instead.
- Always re-check current status on the issuing board before hiring.

## Related

- Methodology: ${base}/methodology
- Methodology (Markdown): ${base}/methodology.md
- Best Of: ${base}/best
`;
}

export function GET() {
  return new Response(licenseReportMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
