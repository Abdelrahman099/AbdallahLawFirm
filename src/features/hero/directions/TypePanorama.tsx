import { useTranslate } from "@/i18n/useTranslate";
import { HeroHeading, HeroPhoto } from "../HeroCopy";
import { CTA } from "@/components/shared/ConsultationCTA";
export function TypePanorama() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-panorama site-container">
      <p className="direction-eyebrow">
        {tx("عبد الله الشهري · للمحاماة والاستشارات القانونية")}
      </p>
      <div className="panorama-title">
        <HeroHeading>
          {tx("وضوحٌ يصنع")}
          <em>{tx("الفرق.")}</em>
        </HeroHeading>
        <div>
          <p>
            {tx("نفهم المسألة.")}
            <br />
            {tx("ونرتّب معك الخطوة التالية.")}
          </p>
          <CTA />
        </div>
      </div>
      <figure>
        <HeroPhoto position="50% 65%" />
        <figcaption>
          {tx("تصوير معماري تصوري · استلهام من الاتزان والضوء")}
        </figcaption>
      </figure>
    </section>
  );
}
