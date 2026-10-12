const fs = require("node:fs");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const ids = [
  "scroll-3d",
  "cinematic",
  "editorial",
  "panorama",
  "offset",
  "chapters",
  "statement",
  "curtain",
  "orbit",
  "practice",
];
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  fs.mkdirSync("output/qa/directions", { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (let i = 0; i < ids.length; i++) {
      await page.goto("http://127.0.0.1:5173/design-lab?hero=" + ids[i]);
      await page
        .locator('[data-testid="hero-preview"] .hero-display')
        .waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page
        .locator('[data-testid="hero-preview"]')
        .scrollIntoViewIfNeeded();
      if ([0, 5, 8].includes(i)) await page.locator("canvas").waitFor();
      await page.waitForTimeout(1100);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "overflow " + ids[i] + " " + width,
      );
      await page.locator('[data-testid="hero-preview"]').screenshot({
        path: `output/qa/directions/hero-${String(i + 1).padStart(2, "0")}-${width}.png`,
      });
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:5173/design-lab?tab=intro");
  await page.getByRole("tab", { name: "Preloaders · 15" }).click();
  const tiles = page.locator(".intro-preview-tile");
  await tiles.first().waitFor();
  await page.waitForTimeout(1200);
  for (let i = 0; i < 15; i++) {
    await tiles
      .nth(i)
      .screenshot({ path: `output/qa/directions/intro-${i + 1}.png` });
    await page
      .getByRole("button", { name: "تشغيل بالحجم الكامل" })
      .nth(i)
      .click();
    await page.getByRole("dialog").waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `output/qa/directions/intro-full-${i + 1}.png`,
    });
    await page.getByRole("button", { name: "إغلاق", exact: true }).click();
  }
  fs.writeFileSync(
    "output/qa/directions/result.json",
    JSON.stringify({ heroes: 20, intros: 15, errors }, null, 2),
  );
  assert.deepEqual(errors, []);
  await browser.close();
  console.log("Verified 10 heroes at two widths and 15 fullscreen intros.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
