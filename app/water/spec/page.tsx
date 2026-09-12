import Link from "next/link";
import GhlWaterForm from "@/components/water/GhlWaterForm";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlumberCta from "@/components/water/WaterPlumberCta";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/spec";

export const metadata = pageSeoMetadata({
  titleSegment: "Georgetown Water Spec Intake",
  description:
    "Request a written Georgetown water-treatment spec based on city plant hardness. No door-to-door test and no booking through this directory.",
  pathname: PATH,
  ogType: "website",
});

export default function WaterSpecIntakePage() {
  return (
    <WaterPageFrame
      title="Water spec intake"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Spec intake" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Use this page when you want a written spec that starts from Georgetown Utility Systems plant hardness, not a
        doorstep kit. The form embed ships in a later pass. Until then, read{" "}
        <Link href="/water/spec-what-you-get" className="font-semibold text-brand hover:underline">
          what a written spec should include
        </Link>{" "}
        and compare license-verified plumbers for scale, heaters, and leaks.
      </p>
      <GhlWaterForm />
      <WaterPlumberCta />
    </WaterPageFrame>
  );
}
