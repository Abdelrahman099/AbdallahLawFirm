import { useTranslate } from "@/i18n/useTranslate";
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
  const { tx } = useTranslate();

  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">
          <Dots />
          {tx(tag)}
        </p>
        <h2>{tx(title)}</h2>
        {tx(text && <p className="section-desc">{tx(text)}</p>)}
      </div>
      {tx(children)}
    </div>
  );
}
