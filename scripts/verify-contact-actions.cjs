const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const base = process.env.TEST_URL || "http://127.0.0.1:4173";
const output = "output/qa/contact-actions";

async function verifyDrafts(page) {
  const review = page.locator(".request-review");
  await review.waitFor();
  await page.waitForFunction(() => {
    let node = document.querySelector(".request-review");
    while (node) {
      if (Number(getComputedStyle(node).opacity) < 0.999) return false;
      node = node.parentElement;
    }
    return true;
  });
  const email = new URL(
    await review
      .getByRole("link", { name: "افتح رسالة البريد" })
      .getAttribute("href"),
  );
  const whatsapp = new URL(
    await review
      .getByRole("link", { name: /افتح رسالة واتساب/ })
      .getAttribute("href"),
  );
  assert.equal(email.pathname, "at.sh.14360@gmail.com");
  assert.equal(whatsapp.pathname, "/966550379331");
  assert.equal(
    email.searchParams.get("body"),
    whatsapp.searchParams.get("text"),
  );
  assert.match(email.searchParams.get("body"), /عميل معاينة/);
  assert.match(email.searchParams.get("body"), /طلب تجريبي & عقد؟/);
  assert.equal(
    await review.getByText("وصل طلبك للمكتب.", { exact: true }).count(),
    0,
  );
  assert.match(await review.innerText(), /فتح المسودة وحده لا يرسل الطلب/);
  assert.equal(await page.locator('input[type="file"]').count(), 0);
  const result = await new AxeBuilder({ page })
    .include(".request-review")
    .analyze();
  if (result.violations.length) {
    fs.writeFileSync(
      `${output}/review-accessibility.json`,
      JSON.stringify(result.violations, null, 2),
    );
    await page.screenshot({
      path: `${output}/review-failure.png`,
      fullPage: true,
    });
  }
  assert.deepEqual(
    result.violations.map((v) => v.id),
    [],
  );
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  try {
    for (const width of [320, 390, 1280, 1440]) {
      const height = width === 1280 ? 720 : 900;
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: width === 1280 ? "no-preference" : "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      const deliveries = [];
      page.on("pageerror", (error) =>
        errors.push({ url: page.url(), message: error.message }),
      );
      page.on("request", (request) => {
        if (request.method() === "POST") deliveries.push(request.url());
      });
      await page.goto(`${base}/contact`);
      const dock = page.locator(".contact-actions");
      await dock.waitFor({ state: "visible" });
      assert.equal(
        await dock
          .getByRole("link", { name: /اتصل بالمكتب/ })
          .getAttribute("href"),
        "tel:+966550282336",
      );
      assert.equal(
        new URL(
          await dock.getByRole("link", { name: /واتساب/ }).getAttribute("href"),
        ).pathname,
        "/966550379331",
      );
      const positions = await dock.locator("a").evaluateAll((links) =>
        links.map((link) => {
          const { x, y, width, height } = link.getBoundingClientRect();
          return { x, y, width, height };
        }),
      );
      assert(
        positions.every(
          (p) => p.width >= 44 && p.height >= 44 && p.y + p.height <= height,
        ),
      );
      assert(
        positions[0].x > positions[1].x,
        "call on right, WhatsApp on left",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      const axe = await new AxeBuilder({ page })
        .include(".contact-actions")
        .analyze();
      assert.deepEqual(
        axe.violations.map((v) => v.id),
        [],
      );
      await page.screenshot({ path: `${output}/contact-${width}.png` });
      if (width < 1024) {
        await page
          .getByRole("button", { name: "فتح القائمة", exact: true })
          .click();
        await page.getByRole("dialog").waitFor();
        assert.equal(
          await dock.isVisible(),
          false,
          "dock hidden under modal navigation",
        );
        await page
          .getByRole("button", { name: "إغلاق القائمة", exact: true })
          .click();
        await dock.waitFor({ state: "visible" });
      }
      await page.goto(base);
      await page.locator(".preloader").waitFor({ state: "visible" });
      assert.equal(await dock.isVisible(), false);
      assert.equal(await dock.evaluate((el) => el.inert), true);
      await page.locator(".intro-skip").click();
      await dock.waitFor({ state: "visible" });
      assert.equal(
        await page.evaluate(() => {
          const actions = Array.from(
            document.querySelectorAll(".contact-actions a"),
          );
          const heroLinks = Array.from(
            document.querySelectorAll(".practice-slider-actions a"),
          );
          return actions.some((action) => {
            const a = action.getBoundingClientRect();
            return heroLinks.some((link) => {
              const b = link.getBoundingClientRect();
              return (
                a.left < b.right &&
                a.right > b.left &&
                a.top < b.bottom &&
                a.bottom > b.top
              );
            });
          });
        }),
        false,
        "fixed contacts do not overlap hero booking actions",
      );
      await page.locator("#home-name").fill("عميل معاينة");
      assert.equal(await dock.isVisible(), false, "dock hidden while editing");
      await page.locator("#home-phone").fill("0551234567");
      await page.locator("#home-summary").fill("طلب تجريبي & عقد؟");
      await page.locator("#home-consent").check();
      await page
        .getByRole("button", { name: "راجع طلبك", exact: true })
        .click();
      await verifyDrafts(page);
      await page
        .getByRole("link", { name: "افتح رسالة البريد", exact: true })
        .scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${output}/home-review-${width}.png` });
      await page
        .getByRole("button", { name: "تعديل البيانات", exact: true })
        .click();
      assert.equal(
        await page.locator("#home-name").inputValue(),
        "عميل معاينة",
      );
      await page.goto(`${base}/consultation?service=estates`);
      await page.locator("#name").fill("عميل معاينة");
      await page.locator("#phone").fill("0551234567");
      await page
        .getByRole("button", { name: "الخطوة التالية", exact: true })
        .click();
      await page.locator("#summary").fill("طلب تجريبي & عقد؟");
      await page.locator("#consent").check();
      await page
        .getByRole("button", { name: "راجع الطلب", exact: true })
        .click();
      await verifyDrafts(page);
      await page.goto(`${base}/design-lab?tab=intro`);
      assert.equal(
        await dock.count(),
        0,
        "no contact dock over design previews",
      );
      assert.deepEqual(
        deliveries,
        [],
        "review and validation never transmit a request",
      );
      assert.deepEqual(errors, []);
      console.log(
        `${width}px: contacts, safe spacing, modal/intro/typing, both forms, matching drafts, edit recovery and accessibility passed`,
      );
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
