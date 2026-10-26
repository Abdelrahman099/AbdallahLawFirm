import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { CTA, ConsultationBand, PageIntro } from "@/components/Brand";
import { articles } from "@/data/site";
import { NotFound } from "@/pages/NotFoundPage";
import { useParams } from "react-router-dom";
import { articleVisuals } from "@/features/insights/articleVisuals";
import "@/features/insights/insights.css";
export function Article() {
  const { tx } = useTranslate();

  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <>
      <div className="site-container breadcrumbs">
        <Link to="/">{tx("الرئيسية")}</Link>
        <span>/</span>
        <Link to="/insights">{tx("إرشادات")}</Link>
      </div>
      <PageIntro
        tag={tx(article.category)}
        title={tx(article.title)}
        text={tx(article.excerpt)}
      />
      <article className="site-container article-body">
        <div className="article-content prose">
          {article.sections.map((s, i) => (
              <section data-reveal key={s.title}>
                <span className="eyebrow" dir="ltr">
                  0{tx(i + 1)}
                </span>
                <h2>{tx(s.title)}</h2>
                <p>{tx(s.text)}</p>
              </section>
            ))}
          <p className="service-note">
            {tx(
              "هذا إرشاد عام للتحضير والتواصل، وليس رأيًا قانونيًا في حالة بعينها.",
            )}
          </p>
        </div>
        <aside className="article-aside">
          <img
            className="article-aside-photo"
            src={articleVisuals[article.slug].src}
            alt={tx(articleVisuals[article.slug].alt)}
            width={1400}
            height={933}
            loading="lazy"
          />
          <h2>
            {tx("ابدأ استشارتك")}
            <br />
            {tx("بخطوة واضحة.")}
          </h2>
          <CTA />
        </aside>
      </article>
      <ConsultationBand />
    </>
  );
}
