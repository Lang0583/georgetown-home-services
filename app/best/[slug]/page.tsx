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
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    If you own a home in Georgetown, TX, you do not think about plumbers when everything is working—you
                    think about them when a toilet overflows, a slab leak shows up as a hot spot on the floor, or a
                    main line backs up right before company arrives. This guide is written for Georgetown homeowners who
                    want to choose a plumber with clear eyes: someone who understands local neighborhoods, explains
                    options without pressure, and shows up when the problem cannot wait until next week.
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We continuously update our rankings based on customer reviews, service availability, and verified
                    local presence in Georgetown and surrounding areas.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">Last updated:</span> March 2026
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We update this list regularly based on verified reviews and service availability in Georgetown.
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-700">
                    This matters more than most people realize.
                  </p>
                </>
              ) : isHvacGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    Summers in Georgetown, TX come with long stretches of heat and humidity, which makes a reliable HVAC
                    company nearly as important as the equipment itself. This guide highlights local providers that keep
                    Georgetown homes livable when systems struggle on 100° days, from emergency AC repairs to full
                    replacements and maintenance plans sized for Central Texas weather.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">Last updated:</span> March 2026
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We update this page regularly based on verified reviews and service availability in Georgetown.
                  </p>
                </>
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
                        The plumbers listed below are based in, or clearly serve, Georgetown, TX and the immediate
                        surrounding area. They show up in public data with real addresses or service areas tied to
                        Georgetown, publish working phone numbers and websites, and have visible customer feedback on
                        responsiveness and communication. This section explains how we treat “top rated” as more than a
                        single star number.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        We start from public ratings and review counts, then look at whether the company appears to do
                        steady day-in, day-out plumbing work—not just one or two categories. From there, it is up to
                        you to confirm licensing, insurance, current pricing, and fit for your specific job. If you
                        prefer to start by requesting{" "}
                        <Link href="/services/plumber-georgetown-tx" className="font-semibold text-blue-700">
                          plumbing services in Georgetown
                        </Link>
                        , you can do that from our main service page as well.
                      </p>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                        <div className="font-semibold text-gray-900">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                          <li>
                            A plumber’s <span className="font-semibold text-gray-900">diagnosis process</span> matters
                            more than their sales pitch—especially for recurring clogs and leak tracing.
                          </li>
                          <li>
                            In Georgetown, <span className="font-semibold text-gray-900">slab foundations</span> and
                            hard water make shutoffs, cartridges, and water heaters fail in predictable ways.
                          </li>
                          <li>
                            When water is actively damaging your home, the right question is often{" "}
                            <span className="font-semibold text-gray-900">“How do we stop damage safely first?”</span>{" "}
                            and then “What is the permanent fix?”
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Selected These Companies
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Local presence:</span> the business address,
                          map pin, or stated service area includes Georgetown, TX or nearby communities where Georgetown
                          homeowners commonly live and work.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Public ratings data:</span> we reference star
                          ratings and review counts where available from public business listings to sort and compare
                          companies by track record.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Service focus:</span> the company describes core
                          plumbing work—leaks, drains, water heaters, repipes, and emergency calls—rather than only
                          selling equipment or doing unrelated trades.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Reachability:</span> working phone numbers,
                          websites, or maps listings that make it realistic for a Georgetown homeowner to reach the
                          company quickly when something fails.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        We rely strictly on publicly available information. Listings here are not endorsements or
                        guarantees. Before you hire anyone, verify current licensing, insurance, availability, and
                        pricing directly with the company.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        “Local” in practice means the company can actually service Georgetown neighborhoods such as Sun
                        City, Berry Creek, Wolf Ranch, and areas closer to the Square without treating it as an
                        afterthought. Availability is part of quality: a great plumber who cannot schedule you for two
                        weeks is not helpful when you have a leaking shutoff or a main line backing up.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        What to Look for in a Plumber
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Texas license and insurance:</span> confirm the
                          plumber holds an active state license and carries appropriate liability coverage. This matters
                          for any work that touches water heaters, gas lines, or major piping.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Clear diagnosis and options:</span> a good
                          plumber explains what they think is happening, how they will confirm it, and what your repair
                          and replacement paths look like—in plain language.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Written estimates:</span> ask how pricing works
                          (flat-rate vs time-and-materials) and request a written scope before larger jobs start so
                          there are no surprises.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Local experience:</span> Georgetown homes sit on
                          slabs, see hard water, and often have irrigation tie-ins. Look for companies that sound
                          comfortable with slab leaks, main-line work, and water heater issues common in the area.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Communication and follow-through:</span> notice
                          how quickly they respond, whether they keep appointment windows, and how clearly they explain
                          what was done and what to watch for next.
                        </li>
                      </ul>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                          <div className="font-semibold text-gray-900">What “good diagnosis” looks like</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                            <li>
                              For drains: “Is it one fixture or multiple?” and “Does it worsen after laundry or
                              showers?”
                            </li>
                            <li>
                              For leaks: confirming the source (supply vs drain) instead of assuming the nearest wet
                              spot is the cause.
                            </li>
                            <li>
                              For slab leaks: explaining how they will locate the leak and what repair options exist
                              (not just “we’ll break concrete”).
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                          <div className="font-semibold text-gray-900">Georgetown-specific realities</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                            <li>
                              <span className="font-semibold text-gray-900">Hard water:</span> faster wear on cartridges
                              and valves; periodic maintenance can prevent “mystery drips.”
                            </li>
                            <li>
                              <span className="font-semibold text-gray-900">Slabs:</span> leaks are often hidden; early
                              signs matter (hot spots, sound of water, bill spikes).
                            </li>
                            <li>
                              <span className="font-semibold text-gray-900">Irrigation tie-ins:</span> yard leaks can
                              mimic main line issues; good plumbers isolate before digging.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Average Plumbing Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        No two jobs are identical, and every company has its own pricing structure, but homeowners in
                        and around Georgetown, TX tend to see similar patterns. Think in ranges rather than a single
                        number and always get a written estimate for your exact project.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Two notes that matter locally: first, after-hours and weekend calls can change the base service
                        fee; second, repairs that involve drywall, flooring, or concrete often have a plumbing cost and a
                        separate restoration cost. Ask which parts of the job the plumber is responsible for and what
                        will be handled by other trades.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Standard service call:</span> many plumbers
                          charge a diagnostic or service-call fee in the low-to-mid hundreds of dollars, sometimes
                          credited toward approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Minor repairs:</span> addressing a leaking
                          shutoff, replacing a supply line, swapping a trap, or clearing a straightforward clog
                          typically lands in the lower hundreds depending on access, parts, and scheduling.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater replacements:</span> full tank or
                          tankless replacements are commonly quoted in the many-thousands once you include equipment,
                          labor, haul-away, and any code-related adjustments.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and drain work:</span> cabling or jetting
                          a main line is often a few hundred dollars; camera inspections, spot repairs, or more
                          extensive sewer work are significantly higher and depend on layout and access.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Slab leaks and repipes:</span> locating and
                          repairing leaks under a slab, or replacing larger sections of pipe, can run into the
                          many-thousands once you account for plumbing, restoration, and finish work.
                        </li>
                      </ul>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                          For deeper cost context on specific problems, you can also read focused articles such as our{" "}
                          <Link
                            href="/blog/emergency-plumber-cost-georgetown-tx"
                            className="font-semibold text-blue-700"
                          >
                            emergency plumber cost guide for Georgetown
                          </Link>
                          . For a step-by-step hiring checklist, see{" "}
                          <Link
                            href="/blog/how-to-choose-plumber-georgetown-tx"
                            className="font-semibold text-blue-700"
                          >
                            how to choose a reliable plumber in Georgetown TX
                          </Link>
                          . If you are planning broader system work, you may also find it helpful to compare{" "}
                          <Link
                            href="/best/top-hvac-companies-georgetown-tx"
                            className="font-semibold text-blue-700"
                          >
                            top HVAC companies in Georgetown
                          </Link>{" "}
                          and{" "}
                          <Link href="/best/best-roofers-georgetown-tx" className="font-semibold text-blue-700">
                            leading roofers in Georgetown
                          </Link>
                          .
                        </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Emergency Plumbing Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Not every plumbing issue is an emergency, but some clearly are. In Georgetown, TX, the main
                        triggers for true emergency service are active water damage, sewage backing up into fixtures, or
                        safety concerns around gas and water heaters.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you have active leaking right now, stop the damage first: shut off the nearest fixture valve
                        if it works, then the main shutoff if it does not. If you are unsure where the main shutoff is,
                        take a minute to locate it on a calm day—Georgetown emergencies are easier when you are not
                        hunting for a valve while water spreads across flooring.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Active leaks you cannot contain:</span> water
                          coming through ceilings, soaking floors, or flowing from a burst line where shutoffs are not
                          working should be addressed quickly.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and main-line backups:</span> multiple
                          fixtures backing up at once, or wastewater returning through tubs and floor drains, calls for
                          prompt professional help.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">No water to the home:</span> a main break or
                          failed shutoff that leaves you without water is usually treated as urgent.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                        <div className="font-semibold text-gray-900">What to ask on an emergency call</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                          <li>Is this visit for stabilization, a permanent repair, or both?</li>
                          <li>Is there an after-hours fee or minimum service charge?</li>
                          <li>Will you document findings (photos/video) for insurance or landlord records?</li>
                          <li>What should we avoid using until the repair is complete (toilets, laundry, dishwasher)?</li>
                        </ul>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you are facing that kind of issue, start by shutting off water if you can do so safely, then
                        contact a plumber who clearly describes how they handle after-hours or emergency calls. For
                        perspective on what that visit might cost, refer to the emergency pricing guide mentioned above,
                        and use it alongside quotes from the companies listed on this page.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Georgetown TX Plumbing FAQ
                      </h2>
                      <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Do I really need a licensed plumber, or can a handyman handle it?
                          </h3>
                          <p className="mt-1">
                            For anything that touches supply lines, water heaters, gas, or the main drain system, a
                            licensed plumber is the safer, code-appropriate choice. Handymen can be helpful for small
                            fixture swaps, but licensed plumbers are accountable for work that affects safety and
                            long-term reliability.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">How fast can a plumber typically reach me?</h3>
                          <p className="mt-1">
                            In Georgetown, TX many companies offer same-day or next-day service for urgent problems, but
                            schedules tighten during freezes, heavy rain, and holidays. When you call or submit a form,
                            describe the situation clearly so they can prioritize true emergencies like active flooding
                            or sewage backups.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            What should I ask before approving a plumbing estimate?
                          </h3>
                          <p className="mt-1">
                            Ask what is included in the price, what could change it, and whether there are separate fees
                            for after-hours work, disposal, or camera inspections. It is reasonable to request the scope
                            and estimate in writing, especially for larger or multi-phase jobs.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How can I reduce the chance of plumbing emergencies?
                          </h3>
                          <p className="mt-1">
                            Simple habits make a big difference: know where your main shutoff and fixture shutoffs are,
                            protect hose bibs before freezes, avoid flushing wipes or pouring grease down drains, and
                            address slow drains and small leaks early rather than waiting for a full backup.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Are permits required for plumbing work?</h3>
                          <p className="mt-1">
                            Larger jobs—such as water heater replacements, major repipes, or work that ties into the
                            city sewer—often require permits and inspections. A licensed plumber who regularly works in
                            Georgetown, TX can explain when permits apply and how they are handled in your case.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            What are early signs of a slab leak in a Georgetown home?
                          </h3>
                          <p className="mt-1">
                            Common early signals include warm spots on the floor, the sound of running water when
                            fixtures are off, unexplained bill increases, damp carpet along interior walls, or reduced
                            hot-water performance. Slab leaks are easiest to handle when found early—do not wait for a
                            visible crack or pooling water.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            If multiple drains are backing up, what should I do first?
                          </h3>
                          <p className="mt-1">
                            Treat it like a main-line issue: stop using water (no laundry, showers, or dishwashers),
                            document which fixtures are affected, and request professional help. Continued water use can
                            make a backup worse and spread contamination into tubs or floor drains.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            How do I compare multiple plumbers fairly for the same job?
                          </h3>
                          <p className="mt-1">
                            Try to get written estimates that describe the same scope of work, materials, and warranty
                            terms. Look beyond price to responsiveness, clarity of explanations, and whether each
                            company is willing to answer your questions before and after the job. When in doubt, use the{" "}
                            <Link
                              href="/blog/how-to-find-a-good-plumber-georgetown-tx"
                              className="font-semibold text-blue-700"
                            >
                              plumber checklist for Georgetown
                            </Link>{" "}
                            as a reference while you compare.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Should I replace shutoff valves proactively?
                          </h3>
                          <p className="mt-1">
                            If a shutoff is stuck, leaking, or will not fully close, it is a liability during an
                            emergency. Many homeowners in Georgetown replace problem shutoffs during fixture upgrades so
                            a future leak can be contained quickly without shutting off water to the entire home.
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
                        Georgetown homeowners rely on HVAC more than most people realize. From May through September,
                        Central Texas heat can push systems to run long hours, and small issues (weak airflow, a
                        struggling outdoor unit, a clogged drain line) can turn into a no-cool call fast. In winter,
                        short cold snaps expose maintenance gaps just as quickly—especially in homes where the heater
                        sits idle for weeks at a time.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown also has a mix of home types that change what “good HVAC” looks like in practice:
                        two-story layouts with hot upstairs rooms, newer open floorplans that need balanced airflow, and
                        older homes where insulation, returns, and duct paths may not match modern comfort expectations.
                        The best HVAC companies do not jump straight to replacement—they explain what they observed, what
                        the fix accomplishes, and what you should monitor afterward.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        This page is built to help you compare <strong>real HVAC companies serving Georgetown, TX</strong>
                        using practical criteria: reachability, evidence of actual residential heating/cooling work,
                        transparent service offerings, and the ability to explain options without pressure. If you want
                        service options instead of comparison, start with{" "}
                        <Link href="/services/hvac-georgetown-tx" className="font-semibold text-blue-700">
                          HVAC service in Georgetown, TX
                        </Link>
                        .
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you’re troubleshooting a no-cool situation, read{" "}
                        <Link href="/blog/why-your-ac-is-not-cooling-georgetown-tx" className="font-semibold text-blue-700">
                          why your AC is not cooling in Georgetown TX
                        </Link>
                        . For pricing expectations, see{" "}
                        <Link href="/blog/ac-repair-cost-georgetown-tx" className="font-semibold text-blue-700">
                          AC repair cost in Georgetown TX
                        </Link>
                        . For early warning signs, review{" "}
                        <Link href="/blog/signs-you-need-hvac-repair-georgetown-tx" className="font-semibold text-blue-700">
                          signs you need HVAC repair
                        </Link>
                        .
                      </p>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>
                            If the AC is running but the house is warming up, describe the symptom clearly (no-cool vs
                            weak airflow vs certain rooms hot) and ask what they will check first.
                          </li>
                          <li>
                            For replacements, insist on written equipment model numbers and a scope that mentions airflow
                            and ductwork, not just “new unit.”
                          </li>
                          <li>
                            If schedules are full, good companies still give you triage steps and realistic ETAs—watch
                            for clear communication, not vague promises.
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Evaluated Providers
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Ratings alone are not enough. Georgetown has a mix of older neighborhoods near the Square and
                        fast-growing areas with newer construction, and the “right” HVAC provider depends on whether
                        you need diagnostics, comfort improvements, or replacement planning. We use the criteria below
                        to filter for companies that appear equipped to serve real homeowners, not just generate leads.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        In other words: we prioritize companies that look reachable, service-focused, and specific about
                        HVAC work. For your final decision, you should still confirm the details that matter most for
                        your home: licensing/insurance, warranty terms, whether a permit is required for certain work,
                        and whether the quote includes any needed duct or electrical corrections.
                      </p>
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
                        <li>
                          <span className="font-semibold text-gray-900">Clarity of scope:</span> providers that describe
                          what a visit includes (diagnosis first, options second) rather than pushing replacement by
                          default.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Fit for Texas heat:</span> evidence they handle
                          the common Central Texas realities: peak-load no-cool calls, airflow imbalance in two-story
                          homes, and drain/condensate issues that show up in humid stretches.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        We rely solely on publicly available information and do not receive compensation for
                        placement. Always confirm current licensing, insurance, pricing, and availability directly with
                        any HVAC company before hiring.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        A practical way to compare two providers is to ask both for the same thing: a written scope that
                        includes what they will diagnose, what they will replace, and what the warranty covers. Clarity
                        now usually means fewer surprises later.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common HVAC Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Most Georgetown, TX HVAC calls fall into three buckets: restore cooling/heating quickly,
                        stabilize comfort across rooms, or plan a replacement that actually fits the home. Here are the
                        most common service categories and what they typically include.
                      </p>
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
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold text-gray-900">AC repair (no-cool / weak airflow)</div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            Best providers start with a diagnosis you can follow: what they measured, what failed, and
                            what would happen if you do nothing. If your issue is comfort-related (one room always
                            hotter), ask whether airflow balancing or duct fixes are part of the plan.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            In Georgetown summers, it is common for failures to show up during peak afternoon load. A
                            good company will ask about timing (only hottest hours vs all day), thermostat behavior, and
                            whether airflow feels weak at multiple vents.
                          </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold text-gray-900">Installation / replacement</div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            Replacement is a project, not a product. Compare written scopes that include equipment
                            model numbers, efficiency ratings, warranty terms, and any ductwork or electrical items
                            included. If a quote is vague, it is hard to compare fairly.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            If you are replacing because of comfort (hot rooms, humidity, noisy operation), ask how the
                            new plan addresses airflow and return placement. New equipment without airflow fixes often
                            leaves the original comfort problem intact.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Maintenance (what a useful tune-up includes)</div>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">
                          “Maintenance” should produce something measurable: improved reliability, better comfort, or
                          fewer emergency calls. For Georgetown homeowners, a useful maintenance visit typically includes
                          coil and drain checks, basic electrical inspection, filter guidance, and a short summary of
                          anything you should watch over the next 30–60 days.
                        </p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Typical HVAC Costs in Georgetown TX
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
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Two pricing details that trip up Georgetown homeowners: after-hours minimums (which can change
                        the base fee) and “scope gaps” (for example, an HVAC quote that excludes ductwork, electrical
                        corrections, or thermostat changes). When comparing bids, confirm what is included and what is
                        explicitly excluded.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you are specifically researching replacement budgets, see{" "}
                        <Link href="/blog/cost-to-replace-hvac-georgetown" className="font-semibold text-blue-700">
                          cost to replace HVAC in Georgetown, TX
                        </Link>{" "}
                        for a breakdown of the major pricing drivers.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Emergency HVAC Service in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        In Georgetown, “emergency HVAC” usually means one of two things: <strong>no cooling during peak
                        heat</strong> or a system doing something that makes you uncomfortable running it (repeated
                        failed starts, tripping breakers, or unusual burning smell). When schedules are full, good
                        companies still give you clear triage guidance and realistic ETAs.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Before you call:</span> replace an overdue
                          filter, confirm breakers are not tripped, and note thermostat behavior (error codes, short
                          cycling, warm air).
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What to say on the phone:</span> describe the
                          symptom clearly (no cool vs weak airflow vs uneven rooms) and whether vulnerable occupants are
                          in the home.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What to avoid:</span> do not open sealed system
                          components or attempt refrigerant work. If you smell burning or see smoke, shut the system off
                          and request urgent service.
                        </li>
                      </ul>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you need a same-day option, it helps to be specific: “system runs but blows warm,” “outdoor
                        unit not spinning,” “thermostat shows error code,” or “water near the indoor unit.” Those details
                        help a dispatcher route you to the right tech and reduce wasted time on arrival.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        FAQ: Georgetown HVAC Companies
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
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            What are the most common causes of “AC running but not cooling” in Georgetown?
                          </h3>
                          <p className="mt-1">
                            In peak heat, common causes include airflow restrictions (dirty filters, return issues),
                            electrical components failing under load (like capacitors), drain/condensate safety switches
                            tripping, and performance problems that require diagnosis. A good HVAC tech will explain what
                            they confirmed, not just what they replaced.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Do I need a new HVAC system if some rooms are always hotter?
                          </h3>
                          <p className="mt-1">
                            Not necessarily. Two-story Georgetown homes often have comfort imbalance caused by duct
                            design, returns, insulation, or airflow balancing. Ask a provider to evaluate airflow and
                            room-to-room performance before recommending replacement.
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
                              href="/blog/how-to-find-a-good-plumber-georgetown-tx"
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

            <aside className="min-w-0 md:col-span-1 md:sticky md:top-24 md:self-start">
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

