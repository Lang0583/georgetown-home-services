import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-zinc-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-16">
        <div className="text-4xl font-bold text-zinc-900">404</div>
        <div className="text-lg text-zinc-700">
          The page you’re looking for doesn’t exist. Use the links below to find what you need.
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Go to Home
          </Link>
          <Link
            href="/services/plumber-georgetown-tx"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 hover:border-black/20"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}

