import {
  AnimatePresence,
  motion,
  useAnimate,
  useReducedMotion,
} from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BrandImage, type BrandImageName } from "@/components/brand/BrandImage";
import { office } from "@/config/office";
import { serviceGroups } from "@/data/serviceGroups";
import { serviceSlides } from "../slider/slides";

export const identitySlides = serviceSlides.map((slide, index) => ({
  ...slide,
  asset: (["company", "contractReview", "litigation"] as BrandImageName[])[
    index
  ],
  group: serviceGroups.find((group) => group.title === slide.label)!,
}));
export type IdentitySlide = (typeof identitySlides)[number];

export function IdentityLockup({
  light = true,
  markOnly = false,
}: {
  light?: boolean;
  markOnly?: boolean;
}) {
  return (
    <div className="ih-identity" data-entrance>
      <img
        className="ih-emblem"
        src={`/brand/v4/mark-${light ? "beige" : "primary"}.svg`}
        alt={markOnly ? office.fullName : ""}
        width="120"
        height="102"
      />
      {!markOnly && (
        <div className="ih-wordmark">
          <p>{office.name}</p>
          <span>{office.descriptor}</span>
        </div>
      )}
    </div>
  );
}

export function IdentityMessage({
  slide,
  preview = false,
}: {
  slide: IdentitySlide;
  preview?: boolean;
}) {
  const Heading = preview ? "h2" : "h1";
  const reduced = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    if (reduced || !scope.current) return;
    const animation = animate(
      scope.current,
      { opacity: [0, 1] },
      { duration: 0.35 },
    );
    return () => animation.stop();
  }, [animate, scope, slide.asset, reduced]);
  return (
    <div className="ih-message" data-entrance>
      <div ref={scope} key={slide.asset}>
        <p className="ih-eyebrow">{slide.label}</p>
        <Heading>
          {slide.title}
          <span>{slide.accent}</span>
        </Heading>
        <p className="ih-description">{slide.description}</p>
        <Link className="ih-link" to={slide.link}>
          {slide.cta}
          <span className="ih-link-line" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function IdentityPhoto({
  slide,
  className = "",
}: {
  slide: IdentitySlide;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={`ih-photo ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.asset}
          className="ih-photo-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        >
          <BrandImage
            asset={slide.asset}
            loading="eager"
            sizes="(max-width: 760px) 100vw, 65vw"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function IdentitySlideControls({
  index,
  onSelect,
  chapters = false,
}: {
  index: number;
  onSelect: (index: number) => void;
  chapters?: boolean;
}) {
  return (
    <div
      className={`ih-slide-controls ${chapters ? "ih-chapter-controls" : ""}`}
      role="group"
      aria-label="اختيار مجال العمل"
    >
      {identitySlides.map((slide, i) => (
        <button
          key={slide.asset}
          type="button"
          aria-pressed={i === index}
          aria-label={`عرض ${slide.label}`}
          onClick={() => onSelect(i)}
        >
          {chapters ? (
            <>
              <span className="ih-chapter-number" aria-hidden="true">
                0{i + 1}
              </span>
              <span>{slide.label}</span>
            </>
          ) : (
            <span className="ih-dot" aria-hidden="true" />
          )}
        </button>
      ))}
      {!chapters && (
        <span className="ih-slide-count" aria-hidden="true">
          0{index + 1} / 03
        </span>
      )}
    </div>
  );
}

export type IdentityLayoutProps = {
  slide: IdentitySlide;
  index: number;
  onSelect: (index: number) => void;
  preview: boolean;
};
