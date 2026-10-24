const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const base = process.env.TEST_URL || "http://127.0.0.1:4173";
const output = "output/qa/welcome-slide";
const services = [
  ["لأعمالك رؤية.", "/images/brand-company-v2", "/services/company-formation"],
  [
    "كل بند له أثر.",
    "/images/brand-contracts-v2",
    "/services?group=agreements",
  ],
  ["نفهم موقفك.", "/images/brand-litigation-v2", "/services/litigation"],
];

async function ready(page) {
  await page.locator(".preloader").waitFor({ state: "hidden", timeout: 15000 });
  await page.locator(".practice-slider-welcome").waitFor();
  await page.waitForFunction(() => {
    const image = document.querySelector(".welcome-slide-mark");
    return image?.complete && image.naturalWidth > 0;
  });
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  try {
    for (const [width, height, layout] of [
      [320, 900, "split"],
      [390, 844, "immersive"],
      [1280, 720, "split"],
      [1440, 900, "immersive"],
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: width === 1280 ? "no-preference" : "reduce",
      });
      await context.addInitScript(
        (layout) =>
          localStorage.setItem(
            "shehri-slider-presentation",
            JSON.stringify({ layout, overlay: "balanced" }),
          ),
        layout,
      );
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base);
      await ready(page);
      const hero = page.locator(".practice-slider");
      const tabs = hero.locator(".service-slide-tabs button");
      assert.equal(await tabs.count(), 4);
      assert.equal(await hero.locator("h1").innerText(), "عبد الله الشهري");
      assert.equal(
        await hero
          .getByRole("link", { name: "احجز استشارتك", exact: true })
          .getAttribute("href"),
        "/consultation",
      );
      assert.equal(
        await hero
          .locator(".practice-slider-actions .text-link")
          .getAttribute("href"),
        "/about",
      );
      assert.equal(await tabs.first().getAttribute("aria-pressed"), "true");
      assert.match(
        await hero.locator("[aria-live]").innerText(),
        /الشريحة 1 من 4/,
      );
      assert.equal(
        await hero.locator(".welcome-slide-mark").getAttribute("src"),
        "/brand/v4/mark-beige.svg",
      );
      assert.equal(
        await hero
          .locator(".welcome-slide-mark")
          .evaluate((image) => getComputedStyle(image).objectFit),
        "contain",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      const tabSizes = await tabs.evaluateAll((buttons) =>
        buttons.map((button) => {
          const { width, height, bottom } = button.getBoundingClientRect();
          return { width, height, bottom };
        }),
      );
      assert(tabSizes.every((size) => size.width >= 44 && size.height >= 44));
      assert(
        tabSizes.every((size) => size.bottom <= height),
        "all four selectors fit below the welcome slide",
      );
      const axe = await new AxeBuilder({ page })
        .include(".practice-slider")
        .analyze();
      assert.deepEqual(
        axe.violations.map((v) => v.id),
        [],
      );
      await page.screenshot({ path: `${output}/welcome-${width}.png` });
      for (let index = 0; index < services.length; index++) {
        await tabs.nth(index + 1).click();
        await hero.locator(".service-slide-photo").waitFor();
        assert(
          (await hero.locator("h1").innerText()).includes(services[index][0]),
        );
        assert(
          (
            await hero.locator(".service-slide-photo").getAttribute("src")
          ).includes(services[index][1]),
        );
        assert.equal(
          await hero
            .locator(".practice-slider-actions .text-link")
            .getAttribute("href"),
          services[index][2],
        );
        assert.equal(
          await tabs.nth(index + 1).getAttribute("aria-pressed"),
          "true",
        );
        assert.equal(await hero.locator(".welcome-slide-mark").count(), 0);
        assert.equal(await page.locator("h1").count(), 1);
      }
      await tabs.last().press("ArrowLeft");
      await hero.locator(".welcome-slide-mark").waitFor();
      assert.equal(await tabs.first().getAttribute("aria-pressed"), "true");
      await tabs.first().press("ArrowRight");
      assert.equal(await tabs.last().getAttribute("aria-pressed"), "true");
      await tabs.first().click();
      const visual = hero.locator(".practice-slider-visual");
      await visual.scrollIntoViewIfNeeded();
      const box = await visual.boundingBox();
      const startX = box.x + box.width * 0.25;
      const y = box.y + box.height * 0.55;
      await page.mouse.move(startX, y);
      await page.mouse.down();
      await page.mouse.move(startX + Math.min(110, box.width * 0.4), y, {
        steps: 8,
      });
      await page.mouse.up();
      assert.equal(await tabs.nth(1).getAttribute("aria-pressed"), "true");
      await tabs.first().click();
      await hero
        .getByRole("link", { name: "احجز استشارتك", exact: true })
        .click();
      await page.waitForURL("**/consultation");
      await page.goBack();
      await ready(page);
      assert.equal(await tabs.first().getAttribute("aria-pressed"), "true");
      assert.deepEqual(errors, []);
      console.log(
        `${width}px ${layout}: welcome identity, four slides, original services, links, keyboard, swipe, re-entry and accessibility passed`,
      );
      await context.close();
    }
    const staticContext = await browser.newContext({
      javascriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(base);
    assert.equal(
      await staticPage.locator(".practice-slider h1").innerText(),
      "عبد الله الشهري",
    );
    assert(await staticPage.locator(".welcome-slide-mark").isVisible());
    assert.equal(
      await staticPage
        .locator(".welcome-slide-visual")
        .evaluate((node) => getComputedStyle(node).backgroundColor),
      "rgb(20, 62, 49)",
    );
    assert.equal(
      await staticPage
        .locator(".practice-slider a[href='/consultation']")
        .count(),
      1,
    );
    await staticContext.close();
    console.log("No-JavaScript welcome, logo and booking link passed");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
