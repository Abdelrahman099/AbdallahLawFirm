const { chromium } = require("playwright");
const fs = require("node:fs");
const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
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
  ].map((id) => "/services/" + id),
  ...[
    "prepare-consultation",
    "business-consultation",
    "organize-documents",
  ].map((id) => "/insights/" + id),
];
(async () => {
  fs.mkdirSync("output/qa/visual-audit", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const results = [],
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    const files = [];
    for (const [index, route] of routes.entries()) {
      await page.goto("http://127.0.0.1:5173" + route);
      await page.locator("main h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(200);
      const path = `output/qa/visual-audit/page-${String(index + 1).padStart(2, "0")}-${width}.png`;
      await page.screenshot({ path });
      files.push(path);
      results.push({
        route,
        width,
        screenshot: path,
        headings: await page.locator("main h1, main h2").allTextContents(),
        overflow: await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      });
      if (route === "/") {
        const sections = page.locator("main > section, main > div");
        for (let i = 0; i < (await sections.count()); i++) {
          const section = sections.nth(i);
          await section.scrollIntoViewIfNeeded();
          await page.waitForTimeout(350);
          await section.screenshot({
            path: `output/qa/visual-audit/home-section-${i + 1}-${width}.png`,
          });
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path: `output/qa/visual-audit/home-full-${width}.png`,
          fullPage: true,
        });
      }
    }
    const tileWidth = width === 390 ? 280 : 450,
      tileHeight = width === 390 ? 620 : 310;
    const columns = 3;
    const layers = [];
    for (let i = 0; i < files.length; i++) {
      const input = await sharp(files[i])
        .resize(tileWidth, tileHeight - 25, {
          fit: "contain",
          background: "#eee9de",
        })
        .toBuffer();
      layers.push({
        input,
        left: (i % columns) * tileWidth,
        top: Math.floor(i / columns) * tileHeight,
      });
      layers.push({
        input: Buffer.from(
          `<svg width="${tileWidth}" height="25"><rect width="100%" height="100%" fill="#143e31"/><text x="10" y="18" font-size="12" font-family="Arial" fill="white">${i + 1}: ${routes[i]}</text></svg>`,
        ),
        left: (i % columns) * tileWidth,
        top: Math.floor(i / columns) * tileHeight + tileHeight - 25,
      });
    }
    await sharp({
      create: {
        width: tileWidth * columns,
        height: tileHeight * Math.ceil(files.length / columns),
        channels: 3,
        background: "#eee9de",
      },
    })
      .composite(layers)
      .png()
      .toFile(`output/qa/visual-audit/contact-sheet-${width}.png`);
  }
  fs.writeFileSync(
    "output/qa/visual-audit/results.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  await browser.close();
  console.log(`Captured ${results.length} page views plus homepage sections.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
