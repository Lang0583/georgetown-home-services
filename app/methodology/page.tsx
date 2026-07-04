import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { AUTHOR_FIRST_NAME, AUTHOR_PROFILE_PATH } from "../../lib/site-author";
import {
  LISTING_AFFILIATE_DOES_NOT_AFFECT_RANKINGS,
  LISTING_DATA_SOURCES,
  LISTING_INCLUSION_CRITERIA,
  LISTING_PLACEMENT_CANNOT_BE_BOUGHT,
  LISTINGS_REVIEW_CADENCE_SUMMARY,
  listingLicenseVerificationNote,
} from "../../lib/listing-methodology";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "How We Build Provider Listings",
  description:
    "How Georgetown Home Services builds Best Of listings: Google Business profiles, Texas license databases (TSBPE, TDLR, TDA SPCS), inclusion criteria, review cadence, and independence from paid placement.",
  pathname: "/methodology",
  ogType: "website",
});

export default function MethodologyPage() {
  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/methodology",
            name: "How We Build Provider Listings",
            description:
              "Data sources, inclusion criteria, review cadence, and independence rules for Georgetown Home Services provider directories.",
          })}
        />
      }
      eyebrow="Methodology"
      title="How We Build Provider Listings"
      description={
        <>
          Georgetown Home Services is a comparison and education site—not a contractor or dispatch desk. This page
          documents exactly how Best Of shortlists are assembled, verified, and updated for Georgetown, TX homeowners.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Data sources</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Listings start from publicly observable business information. We do not rely on pay-to-play directories or
          unverified lead forms to decide who appears.
        </p>
        <ul className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
          {LISTING_DATA_SOURCES.map((source) => (
            <li key={source.name}>
              <span className="font-semibold text-gray-900">{source.name}:</span> {source.description}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">{listingLicenseVerificationNote()}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Inclusion criteria</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          A company must meet <strong>all five</strong> criteria below to appear in a default Best Of shortlist. The same
          list appears on every{" "}
          <Link href="/best" className="font-semibold text-primary hover:underline">
            provider directory
          </Link>{" "}
          page—we import these strings from one file so the criteria never drift.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          {LISTING_INCLUSION_CRITERIA.map((criterion) => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Providers with thinner public signals (for example, fewer than 50 reviews at listing time) may appear behind a
          “lower-signal” toggle but are not promoted into the default established picks row until documentation
          improves.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How often listings are reviewed</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{LISTINGS_REVIEW_CADENCE_SUMMARY}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Report verifiable listing errors through{" "}
          <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
            Contact &amp; feedback
          </Link>
          . Include a link to an official site, registry entry, or dated screenshot we can check.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Placement and advertising independence</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{LISTING_PLACEMENT_CANNOT_BE_BOUGHT}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{LISTING_AFFILIATE_DOES_NOT_AFFECT_RANKINGS}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          If a page includes a sponsored or featured module, it is labeled as such and sits outside the organic
          shortlist. Editorial ranking logic is documented here—not re-stated on{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            About
          </Link>{" "}
          or{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            Editorial Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who maintains this</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Directory methodology is maintained by{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_FIRST_NAME}
          </Link>
          . Human editors apply the criteria above when adding, deprioritizing, or correcting listings—there is no
          automated pay-to-rank auction.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What you should still verify yourself</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>Current insurance certificates and trade licensing with the issuing authority—not from a marketing flyer.</li>
          <li>Written scopes that name materials, labor, permits, and excluded conditions before you authorize work.</li>
          <li>Availability, after-hours fees, and warranty terms at the time you book.</li>
        </ul>
      </section>
    </TrustPage>
  );
}
