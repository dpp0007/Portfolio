// Captures a screenshot of every project with image: "auto" and a live link,
// saving it as assets/img/shots/<id>.jpg. Run by .github/workflows/screenshots.yml
// (or locally: npm i -D playwright && npx playwright install chromium && node tools/screenshots.mjs)
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";

const window = {};
new Function("window", readFileSync("assets/js/data.js", "utf8"))(window);
const projects = (window.PORTFOLIO.projects || []).filter((p) => p.image === "auto" && p.links && p.links.live);

mkdirSync("assets/img/shots", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
let failed = 0;
for (const p of projects) {
  try {
    await page.goto(p.links.live, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500); // let intro animations settle
    await page.screenshot({ path: `assets/img/shots/${p.id}.jpg`, type: "jpeg", quality: 80 });
    console.log("✓", p.id, p.links.live);
  } catch (e) {
    failed++;
    console.log("✗", p.id, p.links.live, e.message);
  }
}
await browser.close();
if (failed === projects.length && projects.length) process.exit(1);
