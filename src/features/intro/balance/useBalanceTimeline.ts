import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import type { BalanceIntroId } from "./variants";
import { choreography } from "./choreography";

gsap.registerPlugin(useGSAP);
export function useBalanceTimeline(variant: BalanceIntroId) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const profile = choreography[variant];
      const sign = Math.sign(profile.tilt);
      const swing = Math.abs(profile.tilt) * 0.72;
      const impact = profile.swordStart + profile.swordDuration;
      gsap.set(".balance-rig", {
        attr: { transform: `rotate(${profile.tilt} 180 125)` },
      });
      gsap.set(".balance-hanger", {
        attr: { transform: `rotate(${-profile.tilt})` },
      });
      gsap.set(".balance-sword", { y: -300, opacity: 0 });
      gsap.set(".balance-caption", { y: 16, opacity: 0 });
      gsap.set(".balance-horizon", { scaleX: 0, transformOrigin: "center" });
      const timeline = gsap.timeline();
      timeline
        .from(
          ".balance-object",
          {
            opacity: 0,
            scale: profile.scale,
            x: profile.x,
            y: profile.y,
            rotation: profile.entryRotation,
            duration: 0.5,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".balance-rig",
          {
            attr: { transform: `rotate(${-swing * sign} 180 125)` },
            duration: 0.48,
            ease: "sine.inOut",
          },
          0.15,
        )
        .to(
          ".balance-hanger",
          {
            attr: { transform: `rotate(${swing * sign})` },
            duration: 0.48,
            ease: "sine.inOut",
          },
          0.15,
        )
        .to(
          ".balance-rig",
          {
            attr: { transform: `rotate(${swing * sign} 180 125)` },
            duration: 0.48,
            ease: "sine.inOut",
          },
          0.63,
        )
        .to(
          ".balance-hanger",
          {
            attr: { transform: `rotate(${-swing * sign})` },
            duration: 0.48,
            ease: "sine.inOut",
          },
          0.63,
        )
        .to(
          ".balance-sword",
          { opacity: 1, duration: 0.15 },
          profile.swordStart - 0.03,
        )
        .to(
          ".balance-sword",
          { y: 0, duration: profile.swordDuration, ease: "power3.in" },
          profile.swordStart,
        )
        .fromTo(
          ".balance-impact",
          { scale: 0.3, opacity: 0.75, svgOrigin: "180 125" },
          { scale: 2.2, opacity: 0, duration: 0.55 },
          impact,
        )
        .to(
          ".balance-rig",
          {
            attr: { transform: `rotate(${-3 * sign} 180 125)` },
            duration: 0.2,
            ease: "power2.out",
          },
          impact,
        )
        .to(
          ".balance-hanger",
          {
            attr: { transform: `rotate(${3 * sign})` },
            duration: 0.2,
            ease: "power2.out",
          },
          impact,
        )
        .to(
          ".balance-rig",
          {
            attr: { transform: "rotate(0 180 125)" },
            duration: 0.45,
            ease: "sine.out",
          },
          impact + 0.2,
        )
        .to(
          ".balance-hanger",
          {
            attr: { transform: "rotate(0)" },
            duration: 0.45,
            ease: "sine.out",
          },
          impact + 0.2,
        )
        .to(".balance-horizon", { scaleX: 1, duration: 0.55 }, impact + 0.25)
        .to(
          ".balance-caption",
          { opacity: 1, y: 0, duration: 0.4 },
          impact + 0.65,
        );

      if (variant === "balance-ink") {
        gsap.set(".balance-outline", {
          strokeDasharray: 370,
          strokeDashoffset: 370,
        });
        timeline.to(
          ".balance-outline",
          { strokeDashoffset: 0, duration: 0.8, stagger: 0.1 },
          0,
        );
      }
      if (variant === "balance-portal")
        timeline.from(
          ".balance-frame",
          { scaleY: 0.4, opacity: 0, duration: 0.8 },
          0,
        );
      if (variant === "balance-seal" || variant === "balance-orbit")
        timeline.from(
          ".balance-ring",
          {
            rotation: 60,
            scale: 0.55,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          0,
        );
      if (variant === "balance-seal" || variant === "balance-orbit")
        timeline.to(
          ".balance-ring",
          { rotation: 0, scale: 1, duration: 0.65 },
          1.5,
        );
      if (variant === "balance-monolith")
        timeline.from(
          ".balance-pedestal",
          { y: 55, opacity: 0, duration: 0.65 },
          0.15,
        );
      if (variant === "balance-split")
        timeline.from(
          ".balance-panel",
          { scaleX: 0, duration: 0.8, stagger: 0.12 },
          0,
        );
      if (variant === "balance-curtain")
        timeline.to(
          ".balance-curtain",
          { scaleX: 0, duration: 0.7, stagger: 0.08, ease: "power3.inOut" },
          1.6,
        );
    },
    { scope: root, dependencies: [variant, reduced], revertOnUpdate: true },
  );
  return root;
}
