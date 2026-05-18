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
  description:
    "Privacy policy for Georgetown Home Services: data we collect, cookies, Google AdSense & Analytics, affiliate links, and your GDPR/CCPA rights.",
  pathname: "/privacy-policy",
  ogType: "website",
});

export default function PrivacyPolicyPage() {
  const { email } = getContact();
  const host = SITE_URL.replace(/^https?:\/\//, "");

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
          This policy describes how Georgetown Home Services (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
          discloses, and protects information when you use <strong>{host}</strong>. We operate an independent{" "}
          <strong>local home services directory and homeowner guide</strong> focused on Georgetown, Texas. This site is not a
          contractor or dispatch service; you contact listed professionals directly.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Scope and agreement</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          By using the site, you acknowledge this policy. If you do not agree, please do not use the site. Where required by
          law, we rely on consent or other lawful bases described below. This policy is designed to support common
          obligations under the <strong>General Data Protection Regulation (GDPR)</strong> for individuals in the EEA/UK and
          the <strong>California Consumer Privacy Act (CCPA)</strong> / <strong>California Privacy Rights Act (CPRA)</strong>{" "}
          for California residents, without waiving protections available in other jurisdictions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Data we collect</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We collect information in three broad ways: you provide it, our systems generate it when you browse, and partners
          help us measure traffic or serve ads.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Contact and forms:</strong> name, email address, phone number, message text, service or neighborhood
            selections, and similar fields shown on the form you submit. We use this to respond, operate the directory, and
            keep a limited operational record (for example append-only server logs).
          </li>
          <li>
            <strong>Site feedback:</strong> topic, message, and optional contact details when you use our feedback flow.
          </li>
          <li>
            <strong>Storm / inspection lead requests:</strong> fields on optional contractor follow-up forms (for example
            name, phone, neighborhood, and trade) transmitted to operational email inboxes.
          </li>
          <li>
            <strong>Newsletter:</strong> email address and optional name if you subscribe to guides or updates.
          </li>
          <li>
            <strong>Technical and usage data:</strong> IP address, approximate location derived by analytics or ad partners,
            device and browser type, pages viewed, referring URLs, and timestamps. Some of this arrives via cookies or
            similar technologies (see below).
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We do <strong>not</strong> use form submissions or feedback to train third-party artificial intelligence models for
          unrelated vendors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Cookies and similar technologies</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We and our partners may use cookies, pixels, local storage, mobile advertising IDs (where applicable), and
          server-side measurement. These technologies may:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Strictly necessary:</strong> deliver pages, remember security or rate-limiting needs, and support basic
            site function.
          </li>
          <li>
            <strong>Analytics (Google Analytics 4):</strong> help us understand aggregate traffic and improve content.
          </li>
          <li>
            <strong>Advertising (Google AdSense and ad partners):</strong> serve and measure ads, limit how often you see an
            ad, and support personalization where allowed by your settings and applicable law.
          </li>
          <li>
            <strong>Affiliate or referral tracking:</strong> some outbound links may include parameters so an affiliate
            network or partner can attribute a click or conversion to this site. Those partners may set their own cookies.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          You can control cookies through your browser (block, delete, or prompt) and through industry tools linked in the
          advertising sections below. Blocking some cookies may limit analytics or ad features.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How we use information (purposes)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>Operate, secure, debug, and improve the site and directory content.</li>
          <li>Respond to questions, corrections, and verifiable provider updates.</li>
          <li>Send transactional or subscribed emails you have requested.</li>
          <li>Detect abuse, spam, and fraud; enforce rate limits on forms.</li>
          <li>Comply with law, respond to lawful requests, and protect rights and safety.</li>
          <li>Measure readership and ad performance in aggregate.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Legal bases (GDPR / UK GDPR)</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Where the GDPR or UK GDPR applies, we process personal data on one or more of these bases:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Contract / pre-contract:</strong> responding when you ask us to take steps at your request (for example
            handling a correction note).
          </li>
          <li>
            <strong>Legitimate interests:</strong> running a sustainable publisher (analytics, security, spam prevention,
            improving guides)—balanced against your rights.
          </li>
          <li>
            <strong>Consent:</strong> where required for non-essential cookies or marketing, or where we explicitly ask
            (unsubscribe options apply where offered).
          </li>
          <li>
            <strong>Legal obligation:</strong> where we must retain or disclose information to comply with law.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Third-party advertising disclosure</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We use <strong>Google AdSense</strong> and related Google advertising products on some pages. Google and its
          partners may use cookies or similar technologies to serve ads based on your visits to this site and other sites,
          to measure ad performance, and to personalize ads subject to your choices and applicable law.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Learn how Google uses data from partner sites in{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy &amp; Terms (partner sites)
          </a>
          . You may adjust personalized ads at{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . Industry opt-out resources include the{" "}
          <a
            href="https://optout.aboutads.info/"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digital Advertising Alliance
          </a>{" "}
          (US) and the{" "}
          <a
            href="https://youronlinechoices.eu/"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Your Online Choices
          </a>{" "}
          (EU).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Google Analytics</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We use <strong>Google Analytics 4</strong> to understand aggregate traffic (pages viewed, navigation patterns, and
          general device/region data). Google&apos;s policy:{" "}
          <a
            href="https://policies.google.com/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/privacy
          </a>
          .
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Browser opt-out tool:{" "}
          <a
            href={GA_OPT_OUT_URL}
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {GA_OPT_OUT_URL}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Affiliate links</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Some pages include <strong>affiliate or referral links</strong> to third-party products, services, or programs.
          When you click an affiliate link, the destination may receive information typical of any web request (including
          referrer URL) plus tracking parameters that help the partner attribute the click to this site. Affiliate
          relationships do not change our editorial duty to label sponsored material where we present paid placements;
          always read the third party&apos;s privacy policy before you submit personal data there.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Sharing and processors</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We share information with service providers who process data on our behalf, including hosting, email delivery
          (for example <strong>Resend</strong> for operational messages), analytics (Google), advertising (Google), and
          security vendors. We do not sell your personal information for money. Where an activity could constitute a
          &quot;sale&quot; or &quot;sharing&quot; for targeted advertising under US state laws, we provide opt-out and notice
          rights below for residents who qualify.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Directory pages link to provider websites, maps, and other third parties—we do not control their practices.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Retention</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We retain personal data only as long as needed for the purposes above, including resolving disputes and satisfying
          legal obligations. Server-side feedback or contact logs may be kept in append-only stores for operational
          troubleshooting; marketing lists persist until you unsubscribe where applicable. Aggregate analytics may be retained
          longer in non-identifying form.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Security</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We use commercially reasonable technical and organizational measures appropriate to the nature of a small
          publisher. No method of transmission over the Internet is completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">International transfers</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We are based in the United States. If you access the site from outside the US, your information may be processed
          in the US or other countries where our vendors operate. Where GDPR requires safeguards for transfers from the
          EEA/UK, we rely on appropriate mechanisms offered by vendors (such as standard contractual clauses) where
          applicable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Your privacy rights</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Depending on where you live, you may have rights to access, correct, delete, port, or restrict certain processing
          of your personal data, and to object to processing based on legitimate interests. You may also withdraw consent
          where processing is consent-based, without affecting prior lawful processing.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          <strong>California residents:</strong> You may have the right to know categories and specific pieces of personal
          information we collect, the categories of sources, business or commercial purposes, and categories of third parties
          with whom information is disclosed. You may request deletion of personal information we collected from you,
          subject to exceptions. You may opt out of &quot;sale&quot; or &quot;sharing&quot; of personal information for
          cross-context behavioral advertising where those terms apply. We do not use sensitive personal information for
          inferring characteristics to the extent prohibited by CPRA. You will not receive discriminatory treatment for
          exercising CPRA rights.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          To submit a request, email us at the address below with enough detail to verify your request. You may designate an
          agent where your state law allows; we may require proof of authorization.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Children&apos;s privacy</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          The site is intended for adults making homeowner decisions. We do not knowingly collect personal information from
          children under 13 (or the age required by local law). If you believe we have collected a child&apos;s data, contact
          us and we will take appropriate steps to delete it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Contact for privacy requests</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          For privacy-related questions, data subject requests (including GDPR/CCPA requests), or to appeal a decision on a
          request where applicable, contact:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            Email:{" "}
            <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </li>
          <li>
            Web:{" "}
            <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
              Contact page
            </Link>
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We will respond within the timeframes required by applicable law. EU/UK individuals may also lodge a complaint
          with their local supervisory authority.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Updates</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We may update this policy to reflect legal, technical, or business changes. When we do, we will revise the
          &quot;Last updated&quot; date below. Where required, we will provide additional notice. Continued use after updates
          constitutes acceptance unless applicable law requires express consent.
        </p>
        <p className="mt-3 text-sm text-gray-600">Last updated: May 5, 2026</p>
      </section>
    </TrustPage>
  );
}
