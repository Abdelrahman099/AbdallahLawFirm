import { useTranslate } from "@/i18n/useTranslate";
import type { IdentityConceptId } from "./concepts";
import {
  IdentityLockup,
  IdentityMessage,
  IdentityPhoto,
  IdentitySlideControls,
  type IdentityLayoutProps,
} from "./IdentityHeroParts";

export function EvolvedHero({
  concept,
  slide,
  index,
  onSelect,
  preview,
}: IdentityLayoutProps & { concept: IdentityConceptId }) {
  const { tx } = useTranslate();

  return (
    <div className={`ih-evolved ih-${concept.replace("identity-", "")}`}>
      <div className="ih-evolved-media" data-entrance>
        <IdentityPhoto slide={slide} />
        <span className="ih-photo-credit">{tx("تصوّر بصري لمجال العمل")}</span>
      </div>
      <div className="ih-evolved-content">
        <IdentityLockup />
        <IdentityMessage slide={slide} preview={preview} />
        <IdentitySlideControls
          index={index}
          onSelect={onSelect}
          chapters={concept === "identity-chapters"}
        />
      </div>
    </div>
  );
}
