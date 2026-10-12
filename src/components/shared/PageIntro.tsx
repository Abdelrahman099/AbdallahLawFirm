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
  return (
    <section className="page-intro site-container">
      <p className="eyebrow">
        <Dots />
        {tag}
      </p>
      <h1 tabIndex={-1}>{title}</h1>
      <p className="intro-text">{text}</p>
      {children}
    </section>
  );
}
