const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("brand/v4/logos/mark-primary.svg", "utf8");
const outline = source.match(/<path[^>]*\sd="([^"]+)"/)[1];
const transform = source.match(/<g transform="([^"]+)"/)[1];
const base = process.env.TEST_URL || "http://127.0.0.1:4173";
const ids = [
  "logo-balance",
  "logo-ink",
  "logo-assembly",
  "logo-book",
  "logo-seal",
];
const output = "output/playwright/quill-balance";
fs.mkdirSync(output, { recursive: true });

function positions(scene) {
  const point = (selector, x, y) => {
    const target = scene.querySelector(selector);
    return new DOMPoint(x, y).matrixTransform(target.getScreenCTM());
  };
  const left = point(".logo-pan-left", 110, 690);
  const right = point(".logo-pan-right", 1040, 690);
  const edgeA = point(".logo-pan-left", 20, 680);
  const edgeB = point(".logo-pan-left", 200, 680);
  return { difference: left.y - right.y, level: Math.abs(edgeA.y - edgeB.y) };
}

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const errors = [];
  try {
    const context = await browser.newContext({
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        /attribute.*transform/.test(message.text())
      )
        errors.push(message.text());
    });
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + "/design-lab?tab=intro");
      await page.locator('[data-intro-choice="logo-balance"]').waitFor();
      for (const id of ids) {
        const trigger = page
          .locator(`[data-intro-choice="${id}"]`)
          .getByRole("button");
        await trigger.click();
        const scene = page.locator(`[role="dialog"] [data-logo-intro="${id}"]`);
        await scene.waitFor();
        const first = await scene.evaluate(positions);
        assert(
          first.level < 1,
          "the pans remain horizontal while their attachment points move",
        );
        await page.waitForFunction(
          ({ id, sign }) => {
            const scene = document.querySelector(
              `[role="dialog"] [data-logo-intro="${id}"]`,
            );
            if (!scene || scene.dataset.logoPhase !== "swing") return false;
            const left = new DOMPoint(110, 690).matrixTransform(
              scene.querySelector(".logo-pan-left").getScreenCTM(),
            );
            const right = new DOMPoint(1040, 690).matrixTransform(
              scene.querySelector(".logo-pan-right").getScreenCTM(),
            );
            return (
              Math.sign(left.y - right.y) !== sign &&
              Math.abs(left.y - right.y) > 5
            );
          },
          { id, sign: Math.sign(first.difference) },
        );
        await page.screenshot({ path: `${output}/${id}-${width}-swing.png` });
        const hole = await scene
          .locator(".logo-quill path")
          .evaluate((path) => path.isPointInFill(new DOMPoint(570, 460)));
        assert.equal(
          hole,
          false,
          "the original internal quill cutout must remain open",
        );
        await page.waitForFunction(
          (id) =>
            document.querySelector(`[role="dialog"] [data-logo-intro="${id}"]`)
              ?.dataset.logoPhase === "contact",
          id,
        );
        assert.match(
          await scene.locator(".logo-quill").getAttribute("transform"),
          /translate\(0 0\)/,
          "the quill lands before the balance locks",
        );
        await page.waitForFunction((id) => {
          const scene = document.querySelector(
            `[role="dialog"] [data-logo-intro="${id}"]`,
          );
          return (
            scene?.dataset.logoPhase === "settled" &&
            getComputedStyle(scene.querySelector(".logo-caption")).opacity ===
              "1"
          );
        }, id);
        assert.equal(
          await scene.locator(".logo-rest path").getAttribute("d"),
          outline,
        );
        assert.equal(
          await scene.locator(".logo-rest").getAttribute("transform"),
          transform,
        );
        assert.equal(
          await scene
            .locator(".logo-rest")
            .evaluate((el) => getComputedStyle(el).opacity),
          "1",
        );
        assert.equal(
          await scene
            .locator(".logo-moving")
            .evaluate((el) => getComputedStyle(el).opacity),
          "0",
        );
        assert.equal(
          await scene
            .locator(".logo-rest path")
            .evaluate((path) => path.isPointInFill(new DOMPoint(570, 460))),
          false,
        );
        const final = await scene.evaluate(positions);
        assert(
          Math.abs(final.difference) < 1,
          "both pans finish at the same height",
        );
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        );
        assert(
          await page.locator('[role="dialog"] button').evaluateAll((buttons) =>
            buttons.every((button) => {
              const r = button.getBoundingClientRect();
              return (
                r.left >= 0 &&
                r.right <= innerWidth + 1 &&
                r.bottom <= innerHeight + 1
              );
            }),
          ),
        );
        await page.screenshot({ path: `${output}/${id}-${width}-settled.png` });
        if (id === "logo-balance") {
          const accessibility = await new AxeBuilder({ page })
            .include('[role="dialog"]')
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          assert.deepEqual(accessibility.violations, []);
        }
        await page.getByRole("button", { name: "إغلاق", exact: true }).click();
        await page.locator('[role="dialog"]').waitFor({ state: "hidden" });
        assert(await trigger.evaluate((el) => el === document.activeElement));
        console.log(
          `${id} ${width}px: opposing travel, level pans, open quill, contact, exact final emblem and controls passed.`,
        );
      }
    }
    const reduced = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const staticPage = await reduced.newPage();
    await staticPage.goto(base + "/design-lab?tab=intro");
    await staticPage
      .locator('[data-intro-choice="logo-balance"]')
      .getByRole("button")
      .click();
    assert.equal(
      await staticPage.locator('[role="dialog"] .logo-moving').count(),
      0,
    );
    assert.equal(
      await staticPage
        .locator('[role="dialog"] .logo-rest path')
        .getAttribute("d"),
      outline,
    );
    assert.deepEqual(errors, []);
    console.log("Reduced-motion identity and runtime checks passed.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
