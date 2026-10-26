import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";

import { office } from "@/config/office";
import { BrandImage } from "@/components/brand/BrandImage";
import "../firm-hero.css";

export function FirmHero() {
  const { tx } = useTranslate();

  return (
    <section className="firm-hero" aria-labelledby="office-heading">
      <div className="site-container firm-hero-grid">
        <div className="firm-hero-copy">
          <p className="firm-hero-kicker">{tx("عن المكتب")}</p>
          <h2 id="office-heading">{tx(office.name)}</h2>
          <p className="firm-hero-descriptor">{tx(office.descriptor)}</p>
          <div className="firm-hero-about">
            <p className="hero-description">{tx(office.introduction)}</p>
            <Link to="/about" className="text-link">
              {tx("تعرّف على المكتب")}
            </Link>
          </div>
          <a className="firm-hero-services text-link" href="#practice-heading">
            {tx("استعرض خدماتنا القانونية")}
          </a>
        </div>
        <figure className="firm-hero-visual">
          <BrandImage asset="contracts" sizes="(max-width:760px) 100vw, 50vw" />
        </figure>
      </div>
    </section>
  );
}
