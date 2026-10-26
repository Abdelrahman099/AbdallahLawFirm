import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { ServiceGroupGrid } from "@/features/services/ServiceGroupGrid";

export function PracticeAreasSection() {
  const { tx } = useTranslate();

  return (
    <section
      className="home-practice site-container"
      aria-labelledby="practice-heading"
    >
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">{tx("مجالات العمل")}</p>
          <h2 id="practice-heading">{tx("خدماتنا القانونية")}</h2>
          <p>{tx("ثلاثة مجالات تجمع خدمات المكتب للشركات والأفراد.")}</p>
        </div>
        <Link className="text-link" to="/services">
          {tx("دليل الخدمات")}
        </Link>
      </div>
      <ServiceGroupGrid />
    </section>
  );
}
