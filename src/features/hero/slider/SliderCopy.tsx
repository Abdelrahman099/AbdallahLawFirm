import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { HeroHeading } from "../HeroCopy";
import type { serviceSlides } from "./slides";
export function SliderCopy({
  slide,
}: {
  slide: (typeof serviceSlides)[number];
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !scope.current) return;
    const animation = animate(
      scope.current,
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.55, delay: 0.12 },
    );
    return () => animation.stop();
  }, [animate, reduced, scope]);
  return (
    <div ref={scope}>
      <p className="service-slide-label">{slide.label}</p>
      <HeroHeading>
        {slide.title}
        <br />
        <em>{slide.accent}</em>
      </HeroHeading>
      <p className="service-slide-description">{slide.description}</p>
    </div>
  );
}
