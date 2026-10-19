const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const concepts = [
  "signature",
  "spine",
  "frame",
  "seal",
  "chapters",
  "cover",
  "portals",
  "dossier",
  "panorama",
  "index",
];

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  const output = "output/playwright/identity-heroes";
  fs.mkdirSync(output, { recursive: true });
  const errors = [];
  const results = [];
  try {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    for (const viewport of [
      { width: 1440, height: 1000 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      for (const [index, concept] of concepts.entries()) {
        const id = `identity-${concept}`;
        await page.goto(`${base}/design-lab?tab=identity&concept=${id}`);
        const hero = page.locator(`[data-identity-concept="${id}"]`);
        await hero.waitFor();
        await hero.scrollIntoViewIfNeeded();
        await page.evaluate(() => document.fonts.ready);
        await hero
          .locator("img")
          .evaluateAll((images) =>
            Promise.all(images.map((image) => image.decode())),
          );
        const bounds = await hero.evaluate((el) => {
          const frame = el.getBoundingClientRect();
          const emblem = el
            .querySelector(".ih-identity .ih-emblem")
            .getBoundingClientRect();
          return {
            pageOverflow: document.documentElement.scrollWidth - innerWidth,
            heroOverflow: el.scrollWidth - el.clientWidth,
            emblemRight:
              emblem.x + emblem.width / 2 > frame.x + frame.width / 2,
            emblemInside:
              emblem.left >= frame.left && emblem.right <= frame.right,
          };
        });
        assert(
          bounds.pageOverflow <= 1 &&
            bounds.heroOverflow <= 1 &&
            bounds.emblemInside &&
            bounds.emblemRight,
          `${id} ${viewport.width}: ${JSON.stringify(bounds)}`,
        );
        const audit = await new AxeBuilder({ page })
          .include(".identity-hero-container")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        assert.deepEqual(
          audit.violations.map((violation) => ({
            id: violation.id,
            nodes: violation.nodes.map((node) => node.target),
          })),
          [],
          `Accessibility ${id}`,
        );
        if (
          await hero
            .getByRole("button", { name: "عرض العقود والتوثيق", exact: true })
            .count()
        ) {
          const control = hero.getByRole("button", {
            name: "عرض العقود والتوثيق",
            exact: true,
          });
          await control.click();
          assert.equal(await control.getAttribute("aria-pressed"), "true");
          assert(
            await hero
              .getByRole("heading", { name: /^كل بند له أثر/ })
              .isVisible(),
          );
          await hero
            .getByRole("button", {
              name: "عرض الشركات والاستثمار",
              exact: true,
            })
            .click();
        }
        await page.mouse.move(0, 0);
        await hero.screenshot({
          path: `${output}/${String(index + 1).padStart(2, "0")}-${concept}-${viewport.width}.png`,
        });
        results.push({ id, width: viewport.width, ...bounds, axe: "passed" });
      }
    }
    // Container-based phone preview must also work inside a desktop browser.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(
      `${base}/design-lab?tab=identity&concept=identity-index&view=mobile`,
    );
    await page.locator('.ih-lab-frame[data-view="mobile"]').waitFor();
    await page.locator('[data-identity-concept="identity-index"]').waitFor();
    assert(
      (await page.getByTestId("identity-hero-preview").boundingBox()).width <=
        390,
    );
    const rows = page.locator(".ih-index-rows");
    await rows.getByRole("button", { name: /العقود والتوثيق/ }).click();
    assert.match(
      await rows.locator("a").getAttribute("href"),
      /group=agreements/,
    );
    await page
      .getByRole("button", { name: "جرّبه على الرئيسية", exact: true })
      .click();
    await page
      .getByRole("link", { name: "شاهد الرئيسية", exact: true })
      .click();
    await page
      .locator('[data-identity-concept="identity-index"]')
      .waitFor({ state: "attached" });
    assert.equal(await page.locator("main h1").count(), 1);
    await page.evaluate(() => localStorage.removeItem("shehri-hero"));
    await page.goto(`${base}/services?group=agreements`);
    const titles = [
      "العقود التجارية",
      "العقود العامة",
      "توثيق الوكالات",
      "الإفراغ والخدمات العقارية",
    ];
    for (const title of titles)
      await page.getByRole("heading", { name: title, exact: true }).waitFor();
    await page.waitForFunction(
      () => document.querySelectorAll(".practice-card h2").length === 4,
    );
    assert.deepEqual(
      await page.locator(".practice-card h2").allTextContents(),
      titles,
    );
    for (const [slug, title] of [
      ["commercial-contracts", titles[0]],
      ["powers-of-attorney", titles[2]],
      ["property-conveyancing", titles[3]],
    ]) {
      const response = await page.goto(`${base}/services/${slug}`);
      assert.equal(response.status(), 200);
      await page
        .getByRole("heading", { name: title, level: 1, exact: true })
        .waitFor();
    }
    // Pointer depth should move on desktop and reset without affecting text layout.
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${base}/design-lab?tab=identity&concept=identity-dossier`);
    const stage = page.locator(".ih-dossier-stage");
    await stage.scrollIntoViewIfNeeded();
    const box = await stage.boundingBox();
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.25);
    await page.waitForTimeout(600);
    assert.notEqual(
      await page
        .locator(".ih-dossier-object")
        .evaluate((el) => getComputedStyle(el).transform),
      "none",
    );
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      `${output}/result.json`,
      JSON.stringify(
        {
          results,
          runtimeErrors: errors,
          interactions:
            "slider, pointer depth, phone container, home selection, service routes",
        },
        null,
        2,
      ),
    );
    console.log(
      "10 identity heroes passed on desktop/mobile: right-side logos, no overflow, WCAG AA, sliders, pointer depth, local homepage selection and 3 new service pages.",
    );
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
