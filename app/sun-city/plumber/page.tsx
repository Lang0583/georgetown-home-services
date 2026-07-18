import type { Metadata } from 'next';
import Link from 'next/link';
import AffiliateCTA from '@/components/AffiliateCTA';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQList from '@/components/FAQList';
import FAQSchema from '@/components/FAQSchema';
import { absolutePageUrl } from '@/lib/page-seo';

const PAGE_PATH = '/sun-city/plumber';

const FAQS = [
  {
    q: 'How much does a plumber cost in Sun City, Georgetown TX?',
    a: "There is no honest single price without an on-site visit. Cost depends on the job type (fixture repair vs. slab leak vs. water heater replacement), access, whether clay-soil movement has stressed pipes, and whether code updates or permits are required. Get two or three written estimates from licensed Texas plumbers after they see the home.",
  },
  {
    q: 'Why do Sun City homes have frequent plumbing problems?',
    a: "Many Sun City homes were built in the late 1990s through early 2010s on Georgetown's expansive clay soil. That soil swells with rain and shrinks in drought, stressing underground pipes and contributing to slab leaks. Aging fixtures and years of hard Central Texas water also accelerate wear on valves, water heaters, and drain lines.",
  },
  {
    q: 'Do plumbers serving Sun City offer senior discounts?',
    a: "Some plumbers who regularly serve the Sun City 55+ community advertise senior discounts or flexible payment options. Ask upfront when requesting a quote, and confirm any discount is written into the estimate — do not assume every company offers one.",
  },
  {
    q: 'How quickly can a plumber respond in Sun City Georgetown?',
    a: "Response time depends on urgency, day of week, and how booked local crews are. Plumbers based in Georgetown or Williamson County can usually reach Sun City faster than out-of-area companies. For active leaks or backups, say so when you call and ask about same-day or after-hours options; for non-urgent work, weekday appointments are usually easier to schedule.",
  },
  {
    q: 'What should I ask before hiring a plumber in Sun City?',
    a: "Ask for a Texas plumbing license number (TSBPE), proof of insurance, whether they pull City of Georgetown permits when required, what the written scope includes and excludes, and whether they have experience with slab-on-grade homes on clay soil. Compare at least two written estimates line-by-line before authorizing major work.",
  },
  {
    q: 'Are slab leaks common in Sun City Georgetown?',
    a: "Slab leaks are a recurring concern in Sun City and across Georgetown because expansive clay soil can stress supply lines under the slab. Hot spots on floors, unexplained water bills, and the sound of running water when fixtures are off are warning signs. A licensed plumber can confirm with leak detection before recommending repair options.",
  },
];

export const metadata: Metadata = {
  title: 'Plumber in Sun City Georgetown TX: Local Repairs & What Affects Cost',
  description:
    'Hiring a plumber in Sun City, Georgetown TX: clay soil, aging fixtures, hard water, and accessibility drive the quote. Learn what to ask and how to compare written estimates.',
  alternates: {
    canonical: 'https://www.georgetownhomeservices.com/sun-city/plumber',
  },
};

