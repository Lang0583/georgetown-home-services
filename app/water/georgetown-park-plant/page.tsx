import Link from "next/link";
import SourceBlock from "@/components/water/SourceBlock";
import WaterCtaRow from "@/components/water/WaterCtaRow";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterQuoteQuestions from "@/components/water/WaterQuoteQuestions";
import {
  GALLONS_PER_PERSON_PER_DAY,
  PLANTS,
  SIZING_EXAMPLES,
  WATER_SPEC,
  formatInt,
  formatUsd,
  grainCapacity,
  grainsPerDay,
  plantGpg,
  plantMgL,
  usgsVeryHardThreshold,
} from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const plant = PLANTS.park;
const other = PLANTS.southlake;
const PATH = `/water/${plant.slug}`;
const gpg = plant.gpgHigh;
const four = SIZING_EXAMPLES.peopleFour;
const two = SIZING_EXAMPLES.peopleTwo;
const threeDays = SIZING_EXAMPLES.regenDaysLow;
const fourDays = SIZING_EXAMPLES.regenDaysHigh;
const fourPerDay = grainsPerDay(gpg, four);
const twoPerDay = grainsPerDay(gpg, two);
const fourCapThree = grainCapacity(gpg, four, threeDays);
const fourCapFour = grainCapacity(gpg, four, fourDays);
const twoCapFour = grainCapacity(gpg, two, fourDays);

export const metadata = pageSeoMetadata({
  titleSegment: `Park Plant and Southside Plant Water Hardness (${plantMgL(plant)})`,
  description: `Park plant and Southside plant water runs ${plantMgL(plant)}, about ${plantGpg(plant)}, which is very hard. Sizing math, the undersizing trap, and what to ask before you buy.`,
  pathname: PATH,
  ogType: "website",
});

export default function GeorgetownParkPlantWaterPage() {
  return (
    <WaterPageFrame
      title={`Park plant and Southside plant water: ${plantMgL(plant)}`}
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Park plant" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        That is roughly {plantGpg(plant)}. The USGS scale calls anything above {usgsVeryHardThreshold()} very hard, so
        this is not a borderline case. It is nearly double the {plantMgL(other)} the city reports for water from{" "}
        {other.proseLabel}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        If you moved here from the other side of town and your old house never seemed to have a problem, this is why.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What {gpg} grains does in a house</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Scale builds fast. Aerators and shower heads crust over, glass doors film up quickly after cleaning, water
        heaters collect sediment faster, and a tankless unit without protection is on a clock.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        At this level, a softener is usually the right call rather than a luxury. That is not a sales line. It is what
        the number says.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">The sizing math, shown</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Grains per day is your hardness in grains per gallon times the number of people times {GALLONS_PER_PERSON_PER_DAY}{" "}
        gallons per person per day.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Capacity needed between regenerations is grains per day times the number of days you want between regenerations,
        which is typically {threeDays} to {fourDays}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Four people at {gpg} grains per gallon: {gpg} times {four} times {GALLONS_PER_PERSON_PER_DAY} equals{" "}
        {formatInt(fourPerDay)} grains per day. That is {formatInt(fourCapThree)} grains at {threeDays} days, or{" "}
        {formatInt(fourCapFour)} grains at {fourDays} days.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Two people at {gpg} grains per gallon: {formatInt(twoPerDay)} grains per day, which is {formatInt(twoCapFour)}{" "}
        grains at {fourDays} days.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We use the high end of the published band on purpose.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">The undersizing trap</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Two things get people here.</p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        First, the grain rating printed on a unit assumes a heavy salt dose. Run it at a more efficient salt setting,
        which is what most installers program, and the usable capacity is lower than the sticker. If your math lands
        right at the edge of a unit&apos;s rating, you are already undersized in practice.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Second, an undersized unit does not fail loudly. It just regenerates more often than it was designed to. You pay
        for that in salt, in water down the drain, and in resin that wears out years early.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Going much larger than the math is not free either. A unit so oversized that it sits a week or more between
        regenerations is its own problem. The point is to land the math deliberately, not to let the number be picked
        for you.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Chloramines shorten resin life here too</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Georgetown typically uses chloramines as its disinfectant, and the city describes periodic conversions to free
        chlorine. Both are hard on ion exchange resin over time, and a standard carbon prefilter rated for chlorine is
        not the same thing as one rated for chloramines. More detail on that{" "}
        <Link href="/water/chloramine-and-resin" className="font-semibold text-brand hover:underline">
          here
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Eight questions to ask before you sign</h2>
      <WaterQuoteQuestions />

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Next steps</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        The {formatUsd(WATER_SPEC.priceUsd)} spec runs your numbers, prints the formula, and gives you the checklist in a
        form you can hand to a contractor.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Our plumbing listings are verified against the Texas State Board of Plumbing Examiners before they go up, and
        nobody pays to be on the list.
      </p>
      <WaterCtaRow showSpec showPlumbers />

      <SourceBlock />
    </WaterPageFrame>
  );
}
