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
  formatToRange,
  formatUsd,
  grainCapacity,
  grainsPerDay,
  plantGpg,
  plantMgL,
  usgsHardRange,
} from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const plant = PLANTS.southlake;
const other = PLANTS.park;
const PATH = `/water/${plant.slug}`;
const gpg = plant.gpgHigh;
const four = SIZING_EXAMPLES.peopleFour;
const two = SIZING_EXAMPLES.peopleTwo;
const fourDays = SIZING_EXAMPLES.regenDaysHigh;
const fourPerDay = grainsPerDay(gpg, four);
const twoPerDay = grainsPerDay(gpg, two);
const fourCap = grainCapacity(gpg, four, fourDays);
const twoCap = grainCapacity(gpg, two, fourDays);

export const metadata = pageSeoMetadata({
  titleSegment: `Lake Georgetown and Southlake Plant Water Hardness (${plantMgL(plant)})`,
  description: `If your water comes from Lake Georgetown and the Southlake plant, hardness runs ${plantMgL(plant)}, about ${plantGpg(plant)}. What that means for scale, softeners, and quotes.`,
  pathname: PATH,
  ogType: "website",
});

export default function GeorgetownSouthlakeWaterPage() {
  return (
    <WaterPageFrame
      title={`Lake Georgetown and Southlake plant water: ${plantMgL(plant)}`}
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Southlake plant" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        That works out to roughly {plantGpg(plant)}. On the USGS scale that lands in the hard band, which runs{" "}
        {usgsHardRange()}, and it sits right at the top of it.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        The other side of the city, served by the Park plant and Southside plant, runs {plantMgL(other)}. If you have
        been reading advice written for Georgetown generally, some of it was written for water almost twice as hard as
        yours.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
        What {formatToRange(plant.gpgLow, plant.gpgHigh)} grains actually does in a house
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        You will still see it. Spotting on glass and stainless, white crust at the aerators and the shower head, more
        soap and detergent than a soft water house needs, and scale slowly building inside the water heater.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        What you probably will not see at this level is the dramatic stuff a door knocker describes. At {plantGpg(plant)},
        plenty of houses in this part of town run for years on nothing but a decent water heater flush schedule and
        vinegar on the fixtures.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">When a softener is actually worth it here</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        It moves from optional toward worth it when you have a tankless water heater, which is far less forgiving of
        scale than a tank unit, when you have a large household running high daily volume, or when you have already
        replaced a heating element or a fixture because of scale.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        It is closer to optional when it is one or two people in the house, you have a standard tank heater, and the
        only complaint is spotting on the glassware.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        That is the honest read. We do not sell or install softeners, so there is no version of this where the answer is
        always yes.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">The sizing math, shown</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Grains per day is your hardness in grains per gallon times the number of people times {GALLONS_PER_PERSON_PER_DAY}{" "}
        gallons per person per day.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Capacity needed between regenerations is grains per day times the number of days you want between regenerations,
        which is typically {SIZING_EXAMPLES.regenDaysLow} to {SIZING_EXAMPLES.regenDaysHigh}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Four people at {gpg} grains per gallon: {gpg} times {four} times {GALLONS_PER_PERSON_PER_DAY} equals{" "}
        {formatInt(fourPerDay)} grains per day. At {fourDays} days between regenerations that is {formatInt(fourCap)}{" "}
        grains of capacity.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Two people at {gpg} grains per gallon: {formatInt(twoPerDay)} grains per day, or {formatInt(twoCap)} grains at{" "}
        {fourDays} days.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We use the high end of the published band on purpose. If a quote you are handed uses a much bigger hardness
        number than {gpg}, ask where it came from.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Eight questions to ask before you sign</h2>
      <WaterQuoteQuestions />

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Next steps</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Get the {formatUsd(WATER_SPEC.priceUsd)} spec and we run the numbers above for your house, in writing, with the
        sources printed.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        If you would rather just talk to someone licensed, our plumbing listings are verified against the Texas State
        Board of Plumbing Examiners before they go up, and nobody pays to be on the list.
      </p>
      <WaterCtaRow showSpec showPlumbers />

      <SourceBlock />
    </WaterPageFrame>
  );
}
