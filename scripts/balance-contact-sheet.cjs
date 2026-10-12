const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
(async () => {
  const width = 520,
    height = 350,
    columns = 2;
  const layers = [];
  for (let i = 0; i < 10; i++) {
    const input = await sharp(
      `output/qa/balance-intros/balance-${String(i + 1).padStart(2, "0")}.png`,
    )
      .resize(width, height - 28, { fit: "cover" })
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${width}" height="28"><rect width="100%" height="100%" fill="#143e31"/><text x="16" y="20" fill="#f7f3eb" font-size="13" font-family="Arial">${String(i + 1).padStart(2, "0")} · BALANCE / JUSTICE</text></svg>`,
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
        top: Math.floor(i / columns) * height + height - 28,
      },
    );
  }
  await sharp({
    create: {
      width: width * columns,
      height: height * 5,
      channels: 3,
      background: "#f7f3eb",
    },
  })
    .composite(layers)
    .png()
    .toFile("output/balance-preloaders.png");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
