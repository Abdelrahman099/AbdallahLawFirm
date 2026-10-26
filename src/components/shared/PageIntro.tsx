import { useTranslate } from "@/i18n/useTranslate";
import { Dots } from "@/components/brand/BrandDots";
import type { ReactNode } from "react";
export function PageIntro({
  tag,
  title,
  text,
  children,
}: {
  tag: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  const { tx } = useTranslate();

  return (
    <section className="page-intro site-container">
      <p className="eyebrow">
        <Dots />
        {tx(tag)}
      </p>
      <h1 tabIndex={-1}>{tx(title)}</h1>
      <p className="intro-text">{tx(text)}</p>
      {tx(children)}
    </section>
  );
}
