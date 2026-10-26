import { useTranslate } from "@/i18n/useTranslate";
import { HeroCopy, HeroPhoto } from "../HeroCopy";
export function OffsetGallery() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-offset site-container">
      <HeroCopy
        title={
          <>
            {tx("لأعمالك.")}
            <br />
            <em>{tx("رؤية قانونية أوسع.")}</em>
          </>
        }
        tag={tx("للشركات والمستثمرين والأفراد")}
      />
      <div className="offset-gallery">
        <div className="offset-photo offset-one">
          <HeroPhoto position="10% 50%" />
        </div>
        <div className="offset-photo offset-two">
          <HeroPhoto position="85% 50%" />
        </div>
        <span className="offset-label">
          {tx("تفاصيل صغيرة.")}
          <br />
          {tx("حضور راسخ.")}
        </span>
        <i className="offset-line" />
      </div>
    </section>
  );
}
