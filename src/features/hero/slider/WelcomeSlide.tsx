import { useTranslate } from "@/i18n/useTranslate";
import { HeroHeading } from "../HeroCopy";
import type { WelcomeDirection } from "./welcome-directions";

export function WelcomeSlideCopy({ photo = false }: { photo?: boolean }) {
  const { tx } = useTranslate();

  return (
    <>
      {photo && <p className="welcome-photo-greeting">{tx("مرحبًا بكم")}</p>}
      {photo && (
        <img
          className="welcome-signature-mark"
          src="/brand/v4/mark-beige.svg"
          alt={tx("شعار مكتب عبد الله الشهري")}
          width={1000}
          height={850}
          draggable={false}
        />
      )}
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
    </div>
  );
}
