import { useTranslate } from "@/i18n/useTranslate";
import { HeroCopy } from "../HeroCopy";
import { HeroShowcase } from "../HeroShowcase";
export function ChapterSlider() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-chapters site-container">
      <HeroCopy
        title={
          <>
            {tx("نفهم احتياجك.")}
            <br />
            <em>{tx("ونرتّب الطريق.")}</em>
          </>
        }
      />
      <HeroShowcase />
    </section>
  );
}
