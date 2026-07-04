import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import TrustPage from "@/components/templates/TrustPage";
import { pageSeoMetadata } from "@/lib/page-seo";
import { getBrandName } from "@/lib/site-content";
import {
  AUTHOR_FIRST_NAME,
  AUTHOR_LONG_DESCRIPTION,
  AUTHOR_PROFILE_PATH,
  PUBLISHER_NAME,
  authorProfilePageSchema,
  fullAuthorPersonSchema,
} from "@/lib/site-author";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: `${AUTHOR_FIRST_NAME} — ${PUBLISHER_NAME}`,
  description:
    "Matt builds Georgetown Home Services, an independent Georgetown TX directory. He researches providers from public business data, license databases, and review platforms.",
  pathname: AUTHOR_PROFILE_PATH,
  ogType: "website",
});

export default function MattAuthorProfilePage() {
  const brand = getBrandName();

  return (
    <TrustPage
      eyebrow="About the site"
      title={`${AUTHOR_FIRST_NAME} — ${PUBLISHER_NAME}`}
      description={<>{AUTHOR_LONG_DESCRIPTION}</>}
    >
      <JsonLd data={fullAuthorPersonSchema()} />
      <JsonLd data={authorProfilePageSchema()} />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who runs this site</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {brand} is an independent local directory built and maintained by {AUTHOR_FIRST_NAME}, a
          Georgetown homeowner. He researches providers using public business data, Texas licensing
          registries where trades are licensed, and review platforms—not insider industry access or
          paid placement for rankings.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {AUTHOR_FIRST_NAME} is <strong>not</strong> a licensed contractor and does not perform
          home services. Guides and directory listings are for research and comparison; they are not
          a substitute for on-site diagnosis, code review, or insurance or legal advice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How listings are built</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Directory fields draw on Google Business Profile listings, official company websites,
          TDLR and TSBPE public lookups where applicable, and other verifiable public sources.
          Rankings follow the criteria on the{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            methodology
          </Link>{" "}
          page. Sponsored or affiliate modules—when present—are labeled separately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Corrections</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Public listings change. If you spot a factual error with verifiable evidence, use{" "}
          <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
            Contact &amp; feedback
          </Link>
          . See also the{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            about page
          </Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            editorial policy
          </Link>
          .
        </p>
      </section>
    </TrustPage>
  );
}
