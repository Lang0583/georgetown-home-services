import Link from "next/link";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlumberCta from "@/components/water/WaterPlumberCta";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/chloramine-and-resin";

export const metadata = pageSeoMetadata({
  titleSegment: "Chloramine and Water Softener Resin in Georgetown",
  description:
    "Why chloramine in city water matters for ion-exchange resin, what to ask a Water Treatment Specialist, and how that differs from calling a plumber in Georgetown, TX.",
  pathname: PATH,
  ogType: "website",
});

export default function ChloramineAndResinPage() {
  return (
    <WaterPageFrame
      title="Chloramine and resin"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Chloramine and resin" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Many public water systems use chloramine (chlorine plus ammonia) as a residual disinfectant. Standard
        cation-exchange resin used in salt-based softeners can degrade faster in chloraminated water than in
        chlorine-only water. That is a materials question for a licensed Water Treatment Specialist, not a hardness
        number and not a reason to skip the city’s published plant figures.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">What to put in a spec</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          If treatment is on the table, the written spec should say how the unit handles disinfectant residual: resin
          type, any catalytic or carbon pretreatment, and replacement interval in writing. Vague “chlorine resistant”
          marketing copy is not a spec.
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          <Link href="/water/spec-what-you-get" className="font-semibold text-brand hover:underline">
            What a written spec should include
          </Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Plumber versus treatment specialist</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Scale, heater sediment, and leaking valves are plumbing. Media choice and chloramine compatibility are
          treatment design. This directory lists plumbers with license checks where Texas requires them. It does not
          install softeners.
        </p>
      </section>

      <WaterPlumberCta />
    </WaterPageFrame>
  );
}
