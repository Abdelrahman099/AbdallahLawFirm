import { LocalizedLink as Link } from "@/i18n/links";
import { CTA } from "@/components/shared/ConsultationCTA";
import { useTranslate } from "@/i18n/useTranslate";
import { HeroHeading } from "../HeroCopy";
import type { WelcomeDirection } from "./welcome-directions";

export function WelcomeSlideCopy() {
  const { tx } = useTranslate();

  return (
    <>
      <p className="welcome-greeting">{tx("مرحبًا بكم")}</p>
      <HeroHeading>{tx("المحامي عبد الله الشهري")}</HeroHeading>
    </>
  );
}
export function WelcomeSlideVisual({
  direction = "silk",
}: {
  direction?: WelcomeDirection;
}) {
  const { tx } = useTranslate();

  return (
    <div className="welcome-slide-visual">
      <img
        className="welcome-slide-mark"
        src={`/brand/v4/mark-${direction === "letter" ? "primary" : "beige"}.svg`}
        alt={tx("شعار مكتب عبد الله الشهري")}
        width={1000}
        height={850}
        fetchPriority="high"
        draggable={false}
      />
      <div className="welcome-slide-actions">
        <CTA light={direction !== "letter"}>{tx("احجز استشارتك")}</CTA>
        <Link className="text-link" to="/about">
          {tx("تعرّف على المكتب")}
        </Link>
      </div>
    </div>
  );
}
