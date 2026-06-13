import { chromium } from "@playwright/test";
import fs from "node:fs";

const BASE = "http://localhost:5173";
const outDir = "scripts/shots";
fs.mkdirSync(outDir, { recursive: true });

const issues = [];

async function runViewport(name, viewport) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport });

  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      issues.push(`[${name}] console.${msg.type()}: ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => issues.push(`[${name}] pageerror: ${err.message}`));
  page.on("requestfailed", (req) =>
    issues.push(`[${name}] requestfailed: ${req.url()} — ${req.failure()?.errorText}`)
  );
  page.on("response", (res) => {
    if (res.status() >= 400) issues.push(`[${name}] HTTP ${res.status()}: ${res.url()}`);
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // loader + boot

  // broken images
  const badImgs = await page.evaluate(() =>
    [...document.querySelectorAll("img")]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.getAttribute("src"))
  );
  badImgs.forEach((s) => issues.push(`[${name}] broken <img>: ${s}`));

  // horizontal overflow
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
  }));
  if (overflow.scrollW > overflow.innerW + 1)
    issues.push(`[${name}] horizontal overflow: scrollWidth ${overflow.scrollW} > viewport ${overflow.innerW}`);

  await page.screenshot({ path: `${outDir}/${name}-hero.png` });

  // hero after boot sequence + headline/dek/CTA animations settle
  await page.waitForTimeout(6500);
  await page.screenshot({ path: `${outDir}/${name}-hero-late.png` });

  // walk through sections
  for (const id of ["flagship", "work", "about", "timeline", "stack", "contact"]) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }, id);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${outDir}/${name}-${id}.png` });
  }

  // bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/${name}-footer.png` });

  await browser.close();
}

await runViewport("desktop", { width: 1440, height: 900 });
await runViewport("mobile", { width: 390, height: 844 });

console.log(issues.length ? issues.join("\n") : "NO RUNTIME ISSUES DETECTED");
