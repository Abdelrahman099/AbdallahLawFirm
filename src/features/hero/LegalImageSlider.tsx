import { useTranslate } from "@/i18n/useTranslate";
import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandImage, type BrandImageName } from "@/components/brand/BrandImage";

const slides: { asset: BrandImageName; label: string }[] = [
  { asset: "justice", label: "التقاضي والتمثيل القانوني" },
  { asset: "company", label: "الشركات والاستثمار" },
  { asset: "contractReview", label: "العقود والتوثيق" },
];

export function LegalImageSlider({ children }: { children?: ReactNode }) {
  const { tx, t } = useTranslate();

  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const go = (step: number) =>
    setIndex((current) => (current + step + slides.length) % slides.length);
  return (
    <figure
      className="firm-hero-visual"
      aria-label={tx("مجالات عمل المكتب")}
      aria-roledescription={tx("عرض شرائح")}
      onPointerDown={(event) => {
        if ((event.target as Element).closest("button, a")) return;
        pointer.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        const start = pointer.current;
        pointer.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy))
          go(dx > 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        pointer.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          go(event.key === "ArrowLeft" ? 1 : -1);
        }
      }}
    >
      <div className="firm-slider-stage">
        <AnimatePresence initial={false}>
          <motion.div
            className="firm-slide"
            key={slides[index].asset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.45 }}
          >
            <BrandImage
              asset={slides[index].asset}
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="(max-width: 760px) 100vw, 50vw"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {tx(children)}
      <figcaption className="firm-slider-caption">
        <span aria-live="polite" aria-atomic="true">
          {tx(slides[index].label)}
        </span>
        <div className="firm-slider-controls" aria-label={tx("اختيار الصورة")}>
          {slides.map((slide, slideIndex) => (
              <button
                type="button"
                key={slide.asset}
                aria-label={tx(
                  t("الشريحة {{v0}}: {{v1}}", {
                    v0: tx(slideIndex + 1),
                    v1: tx(slide.label),
                  }),
                )}
                aria-pressed={index === slideIndex}
                onClick={() => setIndex(slideIndex)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
        </div>
      </figcaption>
    </figure>
  );
}
