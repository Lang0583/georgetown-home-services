import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import SiteFeedbackForm from "../../components/SiteFeedbackForm";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBrandName, getContact } from "../../lib/site-content";
import { contactPageJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Contact",
  description:
    "Send feedback or questions about Georgetown Home Services. For repairs and estimates, use service guide request forms or reach providers from the Best Of directory.",
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
      description={<>Questions about this site, corrections, or ideas—we read every message.</>}
    >
      <section className="rounded-xl border border-ink/10 bg-surface-alt/80 p-5 md:p-6">
        <h2 className="text-lg font-semibold text-ink">What to expect when you reach out</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong>Site feedback &amp; corrections:</strong> we route these to editorial review. We cannot respond to
            every note, but we prioritize verifiable factual errors (wrong phone, dead URL, misleading map association).
          </li>
          <li>
            <strong>Urgent home emergencies:</strong> call <strong>911</strong> or a <strong>licensed local provider</strong>{" "}
            directly—this inbox is not monitored for dispatch.
          </li>
          <li>
            <strong>Provider disputes:</strong> if you represent a business, include a plain-English summary plus a link to
            your official site or state license lookup so we can validate before editing copy.
          </li>
        </ul>
      </section>

      <div id="feedback" className="scroll-mt-24">
        <SiteFeedbackForm />
      </div>

      <section className="mt-8 rounded-xl border border-ink/10 bg-surface p-6 shadow-md">
        <div className="text-sm font-semibold text-ink">Email (optional)</div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Prefer email? Reach us at{" "}
          <a className="font-semibold text-brand hover:underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          . The form above helps us route and track feedback so we can improve the site faster.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <strong>Privacy:</strong> Feedback and optional lead forms are handled as described in our{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand underline underline-offset-2 hover:text-brand">
            Privacy Policy
          </Link>
          . We do not sell personal data.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <strong>Home service needs:</strong> Each{" "}
          <Link href="/services" className="font-semibold text-brand underline underline-offset-2 hover:text-brand">
            service guide
          </Link>{" "}
          includes a short request form so you can describe the job and your contact details. You can also reach providers
          directly from the{" "}
          <Link href="/best" className="font-semibold text-brand underline underline-offset-2 hover:text-brand">
            Best Of
          </Link>{" "}
          directory (websites and maps). We do not schedule appointments from this contact page.
        </p>
      </section>
    </TrustPage>
  );
}
