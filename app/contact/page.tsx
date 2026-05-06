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
          . The form above helps us route and track feedback so we can improve the site faster.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          <strong>Home service needs:</strong> Each{" "}
          <Link href="/services" className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover">
            service guide
          </Link>{" "}
          includes a short request form so you can describe the job and your contact details. You can also reach providers directly from the{" "}
          <Link href="/best" className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover">
            Best Of
          </Link>{" "}
          directory (websites and maps). We do not schedule appointments from this contact page.
        </p>
      </section>
    </TrustPage>
  );
}
