import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import TrustPage from "@/components/templates/TrustPage";
import { pageSeoMetadata } from "@/lib/page-seo";
import { getBrandName } from "@/lib/site-content";
import {
  AUTHOR_LONG_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_PROFILE_PATH,
  PUBLISHER_NAME,
  authorProfilePageSchema,
  fullAuthorPersonSchema,
} from "@/lib/site-author";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: `${AUTHOR_NAME}`,
  description:
    "How the Georgetown Home Services Editorial Team researches guides from public records, reviews drafts, and publishes homeowner resources for Georgetown, Texas.",
  pathname: AUTHOR_PROFILE_PATH,
  ogType: "website",
});

export default function EditorialTeamProfilePage() {
  const brand = getBrandName();

  return (
    <TrustPage
      eyebrow="Editorial team"
      title={AUTHOR_NAME}
      description={<>{AUTHOR_LONG_DESCRIPTION}</>}
    >
      <JsonLd data={fullAuthorPersonSchema()} />
      <JsonLd data={authorProfilePageSchema()} />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who we are</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {AUTHOR_NAME} is the in-house editorial group behind {brand}. We are not a contractor,
          broker, or dispatch service. Our job is to translate public information—licensing lookups,
          business listings, published price ranges, and regional housing patterns—into guides that
          help Georgetown-area homeowners compare scopes and ask better questions before hiring.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {PUBLISHER_NAME} is owned and operated in Georgetown, Texas. Corporate and contact details
          live on the{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            about page
          </Link>{" "}
          and{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How content is produced</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Research starts with verifiable sources: Texas Department of Licensing and Regulation
          (TDLR) and Texas State Board of Plumbing Examiners (TSBPE) public lookups where trades are
          licensed, Texas Department of Agriculture SPCS records for pest control, Google Business
          Profile and official company websites for directory fields, and published municipal or
          insurer references when they affect homeowner decisions.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          First drafts may use editorial tooling to organize long pages. Every published guide is
          human-reviewed to remove templated language, add Williamson County specifics (clay soil,
          hail seasonality, neighborhood housing stock), and flag claims that need a &ldquo;verify with
          your contractor or carrier&rdquo; caveat. Pages that cannot meet that bar are consolidated or
          removed from the index.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we are not</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We are not licensed plumbers, electricians, HVAC technicians, roofers, or other trades.
          Guides explain decision frameworks—what to ask, what belongs in a written scope, how public
          data is weighted—not professional diagnosis or code compliance review. Hire licensed
          professionals for on-site work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Editorial standards</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Publishing decisions, merge/retire calls, and directory emphasis rules are documented on the{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            editorial policy
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            methodology
          </Link>{" "}
          pages. Sponsored or affiliate modules are labeled separately from organic shortlists.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Corrections</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Public listings change. If you spot a factual error with verifiable evidence, use{" "}
          <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
            Contact &amp; feedback
          </Link>
          . We correct mistakes we can confirm; we do not guarantee immediate updates.
        </p>
      </section>
    </TrustPage>
  );
}
