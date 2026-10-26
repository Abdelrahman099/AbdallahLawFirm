import { useTranslate } from "@/i18n/useTranslate";
import { CTA } from "@/components/shared/ConsultationCTA";
import "./consultation-band.css";
import { BrandImage } from "@/components/brand/BrandImage";
export function ConsultationBand() {
  const { tx } = useTranslate();

  return (
    <section
      className="consultation-invitation site-container"
      aria-labelledby="consultation-invitation-title"
    >
      <div className="consultation-invitation-copy">
        <p className="eyebrow">{tx("موعد لفهم موضوعك")}</p>
        <h2 id="consultation-invitation-title">
          {tx("ابدأ بالموضوع الذي يشغلك.")}
        </h2>
        <p>{tx("اكتب ملخصًا، واختر طريقة التواصل المناسبة لك.")}</p>
        <CTA light />
        <span>{tx("الاستشارة الأولى مجانية بحسب نطاقها لدى المكتب.")}</span>
      </div>
      <figure>
        <BrandImage asset="consultation" />
      </figure>
    </section>
  );
}
