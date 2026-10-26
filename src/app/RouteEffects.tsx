import { useTranslate } from "@/i18n/useTranslate";
import { office } from "@/data/site";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function RouteEffects() {
  const { t, tx } = useTranslate();

  const location = useLocation();
  const reduced = useReducedMotion();
  const first = useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!first.current)
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true });
    first.current = false;
    const heading =
      document.querySelector("main h1")?.textContent || office.name;
    document.title = /^\/(?:en\/?)?$/.test(location.pathname)
      ? t("{{v0}} {{v1}} | جدة", {
          v0: tx(office.name),
          v1: tx(office.descriptor),
        })
      : `${heading} | ${tx(office.name)}`;
    const description =
      document.querySelector(".intro-text, .hero-description")?.textContent ||
      t("{{v0}} في جدة. خدمات للشركات والمستثمرين والأفراد.", {
        v0: tx(office.fullName),
      });
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        "content",
        office.indexable ? "index,follow" : "noindex,nofollow",
      );
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (office.siteUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = office.siteUrl + location.pathname;
    }
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("reveal-ready");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-ready");
        observer.observe(el);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach((el) => el.classList.remove("reveal-ready"));
    };
  }, [location.pathname, reduced, t, tx]);
  return null;
}
