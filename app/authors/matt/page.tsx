import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import TrustPage from "@/components/templates/TrustPage";
import { pageSeoMetadata } from "@/lib/page-seo";
import { getBrandName } from "@/lib/site-content";
import {
  AUTHOR_BYLINE,
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
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Who runs this site</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {brand} is an independent local directory built and maintained by {AUTHOR_BYLINE}. He
          researches providers using public business data, Texas licensing registries where trades are
          licensed, and review platforms—not insider industry access or paid placement for rankings.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {AUTHOR_FIRST_NAME} is <strong>not</strong> a licensed contractor and does not perform
          home services. Guides and directory listings are for research and comparison; they are not
          a substitute for on-site diagnosis, code review, or insurance or legal advice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">How listings are built</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Data sources, the five inclusion criteria, review cadence, and independence rules are documented on the{" "}
          <Link href="/methodology" className="font-semibold text-brand hover:underline">
            listing methodology
          </Link>{" "}
          page—not restated here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Corrections</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Public listings change. If you spot a factual error with verifiable evidence, use{" "}
          <Link href="/contact#feedback" className="font-semibold text-brand hover:underline">
            Contact &amp; feedback
          </Link>
          . See also the{" "}
          <Link href="/about" className="font-semibold text-brand hover:underline">
            about page
          </Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="font-semibold text-brand hover:underline">
            editorial policy
          </Link>
          .
        </p>
      </section>
    </TrustPage>
  );
}
