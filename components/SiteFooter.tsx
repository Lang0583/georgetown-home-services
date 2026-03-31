import Link from "next/link";
import { getBrandName, getContact } from "../lib/site-content";

export default function SiteFooter() {
  const brand = getBrandName();
  const contact = getContact();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-gray-900">{brand}</div>
            <div className="mt-1 text-sm text-gray-600">
              Email: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Services</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
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
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Top Providers</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:underline" href="/best/best-plumbers-georgetown-tx">
                  Best Plumbers
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/best/top-hvac-companies-georgetown-tx">
                  Best HVAC
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/best/best-roofers-georgetown-tx">
                  Best Roofers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <div>
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <span className="mx-2 text-gray-300">•</span>
            <Link className="hover:underline" href="/services">
              Services
            </Link>
            <span className="mx-2 text-gray-300">•</span>
            <Link className="hover:underline" href="/best">
              Top Providers
            </Link>
          </div>
          <div>
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

