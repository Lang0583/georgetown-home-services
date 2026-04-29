import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { AUTHOR_NAME, AUTHOR_PROFILE_PATH } from "../../lib/site-author";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Editorial Policy",
  description:
    "How Georgetown Home Services creates and updates homeowner guides and provider comparisons, including transparency around sponsored placements.",
  pathname: "/editorial-policy",
  ogType: "website",
});

export default function EditorialPolicyPage() {
  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/editorial-policy",
            name: "Editorial Policy",
            description:
              "How Georgetown Home Services creates and updates homeowner guides and provider comparisons, including transparency around sponsored placements.",
          })}
        />
      }
      eyebrow="Editorial"
      title="Editorial Policy"
      description={
        <>
          Our goal is repeat-use homeowner content: checklists, cost drivers, and “what to ask” guidance that stays useful after publishing. We also
          publish a provider directory to help you compare companies and contact them directly.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who edits this site</h2>
        <p className="mt-3">
          Editorial decisions on this site — what to publish, what to update, what to consolidate or remove — are made by{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_NAME}, founder and editor
          </Link>
          . AI is used for first-draft generation; every published page is human-edited specifically to remove
          templated language, add real local specifics, and ground claims in Williamson County conditions. Pages
          that couldn&apos;t clear that bar were consolidated or removed from the index.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we publish</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Service guides that explain the category, common local issues, and decision points.</li>
          <li>Best Of comparison pages that help you shortlist providers using publicly available information.</li>
          <li>Blog posts built around recurring formats (monthly maintenance, seasonal checklists, cost guides, warning signs).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Accuracy and updates</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>We focus on durable guidance (how to compare scopes, what changes price, what red flags look like).</li>
          <li>Providers and details can change. Always confirm pricing, availability, and credentials directly with the provider.</li>
          <li>We may revise pages to improve clarity, add new internal links, or update methodology.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Sponsored placements</h2>
        <p className="mt-3">
          If we publish paid placements, they will be clearly labeled (for example, “Sponsored” or “Featured”). Paid placements are kept separate from
          organic ranking logic.
        </p>
        <p className="mt-3">
          Learn more on{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            how we review and rank providers
          </Link>
          .
        </p>
      </section>
    </TrustPage>
  );
}

