import { useTranslate } from "@/i18n/useTranslate";
import { LegalImageSlider } from "@/features/hero/LegalImageSlider";
import { office } from "@/config/office";
import "../opening-hero.css";

export function OpeningHero() {
  const { tx } = useTranslate();

  return (
    <section
      className="opening-hero hero-direction"
      aria-labelledby="firm-name"
    >
      <LegalImageSlider>
        <div className="opening-hero-shade" aria-hidden="true" />
        <div className="opening-hero-copy site-container">
          <p className="opening-hero-kicker">{tx("مكتب المحامي")}</p>
          <h1 id="firm-name" tabIndex={-1}>
            {tx(office.name)}
          </h1>
          <p className="opening-hero-descriptor">{tx(office.descriptor)}</p>
          <p className="opening-hero-note">
            {tx("للشركات والمستثمرين والأفراد.")}
          </p>
          <a href="#office-heading" className="text-link">
            {tx("تعرّف على المكتب")}
          </a>
        </div>
      </LegalImageSlider>
    </section>
  );
}
