import WaterPageFrame from "@/components/water/WaterPageFrame";
import {
  PLANTS,
  SYSTEM_RANGES,
  USGS_BANDS,
  WATER_SOURCE,
  formatArticleId,
  formatMglPerGrain,
  plantMgL,
} from "@/data/water";
import { formatLastUpdatedDisplay } from "@/lib/last-updated";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/how-we-source";
const south = PLANTS.southlake;
const park = PLANTS.park;
const soft = USGS_BANDS[0];
const moderatelyHard = USGS_BANDS[1];
const hard = USGS_BANDS[2];
const veryHard = USGS_BANDS[3];

export const metadata = pageSeoMetadata({
  titleSegment: "Where Our Georgetown Water Numbers Come From",
  description:
    "Every hardness number on this site comes from the City of Georgetown's published data. Here are the exact pages, the dates, and the things we refuse to do.",
  pathname: PATH,
  ogType: "website",
});

export default function HowWeSourceWaterPage() {
  return (
    <WaterPageFrame
      title="Where these numbers come from"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "How we source" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Every hardness figure on this site traces back to the City of Georgetown&apos;s own published data. We do not
        run a lab. We do not test your tap. We read what the utility publishes and we do the arithmetic in front of you.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">The two pages we use</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        City of Georgetown Ask GTX knowledgebase article {formatArticleId()}, updated{" "}
        {formatLastUpdatedDisplay(WATER_SOURCE.updated)}:{" "}
        <a
          href={WATER_SOURCE.articleUrl}
          className="font-semibold text-brand hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {WATER_SOURCE.articleUrl}
        </a>
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        That article is where the plant by plant hardness comes from. Water from {south.proseLabel} is listed at{" "}
        {plantMgL(south)} as calcium carbonate. Water from {park.proseLabel} is listed at {plantMgL(park)}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        City of Georgetown water utility reports:{" "}
        <a
          href={WATER_SOURCE.reportsUrl}
          className="font-semibold text-brand hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {WATER_SOURCE.reportsUrl}
        </a>
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        That hub is where the utility posts its regular reporting.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">The other numbers on that same city page</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        The city publishes these as system ranges. They are not readings for your address and we do not present them
        that way.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Calcium {SYSTEM_RANGES.calcium}. Magnesium {SYSTEM_RANGES.magnesium}. Sodium {SYSTEM_RANGES.sodium}. Sulfate{" "}
        {SYSTEM_RANGES.sulfate}. Total dissolved solids {SYSTEM_RANGES.tds}. Alkalinity {SYSTEM_RANGES.alkalinity}.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">The classification scale</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        {soft.label} is {soft.low} to {soft.high} mg/L. {moderatelyHard.label} is {moderatelyHard.low} to{" "}
        {moderatelyHard.high}. {hard.label} is {hard.low} to {hard.high}. {veryHard.label} is anything above{" "}
        {veryHard.low}.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        That is the USGS scale. It is not our scale and we did not adjust it.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Converting mg/L to grains per gallon</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        One grain per gallon is about {formatMglPerGrain()}. That is the whole conversion. We show it so you can check
        our work rather than take our word for it.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What we will not do</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        We will not average the two plants into a single citywide number. Averaging {south.mglLow} and {park.mglHigh}{" "}
        produces a figure that describes nobody&apos;s house.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We will not use national roll up sites that publish one hardness number for Georgetown. Several of them do. Those
        numbers match neither plant band, and we have no idea what they were derived from.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We will not knock on your door, and we will not run a countertop test in your sink and call it a lab result.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We will not take money from a water treatment company to move them up a page or into a result. Paid placement
        does not exist on this site, in this section or any other.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We will not tell you your water is unsafe. Hardness is a scale problem. Compliance and contaminant reporting is
        the city&apos;s, and it is published on the pages linked above.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">When we do not know</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Some addresses cannot be pinned to one plant from published information. When that happens we say so and show
        both bands rather than picking one to make the answer look cleaner.
      </p>
    </WaterPageFrame>
  );
}
