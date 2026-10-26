import { useTranslate } from "@/i18n/useTranslate";
import { HeroHeading } from "../HeroCopy";
import { CTA } from "@/components/shared/ConsultationCTA";
export function ForestStatement() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-statement">
      <div className="site-container">
        <div className="statement-top">
          <span>{tx("مكتب المحامي عبد الله الشهري")}</span>
          <span>{tx("جدة · المملكة العربية السعودية")}</span>
        </div>
        <HeroHeading>
          {tx("نستمع.")}
          <br />
          {tx("نفهم.")}
          <br />
          <em>{tx("نوضّح.")}</em>
        </HeroHeading>
        <div className="statement-bottom">
          <p>
            {tx("مشورة قانونية تبدأ بفهم احتياجك.")}
            <br />
            {tx("للشركات والمستثمرين والأفراد.")}
          </p>
          <CTA light />
          <span>
            {tx("وضوح قانوني.")}
            <br />
            {tx("قرار متزن.")}
          </span>
        </div>
      </div>
    </section>
  );
}
