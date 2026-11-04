const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.TEST_URL || "http://127.0.0.1:4173";
const key = "shehri-intro-session-v1";
const out = "output/qa/preloader";
const bundle = /\/assets\/index-[^/]+\.js/;

async function assertUncovered(page) {
  await page.locator("main h1").waitFor({ state: "visible" });
  assert.equal(await page.locator(".preloader").count(), 0);
  assert(
    !(await page
      .locator("html")
      .evaluate((e) => e.classList.contains("intro-booting"))),
  );
  assert(!(await page.locator("main").evaluate((e) => e.inert)));
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const errors = [];
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
      });
      await context.addInitScript(() => {
        window.__introWasVisible = false;
        new MutationObserver(() => {
          if (
            document.documentElement?.classList.contains("intro-booting") ||
            document.querySelector(".preloader")
          )
            window.__introWasVisible = true;
        }).observe(document, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class"],
        });
      });
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      page.on("pageerror", (e) => errors.push(e.message));
      await page.route(bundle, async (route) => {
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
      );
      await page.screenshot({ path: `${out}/first-paint-${width}.png` });
      await navigation;
      const intro = page.getByRole("dialog", { name: "افتتاحية المكتب" });
      await intro.waitFor();
      assert.equal(
        await intro.locator('[data-logo-intro="logo-balance"]').count(),
        1,
      );
      assert(await page.locator("main").evaluate((e) => e.inert));
      await page.keyboard.press("Tab");
      assert(
        await intro
          .getByRole("button", { name: "تخطي الافتتاحية" })
          .evaluate((e) => e === document.activeElement),
      );
      if (width === 390)
        assert.deepEqual(
          (await new AxeBuilder({ page }).include(".preloader").analyze())
            .violations,
          [],
        );
      await page.screenshot({ path: `${out}/animated-${width}.png` });
      await intro.waitFor({ state: "hidden" });
      await assertUncovered(page);
      const shownAt = await page.evaluate(
        (key) => sessionStorage.getItem(key),
        key,
      );
      assert(Number(shownAt) > 0);

      // Keep the bundle delayed to catch even a brief SSR/startup-cover flash.
      const refresh = page.reload();
      await page.locator("main h1").waitFor({ state: "visible" });
      assert.equal(await page.locator(".preloader").count(), 0);
      assert.equal(
        await page
          .locator(".startup-preloader")
          .evaluate((e) => getComputedStyle(e).display),
        "none",
      );
      await refresh;
      await assertUncovered(page);
      assert.equal(await page.evaluate(() => window.__introWasVisible), false);
      await page.unroute(bundle);
      await page
        .locator(".site-footer")
        .getByRole("link", { name: "عن المكتب", exact: true })
        .click();
      await page.waitForURL("**/about");
      await page.locator(".header-identity").click();
      await page.waitForURL(base + "/");
      await page.locator(".home-page").waitFor();
      await assertUncovered(page);
      await page.locator(".header-identity").click();
      await assertUncovered(page);
      await page.goBack();
      await page.waitForURL("**/about");
      await page.goForward();
      await page.locator(".home-page").waitFor();
      await assertUncovered(page);
      await page.locator(".language-switch:visible").click();
      await page.waitForURL(base + "/en");
      await assertUncovered(page);
      assert.equal(
        await page.evaluate((key) => sessionStorage.getItem(key), key),
        shownAt,
        "navigation must not extend the cooldown",
      );

      await page.evaluate(
        (key) =>
          sessionStorage.setItem(key, String(Date.now() - 31 * 60 * 1000)),
        key,
      );
      assert.equal(
        await page.locator(".preloader").count(),
        0,
        "expiry must not interrupt an open page",
      );
      await page.locator(".header-identity").click();
      const englishIntro = page.locator(".preloader");
      await englishIntro.waitFor();
      await page.keyboard.press("Escape");
      await englishIntro.waitFor({ state: "hidden" });
      await assertUncovered(page);
      assert(
        Number(await page.evaluate((key) => sessionStorage.getItem(key), key)) >
          Number(shownAt),
      );
      await context.close();
      console.log(
        `${width}px: first paint, session refresh/navigation/history/language, expiry and keyboard passed`,
      );
    }

    const fresh = await browser.newContext();
    const firstHome = await fresh.newPage();
    firstHome.on("pageerror", (e) => errors.push(e.message));
    await firstHome.goto(base + "/about");
    assert.equal(
      await firstHome.evaluate((key) => sessionStorage.getItem(key), key),
      null,
    );
    await firstHome.route(/\/assets\/HomePage-[^/]+\.js/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });
    await firstHome.locator(".header-identity").click();
    await firstHome.locator(".startup-preloader").waitFor({ state: "visible" });
    assert.equal(
      await firstHome
        .locator("#root")
        .evaluate((e) => getComputedStyle(e).visibility),
      "hidden",
    );
    await firstHome.locator(".preloader").waitFor();
    await firstHome.keyboard.press("Escape");
    await firstHome.locator(".preloader").waitFor({ state: "hidden" });
    await fresh.close();

    const slow = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const slowPage = await slow.newPage();
    await slowPage.route("**/brand/v4/mark-beige.svg", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 5200));
      await route.continue();
    });
    await slowPage.goto(base, { waitUntil: "domcontentloaded" });
    await slowPage.locator(".preloader").waitFor();
    await slowPage.waitForTimeout(4500);
    assert(
      await slowPage.locator(".preloader").isVisible(),
      "first intro waits for the logo",
    );
    await slowPage.locator(".preloader").waitFor({ state: "hidden" });
    await slow.close();

    for (const blockReads of [true, false]) {
      const blocked = await browser.newContext({ reducedMotion: "reduce" });
      await blocked.addInitScript((blockReads) => {
        if (blockReads)
          Object.defineProperty(Storage.prototype, "getItem", {
            value() {
              throw new Error("Storage blocked");
            },
          });
        Object.defineProperty(Storage.prototype, "setItem", {
          value() {
            throw new Error("Storage blocked");
          },
        });
      }, blockReads);
      const blockedPage = await blocked.newPage();
      blockedPage.on("pageerror", (e) => errors.push(e.message));
      await blockedPage.goto(base);
      await blockedPage.locator(".preloader").waitFor({ state: "hidden" });
      await assertUncovered(blockedPage);
      await blockedPage.locator(".header-identity").click();
      await assertUncovered(blockedPage);
      await blocked.close();
    }
    const noJs = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await noJs.newPage();
    await staticPage.goto(base);
    assert(await staticPage.locator("main h1").isVisible());
    assert.equal(await staticPage.locator(".preloader").count(), 0);
    await noJs.close();
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      `${out}/result.json`,
      JSON.stringify(
        {
          firstPaint: "covered before bundle",
          session: "no replay on refresh, navigation, history or language",
          cooldownMinutes: 30,
          newSession: "eligible",
          blockedStorage: "page-memory fallback",
          keyboard: "Tab and Escape",
          slowLogo: "waits for image",
          noJavaScript: "content visible",
          runtimeErrors: errors,
        },
        null,
        2,
      ),
    );
    console.log(
      "Preloader session, expiry, slow loading, blocked storage, reduced motion, no-JS and Axe passed.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
