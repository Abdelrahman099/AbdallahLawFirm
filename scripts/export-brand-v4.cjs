const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 850 },
    });
    await page.goto(
      pathToFileURL(path.resolve("brand/v4/identity-guide.html")).href,
    );
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode()));
    });
    const overflow = await page
      .locator(".page")
      .evaluateAll((pages) =>
        pages
          .map((element, index) => ({
            page: index + 1,
            clipped: element.scrollHeight > element.clientHeight,
          }))
          .filter((item) => item.clipped),
      );
    if (overflow.length)
      throw new Error(`Identity pages overflow: ${JSON.stringify(overflow)}`);
    for (let index = 0; index < 6; index++) {
      await page
        .locator(".page")
        .nth(index)
        .screenshot({ path: `brand/v4/previews/page-${index + 1}.png` });
    }
    await page.pdf({
      path: "brand/v4/identity-guide.pdf",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    });
    fs.writeFileSync(
      "brand/v4/verification.json",
      JSON.stringify(
        { pages: 6, overflowingPages: overflow, assetsLoaded: true },
        null,
        2,
      ),
    );
    console.log("Exported six-page identity guide and page previews.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
