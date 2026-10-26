import { useTranslate } from "@/i18n/useTranslate";
import type { HeroSlide } from "./slides";

/** Welcome uses an art-directed desktop photograph; service slides keep their own crops. */
export function HeroSlidePhoto({ slide }: { slide: HeroSlide }) {
  const { tx } = useTranslate();
  const welcome = slide.kind === "welcome";
  const photo = (
    <img
      className="service-slide-photo"
      src={slide.image}
      srcSet={`${slide.image.replace(".webp", "-mobile.webp")} 720w, ${slide.image} ${welcome ? 1122 : 1254}w`}
      sizes={welcome ? "100vw" : "(max-width:700px) 100vw,50vw"}
      alt={tx(slide.alt)}
      width={welcome ? 1122 : 1254}
      height={welcome ? 1402 : 1254}
      fetchPriority="high"
      draggable={false}
    />
  );
  return (
    <>
      {welcome ? (
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="/images/brand-welcome-justice-desktop-v2.webp"
            type="image/webp"
          />
          {photo}
        </picture>
      ) : (
        photo
      )}
      <div className="service-slide-image-shade" />
    </>
  );
}
