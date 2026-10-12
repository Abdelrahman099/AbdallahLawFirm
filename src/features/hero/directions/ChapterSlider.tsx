import { HeroCopy } from "../HeroCopy";
import { HeroShowcase } from "../HeroShowcase";
export function ChapterSlider() {
  return (
    <section className="hero-direction direction-chapters site-container">
      <HeroCopy
        title={
          <>
            نفهم احتياجك.
            <br />
            <em>ونرتّب الطريق.</em>
          </>
        }
      />
      <HeroShowcase />
    </section>
  );
}
