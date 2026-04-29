import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../../components/JsonLd";
import TrustPage from "../../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../../lib/page-seo";
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_LONG_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_PROFILE_PATH,
  authorProfilePageSchema,
  fullAuthorPersonSchema,
} from "../../../lib/site-author";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: `${AUTHOR_NAME}, ${AUTHOR_JOB_TITLE}`,
  description: `${AUTHOR_NAME} is the founding editor of Georgetown Home Services. Background, editorial principles, how content gets made, and how to get in touch.`,
  pathname: AUTHOR_PROFILE_PATH,
  ogType: "website",
});

export default function AuthorProfilePage() {
  return (
    <TrustPage
      eyebrow="Editorial team"
      title={`${AUTHOR_NAME}, ${AUTHOR_JOB_TITLE}`}
      description={<>{AUTHOR_LONG_DESCRIPTION}</>}
    >
      <JsonLd data={fullAuthorPersonSchema()} />
      <JsonLd data={authorProfilePageSchema()} />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Background</h2>
        <p className="mt-3">
          I&apos;m {AUTHOR_NAME}, founding editor of Georgetown Home Services. I bought a 1990s
          Sun City–era home in Williamson County in 2018 with the typical first-time-Texas-homeowner
          gaps in knowledge: I didn&apos;t understand how aggressively Edwards Aquifer hard water
          would shorten my water heater&apos;s life, what expansive clay soil does to copper supply
          lines under a slab, or why the Class 4 shingle conversation matters before — not after —
          a hail event.
        </p>
        <p className="mt-3">
          Two specific events drove the project. In late 2020 a slab leak under the primary bath
          turned into a $9,400 above-slab repipe and three weeks of dust and decision fatigue. In
          2022 a hail event I almost didn&apos;t document properly turned into a six-month
          insurance dispute that ended in a partial replacement on a roof I couldn&apos;t cleanly
          tell whether actually needed it. Both times the gap I felt most acutely wasn&apos;t the
          contractor side of the conversation — there are good plumbers and roofers in
          Georgetown — it was the homeowner side. National guides told me what a slab leak{" "}
          <span className="italic">was</span>; nothing told me what to expect a slab leak to{" "}
          <span className="italic">cost</span> in this market, what scope variations looked like
          on real bids, or which questions separated a competent estimate from a quote built around
          the contractor&apos;s margin.
        </p>
        <p className="mt-3">
          This site is the resource I wish had existed when I was making those calls. It is a
          homeowner-side editorial guide — not a contractor, not a lead-generation funnel, not a
          referral service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Pen name disclosure</h2>
        <p className="mt-3">
          {AUTHOR_NAME} is a pen name. The legal publishing entity for this site is identifiable
          via the contact and corporate information on the{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            about page
          </Link>{" "}
          and{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact page
          </Link>
          . I publish under a pen name because I do other professional work that I prefer not to
          attach to a consumer-facing editorial site. Pen names have a long tradition in
          consumer-research publishing; what matters for trust is that (a) the corporate publisher
          is identified, (b) editorial standards are real and visible, and (c) corrections actually
          happen when readers flag mistakes. All three are documented on the editorial pages.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What I&apos;m not</h2>
        <p className="mt-3">
          I am not a licensed contractor. Not a plumber, electrician, HVAC technician, or roofer. I
          have never held a Texas trades license and the site does not present my opinions as
          professional trades advice. The site reflects research, homeowner experience, and the
          habit of asking the questions a generalist would ask before a five-figure decision — not
          professional trades expertise.
        </p>
        <p className="mt-3">
          That&apos;s deliberate, given what the site is trying to do. Every guide leans on{" "}
          <span className="italic">what to ask</span> frameworks — diagnostic questions,
          scope-comparison checklists, repair-vs-replace decision points — rather than{" "}
          <span className="italic">what to do yourself</span> instructions. The right person to do
          the work in your home is someone with a license, insurance, and actual hands-on
          experience. The job of this site is to help you walk into the conversation with that
          person more informed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How content gets made</h2>
        <p className="mt-3">
          Pricing data comes from a combination of sources: published Texas market ranges for major
          job categories, public quote data where it&apos;s available, contractor bids I or
          neighbors have actually received (anonymized), and adjustment for known Williamson
          County factors — hail history, clay soil, hard water, code requirements. The pricing
          tables on{" "}
          <Link href="/pricing" className="font-semibold text-primary hover:underline">
            /pricing
          </Link>{" "}
          carry a &ldquo;last reviewed&rdquo; date, and the ranges are intentionally wider than
          national averages because the variance is wider here. Insurance-scope versus cash-pay
          roofs alone create a 20–30 percent spread that single-number averages hide.
        </p>
        <p className="mt-3">
          Content writing leans on AI drafting for first passes, then human editing. Every guide is
          edited specifically to remove templated language, add genuine local specifics, and ground
          claims in real Georgetown conditions. Pages that couldn&apos;t clear that bar were
          consolidated into hubs or removed from the index.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Editorial principles</h2>
        <p className="mt-3">A few things I try to hold the bar on:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-gray-900">Specificity over fluency.</span>{" "}
            &ldquo;Williamson County hail season&rdquo; beats &ldquo;Georgetown weather can be
            unpredictable.&rdquo; Specific is interesting and useful; generic is filler.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Calibration over confidence.</span> When
            I don&apos;t know something for sure, the page says &ldquo;verify with your contractor
            and carrier&rdquo; rather than overclaiming. The Class 4 shingle insurance discount and
            roof replacement permit requirements on the roofing guide are softened deliberately
            because the truth varies by carrier and by address.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Frameworks over recommendations.</span> I
            don&apos;t tell you which specific contractor to hire. I give you the questions to ask
            any of them.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Repeat-use over click-bait.</span> The
            goal is content that&apos;s still useful when you re-read it during the next storm or
            repair, not optimized for a single click-through.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Reach me</h2>
        <p className="mt-3">
          The site has email capture for monthly maintenance reminders. Feedback, factual
          corrections, or &ldquo;you got this wrong about Sun City&rdquo; notes are welcome —
          corrections-with-evidence will result in updates and a credit on the page if you want
          one. The contact email is in the footer and on the{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact page
          </Link>
          .
        </p>
        <p className="mt-3 text-sm text-gray-600">
          For more on how the site is structured, see the{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            about page
          </Link>
          ,{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            editorial policy
          </Link>
          , and{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            review methodology
          </Link>
          .
        </p>
      </section>
    </TrustPage>
  );
}
