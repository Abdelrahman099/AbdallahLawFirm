const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  const output = "output/playwright/mega-menu";
  fs.mkdirSync(output, { recursive: true });
  const cases = [
    [1440, 900],
    [1280, 720],
    [1366, 600],
    [1024, 768],
    [1024, 480],
    [1280, 400],
  ];
  const results = [];
  const errors = [];
  try {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [width, height] of cases) {
      await page.setViewportSize({ width, height });
      await page.goto(base + "/about");
      await page.evaluate(() => document.fonts.ready);
      const trigger = page.getByRole("button", {
        name: "الخدمات",
        exact: true,
      });
      await trigger.click();
      const panel = page.locator(".services-popover");
      await panel.waitFor();
      assert.equal(await panel.locator(".services-menu-group").count(), 3);
      assert.equal(await panel.locator(".services-menu-links a").count(), 16);
      const geometry = await panel.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const links = [...element.querySelectorAll("a")].map((link) => {
          const bounds = link.getBoundingClientRect();
          return {
            label: link.textContent.trim(),
            top: bounds.top,
            bottom: bounds.bottom,
            left: bounds.left,
            right: bounds.right,
            height: bounds.height,
          };
        });
        return {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom,
          scroll: element.scrollHeight - element.clientHeight,
          overflow: getComputedStyle(element).overflowY,
          links,
          viewportHeight: innerHeight,
          viewportWidth: innerWidth,
        };
      });
      assert(
        geometry.scroll <= 1,
        `Internal vertical overflow at ${width}x${height}: ${geometry.scroll}`,
      );
      assert(
        !["auto", "scroll", "hidden"].includes(geometry.overflow),
        "Panel does not create or clip a scroll region",
      );
      for (const link of geometry.links) {
        assert(
          link.top >= -1 &&
            link.bottom <= height + 1 &&
            link.left >= 0 &&
            link.right <= width,
          `Clipped link at ${width}x${height}: ${JSON.stringify(link)}`,
        );
        assert(link.height >= 43.5, `Small target: ${link.label}`);
      }
      await page.screenshot({ path: `${output}/menu-${width}-${height}.png` });
      if (width === 1440) {
        const audit = await new AxeBuilder({ page })
          .include(".services-popover")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        assert.deepEqual(audit.violations, []);
      }
      await page.keyboard.press("Escape");
      await panel.waitFor({ state: "hidden" });
      await page.waitForFunction(() =>
        document.activeElement?.matches(".desktop-services-trigger"),
      );
      assert(
        await trigger.evaluate((element) => element === document.activeElement),
      );
      await trigger.press("Enter");
      await panel.waitFor();
      await panel.getByRole("link", { name: "التركات", exact: true }).click();
      await page
        .getByRole("heading", { name: "التركات", level: 1, exact: true })
        .waitFor();
      assert.equal(await page.locator(".services-popover").count(), 0);
      results.push({
        width,
        height,
        panelHeight: geometry.height,
        internalScroll: geometry.scroll,
        allLinksVisible: true,
      });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/about");
    await page
      .getByRole("button", { name: "فتح القائمة", exact: true })
      .click();
    await page
      .getByRole("button", { name: "الخدمات القانونية", exact: true })
      .click();
    assert.equal(await page.locator(".mobile-service-group").count(), 3);
    await page.keyboard.press("Escape");
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      `${output}/result.json`,
      JSON.stringify(
        {
          cases: results,
          keyboard: "Escape and trigger focus restored",
          navigation: "last service reachable",
          mobile: "separate Sheet intact",
          accessibility: "zero WCAG AA violations",
          runtimeErrors: errors,
        },
        null,
        2,
      ),
    );
    console.log(
      "Mega menu: every link visible without internal scrolling at six desktop sizes, 44px targets, keyboard, navigation, mobile and Axe passed.",
    );
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
