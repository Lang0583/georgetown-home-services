import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Terms of Use",
  description: "Terms of use for Georgetown Home Services.",
  pathname: "/terms",
  ogType: "website",
});

export default function TermsPage() {
  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/terms",
            name: "Terms of Use",
            description: "Terms of use for Georgetown Home Services.",
          })}
        />
      }
      eyebrow="Legal"
      title="Terms of Use"
      description={
        <>
          Georgetown Home Services is a directory and homeowner education site. Information is provided for research and comparison purposes and may
          change over time.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">No service fulfillment</h2>
        <p className="mt-3">
          We do not provide home services, schedule appointments, dispatch providers, or route service requests. You contact providers directly and
          make your own hiring decisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">No warranties</h2>
        <p className="mt-3">
          We make no guarantees about availability, pricing, licensing, insurance, warranties, or suitability of any provider. Always confirm details
          directly with the provider.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">External links</h2>
        <p className="mt-3">
          Our pages may link to third-party websites or map listings. We are not responsible for third-party content, policies, or services.
        </p>
      </section>
    </TrustPage>
  );
}

