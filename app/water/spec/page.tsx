import Link from "next/link";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlantLookup from "@/components/water/WaterPlantLookup";
import { PLANTS, WATER_SPEC, formatUsd } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-18";
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
        Pick which plant serves the house and we will show the published hardness band. If you are not
        sure, we show both. We will not invent a middle number.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        The {formatUsd(WATER_SPEC.priceUsd)} written spec form is coming next. Until that checkout is
        ready,{" "}
        <Link href="/water/spec-what-you-get" className="font-semibold text-brand hover:underline">
          read what the spec includes
        </Link>
        .
      </p>

      <WaterPlantLookup />

      <section
        id="paid-spec"
        className="mt-10 scroll-mt-28 rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm md:p-8"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Written spec ({formatUsd(WATER_SPEC.priceUsd)})
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          The paid form is coming next. It will take your household size and print the sizing math for
          the band you picked, or both bands if you were not sure. We will not average the plants.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Georgetown Home Services is a private local directory and spec tool. We are not the City of
          Georgetown Water Utility and we do not install softeners, sell financing, or knock on doors.
        </p>
        <p className="mt-4">
          <Link href="/water/spec-what-you-get" className="font-semibold text-brand hover:underline">
            Read what you get in the {formatUsd(WATER_SPEC.priceUsd)} spec
          </Link>
        </p>
      </section>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        Numbers come from the city&apos;s published plant bands. See{" "}
        <Link href="/water/how-we-source" className="font-semibold text-brand hover:underline">
          how we source
        </Link>
        , the{" "}
        <Link href={`/water/${PLANTS.southlake.slug}`} className="font-semibold text-brand hover:underline">
          Southlake plant page
        </Link>
        , and the{" "}
        <Link href={`/water/${PLANTS.park.slug}`} className="font-semibold text-brand hover:underline">
          Park plant page
        </Link>
        .
      </p>
    </WaterPageFrame>
  );
}
