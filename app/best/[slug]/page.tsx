import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "../../../components/CTASection";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
import RichText from "../../../components/RichText";
import ProviderList from "../../../components/ProviderList";
import ComparisonSection from "../../../components/ComparisonSection";
import {
  getBestBySlug,
  getLocations,
  getBestSlugs,
  getServiceBySlug,
  getServices,
} from "../../../lib/site-content";
import { getGeneratedPage } from "../../../lib/generatedPages";
import { getProvidersForBestSlug } from "../../../lib/providers";
import {
  BUSINESS_LISTINGS_LAST_UPDATED,
  getBusinessCategoryForBestSlug,
  getBusinessesByCategory,
  getRelatedServiceSlugForBestSlug,
} from "../../../lib/businesses";
import BestBusinessesSection from "../../../components/BestBusinessesSection";
import businessSource from "@/lib/businesses.json";

export function generateStaticParams() {
  return getBestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const best = getBestBySlug(slug);
  if (!best) return {};
  return { title: best.title, description: best.description };
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const best = getBestBySlug(slug);
  if (!best) notFound();

  const isPlumbersGeorgetown = slug === "best-plumbers-georgetown-tx";
  const isHvacGeorgetown = slug === "top-hvac-companies-georgetown-tx";
  const isRoofersGeorgetown = slug === "best-roofers-georgetown-tx";

  const generated = getGeneratedPage(slug);
  const providerData = getProvidersForBestSlug(slug);
  const businessCategory = getBusinessCategoryForBestSlug(slug);
  const businessesForPage =
    businessCategory !== null ? getBusinessesByCategory(businessCategory) : null;
  const relatedServiceSlug = getRelatedServiceSlugForBestSlug(slug);
  const relatedService = relatedServiceSlug ? getServiceBySlug(relatedServiceSlug) : null;
  const locationTitle = getLocations().find((l) => l.slug === best.locationSlug)?.title ?? "Georgetown, TX";
  const services = getServices();
  const recommended = best.recommendedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start lg:gap-12">
            <div className="min-w-0 md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Best Of</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{best.h1}</h1>
              {isPlumbersGeorgetown ? (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                  If you own a home in Georgetown, TX, a good plumber is as important as a good roofer or HVAC tech.
                  This guide focuses on trusted local companies that handle real-world issues Georgetown homeowners face:
                  slab leaks, water heater failures, clogged main lines, and emergency repairs when a pipe lets go on
                  a Sunday night.
                </p>
              ) : isHvacGeorgetown ? (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                  Summers in Georgetown, TX come with long stretches of heat and humidity, which makes a reliable HVAC
                  company nearly as important as the equipment itself. This guide highlights local providers that keep
                  Georgetown homes livable when systems struggle on 100° days, from emergency AC repairs to full
                  replacements and maintenance plans sized for Central Texas weather.
                </p>
              ) : (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">{best.description}</p>
              )}

              <div className="mt-8">
                {isPlumbersGeorgetown ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Top Rated Plumbers in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        The plumbers listed below are based in or actively serve Georgetown, TX and nearby areas. We
                        focus on companies that clearly advertise service in Georgetown, publish verifiable contact
                        details, and have a track record of responsive customer communication.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Selected These Companies
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Local presence:</span> business address, service
                          area, or marketing clearly includes Georgetown, TX or nearby communities.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Public ratings data:</span> star ratings and
                          review counts where available from public business listings.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Service focus:</span> clear description of core
                          plumbing work such as repairs, emergency calls, sewer and drain cleaning, or water heater
                          service.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Contactable online:</span> working phone
                          numbers, websites, or maps listings so Georgetown homeowners can reach the company quickly.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        We rely on publicly available data only. You should always confirm current licensing, insurance,
                        pricing, and availability directly with any plumber before you hire them.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        What to Look for in a Plumber
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">License and insurance:</span> verify the company
                          holds an active Texas plumbing license and carries appropriate liability coverage.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Upfront pricing:</span> ask whether pricing is
                          flat-rate or time-and-materials, and request a written estimate before work starts.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Emergency availability:</span> for slab leaks,
                          backed-up mains, or major water damage, confirm how they handle after-hours and weekend calls.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Specialty experience:</span> homes in
                          Georgetown, TX often have slab foundations, irrigation tie-ins, and hard water—look for
                          plumbers comfortable with these specifics.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Communication:</span> clear explanations,
                          photos or video of problem areas, and written notes on what was repaired or replaced.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Average Plumbing Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Actual prices vary by company, time of day, parts used, and the complexity of the job. The rough
                        ranges below are based on typical quotes homeowners report in Central Texas; always request a
                        written estimate for your specific project.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Standard service call:</span> commonly a
                          diagnostic fee in the low-to-mid hundreds of dollars, often applied toward approved repairs.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Minor repairs:</span> fixing a leaking supply
                          line, replacing a shutoff, or clearing a simple clog can land in the low-hundreds depending on
                          access and parts.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater replacement:</span> full
                          replacements—especially for larger or tankless units—are often quoted in the mid-to-high
                          thousands, including labor and haul-away.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and drain work:</span> cabling or
                          jetting a main line is typically a few hundred dollars; more serious issues that require
                          digging, lining, or replacement are much higher.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Slab leaks and repipes:</span> locating and
                          repairing leaks under a slab, or replacing large sections of pipe, can run into the many
                          thousands depending on scope and restoration.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Georgetown TX Plumbing FAQ
                      </h2>
                      <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Do I need a plumber or can I fix this myself?
                          </h3>
                          <p className="mt-1">
                            Small issues like a running toilet or a dripping faucet cartridge are often DIY-friendly if
                            you are comfortable turning off water and following manufacturer instructions. Anything
                            involving gas lines, main drains, slab leaks, or cutting into walls or foundations is
                            usually best left to a licensed plumber.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">How fast can a plumber get to my home?</h3>
                          <p className="mt-1">
                            In Georgetown, TX many plumbers offer same-day or next-day service for urgent problems, but
                            availability tightens during freezes, heavy rain, or holidays. When you call, describe the
                            situation clearly so they can prioritize true emergencies like active flooding or sewage
                            backups.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            What should I ask before approving a plumbing estimate?
                          </h3>
                          <p className="mt-1">
                            Ask what is included in the price, what could change the quote, whether permits are needed,
                            and if there are separate fees for after-hours work, disposal, or camera inspections. It is
                            reasonable to request the estimate and scope of work in writing.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How can I reduce the chance of plumbing emergencies?
                          </h3>
                          <p className="mt-1">
                            In Georgetown, TX, simple habits help: know where your main shutoff is, protect outdoor
                            hose bibs before freezes, avoid flushing wipes or grease, and schedule periodic inspections
                            if your home is older or on a slab foundation.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Are permits required for plumbing work?</h3>
                          <p className="mt-1">
                            Larger jobs—such as water heater replacements, major repipes, or work that ties into the
                            city system—often require permits and inspections. A licensed plumber who regularly works in
                            Georgetown, TX can explain when permits apply and how they are handled.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How do I compare multiple plumbers fairly?
                          </h3>
                          <p className="mt-1">
                            Try to get written estimates that describe the same scope of work, materials, and warranty
                            terms. Look beyond price to responsiveness, clarity of communication, and whether the
                            company is willing to answer questions before and after the job.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                ) : isHvacGeorgetown ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Top HVAC Companies in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        The HVAC companies featured here are based in or clearly serve Georgetown, TX and nearby
                        communities. We focus on providers that publish verifiable contact details, advertise service in
                        Georgetown, and have visible evidence of working on real residential heating and cooling
                        systems—not just selling equipment.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Evaluated Providers
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Local service footprint:</span> a Georgetown,
                          TX address, service area, or marketing that explicitly includes Georgetown or nearby
                          corridors.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Public ratings and reviews:</span> star ratings
                          and review counts where available from public business listings, used for relative ranking
                          only.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Documented HVAC work:</span> clear mention of AC
                          and heating repair, maintenance, or installation—not just generic home services.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Reachability:</span> working phone numbers,
                          websites, or map listings so Georgetown homeowners can actually book service.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        We rely solely on publicly available information and do not receive compensation for
                        placement. Always confirm current licensing, insurance, pricing, and availability directly with
                        any HVAC company before hiring.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common HVAC Services in Georgetown
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">AC repair and diagnostics:</span> capacitors,
                          contactors, refrigerant issues, sensor problems, and thermostat troubleshooting when the house
                          will not cool.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Preventive maintenance:</span> seasonal tune-ups
                          that include coil cleaning, filter changes, basic electrical checks, and drain line checks to
                          reduce mid-summer breakdowns.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">System replacement:</span> swapping out older
                          equipment for newer, more efficient systems sized for Georgetown’s mix of heat, humidity, and
                          winter cold snaps.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Duct and airflow work:</span> correcting
                          comfort issues between floors, sealing or modifying duct runs, and addressing hot rooms that
                          never quite cool down.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Indoor air quality add-ons:</span> filtration
                          upgrades, dehumidification, and other accessories installed alongside existing HVAC systems.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Typical HVAC Repair and Replacement Costs
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Actual pricing in Georgetown, TX depends on the brand, size, and age of your equipment, access
                        to the unit, and when you schedule service. The ranges below are based on common scenarios
                        reported in Central Texas; always ask for a written quote for your specific system.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Service call and basic diagnosis:</span> often a
                          fee in the low-to-mid hundreds, which may be applied to approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Typical repairs:</span> components like
                          capacitors, contactors, or simple drain line clears can fall in the lower hundreds, depending
                          on parts and access.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Major repairs:</span> compressor issues, coil
                          replacements, or extensive refrigerant problems are significantly more and can approach or
                          exceed the cost of replacement on older systems.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Full system replacement:</span> replacing both
                          indoor and outdoor units, especially with higher-efficiency equipment, is commonly quoted in
                          the many-thousands depending on tonnage and scope of duct work.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Maintenance plans:</span> annual or biannual
                          maintenance memberships are usually priced to cover one or two tune-ups per year at a modest
                          discount compared to one-off visits.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Georgetown TX HVAC FAQ
                      </h2>
                      <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How often should I service my HVAC system in Georgetown, TX?
                          </h3>
                          <p className="mt-1">
                            Many homeowners schedule maintenance once or twice a year—typically before peak summer and
                            before winter. In Georgetown’s climate, regular coil cleaning and drain checks help prevent
                            mid-season failures when systems run hardest.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            When does it make sense to replace instead of repair?
                          </h3>
                          <p className="mt-1">
                            As a rough rule, if your equipment is older, uses outdated refrigerant, or the quoted repair
                            is a large fraction of the cost of a new system, it is worth discussing replacement options.
                            A local HVAC company can walk you through efficiency differences, warranty terms, and total
                            cost of ownership.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            What should I ask before approving an HVAC quote?
                          </h3>
                          <p className="mt-1">
                            Ask which parts are being replaced, whether there is a labor warranty, how long the work
                            should take, and what could change the price once they start. For full replacements, ask
                            about equipment brand, efficiency ratings, and any duct work included.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How can I improve comfort between floors in my Georgetown home?
                          </h3>
                          <p className="mt-1">
                            Uneven temperatures often come from duct design, airflow, or insulation rather than just
                            equipment size. An HVAC company experienced with two-story homes in Georgetown, TX can look
                            at duct layout, returns, and airflow balancing before recommending major changes.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            What can I do before an HVAC tech arrives for an emergency call?
                          </h3>
                          <p className="mt-1">
                            You can check filters, confirm breakers are not tripped, and note any error codes on the
                            thermostat or equipment. Avoid opening the refrigerant circuit or taking apart sealed
                            components—leave that to a licensed technician.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How do I compare multiple HVAC companies fairly?
                          </h3>
                          <p className="mt-1">
                            Request written proposals that spell out equipment models, efficiency ratings, scope of
                            duct work, and warranty terms. Compare not just the price but responsiveness, clarity of
                            explanations, and how each company addresses your specific Georgetown, TX home and comfort
                            goals.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                ) : generated ? (
                  <GeneratedArticleBody html={generated.html} />
                ) : (
                  <RichText blocks={best.content} />
                )}
              </div>

              {providerData ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {isPlumbersGeorgetown
                      ? "Top Rated Plumbers in Georgetown TX"
                      : isHvacGeorgetown
                      ? "Top HVAC Companies in Georgetown TX"
                      : "Top Providers in Georgetown"}
                  </h2>

                  {businessesForPage !== null ? (
                    <>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        These listings are compiled from publicly available local business information (for example, names, ratings, review counts,
                        and addresses or official websites where published online). They are provided for research and comparison—confirm details
                        directly with any company before hiring.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Last updated: {BUSINESS_LISTINGS_LAST_UPDATED}. Source:{" "}
                        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">@/lib/businesses.json</code> ({businessSource.length}{" "}
                        records in file).
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-700">
                        <p>
                          <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
                            Home
                          </Link>
                          {relatedServiceSlug ? (
                            <>
                              {" "}
                              ·{" "}
                              <Link
                                href={`/services/${relatedServiceSlug}`}
                                className="font-semibold text-blue-600 hover:text-blue-700"
                              >
                                {relatedService?.title ?? "Related service"}
                              </Link>
                            </>
                          ) : null}
                        </p>
                        {isPlumbersGeorgetown ? (
                          <p>
                            Looking for a step-by-step checklist? Read{" "}
                            <Link
                              href="/blog/how-to-find-a-good-plumber-georgetown"
                              className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                              how to find a good plumber in Georgetown
                            </Link>
                            .
                          </p>
                        ) : null}
                        {isHvacGeorgetown ? (
                          <p>
                            If you are planning ahead on equipment, see{" "}
                            <Link
                              href="/blog/cost-to-replace-hvac-georgetown"
                              className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                              typical costs to replace HVAC in Georgetown
                            </Link>
                            .
                          </p>
                        ) : null}
                        {isRoofersGeorgetown ? (
                          <p>
                            Want service options instead of a comparison list? Start with{" "}
                            <Link
                              href="/services/roofer-georgetown-tx"
                              className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                              roofing service in Georgetown, TX
                            </Link>
                            .
                          </p>
                        ) : null}
                      </div>
                      <BestBusinessesSection businesses={businessesForPage} />
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-sm text-gray-700">{providerData.evaluatedIntro}</p>
                      {providerData.providers.length ? (
                        <ProviderList providers={providerData.providers} />
                      ) : (
                        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md">
                          Provider listings haven’t been added yet for this guide.
                        </div>
                      )}
                    </>
                  )}

                  <ComparisonSection comparison={providerData.comparison} />
                </section>
              ) : null}

              {recommended.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Recommended Services</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {recommended.map((s) => (
                      <LinkCard
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        title={s.title}
                        description={s.description}
                        badge={s.serviceType}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="min-w-0 md:col-span-1">
              <LeadForm
                formId="lead"
                defaultLocation={locationTitle}
                defaultService="Service request"
              />

              <div className="mt-8">
                <CTASection
                  eyebrow="Need a recommendation?"
                  title="Get Free Quotes"
                  description="Submit the form to request service options and free quotes."
                  primaryHref={`/services/${recommended[0]?.slug ?? relatedServiceSlug ?? "plumber-georgetown-tx"}`}
                  primaryLabel={recommended[0] ? `View ${recommended[0].serviceType} services` : "Browse services"}
                  secondary={
                    <div className="text-sm text-gray-600">
                      Or browse services directly:{" "}
                      {recommended[0] ? (
                        <Link
                          href={`/services/${recommended[0]?.slug}`}
                          className="font-semibold underline underline-offset-4"
                        >
                          {recommended[0]?.serviceType}
                        </Link>
                      ) : (
                        <span className="font-semibold">Services</span>
                      )}
                    </div>
                  }
                />
              </div>
            </aside>
          </div>
        </section>
      </Container>
    </div>
  );
}

