/**
 * Lightweight schema.org shape checks for JSON-LD emitted by this site.
 * Throws on invalid structures so build-time or script validation can catch regressions.
 */

type JsonLd = Record<string, unknown>;

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`Structured data validation failed: ${message}`);
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function assertListItems(
  itemListElement: unknown,
  label: string,
  opts: { requireName?: boolean; requireItemUrl?: boolean } = {},
) {
  assert(Array.isArray(itemListElement) && itemListElement.length > 0, `${label} requires itemListElement`);
  for (const [i, entry] of (itemListElement as JsonLd[]).entries()) {
    assert(entry["@type"] === "ListItem", `${label} item ${i + 1} must be ListItem`);
    assert(typeof entry.position === "number" && entry.position >= 1, `${label} item ${i + 1} needs position`);
    if (opts.requireName) {
      assert(isNonEmptyString(entry.name), `${label} item ${i + 1} needs name`);
    }
    if (opts.requireItemUrl) {
      const item = entry.item;
      if (typeof item === "string") {
        assert(isNonEmptyString(item), `${label} item ${i + 1} needs item URL`);
      } else if (item && typeof item === "object") {
        const thing = item as JsonLd;
        assert(isNonEmptyString(thing.name), `${label} item ${i + 1} needs item.name`);
        assert(isNonEmptyString(thing.url), `${label} item ${i + 1} needs item.url`);
      } else {
        assert(false, `${label} item ${i + 1} needs item URL or Thing with name+url`);
      }
    }
  }
}

export function validateOrganizationSchema(data: unknown): void {
  const d = data as JsonLd;
  assert(d["@type"] === "Organization", "Organization @type");
  assert(isNonEmptyString(d.name), "Organization name");
  assert(isNonEmptyString(d.url), "Organization url");
}

export function validateWebsiteSchema(data: unknown): void {
  const d = data as JsonLd;
  assert(d["@type"] === "WebSite", "WebSite @type");
  assert(isNonEmptyString(d.name), "WebSite name");
  assert(isNonEmptyString(d.url), "WebSite url");
}

export function validateBreadcrumbSchema(data: unknown): void {
  const d = data as JsonLd;
  assert(d["@type"] === "BreadcrumbList", "BreadcrumbList @type");
  assertListItems(d.itemListElement, "BreadcrumbList", { requireName: true, requireItemUrl: true });
}

export function validateFaqPageSchema(data: unknown): void {
  const d = data as JsonLd;
  assert(d["@type"] === "FAQPage", "FAQPage @type");
  const mainEntity = d.mainEntity;
  assert(Array.isArray(mainEntity) && mainEntity.length > 0, "FAQPage mainEntity");
  for (const [i, q] of (mainEntity as JsonLd[]).entries()) {
    assert(q["@type"] === "Question", `FAQ question ${i + 1} @type`);
    assert(isNonEmptyString(q.name), `FAQ question ${i + 1} name`);
    const answer = q.acceptedAnswer as JsonLd | undefined;
    assert(answer?.["@type"] === "Answer", `FAQ answer ${i + 1} @type`);
    assert(isNonEmptyString(answer?.text), `FAQ answer ${i + 1} text`);
  }
}

export function validateItemListSchema(data: unknown): void {
  const d = data as JsonLd;
  assert(d["@type"] === "ItemList", "ItemList @type");
  assertListItems(d.itemListElement, "ItemList", { requireName: true, requireItemUrl: true });
}

/** Reject Review or third-party aggregateRating in provider ItemList entries. */
export function assertNoHostedReviewSchema(data: unknown): void {
  const d = data as JsonLd;
  if (d["@type"] === "Review") {
    throw new Error("Structured data validation failed: Review schema is not allowed");
  }
  const items = d.itemListElement;
  if (!Array.isArray(items)) return;
  for (const entry of items as JsonLd[]) {
    const item = entry.item;
    if (item && typeof item === "object") {
      const thing = item as JsonLd;
      assert(thing["@type"] !== "Review", "ItemList must not include Review items");
      assert(!thing.aggregateRating, "ItemList items must not include aggregateRating for third-party reviews");
    }
  }
}
