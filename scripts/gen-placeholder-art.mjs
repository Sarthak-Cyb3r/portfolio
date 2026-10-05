/**
 * Generates the two "coming soon" brand tiles for projects that have no
 * source or screenshots on disk yet (Softify, Accounty).
 *
 *   node scripts/gen-placeholder-art.mjs
 *
 * These are deliberately ABSTRACT, TYPOGRAPHIC artworks — not fake app
 * screenshots. No UI chrome, no charts, no numbers, no lists. Each tile is
 * one project name, a mono kicker, a "coming soon" line and a single bold
 * aurora geometric element on the portfolio's near-black ink base.
 *
 * Renders one self-contained HTML document per tile in the installed headless
 * Chromium (playwright-core) at deviceScaleFactor 2 → 1600×1000 PNG.
 * Fonts (Bricolage Grotesque / Instrument Sans / JetBrains Mono) are fetched
 * live from Google Fonts, so network is required.
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXECUTABLE =
  "/home/sarthak/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";

/** Logical CSS size; rendered at 2× for a crisp 1600×1000 asset. */
const WIDTH = 800;
const HEIGHT = 500;
const SCALE = 2;

const TILES = [
  { slug: "softify", name: "Softify", art: "arc" },
  { slug: "accounty", name: "Accounty", art: "orb" },
];

const FONT_URL =
  "https://fonts.googleapis.com/css2" +
  "?family=Bricolage+Grotesque:opsz,wght@12..96,400..800" +
  "&family=Instrument+Sans:wght@400..700" +
  "&family=JetBrains+Mono:wght@400..700" +
  "&display=swap";

/**
 * The single bold aurora focal element per tile.
 * Both shapes live in the upper-right so the typography column on the left
 * and the hairline footer band at the bottom stay on clean ink.
 *
 * The gradient axis is fitted per shape (not to the canvas) so all three
 * aurora stops — #7C5CFF → #38E1FF → #C6FF4A — actually land on-canvas
 * instead of the whole element sitting in the middle of a too-long axis.
 */
function artSvg(kind) {
  const gradient = (x1, y1, x2, y2) => `
    <linearGradient id="aurora" gradientUnits="userSpaceOnUse"
      x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
      <stop offset="0" stop-color="#7C5CFF"/>
      <stop offset="0.52" stop-color="#38E1FF"/>
      <stop offset="1" stop-color="#C6FF4A"/>
    </linearGradient>`;

  const filters = `
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"
      color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="34"/>
    </filter>
    <filter id="bloom" x="-40%" y="-40%" width="180%" height="180%"
      color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
    <filter id="speckle" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4"
        seed="9" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0" result="g"/>
      <!-- fractalNoise also stipples the alpha channel; flatten it so the
           speckle reads as real grain across the whole orb -->
      <feComponentTransfer in="g">
        <feFuncA type="table" tableValues="1 1"/>
      </feComponentTransfer>
    </filter>`;

  if (kind === "arc") {
    // Bold gradient arch (centre 700,285 · r 175 · stroke 86), open at the
    // bottom, bleeding off the right edge. Axis runs left→right so violet
    // sits on the left foot, cyan over the crown and lime on the right.
    const band = "M 535.6 344.9 A 175 175 0 1 1 864.4 344.9";
    const hair = "M 483.9 363.7 A 230 230 0 1 1 916.1 363.7";
    return `
  <svg class="art" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>${gradient(500, 285, 845, 285)}${filters}</defs>
    <path d="${band}" stroke="url(#aurora)" stroke-width="86"
      stroke-linecap="round" filter="url(#glow)" opacity="0.55"/>
    <path d="${band}" stroke="url(#aurora)" stroke-width="86"
      stroke-linecap="round" filter="url(#bloom)" opacity="0.9"/>
    <path d="${band}" stroke="url(#aurora)" stroke-width="86"
      stroke-linecap="round"/>
    <path d="${hair}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"
      stroke-linecap="round"/>
  </svg>`;
  }

  // Grainy gradient orb (centre 735,230 · r 182), bleeding off the right
  // edge. Axis runs top-left → bottom-right so it clears the footer rule.
  const ORB = { cx: 735, cy: 230, r: 182 };
  return `
  <svg class="art" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>${gradient(545, 90, 815, 385)}${filters}
      <clipPath id="orbClip">
        <circle cx="${ORB.cx}" cy="${ORB.cy}" r="${ORB.r}"/>
      </clipPath>
    </defs>
    <circle cx="${ORB.cx}" cy="${ORB.cy}" r="${ORB.r}" fill="url(#aurora)"
      filter="url(#glow)" opacity="0.5"/>
    <circle cx="${ORB.cx}" cy="${ORB.cy}" r="${ORB.r}" fill="url(#aurora)"/>
    <g clip-path="url(#orbClip)" class="orb-grain">
      <rect x="${ORB.cx - ORB.r}" y="${ORB.cy - ORB.r}"
        width="${ORB.r * 2}" height="${ORB.r * 2}" filter="url(#speckle)"/>
    </g>
    <circle cx="${ORB.cx}" cy="${ORB.cy}" r="${ORB.r}"
      stroke="rgba(255,255,255,0.22)" stroke-width="1.5" fill="none"/>
  </svg>`;
}

