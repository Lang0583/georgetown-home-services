import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Anthropic from "@anthropic-ai/sdk";

type RichInline =
  | { type: "text"; text: string }
  | { type: "link"; href: string; label: string; rel?: string };

type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "p"; parts: RichInline[] }
  | { kind: "affiliateDisclosure"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] };

type Faq = { q: string; a: string };

type AnyPage = Record<string, unknown>;
type MutablePage = AnyPage & {
  content?: ContentBlock[];
  faqs?: Faq[];
  slug: string;
  title?: string;
  h1?: string;
  locationSlug?: string;
};

type SiteContent = {
  brand?: { name?: string };
  services?: MutablePage[];
  locations?: MutablePage[];
  best?: MutablePage[];
  blog?: MutablePage[];
};

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("Missing env var ANTHROPIC_API_KEY");
  process.exit(1);
}

const model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest";
const force = process.argv.includes("--force");
const limitStr = process.env.GENERATE_LIMIT;
const limit = limitStr ? Number(limitStr) : undefined;

const client = new Anthropic({ apiKey });

const contentPath = path.join(process.cwd(), "data", "site-content.json");
const raw = fs.readFileSync(contentPath, "utf8");
const site = JSON.parse(raw) as SiteContent;

function hasPlaceholders(page: AnyPage) {
  const text = JSON.stringify(page);
  return text.includes("TBD") || text.includes("todo") || text.includes("TODO");
}

function buildPrompt(kind: "service" | "location" | "best" | "blog", slug: string, page: AnyPage) {
  const brand = site.brand?.name ?? "Georgetown Home Services";
  const locationHint = (page as { locationSlug?: string }).locationSlug ?? "";
  const title = (page as { title?: string; h1?: string }).title ?? (page as { h1?: string }).h1 ?? slug;

  return `
You are a marketing copywriter for ${brand}.

Generate/refresh page content in the exact JSON schema described below. Keep it factual, service-focused, and conversion-oriented.
Do NOT invent guarantees (e.g., "always", "100%"). Avoid mentioning competitors by name.

Page type: ${kind}
Slug: ${slug}
Title/H1: ${title}
Location hint: ${locationHint}

Return ONLY valid JSON.

JSON schema:
{
  "content": [
    { "kind": "p", "text": "..." } OR
    { "kind": "h2", "text": "..." } OR
    { "kind": "ul", "items": ["...", "..."] }
  ],
  "faqs": [ { "q": "...", "a": "..." } ]  // include only for service pages; for others, return []
}
`;
}

async function generateForPage(kind: "service" | "location" | "best" | "blog", slug: string, page: AnyPage) {
  const prompt = buildPrompt(kind, slug, page);

  const msg = await client.messages.create({
    model,
    max_tokens: 1200,
    temperature: 0.7,
    system: "Return only JSON that matches the requested schema. No markdown.",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const first = msg.content?.[0];
  const text =
    first?.type === "text" ? (first as { text?: string }).text ?? "" : "";
  if (!text) throw new Error(`Empty response for ${kind}:${slug}`);

  const parsed = JSON.parse(text) as { content: ContentBlock[]; faqs: Faq[] };
  return parsed;
}

async function run() {
  const changes: string[] = [];

  const tasks: Array<{ kind: "service" | "location" | "best" | "blog"; slug: string; page: AnyPage }> = [];

  for (const s of site.services ?? []) tasks.push({ kind: "service", slug: s.slug, page: s });
  for (const l of site.locations ?? []) tasks.push({ kind: "location", slug: l.slug, page: l });
  for (const b of site.best ?? []) tasks.push({ kind: "best", slug: b.slug, page: b });
  for (const p of site.blog ?? []) tasks.push({ kind: "blog", slug: p.slug, page: p });

  const selected = tasks.filter((t) => force || hasPlaceholders(t.page));
  const final = typeof limit === "number" ? selected.slice(0, limit) : selected;

  if (!final.length) {
    console.log("No pages selected for generation (use --force to regenerate).");
    return;
  }

  console.log(`Generating content for ${final.length} page(s) using ${model}...`);

  for (const task of final) {
    console.log(`- ${task.kind}:${task.slug}`);
    const { content, faqs } = await generateForPage(task.kind, task.slug, task.page);
    const mutable = task.page as MutablePage;
    mutable.content = content;
    if (task.kind === "service") mutable.faqs = faqs;
    changes.push(task.slug);

    // Be kind to rate limits.
    await new Promise((r) => setTimeout(r, 500));
  }

  fs.writeFileSync(contentPath, JSON.stringify(site, null, 2), "utf8");
  console.log(`Updated ${changes.length} page(s).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

