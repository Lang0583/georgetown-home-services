import { getBrandName, getContact } from "../lib/site-content";

export default function SiteFooter() {
  const brand = getBrandName();
  const contact = getContact();

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-900">{brand}</div>
            <div className="mt-1 text-sm text-zinc-600">
              Email: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

