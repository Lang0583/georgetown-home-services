import Link from "next/link";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlumberCta from "@/components/water/WaterPlumberCta";
import { PLANTS, plantGpg, plantMgL, type WaterPlant, type WaterPlantKey } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const PLANT_META: Record<
  WaterPlantKey,
  { titleSegment: string; description: string; h1: string }
> = {
  southlake: {
    titleSegment: "Lake Georgetown and Southlake WTP Hardness",
    description:
      "Water hardness for homes served by Lake Georgetown and Southlake WTP, cited from Georgetown Utility Systems, with USGS class and plumber directory links.",
    h1: "Lake Georgetown and Southlake WTP",
  },
  park: {
    titleSegment: "Park Plant and Southside WTP Hardness",
    description:
      "Water hardness for homes served by Park Plant and Southside WTP, cited from Georgetown Utility Systems, with USGS class and plumber directory links.",
    h1: "Park Plant and Southside WTP",
  },
};

export function plantPageMetadata(key: WaterPlantKey) {
  const plant = PLANTS[key];
  const meta = PLANT_META[key];
  return pageSeoMetadata({
    titleSegment: meta.titleSegment,
    description: meta.description,
    pathname: `/water/${plant.slug}`,
    ogType: "website",
  });
}

export default function WaterPlantPage({
  plantKey,
  lastReviewed,
}: {
  plantKey: WaterPlantKey;
  lastReviewed: string;
}) {
  const plant: WaterPlant = PLANTS[plantKey];
  const otherKey: WaterPlantKey = plantKey === "southlake" ? "park" : "southlake";
  const other = PLANTS[otherKey];
  const meta = PLANT_META[plantKey];

  return (
    <WaterPageFrame
      title={meta.h1}
      lastReviewed={lastReviewed}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: `/water/${plant.slug}`, label: plant.label },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Georgetown Utility Systems lists hardness for {plant.label} as {plantMgL(plant)}, about {plantGpg(plant)}. USGS
        class for that band is {plant.usgsClass}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        That is plant-level published data, not a test of a single street. Confirm which plant serves the house with
        Georgetown Utility Systems before you size a softener or blame a water heater on the wrong range. The other
        published system is{" "}
        <Link href={`/water/${other.slug}`} className="font-semibold text-brand hover:underline">
          {other.label}
        </Link>{" "}
        at {plantMgL(other)} ({plantGpg(other)}, {other.usgsClass}).
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">What hardness does in the house</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Hardness is not a health classification. It shows up as scale on heating elements, spots on glass, extra soap
          demand, and sediment in water heaters. A plumber diagnoses fixtures, heaters, and leaks. A Water Treatment
          Specialist, where licensed, designs treatment. Those are different licenses.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Next reads</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            <Link href="/water/chloramine-and-resin" className="font-semibold text-brand hover:underline">
              Chloramine and resin
            </Link>
          </li>
          <li>
            <Link href="/water/spec-what-you-get" className="font-semibold text-brand hover:underline">
              What a written spec should include
            </Link>
          </li>
          <li>
            <Link href="/plumbing" className="font-semibold text-brand hover:underline">
              Plumbing in Georgetown
            </Link>
          </li>
        </ul>
      </section>

      <WaterPlumberCta />
    </WaterPageFrame>
  );
}
