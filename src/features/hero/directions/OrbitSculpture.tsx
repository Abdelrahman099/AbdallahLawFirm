import { HeroCopy } from "../HeroCopy";
import { ModelStage } from "../ModelStage";
export function OrbitSculpture() {
  return (
    <section className="hero-direction direction-orbit site-container">
      <div className="orbit-tag">
        علاقة مهنية.
        <br />
        تبدأ بالثقة.
      </div>
      <div className="orbit-content">
        <HeroCopy
          title={
            <>
              وضوح في الرؤية.
              <br />
              <em>عناية في التعامل.</em>
            </>
          }
        />
        <div className="orbit-object">
          <div className="orbit-disc" />
          <ModelStage chapter="care" />
          <span>CONNECTION / CARE</span>
        </div>
      </div>
      <div className="orbit-bottom">
        <span>المسألة. الخيارات. الخطوة التالية.</span>
        <span>عبد الله الشهري</span>
      </div>
    </section>
  );
}
