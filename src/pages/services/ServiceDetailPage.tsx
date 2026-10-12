import { CTA, SectionIntro } from "@/components/Brand";
import { PracticeCardGrid } from "@/features/services/PracticeCardGrid";
import { getPracticeVisual } from "@/features/services/practiceVisuals";
import { services } from "@/data/site";
import { NotFound } from "@/pages/NotFoundPage";
import { Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
export function ServiceDetail() {
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
        <Link to="/">الرئيسية</Link>
        <span>/</span>
        <Link to="/services">الخدمات</Link>
        <span>/</span>
        <span>{service.title}</span>
      </div>
      <section className="site-container service-hero practice-detail-hero">
        <div>
          <p className="eyebrow">
            {service.audience === "business"
              ? "للأعمال والاستثمار"
              : "للأفراد والمنشآت"}
          </p>
          <h1 tabIndex={-1}>{service.title}</h1>
          <p className="intro-text">{service.intro}</p>
          <CTA to={"/consultation?service=" + service.slug} />
        </div>
        <figure className="practice-detail-photo">
          <img
            src={photo.src}
            srcSet={`${photo.mobile} 720w, ${photo.src} 1254w`}
            sizes="(max-width: 760px) 100vw, 50vw"
            alt={photo.alt}
            style={{ objectPosition: photo.position }}
            width={1400}
            height={933}
          />
          <figcaption>صورة توضيحية للمجال</figcaption>
        </figure>
      </section>
      <section className="site-container service-content">
        <div className="prose">
          <div data-reveal>
            <h2>لمن هذه الخدمة؟</h2>
            <p>{service.forWhom}</p>
          </div>
          <div data-reveal>
            <h2>كيف يمكننا مساعدتك؟</h2>
            <ul className="check-list">
              {service.includes.map((t) => (
                <li key={t}>
                  <Check size={18} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <h2>{service.question}</h2>
            <p>{service.answer}</p>
          </div>
          <div className="service-note">
            <p>
              يتحدد نطاق العمل والأتعاب بعد دراسة موضوعك والاتفاق مع المكتب.
              الاستشارة أو التمثيل لا يتضمنان ضمان نتيجة.
            </p>
          </div>
        </div>
        <aside className="prepare-card practice-prepare">
          <span className="eyebrow">قبل الاستشارة</span>
          <h2>جهّز هذه المعلومات.</h2>
          <ul>
            {service.prepare.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p>ملخص عام يكفي للبداية؛ لا ترسل معلومات حساسة أو مستندات هنا.</p>
          <CTA to={"/consultation?service=" + service.slug} />
        </aside>
      </section>
      {related.length > 0 && (
        <section className="section site-container">
          <SectionIntro tag="قد يهمك أيضًا" title="مجالات مرتبطة." />
          <PracticeCardGrid items={related} />
        </section>
      )}
    </>
  );
}
