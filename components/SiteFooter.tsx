import Link from "next/link";
import { NEIGHBORHOOD_BROWSE_ENTRIES } from "../lib/neighborhood-browse";
import { AUTHOR_PROFILE_PATH } from "../lib/site-author";
import { PROVIDER_INFO_DISCLAIMER } from "../lib/provider-disclaimer";
import { isNoindexSlug, showExtendedHomeServices } from "../lib/public-site-scope";
import { getBrandName, getContact } from "../lib/site-content";

// Sitewide footer: rendered on every request. Like the header, links to
// noindex slugs are filtered to avoid funneling link equity into pages
// Google has been told not to index.

const footerBarLinkClass =
  "inline-flex min-h-11 items-center rounded-md px-0.5 hover:underline sm:min-h-0";

export default function SiteFooter() {
  const brand = getBrandName();
  const contact = getContact();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
          <div>
            <div className="text-sm font-semibold text-gray-900">{brand}</div>
            <div className="mt-1 text-sm text-gray-600">
              <Link className={`${footerBarLinkClass} text-gray-700`} href="/contact#feedback">
                Contact &amp; feedback
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Home</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/seasonal">
                  Seasonal maintenance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Services</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:underline" href="/services">
                  Service guides hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/compare">
                  Compare providers
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/pricing">
                  Pricing guide
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/plumbing">
                  Plumbing hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/hvac">
                  HVAC hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/roofing">
                  Roofing hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/electrical">
                  Electrical hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/landscaping">
                  Landscaping hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/pest-control">
                  Pest control hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/foundation">
                  Foundation hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/house-cleaning">
                  Cleaning hub
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/costs">
                  Cost guides
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/plumber-georgetown-tx">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/hvac-georgetown-tx">
                  HVAC
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/services/roofer-georgetown-tx">
                  Roofing
                </Link>
              </li>
              {showExtendedHomeServices() && !isNoindexSlug("electrician-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/services/electrician-georgetown-tx">
                    Electrical
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("landscaping-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/services/landscaping-georgetown-tx">
                    Landscaping
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("pest-control-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/services/pest-control-georgetown-tx">
                    Pest control
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("foundation-repair-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/services/foundation-repair-georgetown-tx">
                    Foundation repair
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("house-cleaning-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/services/house-cleaning-georgetown-tx">
                    House cleaning
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Browse by Area</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:underline" href="/zip">
                  Georgetown ZIP codes
                </Link>
              </li>
              {NEIGHBORHOOD_BROWSE_ENTRIES.map((n) => (
                <li key={n.href}>
                  <Link className="hover:underline" href={n.href}>
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Provider directory</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:underline" href="/best">
                  Provider directory hub
                </Link>
              </li>
              {!isNoindexSlug("best-plumbers-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-plumbers-georgetown-tx">
                    Best Plumbers
                  </Link>
                </li>
              ) : null}
              {!isNoindexSlug("top-hvac-companies-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/top-hvac-companies-georgetown-tx">
                    Best HVAC
                  </Link>
                </li>
              ) : null}
              {!isNoindexSlug("best-roofers-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-roofers-georgetown-tx">
                    Best Roofers
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("best-electricians-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-electricians-georgetown-tx">
                    Best Electricians
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("best-landscaping-companies-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-landscaping-companies-georgetown-tx">
                    Best Landscaping
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("best-pest-control-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-pest-control-georgetown-tx">
                    Best Pest Control
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("best-foundation-repair-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-foundation-repair-georgetown-tx">
                    Best Foundation Repair
                  </Link>
                </li>
              ) : null}
              {showExtendedHomeServices() && !isNoindexSlug("best-house-cleaning-services-georgetown-tx") ? (
                <li>
                  <Link className="hover:underline" href="/best/best-house-cleaning-services-georgetown-tx">
                    Best House Cleaning
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Trust & legal</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:underline" href="/about">
                  About Georgetown Home Services
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/methodology">
                  How We Review and Rank Providers
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/editorial-policy">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/service-areas">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={AUTHOR_PROFILE_PATH}>
                  About the editor
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-gray-600">{PROVIDER_INFO_DISCLAIMER}</p>

        <div className="mt-6 flex flex-col gap-2 border-t border-gray-200 pt-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-3 gap-y-2">
                       <Link className={footerBarLinkClass} href="/">
              Home
            </Link>
            <Link className={footerBarLinkClass} href="/about">
              About
            </Link>
            <Link className={footerBarLinkClass} href="/methodology">
              How we rank
            </Link>
            <Link className={footerBarLinkClass} href="/services">
              Service guides
            </Link>
            <Link className={footerBarLinkClass} href="/best">
              Provider directory
            </Link>
            <Link className={footerBarLinkClass} href="/blog">
              Homeowner blog
            </Link>
            <Link className={footerBarLinkClass} href="/costs">
              Cost guides
            </Link>
            <Link className={footerBarLinkClass} href="/compare">
              Compare
            </Link>
            <Link className={footerBarLinkClass} href="/pricing">
              Pricing
            </Link>
            <Link className={footerBarLinkClass} href={AUTHOR_PROFILE_PATH}>
              Editor
            </Link>
            <Link className={footerBarLinkClass} href="/contact">
              Contact
            </Link>
            <Link className={footerBarLinkClass} href="/privacy-policy">
              Privacy
            </Link>
            <Link className={footerBarLinkClass} href="/terms">
              Terms
            </Link>
            <Link className={footerBarLinkClass} href="/services/plumber-georgetown-tx">
              Plumbing
            </Link>
            <Link className={footerBarLinkClass} href="/services/hvac-georgetown-tx">
              HVAC
            </Link>
            <Link className={footerBarLinkClass} href="/services/roofer-georgetown-tx">
              Roofing
            </Link>
            {!isNoindexSlug("best-plumbers-georgetown-tx") ? (
              <Link className={footerBarLinkClass} href="/best/best-plumbers-georgetown-tx">
                Best Plumbers
              </Link>
            ) : null}
            {!isNoindexSlug("top-hvac-companies-georgetown-tx") ? (
              <Link className={footerBarLinkClass} href="/best/top-hvac-companies-georgetown-tx">
                Best HVAC
              </Link>
            ) : null}
            {!isNoindexSlug("best-roofers-georgetown-tx") ? (
              <Link className={footerBarLinkClass} href="/best/best-roofers-georgetown-tx">
                Best Roofers
              </Link>
            ) : null}
          </div>
          <div>
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

