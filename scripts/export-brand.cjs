const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 850 },
    deviceScaleFactor: 1,
  });
  const applications = JSON.parse(
    fs.readFileSync("brand/applications-manifest.json"),
  );
  for (const app of applications) {
    await page.goto(pathToFileURL(path.resolve("brand", app.source)).href);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: path.join("brand", app.image),
      fullPage: true,
    });
  }
  await page.goto(pathToFileURL(path.resolve("brand/brand-book.html")).href);
  await page.evaluate(() => document.fonts.ready);
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
    );
  if (broken.length)
    throw new Error("Broken brand assets: " + broken.join(", "));
  const overflow = await page.locator(".page").evaluateAll((pages) =>
    pages
      .map((p, i) => ({
        page: i + 1,
        overflow: p.scrollHeight > p.clientHeight,
      }))
      .filter((x) => x.overflow),
  );
  if (overflow.length)
    throw new Error("Brand layout overflow: " + JSON.stringify(overflow));
  fs.mkdirSync("output/qa/brand", { recursive: true });
  for (let i = 0; i < (await page.locator(".page").count()); i++)
    await page
      .locator(".page")
      .nth(i)
      .screenshot({
        path: `output/qa/brand/page-${String(i + 1).padStart(2, "0")}.png`,
      });
  await page.pdf({
    path: "output/Abdullah-Al-Shehri-Brand-Identity.pdf",
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });
  await browser.close();
  console.log("Exported 19-page PDF and 15 updated application images.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
