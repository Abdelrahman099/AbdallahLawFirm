const fs = require("node:fs");
const path = require("node:path");
const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const source =
  "C:/Users/Foxyd/.codex/generated_images/01a12aaa-5e83-7450-bf9a-105bc63902da";
const inputs = [
  ["exec-67e1849a-3373-4214-ba39-a1491037e19b.png", "brand-justice-v1"],
  ["exec-8c30c6b5-50d5-4247-b851-b534b4c2c35e.png", "brand-contracts-v1"],
  ["exec-91e4ec23-5472-4daf-98be-0994b139cfa7.png", "brand-consultation-v1"],
  ["exec-61de22b7-c64b-4f5f-a62f-6e2daa7b68e0.png", "brand-preparation-v1"],
];
(async () => {
  fs.mkdirSync("brand/visuals", { recursive: true });
  for (const [file, name] of inputs) {
    const original = path.join(source, file);
    fs.copyFileSync(original, `brand/visuals/${name}.png`);
    await sharp(original)
      .webp({ quality: 86 })
      .toFile(`public/images/${name}.webp`);
    await sharp(original)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(`public/images/${name}-mobile.webp`);
    console.log(
      `${name}: ${Math.round(fs.statSync(`public/images/${name}.webp`).size / 1024)}KB / mobile ${Math.round(fs.statSync(`public/images/${name}-mobile.webp`).size / 1024)}KB`,
    );
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
