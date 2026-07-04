"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-ink antialiased">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold text-ink">Something went wrong</h1>
          <p className="mt-3 text-muted">
            We could not load this page. Please try again.
          </p>
          {error.digest ? (
            <p className="mt-2 text-xs text-muted">Reference: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn-accent mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
