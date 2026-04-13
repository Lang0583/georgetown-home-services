import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import CTASection from "../../components/CTASection";
import LinkCard from "../../components/LinkCard";
import BlogMidContentEmailCard from "../../components/BlogMidContentEmailCard";
import JsonLd from "../../components/JsonLd";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBlog } from "../../lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Georgetown, TX Homeowner Blog: Costs, Maintenance, and Hiring Tips",
  description:
    "Repeat-use homeowner content for Georgetown, TX: monthly maintenance, seasonal checklists, cost guides, after-storm steps, warning signs, and contractor hiring checklists.",
  pathname: "/blog",
  ogType: "website",
});

type BlogCategoryKey = "costs" | "repair" | "maintenance" | "emergency" | "hiring";

const CATEGORY_META: Record<
  BlogCategoryKey,
  { title: string; description: string; matcher: (slug: string, title: string) => boolean }
> = {
  costs: {
    title: "Costs & replacement planning",
    description: "Budgeting guidance for repairs and replacements in Georgetown, TX.",
    matcher: (slug, title) => slug.includes("cost") || title.toLowerCase().includes("cost"),
  },
  repair: {
    title: "Repair advice",
    description: "Troubleshooting and what to do next when something breaks.",
    matcher: (slug, title) =>
      slug.includes("repair") ||
      slug.includes("not-cooling") ||
      title.toLowerCase().includes("repair"),
  },
  maintenance: {
    title: "Maintenance",
    description: "Preventative tips to reduce breakdowns and extend system life.",
    matcher: (slug, title) => slug.includes("maintenance") || slug.includes("tune") || title.toLowerCase().includes("maintenance"),
  },
  emergency: {
    title: "Emergency issues",
    description: "When to treat a problem as urgent and what it typically costs.",
    matcher: (slug, title) => slug.includes("emergency") || title.toLowerCase().includes("emergency"),
  },
  hiring: {
    title: "Hiring guides",
    description: "Checklists for choosing the right provider and comparing quotes.",
    matcher: (slug, title) =>
      slug.includes("how-to-find") ||
      slug.includes("how-to-choose") ||
      title.toLowerCase().includes("how to find") ||
      title.toLowerCase().includes("how to choose"),
  },
};

function categorizePosts(posts: ReturnType<typeof getBlog>) {
  const categories: Record<BlogCategoryKey, typeof posts> = {
    costs: [],
    repair: [],
    maintenance: [],
    emergency: [],
    hiring: [],
  };

  const uncategorized: typeof posts = [];
  for (const p of posts) {
    const slug = p.slug.toLowerCase();
    const title = p.title.toLowerCase();

    const key = (Object.keys(CATEGORY_META) as BlogCategoryKey[]).find((k) =>
      CATEGORY_META[k].matcher(slug, title)
    );
    if (key) categories[key].push(p);
    else uncategorized.push(p);
  }

  // Put leftovers into "repair" so every post is linked somewhere.
  categories.repair.push(...uncategorized);

  return categories;
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these recommendations unbiased?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "These guides are written for Georgetown homeowners and focus on practical decision-making. Always confirm licensing, insurance, pricing, and availability directly with any provider before hiring.",
        },
      },
      {
        "@type": "Question",
        name: "Do you schedule service appointments?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. This site is a directory and homeowner guide. You choose who to contact and what to schedule directly with the provider.",
        },
      },
      {
        "@type": "Question",
        name: "Which topics should I read first?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "If you’re budgeting, start with the cost guides. If you’re dealing with a problem today, start with repair or emergency posts and then review the related service pages and best-of comparisons.",
        },
      },
    ],
  };
}

export default function BlogIndexPage() {
  const posts = getBlog();
  const categories = categorizePosts(posts);

  const featured = posts.slice(0, Math.min(6, posts.length));
  const featuredFirst = featured.slice(0, 3);
  const featuredRest = featured.slice(3);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />

          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Blog</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Practical Home Service Guides for Georgetown, TX
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                This blog is designed for return visits: monthly maintenance reminders, seasonal Georgetown checklists, cost guides,
                after-storm steps, warning signs, and “how to choose a contractor” checklists.
                Every post includes a practical takeaway, links to service guides and Best Of comparisons, and a light email signup for maintenance reminders.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-gray-700">
                <a className="hover:underline" href="#costs">
                  Costs
                </a>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <a className="hover:underline" href="#repair">
                  Repair advice
                </a>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <a className="hover:underline" href="#maintenance">
                  Maintenance
                </a>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <a className="hover:underline" href="#emergency">
                  Emergency
                </a>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <a className="hover:underline" href="#hiring">
                  Hiring guides
                </a>
              </div>
            </div>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Featured guides</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                Start here if you’re new to the site or planning a major repair or replacement.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {featuredFirst.map((p) => (
                  <LinkCard
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    title={p.title}
                    description={p.description}
                    badge={p.readTime}
                  />
                ))}
              </div>

              <div className="mt-8">
                <BlogMidContentEmailCard source="blog-index-mid" />
              </div>

              {featuredRest.length ? (
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {featuredRest.map((p) => (
                    <LinkCard
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      title={p.title}
                      description={p.description}
                      badge={p.readTime}
                    />
                  ))}
                </div>
              ) : null}
            </section>

            {(Object.keys(CATEGORY_META) as BlogCategoryKey[]).map((key) => {
              const meta = CATEGORY_META[key];
              const items = categories[key];
              if (!items.length) return null;

              return (
                <section key={key} id={key} className="scroll-mt-24">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{meta.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">{meta.description}</p>

                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {items.map((p) => (
                      <LinkCard
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        title={p.title}
                        description={p.description}
                        badge={p.readTime}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
              <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-700">
                <div>
                  <div className="font-semibold text-gray-900">Are these guides unbiased?</div>
                  <p>
                    These articles are written for Georgetown homeowners and focus on clear decision-making. Always confirm
                    licensing, insurance, pricing, and availability directly with any provider before hiring.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Do you schedule appointments?</div>
                  <p>
                    No. This site is a directory and homeowner guide. You choose who to contact and what to schedule directly with the provider.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Where should I start?</div>
                  <p>
                    Budgeting: start with cost guides. Urgent problems: start with repair/emergency posts, then review the
                    related service pages and best-of comparisons.
                  </p>
                </div>
              </div>
            </section>

            <div className="pt-2">
              <CTASection
                eyebrow="Explore next"
                title="Compare providers or browse service guides"
                description="Jump to ranked local companies for each category, or start from the core service pages."
                primaryHref="/best"
                emailFormHref="/#email-capture"
                secondary={
                  <div className="text-sm text-gray-600">
                    Service hubs:{" "}
                    <Link href="/services" className="font-semibold underline underline-offset-4">
                      Services
                    </Link>
                    ,{" "}
                    <Link href="/best" className="font-semibold underline underline-offset-4">
                      Best Of
                    </Link>
                    .
                  </div>
                }
                showDisclaimer
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

