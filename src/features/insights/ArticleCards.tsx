import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { articles } from "@/data/site";
import { articleVisuals } from "./articleVisuals";

import "./insights.css";

export function ArticleCards() {
  const { tx } = useTranslate();

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
                alt={tx(articleVisuals[a.slug].alt)}
                width={1400}
                height={933}
                loading="lazy"
              />
            </div>
            <span className="article-category">{tx(a.category)}</span>
            <h3>{tx(a.title)}</h3>
            <p>{tx(a.excerpt)}</p>
            <span className="text-link">{tx("اقرأ الإرشاد")}</span>
          </Link>
        ))}
    </div>
  );
}
