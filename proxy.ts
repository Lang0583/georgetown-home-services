import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Next.js 16: `proxy.ts` replaces deprecated `middleware.ts` in this repo's setup.
 * We pass the current request pathname via headers so layouts can compute canonical URLs.
 */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

