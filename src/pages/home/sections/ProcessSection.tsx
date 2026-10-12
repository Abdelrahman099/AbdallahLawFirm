import { process } from "@/data/site";
import { Link } from "react-router-dom";
import { BrandImage } from "@/components/brand/BrandImage";
export function ProcessSection() {
  return (
    <section
      className="home-journey site-container"
      aria-labelledby="journey-heading"
    >
      <div className="home-journey-heading">
        <p className="eyebrow">حجز الاستشارة</p>
        <h2 id="journey-heading">ماذا يحدث بعد طلبك؟</h2>
      </div>
      <div className="home-journey-image">
        <BrandImage asset="preparation" />
      </div>
      <div className="home-journey-copy">
        <div className="home-journey-steps">
          <span className="home-journey-line" aria-hidden="true" />
          {process.map((step, index) => (
            <div className="home-journey-step" key={step.n}>
              <span className="home-journey-point">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/consultation" className="text-link">
          ابدأ طلب الاستشارة
        </Link>
      </div>
    </section>
  );
}
