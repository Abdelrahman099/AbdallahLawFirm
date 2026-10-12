import { HeroCopy, HeroPhoto } from "../HeroCopy";
import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
export function QuietPractice() {
  return (
    <section className="hero-direction direction-practice site-container">
      <div className="practice-main">
        <HeroCopy
          title={
            <>
              موضوعك واضح.
              <br />
              <em>وخطوتك مدروسة.</em>
            </>
          }
        />
        <HeroPhoto position="40% 50%" />
      </div>
      <div className="practice-bottom">
        <span>اختر نقطة البداية</span>
        {[
          ["company-formation", "تأسيس الشركات"],
          ["contracts", "العقود والاستشارات"],
          ["litigation", "التقاضي والمنازعات"],
        ].map(([id, title], i) => (
          <Link key={id} to={"/services/" + id}>
            <small>0{i + 1}</small>
            {title}
            <ArrowUpLeft size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}
