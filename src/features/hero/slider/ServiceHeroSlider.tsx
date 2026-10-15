import { useRef } from "react";
import { Link } from "react-router-dom";
import { useHeroPresentation, type HeroPresentation } from "./presentation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CTA } from "@/components/shared/ConsultationCTA";
import { SliderCopy } from "./SliderCopy";
import { serviceSlides } from "./slides";
import { useServiceSlider } from "./useServiceSlider";
import "./slider.css";
gsap.registerPlugin(useGSAP);
export function ServiceHeroSlider({
  presentation: previewPresentation,
}: { presentation?: HeroPresentation } = {}) {
  const savedPresentation = useHeroPresentation();
  const presentation = previewPresentation || savedPresentation;
  const host = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slider = useServiceSlider(serviceSlides.length),
    slide = serviceSlides[slider.index];
  useGSAP(
    () => {
      if (slider.reduced) return;
      gsap.fromTo(
        ".service-slide-photo",
        { scale: 1.12, clipPath: "inset(0 100% 0 0)" },
        {
          scale: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.15,
          ease: "power3.inOut",
        },
      );
    },
    {
      scope: host,
      dependencies: [slider.index, slider.reduced],
      revertOnUpdate: true,
    },
  );
  return (
    <section
      ref={host}
      className={`hero-direction practice-slider slider-layout-${presentation.layout} slider-overlay-${presentation.overlay}`}
      aria-roledescription="عرض شرائح"
      aria-label="خدمات المكتب"
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
      onMouseEnter={() => slider.setHovered(true)}
      onMouseLeave={() => slider.setHovered(false)}
      onFocusCapture={() => slider.setFocused(true)}
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
          <div className="practice-slider-actions">
            <CTA light />
            <Link className="text-link" to={slide.link}>
              {slide.cta}
            </Link>
          </div>
        </div>
        <div className="practice-slider-visual">
          <img
            key={slide.image}
            className="service-slide-photo"
            src={slide.image}
            srcSet={`${slide.image.replace(".webp", "-mobile.webp")} 720w, ${slide.image} 1254w`}
            sizes="(max-width: 700px) 100vw, 50vw"
            alt={slide.alt}
            width={1254}
            height={1254}
            fetchPriority="high"
          />
          <div className="service-slide-image-shade" />
        </div>
      </div>
      <div className="practice-slider-bottom site-container">
        <div className="service-slide-tabs" aria-label="اختيار الشريحة">
          {serviceSlides.map((s, i) => (
            <button
              key={s.label}
              aria-label={`الشريحة ${i + 1}: ${s.label}`}
              aria-pressed={i === slider.index}
              onClick={() => slider.go(i)}
            >
              <span dir="ltr">0{i + 1}</span>
              <span>{s.label}</span>
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
          {slide.label}، الشريحة {slider.index + 1} من 3
        </span>
      </div>
    </section>
  );
}
