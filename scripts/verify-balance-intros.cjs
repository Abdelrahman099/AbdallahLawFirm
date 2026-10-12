const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  fs.mkdirSync("output/qa/balance-intros", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  const errors = [],
    results = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5173/design-lab?tab=intro");
  await page.getByRole("tab", { name: "Preloaders · 15" }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  for (let i = 0; i < 10; i++) {
    await page
      .getByRole("button", { name: "تشغيل بالحجم الكامل" })
      .nth(i)
      .click();
    const scene = page.locator('[role="dialog"] [data-balance-intro]');
    await scene.waitFor();
    await page.waitForFunction(
      () => {
        const value = document
          .querySelector('[role="dialog"] .balance-rig')
          ?.getAttribute("transform");
        return (
          value && Math.abs(Number(value.match(/rotate\(([-\d.]+)/)?.[1])) > 2
        );
      },
      null,
      { timeout: 1500 },
    );
    const tilted = await scene
      .locator(".balance-rig")
      .getAttribute("transform");
    assert(
      Math.abs(Number(tilted.match(/rotate\(([-\d.]+)/)[1])) > 1,
      "starts unbalanced",
    );
    const initial = await scene.screenshot();
    await page.waitForTimeout(2500);
    await page.waitForFunction(() => {
      const caption = document.querySelector(
        '[role="dialog"] .balance-caption',
      );
      const rig = document.querySelector('[role="dialog"] .balance-rig');
      return (
        caption &&
        getComputedStyle(caption).opacity === "1" &&
        Math.abs(
          Number(
            rig?.getAttribute("transform")?.match(/rotate\(([-\d.]+)/)?.[1],
          ),
        ) < 0.1
      );
    });
    const balanced = await scene
      .locator(".balance-rig")
      .getAttribute("transform");
    assert(
      Math.abs(Number(balanced.match(/rotate\(([-\d.]+)/)[1])) < 0.1,
      "finishes balanced",
    );
    assert.equal(
      await scene
        .locator(".balance-sword")
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    assert.equal(
      await scene
        .locator(".balance-caption")
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    const final = await scene.screenshot({
      path: `output/qa/balance-intros/balance-${String(i + 1).padStart(2, "0")}.png`,
    });
    assert(!initial.equals(final), "animation changes actual visual output");
    results.push({
      id: await scene.getAttribute("data-balance-intro"),
      tilted,
      balanced,
      completed: true,
    });
    const contrast = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    assert.deepEqual(contrast.violations, [], `scene ${i + 1} accessibility`);
    await page.getByRole("button", { name: "إعادة التشغيل" }).click();
    await page.waitForTimeout(500);
    assert(
      Math.abs(
        Number(
          (await scene.locator(".balance-rig").getAttribute("transform")).match(
            /rotate\(([-\d.]+)/,
          )[1],
        ),
      ) > 1,
      "replay restarts",
    );
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "detached" });
  }
  await page.setViewportSize({ width: 390, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page
    .getByRole("button", { name: "تشغيل بالحجم الكامل" })
    .first()
    .click();
  const scene = page.locator('[role="dialog"] [data-balance-intro]');
  await scene.waitFor();
  await page.screenshot({
    path: "output/qa/balance-intros/mobile-reduced.png",
  });
  assert.equal(
    await scene.locator(".balance-rig").getAttribute("transform"),
    null,
    "reduced motion shows balanced static SVG",
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  const axe = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  assert.deepEqual(axe.violations, []);
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://127.0.0.1:5173/");
  await page.locator(".preloader").waitFor();
  assert.equal(
    await page
      .locator(".preloader [data-balance-intro]")
      .getAttribute("data-balance-intro"),
    "balance-onyx",
    "new default intro",
  );
  await page.keyboard.press("Escape");
  await page.locator(".preloader").waitFor({ state: "detached" });
  await page.reload();
  await page.locator("main h1").waitFor();
  await page.waitForTimeout(300);
  assert.equal(
    await page.locator(".preloader").count(),
    0,
    "intro is once per session",
  );
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "output/qa/balance-intros/results.json",
    JSON.stringify(
      {
        results,
        reducedMotion: "passed",
        defaultIntroAndSkip: "passed",
        accessibility: "passed",
        errors,
      },
      null,
      2,
    ),
  );
  await browser.close();
  console.log(
    "All ten balance/sword scenes, replay, reduced motion and mobile modal verified.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
