#!/usr/bin/env node
/**
 * Report verified providers with missing/empty render fields.
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

const REQUIRED = ["name", "rating", "reviewCount", "phone", "address"];

let issues = 0;
const missingByCategory = {};

for (const category of CATEGORY_KEYS) {
  const rows = data[category];
  if (!Array.isArray(rows)) {
    console.log(`${category}: missing array`);
    issues++;
    continue;
  }

  for (const p of rows) {
    const missing = [];
    for (const key of REQUIRED) {
      const v = p[key];
      if (v === undefined || v === null || v === "") missing.push(key);
    }
    if (!p.placeId?.trim()) missing.push("placeId (recommended for re-verification)");
    if (!p.licenseType?.trim()) missing.push("licenseType (empty — license line hidden)");
    if (p.licenseNumber?.trim() === "") missing.push("licenseNumber (empty — number omitted)");
    if (!p.licenseVerifiedDate?.trim()) {
      missing.push("licenseVerifiedDate (empty — date omitted)");
    }

    if (missing.length) {
      issues++;
      const line = `${p.name ?? "(unnamed)"} (${category}): ${missing.join(", ")}`;
      console.log(line);
      if (!missingByCategory[category]) missingByCategory[category] = [];
      missingByCategory[category].push(p.name ?? "(unnamed)");
    }
  }
}

console.log("\n--- Per-category counts ---");
for (const category of CATEGORY_KEYS) {
  const count = Array.isArray(data[category]) ? data[category].length : 0;
  console.log(`${category}: ${count}`);
}

if (!issues) {
  console.log("\nOK: all providers have required card fields.");
} else {
  console.log(`\n${issues} provider row(s) with missing/empty optional or required fields.`);
}
