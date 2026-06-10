/**
 * Editorial voice cleanup for lib/generatedPages.json — third-person directory tone.
 * Run: node scripts/de-slop-generated-pages.mjs
 */
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "lib/generatedPages.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

/** Slugs with expanded CMS bodies — generated HTML is redundant and often sloppier. */
const DROP_SLUGS = new Set([
  "hail-damage-georgetown-williamson-may-2026",
  "hail-damage-sun-city-georgetown-tx",
  "hail-damage-teravista-georgetown-tx",
  "hail-damage-wolf-ranch-georgetown-tx",
  "hail-damage-georgetown-village-tx",
]);

for (const slug of DROP_SLUGS) {
  delete data[slug];
}

const REPLACEMENTS = [
  [/Georgetown Home Services helps homeowners/gi, "This guide helps Georgetown homeowners"],
  [/Georgetown Home Services helps local residents/gi, "This guide helps local residents"],
  [/Georgetown Home Services helps homeowners across Georgetown/gi, "Homeowners across Georgetown"],
  [/Georgetown Home Services helps Berry Creek residents/gi, "Berry Creek homeowners"],
  [/Georgetown Home Services provides practical plumbing solutions/gi, "Solid plumbing work in Georgetown"],
  [/Georgetown Home Services provides HVAC troubleshooting/gi, "HVAC troubleshooting in Georgetown"],
  [/Georgetown Home Services supports Sun City homeowners/gi, "Sun City homeowners"],
  [/Georgetown Home Services helps homeowners across Georgetown—/gi, "Across Georgetown—"],
  [/Georgetown Home Services helps homeowners across Georgetown,/gi, "Across Georgetown,"],
  [/Georgetown Home Services helps homeowners across Georgetown /gi, "Across Georgetown "],
  [/Georgetown Home Services helps local residents clear clogs/gi, "Homeowners clearing clogs locally"],
  [/Georgetown Home Services helps homeowners across Georgetown—Berry Creek/gi, "Across Georgetown—Berry Creek"],
  [/Georgetown Home Services helps homeowners across Georgetown—from Wolf Ranch/gi, "Across Georgetown—from Wolf Ranch"],
  [/Georgetown Home Services helps homeowners understand/gi, "This overview explains"],
  [/Georgetown Home Services helps homeowners across Georgetown—Berry Creek, Wolf Ranch/gi, "In Berry Creek, Wolf Ranch"],
  [/Our goal is simple: explain the issue in plain language, outline realistic options, and help you move forward with confidence\./gi, "Compare written diagnostics and options before you authorize work."],
  [/Our roofing support focuses on/gi, "Focus on"],
  [/We focus on diagnosing the root cause/gi, "Diagnose the root cause"],
  [/We focus on clarity:/gi, "Clarity matters:"],
  [/We focus on diagnosing/gi, "Diagnose"],
  [/We can help you/gi, "Licensed pros can"],
  [/We start with/gi, "Start with"],
  [/We'll explain/gi, "A good technician explains"],
  [/We commonly service/gi, "Common requests include"],
  [/free quotes/gi, "written estimates"],
  [/Submit the form for free quotes/gi, "Shortlist providers and request written estimates"],
  [/request service options/gi, "request written scopes"],
  [/Whether you're dealing with/gi, "Whether you are dealing with"],
  [/Whether you're in/gi, "Whether you are in"],
  [/you're dealing with/gi, "you are dealing with"],
  [/you're noticing/gi, "you are noticing"],
  [/you're in/gi, "you are in"],
  [/it's important to act quickly/gi, "address damage quickly"],
  [/it's usually a sign/gi, "it usually signals"],
  [/it's helpful to work/gi, "it helps to work"],
  [/it's time to identify/gi, "identify"],
  [/it's reasonable to get/gi, "get"],
  [/don't always announce/gi, "do not always announce"],
  [/can't see/gi, "cannot see"],
  [/won't cool/gi, "will not cool"],
  [/doesn't feel right/gi, "does not feel right"],
  [/isn't a luxury/gi, "is not optional"],
];

for (const [slug, entry] of Object.entries(data)) {
  if (!entry?.html) continue;
  let html = entry.html;
  for (const [re, rep] of REPLACEMENTS) {
    html = html.replace(re, rep);
  }
  // Collapse duplicate consecutive links to same best-of URL in one paragraph (common generator artifact).
  html = html.replace(
    /(<a href="(\/best\/[^"]+)"[^>]*>[^<]+<\/a>),\s*then (?:open |see |use )?<a href="\2"[^>]*>[^<]+<\/a>/gi,
    "$1",
  );
  entry.html = html;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`De-slopped generatedPages.json (${Object.keys(data).length} entries, dropped ${DROP_SLUGS.size} hail slugs)`);
