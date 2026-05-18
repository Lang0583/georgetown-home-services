import type { Metadata } from "next";
import Link from "next/link";
import ContactGeneralForm from "../../components/ContactGeneralForm";
import JsonLd from "../../components/JsonLd";
import SiteFeedbackForm from "../../components/SiteFeedbackForm";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBrandName, getContact } from "../../lib/site-content";
import { contactPageJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Contact",
  description:
    "Contact Georgetown Home Services by mail or message. For repairs and estimates, use service guide request forms or reach providers from the directory.",
  pathname: "/contact",
  ogType: "website",
});

export default function ContactPage() {
  const brand = getBrandName();
  const contact = getContact();

  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={contactPageJsonLd({
            name: `Contact ${brand}`,
            description:
              "Contact Georgetown Home Services about the site. For repairs and estimates, use service guide request forms or reach providers from the Best Of directory.",
          })}
        />
      }
      eyebrow="Contact"
      title={`Contact ${brand}`}
      description={<>Questions about this site, privacy, or corrections—we read what you send.</>}
    >
      <section className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">Mailing address</h2>
        <address className="mt-3 not-italic text-sm leading-relaxed text-gray-700">
          <strong>{brand}</strong>
          <br />
          [Street address line]
          <br />
          Georgetown, TX 78628
          <br />
          United States
        </address>
        <p className="mt-3 text-xs leading-relaxed text-gray-600">
          Replace the bracketed line with your real street address before going live. Email remains the fastest way to reach
          us for privacy or data requests—see our{" "}
          <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900">What to expect when you reach out</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>General messages:</strong> use the form below. It is delivered by email to our team.
          </li>
          <li>
            <strong>Site feedback &amp; bug reports:</strong> optional topic form further down helps us route technical notes.
          </li>
          <li>
            <strong>Urgent home emergencies:</strong> call <strong>911</strong> or a <strong>licensed local provider</strong>{" "}
            directly—this inbox is not monitored for dispatch.
          </li>
          <li>
            <strong>Provider disputes:</strong> include a plain-English summary plus a link to your official site or license
            lookup so we can validate before editing copy.
          </li>
        </ul>
      </section>

      <ContactGeneralForm />

      <div id="feedback" className="scroll-mt-24">
        <SiteFeedbackForm />
      </div>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="text-sm font-semibold text-gray-900">Email (optional)</div>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Prefer email? Reach us at{" "}
          <a className="font-semibold text-primary hover:underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          <strong>Privacy:</strong> Messages are handled as described in our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
          >
            Privacy Policy
          </Link>
          . We do not sell personal data.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          <strong>Home service needs:</strong> Each{" "}
          <Link href="/services" className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover">
            service guide
          </Link>{" "}
          includes a short request form so you can describe the job. You can also reach providers directly from the{" "}
          <Link href="/best" className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover">
            provider directory
          </Link>
          . We do not schedule appointments from this contact page.
        </p>
      </section>
    </TrustPage>
  );
}
