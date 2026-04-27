import type { Metadata } from "next";
import Link from "next/link";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { AUTHOR_NAME, AUTHOR_PROFILE_PATH } from "../../lib/site-author";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "How We Review and Rank Providers",
  description:
    "How we review and rank plumbers, HVAC companies, and roofers serving Georgetown, Texas using publicly available information—and what you should confirm directly with providers.",
  pathname: "/methodology",
  ogType: "website",
});

export default function MethodologyPage() {
  return (
    <TrustPage
      eyebrow="Methodology"
      title="How We Review and Rank Providers"
      description={
        <>
          Georgetown Home Services is a comparison and homeowner resource site. We don’t schedule work or fulfill service requests. Our goal is to help
          you shortlist providers and ask better questions before you hire.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who edits this</h2>
        <p className="mt-3">
          Methodology and rankings on this site are maintained by{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_NAME}, founder and editor
          </Link>
          . The criteria below describe how shortlists are constructed. They do not constitute a guarantee that any
          particular provider is the right fit for your job — always confirm credentials and scope directly with the
          provider before hiring.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we use to evaluate providers</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-gray-900">Public review patterns:</span> overall ratings plus review volume (a handful of reviews is
            weaker signal than hundreds).
          </li>
          <li>
            <span className="font-semibold text-gray-900">Service fit:</span> whether the public listing description matches common Georgetown homeowner
            needs (repairs, replacement planning, storm response, etc.).
          </li>
          <li>
            <span className="font-semibold text-gray-900">Location relevance:</span> signals that the company serves Georgetown, TX and nearby
            neighborhoods (service-area statements, local presence, and consistent listing details).
          </li>
          <li>
            <span className="font-semibold text-gray-900">Website and listing quality:</span> providers with an official website, clear scope
            descriptions, and consistent contact details are easier to evaluate than map-only profiles.
          </li>
        </ul>
        <p className="mt-3">
          Rankings are a starting point. Always confirm licensing, insurance, availability, pricing, and warranty terms directly with the provider
          before you hire.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we do not claim</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>We do not claim to have personally inspected providers’ work.</li>
          <li>We do not guarantee availability, pricing, licensing, or insurance status.</li>
          <li>We do not route jobs or negotiate on your behalf.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How to use the rankings</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Shortlist 3–5 providers that match your job type (repair vs replacement vs emergency).</li>
          <li>Request written estimates with clear scope details.</li>
          <li>Compare scopes line-by-line, not just the total price.</li>
          <li>Confirm licensing, insurance, and warranty terms directly with the provider.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Sponsored placements</h2>
        <p className="mt-3">
          If we publish a sponsored placement (for example, a “Featured Listing”), it will be clearly labeled. Sponsored placements do not replace
          editorial comparisons—they are an additional option you can consider.
        </p>
      </section>
    </TrustPage>
  );
}

