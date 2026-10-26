import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import {
  Arrow,
  ConsultationBand,
  PageIntro,
  SectionIntro,
} from "@/components/Brand";
import { OfficeMap, officeMapLink } from "@/components/shared/OfficeMap";
import { office } from "@/data/site";
import { MapPin } from "lucide-react";

export function About() {
  const { tx } = useTranslate();

  return (
    <>
      <PageIntro
        tag={tx("عن المكتب")}
        title={tx("الوضوح في المشورة. والعناية في التعامل.")}
        text={tx(
          "مكتب محاماة في جدة، يخدم الشركات والمستثمرين والأفراد في أنحاء المملكة العربية السعودية.",
        )}
      />
      <section className="site-container about-detail">
        <div className="founder-placeholder" data-reveal>
          <img
            src="/brand/v4/mark-primary.svg"
            alt=""
            width="240"
            height="204"
          />
          <h2>{tx(office.name)}</h2>
          <p>{tx("المحامي المؤسس")}</p>
          <span className="placeholder-label">
            {tx("صورة المحامي تُضاف بعد توفيرها")}
          </span>
        </div>
        <div className="prose" data-reveal>
          <p className="eyebrow">{tx("منذ 2015")}</p>
          <h2>{tx("اسمٌ يرتبط بالمسؤولية.")}</h2>
          <p>
            {tx(
              "تأسس مكتب المحامي عبد الله الشهري للمحاماة والاستشارات القانونية عام 2015 في مدينة جدة. يقدم المكتب خدماته للشركات والأفراد، مع اهتمام خاص باحتياجات الشركات في أنحاء المملكة.",
            )}
          </p>
          <p>
            {tx(
              "تشمل مجالات العمل تأسيس الشركات المحلية والأجنبية، والاستثمار، والتقاضي، والتحكيم، والقضايا العمالية والعقارية والأحوال الشخصية والمواريث. يبدأ التعامل بفهم احتياج العميل، ثم تحديد نطاق الخدمة والخطوات المناسبة.",
            )}
          </p>
          <p>
            {tx(
              "نسترشد بأمانة المشورة، وموضوعية التعامل، وأخلاق مهنة المحاماة، والاهتمام بسرية معلومات العملاء.",
            )}
          </p>
        </div>
      </section>
      <section className="section site-container">
        <SectionIntro
          tag={tx("قيم العمل")}
          title={tx("ما يحكم طريقة تعاملنا.")}
        />
        <div className="values-grid">
          {[
              ["الوضوح", "شرح نطاق العمل والخطوة التالية بلغة مفهومة."],
              ["الأمانة", "مشورة موضوعية تراعي احتياج العميل وطبيعة الموضوع."],
              ["العناية", "الاهتمام بالتفاصيل والمستندات وسرية التعامل."],
            ].map(([t, d], i) => (
              <div data-reveal key={t}>
                <span dir="ltr">0{tx(i + 1)}</span>
                <h3>{tx(t)}</h3>
                <p>{tx(d)}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="site-container office-location">
        <OfficeMap>
          <MapPin size={28} strokeWidth={1.3} />
          <h2>{tx("مقر المكتب")}</h2>
          <p>{tx(office.address)}</p>
          <div className="office-map-links">
            <a
              className="text-link"
              href={officeMapLink}
              target="_blank"
              rel="noreferrer"
            >
              {tx("افتح في خرائط Google")}
              <Arrow />
            </a>
            <Link className="text-link" to="/contact">
              {tx("الوصول والتواصل")}
              <Arrow />
            </Link>
          </div>
        </OfficeMap>
      </section>
      <ConsultationBand />
    </>
  );
}
