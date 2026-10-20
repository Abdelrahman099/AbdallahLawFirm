import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { LogoIntroId } from "./variants";

gsap.registerPlugin(useGSAP);

export function useLogoTimeline(variant: LogoIntroId, still: boolean) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (
        still ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const timeline = gsap.timeline();
      if (variant === "logo-balance") {
        gsap.set(".logo-rig", { attr: { transform: "rotate(-9 575 475)" } });
        gsap.set(".logo-quill", { y: -420, opacity: 0 });
        timeline
          .from(".logo-stage", { opacity: 0, duration: 0.25 })
          .to(
            ".logo-rig",
            {
              attr: { transform: "rotate(6 575 475)" },
              duration: 0.5,
              ease: "sine.inOut",
            },
            0.12,
          )
          .to(
            ".logo-rig",
            {
              attr: { transform: "rotate(-4 575 475)" },
              duration: 0.5,
              ease: "sine.inOut",
            },
            0.62,
          )
          .to(
            ".logo-quill",
            { y: 0, opacity: 1, duration: 0.72, ease: "power3.inOut" },
            0.72,
          )
          .to(
            ".logo-rig",
            {
              attr: { transform: "rotate(1.3 575 475)" },
              duration: 0.24,
              ease: "power2.out",
            },
            1.42,
          )
          .to(
            ".logo-rig",
            {
              attr: { transform: "rotate(0 575 475)" },
              duration: 0.44,
              ease: "sine.out",
            },
            1.66,
          );
      } else if (variant === "logo-ink") {
        const paths =
          root.current?.querySelectorAll<SVGPathElement>(".logo-emblem path");
        paths?.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            fillOpacity: 0,
            stroke: "currentColor",
            strokeWidth: 2,
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });
        timeline
          .to(".logo-emblem path", {
            strokeDashoffset: 0,
            duration: 1.3,
            stagger: 0.08,
            ease: "power1.inOut",
          })
          .to(
            ".logo-emblem path",
            { fillOpacity: 1, strokeOpacity: 0, duration: 0.45 },
            1.45,
          );
      } else if (variant === "logo-assembly") {
        timeline
          .from(
            ".logo-part-frame",
            { x: 120, opacity: 0, duration: 0.9, ease: "power3.out" },
            0.1,
          )
          .from(
            ".logo-part-foot",
            { y: 110, opacity: 0, duration: 0.8, ease: "power3.out" },
            0.2,
          )
          .from(
            ".logo-book",
            { x: -150, opacity: 0, duration: 0.85, ease: "power3.out" },
            0.35,
          )
          .from(
            ".logo-quill",
            { y: -180, opacity: 0, duration: 0.9, ease: "power3.out" },
            0.65,
          );
      } else if (variant === "logo-book") {
        timeline
          .from(
            ".logo-book",
            {
              scaleX: 0,
              svgOrigin: "575 760",
              duration: 0.8,
              ease: "power2.inOut",
            },
            0,
          )
          .from(
            ".logo-rig",
            {
              scaleY: 0.12,
              opacity: 0,
              svgOrigin: "575 760",
              duration: 0.95,
              ease: "power3.out",
            },
            0.5,
          )
          .from(
            ".logo-quill",
            { y: 180, opacity: 0, duration: 0.8, ease: "power2.out" },
            1.05,
          );
      } else {
        timeline
          .from(
            ".logo-stage",
            { scale: 1.18, opacity: 0, duration: 0.65, ease: "power3.out" },
            0.1,
          )
          .fromTo(
            ".logo-echo",
            { scale: 1, opacity: 0.32 },
            { scale: 1.42, opacity: 0, duration: 0.7, ease: "power2.out" },
            0.65,
          );
      }
    },
    { scope: root, dependencies: [variant, still], revertOnUpdate: true },
  );
  return root;
}
