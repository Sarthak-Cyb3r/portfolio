import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const outDir = path.resolve("screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: "/usr/bin/brave-browser",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  // Helper to open page with skipped preloader
  const createPage = async (viewport, isMobile = false) => {
    const context = await browser.newContext({ viewport, isMobile });
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("portfolio_intro_seen", "true");
      } catch {}
    });
    const page = await context.newPage();
    return { page, context };
  };

  // 1. Desktop Light (1440x900)
  {
    const { page, context } = await createPage({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, "desktop-light-hero.png"), fullPage: false });
    await page.screenshot({ path: path.join(outDir, "desktop-light-full.png"), fullPage: true });
    await context.close();
  }

  // 2. Desktop Dark (1440x900)
  {
    const { page, context } = await createPage({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "desktop-dark-hero.png"), fullPage: false });
    await page.screenshot({ path: path.join(outDir, "desktop-dark-full.png"), fullPage: true });
    await context.close();
  }

  // 3. Laptop Viewport (1280x720)
  {
    const { page, context } = await createPage({ width: 1280, height: 720 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, "laptop-light-hero.png"), fullPage: false });
    await context.close();
  }

  // 4. Mobile Light (390x844 - iPhone 14 / modern phone standard)
  {
    const { page, context } = await createPage({ width: 390, height: 844 }, true);
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, "mobile-light-hero.png"), fullPage: false });
    await page.screenshot({ path: path.join(outDir, "mobile-light-full.png"), fullPage: true });
    await context.close();
  }

  // 5. Case study page: Softify (1440px)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000/projects/softify", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(outDir, "case-study-softify.png"), fullPage: false });
    await page.close();
  }

  await browser.close();
  console.log("Screenshots captured successfully in screenshots/");
}

main().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
