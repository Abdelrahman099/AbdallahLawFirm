import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHomeMotion(root: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const entrances: {
          element: HTMLElement;
          animation: gsap.core.Animation;
        }[] = [];
        const reveal = (element: HTMLElement, vars: gsap.TweenVars) => {
          if (element.getBoundingClientRect().bottom <= 0) return;
          const animation = gsap.from(element, {
            duration: 0.65,
            ease: "power3.out",
            ...vars,
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
          entrances.push({ element, animation });
        };
        page
          .querySelectorAll<HTMLElement>(
            ".home-section-heading > div, .home-journey-heading, .home-faq-grid > div:first-child",
          )
          .forEach((element) => reveal(element, { opacity: 0, y: 30 }));

        const office = page.querySelector<HTMLElement>(".home-office-heading");
        if (office) {
          const sequence = gsap.timeline({
            scrollTrigger: { trigger: office, start: "top 85%", once: true },
          });
          sequence
            .from(office.querySelector(".eyebrow"), {
              opacity: 0,
              y: 16,
              duration: 0.35,
            })
            .from(
              office.querySelectorAll(".office-title-line"),
              {
                y: 42,
                opacity: 0,
                stagger: 0.15,
                duration: 0.7,
                ease: "power3.out",
              },
              0.1,
            )
            .from(
              office.querySelector(".office-rule"),
              {
                scaleX: 0,
                transformOrigin: "right",
                duration: 0.8,
                ease: "power2.out",
              },
              0.2,
            );
          entrances.push({ element: office, animation: sequence });
        }
        const officeImage = page.querySelector<HTMLElement>(
          ".home-office-panorama",
        );
        if (officeImage) {
          reveal(officeImage, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.95,
          });
          gsap.fromTo(
            officeImage.querySelector("img"),
            { yPercent: -4, scale: 1.12 },
            {
              yPercent: 4,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: officeImage,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        }
        page
          .querySelectorAll<HTMLElement>(
            ".home-office-story > div, .home-journey-step",
          )
          .forEach((element) => {
            reveal(element, { opacity: 0, y: 24, duration: 0.6 });
          });
        const steps = page.querySelector<HTMLElement>(".home-journey-steps");
        const line = page.querySelector<HTMLElement>(".home-journey-line");
        if (steps && line)
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: steps,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.25,
            },
          });
        page
          .querySelectorAll<HTMLElement>(".home-reading-grid a")
          .forEach((element) => {
            reveal(element, { y: 40, opacity: 0, duration: 0.7 });
          });
        const invitation = page.querySelector<HTMLElement>(
          ".consultation-invitation-copy",
        );
        if (invitation) reveal(invitation, { opacity: 0, y: 28 });

        const showFocusedContent = (event: FocusEvent) => {
          if (!(event.target instanceof Node)) return;
          for (const { element, animation } of entrances) {
            if (element.contains(event.target)) animation.progress(1);
          }
        };
        page.addEventListener("focusin", showFocusedContent);
        return () => page.removeEventListener("focusin", showFocusedContent);
      });
      const refresh = () => ScrollTrigger.refresh();
      const images = Array.from(page.querySelectorAll("img"));
      images.forEach((image) => image.addEventListener("load", refresh));
      let active = true;
      void document.fonts.ready.then(() => {
        if (active) refresh();
      });
      return () => {
        active = false;
        images.forEach((image) => image.removeEventListener("load", refresh));
        media.revert();
      };
    },
    { scope: root },
  );
}
