import { FAQ } from "@/features/faq/FAQAccordion";
import { Link } from "react-router-dom";
export function FAQSection() {
  return (
    <section className="home-faq" aria-labelledby="home-faq-heading">
      <div className="site-container home-faq-grid">
        <div>
          <p className="eyebrow">قبل الحجز</p>
          <h2 id="home-faq-heading">
            ثلاث إجابات
            <br />
            لبداية أسهل.
          </h2>
          <Link to="/faq" className="text-link">
            كل الأسئلة
          </Link>
        </div>
        <FAQ limit={3} />
      </div>
    </section>
  );
}
