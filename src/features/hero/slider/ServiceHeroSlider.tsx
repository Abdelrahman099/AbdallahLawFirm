import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { useId, useRef } from "react";

import { useHeroPresentation, type HeroPresentation } from "./presentation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CTA } from "@/components/shared/ConsultationCTA";
import { SliderCopy } from "./SliderCopy";
import { heroSlides } from "./slides";
import { WelcomeSlideVisual } from "./WelcomeSlide";
import { useServiceSlider } from "./useServiceSlider";
import type { WelcomeDirection } from "./welcome-directions";
import { HeroSlidePhoto } from "./HeroSlidePhoto";
gsap.registerPlugin(useGSAP);
export function ServiceHeroSlider({
  presentation: previewPresentation,
  welcomeDirection = "justice",
}: {
  presentation?: HeroPresentation;
  welcomeDirection?: WelcomeDirection;
} = {}) {
  const { tx, t } = useTranslate();

  const savedPresentation = useHeroPresentation();
  const presentation = previewPresentation || savedPresentation;
  const host = useRef<HTMLElement>(null);
  const helpId = useId();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slider = useServiceSlider(heroSlides.length),
    slide = heroSlides[slider.index];
  const welcome = slide.kind === "welcome";
  const legacyWelcome = welcome && welcomeDirection !== "justice";
  useGSAP(
    () => {
      if (slider.reduced) return;
      const image = host.current?.querySelector(
        legacyWelcome ? ".welcome-slide-mark" : ".service-slide-photo",
      );
      if (!image) return;
      gsap.fromTo(
        image,
        {
          scale: legacyWelcome ? 0.96 : 1.12,
          clipPath: legacyWelcome ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        },
        {
          scale: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: legacyWelcome ? 0.7 : 1.15,
          ease: legacyWelcome ? "power2.out" : "power3.inOut",
        },
      );
    },
    {
      scope: host,
      dependencies: [
        slider.index,
        slider.reduced,
        legacyWelcome,
        welcomeDirection,
      ],
      revertOnUpdate: true,
    },
  );
  return (
    <section
      ref={host}
      className={`hero-direction practice-slider slider-layout-${presentation.layout} slider-overlay-${presentation.overlay}${legacyWelcome ? ` practice-slider-welcome welcome-direction-${welcomeDirection}` : welcome ? " practice-slider-photo-welcome" : ""}`}
      aria-roledescription={tx("عرض شرائح")}
      aria-label={tx("المكتب وخدماته")}
      tabIndex={0}
      aria-keyshortcuts="Space Escape"
      aria-describedby={helpId}

      onPointerDown={(e) => {
        if ((e.target as Element).closest("button, a")) return;
        touch.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!touch.current) return;
        const dx = e.clientX - touch.current.x,
          dy = e.clientY - touch.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy))
          slider.go(slider.index + (dx > 0 ? 1 : -1));
        touch.current = null;
      }}
      onPointerCancel={() => {
        touch.current = null;
      }}
      onFocusCapture={(e) =>
        slider.setFocused(!!(e.target as Element).closest("a, button"))
      }
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          slider.setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          slider.setPlaying(false);
          return;
        }
        if (e.key === " " && e.target === e.currentTarget) {
          e.preventDefault();
          slider.setPlaying(!slider.playing);
          return;
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          slider.go(slider.index + (e.key === "ArrowLeft" ? 1 : -1));
        }
      }}
    >
      <span id={helpId} className="sr-only">
        {tx("مسافة لإيقاف العرض أو استئنافه، وEscape لإيقافه.")}
      </span>
      <div className="practice-slider-grid">
        <div className="practice-slider-copy">
          <SliderCopy
            key={slide.label}
            slide={slide}
            photoWelcome={welcome && !legacyWelcome}
          />
          {!welcome && (
            <div className="practice-slider-actions">
              <CTA light={!welcome || welcomeDirection !== "letter"}>
                {tx(welcome ? "احجز استشارتك" : "احجز استشارة")}
              </CTA>
              <Link className="text-link" to={slide.link}>
                {tx(slide.cta)}
              </Link>
            </div>
          )}
        </div>
        <div className="practice-slider-visual">
          {legacyWelcome ? (
            <WelcomeSlideVisual direction={welcomeDirection} />
          ) : (
            <HeroSlidePhoto key={slide.label} slide={slide} />
          )}
        </div>
      </div>
      <div className="practice-slider-bottom site-container">
        <div className="service-slide-tabs" aria-label={tx("اختيار الشريحة")}>
          {heroSlides.map((s, i) => (
            <button
              key={s.label}
              aria-label={tx(
                t("الشريحة {{v0}}: {{v1}}", {
                  v0: i + 1,
                  v1: tx(s.label),
                }),
              )}
              aria-pressed={i === slider.index}
              onClick={() => slider.go(i)}
            >
              <span dir="ltr">0{i + 1}</span>
              <span>{tx(s.label)}</span>
              <i
                className={
                  i === slider.index && slider.running
                    ? "slide-progress running"
                    : "slide-progress"
                }
                key={`${i}-${slider.index}-${slider.running}`}
              />
            </button>
          ))}
        </div>
        <span className="sr-only" aria-live={slider.running ? "off" : "polite"}>
          {tx(slide.label)}
          {tx("، الشريحة ")}
          {slider.index + 1} {tx(" من ")}
          {heroSlides.length}
        </span>
      </div>
    </section>
  );
}
