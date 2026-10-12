const fs = require("fs");
const { chromium } = require("playwright");
(async () => {
  fs.mkdirSync("output/qa", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1040 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(250);
  await page.screenshot({ path: "output/qa/preloader.png" });
  await page.waitForSelector(".preloader", { state: "detached" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "output/website-desktop.png" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "output/qa/home-full.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "output/website-mobile.png" });
  await page.goto(
    "http://127.0.0.1:5173/consultation?service=company-formation",
  );
  await page.locator("#name").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1400);
  await page.screenshot({
    path: "output/qa/consultation-mobile.png",
    fullPage: true,
  });
  console.log(JSON.stringify({ errors }));
  await browser.close();
})();
