import Link from "next/link";
import GhlWaterForm from "@/components/water/GhlWaterForm";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import { WATER_SPEC, formatUsd } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/spec";

export const metadata = pageSeoMetadata({
  titleSegment: `Get the ${formatUsd(WATER_SPEC.priceUsd)} Georgetown Water Spec`,
  description:
    "Free plant lookup and the paid written spec for your Georgetown address, using the city's published plant hardness. No door-to-door test.",
  pathname: PATH,
  ogType: "website",
});

export default function WaterSpecIntakePage() {
  return (
    <WaterPageFrame
      title="Plant lookup and written spec"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Spec" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Tell us your street for the free plant lookup, or request the {formatUsd(WATER_SPEC.priceUsd)} spec with the
        sizing math in writing. Until the form is live, read{" "}
        <Link href="/water/spec-what-you-get" className="font-semibold text-brand hover:underline">
          what the spec includes
        </Link>
        .
      </p>
      <GhlWaterForm />
    </WaterPageFrame>
  );
}
