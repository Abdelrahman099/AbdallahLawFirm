import { Link } from "react-router-dom";
import { office } from "@/config/office";
import { BrandImage } from "@/components/brand/BrandImage";
import "../firm-hero.css";

export function FirmHero() {
  return (
    <section className="firm-hero" aria-labelledby="office-heading">
      <div className="site-container firm-hero-grid">
        <div className="firm-hero-copy">
          <p className="firm-hero-kicker">عن المكتب</p>
          <h2 id="office-heading">
            {office.name}
          </h2>
          <p className="firm-hero-descriptor">{office.descriptor}</p>
          <div className="firm-hero-about">
            <p className="hero-description">{office.introduction}</p>
            <Link to="/about" className="text-link">
              تعرّف على المكتب
            </Link>
          </div>
          <a className="firm-hero-services text-link" href="#practice-heading">
            استعرض خدماتنا القانونية
          </a>
        </div>
        <figure className="firm-hero-visual"><BrandImage asset="contracts" sizes="(max-width:760px) 100vw, 50vw" /></figure>
      </div>
    </section>
  );
}
