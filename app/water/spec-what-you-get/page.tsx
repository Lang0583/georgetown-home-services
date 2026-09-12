import AffiliateDisclosure from "@/components/water/AffiliateDisclosure";
import WaterCtaRow from "@/components/water/WaterCtaRow";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import { GALLONS_PER_PERSON_PER_DAY, SIZING_EXAMPLES, WATER_SPEC, formatUsd } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/spec-what-you-get";

export const metadata = pageSeoMetadata({
  titleSegment: `The ${formatUsd(WATER_SPEC.priceUsd)} Georgetown Water Spec: What You Get`,
  description:
    "A written spec for your address using the city's published plant data. Sizing math shown, valve guidance, prefilter call, and eight questions to ask any contractor.",
  pathname: PATH,
  ogType: "website",
});

export default function SpecWhatYouGetPage() {
  return (
    <WaterPageFrame
      title={`The ${formatUsd(WATER_SPEC.priceUsd)} water spec`}
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "What you get" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        The plant lookup is free and always will be. The spec is for people who want the math done for their house and
        written down in a form they can hand to a contractor.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What is in it</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        The plant band we used, named. If your address cannot be pinned to one plant, we say unknown and run the whole
        thing twice, once for each band, instead of guessing.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        The grains per gallon range, taken from the city&apos;s published table and nowhere else.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        The sizing formula, printed, with your numbers in it. Grains per day equals grains per gallon times people times{" "}
        {GALLONS_PER_PERSON_PER_DAY} gallons. Capacity needed equals grains per day times days between regenerations,
        typically {SIZING_EXAMPLES.regenDaysLow} to {SIZING_EXAMPLES.regenDaysHigh}. You can check our arithmetic, and
        you should.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Valve guidance. We favor serviceable, widely available control valve families such as Clack and Fleck, for the
        simple reason that parts and service are not locked to one company. Proprietary stacks that only the selling
        dealer can service are a risk worth knowing about before you sign, not after.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        A prefilter call. Consider one or skip one for your setup, with the chloramine reasoning explained rather than
        asserted.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Eight questions to ask any contractor who gives you a quote, written so you can read them straight off the page.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Optional product links, clearly labeled where they are affiliate links, so you can see typical equipment at
        typical prices. You are not required to use them and the spec does not change if you do not.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        A link to license verified plumbers and water treatment specialists on this site. That list is not sorted by who
        paid, because nobody pays.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What it is not</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        It is not a lab test of your tap. We do not test water and we do not send anyone to your house.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        It is not an installation quote. We do not install, and we do not take a cut from the person who does.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        It is not a permanent number. The city updates its published data, so the spec carries the source date it was
        built from.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Price</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">The plant lookup is free.</p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        The spec is {formatUsd(WATER_SPEC.priceUsd)}, delivered as a PDF by email.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        An annual refresh is {formatUsd(WATER_SPEC.refreshUsd)} if you want it rebuilt against the city&apos;s current
        published numbers. It is optional and nothing expires if you skip it.
      </p>
      <WaterCtaRow showSpec />

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Disclosure</h2>
      <AffiliateDisclosure />
    </WaterPageFrame>
  );
}
