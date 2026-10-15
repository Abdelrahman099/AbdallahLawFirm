const fs = require("node:fs");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const output = "output/playwright/client-v4";
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  fs.mkdirSync(output, { recursive: true });
  const errors = [];
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
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
      assert.equal(await page.locator(".header-topbar").count(), 0);
      assert.equal(await page.locator(".slide-autoplay-control").count(), 0);
      assert.equal(await page.locator(".mobile-consult").count(), 0);
      assert.equal(await page.locator(".service-group-card").count(), 3);
      assert.equal(
        await page.locator(".home-page .consultation-cta").count(),
        1,
      );
      assert.equal(
        await page.locator("main h1").textContent(),
        "عبد الله الشهري",
      );
      assert.equal(
        await page.locator(".firm-hero-about h2").textContent(),
        "عن المكتب",
      );
      assert(
        (await page.locator('a[href="mailto:at.sh.14360@gmail.com"]').count()) >
          0,
      );
      assert(
        (await page.locator('.site-header img[src*="/brand/v4/"]').count()) > 0,
      );
      assert.equal(
        await page
          .locator("body")
          .evaluate((element) => getComputedStyle(element).backgroundColor),
        "rgba(0, 0, 0, 0)",
      );
      assert.equal(
        await page
          .locator("html")
          .evaluate((element) => getComputedStyle(element).backgroundColor),
        "rgb(233, 221, 199)",
      );
      await page.screenshot({ path: `${output}/home-${width}.png` });
      const slider = page.locator(".firm-hero-visual");
      await slider
        .getByRole("button", { name: "الشريحة 2: الشركات والاستثمار" })
        .click();
      await page.waitForFunction(
        () => document.querySelectorAll(".firm-slide").length === 1,
      );
      assert.match(await slider.locator("img").getAttribute("src"), /company/);
      await page.keyboard.press("ArrowLeft");
      await page.waitForFunction(
        () => document.querySelectorAll(".firm-slide").length === 1,
      );
      assert.equal(
        await slider
          .getByRole("button", { name: "الشريحة 3: العقود والاتفاقيات" })
          .getAttribute("aria-pressed"),
        "true",
      );
      assert.match(
        await slider.locator("img").getAttribute("src"),
        /contracts/,
      );
      await slider
        .getByRole("button", { name: "الشريحة 1: التقاضي والتمثيل القانوني" })
        .click();
      await page.locator(".home-practice").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${output}/services-${width}.png` });
      for (const narrow of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width: narrow, height: 900 });
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `Home overflow at ${narrow}`,
        );
      }
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => scrollTo(0, 0));
      if (width === 1440) {
        await page
          .getByRole("button", { name: "الخدمات", exact: true })
          .click();
        assert.equal(await page.locator(".services-menu-group").count(), 3);
        assert(
          await page
            .locator(".services-popover")
            .getByRole("link", { name: "القضايا الجزائية", exact: true })
            .isVisible(),
        );
        await page.keyboard.press("Escape");
      } else {
        await page
          .getByRole("button", { name: "فتح القائمة", exact: true })
          .click();
        await page
          .getByRole("button", { name: "الخدمات القانونية", exact: true })
          .click();
        assert.equal(await page.locator(".mobile-service-group").count(), 3);
        await page
          .locator(".mobile-service-group")
          .getByRole("link", { name: "القضايا الجزائية", exact: true })
          .click();
        await page.waitForURL("**/services/criminal-cases");
        await page
          .getByRole("heading", {
            name: "القضايا الجزائية",
            exact: true,
            level: 1,
          })
          .waitFor();
        assert.equal(
          await page.locator("main h1").textContent(),
          "القضايا الجزائية",
        );
      }
      await page.goto(base + "/services?group=agreements");
      await page
        .locator('.directory-group-choice[aria-pressed="true"]')
        .waitFor();
      assert.equal(await page.locator(".practice-card").count(), 3);
      const search = page.getByRole("searchbox", { name: "ابحث عن خدمة" });
      await search.fill("لاوجودلهذاالاسم");
      await page
        .getByRole("heading", { name: "لم نجد خدمة بهذا الاسم." })
        .waitFor();
      await page.getByRole("button", { name: "مسح البحث" }).click();
      assert(
        await search.evaluate((element) => element === document.activeElement),
      );
      await page.locator(".practice-card").first().waitFor();
      assert.equal(await page.locator(".practice-card").count(), 3);
      await page
        .getByRole("button", { name: "التقاضي والتمثيل القانوني", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "القضايا الجزائية", exact: true })
        .waitFor();
      assert.equal(await page.locator(".practice-card").count(), 9);
      await page.goto(base + "/services");
      await page.locator(".practice-card").last().waitFor();
      assert.equal(await page.locator(".practice-card").count(), 14);
      await page.screenshot({
        path: `${output}/directory-${width}.png`,
        fullPage: true,
      });
      const serviceLinks = await page
        .locator(".practice-card")
        .evaluateAll((links) => links.map((link) => link.href));
      for (const url of serviceLinks) {
        await page.goto(url);
        assert.equal(await page.locator("main h1").count(), 1);
        assert(
          !(await page.locator("main h1").textContent()).includes("غير موجودة"),
        );
        assert.match(
          await page.locator(".practice-detail-photo img").getAttribute("src"),
          /^\/images\//,
        );
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        );
      }
      await page.goto(base + "/contact");
      assert.equal(
        await page
          .locator('.contact-methods a[href="mailto:at.sh.14360@gmail.com"]')
          .count(),
        1,
      );
      await page.goto(base);
      await page.locator(".preloader").waitFor({ state: "hidden" });
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        audit.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        [],
      );
      await context.close();
    }
    const staticContext = await browser.newContext({
      javaScriptEnabled: false,
    });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(base);
    assert(await staticPage.locator("main h1").isVisible());
    assert.equal(await staticPage.locator(".service-group-card").count(), 3);
    await staticContext.close();
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      `${output}/result.json`,
      JSON.stringify(
        {
          responsiveWidths: [320, 390, 768, 1024, 1440],
          servicePages: 14,
          slider: "manual dots and keyboard verified",
          serviceGroups: 3,
          officialEmail: true,
          accessibility: "zero WCAG AA violations",
          runtimeErrors: errors,
        },
        null,
        2,
      ),
    );
    console.log(
      "Client v4: responsive home, manual slider, three service groups, directory filtering/search, fourteen services, email, menus, no-JS and Axe passed.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
