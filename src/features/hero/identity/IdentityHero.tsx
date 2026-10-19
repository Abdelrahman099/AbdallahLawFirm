import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { getIdentityConcept, type IdentityConceptId } from "./concepts";
import { identitySlides } from "./IdentityHeroParts";
import { EvolvedHero } from "./EvolvedHero";
import {
  CoverHero,
  DossierHero,
  IndexHero,
  PanoramaHero,
  PortalsHero,
} from "./CreativeHeroes";
import "./identity-heroes.css";

gsap.registerPlugin(useGSAP);

export function IdentityHero({
  conceptId,
  preview = false,
}: {
  conceptId: IdentityConceptId;
  preview?: boolean;
}) {
  const concept = getIdentityConcept(conceptId);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const host = useRef<HTMLElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const labelId = useId();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-entrance]", {
        opacity: 0,
        y: 22,
        stagger: 0.09,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: host, dependencies: [concept.id, reduced], revertOnUpdate: true },
  );
  const props = {
    slide: identitySlides[index],
    index,
    onSelect: setIndex,
    preview,
  };
  return (
    <section
      className="identity-hero-container"
      ref={host}
      data-identity-concept={concept.id}
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        {preview
          ? `معاينة: ${concept.name}`
          : "مكتب عبد الله الشهري للمحاماة والاستشارات القانونية"}
      </span>
      <div
        className={`identity-hero ${concept.family === "creative" ? "ih-creative" : ""}`}
        onPointerDown={(event) => {
          if (
            (event.target as Element).closest("button, a") ||
            concept.id === "identity-dossier"
          )
            return;
          pointer.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = pointer.current;
          pointer.current = null;
          if (!start) return;
          const dx = event.clientX - start.x,
            dy = event.clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy))
            setIndex((current) => (current + (dx > 0 ? 1 : 2)) % 3);
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onKeyDown={(event) => {
          if (
            concept.id === "identity-portals" ||
            concept.id === "identity-cover"
          )
            return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setIndex(
              (current) => (current + (event.key === "ArrowLeft" ? 1 : 2)) % 3,
            );
          }
        }}
      >
        {concept.family === "evolved" ? (
          <EvolvedHero {...props} concept={concept.id} />
        ) : concept.id === "identity-cover" ? (
          <CoverHero {...props} />
        ) : concept.id === "identity-portals" ? (
          <PortalsHero {...props} />
        ) : concept.id === "identity-dossier" ? (
          <DossierHero {...props} />
        ) : concept.id === "identity-panorama" ? (
          <PanoramaHero {...props} />
        ) : (
          <IndexHero {...props} />
        )}
      </div>
      {!["identity-cover", "identity-portals"].includes(concept.id) && (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {identitySlides[index].label}، {index + 1} من 3
        </p>
      )}
    </section>
  );
}
