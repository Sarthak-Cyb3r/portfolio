import { chromium } from "playwright-core";

const EXECUTABLE =
  "/home/sarthak/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";
const BASE_URL = "http://localhost:3000";

async function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function testSuite() {
  console.log("Starting full verification suite...");

  const browser = await chromium.launch({
    executablePath: EXECUTABLE,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  // 1. Verify robots.txt and sitemap.xml
  console.log("\n--- Checking robots.txt & sitemap.xml ---");
  const robotsRes = await page.goto(`${BASE_URL}/robots.txt`);
  await assert(robotsRes.status() === 200, "robots.txt returns 200");
  const robotsText = await robotsRes.text();
  await assert(robotsText.includes("sitemap.xml"), "robots.txt references sitemap");

  const sitemapRes = await page.goto(`${BASE_URL}/sitemap.xml`);
  await assert(sitemapRes.status() === 200, "sitemap.xml returns 200");
  const sitemapText = await sitemapRes.text();
  await assert(sitemapText.includes("/projects/ludo-vercel"), "sitemap has ludo-vercel");
  await assert(sitemapText.includes("/projects/studystack"), "sitemap has studystack");

  // 2. Verify Landing Page (/)
  console.log("\n--- Checking Landing Page (/) ---");
  await page.goto(`${BASE_URL}/`);
  const title = await page.title();
  await assert(title.includes("Sarthak"), `Page title is: "${title}"`);

  // Check Hero
  const h1 = await page.textContent("h1");
  await assert(h1.includes("Sarthak: 16, vibe coder"), `H1 text is: "${h1}"`);

  // Check 3D Canvas or Fallback presence
  const canvasCount = await page.locator("canvas").count();
  const fallbackCount = await page.locator("svg").count();
  await assert(canvasCount > 0 || fallbackCount > 0, "Hero centerpiece rendered (Canvas or Fallback)");

  // Check Stats
  const statNumbers = await page.locator("#stats span.tabular").allTextContents();
  console.log("  Stats found:", statNumbers);
  await assert(statNumbers.length >= 4, "Found 4 counters in stats section");

  // Check Featured Work cards
  const projectCards = await page.locator("#work article.card").count();
  await assert(projectCards === 4, `Featured work contains ${projectCards} cards`);

  // Check Marquee
  const marqueeItems = await page.locator("#stack span:has-text('Electron')").count();
  await assert(marqueeItems > 0, "Tech marquee contains technologies like Electron");

  // Check About
  const aboutHeading = await page.locator("#about h2").textContent();
  await assert(aboutHeading.includes("Self-taught, 16"), `About heading: "${aboutHeading}"`);

  // Check How I Build
  const stepCards = await page.locator("#process .card").count();
  await assert(stepCards === 4, `Workflow section contains ${stepCards} step cards`);

  // Check Theme Toggle
  const htmlBefore = await page.getAttribute("html", "data-theme");
  await page.click("button[aria-label*='theme']");
  const htmlAfter = await page.getAttribute("html", "data-theme");
  await assert(htmlBefore !== htmlAfter, `Theme toggled from ${htmlBefore} to ${htmlAfter}`);
  await page.click("button[aria-label*='theme']"); // toggle back

  // 3. Verify /projects Page
  console.log("\n--- Checking /projects Listing & Filters ---");
  await page.goto(`${BASE_URL}/projects`);
  const gridCards = await page.locator("article.card").count();
  await assert(gridCards === 4, `Projects page lists all ${gridCards} projects`);

  // Filter tabs: Completed
  await page.click("button:has-text('Completed')");
  await page.waitForTimeout(200);
  const completedCount = await page.locator("article.card").count();
  await assert(completedCount === 1, `Filter 'Completed' shows 1 project (got ${completedCount})`);

  // Filter tabs: Under Development
  await page.click("button:has-text('Under development')");
  await page.waitForTimeout(200);
  const inDevCount = await page.locator("article.card").count();
  await assert(inDevCount === 3, `Filter 'Under development' shows 3 projects (got ${inDevCount})`);

  // Reset to All
  await page.click("button:has-text('All')");

  // Search input
  await page.fill("input[type='search']", "Ludo");
  await page.waitForTimeout(300);
  const searchLudo = await page.locator("article.card").count();
  await assert(searchLudo === 1, `Search 'Ludo' yields 1 project (got ${searchLudo})`);

  await page.fill("input[type='search']", "nonexistentquery123");
  await page.waitForTimeout(300);
  const searchEmpty = await page.locator("article.card").count();
  await assert(searchEmpty === 0, "Non-existent search yields 0 projects (empty state)");
  await page.click("button:has-text('Clear filters')");
  await page.waitForTimeout(200);
  const resetCount = await page.locator("article.card").count();
  await assert(resetCount === 4, "Reset button restores all 4 projects");

  // 4. Verify /projects/ludo-vercel (Completed + Downloads)
  console.log("\n--- Checking /projects/ludo-vercel (Completed Project) ---");
  await page.goto(`${BASE_URL}/projects/ludo-vercel`);
  const ludoBadge = await page.locator("span:has-text('Completed')").first().textContent();
  await assert(ludoBadge.includes("Completed"), "Status badge shows Completed");

  // Check Downloads Section
  const downloadsHeading = await page.locator("h2:has-text('Downloads')").textContent();
  await assert(downloadsHeading !== null, "Downloads section heading is present");

  // Check Linux (.deb)
  const debLink = page.locator("a[href*='.deb']");
  const debHref = await debLink.getAttribute("href");
  await assert(debHref.includes(".deb"), `Deb download link href: ${debHref}`);

  // Test HTTP HEAD on .deb file
  const debHead = await page.request.head(`${BASE_URL}${debHref}`);
  await assert(debHead.status() === 200, "HTTP HEAD on .deb file returns 200 OK");
  const debSize = debHead.headers()["content-length"];
  await assert(debSize === "98844460", `Deb Content-Length is exact (${debSize} bytes)`);

  // Switch to Android Tab
  await page.click("button[role='tab']:has-text('Android')");
  await page.waitForTimeout(200);
  const apkLink = page.locator("a[href*='.apk']");
  const apkHref = await apkLink.getAttribute("href");
  await assert(apkHref.includes(".apk"), `APK download link href: ${apkHref}`);

  // Test HTTP HEAD on .apk file
  const apkHead = await page.request.head(`${BASE_URL}${apkHref}`);
  await assert(apkHead.status() === 200, "HTTP HEAD on .apk file returns 200 OK");
  const apkSize = apkHead.headers()["content-length"];
  await assert(apkSize === "4710178", `APK Content-Length is exact (${apkSize} bytes)`);

  // Switch to Windows Tab
  await page.click("button[role='tab']:has-text('Windows')");
  await page.waitForTimeout(200);
  const winDisabled = await page.locator("button:has-text('Windows build in development')").count();
  await assert(winDisabled === 1, "Windows shows disabled 'Windows build in development' button");

  // 5. Verify /projects/studystack (In-Development Project)
  console.log("\n--- Checking /projects/studystack (In-Development Project) ---");
  await page.goto(`${BASE_URL}/projects/studystack`);
  const studyBadge = await page.locator("span:has-text('Under development')").first().textContent();
  await assert(studyBadge.includes("Under development"), "Status badge shows Under development");

  // Ensure NO download links or tabs exist
  const noDeb = await page.locator("a[download]").count();
  await assert(noDeb === 0, "No download buttons exist for in-development project");

  // Verify 'What's being built' card with roadmap
  const roadmapHeading = await page.locator("h2:has-text(\"What's being built\")").count();
  await assert(roadmapHeading === 1, "'What's being built' card is present");

  const roadmapItems = await page.locator("section[aria-labelledby] ul li").count();
  await assert(roadmapItems >= 5, `Roadmap contains ${roadmapItems} items`);

  const githubFollowBtn = await page.locator("a:has-text('Follow progress on GitHub')").count();
  await assert(githubFollowBtn === 1, "Follow progress on GitHub button is present");

  // 6. Mobile Viewport Check (375px)
  console.log("\n--- Checking Mobile Viewport (375x812) & Mobile Floating Island ---");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE_URL}/`);
  await page.waitForTimeout(500);

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  await assert(!mobileOverflow, "No horizontal scroll overflow on 375px mobile screen");

  // Verify Mobile Floating Island exists and is visible
  const mobileIsland = await page.locator("div[aria-label='Mobile quick actions']").count();
  await assert(mobileIsland === 1, "MobileFloatingIsland is rendered on mobile viewport");

  // Verify Active Section pill in island
  const activePill = await page.locator("div[aria-label='Mobile quick actions'] span:has-text('HERO')").count();
  await assert(activePill > 0, "Mobile island displays active section 'HERO'");

  // Test Mobile Quick Search button in island
  await page.click("button[aria-label='Search commands']");
  await page.waitForTimeout(300);
  const cmdDialog = await page.locator("div[role='dialog']").count();
  await assert(cmdDialog === 1, "Tapping ⌘K in mobile island opens CommandMenu dialog");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  // Test Ludo Dice Roll on Mobile
  console.log("\n--- Testing Ludo Dice Roll & Micro-interactions on Mobile ---");
  const diceBtn = page.locator("button:has-text('Roll:')");
  await diceBtn.scrollIntoViewIfNeeded();
  await diceBtn.click();
  await page.waitForTimeout(1200);
  const diceLogText = await page.locator("#work p").filter({ hasText: /Moved token|Rolled 6/ }).count();
  await assert(diceLogText > 0, "Ludo dice roll completed and simulated turn on mobile");

  // Test Softify Audio Toggle on Mobile
  const softifyBtn = page.locator("button[aria-label*='sound loop']");
  await softifyBtn.scrollIntoViewIfNeeded();
  await softifyBtn.click();
  await page.waitForTimeout(300);
  const pauseIcon = await page.locator("button[aria-label='Pause preview sound loop']").count();
  await assert(pauseIcon === 1, "Softify audio preview plays synthesized chords on mobile tap");
  await softifyBtn.click(); // toggle off

  console.log("\n=========================================");
  console.log("🎉 ALL TESTS & MOBILE VERIFICATIONS PASSED 100%!");
  console.log("=========================================\n");

  await browser.close();
}

testSuite().catch((err) => {
  console.error("Test suite failed:", err);
  process.exit(1);
});
