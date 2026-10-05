import { writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const EXECUTABLE =
  "/home/sarthak/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Sans:wght@500;600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #08080C;
      color: #F3F3F6;
      font-family: 'Instrument Sans', sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 72px 80px;
    }

    /* Grid background */
    .grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%);
      pointer-events: none;
    }

    /* Aurora glow */
    .glow {
      position: absolute;
      width: 500px;
      height: 500px;
      right: -80px;
      top: -80px;
      background: radial-gradient(circle, rgba(124, 92, 255, 0.35) 0%, rgba(56, 225, 255, 0.25) 50%, rgba(198, 255, 74, 0.15) 80%, transparent 100%);
      filter: blur(60px);
      border-radius: 50%;
      pointer-events: none;
    }

    .kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #A3A3B2;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .kicker-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ADE80;
    }

    .title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 58px;
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.03em;
      margin-top: 20px;
      max-width: 900px;
    }

    .aurora-gradient {
      background: linear-gradient(105deg, #7C5CFF 0%, #38E1FF 48%, #C6FF4A 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subline {
      font-size: 22px;
      line-height: 1.5;
      color: #A3A3B2;
      margin-top: 18px;
      max-width: 780px;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 28px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #85858F;
    }

    .badge-group {
      display: flex;
      gap: 12px;
    }
    .badge {
      background: #17171F;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 6px 14px;
      border-radius: 999px;
      color: #F3F3F6;
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>

  <div>
    <div class="kicker">
      <span class="kicker-dot"></span>
      <span>Sarthak · 16 · Vibe Coder & Builder</span>
    </div>
    <h1 class="title">
      Building real apps, games & tools. <br>
      <span class="aurora-gradient">Shipped from the terminal.</span>
    </h1>
    <p class="subline">
      Multiplayer Ludo, StudyStack academic planner, Softify, and Accounty. Live demos, source code, and native builds.
    </p>
  </div>

  <div class="footer">
    <div class="badge-group">
      <span class="badge">Next.js 16</span>
      <span class="badge">R3F 3D</span>
      <span class="badge">Linux .deb</span>
      <span class="badge">Android .apk</span>
    </div>
    <div>github.com/Sarthak-Cyb3r</div>
  </div>
</body>
</html>`;

async function main() {
  const browser = await chromium.launch({
    executablePath: EXECUTABLE,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  await page.setContent(HTML, { waitUntil: "networkidle" });
  // Extra pause for web fonts to render
  await page.waitForTimeout(600);

  const buffer = await page.screenshot({ type: "png" });
  await writeFile("public/og.png", buffer);
  await browser.close();
  console.log("Successfully generated public/og.png (1200x630)");
}

main().catch(console.error);