export default function SunCityPlumberPage() {
  return (
    <>
      <FAQSchema
        pageUrl={absolutePageUrl(PAGE_PATH)}
        name="Sun City Plumber — FAQ"
        faqs={FAQS}
      />

      <main className="mx-auto max-w-4xl px-4 py-10 text-gray-800">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/services/plumber-georgetown-tx', label: 'Plumbing' },
            { href: PAGE_PATH, label: 'Sun City Plumber' },
          ]}
        />

        <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
          Plumber in Sun City, Georgetown TX: Local Repairs, Clay Soil &amp; How to Compare Quotes
        </h1>

        <p className="mb-4 text-lg leading-relaxed">
          Sun City Georgetown is a large 55+ community inside greater Georgetown — and its
          plumbing needs look different from a brand-new subdivision off I-35. Many homes were
          built from the late 1990s through the early 2010s on expansive clay soil. That soil
          swells with rain and shrinks in drought, which stresses underground supply lines and
          drain pipes. Add years of hard Central Texas water, aging fixtures, and residents who
          often prefer clear communication over hard sells, and it becomes clear why a local,
          licensed plumber who understands Sun City matters.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          This page is not a sales pitch for any single company. It explains what typically goes
          wrong in Sun City plumbing, what drives the cost of a repair or replacement, and how
          to get written estimates you can compare fairly — without relying on phone quotes or
          invented price lists.
        </p>

        <p className="mb-8 leading-relaxed">
          Ready to shortlist licensed plumbers who serve Georgetown and Sun City? Start with the{' '}
          <Link
            href="/services/plumber-georgetown-tx"
            className="text-blue-700 underline hover:text-blue-800"
          >
            Georgetown plumbing service guide
          </Link>
          , then compare providers on the{' '}
          <Link
            href="/best/best-plumbers-georgetown-tx"
            className="text-blue-700 underline hover:text-blue-800"
          >
            best plumbers in Georgetown TX
          </Link>{' '}
          directory.
        </p>

        <AffiliateCTA
          angiCategorySlug="plumbing"
          thumbtackCategory="plumbers"
          serviceLabel="plumbing"
          heading="Compare Free Quotes from Georgetown Plumbers"
        />

        <section className="mb-10 mt-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Why Sun City Plumbing Needs Differ from the Rest of Georgetown
          </h2>
          <ul className="mb-4 list-outside list-disc space-y-3 pl-6 text-gray-800">
            <li>
              <strong>Clay soil under older slabs.</strong> Expansive clay is common across
              Georgetown, but Sun City&rsquo;s build era means many supply and drain lines have
              already lived through decades of seasonal movement.
            </li>
            <li>
              <strong>Fixture and water-heater age.</strong> Original builder-grade fixtures and
              water heaters from the 2000s are reaching end of life in waves across multiple
              phases of the community.
            </li>
            <li>
              <strong>Hard water scale.</strong> Mineral buildup shortens water heater life,
              reduces fixture flow, and contributes to valve failures.
            </li>
            <li>
              <strong>Accessibility and safety priorities.</strong> Many residents prefer
              clear scopes, tidy work areas, and plumbers who explain options without pressure —
              especially when mobility or fixed budgets are part of the decision.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Common Plumbing Jobs Sun City Homeowners Call For
          </h2>
          <ul className="mb-4 list-outside list-disc space-y-3 pl-6 text-gray-800">
            <li>
              <strong>Fixture repairs and replacements</strong> — faucets, toilets, shower valves,
              and cartridges that fail after years of hard-water wear.
            </li>
            <li>
              <strong>Drain clearing and recurring clogs</strong> — especially when multiple
              fixtures slow at once (a clue that the issue may be deeper than one trap).
            </li>
            <li>
              <strong>Water heater repair vs. replacement</strong> — sediment, leaks, and age
              decisions that should start with an on-site assessment. See also{' '}
              <Link
                href="/plumbing/water-heater-replacement-cost-georgetown-tx"
                className="text-blue-700 underline hover:text-blue-800"
              >
                water heater replacement cost in Georgetown TX
              </Link>
              .
            </li>
            <li>
              <strong>Slab leak detection and repair</strong> — hot spots, unexplained usage, or
              the sound of running water with all fixtures off.
            </li>
            <li>
              <strong>Toilet and bathroom updates</strong> — including comfort-height fixtures
              when residents are remodeling for accessibility.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            What Affects Plumbing Cost in Sun City, Georgetown TX
          </h2>
          <p className="mb-4 leading-relaxed">
            There is no single &ldquo;Sun City plumber price.&rdquo; A written estimate reflects
            the specific problem, the home&rsquo;s layout, and how much related work is required.
            These are the drivers a licensed plumber is evaluating:
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            1. Job type and severity
          </h3>
          <p className="mb-4 leading-relaxed">
            Replacing a cartridge is not the same job as tracing a slab leak under finished
            flooring. Severity, whether water damage has already started, and whether temporary
            stabilization is needed before a permanent fix all change labor time and materials.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            2. Clay soil movement and pipe condition
          </h3>
          <p className="mb-4 leading-relaxed">
            When soil movement has stressed a line, a simple patch may not last. Thorough
            plumbers look for related stress points — not just the spot that failed — so the
            repair scope can include prevention of a near-term return call.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            3. Access, finishes, and restoration
          </h3>
          <p className="mb-4 leading-relaxed">
            Work under a slab, behind cabinetry, or in a tight utility closet takes longer than
            open garage access. Quotes should say whether drywall, flooring, or landscaping
            restoration is included or left to a separate trade.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            4. Parts quality and fixture choices
          </h3>
          <p className="mb-4 leading-relaxed">
            Fixture brand, ADA/comfort-height options, and whether shutoff valves or supply
            lines are being replaced at the same time all affect materials. Ask for the part
            list in writing so quotes stay comparable.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            5. Permits and code updates
          </h3>
          <p className="mb-4 leading-relaxed">
            Water heater replacements and some larger plumbing jobs require City of Georgetown
            permits and may trigger code updates (expansion tanks, drain pans, updated venting).
            Those line items should appear on the estimate before work starts.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            6. Timing: urgent vs. scheduled
          </h3>
          <p className="mb-4 leading-relaxed">
            Active flooding, sewer backups, or no water to the home justify urgent response and
            often carry after-hours premiums. If a leak can be shut off safely and the home is
            livable, scheduling during normal hours usually reduces total cost.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            7. Warranty and follow-up
          </h3>
          <p className="mb-4 leading-relaxed">
            Labor warranty length, manufacturer coverage on new equipment, and who handles a
            callback if a repair fails should all be clear in writing. Vague verbal promises
            are hard to enforce later.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            How to Get an Accurate Plumbing Quote in Sun City
          </h2>
          <p className="mb-4 leading-relaxed">
            Request at least two — ideally three — written estimates from licensed Texas
            plumbers who will visit the home. Phone quotes without seeing access, soil-related
            damage, or fixture condition leave out too many Sun City-specific variables.
          </p>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            What to have ready before the visit
          </h3>
          <ul className="mb-4 list-outside list-disc space-y-2 pl-6 text-gray-800">
            <li>
              Which fixtures are affected and whether the problem is constant or intermittent.
            </li>
            <li>
              Photos or video of leaks, stains, or hot spots on flooring.
            </li>
            <li>
              Approximate age of the home phase and any prior plumbing or foundation work.
            </li>
            <li>
              Whether a main shutoff is accessible and whether water has already been turned
              off.
            </li>
            <li>
              Any HOA rules that affect exterior work, digs, or equipment parking.
            </li>
          </ul>

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">
            Questions to ask every plumber who quotes
          </h3>
          <ul className="mb-4 list-outside list-disc space-y-2 pl-6 text-gray-800">
            <li>
              Are you licensed by the Texas State Board of Plumbing Examiners (TSBPE), and can
              you share the license number?
            </li>
            <li>
              Will you pull any required City of Georgetown permit and be present for
              inspection?
            </li>
            <li>
              Is pricing flat-rate or time-and-materials, and what could change the scope?
            </li>
            <li>
              Does the estimate include haul-away, restoration, and newly required code items?
            </li>
            <li>
              Have you worked on slab-on-grade homes in Sun City or similar clay-soil
              neighborhoods?
            </li>
            <li>
              What warranty covers labor and parts, and what voids it?
            </li>
          </ul>

          <p className="mb-4 leading-relaxed">
            Compare scopes line-by-line. A lower number that skips detection, permits, or
            restoration is not automatically the better value.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Three Reasons Sun City Residents Often Prefer Local Georgetown Plumbers
          </h2>
          <ol className="mb-4 list-outside list-decimal space-y-3 pl-6 text-gray-800">
            <li>
              <strong>Clay-soil familiarity.</strong> Local crews see seasonal movement patterns
              across Williamson County and are less likely to treat every leak as a one-off
              patch.
            </li>
            <li>
              <strong>Shorter travel for urgent work.</strong> Georgetown-based plumbers can
              usually reach Sun City faster than out-of-area companies during active leaks —
              though same-day availability still depends on how booked they are that day.
            </li>
            <li>
              <strong>Clearer communication habits.</strong> Many residents prioritize written
              scopes, senior-friendly scheduling, and plumbers who explain options without
              pressure. Ask for those preferences up front when you request service.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Related Georgetown Plumbing Resources
          </h2>
          <ul className="list-outside list-disc space-y-2 pl-6 text-gray-800">
            <li>
              <Link
                href="/services/plumber-georgetown-tx"
                className="text-blue-700 underline hover:text-blue-800"
              >
                Georgetown plumbing service guide
              </Link>{' '}
              — overview of local plumbing work and what a professional visit should include.
            </li>
            <li>
              <Link
                href="/best/best-plumbers-georgetown-tx"
                className="text-blue-700 underline hover:text-blue-800"
              >
                Best plumbers in Georgetown, TX
              </Link>{' '}
              — directory to shortlist licensed local providers for quotes.
            </li>
            <li>
              <Link
                href="/plumbing/water-heater-replacement-cost-georgetown-tx"
                className="text-blue-700 underline hover:text-blue-800"
              >
                Water heater replacement cost in Georgetown TX
              </Link>{' '}
              — cost drivers for tank and tankless replacements.
            </li>
            <li>
              <Link
                href="/blog/how-to-choose-a-reliable-plumber-georgetown-tx"
                className="text-blue-700 underline hover:text-blue-800"
              >
                How to choose a reliable plumber in Georgetown TX
              </Link>{' '}
              — hiring checklist and red flags.
            </li>
            <li>
              <Link
                href="/blog/slab-leak-signs-georgetown-tx"
                className="text-blue-700 underline hover:text-blue-800"
              >
                Slab leak signs in Georgetown TX
              </Link>{' '}
              — when hot spots and high water bills mean call sooner.
            </li>
          </ul>
        </section>

        <FAQList faqs={FAQS} variant="plain" className="mb-10" />

        <AffiliateCTA
          angiCategorySlug="plumbing"
          thumbtackCategory="plumbers"
          serviceLabel="plumbing"
        />
      </main>
    </>
  );
}
