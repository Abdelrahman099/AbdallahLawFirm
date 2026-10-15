import { LegalImageSlider } from "@/features/hero/LegalImageSlider";
import { office } from "@/config/office";
import "../opening-hero.css";

export function OpeningHero() {
  return (
    <section className="opening-hero hero-direction" aria-labelledby="firm-name">
      <LegalImageSlider>
        <div className="opening-hero-shade" aria-hidden="true" />
        <div className="opening-hero-copy site-container">
          <p className="opening-hero-kicker">مكتب المحامي</p>
          <h1 id="firm-name" tabIndex={-1}>{office.name}</h1>
          <p className="opening-hero-descriptor">{office.descriptor}</p>
          <p className="opening-hero-note">للشركات والمستثمرين والأفراد.</p>
          <a href="#office-heading" className="text-link">تعرّف على المكتب</a>
        </div>
      </LegalImageSlider>
    </section>
  );
}
