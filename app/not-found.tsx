import { ButtonLink } from "../components/Button";

export default function NotFound() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-16">
        <div className="text-4xl font-bold text-gray-900">404</div>
        <div className="text-lg text-gray-700">
          The page you’re looking for doesn’t exist. Use the links below to find what you need.
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" className="text-sm">
            Go to Home
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" className="text-sm">
            View Services
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