function document(tile) {
  const kicker = `PROJECT / ${tile.name.toUpperCase()}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${tile.name} — placeholder art</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONT_URL}">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #08080C;
    overflow: hidden;
  }

  .tile {
    position: relative;
    isolation: isolate;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background-color: #08080C;
    overflow: hidden;
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
  }

  /* Hairline blueprint grid, 40px pitch */
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: -1px -1px;
  }

  .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .orb-grain { mix-blend-mode: overlay; opacity: 0.45; }

  /* Faint vignette, above the art so type sits on clean ink */
  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(118% 128% at 47% 45%,
      rgba(0,0,0,0) 44%, rgba(0,0,0,0.26) 80%, rgba(0,0,0,0.55) 100%);
  }

  /* Corner registration ticks */
  .tick {
    position: absolute;
    width: 14px;
    height: 14px;
    border-color: rgba(255,255,255,0.22);
    border-style: solid;
    border-width: 0;
  }
  .tick.tl { top: 26px; left: 26px; border-top-width: 1px; border-left-width: 1px; }
  .tick.tr { top: 26px; right: 26px; border-top-width: 1px; border-right-width: 1px; }
  .tick.bl { bottom: 26px; left: 26px; border-bottom-width: 1px; border-left-width: 1px; }
  .tick.br { bottom: 26px; right: 26px; border-bottom-width: 1px; border-right-width: 1px; }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 46px 48px 40px;
    z-index: 3;
  }

  .kicker {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.62);
  }

  .title {
    font-family: "Bricolage Grotesque", "Instrument Sans", system-ui, sans-serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-size: 104px;
    line-height: 0.9;
    letter-spacing: -0.035em;
    color: #FAFAFC;
  }

  .status {
    margin-top: 18px;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.86);
  }

  .footer {
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 14px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 24px;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    white-space: nowrap;
  }

  /* Slight film grain over the whole tile */
  .grain {
    position: absolute;
    inset: 0;
    z-index: 4;
    opacity: 0.075;
    mix-blend-mode: screen;
    pointer-events: none;
  }
</style>
</head>
<body>
  <div class="tile">
    <div class="grid"></div>
    ${artSvg(tile.art)}
    <div class="vignette"></div>
    <span class="tick tl"></span>
    <span class="tick tr"></span>
    <span class="tick bl"></span>
    <span class="tick br"></span>

    <div class="content">
      <div class="kicker">${kicker}</div>

      <div>
        <h1 class="title">${tile.name}</h1>
        <p class="status">Visual — coming soon</p>
      </div>

      <div class="footer">
        <span>Placeholder visual · abstract brand tile · not a screenshot</span>
        <span>Coming soon</span>
      </div>
    </div>

    <svg class="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="filmgrain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4"
          seed="4" stitchTiles="stitch" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#filmgrain)"/>
    </svg>
  </div>
</body>
</html>`;
}

const outDir = join(HERE, "..", "public", "projects");
await Promise.all(TILES.map((t) => mkdir(join(outDir, t.slug), { recursive: true })));

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
  });
  page.on("pageerror", (err) => console.error("pageerror:", err.message));
  page.on("requestfailed", (req) =>
    console.error("requestfailed:", req.url(), req.failure()?.errorText),
  );

  for (const tile of TILES) {
    await page.setContent(document(tile), { waitUntil: "networkidle", timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    // Only display + mono actually render on these tiles (the design brief
    // calls for mono kicker/status/footer), so Instrument Sans is requested
    // but not required to be resident.
    const fonts = await page.evaluate(() => ({
      display: document.fonts.check('800 104px "Bricolage Grotesque"'),
      mono: document.fonts.check('500 13px "JetBrains Mono"'),
      body: document.fonts.check('500 13px "Instrument Sans"'),
    }));
    if (!fonts.display || !fonts.mono) {
      throw new Error(`${tile.slug}: fonts failed to load ${JSON.stringify(fonts)}`);
    }
    if (!fonts.body) {
      console.warn(`${tile.slug}: Instrument Sans not resident (unused on tile)`);
    }

    const outFile = join(outDir, tile.slug, "placeholder.png");
    await page.screenshot({
      path: outFile,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    const info = await stat(outFile);
    console.log(
      `${outFile}  ${WIDTH * SCALE}x${HEIGHT * SCALE}  ${(info.size / 1024).toFixed(1)} KB`,
    );
  }
} finally {
  await browser.close();
}

// Keep a copy of the markup next to the script for inspection/debugging.
await writeFile(join(HERE, "placeholder-art.softify.html"), document(TILES[0]));
await writeFile(join(HERE, "placeholder-art.accounty.html"), document(TILES[1]));
console.log("done");
