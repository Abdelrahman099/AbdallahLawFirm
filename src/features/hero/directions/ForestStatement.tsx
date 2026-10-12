import { HeroHeading } from "../HeroCopy";
import { CTA } from "@/components/shared/ConsultationCTA";
export function ForestStatement() {
  return (
    <section className="hero-direction direction-statement">
      <div className="site-container">
        <div className="statement-top">
          <span>مكتب المحامي عبد الله الشهري</span>
          <span>جدة · المملكة العربية السعودية</span>
        </div>
        <HeroHeading>
          نستمع.
          <br />
          نفهم.
          <br />
          <em>نوضّح.</em>
        </HeroHeading>
        <div className="statement-bottom">
          <p>
            مشورة قانونية تبدأ بفهم احتياجك.
            <br />
            للشركات والمستثمرين والأفراد.
          </p>
          <CTA light />
          <span>
            وضوح قانوني.
            <br />
            قرار متزن.
          </span>
        </div>
      </div>
    </section>
  );
}
