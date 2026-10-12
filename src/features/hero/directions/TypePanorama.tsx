import { HeroHeading, HeroPhoto } from "../HeroCopy";
import { CTA } from "@/components/shared/ConsultationCTA";
export function TypePanorama() {
  return (
    <section className="hero-direction direction-panorama site-container">
      <p className="direction-eyebrow">
        عبد الله الشهري · للمحاماة والاستشارات القانونية
      </p>
      <div className="panorama-title">
        <HeroHeading>
          وضوحٌ يصنع <em>الفرق.</em>
        </HeroHeading>
        <div>
          <p>
            نفهم المسألة.
            <br />
            ونرتّب معك الخطوة التالية.
          </p>
          <CTA />
        </div>
      </div>
      <figure>
        <HeroPhoto position="50% 65%" />
        <figcaption>تصوير معماري تصوري · استلهام من الاتزان والضوء</figcaption>
      </figure>
    </section>
  );
}
