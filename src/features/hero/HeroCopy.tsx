import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import { CTA } from "@/components/shared/ConsultationCTA";
import { Arrow } from "@/components/brand/Arrow";
export const HeroPreviewContext = createContext(false);
export function HeroHeading({ children }: { children: ReactNode }) {
  const { tx } = useTranslate();

  const preview = useContext(HeroPreviewContext);
  const Heading = preview ? "h2" : "h1";
  return (
    <Heading className="hero-display" tabIndex={-1}>
      {tx(children)}
    </Heading>
  );
}
export function HeroCopy({
  title,
  dark = false,
  tag = "من جدة، إلى أعمالك في المملكة",
}: {
  title?: ReactNode;
  dark?: boolean;
  tag?: string;
}) {
  const { tx } = useTranslate();

  return (
    <div className="direction-copy">
      <p className="direction-eyebrow">
        <i />
        {tx(tag)}
      </p>
      <HeroHeading>
        {title || (
          <>
            {tx("وضوحٌ قانوني.")}
            <br />
            <em>{tx("قراراتٌ بثقة.")}</em>
          </>
        )}
      </HeroHeading>
      <p className="hero-description">
        {tx(
          "مشورة وتمثيل قانوني للشركات والمستثمرين والأفراد. نفهم احتياجك، ونوضّح خياراتك، ونعتني بالتفاصيل.",
        )}
      </p>
      <div className="direction-actions">
        <CTA light={dark} />
        <Link to="/services" className="text-link">
          {tx("اكتشف خدماتنا")}
          <Arrow />
        </Link>
      </div>
      <p className="direction-note">
        {tx("الاستشارة الأولى مجانية · بالمكتب أو عن بُعد")}
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
  const { tx } = useTranslate();

  return (
    <img
      className={"direction-photo " + className}
      src="/images/architectural-atrium.webp"
      alt={tx("تكوين معماري تصوري من الحجر والضوء")}
      style={{ objectPosition: position }}
      width={1672}
      height={941}
      fetchPriority="high"
    />
  );
}
