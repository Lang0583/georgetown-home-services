import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../../components/JsonLd";
import TrustPage from "../../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../../lib/page-seo";
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  AUTHOR_PROFILE_PATH,
  authorProfilePageSchema,
  fullAuthorPersonSchema,
} from "../../../lib/site-author";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: `${AUTHOR_NAME}, ${AUTHOR_JOB_TITLE}`,
  description: `${AUTHOR_NAME} is the founder and editor of Georgetown Home Services. Background, editorial principles, how content gets made, and how to get in touch.`,
  pathname: AUTHOR_PROFILE_PATH,
  ogType: "website",
});

export default function AuthorMattPage() {
  return (
    <TrustPage
      eyebrow="Editorial team"
      title={`${AUTHOR_NAME}, ${AUTHOR_JOB_TITLE}`}
      description={
        <>
          {AUTHOR_NAME} is the founder and editor of Georgetown Home Services. This page is the public author profile —
          background, editorial principles, and how content is sourced.
        </>
      }
    >
      <JsonLd data={fullAuthorPersonSchema()} />
      <JsonLd data={authorProfilePageSchema()} />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who I am</h2>
        <p className="mt-3">
          I&apos;m Matt, the founder and editor of Georgetown Home Services. I&apos;m a Georgetown homeowner with a
          background in building local-market editorial sites. This one came out of the same problem most Georgetown
          homeowners run into: the available online guidance is either too generic to help — national cost guides that
          don&apos;t account for Williamson County hail belts, expansive clay, or hard water — or too sales-driven to
          trust, where the funnel is designed around the contractor&apos;s interest and not the homeowner&apos;s.
        </p>
        <p className="mt-3">
          The site is the gap-filler I wished existed. Editorial-style guides written for Williamson County conditions,
          with real local context — Sun City roof age cohorts, the R-410A refrigerant transition&apos;s Texas
          implications, the relationship between expansive clay soil and slab leaks in older neighborhoods — and
          pricing data that reflects this market rather than national averages.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What I&apos;m not</h2>
        <p className="mt-3">
          I&apos;m not a licensed contractor. Not a plumber, electrician, HVAC technician, or roofer. I haven&apos;t
          held a Texas trades license. The site reflects research, homeowner experience, and the habit of asking the
          questions a generalist would ask — not professional trades expertise.
        </p>
        <p className="mt-3">
          That&apos;s a feature, not a bug, for what this site is trying to do. Every guide leans on{" "}
          <span className="italic">what to ask</span> frameworks — diagnostic questions, scope-comparison checklists,
          repair-vs-replace decision points — rather than{" "}
          <span className="italic">what to do yourself</span> instructions. The right person to do the work in your
          home is someone with a license, insurance, and actual hands-on experience. The job of this site is to help
          you walk into the conversation with that person more informed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How content gets made</h2>
        <p className="mt-3">
          Pricing data comes from a combination of sources: published Texas market ranges for major job categories,
          public quote data where it&apos;s available, and adjustment for known Williamson County factors — hail
          history, soil conditions, code requirements. The pricing tables on{" "}
          <Link href="/pricing" className="font-semibold text-primary hover:underline">
            /pricing
          </Link>{" "}
          carry a &ldquo;last reviewed&rdquo; date, and the ranges are intentionally wider than national averages
          because the variance is wider here. Insurance-scope versus cash-pay roofs alone create a 20–30 percent spread
          that single-number averages hide.
        </p>
        <p className="mt-3">
          Content writing leans on AI drafting for first passes, then human editing — which is, honestly, the only
          sustainable way to produce this much depth on a small operation. The risk in that workflow is publishing AI
          fluff that doesn&apos;t carry real value, which Google&apos;s quality systems and AdSense reviewers correctly
          punish. Every guide on this site is edited specifically to remove templated language, add genuine local
          specifics, and ground claims in real Georgetown conditions. Pages that couldn&apos;t clear that bar were
          consolidated into hubs or removed from the index.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Editorial principles</h2>
        <p className="mt-3">A few things I try to hold the bar on:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-gray-900">Specificity over fluency.</span>{" "}
            &ldquo;Williamson County hail season&rdquo; beats &ldquo;Georgetown weather can be unpredictable.&rdquo;
            Specific is interesting and useful; generic is filler.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Calibration over confidence.</span> When I don&apos;t know
            something for sure, the page says &ldquo;verify with your contractor and carrier&rdquo; rather than
            overclaiming. The Class 4 shingle insurance discount and roof replacement permit requirements on the
            roofing guide are softened deliberately because the truth varies by carrier and by address.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Frameworks over recommendations.</span> I don&apos;t tell you
            which specific contractor to hire. I give you the questions to ask any of them.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Repeat-use over click-bait.</span> The goal is content
            that&apos;s still useful when you re-read it during the next storm or repair, not optimized for a single
            click-through.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Reach me</h2>
        <p className="mt-3">
          The site has email capture for monthly maintenance reminders. Feedback, factual corrections, or
          &ldquo;you got this wrong about Sun City&rdquo; notes are welcome — corrections-with-evidence will result in
          updates and a credit on the page if you want one. The contact email is in the footer and on the{" "}
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
