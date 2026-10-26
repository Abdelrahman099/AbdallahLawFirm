import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { FAQ } from "@/features/faq/FAQAccordion";

export function FAQSection() {
  const { tx } = useTranslate();

  return (
    <section className="home-faq" aria-labelledby="home-faq-heading">
      <div className="site-container home-faq-grid">
        <div>
          <p className="eyebrow">{tx("قبل الحجز")}</p>
          <h2 id="home-faq-heading">
            {tx("ثلاث إجابات")}
            <br />
            {tx("لبداية أسهل.")}
          </h2>
          <Link to="/faq" className="text-link">
            {tx("كل الأسئلة")}
          </Link>
        </div>
        <FAQ limit={3} />
      </div>
    </section>
  );
}
