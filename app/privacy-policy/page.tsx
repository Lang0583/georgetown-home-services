import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Privacy Policy",
  description: "Privacy policy for Georgetown Home Services.",
  pathname: "/privacy-policy",
  ogType: "website",
});

export default function PrivacyPolicyPage() {
  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/privacy-policy",
            name: "Privacy Policy",
            description: "Privacy policy for Georgetown Home Services.",
          })}
        />
      }
      eyebrow="Legal"
      title="Privacy Policy"
      description={
        <>
          This policy explains what data we collect and how we use it. Georgetown Home Services is a directory and homeowner guide—users contact
          providers directly.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Information we collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Newsletter signups: email address and optional first name (if you submit them).</li>
          <li>Basic analytics/usage data may be collected by the hosting platform to operate the site.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How we use information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>To send low-frequency homeowner emails if you opt in.</li>
          <li>To maintain and improve site content and usability.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Third-party links</h2>
        <p className="mt-3">
          Directory pages link out to provider websites and map listings. Those sites have their own privacy policies. We don’t control how third
          parties collect or use data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Contact</h2>
        <p className="mt-3">For privacy-related requests, contact us via the email listed on the Contact page.</p>
      </section>
    </TrustPage>
  );
}

