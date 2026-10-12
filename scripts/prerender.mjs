import fs from "node:fs";
import path from "node:path";
import { render, routes, office } from "../tmp/ssr/entry-server.js";
const template = fs.readFileSync("dist/index.html", "utf8");
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
for (const route of [...routes, "/design-lab", "/404"]) {
  const markup = render(route);
  const h1 =
    markup.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, "") ||
    office.name;
  const intro =
    markup
      .match(/<p class="(?:intro-text|hero-description)">([\s\S]*?)<\/p>/)?.[1]
      .replace(/<[^>]*>/g, "") || office.fullName;
  const title =
    route === "/"
      ? `${office.name} ${office.descriptor} | جدة`
      : `${h1} | ${office.name}`;
  let html = template
    .replace('<div id="root"></div>', '<div id="root">' + markup + "</div>")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escape(intro)}" />`,
    );
  const indexing =
    office.indexable &&
    Boolean(office.siteUrl) &&
    !["/404", "/design-lab"].includes(route);
  html = html.replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="${indexing ? "index,follow" : "noindex,nofollow"}" />`,
  );
  if (office.siteUrl && route !== "/404")
    html = html.replace(
      "</head>",
      `<link rel="canonical" href="${escape(office.siteUrl + route)}" /></head>`,
    );
  if (route === "/") {
    const data = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: office.fullName,
      address: {
        "@type": "PostalAddress",
        addressLocality: office.city,
        streetAddress: office.address,
        addressCountry: "SA",
      },
      ...(office.siteUrl ? { url: office.siteUrl } : {}),
      ...(office.phone ? { telephone: office.phone } : {}),
    };
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script></head>`,
    );
  }
  const file =
    route === "/"
      ? "dist/index.html"
      : route === "/404"
        ? "dist/404.html"
        : path.join("dist", route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (route !== "/" && route !== "/404")
    fs.writeFileSync(path.join("dist", route.slice(1) + ".html"), html);
}
fs.writeFileSync(
  "dist/robots.txt",
  office.indexable && office.siteUrl
    ? `User-agent: *\nAllow: /\nSitemap: ${office.siteUrl}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
if (office.siteUrl)
  fs.writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((r) => `<url><loc>${escape(office.siteUrl + r)}</loc></url>`).join("")}</urlset>`,
  );
fs.writeFileSync("dist/_redirects", "/* /404.html 404\n");
console.log(
  `Prerendered ${routes.length} pages + 404. Indexing ${office.indexable && office.siteUrl ? "enabled" : "disabled for preview"}.`,
);
