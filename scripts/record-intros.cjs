const { chromium } = require("playwright");
const fs = require("node:fs");
(async () => {
  fs.mkdirSync("output/preloaders", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  for (const [i, id] of [
    "balance-onyx",
    "balance-ivory",
    "balance-seal",
    "balance-split",
    "balance-blueprint",
    "balance-monolith",
    "balance-ink",
    "balance-portal",
    "balance-orbit",
    "balance-curtain",
  ].entries()) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: {
        dir: "output/qa/intro-videos",
        size: { width: 1280, height: 800 },
      },
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:5173/design-lab?tab=intro");
    await page
      .getByRole("button", { name: "تشغيل بالحجم الكامل" })
      .nth(i)
      .waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page
      .getByRole("button", { name: "تشغيل بالحجم الكامل" })
      .nth(i)
      .click();
    await page.waitForTimeout(3000);
    await context.close();
    await page.video().saveAs(`output/preloaders/intro-${id}.webm`);
  }
  await browser.close();
  console.log("Saved 10 animated balance/sword preloader previews.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
