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

const REQUIRED = ["name", "category", "rating", "reviewCount", "phone", "address"];

let issues = 0;
for (const p of data.providers) {
  const missing = [];
  for (const key of REQUIRED) {
    const v = p[key];
    if (v === undefined || v === null || v === "") missing.push(key);
  }
  if (!p.description?.trim()) missing.push("description");
  if (!p.serviceArea?.trim()) missing.push("serviceArea");
  if (!Array.isArray(p.specialties) || p.specialties.length === 0) missing.push("specialties");
  if (!p.googleMapsUrl?.trim()) missing.push("googleMapsUrl");
  if (missing.length) {
    issues++;
    console.log(`${p.name} (${p.category}): missing ${missing.join(", ")}`);
  }
}

if (!issues) {
  console.log("OK: all providers have required card fields.");
} else {
  console.log(`\n${issues} provider(s) with missing/empty fields.`);
  process.exitCode = 1;
}
