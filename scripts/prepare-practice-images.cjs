const fs = require("node:fs");
const path = require("node:path");
const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const manifest = require("../docs/practice-image-prompts-v2.json");
const source =
  "C:/Users/Foxyd/.codex/generated_images/01a12aaa-5e83-7450-bf9a-105bc63902da";
(async () => {
  fs.mkdirSync("brand/visuals", { recursive: true });
  const tiles = [];
  for (const [id, file] of manifest.files) {
    const original = path.join(source, file),
      name = `brand-${id}-v2`;
    fs.copyFileSync(original, `brand/visuals/${name}.png`);
    await sharp(original)
      .resize({ width: 1254 })
      .webp({ quality: 86 })
      .toFile(`public/images/${name}.webp`);
    await sharp(original)
      .resize({ width: 720 })
      .webp({ quality: 84 })
      .toFile(`public/images/${name}-mobile.webp`);
    tiles.push({
      input: await sharp(original).resize(300, 300).png().toBuffer(),
      left: (tiles.length % 4) * 300,
      top: Math.floor(tiles.length / 4) * 300,
    });
    console.log(name);
  }
  fs.mkdirSync("output/qa", { recursive: true });
  await sharp({
    create: {
      width: 1200,
      height: Math.ceil(tiles.length / 4) * 300,
      channels: 3,
      background: "#F7F3EB",
    },
  })
    .composite(tiles)
    .png()
    .toFile("output/qa/practice-images-v2-sheet.png");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
