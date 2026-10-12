import fs from "node:fs/promises";
import path from "node:path";
const project = process.cwd();
const manifest = JSON.parse(
  await fs.readFile(
    path.join(project, "docs/photography-sources.json"),
    "utf8",
  ),
);
const target = path.join(project, "public/images");
await fs.mkdir(target, { recursive: true });
await Promise.all(
  manifest.photos.map(async (photo) => {
    if (
      !/^[a-z-]+$/.test(photo.file) ||
      !/^photo-[a-z0-9-]+$/.test(photo.image)
    )
      throw new Error("Invalid photo identifier");
    const url = `https://images.unsplash.com/${photo.image}?fm=webp&fit=max&w=1400&q=82`;
    const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("image")
    )
      throw new Error(`${photo.file}: ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (
      bytes.toString("ascii", 0, 4) !== "RIFF" ||
      bytes.toString("ascii", 8, 12) !== "WEBP"
    )
      throw new Error("Expected WebP");
    await fs.writeFile(path.join(target, `${photo.file}.webp`), bytes);
    console.log(`${photo.file}: ${Math.round(bytes.length / 1024)} KB`);
  }),
);
