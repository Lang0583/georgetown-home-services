import type { Metadata } from "next";
import Link from "next/link";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBrandName } from "../../lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "About Georgetown Home Services",
  description:
    "Georgetown Home Services is a homeowner guide and provider directory for Georgetown, Texas—helping you compare companies and make better hiring decisions.",
  pathname: "/about",
  ogType: "website",
});

export default function AboutPage() {
  const brand = getBrandName();
  return (
    <TrustPage
      eyebrow="About"
      title={`About ${brand}`}
      description={
        <>
          {brand} is a directory and homeowner education site focused on Georgetown, TX. We publish service guides, comparison pages, and practical
          checklists to help you choose who to contact—and what questions to ask—before you hire.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we are</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>A Georgetown-focused guide to common plumbing, HVAC, and roofing decisions.</li>
          <li>A provider directory that helps you compare companies using publicly available information.</li>
          <li>A low-maintenance resource designed to be useful months after publishing (checklists, cost drivers, and hiring questions).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we are not</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>We are not a contractor and we don’t perform home services.</li>
          <li>We do not take service requests, dispatch providers, or schedule appointments.</li>
          <li>We do not guarantee pricing, availability, licensing, or insurance status.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Where to start</h2>
        <p className="mt-3">
          If you’re ready to compare companies, start with the{" "}
          <Link href="/best" className="font-semibold text-blue-700 hover:underline">
            provider directory
          </Link>
          . If you’re still diagnosing, start with{" "}
          <Link href="/services" className="font-semibold text-blue-700 hover:underline">
            service guides
          </Link>
          .
        </p>
      </section>
    </TrustPage>
  );
}

