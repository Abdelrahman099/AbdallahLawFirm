import { ServiceGroupGrid } from "@/features/services/ServiceGroupGrid";
import { Link } from "react-router-dom";
export function PracticeAreasSection() {
  return (
    <section
      className="home-practice site-container"
      aria-labelledby="practice-heading"
    >
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">مجالات العمل</p>
          <h2 id="practice-heading">خدماتنا القانونية</h2>
          <p>ثلاثة مجالات تجمع خدمات المكتب للشركات والأفراد.</p>
        </div>
        <Link className="text-link" to="/services">
          دليل الخدمات
        </Link>
      </div>
      <ServiceGroupGrid />
    </section>
  );
}
