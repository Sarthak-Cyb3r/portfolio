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

  // 1. Desktop Light (1440px)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000); // let preloader dismiss and animations settle
    await page.screenshot({ path: path.join(outDir, "desktop-light-hero.png"), fullPage: false });
    await page.screenshot({ path: path.join(outDir, "desktop-light-full.png"), fullPage: true });
    await page.close();
  }

  // 2. Desktop Dark (1440px)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    // Switch to dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "desktop-dark-hero.png"), fullPage: false });
    await page.screenshot({ path: path.join(outDir, "desktop-dark-full.png"), fullPage: true });
    await page.close();
  }

  // 3. Mobile Light (390px - iPhone 14 / modern phone standard)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, "mobile-light-hero.png"), fullPage: false });
    await page.screenshot({ path: path.join(outDir, "mobile-light-full.png"), fullPage: true });
    await page.close();
  }

  // 4. Case study page: Softify (1440px)
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
