const fs = require("node:fs");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const base = process.env.TEST_URL || "http://127.0.0.1:5173";
const routes = [
  "/",
  "/about",
  "/approach",
  "/services",
  "/consultation",
  "/contact",
  "/faq",
  "/insights",
  "/privacy",
  "/terms",
  ...[
    "company-formation",
    "foreign-investment",
    "contracts",
    "litigation",
    "arbitration",
    "labor",
    "real-estate",
    "family-estates",
  ].map((s) => "/services/" + s),
  ...[
    "prepare-consultation",
    "business-consultation",
    "organize-documents",
  ].map((s) => "/insights/" + s),
];
(async () => {
  fs.mkdirSync("output/qa", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const visit = async (url) => {
    await page.goto(url);
    await page.waitForLoadState("networkidle");
  };
  const errors = [],
    checks = [],
    violations = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (entry) => {
    if (entry.type() === "error" && !entry.text().includes("404 (Not Found)"))
      errors.push(entry.text());
  });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await visit(base + route);
      await page.locator("main h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        for (const image of document.images) image.loading = "eager";
      });
      await page
        .waitForFunction(() => [...document.images].every((i) => i.complete))
        .catch(async (error) => {
          console.error(
            JSON.stringify(
              {
                route,
                width,
                errors,
                images: await page.locator("img").evaluateAll((imgs) =>
                  imgs.map((i) => ({
                    src: i.src,
                    loading: i.loading,
                    complete: i.complete,
                    width: i.naturalWidth,
                  })),
                ),
              },
              null,
              2,
            ),
          );
          throw error;
        });
      assert.equal(await page.locator("main h1").count(), 1, route + " h1");
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        route + " overflow " + width,
      );
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex,nofollow",
      );
      assert.equal(await page.locator(".preloader").count(), 0);
      const broken = await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((i) => !i.complete || i.naturalWidth === 0)
            .map((i) => i.src),
        );
      assert.deepEqual(broken, [], route + " broken assets");
      if (width === 390 || route === "/consultation") {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        violations.push(
          ...result.violations.map((v) => ({
            route,
            width,
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.target),
          })),
        );
      }
      checks.push({ route, width });
    }
  }
  await visit(base + "/services");
  await page.locator("main h1").waitFor();
  fs.writeFileSync(
    "output/qa/site-verification.json",
    JSON.stringify({ base, checks, errors, violations }, null, 2),
  );
  await page.getByText("الأفراد", { exact: true }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".practice-card").length === 4,
  );
  assert((await page.locator(".practice-card").count()) < 8);
  await page.getByRole("searchbox").fill("غير موجود");
  await page
    .getByRole("heading", { name: "لم نجد خدمة بهذا الاسم." })
    .waitFor();
  await page.getByRole("button", { name: "عرض كل الخدمات" }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".practice-card").length === 8,
  );
  assert.equal(await page.locator(".practice-card").count(), 8);
  await page.getByRole("button", { name: "فتح القائمة" }).click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.waitForFunction(
    () => document.activeElement?.getAttribute("aria-label") === "فتح القائمة",
  );
  assert.equal(
    await page
      .getByRole("button", { name: "فتح القائمة" })
      .evaluate((e) => e === document.activeElement),
    true,
  );
  await visit(base + "/consultation?service=company-formation");
  await page.locator("#name").waitFor();
  await page.getByRole("button", { name: "الخطوة التالية" }).click();
  await page.getByText("اكتب اسمًا من حرفين على الأقل.").waitFor();
  await page.locator("#name").fill("عميل اختبار");
  await page.locator("#phone").fill("+٩٦٦ ٥٠ ١٢٣ ٤٥٦٧");
  await page.locator("#phone").press("Enter");
  await page.locator("#service").waitFor();
  assert(
    (await page.locator("#service").innerText()).includes("تأسيس الشركات"),
  );
  await page.getByRole("button", { name: "راجع الطلب" }).click();
  await page.locator("#consent-error").waitFor();
  await page.locator("#summary").fill("أرغب في استشارة عامة.");
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "راجع الطلب" }).click();
  await page.locator(".request-review").waitFor();
  assert(
    (await page.locator(".request-review").innerText()).includes(
      "لم يُرسل للمكتب",
    ),
  );
  await page.getByRole("button", { name: "تعديل البيانات" }).click();
  await page.locator("#summary").waitFor();
  assert.equal(
    await page.locator("#summary").inputValue(),
    "أرغب في استشارة عامة.",
  );
  await page.screenshot({
    path: "output/qa/consultation-step2-mobile.png",
    fullPage: true,
  });
  await visit(base + "/missing");
  await page.locator("main h1").waitFor();
  assert((await page.locator("main").innerText()).includes("404"));
  // A direct production page must have complete content before hydration.
  if (base.includes("4173")) {
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await nojs.newPage();
    for (const route of routes) {
      await staticPage.goto(base + route);
      assert.equal(
        await staticPage.locator("main h1").count(),
        1,
        route + " static HTML",
      );
    }
    await nojs.close();
  }
  fs.writeFileSync(
    "output/qa/site-verification.json",
    JSON.stringify({ base, checks, errors, violations }, null, 2),
  );
  assert.deepEqual(errors, [], "browser errors");
  assert.deepEqual(violations, [], "accessibility violations");
  await browser.close();
  console.log(
    `Verified ${checks.length} responsive routes, booking, filters, keyboard navigation and accessibility.`,
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
