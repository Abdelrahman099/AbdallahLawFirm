import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { LogoIntroId } from "./variants";
import { logoChoreography } from "./choreography";
import { addStrikeTimeline } from "./addStrikeTimeline";

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
      const host = root.current;
      if (!host) return;
      const profile = logoChoreography[variant];
      const settled = profile.contact + profile.lock;
      const timeline = gsap.timeline();
      const angleAt = (angle: number) => `rotate(${angle} 575 475)`;
      const leftAt = (angle: number) => `rotate(${-angle} 110 475)`;
      const rightAt = (angle: number) => `rotate(${-angle} 1040 475)`;
      gsap.set(host, { attr: { "data-logo-phase": "swing" } });
      gsap.set(".logo-rest", { opacity: 0 });
      gsap.set(".logo-moving", { opacity: 1 });
      gsap.set(".logo-rig", {
        attr: { transform: angleAt(profile.angles[0]) },
      });
      gsap.set(".logo-pan-left", {
        attr: { transform: leftAt(profile.angles[0]) },
      });
      gsap.set(".logo-pan-right", {
        attr: { transform: rightAt(profile.angles[0]) },
      });
      gsap.set(".logo-quill", {
        opacity: 0,
        attr: { transform: `translate(0 ${profile.quillFrom})` },
      });

      const segment = profile.contact / (profile.angles.length - 1);
      profile.angles.slice(1).forEach((angle, index) => {
        const at = index * segment;
        timeline
          .to(
            ".logo-rig",
            {
              attr: { transform: angleAt(angle) },
              duration: segment,
              ease: "sine.inOut",
            },
            at,
          )
          .to(
            ".logo-pan-left",
            {
              attr: { transform: leftAt(angle) },
              duration: segment,
              ease: "sine.inOut",
            },
            at,
          )
          .to(
            ".logo-pan-right",
            {
              attr: { transform: rightAt(angle) },
              duration: segment,
              ease: "sine.inOut",
            },
            at,
          );
      });

      if (variant === "logo-ink") {
        const frame = host.querySelector<SVGPathElement>(".logo-part-frame");
        if (frame) {
          const length = frame.getTotalLength();
          gsap.set(frame, {
            fillOpacity: 0.18,
            stroke: "currentColor",
            strokeWidth: 3,
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          timeline
            .to(
              frame,
              { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" },
              0,
            )
            .to(frame, { fillOpacity: 1, strokeOpacity: 0, duration: 0.35 }, 1);
        }
      }
      if (variant === "logo-assembly") {
        timeline
          .from(
            ".logo-pan-entry-left",
            {
              attr: { transform: "translate(-140 0)" },
              opacity: 0,
              duration: 0.65,
              ease: "power2.out",
            },
            0,
          )
          .from(
            ".logo-pan-entry-right",
            {
              attr: { transform: "translate(140 0)" },
              opacity: 0,
              duration: 0.65,
              ease: "power2.out",
            },
            0.12,
          );
        gsap.set(".logo-quill", {
          attr: { transform: "translate(95 -400) rotate(-18 575 475)" },
        });
        timeline
          .to(
            ".logo-quill",
            {
              opacity: 1,
              attr: { transform: "translate(-20 -125) rotate(6 575 475)" },
              duration: 0.62,
              ease: "power2.inOut",
            },
            profile.quillStart,
          )
          .to(
            ".logo-quill",
            {
              attr: { transform: "translate(0 0) rotate(0 575 475)" },
              duration: profile.contact - profile.quillStart - 0.62,
              ease: "power2.in",
            },
            profile.quillStart + 0.62,
          );
      } else {
        timeline
          .to(
            ".logo-quill",
            { opacity: 1, duration: 0.18 },
            profile.quillStart - 0.18,
          )
          .to(
            ".logo-quill",
            {
              attr: { transform: "translate(0 0)" },
              duration: profile.contact - profile.quillStart,
              ease:
                variant === "logo-balance"
                  ? "power4.in"
                  : variant === "logo-seal"
                    ? "power3.in"
                    : "power2.inOut",
            },
            profile.quillStart,
          );
      }
      if (variant === "logo-book") {
        timeline.fromTo(
          ".logo-book",
          {
            attr: {
              transform:
                "translate(575 760) scale(0.05 1) translate(-575 -760)",
            },
          },
          {
            attr: {
              transform: "translate(575 760) scale(1 1) translate(-575 -760)",
            },
            duration: 0.6,
            ease: "power2.out",
          },
          0,
        );
      }
      if (variant === "logo-book" || variant === "logo-seal") {
        timeline
          .fromTo(
            ".logo-lock-line",
            { opacity: 0, strokeDasharray: 130, strokeDashoffset: 130 },
            { opacity: 1, strokeDashoffset: 0, duration: 0.16 },
            profile.contact,
          )
          .to(
            ".logo-lock-line",
            { opacity: 0, duration: profile.lock },
            profile.contact + 0.08,
          );
      }
      if (variant === "logo-seal") {
        timeline.fromTo(
          ".logo-echo",
          { scale: 1, opacity: 0.28 },
          { scale: 1.35, opacity: 0, duration: 0.48, ease: "power2.out" },
          profile.contact,
        );
      }
      if (variant === "logo-balance")
        addStrikeTimeline(
          timeline,
          profile.contact,
          profile.quillStart,
          profile.quillFrom,
        );
      timeline
        .set(host, { attr: { "data-logo-phase": "contact" } }, profile.contact)
        .to(
          ".logo-rig",
          {
            attr: { transform: angleAt(0) },
            duration: profile.lock,
            ease: "power2.out",
          },
          profile.contact,
        )
        .to(
          ".logo-pan-left",
          {
            attr: { transform: leftAt(0) },
            duration: profile.lock,
            ease: "power2.out",
          },
          profile.contact,
        )
        .to(
          ".logo-pan-right",
          {
            attr: { transform: rightAt(0) },
            duration: profile.lock,
            ease: "power2.out",
          },
          profile.contact,
        )
        .set(".logo-moving", { opacity: 0 }, settled)
        .set(".logo-rest", { opacity: 1 }, settled)
        .set(host, { attr: { "data-logo-phase": "settled" } }, settled);
    },
    { scope: root, dependencies: [variant, still], revertOnUpdate: true },
  );
  return root;
}
