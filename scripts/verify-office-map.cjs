const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    args: ["--enable-unsafe-swiftshader"],
  });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173";
  const output = "output/playwright/office-map";
  fs.mkdirSync(output, { recursive: true });
  const errors = [];
  try {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [width, height, route] of [
      [1440, 1000, "/contact"],
      [390, 844, "/contact"],
      [1440, 1000, "/about"],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(base + route);
      const map = page.locator(".office-map");
      await map.scrollIntoViewIfNeeded();
      await page
        .locator('.office-map[data-map-state="ready"]')
        .waitFor({ timeout: 20000 });
      const pin = map.locator("a.office-map-marker");
      assert.equal(await pin.getAttribute("role"), "link");
      assert.match(
        await pin.getAttribute("href"),
        /^https:\/\/www.google.com\/maps\?cid=619038489399812617$/,
      );
      assert.equal(await pin.getAttribute("target"), "_blank");
      assert.equal(
        await pin.locator("img").getAttribute("src"),
        "/brand/v4/mark-beige.svg",
      );
      assert(await map.getByText("موقع المكتب", { exact: true }).isVisible());
      await pin.focus();
      assert(await pin.evaluate((el) => el === document.activeElement));
      const geometry = await map.evaluate((el) => {
        const pin = el.querySelector(".office-map-pin").getBoundingClientRect();
        const card = el
          .querySelector(".office-map-card")
          .getBoundingClientRect();
        const frame = el
          .querySelector(".office-map-frame")
          .getBoundingClientRect();
        const zoom = el
          .querySelector(".maplibregl-ctrl-zoom-in")
          .getBoundingClientRect();
        return {
          noOverlap:
            pin.right <= card.left ||
            pin.left >= card.right ||
            pin.bottom <= card.top ||
            pin.top >= card.bottom,
          pinVisible:
            pin.left >= frame.left &&
            pin.right <= frame.right &&
            pin.top >= frame.top &&
            pin.bottom <= frame.bottom,
          zoom: zoom.width,
          noPageOverflow: document.documentElement.scrollWidth <= innerWidth,
          pulse: getComputedStyle(
            el.querySelector(".office-map-pulse"),
            "::after",
          ).animationName,
        };
      });
      assert(
        geometry.noOverlap && geometry.pinVisible && geometry.noPageOverflow,
        JSON.stringify(geometry),
      );
      assert(geometry.zoom >= 44);
      assert.equal(geometry.pulse, "none");
      await pin.blur();
      await map.screenshot({
        path: `${output}/${route.slice(1)}-${width}.png`,
      });
    }
    // A tile outage must preserve the address and external map link.
    await context.route("https://tiles.openfreemap.org/**", (route) =>
      route.abort(),
    );
    await page.goto(base + "/contact");
    await page.locator(".office-map").scrollIntoViewIfNeeded();
    await page
      .locator('.office-map[data-map-state="fallback"]')
      .waitFor({ timeout: 20000 });
    assert(
      await page
        .getByRole("link", {
          name: "افتح العنوان في خرائط Google",
          exact: true,
        })
        .isVisible(),
    );
    assert(
      await page
        .getByRole("heading", { name: "مقر المكتب في جدة", exact: true })
        .isVisible(),
    );
    await page
      .locator(".office-map")
      .screenshot({ path: `${output}/unavailable.png` });
    assert.deepEqual(errors, []);
    console.log(
      "Branded map: desktop/mobile, both routes, logo link, card clearance, keyboard, reduced motion and network fallback passed.",
    );
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
