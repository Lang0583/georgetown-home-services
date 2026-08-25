import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim queue",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type ClaimRecord = {
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  category?: string;
  licenseNumber?: string;
  tier?: string;
  createdAt?: string;
  ip?: string;
};

function readClaims(): ClaimRecord[] {
  const file = path.join(process.cwd(), "data", "claim-requests.jsonl");
  if (!fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
  const rows: ClaimRecord[] = [];
  for (const line of lines) {
    try {
      rows.push(JSON.parse(line) as ClaimRecord);
    } catch {
      /* skip bad lines */
    }
  }
  return rows.reverse();
}

function authorized(secretFromQuery: string | undefined, cookieSecret: string | undefined): boolean {
  const expected = process.env.ADMIN_CLAIMS_SECRET?.trim();
  if (!expected) return false;
  return secretFromQuery === expected || cookieSecret === expected;
}

export default async function AdminClaimsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const cookieSecret = jar.get("ghs_admin_claims")?.value;
  const queryKey = params.key?.trim();

  if (!process.env.ADMIN_CLAIMS_SECRET?.trim()) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-2xl font-semibold text-ink">Claim queue unavailable</h1>
        <p className="mt-3 text-sm text-muted">
          Set <code className="text-ink">ADMIN_CLAIMS_SECRET</code> in the environment to enable the contractor claim
          CRM view. Submissions still append to <code className="text-ink">data/claim-requests.jsonl</code>.
        </p>
        <Link href="/for-contractors" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
          ← For contractors
        </Link>
      </main>
    );
  }

  if (!authorized(queryKey, cookieSecret)) {
    redirect("/for-contractors");
  }

  const claims = readClaims();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Internal</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Contractor claim queue</h1>
          <p className="mt-2 text-sm text-muted">
            Newest first · source file <code className="text-ink">data/claim-requests.jsonl</code>
          </p>
        </div>
        <Link href="/for-contractors#claim" className="text-sm font-semibold text-brand hover:underline">
          Public claim form →
        </Link>
      </div>

      {claims.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No claim submissions yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-ink/10 bg-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-ink/10 bg-surface-alt text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-2 font-semibold">When</th>
                <th className="px-3 py-2 font-semibold">Business</th>
                <th className="px-3 py-2 font-semibold">Contact</th>
                <th className="px-3 py-2 font-semibold">Trade</th>
                <th className="px-3 py-2 font-semibold">Tier</th>
                <th className="px-3 py-2 font-semibold">License</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c, i) => (
                <tr key={`${c.createdAt}-${c.email}-${i}`} className="border-b border-ink/5 align-top">
                  <td className="whitespace-nowrap px-3 py-2 text-muted">{c.createdAt ?? "—"}</td>
                  <td className="px-3 py-2 font-medium text-ink">{c.businessName ?? "—"}</td>
                  <td className="px-3 py-2 text-muted">
                    <div>{c.contactName}</div>
                    <div>
                      <a className="text-brand hover:underline" href={`mailto:${c.email}`}>
                        {c.email}
                      </a>
                    </div>
                    <div>{c.phone}</div>
                  </td>
                  <td className="px-3 py-2 text-muted">{c.category ?? "—"}</td>
                  <td className="px-3 py-2 text-muted">{c.tier ?? "—"}</td>
                  <td className="px-3 py-2 font-mono text-xs text-ink">{c.licenseNumber ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
