import fs from "node:fs";
import path from "node:path";
import {
  render,
  routes,
  office,
  createLanguage,
  languageFromPath,
  stripLanguage,
} from "../tmp/ssr/entry-server.js";
const template = fs.readFileSync("dist/index.html", "utf8");
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const allRoutes = [
  ...routes,
  ...routes.map((route) => `/en${route === "/" ? "" : route}`),
];
for (const route of [
  ...allRoutes,
  "/design-lab",
  "/en/design-lab",
  "/404",
  "/en/404",
]) {
  const language = languageFromPath(route);
  const t = createLanguage(language).getFixedT(language);
  const sourceTemplate = template
    .replace(
      /<html[^>]*>/,
      `<html lang="${language}" dir="${language === "ar" ? "rtl" : "ltr"}">`,
    )
    .replaceAll(
      "عبد الله الشهري للمحاماة والاستشارات القانونية",
      t(office.fullName),
    )
    .replaceAll("عبد الله الشهري", t(office.name))
    .replace(
      "يرجى تفعيل JavaScript لطلب الاستشارة.",
      language === "en"
        ? "Please enable JavaScript to request a consultation."
        : "يرجى تفعيل JavaScript لطلب الاستشارة.",
    );
  const markup = render(route);
  const h1 =
    markup.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, "") ||
    t(office.name);
  const intro =
    markup
      .match(/<p class="(?:intro-text|hero-description)">([\s\S]*?)<\/p>/)?.[1]
      .replace(/<[^>]*>/g, "") || t(office.fullName);
  const title =
    stripLanguage(route) === "/"
      ? `${t(office.name)} ${t(office.descriptor)} | ${t(office.city)}`
      : `${h1} | ${t(office.name)}`;
  let html = sourceTemplate
    .replace('<div id="root"></div>', '<div id="root">' + markup + "</div>")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escape(intro)}" />`,
    );
  const indexing =
    office.indexable &&
    Boolean(office.siteUrl) &&
    !["/404", "/design-lab"].includes(stripLanguage(route));
  html = html.replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="${indexing ? "index,follow" : "noindex,nofollow"}" />`,
  );
  if (office.siteUrl && route !== "/404")
    html = html.replace(
      "</head>",
      `<link rel="canonical" href="${escape(office.siteUrl + route)}" /></head>`,
    );
  if (stripLanguage(route) === "/") {
    const data = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: t(office.fullName),
      address: {
        "@type": "PostalAddress",
        addressLocality: t(office.city),
        streetAddress: t(office.address),
        addressCountry: "SA",
      },
      ...(office.siteUrl ? { url: office.siteUrl } : {}),
      ...(office.phone ? { telephone: office.phone } : {}),
      ...(office.email ? { email: office.email } : {}),
    };
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script></head>`,
    );
  }
  const alternatePath = stripLanguage(route);
  html = html.replace(
    "</head>",
    `<link rel="alternate" hreflang="ar" href="${office.siteUrl || ""}${alternatePath}"/><link rel="alternate" hreflang="en" href="${office.siteUrl || ""}/en${alternatePath === "/" ? "" : alternatePath}"/></head>`,
  );
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
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes.map((r) => `<url><loc>${escape(office.siteUrl + r)}</loc></url>`).join("")}</urlset>`,
  );
fs.writeFileSync("dist/_redirects", "/* /404.html 404\n");
console.log(
  `Prerendered ${allRoutes.length} bilingual pages + 404. Indexing ${office.indexable && office.siteUrl ? "enabled" : "disabled for preview"}.`,
);
