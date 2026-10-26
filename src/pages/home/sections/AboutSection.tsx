import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";

import { BrandImage } from "@/components/brand/BrandImage";
export function AboutSection() {
  const { tx } = useTranslate();

  return (
    <section className="home-office" aria-labelledby="office-heading">
      <div className="site-container home-office-composition">
        <div className="home-office-heading">
          <p className="eyebrow">{tx("عن المكتب")}</p>
          <h2 id="office-heading">
            <span className="office-title-line">{tx("فهمٌ أعمق.")}</span>
            <span className="office-title-line">{tx("خطوة أوضح.")}</span>
          </h2>
          <span className="office-rule" aria-hidden="true" />
        </div>
        <figure className="home-office-panorama">
          <BrandImage asset="justice" sizes="(max-width: 760px) 100vw, 50vw" />
        </figure>
        <div className="home-office-story">
          <div>
            <p>
              {tx(
                "مكتب عبد الله الشهري للمحاماة والاستشارات القانونية. نفهم موضوعك، ونوضح نطاق الخدمة قبل الاتفاق على العمل.",
              )}
            </p>
            <dl className="home-office-facts">
              <div>
                <dt>{tx("منذ")}</dt>
                <dd>2015</dd>
              </div>
              <div>
                <dt>{tx("التواصل")}</dt>
                <dd>{tx("بالمكتب وعن بُعد")}</dd>
              </div>
            </dl>
            <Link to="/about" className="text-link">
              {tx("تعرّف على المكتب")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
