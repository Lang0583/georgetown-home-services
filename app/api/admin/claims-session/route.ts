import { NextResponse } from "next/server";

/**
 * Sets an httpOnly cookie when `?key=` matches ADMIN_CLAIMS_SECRET so the
 * claim queue can be opened without putting the secret in every URL.
 */
export async function GET(req: Request) {
  const expected = process.env.ADMIN_CLAIMS_SECRET?.trim();
  if (!expected) {
    return NextResponse.json({ ok: false, error: "ADMIN_CLAIMS_SECRET not set" }, { status: 503 });
  }

  const url = new URL(req.url);
  const key = url.searchParams.get("key")?.trim();
  if (!key || key !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.redirect(new URL("/admin/claims", url.origin));
  res.cookies.set("ghs_admin_claims", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
