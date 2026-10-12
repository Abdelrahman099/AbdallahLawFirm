import { HeroCopy, HeroPhoto } from "../HeroCopy";
export function OffsetGallery() {
  return (
    <section className="hero-direction direction-offset site-container">
      <HeroCopy
        title={
          <>
            لأعمالك.
            <br />
            <em>رؤية قانونية أوسع.</em>
          </>
        }
        tag="للشركات والمستثمرين والأفراد"
      />
      <div className="offset-gallery">
        <div className="offset-photo offset-one">
          <HeroPhoto position="10% 50%" />
        </div>
        <div className="offset-photo offset-two">
          <HeroPhoto position="85% 50%" />
        </div>
        <span className="offset-label">
          تفاصيل صغيرة.
          <br />
          حضور راسخ.
        </span>
        <i className="offset-line" />
      </div>
    </section>
  );
}
