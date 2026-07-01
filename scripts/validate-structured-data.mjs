#!/usr/bin/env node
/**
 * Validates JSON-LD shapes for key structured-data builders.
 * Run after `npm run build` with the production server on BASE_URL (default 3210).
 */

import { JSDOM } from "jsdom";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3210";

const REQUIRED_BY_PATH = {
  "/": ["Organization", "WebSite", "FAQPage"],
  "/best": ["BreadcrumbList", "FAQPage"],
  "/best/best-plumbers-georgetown-tx": ["BreadcrumbList", "FAQPage", "ItemList"],
  "/services": ["BreadcrumbList", "FAQPage"],
  "/services/plumber-georgetown-tx": ["BreadcrumbList", "FAQPage"],
  "/costs": ["BreadcrumbList"],
  "/costs/plumber-cost-georgetown-tx": ["BreadcrumbList", "FAQPage"],
  "/blog": ["BreadcrumbList", "FAQPage"],
};

function collectTypes(doc) {
  const types = [];
  for (const node of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(node.textContent);
      const nodes = Array.isArray(data) ? data : [data];
      for (const n of nodes) {
        if (n["@type"]) types.push(n["@type"]);
      }
    } catch (e) {
      throw new Error(`Invalid JSON-LD: ${e.message}`);
    }
  }
  return types;
}

function validateItemListShape(doc, path) {
  if (!path.startsWith("/best/")) return;
  for (const node of doc.querySelectorAll('script[type="application/ld+json"]')) {
    const data = JSON.parse(node.textContent);
    if (data["@type"] !== "ItemList") continue;
    for (const entry of data.itemListElement ?? []) {
      if (entry["@type"] !== "ListItem") throw new Error("ItemList entry must be ListItem");
      if (!entry.position || !entry.name) throw new Error("ItemList ListItem needs position and name");
      const item = entry.item;
      if (!item || typeof item !== "object") throw new Error("ItemList ListItem needs item Thing");
      if (!item.name || !item.url) throw new Error("ItemList item needs name and url");
      if (item["@type"] === "Review" || item.aggregateRating) {
        throw new Error("ItemList must not include Review or aggregateRating");
      }
    }
  }
}

function validateBreadcrumbShape(doc) {
  for (const node of doc.querySelectorAll('script[type="application/ld+json"]')) {
    const data = JSON.parse(node.textContent);
    if (data["@type"] !== "BreadcrumbList") continue;
    const items = data.itemListElement ?? [];
    if (!items.length) throw new Error("BreadcrumbList needs itemListElement");
    for (const entry of items) {
      if (!entry.name || !entry.item) throw new Error("Breadcrumb ListItem needs name and item URL");
    }
  }
}

async function checkPath(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  const html = await res.text();
  const doc = new JSDOM(html).window.document;
  const types = collectTypes(doc);
  validateItemListShape(doc, path);
  validateBreadcrumbShape(doc);

  const required = REQUIRED_BY_PATH[path] ?? [];
  for (const t of required) {
    if (!types.includes(t)) throw new Error(`${path} missing @type ${t} (found: ${types.join(", ")})`);
  }
  console.log(`OK ${path} — ${types.join(", ")}`);
}

async function main() {
  const paths = Object.keys(REQUIRED_BY_PATH);
  for (const path of paths) {
    await checkPath(path);
  }
  console.log(`Validated ${paths.length} paths.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
