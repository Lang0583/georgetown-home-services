import Link from "next/link";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterSpecThankYouTracker from "@/components/water/WaterSpecThankYouTracker";
import { GALLONS_PER_PERSON_PER_DAY, WATER_SPEC, formatUsd } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";
import { getContact } from "@/lib/site-content";

const LAST_REVIEWED = "2026-09-18";
const PATH = "/water/spec/thank-you";

export const metadata = pageSeoMetadata({
  titleSegment: `Thanks for the ${formatUsd(WATER_SPEC.priceUsd)} water spec`,
  description:
    "Payment received. Your written Georgetown water softener sizing spec is on the way to the email you used at checkout.",
  pathname: PATH,
  ogType: "website",
  noindex: true,
});

export default function WaterSpecThankYouPage() {
  const contact = getContact();
  return (
    <WaterPageFrame
      title="Your written spec is on the way"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: "/water/spec", label: "Spec" },
        { href: PATH, label: "Thank you" },
      ]}
    >
      <WaterSpecThankYouTracker />
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Payment received. Your written water softener sizing spec is on the way to the email you used
        at checkout.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What you get</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
        <li>The plant band you selected (or both if you were not sure)</li>
        <li>
          Grains per day and capacity targets using grains per gallon times people times{" "}
          {GALLONS_PER_PERSON_PER_DAY} gallons, then times days between regenerations
        </li>
        <li>Valve and chloramine notes, plus 8 questions to ask a contractor</li>
      </ul>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
        Georgetown Home Services does not install, sell financing, or knock on doors. We are not the
        City of Georgetown.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        If the PDF is not in your inbox within about 15 minutes, check spam. Still missing? Reply to
        the Stripe receipt or email{" "}
        <a className="font-semibold text-brand hover:underline" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>{" "}
        with your payment email and we will resend.
      </p>
      <p className="mt-6">
        <Link href="/water/spec" className="font-semibold text-brand hover:underline">
          Back to plant lookup
        </Link>
      </p>
    </WaterPageFrame>
  );
}
