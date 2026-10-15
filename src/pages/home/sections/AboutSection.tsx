import { Link } from "react-router-dom";
import { BrandImage } from "@/components/brand/BrandImage";
export function AboutSection() {
  return (
    <section className="home-office" aria-labelledby="office-heading">
      <div className="site-container home-office-composition">
        <div className="home-office-heading">
          <p className="eyebrow">عن المكتب</p>
          <h2 id="office-heading">
            <span className="office-title-line">فهمٌ أعمق.</span>
            <span className="office-title-line">خطوة أوضح.</span>
          </h2>
          <span className="office-rule" aria-hidden="true" />
        </div>
        <figure className="home-office-panorama">
          <BrandImage asset="justice" sizes="(max-width: 760px) 100vw, 50vw" />
        </figure>
        <div className="home-office-story">
          <div>
            <p>
              مكتب عبد الله الشهري للمحاماة والاستشارات القانونية. نفهم موضوعك، ونوضح
              نطاق الخدمة قبل الاتفاق على العمل.
            </p>
            <dl className="home-office-facts">
              <div>
                <dt>منذ</dt>
                <dd>2015</dd>
              </div>
              <div>
                <dt>التواصل</dt>
                <dd>بالمكتب وعن بُعد</dd>
              </div>
            </dl>
            <Link to="/about" className="text-link">
              تعرّف على المكتب
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
