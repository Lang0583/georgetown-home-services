import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQList from "../../../components/FAQList";
import CTASection from "../../../components/CTASection";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
import RichText from "../../../components/RichText";
import { ButtonLink } from "../../../components/Button";
import {
  getBestBySlug,
  getLocationBySlug,
  getServiceBySlug,
  getServices,
  getServiceSlugs,
} from "../../../lib/site-content";
import { getGeneratedPage } from "../../../lib/generatedPages";
import ServiceTopProvidersSection from "../../../components/ServiceTopProvidersSection";
import { getBusinessCategoryForServiceSlug, getBusinessesByCategory } from "../../../lib/businesses";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const isPlumberService = service.slug === "plumber-georgetown-tx";
  const isHvacService = service.slug === "hvac-georgetown-tx";
  const isRooferService = service.slug === "roofer-georgetown-tx";

  const generated = getGeneratedPage(slug);
  const location = getLocationBySlug(service.locationSlug);
  const relatedServices = service.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const bestPages = service.bestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const businessCategory = getBusinessCategoryForServiceSlug(service.slug);
  const providersFromJson =
    businessCategory !== null ? getBusinessesByCategory(businessCategory) : [];

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start lg:gap-12">
            <div className="min-w-0 md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                {service.serviceType} • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{service.h1}</h1>
              {isPlumberService ? (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Plumbing issues in Georgetown, TX rarely happen at a convenient time. From slab leaks and aging water
                  heaters to main-line clogs and failing shutoff valves, this page is built to help Georgetown
                  homeowners understand their options, set realistic price expectations, and decide when it is time to
                  bring in a licensed plumber.
                </p>
              ) : isHvacService ? (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  In Georgetown, TX, long stretches of triple-digit heat mean your AC and heating system cannot be an
                  afterthought. This HVAC page focuses on the most common cooling and heating problems in local homes,
                  what repairs and replacements typically involve, and when to call a professional before a small issue
                  becomes a no-cool emergency.
                </p>
              ) : isRooferService ? (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Georgetown, TX roofs see hail, high winds, and harsh sun, which makes small problems easy to ignore
                  until water finds its way inside. Here you will find guidance on common roofing issues for Georgetown
                  homes, what different repairs tend to cost, and how to decide when a repair is enough versus when it
                  is time to plan a full replacement.
                </p>
              ) : (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">{service.description}</p>
              )}

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">What we’ll handle</div>
                <ul className="mt-3 list-disc space-y-2.5 pl-6 text-sm leading-relaxed text-gray-700">
                  {service.heroBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                {isPlumberService ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common Plumbing Problems in Georgetown Homes
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Slab leaks and hidden pipe damage:</span> small
                          hot spots on the floor, unexpected water bills, or damp carpet along interior walls.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater failures:</span> lukewarm water,
                          noisy tanks, or slow leaks around the base—especially on older units working hard in Texas
                          heat.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Main line and sewer clogs:</span> multiple
                          fixtures backing up at once, gurgling drains, or sewage odors near cleanouts or tubs.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">High water pressure and failing shutoffs:</span>{" "}
                          hammering pipes, stuck angle stops, and outdoor hose bibs that leak at the wall.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Plumbing Pricing Expectations in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Every company prices work differently, but homeowners around Georgetown, TX commonly see:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Standard service calls:</span> a diagnostic fee
                          in the low-to-mid hundreds, sometimes credited toward approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Smaller repairs:</span> fixing a leaking
                          shutoff, swapping a supply line, or clearing a simple clog often lands in the lower hundreds
                          depending on access and parts.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater replacements:</span> full
                          replacements—especially for larger or tankless units—are typically quoted in the
                          many-thousands, including labor and haul-away.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and drain work:</span> cabling or jetting
                          a main line is usually a few hundred dollars; repairs that require digging or pipe
                          replacement are significantly more.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        These are not quotes—always request a written estimate for your specific situation and ask what
                        could change the price.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        When to Call a Professional Plumber
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Active water damage:</span> wet ceilings,
                          buckling floors, or water near electrical fixtures should be addressed immediately by a
                          licensed plumber.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer backups or strong odors:</span> multiple
                          drains backing up or sewage smells inside usually indicate a main-line issue, not just a
                          simple clog.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Gas lines or major piping changes:</span> any
                          work involving gas, slab penetrations, or large sections of pipe is not a DIY project.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Repeated “temporary” fixes:</span> if the same
                          problem keeps returning, it is often cheaper long-term to have a professional diagnose the
                          root cause.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Guides for Georgetown Homeowners
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        For deeper research, many Georgetown, TX homeowners start with:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-blue-700">
                        <li>
                          <Link href="/best/best-plumbers-georgetown-tx" className="font-semibold hover:underline">
                            Best Plumbers in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/how-to-find-a-good-plumber-georgetown"
                            className="font-semibold hover:underline"
                          >
                            How to Find a Good Plumber in Georgetown
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : isHvacService ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common HVAC Problems in Georgetown Homes
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">No-cool calls during heat waves:</span> systems
                          that run constantly without reaching the set temperature or shut off on safety switches.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Uneven temperatures between floors:</span> hot
                          upstairs rooms and chilly downstairs spaces caused by airflow and duct design, not just
                          equipment size.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Drain line and condensate issues:</span> backed
                          up drain lines that trip safety switches or cause water around indoor units and closets.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Aging or noisy equipment:</span> older systems
                          that struggle in Georgetown heat, short-cycle, or cause power issues when starting.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        HVAC Pricing Expectations in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        HVAC quotes vary widely based on equipment, access, and scope of work, but homeowners around
                        Georgetown, TX often see:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Service call and basic diagnosis:</span>{" "}
                          commonly a fee in the low-to-mid hundreds, sometimes credited toward approved repairs on the
                          same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Typical repairs:</span> parts like capacitors,
                          contactors, or simple drain clearings are often in the lower hundreds depending on access and
                          brand.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Major repairs:</span> coils, compressors, or
                          control boards can be significantly more and may approach replacement-level pricing on older
                          systems.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Full system replacement:</span> swapping indoor
                          and outdoor units, especially for higher-efficiency setups, is typically quoted in the
                          many-thousands depending on tonnage and duct work.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        Treat these as directional only—always ask for a written proposal that spells out equipment
                        models, scope, and warranty terms.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        When to Call an HVAC Professional
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">No cooling or no heat:</span> if your system is
                          not running or only blows room-temperature air during extreme weather, call a licensed HVAC
                          technician quickly.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Repeated breaker trips:</span> electrical issues
                          or hard-starting equipment can be a safety concern and should be evaluated professionally.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water around the air handler:</span> water in a
                          closet, attic, or garage near your HVAC equipment usually warrants prompt attention to prevent
                          damage and mold.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Persistent comfort problems:</span> hot rooms,
                          short cycling, or very high bills can signal sizing, duct, or control issues an HVAC company
                          can diagnose.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Guides for Georgetown Homeowners
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        For more background before you schedule service, you can also read:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-blue-700">
                        <li>
                          <Link
                            href="/best/top-hvac-companies-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            Top HVAC Companies in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/cost-to-replace-hvac-georgetown" className="font-semibold hover:underline">
                            Cost to Replace HVAC in Georgetown
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : isRooferService ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common Roofing Problems in Georgetown
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Hail and wind damage:</span> granule loss,
                          bruised shingles, lifted edges, and missing tabs after Central Texas storms.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Aging shingles and UV wear:</span> brittle or
                          curling shingles on older roofs exposed to years of sun on open Georgetown lots.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Flashing and valley leaks:</span> water stains
                          near chimneys, walls, or in valleys where workmanship matters as much as material choice.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Vent and penetration issues:</span> cracked
                          boots or poorly sealed penetrations that let water track into attics over time.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Roofing Pricing Expectations in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Roof pricing depends on pitch, size, material, and whether there is underlying damage, but
                        Georgetown, TX homeowners generally see:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Minor repairs:</span> replacing a small number
                          of damaged shingles or resealing a penetration is often in the lower hundreds depending on
                          access and height.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Leak tracing and patching:</span> diagnosing a
                          leak and repairing a localized area can cost more when attic access, decking, or flashing
                          needs work.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Full replacement:</span> re-roofing a typical
                          Georgetown home, especially with upgraded materials or complex roofs, is usually quoted in the
                          many-thousands.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        Because storm and insurance details matter, it is important to get written estimates and clarify
                        what work is covered before authorizing a full replacement.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        When to Call a Roofing Professional
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Active leaks or ceiling stains:</span> any water
                          entering the home or fresh staining after a storm should be inspected quickly.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Storm damage:</span> hail, fallen limbs, or
                          wind-driven debris visible from the ground are good reasons to call a roofer instead of
                          climbing a ladder yourself.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Older roofs near end of life:</span> if your
                          roof is already at the typical lifespan for its material, a roofer can help you plan repairs
                          versus full replacement.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Repeated patching in the same area:</span> leaks
                          that keep returning may signal a deeper flashing or design issue that needs a more thorough
                          fix.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Guides for Georgetown Homeowners
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        If you are gathering information before you talk with a roofer, you may also want to review:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-blue-700">
                        <li>
                          <Link href="/best/best-roofers-georgetown-tx" className="font-semibold hover:underline">
                            Best Roofers in Georgetown TX
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : generated ? (
                  <GeneratedArticleBody html={generated.html} />
                ) : (
                  <RichText blocks={service.content} />
                )}
              </div>

              {providersFromJson.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {isPlumberService
                      ? "Top Plumbers Serving Georgetown TX"
                      : isHvacService
                      ? "Top HVAC Companies Serving Georgetown TX"
                      : isRooferService
                      ? "Top Roofers Serving Georgetown TX"
                      : "Top Providers Serving Georgetown"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    These listings are compiled from public business information for companies that serve Georgetown, TX.
                    They are provided to help you compare options; confirm current licensing, insurance, pricing, and
                    availability with any provider before hiring.
                  </p>
                  <div className="mt-6">
                    <ServiceTopProvidersSection businesses={providersFromJson} />
                  </div>
                </section>
              ) : null}

              <div>
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {isPlumberService
                      ? "Plumbing FAQ for Georgetown TX Homeowners"
                      : isHvacService
                      ? "HVAC FAQ for Georgetown TX Homeowners"
                      : isRooferService
                      ? "Roofing FAQ for Georgetown TX Homeowners"
                      : "Frequently Asked Questions"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    These answers summarize common questions we hear from homeowners in and around Georgetown, TX. Use
                    them as a starting point, then confirm details with any professional you choose to work with.
                  </p>
                  <div className="mt-6">
                    <FAQList faqs={service.faqs} />
                  </div>
                </section>
              </div>

              {relatedServices.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related Services</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {relatedServices.map((s) => (
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
                defaultService={service.serviceType}
                defaultLocation={location?.title ?? "Georgetown, TX"}
                formId="lead"
              />
              {bestPages.length ? (
                <div className="mt-8">
                  <CTASection
                    eyebrow="Best Of"
                    title="Explore trusted recommendations"
                    description="Read guides that explain what to look for and why it matters."
                    primaryHref={`/best/${bestPages[0]!.slug}`}
                    primaryLabel="View Best Of"
                  />
                </div>
              ) : null}
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Service area</div>
                <div className="mt-2 text-sm leading-relaxed text-gray-700">{location?.title ?? "Georgetown, TX"}</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Get help fast</h2>
              <p className="mt-2 text-sm text-gray-700">
                Submit the form and we’ll follow up with next steps for your plumbing, HVAC, or roofing need.
              </p>
              <div className="mt-4">
                <ButtonLink href="#lead" className="rounded-full px-5 py-2.5 text-sm">
                  Get Free Quotes
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Popular guides</h2>
              <p className="mt-2 text-sm text-gray-700">
                Learn what to look for and how to avoid common service mistakes.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {service.bestSlugs.slice(0, 1).map((bSlug) => {
                  const b = getBestBySlug(bSlug);
                  if (!b) return null;
                  return (
                    <Link key={b.slug} href={`/best/${b.slug}`} className="text-sm font-semibold text-gray-900 hover:underline">
                      {b.title}
                    </Link>
                  );
                })}
                {service.relatedServiceSlugs.slice(0, 2).map((sSlug) => {
                  const s = getServices().find((x) => x.slug === sSlug);
                  if (!s) return null;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm font-semibold text-gray-900 hover:underline">
                      {s.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

