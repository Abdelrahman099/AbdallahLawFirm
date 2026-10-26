import { useTranslate } from "@/i18n/useTranslate";
import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { HeroHeading } from "../HeroCopy";
import type { HeroSlide } from "./slides";
import { WelcomeSlideCopy } from "./WelcomeSlide";
export function SliderCopy({
  slide,
  photoWelcome = false,
}: {
  slide: HeroSlide;
  photoWelcome?: boolean;
}) {
  const { tx } = useTranslate();

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
      {slide.kind === "welcome" ? (
        <WelcomeSlideCopy photo={photoWelcome} />
      ) : (
        <>
          <p className="service-slide-label">{tx(slide.label)}</p>
          <HeroHeading>
            {tx(slide.title)}
            <br />
            <em>{tx(slide.accent)}</em>
          </HeroHeading>
        </>
      )}
      {slide.kind !== "welcome" && (
        <p className="service-slide-description">{tx(slide.description)}</p>
      )}
    </div>
  );
}
