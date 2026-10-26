import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { CTA, SectionIntro } from "@/components/Brand";
import { PracticeCardGrid } from "@/features/services/PracticeCardGrid";
import { getPracticeVisual } from "@/features/services/practiceVisuals";
import { services } from "@/data/site";
import { NotFound } from "@/pages/NotFoundPage";
import { Check } from "lucide-react";
import { useParams } from "react-router-dom";
export function ServiceDetail() {
  const { tx } = useTranslate();

  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;
  const photo = getPracticeVisual(service.slug);
  const related = services
    .filter(
      (s) =>
        s.slug !== slug &&
        (s.audience === service.audience || s.audience === "both"),
    )
    .slice(0, 3);
  return (
    <>
      <div className="site-container breadcrumbs">
        <Link to="/">{tx("الرئيسية")}</Link>
        <span>/</span>
        <Link to="/services">{tx("الخدمات")}</Link>
        <span>/</span>
        <span>{tx(service.title)}</span>
      </div>
      <section className="site-container service-hero practice-detail-hero">
        <div>
          <p className="eyebrow">
            {tx(
              service.audience === "business"
                ? "للأعمال والاستثمار"
                : "للأفراد والمنشآت",
            )}
          </p>
          <h1 tabIndex={-1}>{tx(service.title)}</h1>
          <p className="intro-text">{tx(service.intro)}</p>
          <CTA to={"/consultation?service=" + service.slug} />
        </div>
        <figure className="practice-detail-photo">
          <img
            src={photo.src}
            srcSet={`${photo.mobile} 720w, ${photo.src} 1254w`}
            sizes="(max-width: 760px) 100vw, 50vw"
            alt={tx(photo.alt)}
            style={{ objectPosition: photo.position }}
            width={1400}
            height={933}
          />
          <figcaption>{tx("صورة توضيحية للمجال")}</figcaption>
        </figure>
      </section>
      <section className="site-container service-content">
        <div className="prose">
          <div data-reveal>
            <h2>{tx("لمن هذه الخدمة؟")}</h2>
            <p>{tx(service.forWhom)}</p>
          </div>
          <div data-reveal>
            <h2>{tx("كيف يمكننا مساعدتك؟")}</h2>
            <ul className="check-list">
              {service.includes.map((t) => (
                  <li key={t}>
                    <Check size={18} />
                    {tx(t)}
                  </li>
                ))}
            </ul>
          </div>
          <div data-reveal>
            <h2>{tx(service.question)}</h2>
            <p>{tx(service.answer)}</p>
          </div>
          <div className="service-note">
            <p>
              {tx(
                "يتحدد نطاق العمل والأتعاب بعد دراسة موضوعك والاتفاق مع المكتب. الاستشارة أو التمثيل لا يتضمنان ضمان نتيجة.",
              )}
            </p>
          </div>
        </div>
        <aside className="prepare-card practice-prepare">
          <span className="eyebrow">{tx("قبل الاستشارة")}</span>
          <h2>{tx("جهّز هذه المعلومات.")}</h2>
          <ul>{service.prepare.map((t) => <li key={t}>{tx(t)}</li>)}</ul>
          <p>
            {tx("ملخص عام يكفي للبداية؛ لا ترسل معلومات حساسة أو مستندات هنا.")}
          </p>
        </aside>
      </section>
      {tx(
        related.length > 0 && (
          <section className="section site-container">
            <SectionIntro
              tag={tx("قد يهمك أيضًا")}
              title={tx("مجالات مرتبطة.")}
            />
            <PracticeCardGrid items={related} />
          </section>
        ),
      )}
    </>
  );
}
