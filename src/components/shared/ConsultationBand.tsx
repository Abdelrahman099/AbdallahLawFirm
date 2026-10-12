import { CTA } from "@/components/shared/ConsultationCTA";
import "./consultation-band.css";
import { BrandImage } from "@/components/brand/BrandImage";
export function ConsultationBand() {
  return (
    <section
      className="consultation-invitation site-container"
      aria-labelledby="consultation-invitation-title"
    >
      <div className="consultation-invitation-copy">
        <p className="eyebrow">موعد لفهم موضوعك</p>
        <h2 id="consultation-invitation-title">ابدأ بالموضوع الذي يشغلك.</h2>
        <p>اكتب ملخصًا، واختر طريقة التواصل المناسبة لك.</p>
        <CTA light />
        <span>الاستشارة الأولى مجانية بحسب نطاقها لدى المكتب.</span>
      </div>
      <figure>
        <BrandImage asset="consultation" />
      </figure>
    </section>
  );
}
