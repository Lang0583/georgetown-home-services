import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { AUTHOR_NAME, AUTHOR_PROFILE_PATH } from "../../lib/site-author";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "How We Review and Rank Providers",
  description:
    "How Georgetown Home Services builds provider shortlists for Georgetown, TX: public data we use, de-emphasis rules, update cadence, sponsored placements, and what you must verify yourself.",
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
            name: "How We Review and Rank Providers",
            description:
              "Transparent methodology for Georgetown Home Services directories: signals, limits, conflicts, and reader diligence.",
          })}
        />
      }
      eyebrow="Methodology"
      title="How We Review and Rank Providers"
      description={
        <>
          Georgetown Home Services is a comparison and education site. We do <strong>not</strong> schedule work, accept
          service tickets on behalf of providers, or negotiate prices. What we publish is a{" "}
          <strong>starting shortlist</strong> built from observable, mostly public information—so you can move faster
          without outsourcing judgment.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who maintains this</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Rankings and methodology copy are maintained by{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_NAME}, founder and editor
          </Link>
          . Editorial choices (who is emphasized by default, who is deprioritized when signals are weak) are human
          decisions informed by the criteria below—not an automated &quot;pay to rank&quot; auction.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Signals we weigh (public information)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <span className="font-semibold text-gray-900">Review patterns:</span> star averages matter less in isolation
            than <em>volume + recency</em>—a provider with years of steady feedback is easier to evaluate than a brand-new
            profile with a handful of reviews.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Listing consistency:</span> matching name/phone/address across
            maps and official sites reduces confusion when you try to book.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Geographic fit:</span> language and listings that clearly
            include Georgetown and nearby Williamson County service areas (versus generic &quot;nationwide&quot; claims).
          </li>
          <li>
            <span className="font-semibold text-gray-900">Practical scope clues:</span> whether public materials speak
            to the job types homeowners actually need here—emergency leak response, storm documentation, replacement
            planning—not only brand slogans.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Website quality (as a weak proxy):</span> a real domain with
            service descriptions beats a map-only ghost listing, but a slick site alone never overrides thin public
            documentation.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">De-emphasis and tie-breakers</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          When two companies look similar on paper, we prefer the one with <strong>clearer homeowner-facing evidence</strong>
          (more review history, clearer contact paths, stronger local footprint). When signals are{" "}
          <strong>too thin</strong>—few reviews, inconsistent names, map-only presence—we may deprioritize the listing in
          UI defaults or omit it from highlighted positions even if it technically exists in open data. That is not a
          statement that the business is &quot;bad&quot;; it means <em>we cannot help you compare responsibly yet</em>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Update cadence (realistic expectations)</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Provider ecosystems change weekly (staff turnover, rebrands, seasonal demand). We do <strong>not</strong> real-time
          scrape every listing. Instead, we batch-review pages when copy is revised (see “Last updated” lines on
          directory hubs), after large local weather events when scam patterns spike, or when readers report verifiable
          inaccuracies through{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            Contact
          </Link>
          . Always confirm critical details at booking time.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we do not claim</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>We do not personally verify every license, insurance certificate, bond, or OSHA log.</li>
          <li>We do not rank on secret paid backchannels—see sponsored rules below.</li>
          <li>We do not know your attic conditions, timeline, or budget; treat guides as preparation, not prescription.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How to use the rankings responsibly</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>Shortlist 3–5 providers that fit the job: emergency vs planned replacement vs storm documentation.</li>
          <li>Ask each for a written estimate naming materials, labor line items, and excluded conditions.</li>
          <li>Compare scopes side by side; the cheapest total with the vaguest scope is usually the riskiest.</li>
          <li>Verify licensing and insurance <strong>with the issuing authority or carrier</strong>, not from a flyer.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Sponsored placements and conflicts</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          If we publish a <strong>sponsored</strong> or <strong>featured</strong> module, it will be visually and textually
          labeled as such. Sponsored modules are <strong>additive</strong>; they do not reorder independent editorial
          comparisons. For how editorial gates AI drafts and consolidation, see{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            Editorial Policy
          </Link>
          .
        </p>
      </section>
    </TrustPage>
  );
}
