#!/usr/bin/env node
/**
 * Regenerates the two derived artifacts that are committed to this repo but
 * cannot be produced by `astro build`:
 *
 *   public/og.png                              the 1200x630 social card
 *   public/cv/Emeka-Emmanuel-Ugonna-CV.pdf     the downloadable CV
 *
 * Both are rendered by Chrome from the running site, so they always match the
 * markup and the print stylesheet. They go stale silently otherwise, which is
 * how the shipped PDF ended up showing a design the site no longer had.
 *
 * Usage:
 *   npm run dev -- --background        # or any server serving the site
 *   node scripts/build-artifacts.mjs [base-url]
 *
 * Chrome can be pointed at explicitly with CHROME=/path/to/chrome.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = (process.argv[2] ?? "http://localhost:4321").replace(/\/$/, "");

const CHROME_CANDIDATES = [
  process.env.CHROME,
  "google-chrome",
  "google-chrome-stable",
  "chromium",
  "chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((candidate) => {
  try {
    execFileSync(candidate, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
});

if (!chrome) {
  console.error("No Chrome found. Set CHROME=/path/to/chrome and retry.");
  process.exit(1);
}

// A dedicated profile keeps the run out of the way of any browser already open.
const profile = resolve(root, "node_modules/.cache/artifact-chrome");
mkdirSync(profile, { recursive: true });

const BASE_FLAGS = [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--virtual-time-budget=8000",
  `--user-data-dir=${profile}`,
];

function render(name, url, flags, outPath) {
  const absolute = resolve(root, outPath);
  mkdirSync(dirname(absolute), { recursive: true });
  rmSync(absolute, { force: true });

  console.log(`→ ${name}`);
  try {
    execFileSync(chrome, [...BASE_FLAGS, ...flags, url], { stdio: "pipe" });
  } catch (error) {
    console.error(`  Chrome failed: ${error.message}`);
    process.exit(1);
  }

  if (!existsSync(absolute)) {
    console.error(`  Expected output was not written: ${outPath}`);
    process.exit(1);
  }
  console.log(`  wrote ${outPath}`);
}

// The PDF needs a server; the social card is just a page, so it needs one too.
try {
  const res = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (error) {
  console.error(`No server at ${baseUrl} (${error.message}).`);
  console.error("Start one first:  npm run dev -- --background");
  process.exit(1);
}

render("social card", `${baseUrl}/og`, [
  "--window-size=1200,630",
  "--screenshot=public/og.png",
], "public/og.png");

render("CV PDF", `${baseUrl}/`, [
  "--no-pdf-header-footer",
  "--print-to-pdf=public/cv/Emeka-Emmanuel-Ugonna-CV.pdf",
], "public/cv/Emeka-Emmanuel-Ugonna-CV.pdf");

console.log("\nDone. Both artifacts re-rendered from the live site.");
