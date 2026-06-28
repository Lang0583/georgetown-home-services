<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Product

Single **Next.js 16** app (`georgetown-home-services`): a Georgetown, TX home-services directory and content site. No monorepo, no Docker, no database. Content is static JSON/TS; form submissions append to `data/*.jsonl` locally.

### Node.js version

`package.json` requires **Node 20.x**. The VM default `/exec-daemon/node` is Node 22. Prepend NVM Node 20 before running npm:

```bash
export PATH="$HOME/.nvm/versions/node/v20.20.2/bin:$PATH"
```

(One-time setup if missing: `nvm install 20`.)

### Dev server

```bash
npm run dev   # http://localhost:3000 (Turbopack)
```

Production preview after build: `npm run build && npm start` (also port 3000).

Audit scripts in `scripts/` sometimes expect a **built** server on `http://127.0.0.1:3210` (`BASE_URL`); that is separate from normal dev on 3000.

### Validation

There are **no** `lint` or `test` npm scripts. Use:

- `npm run build` — TypeScript check + production build (primary CI-style validation)
- `npx eslint .` — config exists (`eslint.config.mjs`) but `eslint` is not a declared dependency; do not rely on it unless added to `package.json`

### Environment variables

Copy `.env.example` → `.env.local` for optional integrations (Resend email, webhooks, AdSense, IndexNow). The site runs without `.env.local`; forms persist to `data/*.jsonl` and APIs return success without Resend configured.

### Hello-world smoke test

1. `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` → `200`
2. `POST /api/site-feedback` with `topic`, `email`, `message` (see `lib/site-feedback-topics.ts` for valid topics) → `{"ok":true}` and a line appended to `data/site-feedback.jsonl`
