import { articles } from "@/data/site";
import { articleVisuals } from "./articleVisuals";
import { Link } from "react-router-dom";
import "./insights.css";

export function ArticleCards() {
  return (
    <div className="article-grid">
      {articles.map((a) => (
        <Link
          to={"/insights/" + a.slug}
          className="article-card"
          key={a.slug}
          data-reveal
        >
          <div className="article-photo">
            <img
              src={articleVisuals[a.slug].src}
              alt={articleVisuals[a.slug].alt}
              width={1400}
              height={933}
              loading="lazy"
            />
          </div>
          <span className="article-category">{a.category}</span>
          <h3>{a.title}</h3>
          <p>{a.excerpt}</p>
          <span className="text-link">اقرأ الإرشاد</span>
        </Link>
      ))}
    </div>
  );
}
