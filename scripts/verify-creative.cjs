const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
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
    for (const [layout, overlay] of [
      ["split", "balanced"],
      ...["soft", "balanced", "deep", "ink"].map((tone) => ["immersive", tone]),
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: "reduce",
      });
      await context.addInitScript(
        (value) => {
          localStorage.setItem(
            "shehri-slider-presentation",
            JSON.stringify(value),
          );
          localStorage.setItem("shehri-header-approved-v2", "forest");
        },
        { layout, overlay },
      );
      const page = await context.newPage();
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => document.fonts.ready);
      const hero = page.locator(
        `.slider-layout-${layout}.slider-overlay-${overlay}`,
      );
      await hero.waitFor();
      await hero.locator("img").evaluate((img) => img.decode());
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      assert.equal(
        await hero.locator("svg").count(),
        0,
        "no decorative arrows in slider",
      );
      assert.equal(
        await hero.getByRole("button", { name: /^الشريحة [123]:/ }).count(),
        3,
      );
      const cta = hero.getByRole("link", { name: "احجز استشارة", exact: true });
      assert(await cta.isVisible());
      await hero
        .getByRole("button", {
          name: "الشريحة 2: العقود والاتفاقيات",
          exact: true,
        })
        .click();
      await page.waitForFunction(() =>
        document
          .querySelector(".service-slide-photo")
          .getAttribute("src")
          .includes("contracts-v2"),
      );
      await hero
        .getByRole("button", {
          name: "الشريحة 1: الشركات والاستثمار",
          exact: true,
        })
        .click();
      if (layout === "split" || overlay === "balanced")
        await page.screenshot({
          path: `output/qa/hero-${device}-${layout}.png`,
        });
      const axe = await new AxeBuilder({ page })
        .include(".practice-slider")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(axe.violations, []);
      if (layout === "split" && device === "mobile") {
        assert.equal(
          await page
            .locator(".header-main")
            .evaluate((el) => el.getBoundingClientRect().height),
          76,
        );
        assert.equal(
          await page
            .locator(".header-menu-trigger")
            .evaluate((el) => el.getBoundingClientRect().width),
          44,
        );
        await page.locator(".home-office").scrollIntoViewIfNeeded();
        await page.locator(".home-office img").evaluate((img) => img.decode());
        await page.screenshot({ path: "output/qa/creative-office-mobile.png" });
        await page.locator(".home-reading").scrollIntoViewIfNeeded();
        await page
          .locator(".home-reading")
          .evaluate((el) =>
            scrollTo(0, scrollY + el.getBoundingClientRect().top - 24),
          );
        await page.locator(".home-reading img").evaluateAll(async (imgs) => {
          await Promise.all(
            imgs.map((img) => {
              img.loading = "eager";
              return img.decode();
            }),
          );
        });
        await page.screenshot({ path: "output/qa/creative-guides-mobile.png" });
        const feature = page.locator(".home-reading-feature");
        const layoutCheck = await feature.evaluate((el) => {
          const photo = el.querySelector("img").getBoundingClientRect();
          const text = el.querySelector("div").getBoundingClientRect();
          return {
            below: text.top >= photo.bottom,
            width: photo.width,
            whole: el.getBoundingClientRect().width,
          };
        });
        assert(
          layoutCheck.below &&
            Math.abs(layoutCheck.width - layoutCheck.whole) < 1,
          "mobile guide has a full-width photograph above text",
        );
      }
      if (layout === "split" && device === "desktop") {
        await page.locator(".home-office").scrollIntoViewIfNeeded();
        await page.screenshot({
          path: "output/qa/creative-office-desktop.png",
        });
        await page.goto(base + "/services");
        await page.waitForLoadState("networkidle");
        const sources = await page
          .locator(".practice-card img")
          .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")));
        assert.equal(new Set(sources).size, 8);
        await page.screenshot({
          path: "output/qa/creative-services-desktop.png",
          fullPage: true,
        });
      }
      await context.close();
    }
  }
  const lab = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await lab.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/design-lab?tab=slider");
  await page.waitForLoadState("networkidle");
  const controls = page.locator(".slider-comparison-controls");
  await controls.getByText("صورة كاملة", { exact: true }).click();
  await page
    .locator(".slider-comparison-stage .slider-layout-immersive")
    .waitFor();
  await controls.getByText("أخضر عميق", { exact: true }).click();
  await controls.getByRole("button", { name: "طبّق على الرئيسية" }).click();
  await page.goto(base);
  await page.waitForLoadState("networkidle");
  await page.locator(".slider-layout-immersive.slider-overlay-deep").waitFor();
  await page.goto(base + "/insights");
  await page.waitForLoadState("networkidle");
  assert.equal(
    new Set(
      await page
        .locator(".article-photo img")
        .evaluateAll((imgs) => imgs.map((i) => i.src)),
    ).size,
    3,
  );
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "output/qa/creative-verification.json",
    JSON.stringify(
      {
        layouts: 2,
        overlays: 4,
        devices: ["mobile", "desktop"],
        uniquePracticeImages: 8,
        uniqueArticleImages: 3,
        errors,
      },
      null,
      2,
    ),
  );
  await browser.close();
  console.log(
    "Creative comparison: both layouts, four overlays, mobile/desktop, all service images and saved selection passed.",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
