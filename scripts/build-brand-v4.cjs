const fs = require("node:fs");
const path = require("node:path");
const sharp = require("C:/Users/Foxyd/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const { trace } = require("../tmp/brand-tools/node_modules/potrace");

const output = "brand/v4";
const generated =
  "C:/Users/Foxyd/.codex/generated_images/01a12aaa-5e83-7450-bf9a-105bc63902da";
const sources = {
  mark: "exec-81e23fbe-32cd-446e-9ad3-f79a353e5eb9.png",
  quill: "exec-83579318-ee17-4d1a-a5a3-c56f21b3e5e3.png",
};
const palettes = {
  primary: "#143E31",
  beige: "#E9DDC7",
  black: "#101715",
  white: "#FFFFFF",
  bronze: "#B48753",
};
const makeSvg = (width, height, body, color) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="${color}" role="img" aria-label="عبد الله الشهري للمحاماة والاستشارات القانونية"><title>عبد الله الشهري للمحاماة والاستشارات القانونية</title>${body}</svg>`;

async function vectorize(file, name) {
  const input = path.join(generated, file);
  fs.copyFileSync(input, `${output}/sources/${name}-restored.png`);
  const { data, info } = await sharp(input)
    .trim()
    .toBuffer({ resolveWithObject: true });
  const mask = await sharp(data)
    .flatten({ background: "#FFFFFF" })
    .threshold(200)
    .png()
    .toBuffer();
  const svg = await new Promise((resolve, reject) =>
    trace(
      mask,
      { color: "#143E31", threshold: 128, turdSize: 20, optTolerance: 0.25 },
      (error, result) => (error ? reject(error) : resolve(result)),
    ),
  );
  const paths = [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/>/g)]
    .map((match) => `<path fill-rule="evenodd" d="${match[1]}"/>`)
    .join("");
  if (!paths) throw new Error(`No vector paths for ${name}`);
  return { paths, width: info.width, height: info.height };
}

(async () => {
  for (const folder of ["sources", "logos", "previews"])
    fs.mkdirSync(`${output}/${folder}`, { recursive: true });
  fs.mkdirSync("public/brand/v4", { recursive: true });
  for (const [name, original] of [
    ["client-emblem", "WhatsApp Image 2026-10-15 at 16.20.42.jpeg"],
    ["client-quill", "WhatsApp Image 2026-10-15 at 16.20.42 (1).jpeg"],
  ]) {
    fs.copyFileSync(
      path.join("D:/Work/MostafaAttar-Wp/backups", original),
      `${output}/sources/${name}.jpeg`,
    );
  }
  const emblem = await vectorize(sources.mark, "emblem");
  const quill = await vectorize(sources.quill, "quill");
  const existing = fs.readFileSync(
    "public/brand/horizontal-primary.svg",
    "utf8",
  );
  const lettering = [
    ...existing.matchAll(
      /<g fill="#143E31" transform="translate\([^"]+\)">([\s\S]*?)<\/g>/g,
    ),
  ].map((match) => match[1]);
  if (lettering.length !== 2)
    throw new Error("Arabic outlined lettering not found");
  const markBody = `<g transform="translate(35 25) scale(${930 / emblem.width} ${800 / emblem.height})">${emblem.paths}</g>`;
  const quillBody = `<g transform="translate(25 25) scale(${350 / quill.width} ${850 / quill.height})">${quill.paths}</g>`;
  const name = (x, y, scale) =>
    `<g transform="translate(${x} ${y}) scale(${scale})" stroke="currentColor" stroke-width="5" paint-order="stroke fill">${lettering[0]}</g>`;
  const descriptor = (x, y, scale) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${lettering[1]}</g>`;
  const layouts = {
    mark: [1000, 850, markBody],
    quill: [400, 900, quillBody],
    horizontal: [
      760,
      200,
      `<g transform="translate(550 18) scale(.19)">${markBody}</g>${name(28, 98, 1.4)}${descriptor(129, 160, 1.4)}`,
    ],
    compact: [
      760,
      200,
      `<g transform="translate(550 18) scale(.19)">${markBody}</g>${name(28, 110, 1.4)}`,
    ],
    stacked: [
      700,
      620,
      `<g transform="translate(150 20) scale(.4)">${markBody}</g>${name(65.47, 475, 1.6)}${descriptor(123.18, 540, 1.6)}`,
    ],
  };
  const manifest = [];
  for (const [layout, [width, height, body]] of Object.entries(layouts)) {
    for (const [palette, color] of Object.entries(palettes)) {
      const svg = makeSvg(width, height, body, color).replace(
        'fill="' + color + '"',
        `fill="${color}" color="${color}"`,
      );
      const stem = `${layout}-${palette}`;
      fs.writeFileSync(`${output}/logos/${stem}.svg`, svg);
      fs.writeFileSync(`public/brand/v4/${stem}.svg`, svg);
      await sharp(Buffer.from(svg))
        .resize({ width: layout === "quill" ? 1200 : 2400 })
        .png()
        .toFile(`${output}/logos/${stem}.png`);
      manifest.push({
        layout,
        palette,
        color,
        svg: `logos/${stem}.svg`,
        png: `logos/${stem}.png`,
      });
    }
  }
  fs.writeFileSync(
    `${output}/manifest.json`,
    JSON.stringify(
      {
        version: "4",
        date: "2026-10-15",
        source:
          "Client emblem and quill; built-in image restoration, outlined SVG conversion, existing Arabic lettering",
        assets: manifest,
      },
      null,
      2,
    ),
  );
  console.log(
    `Created ${manifest.length} SVG + transparent PNG identity assets.`,
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
