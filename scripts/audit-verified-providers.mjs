#!/usr/bin/env node
/**
 * Report verified providers with fields that affect card rendering.
 * Run: node scripts/audit-verified-providers.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "data/ghs-verified-providers.json"), "utf8"));

const CATEGORY_KEYS = [
  "plumbing",
  "hvac",
  "roofing",
  "electrical",
  "landscaping",
  "pest_control",
  "foundation_repair",
  "house_cleaning",
];

const UNLICENSED_TRADES = new Set([
  "roofing",
  "landscaping",
  "foundation_repair",
  "house_cleaning",
]);

const REQUIRED = ["name", "rating", "reviewCount", "phone", "address", "placeId"];

function trim(v) {
  return typeof v === "string" ? v.trim() : v;
}

let issues = 0;

console.log("=== Rendering field audit (spot-check) ===\n");

for (const category of CATEGORY_KEYS) {
  const rows = data[category];
  if (!Array.isArray(rows)) {
    console.log(`${category}: MISSING ARRAY`);
    issues++;
    continue;
  }

  for (const raw of rows) {
    const p = Object.fromEntries(
      Object.entries(raw).filter(([key]) => !key.startsWith("_")),
    );
    const missing = [];
    const notes = [];

    for (const key of REQUIRED) {
      const v = p[key];
      if (v === undefined || v === null || v === "") missing.push(key);
    }

    const licenseNumber = trim(p.licenseNumber) || "";
    const licenseType = trim(p.licenseType) || "";
    const licenseVerifiedDate = trim(p.licenseVerifiedDate) || "";

    if (UNLICENSED_TRADES.has(category)) {
      if (!licenseType) missing.push("licenseType (unlicensed trade — neutral note hidden)");
    } else if (licenseNumber) {
      if (!licenseType) missing.push("licenseType (license line incomplete)");
      if (!licenseVerifiedDate) notes.push("licenseVerifiedDate empty (license line omits verified date)");
    } else {
      notes.push("no license line (licenseNumber empty)");
      if (licenseType) notes.push(`licenseType present but not shown: "${licenseType}"`);
    }

    if (raw._licenseNote) notes.push(`_licenseNote: ${raw._licenseNote}`);

    if (missing.length || notes.length) {
      issues++;
      console.log(`${p.name} (${category})`);
      if (missing.length) console.log(`  missing: ${missing.join(", ")}`);
      if (notes.length) console.log(`  notes: ${notes.join(" | ")}`);
    }
  }
}

console.log("\n--- Per-category counts ---");
for (const category of CATEGORY_KEYS) {
  const count = Array.isArray(data[category]) ? data[category].length : 0;
  console.log(`${category}: ${count}`);
}

console.log(`\n${issues} provider row(s) flagged for spot-check.`);
