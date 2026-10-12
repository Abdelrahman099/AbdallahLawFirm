import { articles } from "@/data/articles";
import { services } from "@/data/services";
export const routes = [
  "/",
  "/about",
  "/approach",
  "/services",
  ...services.map((s) => "/services/" + s.slug),
  "/consultation",
  "/contact",
  "/faq",
  "/insights",
  ...articles.map((a) => "/insights/" + a.slug),
  "/privacy",
  "/terms",
];
