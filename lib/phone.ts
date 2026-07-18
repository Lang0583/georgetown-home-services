/**
 * Shared provider phone helpers — tel: href strips non-digits and prefixes +1 for US numbers.
 */

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

/** Build E.164-style tel href from stored display string; returns null if empty / no digits. */
export function businessPhoneTel(
  phoneRaw: string | undefined,
): { href: string; display: string } | null {
  const display = trim(phoneRaw);
  if (!display) return null;
  const digits = display.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) return { href: `tel:+1${digits}`, display };
  if (digits.length === 11 && digits.startsWith("1")) return { href: `tel:+${digits}`, display };
  return { href: `tel:+${digits}`, display };
}
