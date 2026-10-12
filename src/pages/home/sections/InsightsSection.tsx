import { articles } from "@/data/articles";
import { Link } from "react-router-dom";
import { BrandImage } from "@/components/brand/BrandImage";
export function InsightsSection() {
  return (
    <section
      className="home-reading site-container"
      aria-labelledby="reading-heading"
    >
      <div className="home-section-heading">
        <div>
          <p className="eyebrow">قبل الاستشارة</p>
          <h2 id="reading-heading">حضّر موضوعك، ووفر وقتك.</h2>
        </div>
        <Link to="/insights" className="text-link">
          كل الإرشادات
        </Link>
      </div>
      <div className="home-reading-grid">
        <Link
          to={`/insights/${articles[0].slug}`}
          className="home-reading-feature"
        >
          <BrandImage asset="prepareGuide" />
          <div>
            <span>{articles[0].category}</span>
            <h3>{articles[0].title}</h3>
            <span className="text-link">اقرأ الإرشاد</span>
          </div>
        </Link>
        <div className="home-reading-list">
          {articles.slice(1).map((article, i) => (
            <Link key={article.slug} to={`/insights/${article.slug}`}>
              <BrandImage
                asset={i === 0 ? "businessGuide" : "organizeGuide"}
                sizes="110px"
              />
              <div>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <span className="text-link">اقرأ الإرشاد</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
