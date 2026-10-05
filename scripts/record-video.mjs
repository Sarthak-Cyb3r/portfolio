import { chromium } from "playwright-core";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const EXECUTABLE = "/home/sarthak/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve("./recordings");
const FINAL_MP4 = path.resolve("./public/portfolio-scroll-60fps.mp4");

async function record() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("Launching Chromium with WebGL SwiftShader...");
  const browser = await chromium.launch({
    executablePath: EXECUTABLE,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--hide-scrollbars",
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  console.log("Navigating to", BASE_URL);
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  // Wait for initial hero 3D and word reveal
  console.log("Waiting for initial 3D centerpiece render...");
  await page.waitForTimeout(2500);

  // Subtle mouse movement to demonstrate 3D spring tilt in Hero
  console.log("Demonstrating 3D mouse parallax in Hero...");
  await page.mouse.move(1200, 450);
  await page.waitForTimeout(600);
  await page.mouse.move(1400, 350);
  await page.waitForTimeout(600);
  await page.mouse.move(1100, 550);
  await page.waitForTimeout(800);

  // Smooth scroll through all sections
  console.log("Scrolling through whole page to the bottom...");
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const duration = 16000; // 16 seconds cinematic scroll
    const start = performance.now();

    return new Promise((resolve) => {
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth ease-in-out curve
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, totalHeight * ease);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  });

  // Hold at footer
  console.log("Holding at footer to showcase contact and links...");
  await page.waitForTimeout(2500);

  console.log("Closing context and finalizing raw recording...");
  const video = page.video();
  await context.close();
  await browser.close();

  const rawVideoPath = await video.path();
  console.log("Raw video recorded at:", rawVideoPath);

  // Convert to true 60FPS high-definition MP4 using ffmpeg
  console.log("Converting to 60FPS H.264 MP4 with ffmpeg...");
  const ffmpegCmd = `ffmpeg -y -i "${rawVideoPath}" -r 60 -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p "${FINAL_MP4}"`;
  execSync(ffmpegCmd, { stdio: "inherit" });

  const stats = fs.statSync(FINAL_MP4);
  console.log(`\n🎉 60FPS Video successfully generated at: ${FINAL_MP4} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

record().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
