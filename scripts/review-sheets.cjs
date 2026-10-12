const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const fs = require("node:fs");
async function sheet(files, output, columns, width, height) {
  const layers = [];
  for (let i = 0; i < files.length; i++) {
    const input = await sharp(files[i])
      .resize(width, height - 30, { fit: "contain", background: "#efefeb" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${width}" height="30"><rect width="100%" height="100%" fill="#143e31"/><text x="15" y="21" fill="white" font-family="Arial" font-size="14">${String(i + 1).padStart(2, "0")}</text></svg>`,
    );
    layers.push(
      {
        input,
        left: (i % columns) * width,
        top: Math.floor(i / columns) * height,
      },
      {
        input: label,
        left: (i % columns) * width,
        top: Math.floor(i / columns) * height + height - 30,
      },
    );
  }
  await sharp({
    create: {
      width: columns * width,
      height: Math.ceil(files.length / columns) * height,
      channels: 3,
      background: "#efefeb",
    },
  })
    .composite(layers)
    .png()
    .toFile(output);
}
(async () => {
  const pdf = fs
    .readdirSync("output/qa/brand")
    .filter((f) => /^pdf-page-\d+\.png$/.test(f))
    .sort()
    .map((f) => "output/qa/brand/" + f);
  await sheet(pdf, "output/qa/brand/pdf-review.png", 4, 420, 325);
  await sheet(
    Array.from(
      { length: 10 },
      (_, i) =>
        `output/qa/directions/hero-${String(i + 1).padStart(2, "0")}-1440.png`,
    ),
    "output/hero-directions.png",
    2,
    640,
    365,
  );
  await sheet(
    Array.from(
      { length: 5 },
      (_, i) => `output/qa/directions/intro-full-${i + 1}.png`,
    ),
    "output/preloader-directions.png",
    2,
    620,
    380,
  );
})();
