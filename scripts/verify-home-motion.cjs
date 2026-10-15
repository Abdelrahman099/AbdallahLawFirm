const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  const output = "output/playwright/home-motion-v4";
  fs.mkdirSync(output, { recursive: true });
  const errors = [];
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base);
      await page.locator(".preloader").waitFor({ state: "hidden" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = "eager";
            return image.decode();
          }),
        );
      });
      const stage = page.locator(".firm-slider-stage");
      const initial = await stage.evaluate(
        (element) => getComputedStyle(element).transform,
      );
      assert.equal(
        await page
          .locator(".service-group-card")
          .first()
          .evaluate((element) => getComputedStyle(element).opacity),
        "0",
      );
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(1000);
      assert.notEqual(
        await stage.evaluate((element) => getComputedStyle(element).transform),
        initial,
        "hero photograph responds to scroll",
      );
      const slider = page.locator(".firm-hero-visual");
      await slider
        .getByRole("button", { name: "الشريحة 2: الشركات والاستثمار" })
        .click();
      await page.waitForFunction(
        () => document.querySelectorAll(".firm-slide").length === 1,
      );
      assert.match(await slider.locator("img").getAttribute("src"), /company/);
      await slider
        .getByRole("button", { name: "الشريحة 1: التقاضي والتمثيل القانوني" })
        .click();
      await page.waitForFunction(
        () => document.querySelectorAll(".firm-slide").length === 1,
      );
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${output}/hero-${width}.png` });
      await page
        .locator(".service-group-card")
        .first()
        .scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      assert.equal(
        await page
          .locator(".service-group-card")
          .first()
          .evaluate((element) => getComputedStyle(element).opacity),
        "1",
      );
      if (width === 390)
        assert(
          await page
            .locator(".home-practice")
            .evaluate(
              (element) =>
                parseFloat(getComputedStyle(element).paddingTop) >= 72,
            ),
        );
      await page.screenshot({ path: `${output}/services-${width}.png` });
      await page.locator(".home-journey-step").last().scrollIntoViewIfNeeded();
      await page.waitForTimeout(750);
      assert.equal(
        await page
          .locator(".home-journey-step")
          .last()
          .evaluate((element) => getComputedStyle(element).opacity),
        "1",
      );
      await page.keyboard.press("Tab");
      await page.locator(".home-reading-feature").focus();
      assert.equal(
        await page
          .locator(".home-reading-feature")
          .evaluate((element) => getComputedStyle(element).opacity),
        "1",
      );
      for (const narrow of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width: narrow, height: 900 });
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `Full-motion overflow at ${narrow}`,
        );
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForTimeout(100);
      assert(
        await page
          .locator(
            ".service-group-card, .home-journey-step, .home-reading-grid a",
          )
          .evaluateAll((elements) =>
            elements.every(
              (element) =>
                getComputedStyle(element).opacity === "1" &&
                getComputedStyle(element).transform === "none",
            ),
          ),
      );
      assert.equal(
        await stage.evaluate((element) => getComputedStyle(element).transform),
        "none",
      );
      await page.locator(".firm-hero-about a").click();
      await page.waitForURL("**/about");
      await page.locator(".home-page").waitFor({ state: "hidden" });
      await page.goBack();
      await page.locator(".preloader").waitFor({ state: "hidden" });
      await page.locator(".firm-hero-about").waitFor();
      await context.close();
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      `${output}/result.json`,
      JSON.stringify(
        {
          scrollParallax: true,
          serviceEntrances: true,
          sliderCrossfade: true,
          keyboardReveal: true,
          reducedMotion: true,
          runtimeErrors: errors,
        },
        null,
        2,
      ),
    );
    console.log(
      "V4 home motion: scroll parallax, image crossfade, card and step entrances, keyboard, responsive widths, reduced motion and route cleanup passed.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
