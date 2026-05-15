import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBrandName } from "../../lib/site-content";
import { AUTHOR_NAME, AUTHOR_PROFILE_PATH } from "../../lib/site-author";
import { aboutPageJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "About Georgetown Home Services",
  description:
    "Georgetown Home Services is an independent homeowner guide and provider directory focused on Georgetown, Texas and Williamson County—editorial standards, funding, and how to use the site safely.",
  pathname: "/about",
  ogType: "website",
});

export default function AboutPage() {
  const brand = getBrandName();
  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={aboutPageJsonLd({
            name: `About ${brand}`,
            description:
              "Independent homeowner guide and provider directory for Georgetown, TX and Williamson County: editorial mission, geographic focus, and what we do not do.",
          })}
        />
      }
      eyebrow="About"
      title={`About ${brand}`}
      description={
        <>
          {brand} is a <strong>local editorial publication</strong> for homeowners—not a contractor, broker, or
          dispatch desk. We write durable guides (plumbing, HVAC, roofing, and related trades), maintain a public-facing
          directory using verifiable information, and aim to help you ask sharper questions before you hire anyone.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Geographic focus</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Our primary lens is <strong>Georgetown, Texas</strong> inside <strong>Williamson County</strong>, including
          neighborhoods people search by name—Sun City, Teravista, Wolf Ranch, Georgetown Village, Berry Creek, and the
          historic Square-adjacent blocks. When we reference &quot;Central Texas&quot; weather (heat, UV, hail season,
          clay soils), it is to explain why local hiring questions differ from generic national advice—not to pretend we
          cover the entire state equally.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who runs this site</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {brand} is run by{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_NAME}
          </Link>
          , founder and editor. {AUTHOR_NAME} is{" "}
          <strong>not</strong> a licensed plumber, electrician, HVAC technician, or roofer. Content is written for
          research and comparison; it is <strong>not</strong> a substitute for on-site diagnosis, code compliance
          review, or insurance/legal advice. The{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            editor profile
          </Link>{" "}
          explains background, sourcing habits, and how we use drafting tools responsibly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we are</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Homeowner guides</strong> that explain categories, failure modes, cost drivers, and what belongs in a
            written estimate.
          </li>
          <li>
            <strong>Best Of comparison hubs</strong> that help you shortlist companies using publicly available signals
            (reviews, listing consistency, and stated service fit)—with methodology documented separately.
          </li>
          <li>
            <strong>Repeat-use checklists</strong> (seasonal maintenance, storm aftermath, hiring scripts) designed to
            stay useful months after publishing.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What we are not</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>We do not perform home services, employ tradespeople for hire, or dispatch technicians.</li>
          <li>We do not guarantee outcomes: pricing, timing, licensing, insurance, warranties, or code compliance.</li>
          <li>
            We are not a party to your contract with any provider—disputes, scheduling, and workmanship questions belong
            between you and the company you hire.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How the site is funded</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Like many publishers, we use <strong>advertising</strong> (for example, Google AdSense display ads) and may use
          clearly labeled <strong>affiliate or sponsored placements</strong> where noted on individual pages. Ads do{" "}
          <strong>not</strong> dictate who appears in organic directory shortlists; see{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            Editorial Policy
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            Methodology
          </Link>{" "}
          for how we separate editorial ranking logic from paid modules.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Corrections and provider data</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Public listings drift—phones change, brands merge, service areas tighten. If you spot a factual error
          (wrong phone, defunct brand name, misleading map pin) or believe your company should be represented differently,
          use{" "}
          <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
            Contact &amp; feedback
          </Link>{" "}
          with evidence we can verify (link to official site, Secretary of State filing, or a dated listing screenshot).
          We cannot promise immediate edits, but we do correct verifiable mistakes as capacity allows.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Where to start</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          New to the site? Begin with{" "}
          <Link href="/services" className="font-semibold text-primary hover:underline">
            service guides
          </Link>{" "}
          if you are still narrowing the problem, or jump to the{" "}
          <Link href="/best" className="font-semibold text-primary hover:underline">
            provider directory
          </Link>{" "}
          if you already know the trade. Read{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            how we rank providers
          </Link>{" "}
          before treating any shortlist as final.
        </p>
      </section>
    </TrustPage>
  );
}
