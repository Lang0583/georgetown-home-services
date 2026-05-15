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
    "Editorial standards for Georgetown Home Services: AI use, human review, rejection rubric, fact-checking, sponsored labels, and review cadence for AdSense-quality content.",
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
              "Editorial standards: human-edited homeowner guides for Georgetown TX, transparent AI use, and separation of sponsorship from rankings.",
          })}
        />
      }
      eyebrow="Editorial"
      title="Editorial Policy"
      description={
        <>
          We publish <strong>durable homeowner journalism</strong> for Georgetown, Texas—checklists, cost frameworks, and
          directory shortlists grounded in observable facts. This page explains how drafts are produced, what we refuse to
          ship, and how sponsorship is labeled.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who makes publishing decisions</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Final calls on publish, merge, or retire URLs sit with{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_NAME}, founder and editor
          </Link>
          . The editor is accountable for site-wide consistency—tone, claim discipline, and whether a page earns its spot
          in the index.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Artificial intelligence: how we use it</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Drafting tools may accelerate first passes on long pages, but <strong>nothing ships without human review</strong>.
          Editors remove templated phrasing, inject Williamson County specifics (soil behavior, hail seasonality, neighborhood
          realities), and delete generic “SEO filler” that does not survive a skeptical homeowner read. If a draft cannot be
          made specific, we <strong>consolidate or do not publish</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we reject or merge (“thin content” bar)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Near-duplicate URLs</strong> that differ only by suburb name with interchangeable paragraphs.
          </li>
          <li>
            <strong>Unsupported superlatives</strong> (“best,” “#1,” “guaranteed”) without measurable evidence tied to a
            named methodology.
          </li>
          <li>
            <strong>Medical, legal, or insurance guarantees</strong> framed as universal truth—storm coverage varies by policy
            and endorsements; we describe patterns, not promises.
          </li>
          <li>
            <strong>Door-knocker urgency copy</strong> that pressures homeowners to sign immediately after weather events.
          </li>
          <li>
            <strong>Pages that exist only to funnel users</strong> to ads with no standalone utility (we retire these when we
            find them).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Fact-checking and corrections</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We prioritize <strong>verifiable</strong> claims: manufacturer specifications when discussing equipment classes,
          widely published building science concepts, and public business data for directories. When readers flag an error
          with a checkable source, we correct the page and bump visible “last updated” context where the tooling allows.{" "}
          <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
            Contact &amp; feedback
          </Link>{" "}
          is the fastest route for corrections.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we publish</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>Service guides that teach category vocabulary, failure modes, and estimate comparison.</li>
          <li>Best Of hubs that pair shortlists with explicit methodology and homeowner instructions.</li>
          <li>Blog series (cost, maintenance, storm checklists) where each installment adds a distinct decision framework.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Site-wide editorial review log</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          <strong>Spring 2026:</strong> expanded trust pages (About, Methodology, Editorial), deepened the roofing directory
          guide with original hiring analysis, and differentiated neighborhood storm pages to reduce clone-like patterns after
          county hail coverage—part of a broader push to meet reader expectations and advertising program quality bars.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Sponsored placements</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Paid placements—when present—carry a clear <strong>Sponsored</strong> or <strong>Featured</strong> label and never
          masquerade as organic methodology results. Read{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            how we rank providers
          </Link>{" "}
          for the full separation rule.
        </p>
      </section>
    </TrustPage>
  );
}
