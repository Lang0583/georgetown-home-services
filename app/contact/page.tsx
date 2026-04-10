import type { Metadata } from "next";
import Link from "next/link";
import TrustPage from "../../components/templates/TrustPage";
import { getBrandName, getContact } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Georgetown Home Services about the site. For repairs and estimates, use service guide request forms or reach providers from the Best Of directory.",
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
          <strong>Home service needs:</strong> Each{" "}
          <Link href="/services" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
            service guide
          </Link>{" "}
          includes a short request form so you can describe the job and your contact details. You can also reach providers directly from the{" "}
          <Link href="/best" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
            Best Of
          </Link>{" "}
          directory (websites and maps). This contact email is for questions about the site, listing corrections, and partnership inquiries—not for
          scheduling specific appointments.
        </p>
      </section>
    </TrustPage>
  );
}

