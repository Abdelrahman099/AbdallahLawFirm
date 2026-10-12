const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

(async () => {
  fs.mkdirSync("output/qa/home-motion", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  const errors = [];
  for (const [device, width, height] of [
    ["mobile", 390, 844],
    ["desktop", 1440, 900],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "no-preference",
      recordVideo: { dir: "output/qa/home-motion", size: { width, height } },
    });
    await context.addInitScript(() =>
      sessionStorage.setItem("shehri-intro-v2", "1"),
    );
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      await document.fonts.ready;
      const images = [...document.querySelectorAll("img")];
      await Promise.all(
        images.map(async (image) => {
          image.loading = "eager";
          await image.decode();
        }),
      );
    });
    const office = page.locator(".home-office");
    for (const narrow of [320, 390, 760, 768, 1440]) {
      await page.setViewportSize({ width: narrow, height });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "full-motion content has no horizontal overflow at " + narrow,
      );
    }
    await page.setViewportSize({ width, height });
    assert.equal(
      await office
        .locator(".office-title-line")
        .first()
        .evaluate((e) => getComputedStyle(e).opacity),
      "0",
      "office awaits its viewport entry",
    );
    const practiceTop = await page
      .locator(".home-practice")
      .evaluate((e) => e.getBoundingClientRect().top + scrollY);
    await page.evaluate((y) => scrollTo(0, y), practiceTop - 100);
    await page.waitForTimeout(750);
    await page
      .locator(".home-practice-options")
      .getByRole("radio", { name: "الاستثمار الأجنبي", exact: true })
      .click();
    await page
      .locator(".home-practice-summary h3")
      .filter({ hasText: "الاستثمار الأجنبي" })
      .waitFor();
    await page.waitForTimeout(800);
    assert.match(
      await page.locator(".home-practice-preview img").getAttribute("src"),
      /investment/,
    );
    await page
      .locator(".home-practice-options")
      .getByRole("radio", { name: "تأسيس الشركات", exact: true })
      .click();
    await page.waitForTimeout(800);
    const officeTop = await office.evaluate(
      (e) => e.getBoundingClientRect().top + scrollY,
    );
    const journeyBottom = await page
      .locator(".home-journey")
      .evaluate((e) => e.getBoundingClientRect().bottom + scrollY);
    await page.evaluate((y) => scrollTo(0, y), officeTop - height + 100);
    const imageTransforms = [];
    for (
      let position = officeTop - height + 100;
      position <= journeyBottom - 300;
      position += 150
    ) {
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(320);
      imageTransforms.push(
        await office
          .locator("img")
          .evaluate((e) => getComputedStyle(e).transform),
      );
    }
    assert(
      new Set(imageTransforms).size > 3,
      "office image actually responds to scrolling",
    );
    await page.waitForTimeout(1000);
    assert.equal(
      await office
        .locator(".office-title-line")
        .first()
        .evaluate((e) => getComputedStyle(e).opacity),
      "1",
    );
    assert.equal(
      await page
        .locator(".home-journey-step")
        .last()
        .evaluate((e) => getComputedStyle(e).opacity),
      "1",
    );
    await page.evaluate((y) => scrollTo(0, y), officeTop - 30);
    await page.waitForTimeout(750);
    await page.screenshot({
      path: `output/qa/home-motion/office-${device}.png`,
    });
    if (device === "mobile") {
      const arrangement = await office.evaluate((e) => {
        const title = e
          .querySelector(".home-office-heading")
          .getBoundingClientRect();
        const picture = e.querySelector("figure").getBoundingClientRect();
        return {
          beforePhoto: title.bottom < picture.top,
          padding: parseFloat(getComputedStyle(e).paddingTop),
        };
      });
      assert(
        arrangement.beforePhoto && arrangement.padding >= 72,
        "section title first, with breathing room",
      );
      const journeyTop = await page
        .locator(".home-journey")
        .evaluate((e) => e.getBoundingClientRect().top + scrollY);
      await page.evaluate((y) => scrollTo(0, y), journeyTop - 140);
      await page.screenshot({
        path: "output/qa/home-motion/mobile-section-boundary.png",
      });
    }
    await page.locator(".home-reading-feature").focus();
    assert.equal(
      await page
        .locator(".home-reading-feature")
        .evaluate((e) => getComputedStyle(e).opacity),
      "1",
      "keyboard focus reveals animated link immediately",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(100);
    const reduced = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          ".office-title-line, .home-office-panorama, .home-journey-step, .home-reading-grid a",
        ),
      ].every(
        (e) =>
          getComputedStyle(e).opacity === "1" &&
          getComputedStyle(e).transform === "none",
      ),
    );
    assert(
      reduced,
      "live reduced-motion preference removes motion and keeps content visible",
    );
    assert.deepEqual(
      (
        await new AxeBuilder({ page })
          .include(".home-page")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
      [],
    );
    await page.screenshot({
      path: `output/qa/home-motion/home-${device}-full.png`,
      fullPage: true,
    });
    for (const narrow of [320, 390, 760, 768, 1440]) {
      await page.setViewportSize({ width: narrow, height });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        "no horizontal overflow at " + narrow,
      );
    }
    await page.setViewportSize({ width, height });
    await page.locator(".home-office-story a").click();
    await page.waitForURL("**/about");
    await page.locator(".home-page").waitFor({ state: "hidden" });
    assert.equal(await page.locator(".home-page").count(), 0);
    await page.goBack();
    await page.locator(".home-page").waitFor();
    await context.close();
    await page.video().saveAs(`output/qa/home-motion/home-${device}.webm`);
  }
  const staticContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(base);
  assert.equal(await staticPage.locator(".home-page h2").count(), 6);
  assert(await staticPage.locator(".home-office-story a").isVisible());
  await staticContext.close();
  await browser.close();
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "output/qa/home-motion/result.json",
    JSON.stringify(
      {
        fullMotion: "mobile + desktop scroll transforms verified",
        responsiveWidths: [320, 390, 760, 768, 1440],
        reducedMotion: "live preference verified",
        keyboard: "animated links visible on focus",
        accessibility: "zero WCAG AA violations",
        noJavaScript: "prerendered homepage visible",
        runtimeErrors: errors,
      },
      null,
      2,
    ),
  );
  console.log(
    "Homepage: actual scroll motion, service changes, responsive spacing, reduced motion, keyboard, no-JS and Axe passed.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
