import { PracticeExplorer } from "./PracticeExplorer";
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
          <h2 id="practice-heading">ما موضوع استشارتك؟</h2>
          <p>ابدأ بالمجال الأقرب لاحتياجك، وتعرّف على ما يشمله.</p>
        </div>
        <Link className="text-link" to="/services">
          دليل الخدمات
        </Link>
      </div>
      <PracticeExplorer />
    </section>
  );
}
