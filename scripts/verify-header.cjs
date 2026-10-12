const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const context = await browser.newContext();
  await context.addInitScript(() =>
    sessionStorage.setItem("shehri-intro-v2", "1"),
  );
  const page = await context.newPage();
  const errors = [];
  const visit = async (url) => {
    await page.goto(url);
    await page.waitForLoadState("networkidle");
  };
  const results = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const url = process.env.TEST_URL || "http://127.0.0.1:5173";
  const settle = () => page.waitForTimeout(400);
  const headerBottom = () =>
    page.locator("header").evaluate((el) => el.getBoundingClientRect().bottom);

  for (const [width, height] of [
    [320, 667],
    [390, 844],
    [466, 844],
    [768, 667],
    [1023, 768],
    [1024, 768],
    [1440, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await visit(url);
    await page.locator(".practice-slider").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await settle();
    const mobile = width < 1024;
    const geometry = await page.evaluate(() => {
      const rect = (selector) => {
        const box = document.querySelector(selector).getBoundingClientRect();
        return {
          x: box.x,
          right: box.right,
          width: box.width,
          center: box.x + box.width / 2,
        };
      };
      return {
        main: rect(".header-main"),
        logo: rect(".header-identity"),
        booking: rect(".mobile-header-cta"),
        menu: rect(".header-menu-trigger"),
        mark: rect(".mobile-brand-lockup svg"),
        name: rect(".mobile-brand-lockup > span"),
        viewportCenter: document.documentElement.clientWidth / 2,
        strip: document.querySelector(".header-topbar").getBoundingClientRect()
          .height,
        hero: document.querySelector(".practice-slider").getBoundingClientRect()
          .height,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    assert.equal(geometry.overflow, false, `${width}px horizontal overflow`);
    assert(geometry.hero >= height, `${width}px fullscreen hero`);
    if (mobile) {
      assert.equal(geometry.strip, 0, "no mobile green strip");
      assert(
        Math.abs(geometry.logo.center - geometry.main.center) < 1,
        "logo centered on header",
      );
      assert(
        Math.abs(geometry.logo.center - geometry.viewportCenter) < 1 &&
          Math.abs(geometry.mark.center - geometry.name.center) < 1,
        "mark and company name share the viewport center",
      );
      assert.equal(geometry.menu.width, 44, "compact menu touch target");
      assert(geometry.booking.width >= 76, "booking label keeps its width");
      assert(
        geometry.booking.right <= geometry.logo.x &&
          geometry.menu.x >= geometry.logo.right,
        "physical left booking and right menu",
      );
      assert(
        geometry.booking.width >= 44 && geometry.menu.width >= 44,
        "touch target widths",
      );
    }
    await page.screenshot({ path: `output/qa/header-mobile-${width}.png` });
    if (width === 390 || width === 466) {
      await page.screenshot({
        path: `output/header-symmetry-${width}.png`,
        clip: { x: 0, y: 0, width, height: 220 },
      });
    }
    await page.evaluate(() => scrollTo(0, 300));
    await settle();
    const downBottom = await headerBottom();
    assert(
      mobile ? downBottom <= 1 : downBottom > 40,
      "responsive downward scroll behavior",
    );
    assert.equal(
      await page
        .locator(".header-topbar")
        .evaluate((el) => el.getBoundingClientRect().height),
      0,
      "strip hidden after scrolling",
    );
    assert.equal(
      await page
        .locator(".practice-slider")
        .evaluate((el) => el.getBoundingClientRect().height),
      geometry.hero,
      "hero does not resize when header changes",
    );
    await page.evaluate(() => scrollTo(0, 210));
    await settle();
    assert((await headerBottom()) > 40, "upward scroll restores header");

    if (mobile) {
      await page.getByRole("button", { name: "فتح القائمة" }).click();
      await page.getByRole("dialog").waitFor();
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "detached" });
      await page.waitForFunction(
        () =>
          document.activeElement ===
          document.querySelector(".header-menu-trigger"),
      );
      assert.equal(
        await page
          .locator(".header-menu-trigger")
          .evaluate((el) => el === document.activeElement),
        true,
        "menu focus restored",
      );
      assert((await headerBottom()) > 40, "restored menu focus is visible");
      await page.locator("main h1").evaluate((el) => {
        el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      });
      await page.evaluate(() => scrollTo(0, 400));
      await settle();
      assert((await headerBottom()) <= 1, "mobile header hides again");
      await page.locator(".mobile-header-cta").focus();
      assert(
        (await headerBottom()) > 40,
        "keyboard focus reveals hidden header",
      );
      await page.evaluate(() => scrollTo(0, 0));
    }
    const axe = await new AxeBuilder({ page })
      .include("header")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    assert.deepEqual(axe.violations, [], `header accessibility at ${width}px`);
    results.push({
      width,
      height,
      ...geometry,
      scrollBehavior: "passed",
      keyboardAndMenu: mobile ? "passed" : "desktop navigation",
    });
  }

  await page.setViewportSize({ width: 390, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await visit(url + "/consultation");
  await page.locator("#name").waitFor();
  await page.evaluate(() => scrollTo(0, 300));
  await settle();
  assert((await headerBottom()) <= 1, "consultation header hides on mobile");
  assert.equal(
    await page
      .locator("header")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
    "0s",
    "reduced motion removes header transition",
  );
  await page.evaluate(() => scrollTo(0, 200));
  await settle();
  assert((await headerBottom()) > 40, "reduced motion retains upward reveal");
  await page.locator(".mobile-header-cta").click();
  assert.match(page.url(), /\/consultation$/);
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "output/qa/header-verification.json",
    JSON.stringify(
      { results, reducedMotion: "passed", consultationLink: "passed", errors },
      null,
      2,
    ),
  );
  await browser.close();
  console.log(
    "Header symmetry, scroll direction, focus, menu and accessibility verified at seven widths.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
