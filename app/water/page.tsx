import Link from "next/link";
import FAQList from "@/components/FAQList";
import FAQSchema from "@/components/FAQSchema";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlantTable from "@/components/water/WaterPlantTable";
import WaterPlumberCta from "@/components/water/WaterPlumberCta";
import {
  PLANTS,
  SYSTEM_RANGES,
  USGS_BANDS,
  formatGallonsPerPersonPerDay,
  formatMglPerGrain,
  formatUsgsBand,
  plantGpg,
  plantMgL,
} from "@/data/water";
import { pageSeoMetadata, absolutePageUrl } from "@/lib/page-seo";
import type { Faq } from "@/lib/site-content";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water";

export const metadata = pageSeoMetadata({
  titleSegment: "Georgetown TX Water Hardness by Treatment Plant",
  description:
    "Georgetown tap water hardness from Georgetown Utility Systems: Southlake versus Park Plant figures, USGS class, mineral ranges, and how we source the numbers.",
  pathname: PATH,
  ogType: "website",
});

function waterFaqs(): Faq[] {
  const south = PLANTS.southlake;
  const park = PLANTS.park;
  return [
    {
      q: "How hard is Georgetown tap water?",
      a: `It depends on the treatment plant that serves the address. ${south.label} publishes ${plantMgL(south)} (${plantGpg(south)}, USGS ${south.usgsClass}). ${park.label} publishes ${plantMgL(park)} (${plantGpg(park)}, USGS ${park.usgsClass}).`,
    },
    {
      q: "Which USGS hardness class applies?",
      a: `USGS bands used here are ${USGS_BANDS.map(formatUsgsBand).join("; ")}. Southlake-area published values fall in ${south.usgsClass}. Park Plant published values fall in ${park.usgsClass}.`,
    },
    {
      q: "Do you test water at the door?",
      a: "No. We do not perform door to door tests. These pages cite Georgetown Utility Systems. Installation, if any, is by a separately licensed Water Treatment Specialist or plumber.",
    },
    {
      q: "How do grains per gallon relate to milligrams per liter?",
      a: `Softener settings are often in grains per gallon. One grain per gallon equals ${formatMglPerGrain()} as CaCO3. The plant pages show both units from the same city article.`,
    },
    {
      q: "How do I find a plumber after reading these hardness pages?",
      a: "Use the license-verified plumber directory. This site does not book jobs or sell contractor leads.",
    },
  ];
}

export default function WaterHubPage() {
  const faqs = waterFaqs();
  const south = PLANTS.southlake;
  const park = PLANTS.park;

  return (
    <WaterPageFrame
      title="Georgetown water hardness"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: PATH, label: "Water hardness" },
      ]}
    >
      <FAQSchema pageUrl={absolutePageUrl(PATH)} name="Georgetown water hardness FAQ" faqs={faqs} />

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Georgetown Utility Systems publishes hardness by treatment plant, not as a single citywide number. Homes on{" "}
        {south.label} see {south.usgsClass.toLowerCase()} water. Homes on {park.label} see {park.usgsClass.toLowerCase()}{" "}
        water. Use the plant pages for the cited ranges, then decide whether a plumber, a Water Treatment Specialist, or
        neither is the next step.
      </p>

      <WaterPlantTable />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Treatment plants</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <Link href={`/water/${south.slug}`} className="font-semibold text-brand hover:underline">
              {south.label}
            </Link>
            {" — "}
            {plantMgL(south)}, {plantGpg(south)}
          </li>
          <li>
            <Link href={`/water/${park.slug}`} className="font-semibold text-brand hover:underline">
              {park.label}
            </Link>
            {" — "}
            {plantMgL(park)}, {plantGpg(park)}
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">USGS hardness classes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {USGS_BANDS.map((band) => (
            <li key={band.label}>{formatUsgsBand(band)}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">System mineral ranges</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          The same city article lists recent mineral content as ranges, not street-level tests:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Calcium: {SYSTEM_RANGES.calcium}</li>
          <li>Magnesium: {SYSTEM_RANGES.magnesium}</li>
          <li>Sodium: {SYSTEM_RANGES.sodium}</li>
          <li>Sulfate: {SYSTEM_RANGES.sulfate}</li>
          <li>Total dissolved solids: {SYSTEM_RANGES.tds}</li>
          <li>Alkalinity: {SYSTEM_RANGES.alkalinity}</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">What this site will and will not do</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          These pages explain published figures, chloramine and resin trade-offs, and what belongs in a written
          treatment spec. Daily household use in sizing math is {formatGallonsPerPersonPerDay()} per person. We do not
          sell rankings, run door-to-door tests, or install equipment.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            <Link href="/water/how-we-source" className="font-semibold text-brand hover:underline">
              How we source the numbers
            </Link>
          </li>
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
        </ul>
      </section>

      <WaterPlumberCta />

      <FAQList faqs={faqs} className="mt-10" />
    </WaterPageFrame>
  );
}
