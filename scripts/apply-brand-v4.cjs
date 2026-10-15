const fs = require("node:fs");
const path = require("node:path");

let index = fs.readFileSync("index.html", "utf8");
const mark = fs
  .readFileSync("public/brand/v4/mark-beige.svg", "utf8")
  .replace(/ role="img" aria-label="[^"]*"/, ' aria-hidden="true"');
index = index
  .replace(/<svg[\s\S]*?<\/svg>/, mark)
  .replace(
    'href="/brand/mark-primary.svg"',
    'href="/brand/v4/mark-primary.svg"',
  )
  .replaceAll("#f7f3eb", "#e9ddc7");
fs.writeFileSync("index.html", index);

const walk = (folder) =>
  fs
    .readdirSync(folder, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(folder, entry.name))
        : [path.join(folder, entry.name)],
    );
for (const file of walk("src").filter((file) => file.endsWith(".css"))) {
  const css = fs.readFileSync(file, "utf8");
  const updated = css
    .replace(/#f7f3eb/gi, "#e9ddc7")
    .replace(/#fcfaf5/gi, "#f0e5d2")
    .replace(/#886239/gi, "var(--bronze-text)")
    .replace(/#5d6761/gi, "var(--muted)");
  if (updated !== css) fs.writeFileSync(file, updated);
}
const tokens = JSON.parse(fs.readFileSync("brand/design-tokens.json", "utf8"));
tokens.color.ivory = "#E9DDC7";
tokens.color.beige = "#E9DDC7";
tokens.color.muted = "#526058";
tokens.color.bronzeText = "#765431";
fs.writeFileSync("brand/design-tokens.json", JSON.stringify(tokens, null, 2));
console.log("Applied v4 boot mark, favicon and beige color roles.");
