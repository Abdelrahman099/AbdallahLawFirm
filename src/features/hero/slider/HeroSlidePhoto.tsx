import { useTranslate } from "@/i18n/useTranslate";
import type { HeroSlide } from "./slides";

/** Shared image treatment keeps the introduction and service slides consistent. */
export function HeroSlidePhoto({ slide }: { slide: HeroSlide }) {
  const { tx } = useTranslate();
  const welcome = slide.kind === "welcome";
  return (
    <>
      <img
        className="service-slide-photo"
        src={slide.image}
        srcSet={`${slide.image.replace(".webp", "-mobile.webp")} 720w, ${slide.image} ${welcome ? 1122 : 1254}w`}
        sizes="(max-width:700px) 100vw,50vw"
        alt={tx(slide.alt)}
        width={welcome ? 1122 : 1254}
        height={welcome ? 1402 : 1254}
        fetchPriority="high"
        draggable={false}
      />
      <div className="service-slide-image-shade" />
    </>
  );
}
