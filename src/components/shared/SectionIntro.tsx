import { Dots } from "@/components/brand/BrandDots";
import type { ReactNode } from "react";
export function SectionIntro({
  tag,
  title,
  text,
  children,
}: {
  tag: string;
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">
          <Dots />
          {tag}
        </p>
        <h2>{title}</h2>
        {text && <p className="section-desc">{text}</p>}
      </div>
      {children}
    </div>
  );
}
