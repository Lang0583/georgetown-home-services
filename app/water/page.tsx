import SourceBlock from "@/components/water/SourceBlock";
import WaterCtaRow from "@/components/water/WaterCtaRow";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import {
  PLANTS,
  WATER_SPEC,
  formatUsd,
  plantGpg,
  plantMgL,
  usgsHardRange,
  usgsVeryHardThreshold,
} from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water";

const south = PLANTS.southlake;
const park = PLANTS.park;

export const metadata = pageSeoMetadata({
  titleSegment: "Georgetown Water Hardness by Plant",
  description:
    "Georgetown treats water at more than one plant, and the hardness is not the same. City published numbers, both bands, and what they mean before you buy a softener.",
  pathname: PATH,
  ogType: "website",
});

export default function WaterHubPage() {
  return (
    <WaterPageFrame
      title="Georgetown water is hard. How hard depends on which plant serves you."
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: PATH, label: "Water hardness" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        There is no single hardness number for Georgetown. The city treats water at more than one plant, and the
        finished water coming out of them is not the same.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">From the city&apos;s own published numbers:</p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Water from {south.proseLabel} runs {plantMgL(south)} of hardness as calcium carbonate. That is roughly{" "}
        {plantGpg(south)}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Water from {park.proseLabel} runs {plantMgL(park)}. That is roughly {plantGpg(park)}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        USGS calls anything from {usgsHardRange()} hard, and anything above {usgsVeryHardThreshold()} very hard. So one
        side of town sits at the top of the hard range, and the other sits well into very hard at close to double the
        mineral load. Same city, same water bill, different water.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Why the gap matters before you spend money</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Softener sizing is arithmetic, and grains per gallon is the input. Get the input wrong and everything downstream
        is wrong.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Size a unit for {park.gpgHigh} grains when your house is actually on {south.gpgLow} and you bought more capacity
        than you need and you will run more salt through it than you need. Size for {south.gpgLow} when you are actually
        on {park.gpgHigh} and the unit regenerates far more often than it was built to, which burns salt, burns water,
        and shortens resin life.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        A salesman standing in your kitchen does not know which plant is feeding your street unless he asks. Most do
        not ask.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Find out which band you are in</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Start with the free lookup. Tell us your street and we tell you which band the city numbers put you in, or we
        tell you honestly that we cannot pin it and show you both.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        If you want the math done for your house, the paid spec is {formatUsd(WATER_SPEC.priceUsd)}. It takes your band,
        your household size, and your current setup, runs the sizing formula in front of you instead of hiding it, and
        gives you the questions to ask before you sign anything.
      </p>
      <WaterCtaRow showLookup showSpec />

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What we are not going to tell you</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Hard water is not unsafe water. Hardness is calcium and magnesium. It is a scale and appliance problem, not a
        contamination problem, and the city publishes its compliance reports separately.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        If someone knocks on your door, runs a quick test in your sink, and tells you your water is dangerous, that is a
        sales script. We do not do that, and neither should anyone we would list.
      </p>

      <SourceBlock includeUsgsNote />
    </WaterPageFrame>
  );
}
