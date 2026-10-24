import { HeroHeading } from "../HeroCopy";
import type { welcomeSlide } from "./slides";

export function WelcomeSlideCopy({ slide }: { slide: typeof welcomeSlide }) {
  return (
    <>
      <p className="service-slide-label">مرحبًا بكم في مكتب</p>
      <HeroHeading>{slide.title}</HeroHeading>
      <p className="welcome-slide-descriptor">{slide.descriptor}</p>
    </>
  );
}

export function WelcomeSlideVisual() {
  return (
    <div className="welcome-slide-visual">
      <img
        className="welcome-slide-mark"
        src="/brand/v4/mark-beige.svg"
        alt="شعار مكتب عبد الله الشهري"
        width={1000}
        height={850}
        fetchPriority="high"
        draggable={false}
      />
    </div>
  );
}
