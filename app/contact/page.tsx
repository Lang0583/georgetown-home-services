import type { Metadata } from "next";
import TrustPage from "../../components/templates/TrustPage";
import { getBrandName, getContact } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Georgetown Home Services. For service availability and pricing, contact providers directly from the directory.",
};

export default function ContactPage() {
  const brand = getBrandName();
  const contact = getContact();
  return (
    <TrustPage
      eyebrow="Contact"
      title={`Contact ${brand}`}
      description={<>Questions about this site, corrections, or partnership inquiries are welcome.</>}
    >
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="text-sm font-semibold text-gray-900">Email</div>
        <div className="mt-2 text-sm text-gray-700">
          <a className="font-semibold text-blue-700 hover:underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          If you need to schedule a repair or request an estimate, please contact providers directly from the Best Of directory pages. We don’t take
          service requests or route jobs.
        </p>
      </section>
    </TrustPage>
  );
}

