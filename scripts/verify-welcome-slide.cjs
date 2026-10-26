const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  try {
    for (const width of [320, 390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(process.env.TEST_URL || "http://127.0.0.1:4173");
      await page.locator(".preloader").waitFor({ state: "hidden" });
      const hero = page.locator(".practice-slider");
      const tabs = hero.locator(".service-slide-tabs button");
      assert.equal(
        await hero.locator("h1").innerText(),
        "المحامي عبد الله الشهري",
      );
      assert.equal(await tabs.count(), 4);
      assert.equal(await hero.locator(".welcome-slide-actions a").count(), 2);
      const mark = await hero.locator(".welcome-slide-mark").boundingBox(),
        heading = await hero.locator("h1").boundingBox();
      assert(mark.y >= heading.y + heading.height);
      for (const [i, title] of [
        "لأعمالك رؤية.",
        "كل بند له أثر.",
        "نفهم موقفك.",
      ].entries()) {
        await tabs.nth(i + 1).click();
        assert((await hero.locator("h1").innerText()).includes(title));
        assert.equal(await hero.locator(".service-slide-photo").count(), 1);
      }
      await tabs.last().press("ArrowLeft");
      assert.equal(await tabs.first().getAttribute("aria-pressed"), "true");
      await tabs.first().press("ArrowRight");
      assert.equal(await tabs.last().getAttribute("aria-pressed"), "true");
      await tabs.first().click();
      const box = await hero.locator(".practice-slider-visual").boundingBox();
      const x = box.x + box.width * 0.25,
        y = box.y + box.height * 0.5;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y, { steps: 8 });
      await page.mouse.up();
      assert.equal(await tabs.nth(1).getAttribute("aria-pressed"), "true");
      await context.close();
      console.log(
        width +
          "px: minimal identity, four slides, original services, keyboard and swipe passed",
      );
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
