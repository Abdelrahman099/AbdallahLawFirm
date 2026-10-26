import { useTranslate } from "@/i18n/useTranslate";
import { HeroCopy } from "../HeroCopy";
import { ModelStage } from "../ModelStage";
export function OrbitSculpture() {
  const { tx } = useTranslate();

  return (
    <section className="hero-direction direction-orbit site-container">
      <div className="orbit-tag">
        {tx("علاقة مهنية.")}
        <br />
        {tx("تبدأ بالثقة.")}
      </div>
      <div className="orbit-content">
        <HeroCopy
          title={
            <>
              {tx("وضوح في الرؤية.")}
              <br />
              <em>{tx("عناية في التعامل.")}</em>
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
        <span>{tx("المسألة. الخيارات. الخطوة التالية.")}</span>
        <span>{tx("عبد الله الشهري")}</span>
      </div>
    </section>
  );
}
