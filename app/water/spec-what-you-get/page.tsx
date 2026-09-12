import Link from "next/link";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlumberCta from "@/components/water/WaterPlumberCta";
import { formatGallonsPerPersonPerDay, formatMglPerGrain } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/spec-what-you-get";

export const metadata = pageSeoMetadata({
  titleSegment: "Water Treatment Spec: What You Should Get in Writing",
  description:
    "What a Georgetown water-treatment spec should include: plant-based hardness, grain capacity math, chloramine/resin notes, bypass, and license. No door-to-door tests.",
  pathname: PATH,
  ogType: "website",
});

export default function SpecWhatYouGetPage() {
  return (
    <WaterPageFrame
      title="What a written spec should include"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Written spec" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        A useful water-treatment spec starts from the city’s plant hardness, not a surprise kit on the porch. It states
        capacity math, media, disinfectant handling, bypass, and who holds the license. Georgetown Home Services does
        not sell equipment or book installs.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Hardness input</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          The spec should name the treatment plant assumed for the house and use that plant’s published milligrams per
          liter and grains per gallon. Conversion between those units uses {formatMglPerGrain()} as CaCO3 per grain.
          Confirm the plant with Georgetown Utility Systems if the address is near a boundary.
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          <Link href="/water" className="font-semibold text-brand hover:underline">
            Plant hardness table
          </Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Capacity math</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Daily household water in the math we publish is {formatGallonsPerPersonPerDay()} per person. Occupancy and
          regeneration settings belong in the written spec. If those inputs are missing, the grain capacity is a guess.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Media, bypass, and license</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Resin or other media named, including chloramine handling if a softener is proposed.</li>
          <li>Bypass and untreated hose bibs called out so irrigation and drinking preferences are explicit.</li>
          <li>
            Installer license class stated: Water Treatment Specialist and/or plumber, as the work requires. Ask to see
            it. We do not invent license numbers.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed">
          <Link href="/water/chloramine-and-resin" className="font-semibold text-brand hover:underline">
            Chloramine and resin
          </Link>
          {" · "}
          <Link href="/water/spec" className="font-semibold text-brand hover:underline">
            Spec intake
          </Link>
        </p>
      </section>

      <WaterPlumberCta />
    </WaterPageFrame>
  );
}
