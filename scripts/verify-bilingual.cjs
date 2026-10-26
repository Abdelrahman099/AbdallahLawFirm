const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.TEST_URL || "http://127.0.0.1:4173";
const out = "output/qa/bilingual";
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  const errors = [];
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push(page.url() + ": " + e.message));
    const { routes } = await import("../tmp/ssr/entry-server.js");
    for (const originalRoute of routes) {
      const route = originalRoute === "/" ? "" : originalRoute;
      await page.goto(base + "/en" + route);
      await page.locator(".preloader").waitFor({ state: "hidden" });
      await page.locator("h1").waitFor();
      if (route)
        assert(
          !(await page.locator("h1").innerText()).includes(
            "could not be found",
          ),
        );
      assert.equal(await page.locator("html").getAttribute("lang"), "en");
      assert.equal(await page.locator("html").getAttribute("dir"), "ltr");
      const arabic = await page.evaluate(() => {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
        );
        let n;
        const result = [];
        while ((n = walker.nextNode())) {
          const parent = n.parentElement;
          if (
            parent?.closest(
              'script,style,svg,[lang="ar"],noscript,.startup-preloader',
            )
          )
            continue;
          if (/[\u0621-\u064a]/.test(n.textContent))
            result.push(n.textContent.trim());
        }
        return [...new Set(result)];
      });
      assert.deepEqual(
        arabic,
        [],
        `Untranslated English route ${route}: ${arabic.join(" | ")}`,
      );
      assert.equal(await page.locator("h1").count(), 1);
      if (route === "/services") {
        await page.getByRole("searchbox").fill("inheritance");
        assert(
          (await page.locator("main").innerText()).includes("Inheritance"),
        );
      }
      for (const width of [320, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => document.fonts.ready);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          `English overflow on ${route || "/"} at ${width}px`,
        );
      }
      console.log("English content and direction:", route || "/");
    }
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + "/en");
      await page.locator(".preloader").waitFor({ state: "hidden" });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        "English layout overflow at " + width,
      );
      if (width === 1024)
        await page.screenshot({ path: out + "/header-en-1024.png" });
    }
    for (const width of [390, 1280])
      for (const prefix of ["", "/en"]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(base + prefix);
        await page.locator(".preloader").waitFor({ state: "hidden" });
        const hero = page.locator(".practice-slider");
        assert.equal(
          await hero.locator("h1").innerText(),
          prefix ? "Attorney Abdullah Al Shehri" : "المحامي عبد الله الشهري",
        );
        assert.equal(await hero.locator("a").count(), 0);
        assert.equal(await hero.locator(".carousel-toggle").count(), 0);
        assert.equal(await hero.locator(".service-slide-photo").count(), 1);
        assert.equal(await page.locator(".language-switch:visible").count(), 1);
        assert.equal(
          await page.locator(".language-switch:visible").innerText(),
          prefix ? "AR" : "EN",
        );
        assert.equal(await page.locator(".language-switch img").count(), 0);
        if (width < 1024) {
          const identity = await page.locator(".header-identity").boundingBox(),
            header = await page.locator(".header-main").boundingBox();
          assert(
            Math.abs(
              identity.x + identity.width / 2 - (header.x + header.width / 2),
            ) < 1,
            "header identity must be centered",
          );
          assert.equal(
            await page.locator(".mobile-header-tools :is(button,a)").count(),
            2,
          );
        }

        const h = await hero.locator("h1").boundingBox(),
          logo = await hero.locator(".welcome-signature-mark").boundingBox();
        assert(logo.y + logo.height <= h.y);
        const box = await hero.boundingBox();
        assert(
          Math.abs(logo.x + logo.width / 2 - (box.x + box.width / 2)) < 1,
          "main emblem must be centred",
        );
        assert(
          logo.width >= (width < 700 ? 240 : 400),
          "main emblem must remain prominent",
        );
        assert.equal(
          await hero.locator(".welcome-photo-greeting").innerText(),
          prefix ? "Welcome" : "مرحبًا بكم",
        );
        const contacts = page.locator(".contact-actions a");
        assert.equal(await contacts.count(), 2);
        assert.equal(
          await contacts.nth(0).getAttribute("href"),
          "tel:+966550282336",
        );
        assert.match(
          await contacts.nth(1).getAttribute("href"),
          /^https:\/\/wa.me\/966550379331/,
        );
        const a = await contacts.nth(0).boundingBox(),
          b = await contacts.nth(1).boundingBox();
        assert.equal(a.x, b.x);
        assert(b.y > a.y + a.height);
        assert(a.width >= 44);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
        );
        const targets = await hero
          .locator(".service-slide-tabs button")
          .evaluateAll((buttons) =>
            buttons.map((button) => ({
              width: button.getBoundingClientRect().width,
              height: button.getBoundingClientRect().height,
            })),
          );
        assert(
          targets.every((target) => target.width >= 44 && target.height >= 44),
        );
        await page.screenshot({
          path: `${out}/home-${prefix ? "en" : "ar"}-${width}.png`,
        });
        assert.deepEqual(
          (
            await new AxeBuilder({ page })
              .include(".practice-slider")
              .include(".contact-actions")
              .analyze()
          ).violations.map((x) => x.id),
          [],
        );
        await page.goto(base + prefix + "/consultation");
        const form = page.locator(".simple-consultation-form");
        assert.equal(
          await form
            .locator('input:not([type=checkbox]):not([tabindex="-1"])')
            .count(),
          2,
        );
        await form.locator('a[href^="https://wa.me"]').click();
        assert((await form.locator("[role=alert]").count()) >= 2);
        await form.locator('input[autocomplete="name"]').fill("Client Example");
        await form.locator("input[type=tel]").fill("0550123456");
        await form.locator("textarea").fill("Contract question");
        await form.locator("input[type=checkbox]").check();
        await page.waitForFunction(
          () =>
            !document.querySelector(".simple-consultation-form [role=alert]"),
        );
        const whatsapp = new URL(
          await form.locator('a[href^="https://wa.me"]').getAttribute("href"),
        );
        const mail = new URL(
          await form.locator('a[href^="mailto:"]').getAttribute("href"),
        );
        assert.equal(
          whatsapp.searchParams.get("text"),
          mail.searchParams.get("body"),
        );
        assert(mail.searchParams.get("body").includes("Client Example"));
        assert(!mail.searchParams.get("body").includes("Company / Investor"));
        assert(!mail.searchParams.get("body").includes("صفة العميل"));
        await page.screenshot({
          path: `${out}/form-${prefix ? "en" : "ar"}-${width}.png`,
        });
        await page.keyboard.press("Control+Home");
        await page.locator(".language-switch:visible").first().click();
        await page.waitForURL(base + (prefix ? "" : "/en") + "/consultation");
        await page.waitForFunction(
          (expected) => document.documentElement.lang === expected,
          prefix ? "ar" : "en",
        );
        assert.equal(
          await page.locator("html").getAttribute("lang"),
          prefix ? "ar" : "en",
        );
        assert.equal(
          await page.locator('input[autocomplete="name"]').inputValue(),
          "Client Example",
        );
        assert.deepEqual(
          (
            await new AxeBuilder({ page })
              .include(".simple-consultation-form")
              .analyze()
          ).violations.map((x) => x.id),
          [],
        );
      }
    for (const tab of [
      "identity",
      "welcome",
      "slider",
      "heroes",
      "intro",
      "header",
      "filters",
    ]) {
      await page.goto(base + "/en/design-lab?tab=" + tab);
      await page.getByRole("tab", { selected: true }).waitFor();
      await page.waitForTimeout(250);
      const text = await page.locator("main").innerText();
      assert(!/[\u0621-\u064a]/.test(text), "English design lab tab " + tab);
    }
    await ctx.close();
    const auto = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "no-preference",
    });
    const p = await auto.newPage();
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(base + "/en");
    await p.locator(".preloader").waitFor({ state: "hidden" });
    const initialHeroHeight = (
      await p.locator(".practice-slider").boundingBox()
    ).height;
    await p.waitForTimeout(6900);
    assert.equal(
      await p
        .locator(".service-slide-tabs button")
        .nth(1)
        .getAttribute("aria-pressed"),
      "true",
      "autoplay advances after intro",
    );
    assert(
      Math.abs(
        (await p.locator(".practice-slider").boundingBox()).height -
          initialHeroHeight,
      ) < 1,
      "autoplay must keep a stable hero height",
    );
    assert.equal(await p.locator(".carousel-toggle").count(), 0);
    await p.locator(".practice-slider").press("Space");
    const active = await p
      .locator(".service-slide-tabs button[aria-pressed=true]")
      .getAttribute("aria-label");
    await p.waitForTimeout(6900);
    assert.equal(
      await p
        .locator(".service-slide-tabs button[aria-pressed=true]")
        .getAttribute("aria-label"),
      active,
    );
    await auto.close();
    const nojs = await browser.newContext({ javascriptEnabled: false });
    const staticPage = await nojs.newPage();
    await staticPage.goto(base + "/en/about");
    assert.equal(await staticPage.locator("html").getAttribute("dir"), "ltr");
    assert(
      (await staticPage.locator("main").innerText()).includes(
        "Abdullah Al Shehri",
      ),
    );
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log(
      "Bilingual pages, responsive layout, direct contacts, simple form, language persistence, autoplay, pause, SSR and accessibility passed.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
