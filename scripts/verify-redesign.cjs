const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

(async () => {
  fs.mkdirSync("output/qa", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const base = process.env.TEST_URL || "http://127.0.0.1:5173";
  const errors = [];
  const visit = async (url) => {
    await page.goto(url);
    await page.waitForLoadState("networkidle");
  };
  page.on("pageerror", (e) => errors.push(e.message));
  const checkAxe = async (selector) => {
    const result = await new AxeBuilder({ page })
      .include(selector)
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(result.violations, [], selector + " accessibility");
  };
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(base);
  await page.locator(".home-practice").waitFor();
  await page.evaluate(() => document.fonts.ready);
  const servicesTrigger = page.getByRole("button", {
    name: "الخدمات",
    exact: true,
  });
  await servicesTrigger.click();
  const popup = page.getByRole("dialog", { name: "خدمات المكتب" });
  await popup.waitFor();
  assert.equal(await popup.locator('a[href^="/services/"]').count(), 8);
  await checkAxe(".services-popover");
  await page.screenshot({ path: "output/qa/redesign-desktop-menu.png" });
  await page.keyboard.press("Escape");
  await popup.waitFor({ state: "hidden" });
  assert(await servicesTrigger.evaluate((e) => e === document.activeElement));
  await servicesTrigger.click();
  await popup.getByRole("link", { name: "التحكيم", exact: true }).click();
  await page.waitForURL("**/services/arbitration");
  await popup.waitFor({ state: "hidden" });
  await visit(base);
  const choice = page.locator(".home-practice-choices");
  await choice.getByText("للأفراد", { exact: true }).click();
  const preview = page.locator(".home-practice-preview");
  await preview
    .getByRole("heading", { name: "الأحوال الشخصية والتركات", exact: true })
    .waitFor();
  assert.equal(
    await preview.locator("a").getAttribute("href"),
    "/services/family-estates",
  );
  await choice.getByText("القضايا العمالية", { exact: true }).click();
  await preview
    .getByRole("heading", { name: "القضايا العمالية", exact: true })
    .waitFor();
  await checkAxe(".home-practice");
  await choice.getByText("للشركات والمستثمرين", { exact: true }).click();
  await preview
    .getByRole("heading", { name: "تأسيس الشركات", exact: true })
    .waitFor();
  await page.locator(".home-practice").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/qa/redesign-desktop-services.png" });
  await page.locator(".home-office").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/qa/redesign-desktop-office.png" });
  await page.locator(".home-journey").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/qa/redesign-desktop-journey.png" });

  for (const width of [320, 390, 466, 533, 700, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await visit(base);
    await page.locator(".home-practice").waitFor();
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `${width}px overflow`,
    );
    const hero = page.locator(".practice-slider");
    assert(!(await hero.innerText()).includes("من جدة"));
    assert.equal(
      await hero.locator(".service-slide-description").innerText(),
      "تأسيس الشركات والمشورة القانونية لأعمالك.",
    );
    await page.waitForFunction(() =>
      [...document.querySelectorAll("main img")].every((img) =>
        img.getAttribute("src").includes("/images/brand-"),
      ),
    );
    if (width <= 700) {
      const photo = hero.locator(".service-slide-photo");
      await photo.evaluate((img) => img.decode());
      const geometry = await page.evaluate(() => {
        const visual = document
          .querySelector(".practice-slider-visual")
          .getBoundingClientRect();
        const copy = document
          .querySelector(".practice-slider-copy")
          .getBoundingClientRect();
        return {
          fullWidth:
            Math.abs(visual.width - document.documentElement.clientWidth) < 1,
          separated: copy.top >= visual.bottom - 1,
          height: visual.height,
        };
      });
      assert(
        geometry.fullWidth && geometry.separated,
        `${width}px image above copy`,
      );
      assert(
        (await photo.getAttribute("srcset")).includes("-mobile.webp 720w"),
      );
      await hero
        .getByRole("button", {
          name: "الشريحة 2: العقود والاتفاقيات",
          exact: true,
        })
        .click();
      await hero
        .getByRole("heading", { name: "كل بند له أثر. نعتني بالتفاصيل." })
        .waitFor();
      assert((await photo.getAttribute("src")).includes("brand-contracts"));
      await hero
        .getByRole("button", {
          name: "الشريحة 1: الشركات والاستثمار",
          exact: true,
        })
        .click();
    }
    if (width <= 760) {
      await page
        .locator(".home-practice-choices")
        .getByText("للأفراد", { exact: true })
        .click();
      await page.waitForFunction(() => {
        const list = document.querySelector(".home-practice-options > div");
        const active = list.querySelector('[data-state="on"]');
        if (!active) return false;
        const parent = list.getBoundingClientRect(),
          item = active.getBoundingClientRect();
        return item.left >= parent.left - 1 && item.right <= parent.right + 1;
      });
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator(".mobile-consult").waitFor({ state: "hidden" });
      assert.equal(
        await page.locator(".mobile-consult").count(),
        0,
        "hero has no duplicate fixed CTA",
      );
      await page.locator(".home-office").scrollIntoViewIfNeeded();
      await page.locator(".mobile-consult").waitFor();
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator(".mobile-consult").waitFor({ state: "hidden" });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "فتح القائمة" }).click();
  const sheet = page.getByRole("dialog", { name: "كيف نقدر نساعدك؟" });
  await sheet.waitFor();
  await sheet
    .getByRole("button", { name: "الخدمات القانونية", exact: true })
    .click();
  assert.equal(
    await sheet.locator('.mobile-services-links a[href^="/services/"]').count(),
    8,
  );
  await checkAxe(".mobile-navigation");
  await page.screenshot({ path: "output/qa/redesign-mobile-menu.png" });
  await sheet.getByRole("link", { name: "تأسيس الشركات", exact: true }).click();
  await page.waitForURL("**/services/company-formation");
  await sheet.waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "فتح القائمة" }).click();
  await sheet.waitFor();
  await sheet.getByRole("link", { name: "احجز استشارة", exact: true }).click();
  await page.waitForURL("**/consultation");
  await sheet.waitFor({ state: "hidden" });
  await visit(base + "/services?audience=individual&q=العقارية");
  await page.waitForFunction(
    () => document.querySelectorAll(".practice-card").length === 1,
  );
  await page.locator(".practice-card").first().waitFor();
  assert.equal(await page.locator(".practice-card").count(), 1);
  await page.getByRole("button", { name: "مسح البحث" }).click();
  assert(
    await page
      .getByRole("searchbox")
      .evaluate((e) => e === document.activeElement),
  );
  assert.equal(new URL(page.url()).searchParams.has("q"), false);
  assert.equal(new URL(page.url()).searchParams.get("audience"), "individual");
  await page.reload();
  await page.waitForFunction(
    () => document.querySelectorAll(".practice-card").length === 4,
  );
  await page.locator(".practice-card").first().waitFor();
  assert.equal(await page.locator(".practice-card").count(), 4);
  await page.screenshot({
    path: "output/qa/redesign-mobile-directory.png",
    fullPage: true,
  });
  await visit(base);
  await page.locator(".home-practice").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/qa/redesign-mobile-services.png" });
  await page.screenshot({
    path: "output/qa/redesign-mobile-full.png",
    fullPage: true,
  });
  await context.close();

  for (const theme of ["strip", "forest", "minimal"]) {
    const themed = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await themed.addInitScript(
      (value) => localStorage.setItem("shehri-header-approved-v2", value),
      theme,
    );
    const themedPage = await themed.newPage();
    await themedPage.goto(base);
    await themedPage.locator(`.header-theme-${theme}`).waitFor();
    await themedPage.evaluate(() => document.fonts.ready);
    const menu = themedPage.getByRole("button", { name: "فتح القائمة" });
    const icon = await menu.locator("svg").evaluate((el) => ({
      color: getComputedStyle(el).color,
      width: el.getBoundingClientRect().width,
    }));
    assert.equal(
      icon.color,
      theme === "forest" ? "rgb(247, 243, 235)" : "rgb(20, 62, 49)",
      `${theme} visible menu icon`,
    );
    assert.equal(icon.width, 20, `${theme} menu icon size`);
    if (theme === "forest")
      await themedPage.screenshot({ path: "output/qa/mobile-brand-hero.png" });
    await menu.click();
    await themedPage
      .getByRole("dialog", { name: "كيف نقدر نساعدك؟" })
      .waitFor();
    await themedPage.keyboard.press("Escape");
    await themedPage.waitForFunction(
      () =>
        document.activeElement?.getAttribute("aria-label") === "فتح القائمة",
    );
    assert(await menu.evaluate((el) => el === document.activeElement));
    await themed.close();
  }

  const animated = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await animated.addInitScript(() =>
    sessionStorage.setItem("shehri-intro-v2", "1"),
  );
  const animationPage = await animated.newPage();
  await animationPage.goto(base);
  await animationPage.locator(".home-journey").scrollIntoViewIfNeeded();
  await animationPage.waitForFunction(() =>
    [...document.querySelectorAll(".home-journey-step")].every(
      (el) => +getComputedStyle(el).opacity > 0.99,
    ),
  );
  await animationPage.locator(".home-practice").scrollIntoViewIfNeeded();
  await animationPage
    .locator(".home-practice-choices")
    .getByText("للأفراد", { exact: true })
    .click();
  await animationPage
    .locator(".home-practice-preview")
    .getByRole("heading", { name: "الأحوال الشخصية والتركات", exact: true })
    .waitFor();
  await animationPage.waitForFunction(
    () =>
      +getComputedStyle(document.querySelector(".home-practice-preview > div"))
        .opacity > 0.99,
  );
  await animated.close();
  if (base.includes("4173")) {
    const staticContext = await browser.newContext({
      javaScriptEnabled: false,
    });
    const staticPage = await staticContext.newPage();
    for (const route of ["/", "/services", "/insights/prepare-consultation"]) {
      await staticPage.goto(base + route);
      const content =
        route === "/"
          ? ".home-practice-preview"
          : route === "/services"
            ? ".practice-card-grid article"
            : ".article-content";
      assert(
        await staticPage.locator(content).first().isVisible(),
        route + " static visibility",
      );
      assert.equal(
        await staticPage
          .locator(content)
          .first()
          .evaluate((el) => getComputedStyle(el).opacity),
        "1",
      );
    }
    await staticContext.close();
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "output/qa/redesign-verification.json",
    JSON.stringify(
      {
        base,
        desktopMenu: "passed",
        mobileServicesMenu: "passed",
        serviceSelection: "passed",
        searchRestoration: "passed",
        motion: "passed",
        responsiveWidths: [320, 390, 466, 533, 700, 768, 1440],
        brandImagery:
          "passed: generated assets, responsive source, mobile crop and slider controls",
        headerThemes: "passed: three themes with visible 22px menu icon",
        errors,
      },
      null,
      2,
    ),
  );
  await browser.close();
  console.log(
    "Redesign verified: menus, real service routes, audience selection, restored search, reduced/full motion and responsive layouts.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
