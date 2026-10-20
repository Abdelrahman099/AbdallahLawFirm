const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

(async () => {
  fs.mkdirSync("output/qa/preloader", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  const errors = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "no-preference",
    });
    await context.addInitScript(() =>
      sessionStorage.setItem("shehri-intro-v2", "1"),
    );
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(/\/assets\/index-[^/]+\.js/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });
    const navigation = page.goto(base);
    await page.locator(".startup-preloader").waitFor({ state: "visible" });
    assert.equal(
      await page
        .locator("#root")
        .evaluate((e) => getComputedStyle(e).visibility),
      "hidden",
      "page cannot flash before the JavaScript bundle",
    );
    await page.screenshot({
      path: `output/qa/preloader/first-paint-${width}.png`,
    });
    await navigation;
    const intro = page.getByRole("dialog", { name: "افتتاحية المكتب" });
    await intro.waitFor();
    assert.equal(
      await page
        .locator(".startup-preloader")
        .evaluate((e) => getComputedStyle(e).display),
      "none",
      "boot screen hands over to animation",
    );
    assert(await page.locator("main").evaluate((e) => e.inert));
    assert.equal(
      await page.locator('.preloader [data-logo-intro="logo-balance"]').count(),
      1,
    );
    await page.waitForTimeout(2200);
    await page.screenshot({
      path: `output/qa/preloader/animated-${width}.png`,
    });
    await intro.waitFor({ state: "hidden" });
    assert(!(await page.locator("main").evaluate((e) => e.inert)));
    assert(
      await page
        .locator("main h1")
        .evaluate((e) => e === document.activeElement),
    );
    assert(await page.locator(".site-header.header-theme-forest").isVisible());
    if (width === 1440)
      await page.screenshot({
        path: "output/qa/preloader/approved-green-header.png",
      });
    await page.unroute(/\/assets\/index-[^/]+\.js/);
    await page.reload();
    await intro.waitFor();
    await page.keyboard.press("Tab");
    assert(
      await intro
        .getByRole("button", { name: "تخطي الافتتاحية" })
        .evaluate((e) => e === document.activeElement),
    );
    assert.deepEqual(
      (
        await new AxeBuilder({ page })
          .include(".preloader")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
      [],
    );
    await page.keyboard.press("Escape");
    await intro.waitFor({ state: "hidden" });
    await page.waitForFunction(() => !document.querySelector("main").inert);
    await page.getByRole("link", { name: "تعرّف على المكتب", exact: true }).click();
    await page.waitForURL("**/about");
    await page.locator(".home-page").waitFor({ state: "hidden" });
    assert.equal(await page.locator(".preloader").count(), 0);
    await page.locator(".header-identity").click();
    await page.waitForURL(base + "/");
    await intro.waitFor();
    await intro.getByRole("button", { name: "تخطي الافتتاحية" }).click();
    await intro.waitFor({ state: "hidden" });
    await page.locator(".header-identity").click();
    await intro.waitFor();
    await page.goBack();
    await page.waitForURL("**/about");
    await page.locator(".home-page").waitFor({ state: "hidden" });
    assert.equal(await page.locator(".preloader").count(), 0);
    await page.goForward();
    await intro.waitFor();
    await page.keyboard.press("Escape");
    await intro.waitFor({ state: "hidden" });
    assert(!(await page.locator("main").evaluate((e) => e.inert)));
    await context.close();
  }
  const navigationContext = await browser.newContext();
  const navigationPage = await navigationContext.newPage();
  navigationPage.setDefaultTimeout(15000);
  await navigationPage.goto(base + "/about");
  await navigationPage.route(/\/assets\/HomePage-[^/]+\.js/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await route.continue();
  });
  await navigationPage.locator(".header-identity").click();
  await navigationPage
    .locator(".startup-preloader")
    .waitFor({ state: "visible" });
  assert.equal(
    await navigationPage
      .locator("#root")
      .evaluate((e) => getComputedStyle(e).visibility),
    "hidden",
    "return home is covered while its route chunk loads",
  );
  await navigationPage.locator(".preloader").waitFor({ state: "visible" });
  await navigationPage.locator(".preloader").waitFor({ state: "hidden" });
  await navigationContext.close();
  const slow = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await slow.newPage();
  page.setDefaultTimeout(15000);
  await page.route("**/images/brand-justice-v1*.webp", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 4500));
    await route.continue();
  });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.locator(".preloader").waitFor();
  await page.waitForTimeout(3300);
  assert(
    await page.locator(".preloader").isVisible(),
    "loader stays while hero photo is still loading",
  );
  await page.locator(".preloader").waitFor({ state: "hidden" });
  assert(
    await page
      .locator(".home-page img")
      .first()
      .evaluate((e) => e.complete && e.naturalWidth > 0),
  );
  await slow.close();
  const reduced = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base);
  await reducedPage.locator(".preloader").waitFor({ state: "hidden" });
  assert(!(await reducedPage.locator("main").evaluate((e) => e.inert)));
  await reduced.close();
  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(base);
  assert(await staticPage.locator("main h1").isVisible());
  assert(!(await staticPage.locator(".preloader").isVisible()));
  await staticContext.close();
  await browser.close();
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "output/qa/preloader/result.json",
    JSON.stringify(
      {
        firstPaint: "boot cover before JS; root hidden",
        refresh: "replays",
        navigation: "return and same-home link replay",
        slowHero: "waits for decode",
        keyboard: "Tab + Escape + restored focus",
        reducedMotion: "static short intro",
        noJavaScript: "content visible",
        runtimeErrors: errors,
      },
      null,
      2,
    ),
  );
  console.log(
    "Preloader first paint, refresh, return home, repeat home, slow image, keyboard, reduced motion, no-JS and Axe passed.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
