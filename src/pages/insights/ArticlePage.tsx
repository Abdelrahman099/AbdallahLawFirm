import { CTA, ConsultationBand, PageIntro } from "@/components/Brand";
import { articles } from "@/data/site";
import { NotFound } from "@/pages/NotFoundPage";
import { Link, useParams } from "react-router-dom";
import { articleVisuals } from "@/features/insights/articleVisuals";
import "@/features/insights/insights.css";
export function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <>
      <div className="site-container breadcrumbs">
        <Link to="/">الرئيسية</Link>
        <span>/</span>
        <Link to="/insights">إرشادات</Link>
      </div>
      <PageIntro
        tag={article.category}
        title={article.title}
        text={article.excerpt}
      />
      <article className="site-container article-body">
        <div className="article-content prose">
          {article.sections.map((s, i) => (
            <section data-reveal key={s.title}>
              <span className="eyebrow" dir="ltr">
                0{i + 1}
              </span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <p className="service-note">
            هذا إرشاد عام للتحضير والتواصل، وليس رأيًا قانونيًا في حالة بعينها.
          </p>
        </div>
        <aside className="article-aside">
          <img
            className="article-aside-photo"
            src={articleVisuals[article.slug].src}
            alt={articleVisuals[article.slug].alt}
            width={1400}
            height={933}
            loading="lazy"
          />
          <h2>
            ابدأ استشارتك
            <br />
            بخطوة واضحة.
          </h2>
          <CTA />
        </aside>
      </article>
      <ConsultationBand />
    </>
  );
}
