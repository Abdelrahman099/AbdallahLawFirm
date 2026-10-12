import { BrandCaption } from "../BrandCaption";
import { BalanceScales } from "./BalanceScales";
import { useBalanceTimeline } from "./useBalanceTimeline";
import type { BalanceIntroId } from "./variants";
import "./balance.css";

export function BalanceIntro({ variant }: { variant: BalanceIntroId }) {
  const root = useBalanceTimeline(variant);
  return (
    <div
      ref={root}
      className={`balance-scene ${variant}`}
      data-balance-intro={variant}
    >
      <div className="balance-stage">
        <div className="balance-decoration" aria-hidden="true">
          {variant === "balance-seal" && (
            <>
              <i className="balance-ring seal-ring" />
              <i className="balance-ring seal-ring seal-inner" />
            </>
          )}
          {variant === "balance-orbit" &&
            [0, 1, 2].map((i) => (
              <i key={i} className={`balance-ring orbit-ring orbit-${i}`} />
            ))}
          {variant === "balance-portal" && <i className="balance-frame" />}
          {variant === "balance-blueprint" && (
            <i className="balance-blueprint-grid" />
          )}
          {variant === "balance-monolith" && <i className="balance-pedestal" />}
          {variant === "balance-split" && (
            <>
              <i className="balance-panel panel-left" />
              <i className="balance-panel panel-right" />
            </>
          )}
          {variant === "balance-curtain" && (
            <>
              <i className="balance-curtain curtain-left" />
              <i className="balance-curtain curtain-right" />
            </>
          )}
        </div>
        <BalanceScales />
      </div>
      <div className="balance-caption">
        <BrandCaption />
        <span className="balance-message">من الوضوح، يبدأ الاتزان.</span>
      </div>
    </div>
  );
}
