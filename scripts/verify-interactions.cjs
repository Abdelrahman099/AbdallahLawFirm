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
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() =>
    sessionStorage.setItem("shehri-intro-v2", "1"),
  );
  await page.goto("http://127.0.0.1:5173/");
  await page.locator(".practice-slider").waitFor();
  await page.evaluate(() => document.fonts.ready);
  for (let i = 0; i < 3; i++) {
    await page.waitForTimeout(1300);
    const image = page.locator(".service-slide-photo");
    assert(await image.evaluate((el) => el.complete && el.naturalWidth > 0));
    assert.equal(
      await page.locator(".service-slide-tabs [aria-pressed=true]").count(),
      1,
    );
    const link = await page
      .locator(".practice-slider-actions .text-link")
      .getAttribute("href");
    const response = await page.request.get("http://127.0.0.1:5173" + link);
    assert.equal(response.status(), 200);
    await page.screenshot({ path: `output/qa/slider-${i + 1}.png` });
    await page.getByRole("button", { name: "الشريحة التالية" }).click();
  }
  assert.match(await page.locator(".hero-display").innerText(), /لأعمالك/);
  await page
    .getByRole("button", { name: "الشريحة التالية" })
    .press("ArrowLeft");
  assert.match(await page.locator(".hero-display").innerText(), /كل بند/);
  await page.locator(".service-slide-tabs button").first().click();
  await page.getByRole("button", { name: "تشغيل العرض التلقائي" }).click();
  // Focus outside the carousel and remove hover to let its optional timer run.
  await page.locator(".header-identity").focus();
  await page.mouse.move(5, 5);
  await page.waitForTimeout(100);
  assert.equal(
    await page.locator(".slide-progress.running").count(),
    1,
    "autoplay resumes outside the slider",
  );
  await page.waitForFunction(
    () =>
      document.querySelector(".hero-display")?.textContent.includes("كل بند"),
    null,
    { timeout: 12000 },
  );
  await page.locator(".practice-slider-copy").hover();
  await page.waitForTimeout(100);
  assert.equal(
    await page.locator(".slide-progress.running").count(),
    0,
    "hover pauses progress",
  );
  await page.waitForTimeout(6800);
  assert.match(
    await page.locator(".hero-display").innerText(),
    /كل بند/,
    "hover pauses automatic advance",
  );
  await page.getByRole("button", { name: "إيقاف العرض التلقائي" }).click();
  await page.goto("http://127.0.0.1:5173/design-lab?tab=header");
  const headerViolations = [];
  for (const [id, title] of [
    ["strip", "شريط أخضر + هيدر عاجي"],
    ["forest", "هيدر أخضر بالكامل"],
    ["minimal", "هيدر عاجي بدون شريط"],
  ]) {
    await page
      .getByRole("button", { name: new RegExp(title.replace(/[+]/g, "\\+")) })
      .click();
    assert(await page.locator(`header.header-theme-${id}`).count());
    const axe = await new AxeBuilder({ page })
      .include("header")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    headerViolations.push(...axe.violations);
    await page.screenshot({ path: `output/qa/header-${id}.png` });
  }
  await page.goto("http://127.0.0.1:5173/design-lab?hero=scroll-3d");
  await page.locator("canvas").waitFor();
  await page.locator(".scroll-object").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const before = await page.locator("canvas").screenshot();
  const bounds = await page.locator("canvas").boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width * 0.85,
    bounds.y + bounds.height * 0.3,
  );
  await page.waitForTimeout(700);
  const after = await page.locator("canvas").screenshot();
  assert(!before.equals(after), "3D responds to pointer");
  await page.mouse.wheel(0, 250);
  await page.waitForTimeout(900);
  const scrolled = await page.locator("canvas").screenshot();
  assert(!after.equals(scrolled), "3D responds to scroll");
  await page.goto("http://127.0.0.1:5173/contact");
  await page.locator("main h1").waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5173/");
  const photo = page.locator(".practice-slider-visual");
  await photo.scrollIntoViewIfNeeded();
  const box = await photo.boundingBox();
  await page.mouse.move(box.x + 35, box.y + 120);
  await page.mouse.down();
  await page.mouse.move(box.x + 150, box.y + 120);
  await page.mouse.up();
  assert.match(
    await page.locator(".hero-display").innerText(),
    /كل بند/,
    "swipe changes slide",
  );
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  fs.writeFileSync(
    "output/qa/interaction-verification.json",
    JSON.stringify(
      {
        slider: "arrows, RTL keys, swipe, autoplay and pause passed",
        headerThemes: 3,
        pointerAndScroll3D: "passed",
        errors,
        headerViolations,
      },
      null,
      2,
    ),
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(headerViolations, []);
  await browser.close();
  console.log("Slider, three headers and pointer/scroll 3D verified.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
