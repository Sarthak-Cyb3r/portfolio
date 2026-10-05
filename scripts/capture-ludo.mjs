/**
 * One-off asset generator: captures REAL screenshots of the Ludo app.
 *
 *   node scripts/capture-ludo.mjs
 *
 * Serves /home/sarthak/Desktop/Projects/ludo-vercel read-only over localhost,
 * then drives the installed headless Chromium (Playwright-core). The demo board
 * works without Firebase, so nothing is written to the project's live Firestore.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const SOURCE = "/home/sarthak/Desktop/Projects/ludo-vercel";
const OUT_DIR = new URL("../public/projects/ludo/", import.meta.url).pathname;
const EXECUTABLE =
  "/home/sarthak/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";
const PORT = 8137;
const VIEWPORT = { width: 1440, height: 900 };

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".map": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
    const rel = normalize(decodeURIComponent(url.pathname)).replace(
      /^(\.\.[/\\])+/,
      "",
    );
    const filePath = join(SOURCE, rel === "/" ? "index.html" : rel);
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`serving ${SOURCE} on :${PORT}`);

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  page.on("pageerror", (err) => console.log("pageerror:", err.message));

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: join(OUT_DIR, "home.png") });
  console.log("captured home.png");

  const demo = page.getByText("Watch a 5-player demo", { exact: false }).first();
  if (await demo.count()) {
    await demo.click({ force: true });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: join(OUT_DIR, "demo-board.png") });
    console.log("captured demo-board.png");
  } else {
    console.log("demo button not found — skipped demo-board.png");
  }
} finally {
  await browser.close();
  server.close();
}
