import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import JsonLd from "../../../components/JsonLd";
import { getBlog, getServices } from "../../../lib/site-content";

export const metadata: Metadata = {
  title: "Plumbing Guides for Georgetown, TX",
  description:
    "Practical plumbing guides for Georgetown homeowners: common issues, when to call a pro, cost drivers, and a directory of plumbers to compare.",
};

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you schedule plumbing service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This site is a directory and homeowner guide. Use the Best Of page to compare plumbers and contact providers directly.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I start if I’m not sure what’s wrong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the main plumbing guide, then use symptom pages like clogged drains or leak detection to narrow down likely causes and what to ask when you call.",
        },
      },
    ],
  };
}

export default function PlumbingHubPage() {
  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "plumber-georgetown-tx") ?? null;
  const supporting = services.filter((s) => s.bestSlugs?.includes("best-plumbers-georgetown-tx") && s.slug !== "plumber-georgetown-tx");
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-plumbers-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Plumbing in Georgetown, TX</h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Use these pages to understand common Georgetown plumbing issues (clogs, leaks, water heaters), what affects cost, and what to ask
                before you hire. When you’re ready, compare companies in the directory and contact providers directly.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-plumbers-georgetown-tx" className="text-blue-700 hover:underline">
                  Compare Georgetown Plumbers
                </Link>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Start here</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LinkCard href={`/services/${core.slug}`} title={core.title} description={core.description} badge={core.serviceType} />
                  <LinkCard
                    href="/best/best-plumbers-georgetown-tx"
                    title="Best Plumbers in Georgetown, TX"
                    description="Directory landing page with provider cards, red flags, and how to compare quotes."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting plumbing pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Symptom and scenario pages that help you narrow down likely causes and the right questions to ask.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {supporting.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {posts.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Cost and homeowner guides</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Repeat-use content: cost drivers, checklists, and decision support. Each post links back to service guides and the provider directory.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {posts.map((p) => (
                    <LinkCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} description={p.description} badge={p.readTime} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </Container>
    </div>
  );
}

