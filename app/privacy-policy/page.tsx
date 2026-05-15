import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata, SITE_URL } from "../../lib/page-seo";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";
import { getContact } from "../../lib/site-content";

const GA_OPT_OUT_URL = "https://tools.google.com/dlpage/gaoptout";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Privacy Policy",
  description: "Privacy policy for Georgetown Home Services, including Google AdSense and Google Analytics.",
  pathname: "/privacy-policy",
  ogType: "website",
});

export default function PrivacyPolicyPage() {
  const { email } = getContact();
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
          This policy describes how Georgetown Home Services (&quot;we,&quot; &quot;us&quot;) collects, uses, and shares
          information when you use {SITE_URL.replace(/^https?:\/\//, "")}. We operate a local directory and homeowner
          guide; you contact service providers directly.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Storm / inspection lead requests</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Some pages include an optional form to request <strong>follow-up from local contractors</strong> after storms or
          for roof/HVAC questions. When you submit, we collect the fields shown on the form (for example name, phone,
          neighborhood, and service type) and transmit them to operational email inboxes so a human can respond—see our{" "}
          <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
            Contact
          </Link>{" "}
          page for limitations. We do not use those messages to train third-party models.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Site feedback storage</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Feedback you submit through the contact page may be logged in a secure server-side store (for example append-only
          JSON lines) so we can reproduce bugs or confirm corrections. Retention is operational, not for resale.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Children&apos;s privacy</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          The site is intended for adults making homeowner decisions. We do not knowingly collect personal information from
          children under 13.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Google AdSense and advertising</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We use <strong>Google AdSense</strong> to show ads on some pages. Google and its partners may use cookies or
          similar technologies to serve ads based on your visits to this site and other sites, to measure ad performance,
          and to personalize content and ads. You can learn how Google uses data when you use our site in{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy &amp; Terms
          </a>
          . You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Google Analytics</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We use <strong>Google Analytics 4</strong> to understand aggregate traffic (for example, which pages are viewed
          and how the site is used). Analytics may set cookies or use device identifiers subject to{" "}
          <a
            href="https://policies.google.com/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          You can opt out of Google Analytics in your browser using Google&apos;s tool:{" "}
          <a
            href={GA_OPT_OUT_URL}
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {GA_OPT_OUT_URL}
          </a>
          . You can also use browser settings to block or delete cookies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Cookies and similar technologies</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          In addition to Google services above, our hosting and fonts may use standard technologies needed to run the
          site. You can control cookies through your browser. Blocking some cookies may affect how ads or analytics work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Information we collect directly</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Newsletter:</strong> if you sign up, we collect your email address and optional first name to send the
            requested guides or updates.
          </li>
          <li>
            <strong>Contact:</strong> if you email us, we receive what you send.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How we use information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>To operate, secure, and improve the site and content.</li>
          <li>To send emails you have opted into.</li>
          <li>To respond to questions you send us.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Third-party links</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Directory pages link to provider websites, maps, and other third parties. Those sites have their own privacy
          practices. We do not control how they collect or use data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          For privacy-related requests, contact us at{" "}
          <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${email}`}>
            {email}
          </a>
          . You can also use our{" "}
          <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Updates</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We may update this policy from time to time. The &quot;Last updated&quot; note on this page will change when we
          do. Continued use of the site after changes means you accept the updated policy.
        </p>
        <p className="mt-3 text-sm text-gray-600">Last updated: May 2026</p>
      </section>
    </TrustPage>
  );
}
