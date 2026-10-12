const { chromium } = require("playwright");
const fs = require("node:fs");

(async () => {
  fs.mkdirSync("output/qa/home-motion/demo", { recursive: true });
  const browser = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
  for (const [device, width, height] of [["mobile", 390, 844], ["desktop", 1440, 900]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "no-preference", recordVideo: { dir: "output/qa/home-motion/demo", size: { width, height } } });
    await context.addInitScript(() => sessionStorage.setItem("shehri-intro-v2", "1"));
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4173");
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll(".home-page img")].map(async image => { image.loading = "eager"; await image.decode(); }));
    });
    const top = await page.locator(".home-office").evaluate(e => e.getBoundingClientRect().top + scrollY);
    const bottom = await page.locator(".home-journey").evaluate(e => e.getBoundingClientRect().bottom + scrollY);
    await page.evaluate(y => scrollTo(0, y), top - height + 150);
    await page.waitForTimeout(700);
    for (let y = top - height + 150; y < bottom - height + 120; y += 150) {
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(450);
    }
    await page.waitForTimeout(1000);
    await context.close();
    await page.video().saveAs(`output/qa/home-motion/demo-${device}.webm`);
  }
  await browser.close();
  console.log("Saved mobile and desktop homepage motion demonstrations.");
})().catch(error => { console.error(error); process.exit(1); });
