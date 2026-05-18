#!/usr/bin/env node
/**
 * Local link crawler (Node): runs the TypeScript checker via tsx.
 * No dev server required for route validation; set LINK_CHECK_BASE for live HTTP.
 *
 * Usage:
 *   node scripts/crawl-internal-links.mjs
 *   node scripts/crawl-internal-links.mjs --broken-table
 *   LINK_CHECK_BASE=http://localhost:3000 node scripts/crawl-internal-links.mjs
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(fileURLToPath(new URL(".", import.meta.url)), "..");
const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
const script = path.join(root, "scripts", "check-internal-links.ts");
const args = [tsxCli, script, ...process.argv.slice(2)];

const res = spawnSync(process.execPath, args, { cwd: root, stdio: "inherit" });
process.exit(res.status === null ? 1 : res.status);
