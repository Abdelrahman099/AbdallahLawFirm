import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CTA } from "@/components/shared/ConsultationCTA";
import { Arrow } from "@/components/brand/Arrow";
export const HeroPreviewContext = createContext(false);
export function HeroHeading({ children }: { children: ReactNode }) {
  const preview = useContext(HeroPreviewContext);
  const Heading = preview ? "h2" : "h1";
  return (
    <Heading className="hero-display" tabIndex={-1}>
      {children}
    </Heading>
  );
}
export function HeroCopy({
  title = (
    <>
      وضوحٌ قانوني.
      <br />
      <em>قراراتٌ بثقة.</em>
    </>
  ),
  dark = false,
  tag = "من جدة، إلى أعمالك في المملكة",
}: {
  title?: ReactNode;
  dark?: boolean;
  tag?: string;
}) {
  return (
    <div className="direction-copy">
      <p className="direction-eyebrow">
        <i />
        {tag}
      </p>
      <HeroHeading>{title}</HeroHeading>
      <p className="hero-description">
        مشورة وتمثيل قانوني للشركات والمستثمرين والأفراد. نفهم احتياجك، ونوضّح
        خياراتك، ونعتني بالتفاصيل.
      </p>
      <div className="direction-actions">
        <CTA light={dark} />
        <Link to="/services" className="text-link">
          اكتشف خدماتنا <Arrow />
        </Link>
      </div>
      <p className="direction-note">
        الاستشارة الأولى مجانية · بالمكتب أو عن بُعد
      </p>
    </div>
  );
}
export function HeroPhoto({
  className = "",
  position = "50% 50%",
}: {
  className?: string;
  position?: string;
}) {
  return (
    <img
      className={"direction-photo " + className}
      src="/images/architectural-atrium.webp"
      alt="تكوين معماري تصوري من الحجر والضوء"
      style={{ objectPosition: position }}
      width={1672}
      height={941}
      fetchPriority="high"
    />
  );
}
