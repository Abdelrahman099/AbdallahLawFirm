import {
  Arrow,
  ConsultationBand,
  PageIntro,
  SectionIntro,
} from "@/components/Brand";
import { office } from "@/data/site";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <>
      <PageIntro
        tag="عن المكتب"
        title="الوضوح في المشورة. والعناية في التعامل."
        text="مكتب محاماة في جدة، يخدم الشركات والمستثمرين والأفراد في أنحاء المملكة العربية السعودية."
      />
      <section className="site-container about-detail">
        <div className="founder-placeholder" data-reveal>
          <img src="/brand/v4/mark-primary.svg" alt="" width="240" height="204" />
          <h2>{office.name}</h2>
          <p>المحامي المؤسس</p>
          <span className="placeholder-label">
            صورة المحامي تُضاف بعد توفيرها
          </span>
        </div>
        <div className="prose" data-reveal>
          <p className="eyebrow">منذ 2015</p>
          <h2>اسمٌ يرتبط بالمسؤولية.</h2>
          <p>
            تأسس مكتب المحامي عبد الله الشهري للمحاماة والاستشارات القانونية عام
            2015 في مدينة جدة. يقدم المكتب خدماته للشركات والأفراد، مع اهتمام
            خاص باحتياجات الشركات في أنحاء المملكة.
          </p>
          <p>
            تشمل مجالات العمل تأسيس الشركات المحلية والأجنبية، والاستثمار،
            والتقاضي، والتحكيم، والقضايا العمالية والعقارية والأحوال الشخصية
            والتركات. يبدأ التعامل بفهم احتياج العميل، ثم تحديد نطاق الخدمة
            والخطوات المناسبة.
          </p>
          <p>
            نسترشد بأمانة المشورة، وموضوعية التعامل، وأخلاق مهنة المحاماة،
            والاهتمام بسرية معلومات العملاء.
          </p>
        </div>
      </section>
      <section className="section site-container">
        <SectionIntro tag="قيم العمل" title="ما يحكم طريقة تعاملنا." />
        <div className="values-grid">
          {[
            ["الوضوح", "شرح نطاق العمل والخطوة التالية بلغة مفهومة."],
            ["الأمانة", "مشورة موضوعية تراعي احتياج العميل وطبيعة الموضوع."],
            ["العناية", "الاهتمام بالتفاصيل والمستندات وسرية التعامل."],
          ].map(([t, d], i) => (
            <div data-reveal key={t}>
              <span dir="ltr">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="site-container office-location" data-reveal>
        <MapPin size={32} strokeWidth={1.2} />
        <div>
          <h2>مقر المكتب</h2>
          <p>{office.address}</p>
        </div>
        <Link className="text-link" to="/contact">
          الوصول والتواصل <Arrow />
        </Link>
      </section>
      <ConsultationBand />
    </>
  );
}
