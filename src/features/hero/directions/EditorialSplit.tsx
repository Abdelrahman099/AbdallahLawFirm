import { useTranslate } from "@/i18n/useTranslate";
import { HeroCopy, HeroPhoto } from "../HeroCopy";
export function EditorialSplit() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-editorial site-container">
      <div className="editorial-title">
        <span>{tx("وضوح يبدأ بالاستماع")}</span>
        <span>{tx("جدة / 2015")}</span>
      </div>
      <div className="editorial-grid">
        <HeroCopy
          title={
            <>
              {tx("قريبون من")}
              <br />
              {tx("موضوعك.")}
              <br />
              <em>{tx("دقيقون في تفاصيله.")}</em>
            </>
          }
        />
        <figure>
          <HeroPhoto position="36% 50%" />
          <figcaption>
            <span>{tx("مساحة لفهم التفاصيل.")}</span>
            <span>{tx("01 — رؤية المكتب")}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
