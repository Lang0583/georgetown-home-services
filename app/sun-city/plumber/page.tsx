import type { Metadata } from 'next';
import AffiliateCTA from '@/components/AffiliateCTA';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plumber in Sun City Georgetown TX | Local Experts',
  description:
    'Find trusted plumber services in Sun City, Georgetown TX. Compare local experts, read reviews, and get free quotes today.',
};

export default function SunCityPlumberPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a plumber cost in Sun City, Georgetown TX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most plumbing jobs in Sun City range from $150 to $500 for common repairs like leaky faucets or toilet replacements. Larger jobs such as water heater replacement typically run $800 to $1,500, while slab leak repairs can cost $2,000 to $5,000 depending on severity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do Sun City homes have so many plumbing problems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sun City homes were largely built in the 1990s and 2000s on Georgetown\'s notorious expansive clay soil. This soil shifts dramatically with Texas heat and rainfall cycles, stressing pipes and causing slab leaks. Aging fixtures and years of hard water mineral buildup also contribute to frequent plumbing issues.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do plumbers in Sun City offer senior discounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many local plumbers serving the Sun City 55+ community offer senior discounts of 5–15%. Always ask upfront when requesting a quote. Some also offer flexible payment plans suited to residents on fixed incomes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly can a plumber respond in Sun City Georgetown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Local Georgetown plumbers familiar with Sun City can typically respond within 2–4 hours for urgent issues and offer same-day appointments for non-emergencies. Emergency plumbing services are available 24/7 for burst pipes or major leaks.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://georgetownhomeservices.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plumbing',
        item: 'https://georgetownhomeservices.com/plumbing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sun City Plumber',
        item: 'https://georgetownhomeservices.com/sun-city/plumber',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600 underline">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <Link href="/plumbing" className="hover:text-blue-600 underline">
                Plumbing
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li className="text-gray-800 font-medium">Sun City Plumber</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Best Plumber in Sun City, Georgetown TX
        </h1>

        {/* Intro Paragraph */}
        <section className="mb-8 prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Sun City Georgetown is one of Texas's premier 55+ active adult
            communities — but living in paradise doesn't mean escaping plumbing
            headaches. In fact, Sun City residents face a unique combination of
            challenges that make having a reliable, local plumber more important
            than ever. Homes throughout the community, many built between the
            late 1990s and early 2010s, sit on Georgetown's notoriously
            expansive clay soil. This soil swells and contracts with every rain
            and drought cycle, putting continuous stress on underground pipes
            and slab foundations. The result: slab leaks, cracked drain lines,
            and shifting supply pipes are alarmingly common. Add decades of
            hard Central Texas water depositing mineral scale inside pipes and
            water heaters, and the maintenance needs stack up quickly. For
            residents on fixed incomes, the last thing you need is a surprise
            plumbing emergency with an inflated price tag from a company that
            doesn't know the neighborhood. That's why connecting with a
            trustworthy, experienced local plumber in Sun City is one of the
            smartest home decisions you can make.
          </p>
        </section>

        <AffiliateCTA
          headline="Get Free Plumbing Quotes in Sun City Today"
          subtext="Compare trusted local plumbers serving the Sun City Georgetown community. No obligation, no hassle."
          ctaText="Get My Free Quote"
        />

        {/* 3 Reasons to Hire Local */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3 Reasons Sun City Residents Should Hire a Local Georgetown Plumber
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                1. They Know Georgetown's Clay Soil
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Local plumbers who work throughout Williamson County understand
                how Georgetown's reactive clay soil behaves across seasons. They
                won't just patch a slab leak — they'll assess soil movement
                risk, recommend appropriate pipe materials, and help you avoid
                costly repeat repairs. Out-of-town contractors rarely have this
                hyper-local expertise.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-5 border border-green-100">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                2. Faster Response Times for Seniors
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                A burst pipe or sewage backup isn't just inconvenient — for
                older homeowners, it can be a serious health and safety concern.
                Local Georgetown plumbers can reach Sun City in minutes, not
                hours. They prioritize the community they live and work in, and
                many specifically serve Sun City residents with senior-friendly
                scheduling and same-day service windows.
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-100">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                3. Fair Pricing for Fixed Incomes
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Local plumbers serving Sun City understand the community's
                demographics and often offer senior discounts, transparent flat
                pricing, and flexible payment options. Unlike national franchise
                plumbers with high overhead and aggressive upselling, trusted
                neighborhood contractors build their business on referrals and
                long-term relationships — meaning they're motivated to treat you
                right every time.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Plumber Pricing Guide for Sun City, Georgetown TX
          </h2>
          <p className="text-gray-600 mb-5 text-sm">
            Prices reflect typical Georgetown TX market rates as of 2024. Actual
            quotes may vary based on home age, accessibility, and job complexity.
            Always get at least two estimates before committing.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="text-left p-4 font-semibold">Service</th>
                  <th className="text-left p-4 font-semibold">Low Estimate</th>
                  <th className="text-left p-4 font-semibold">High Estimate</th>
                  <th className="text-left p-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    Faucet Repair / Replacement
                  </td>
                  <td className="p-4 text-gray-600">$150</td>
                  <td className="p-4 text-gray-600">$350</td>
                  <td className="p-4 text-gray-500 text-sm">
                    Older fixtures common in Sun City homes
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    Toilet Replacement
                  </td>
                  <td className="p-4 text-gray-600">$200</td>
                  <td className="p-4 text-gray-600">$500</td>
                  <td className="p-4 text-gray-500 text-sm">
                    Including parts; ADA-height models popular
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    Water Heater Replacement
                  </td>
                  <td className="p-4 text-gray-600">$800</td>
                  <td className="p-4 text-gray-600">$1,800</td>
                  <td className="p-4 text-gray-500 text-sm">