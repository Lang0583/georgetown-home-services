import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tsvPath = path.join(__dirname, "businesses-import.tsv");
const outPath = path.join(__dirname, "../lib/businesses.json");

const raw = fs.readFileSync(tsvPath, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim());

const catMap = { Roofer: "roofer", Plumber: "plumber", HVAC: "hvac" };

function rowFromCols(cols) {
  const [
    name,
    cat,
    type,
    phone,
    website,
    address,
    city,
    state,
    postal_code,
    ratingStr,
    reviewsStr,
    location_link,
  ] = cols;
  const categoryRaw = (cat || "").trim();
  const category =
    catMap[categoryRaw] ?? (categoryRaw ? categoryRaw.toLowerCase() : "roofer");
  const rating = Number.parseFloat(String(ratingStr).trim());
  const reviews = Number.parseInt(String(reviewsStr).trim(), 10);
  return {
    name: (name || "").trim(),
    category,
    type: (type || "").trim(),
    phone: (phone || "").trim(),
    website: (website || "").trim(),
    address: (address || "").trim(),
    city: (city || "").trim(),
    state: (state || "").trim(),
    postal_code: (postal_code || "").trim(),
    rating: Number.isFinite(rating) ? rating : 0,
    reviews: Number.isFinite(reviews) ? reviews : 0,
    location_link: (location_link || "").trim(),
  };
}

const seen = new Map();

for (const line of lines) {
  if (line.startsWith("name\t")) continue;
  const parts = line.split("\t");
  const cols = parts.slice(0, 12);
  while (cols.length < 12) cols.push("");
  const row = rowFromCols(cols);
  if (!row.name) continue;
  if (!["plumber", "hvac", "roofer"].includes(row.category)) {
    console.warn("skip bad category", row.name, row.category);
    continue;
  }
  const key = `${row.name}|${row.address}`;
  const prev = seen.get(key);
  if (!prev || row.reviews > prev.reviews || (row.reviews === prev.reviews && row.rating > prev.rating)) {
    seen.set(key, row);
  }
}

const result = [...seen.values()];
fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + "\n");
console.log("Wrote", result.length, "rows to", outPath);
