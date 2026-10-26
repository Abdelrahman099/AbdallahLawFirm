import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { useRef } from "react";

import { useHeroPresentation, type HeroPresentation } from "./presentation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CTA } from "@/components/shared/ConsultationCTA";
import { SliderCopy } from "./SliderCopy";
import { heroSlides } from "./slides";
import { WelcomeSlideVisual } from "./WelcomeSlide";
import { useServiceSlider } from "./useServiceSlider";
import type { WelcomeDirection } from "./welcome-directions";
import { Pause, Play } from "lucide-react";
gsap.registerPlugin(useGSAP);
export function ServiceHeroSlider({
  presentation: previewPresentation,
  welcomeDirection = "silk",
}: {
  presentation?: HeroPresentation;
  welcomeDirection?: WelcomeDirection;
} = {}) {
  const { tx, t } = useTranslate();

  const savedPresentation = useHeroPresentation();
  const presentation = previewPresentation || savedPresentation;
  const host = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slider = useServiceSlider(heroSlides.length),
    slide = heroSlides[slider.index];
  const welcome = slide.kind === "welcome";
  useGSAP(
    () => {
      if (slider.reduced) return;
      const image = host.current?.querySelector(
        welcome ? ".welcome-slide-mark" : ".service-slide-photo",
      );
      if (!image) return;
      gsap.fromTo(
        image,
        {
          scale: welcome ? 0.96 : 1.12,
          clipPath: welcome ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        },
        {
          scale: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: welcome ? 0.7 : 1.15,
          ease: welcome ? "power2.out" : "power3.inOut",
        },
      );
    },
    {
      scope: host,
      dependencies: [slider.index, slider.reduced, welcome, welcomeDirection],
      revertOnUpdate: true,
    },
  );
  return (
    <section
      ref={host}
      className={`hero-direction practice-slider slider-layout-${presentation.layout} slider-overlay-${presentation.overlay}${welcome ? ` practice-slider-welcome welcome-direction-${welcomeDirection}` : ""}`}
      aria-roledescription={tx("عرض شرائح")}
      aria-label={tx("المكتب وخدماته")}
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
        slider.setFocused(
          !!(e.target as Element).closest(
            "a, button:not([data-carousel-toggle])",
          ),
        )
      }
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          slider.setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          slider.go(slider.index + (e.key === "ArrowLeft" ? 1 : -1));
        }
      }}
    >
      <div className="practice-slider-grid">
        <div className="practice-slider-copy">
          <SliderCopy key={slide.label} slide={slide} />
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
          {slide.kind === "welcome" ? (
            <WelcomeSlideVisual direction={welcomeDirection} />
          ) : (
            <>
              <img
                key={slide.image}
                className="service-slide-photo"
                src={slide.image}
                srcSet={`${slide.image.replace(".webp", "-mobile.webp")} 720w, ${slide.image} 1254w`}
                sizes="(max-width: 700px) 100vw, 50vw"
                alt={tx(slide.alt)}
                width={1254}
                height={1254}
                fetchPriority="high"
                draggable={false}
              />
              <div className="service-slide-image-shade" />
            </>
          )}
        </div>
      </div>
      <div className="practice-slider-bottom site-container">
        <button
          type="button"
          data-carousel-toggle
          className="carousel-toggle"
          aria-label={tx(
            slider.playing ? "إيقاف العرض التلقائي" : "تشغيل العرض التلقائي",
          )}
          onClick={() => slider.setPlaying(!slider.playing)}
        >
          {slider.playing ? (
            <Pause aria-hidden="true" />
          ) : (
            <Play aria-hidden="true" />
          )}
        </button>
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
