import Link from "next/link";
import { SiteCTAButtons } from "../components/CTASection";

export default function NotFound() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-16">
        <div className="text-4xl font-bold text-gray-900">404</div>
        <div className="text-lg text-gray-700">
          The page you’re looking for doesn’t exist. Use the links below to find what you need.
        </div>
        <SiteCTAButtons primaryHref="/best/best-plumbers-georgetown-tx" emailFormHref="/#email-capture" />
        <p className="text-sm text-gray-600">
          <Link href="/" className="font-semibold text-primary underline underline-offset-4 hover:text-primary-hover">
            Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

