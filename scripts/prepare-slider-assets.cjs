const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const fs = require("node:fs");
const inputs = [
  ["exec-d34c396c-02a3-4020-9a1c-af3d100e568a.png", "legal-folio"],
  ["exec-e487fefa-90c2-4497-9755-00fbc836b8e8.png", "stone-entrance"],
];
(async () => {
  for (const [input, name] of inputs) {
    const path =
      "C:/Users/Foxyd/.codex/generated_images/01a12aaa-5e83-7450-bf9a-105bc63902da/" +
      input;
    await sharp(path)
      .webp({ quality: 87 })
      .toFile("public/images/" + name + ".webp");
  }
  fs.appendFileSync(
    "docs/visual-assets.md",
    "\n## Slider assets, 12 October 2026\nGenerated with the built-in image_gen tool; conceptual imagery, not photographs of the actual office.\n- public/images/legal-folio.webp: Photorealistic landscape editorial still life, forest leather desk blotter, beige blank folio, bronze pen, walnut desk, afternoon light, travertine interior; no people, readable text or logos.\n- public/images/stone-entrance.webp: Photorealistic landscape contemporary Saudi institutional architecture, travertine rectangular columns, broad staircase, bronze door, warm sunlight, restrained greenery; no people, signs or logos.\n",
  );
})();
