import { HeroCopy, HeroPhoto } from "../HeroCopy";
export function EditorialSplit() {
  return (
    <section className="hero-direction direction-editorial site-container">
      <div className="editorial-title">
        <span>وضوح يبدأ بالاستماع</span>
        <span>جدة / 2015</span>
      </div>
      <div className="editorial-grid">
        <HeroCopy
          title={
            <>
              قريبون من
              <br />
              موضوعك.
              <br />
              <em>دقيقون في تفاصيله.</em>
            </>
          }
        />
        <figure>
          <HeroPhoto position="36% 50%" />
          <figcaption>
            <span>مساحة لفهم التفاصيل.</span>
            <span>01 — رؤية المكتب</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
